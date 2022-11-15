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
