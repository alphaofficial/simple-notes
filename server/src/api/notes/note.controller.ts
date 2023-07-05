import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Headers,
} from '@nestjs/common';
import { UpdateNoteDto } from './dto/updateNote.dto';
import {
  CreateNoteReturnType,
  DeleteNoteReturnType,
  GetNoteReturnType,
  GetNotesReturnType,
  UpdateNoteReturnType,
} from './note.controller.interface';
import { BaseController } from '../base/base.controller';
import { LoggerInterface } from '../interfaces/logger.interface';
import { NoteServiceInterface } from '@/api/interfaces/note.service.interface';
import { CreateNoteDto } from '@/api/notes/dto/createNote.dto';
import { InvalidNoteId, MissingUserId } from '@/core/notes/note.exceptions';
import { isNumberString } from '@/tools/utilities/validation';

@Controller('notes')
export class NoteController extends BaseController {
  constructor(
    @Inject('NoteServiceInterface')
    private readonly noteService: NoteServiceInterface,
    @Inject('LoggerInterface')
    protected readonly logger: LoggerInterface,
  ) {
    super();
  }

  @Post('createNote')
  async createNote(
    @Body() createNote: CreateNoteDto,
    @Headers('x-notion-userid') userId: string,
  ): Promise<CreateNoteReturnType> {
    try {
      if (!userId) {
        throw new MissingUserId();
      }
      const data = await this.noteService.createNote(userId, createNote);
      return this.handleSuccessResponse(data, HttpStatus.CREATED);
    } catch (error) {
      this.logger.error('createNote', error.message, {
        stack: error.stack,
      });
      return this.handleErrorResponse(error);
    }
  }

  @Get('getNotes')
  async getNotes(
    @Headers('x-notion-userid') userId: string,
  ): Promise<GetNotesReturnType> {
    try {
      if (!userId) {
        throw new MissingUserId();
      }
      const data = await this.noteService.getNotes(userId);
      return this.handleSuccessResponse(data);
    } catch (error) {
      this.logger.error('getNotes', error.message, {
        stack: error.stack,
      });
      return this.handleErrorResponse(error);
    }
  }

  @Get('getNote/:id')
  async getNote(
    @Param('id') id: string,
    @Headers('x-notion-userid') userId: string,
  ): Promise<GetNoteReturnType> {
    try {
      if (!userId) {
        throw new MissingUserId();
      }
      if (!isNumberString(id)) {
        throw new InvalidNoteId();
      }
      const data = await this.noteService.getNote(userId, Number(id));
      return this.handleSuccessResponse(data);
    } catch (error) {
      this.logger.error('getNote', error.message, {
        stack: error.stack,
      });
      return this.handleErrorResponse(error);
    }
  }

  @Post('updateNote')
  async updateNote(
    @Body() updateDto: UpdateNoteDto,
    @Headers('x-notion-userid') userId: string,
  ): Promise<UpdateNoteReturnType> {
    try {
      if (!userId) {
        throw new MissingUserId();
      }
      const { noteId, ...updatePayload } = updateDto;
      const data = await this.noteService.updateNote(
        userId,
        noteId,
        updatePayload,
      );
      return this.handleSuccessResponse(data);
    } catch (error) {
      this.logger.error('updateNote', error.message, {
        stack: error.stack,
      });
      return this.handleErrorResponse(error);
    }
  }

  @Post('deleteNote')
  async deleteNote(
    @Body('noteId') noteId: number,
    @Headers('x-notion-userid') userId: string,
  ): Promise<DeleteNoteReturnType> {
    try {
      if (!userId) {
        throw new MissingUserId();
      }
      await this.noteService.deleteNote(userId, Number(noteId));
      return this.handleSuccessResponse();
    } catch (error) {
      this.logger.error('deleteNote', error.message, {
        stack: error.stack,
      });
      return this.handleErrorResponse(error);
    }
  }

  @Post('addNoteToFavorites')
  async addNoteToFavorites(
    @Body('noteId') noteId: number,
    @Headers('x-notion-userid') userId: string,
  ): Promise<UpdateNoteReturnType> {
    try {
      if (!userId) {
        throw new MissingUserId();
      }
      const note = await this.noteService.addNoteToFavorite(userId, noteId);
      return this.handleSuccessResponse(note);
    } catch (error) {
      this.logger.error('addNoteToFavorites', error.message, {
        stack: error.stack,
      });
      return this.handleErrorResponse(error);
    }
  }

  @Post('removeNoteFromFavorites')
  async removeNoteFromFavorites(
    @Body('noteId') noteId: number,
    @Headers('x-notion-userid') userId: string,
  ): Promise<UpdateNoteReturnType> {
    try {
      if (!userId) {
        throw new MissingUserId(); // TODO: move to middleware
      }
      const note = await this.noteService.removeNoteFromFavorite(
        userId,
        noteId,
      );
      return this.handleSuccessResponse(note);
    } catch (error) {
      this.logger.error('removeNoteFromFavorites', error.message, {
        stack: error.stack,
      });
      return this.handleErrorResponse(error);
    }
  }
}
