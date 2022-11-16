import { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable'
import { v4 as uuidV4 } from 'uuid'

import { NoteData, Tag } from '../dtos'

interface NoteFormProps {
  availableTags: Tag[]
  onAddTag: (tag: Tag) => void
  onSubmit: (data: NoteData) => void
}

export function NoteForm({ availableTags, onAddTag, onSubmit }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const navigate = useNavigate()

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })

    navigate('..')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                isMulti
                onCreateOption={label => {
                  const newTag = { id: uuidV4(), label }
                  onAddTag(newTag)
                  setSelectedTags(prevSelectedTags => [...prevSelectedTags, newTag])
                }}
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
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
              <Form.Control ref={markdownRef} required as="textarea" rows={15} />
        </Form.Group>

        <Stack direction="horizontal" className="gap-2 justify-content-end">
          <Button type="submit" variant="primary">Save</Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">Cancel</Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}