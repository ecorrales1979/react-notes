export interface Tag {
  id: string
  label: string
}

export interface NoteData {
  title: string
  markdown: string
  tags: Tag[]
}

export interface Note extends NoteData {
  id: string
}

export interface RawNoteData extends Omit<NoteData, 'tags'> {
  tagIds: string[]
}

export interface RawNote extends RawNoteData {
  id: string
}