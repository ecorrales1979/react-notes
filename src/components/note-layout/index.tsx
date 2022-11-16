import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'

import { Note } from '../../dtos'

interface NoteLayoutProps {
  notes: Note[]
}

export function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams()
  const note = notes.find(item => item.id === id)

  if (!note) return <Navigate to="/" replace />

  return <Outlet context={note} />
}

export function useNote() {
  return useOutletContext<Note>()
}