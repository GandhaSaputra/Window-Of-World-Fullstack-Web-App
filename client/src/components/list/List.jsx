import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

// import bookData from '../../data/dataBookHome';

import BookList from '../book-list/BookList';

import { API } from '../../config/api/api'

export default function List() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("")
  const [filteredResult, setFilteredResult] = useState(null)

  const getBooks = async () => {
    try {
      const response = await API.get('/books');
      setBooks(response.data.data.books)
    } catch (error) {
      console.log(error)
    }
  };

  const handleSearch = (value) => {
    setSearch(value)
    if (search !== "") {
      const filteredBook = books.filter((item) => {
        return Object.values(item).join("").toLowerCase().includes(search.toLowerCase())
      })
      setFilteredResult(filteredBook)
    } else {
      setFilteredResult(books)
    }
  }

  useEffect(() => {
    getBooks();
  }, [])

  return (
    <Container className="my-1">
      <Row className="d-flex justify-content-between align-items-center px-4 py-2">
        <Col sm={2} md={2} lg={12}>
          <InputGroup className="mb-4">
            <InputGroup.Prepend
              style={{
                borderBottom: "1px solid #7E7A7A",
              }}
            >
              <FaSearch />
            </InputGroup.Prepend>
            <FormControl
              style={{
                background: "transparent",
                borderTop: "none",
                borderRight: "none",
                borderLeft: "none",
                borderBottom: "1px solid #7E7A7A",
              }}
              className="input-search"
              placeholder="Input book title or author to search book . . ."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {search.length > 1
          ? filteredResult.map((data, index) => {
            return (
              <Col md={3} key={index}>
                <BookList data={data} />
              </Col>
            )
          })
          : books.map((data, index) => {
            return (
              <Col md={3} key={index}>
                <BookList data={data} />
              </Col>
            )
          })
        }
      </Row>
    </Container>
  );
}