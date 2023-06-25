import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UpdateNoteDto } from './dto/updateNote.dto';
import {
  CreateNoteReturnType,
  GetNoteReturnType,
  GetNotesReturnType,
  UpdateNoteReturnType,
} from './note.controller.interface';
import { BaseController } from '../base/base.controller';
import { NoteServiceInterface } from '@/api/interfaces/note.service.interface';
import { CreateNoteDto } from '@/api/notes/dto/createNote.dto';
import { InvalidNoteId } from '@/core/notes/note.exceptions';
import { isNumberString } from '@/shared/utilities/validation';

@Controller('notes')
export class NoteController extends BaseController {
  constructor(
    @Inject('NoteServiceInterface')
    private readonly noteService: NoteServiceInterface,
  ) {
    super();
  }

  private readonly retryOptions = {
    scope: NoteController.name,
  };

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
  ): Promise<CreateNoteReturnType> {
    try {
      const data = await this.executeWithRetries(
        async () => await this.noteService.createNote(createNote),
        this.retryOptions,
      );
      return this.handleSuccessResponse(data, HttpStatus.CREATED);
    } catch (error) {
      console.log(error);
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
  async getNotes(): Promise<GetNotesReturnType> {
    try {
      const data = await this.executeWithRetries(async () =>
        this.noteService.getNotes(),
      );
      return this.handleSuccessResponse(data);
    } catch (error) {
      console.log(error);
      return this.handleErrorResponse(error);
    }
  }

  @Get('getNote/:id')
  async getNote(@Param('id') id: string): Promise<GetNoteReturnType> {
    try {
      if (!isNumberString(id)) {
        throw new InvalidNoteId();
      }
      const data = await this.executeWithRetries(async () =>
        this.noteService.getNote(Number(id)),
      );
      return this.handleSuccessResponse(data);
    } catch (error) {
      console.log(error);
      return this.handleErrorResponse(error);
    }
  }

  @Post('updateNote/:id')
  async updateNote(
    @Param('id') id: string,
    @Body() updateDto: UpdateNoteDto,
  ): Promise<UpdateNoteReturnType> {
    try {
      if (!isNumberString(id)) {
        throw new InvalidNoteId();
      }
      const data = await this.executeWithRetries(async () =>
        this.noteService.updateNote(Number(id), updateDto),
      );
      return this.handleSuccessResponse(data);
    } catch (error) {
      console.log(error);
      return this.handleErrorResponse(error);
    }
  }
}
