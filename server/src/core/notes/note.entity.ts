import { BaseEntity } from '../abstract/base.entity';

type NoteContent = Record<string, unknown>;
type NoteMeta = Record<string, unknown>;
export class NoteEntity extends BaseEntity {
	public readonly title: string;
	public readonly content: NoteContent;
	public readonly meta?: NoteMeta;

	constructor({ title, content, meta }) {
		super();
		this.title = title;
		this.content = content;
		this.meta = meta;
	}
}
