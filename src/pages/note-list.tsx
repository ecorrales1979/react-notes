import { useMemo, useState } from 'react';
import { Button, Col,  Form,  Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select'

import { Note, Tag } from '../dtos';
import { NoteCard } from '../components/note-card';

interface NoteListProps {
  availableTags: Tag[]
  notes: Note[]
}

export function NoteList({ availableTags, notes }: NoteListProps) {
  const [title, setTitle] = useState('')
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (title === '' || note.title.toLowerCase().includes(title.toLowerCase()))
        && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => {
          return noteTag.id === tag.id
        })))
    })
  }, [notes, selectedTags, title])
  
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/new">
              <Button type="submit" variant="primary">Create</Button>
            </Link>
            <Button type="button" variant="outline-secondary">EditTags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={ev => setTitle(ev.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                options={availableTags.map(tag => ({ label: tag.label, value: tag.id }))}
                value={selectedTags.map(tag => {
                  return {label: tag.label, value: tag.id}
                })}
                onChange={tags => setSelectedTags(tags.map(tag => {
                  return { label: tag.label, id: tag.value }
                }))}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
    </>
  )
}