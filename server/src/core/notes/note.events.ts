import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NoteEvents {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  noteCreated(note: any) {
    this.eventEmitter.emit('note.created', note);
  }
}
