import 'bootstrap/dist/css/bootstrap.min.css'
import { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import { v4 as uuidV4} from 'uuid'

import { NoteLayout } from './components/note-layout'
import { NoteData, RawNote, Tag } from './dtos'
import { useLocalStorage } from './hooks/useLocalStorage'
import { EditNote } from './pages/edit-note'
import { NewNote } from './pages/new-note'
import { Note } from './pages/note'
import { NoteList } from './pages/note-list'

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        {
          ...data,
          id: uuidV4(),
          tagIds: tags.map(tag => tag.id)
        }
      ]
    })
  }

  const onUpdateNote = (id: string, {  tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id !== id) return note

        return {
          ...note,
          ...data,
          id,
          tagIds: tags.map(tag => tag.id)
        }
      })
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prevTags => [...prevTags, tag])
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList availableTags={tags} notes={notesWithTags} />}
        />
        <Route
          path="/new"
          element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />}
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note />} />
          <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
