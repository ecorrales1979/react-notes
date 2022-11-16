import { NoteForm } from '../components/note-form';
import { NoteData, Tag } from '../dtos';

interface NewNoteProps {
  availableTags: Tag[]
  onAddTag: (tag: Tag) => void
  onSubmit: (data: NoteData) => void
}

export function NewNote({ availableTags, onAddTag, onSubmit }: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </>
  )
}