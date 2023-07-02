import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
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

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The note has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The id of the note',
        },
        title: {
          type: 'string',
          description: 'The title of the note',
        },
        blocks: {
          type: 'array',
          description: 'The blocks of the note',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'The type of the block',
              },
              data: {
                type: 'object',
                description: 'The data of the block',
              },
            },
          },
        },
        meta: {
          type: 'object',
          description: 'The meta of the note',
        },
      },
    },
  })
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The notes have been successfully retrieved.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',

            description: 'The id of the note',
          },
          title: {
            type: 'string',
            description: 'The title of the note',
          },
          blocks: {
            type: 'array',
            description: 'The blocks of the note',
            items: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  description: 'The type of the block',
                },
                data: {
                  type: 'object',
                  description: 'The data of the block',
                },
              },
            },
          },
          meta: {
            type: 'object',
            description: 'The meta of the note',
          },
        },
      },
    },
  })
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

  @Post('updateNote/:id')
  async updateNote(
    @Param('id') id: string,
    @Body() updateDto: UpdateNoteDto,
    @Headers('x-notion-userid') userId: string,
  ): Promise<UpdateNoteReturnType> {
    try {
      if (!userId) {
        throw new MissingUserId();
      }
      if (!isNumberString(id)) {
        throw new InvalidNoteId();
      }
      const data = await this.noteService.updateNote(
        userId,
        Number(id),
        updateDto,
      );
      return this.handleSuccessResponse(data);
    } catch (error) {
      this.logger.error('updateNote', error.message, {
        stack: error.stack,
      });
      return this.handleErrorResponse(error);
    }
  }

  @Post('deleteNote/:id')
  async deleteNote(
    @Param('id') id: string,
    @Headers('x-notion-userid') userId: string,
  ): Promise<DeleteNoteReturnType> {
    try {
      if (!userId) {
        throw new MissingUserId();
      }
      if (!isNumberString(id)) {
        throw new InvalidNoteId();
      }
      await this.noteService.deleteNote(userId, Number(id));
      return this.handleSuccessResponse();
    } catch (error) {
      this.logger.error('deleteNote', error.message, {
        stack: error.stack,
      });
      return this.handleErrorResponse(error);
    }
  }
}
