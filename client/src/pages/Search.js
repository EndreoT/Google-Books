import React, { Component } from "react";

import API from "../utils/API";
import ViewBtn from "../components/buttons/ViewBtn";
import SaveBtn from "../components/buttons/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import { Col, Container, Row } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";


class Books extends Component {

  state = {
    books: [],
    search: ''
  };

  deleteBooks = () => {
    this.setState({ books: [] })
  }

  searchBooks = (query) => {
    this.deleteBooks()

    API.searchBooks(query)
      .then(res => {
        const processedBooks = [];

        res.data.items.forEach(book => {
          processedBooks.push({
            google_id: book.id,
            title: book.volumeInfo.title,
            description: book.volumeInfo.description,
            authors: book.volumeInfo.authors,
            image: book.volumeInfo.imageLinks ? (
              book.volumeInfo.imageLinks.thumbnail
            ) : '',
            link: book.volumeInfo.infoLink,
          })
        })
        this.setState({ books: processedBooks })
      })
  };

  saveBook = (book) => {
    API.saveBook(book)
      .then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchBooks(this.state.search)
  };

  renderBooks = () => {

    return this.state.books.map(book => (
      <ListItem
        key={book.google_id}
      >
        <SaveBtn
          onClick={() => this.saveBook(book)}
        />
        <ViewBtn
          href={book.link}
        />
        <h3>{book.title}</h3>
        <p>Written by {book.authors.join(', ')}</p>
        <Row>
          <Col size="md-2 sm-12">
            {
              book.image ? (
                <img src={book.image} alt="book-image"></img>
              ) :
                ('')
            }
          </Col>
          <Col size="md-10 sm-12">
            <p>{book.description}</p>
          </Col>
        </Row>
      </ListItem>
    ));
  }

  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h2>(React) Google Book Search</h2>
          {/* Book search input */}
          <Input
            name='search'
            placeholder='Search for books!'
            value={this.state.search}
            onChange={this.handleInputChange}
          />

          <FormBtn
            onClick={this.handleFormSubmit}
          >
            Search
          </FormBtn>
        </Jumbotron>

        {
          this.state.books.length ? (
            <List>
              {this.renderBooks()}
            </List>

          ) : (
              <h3 style={{textAlign: "center"}}>No Results to Display</h3>
            )
        }
      </Container>
    );

  }
}

export default Books;
