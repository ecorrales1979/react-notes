import { Button, Col,  Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function NoteList() {
  return (
    <Row>
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
  )
}