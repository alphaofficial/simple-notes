import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Inject,
	Post,
} from '@nestjs/common';
import {
	CreateNoteReturnType,
	GetNotesReturnTypw,
} from './note.controller.interface';
import { BaseController } from '../base/base.controller';
import { CreateNoteDto } from '@/api/dto/createNote.dto';
import { NoteServiceInterface } from '@/api/interfaces/note.service.interface';

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
			return this.handleErrorResponse(error);
		}
	}

	@Get('getNotes')
	async getNotes(): Promise<GetNotesReturnTypw> {
		try {
			const data = await this.executeWithRetries(async () =>
				this.noteService.getNotes(),
			);
			return this.handleSuccessResponse(data);
		} catch (error) {
			return this.handleErrorResponse(error);
		}
	}
}
