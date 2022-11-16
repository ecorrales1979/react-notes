import { NoteForm } from '../components/note-form';
import { NoteData } from '../dtos';

interface NewNoteProps {
  onSubmit: (data: NoteData) => void
}

export function NewNote({ onSubmit }: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </>
  )
}