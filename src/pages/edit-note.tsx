import { NoteForm } from '../components/note-form';
import { useNote } from '../components/note-layout';
import { NoteData, Tag } from '../dtos';

interface EditNoteProps {
  availableTags: Tag[]
  onAddTag: (tag: Tag) => void
  onSubmit: (id: string, data: NoteData) => void
}

export function EditNote({ availableTags, onAddTag, onSubmit }: EditNoteProps) {
  const note = useNote()

  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        onSubmit={data => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
      />
    </>
  )
}