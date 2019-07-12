import React, { Component } from "react";
import ViewBtn from "../components/buttons/ViewBtn";
import SaveBtn from "../components/buttons/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";


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
        <p>{book.description}</p>
        <p>{book.google_id}</p>
        <p>{book.authors}</p>
        {
          book.image ? (
            <img src={book.image} alt="book-image"></img>
          ) :
            ('')
        }

      </ListItem>
    ));
  }

  render() {
    return (
      <Container fluid>
        <Jumbotron>

          <Input
            name='search'
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
              <h3>No Results to Display</h3>
            )
        }
      </Container>
    );

  }
}

export default Books;
