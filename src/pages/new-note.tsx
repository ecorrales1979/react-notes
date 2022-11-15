import { NoteForm } from '../components/note-form';
import { NoteData } from '../dtos';

export function NewNote() {
  const handleNewNote = (data: NoteData) => {
    console.log(data);
  }

  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={handleNewNote} />
    </>
  )
}