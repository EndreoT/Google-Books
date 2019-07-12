import React, { Component } from "react";

import API from "../utils/API";
import * as utils from '../utils/utils';
import ViewBtn from "../components/buttons/ViewBtn";
import SaveBtn from "../components/buttons/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import BookDisplay from '../components/BookDisplay';


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
      .then(async res => {

        const processedBooks = [];

        const start = async () => {
          await utils.asyncForEach(res.data.items, async (book) => {
            // Look if book is already in DB
            await API.getBookByGoogleId(book.id)
              .then(res => {
                processedBooks.push({
                  google_id: book.id,
                  title: book.volumeInfo.title,
                  description: book.volumeInfo.description,
                  authors: book.volumeInfo.authors,
                  image: book.volumeInfo.imageLinks ? (
                    book.volumeInfo.imageLinks.thumbnail
                  ) : '',
                  link: book.volumeInfo.infoLink,
                  saved: res.data.length ? true : false
                })
              })
          });
          this.setState({ books: processedBooks });
        }
        start();
      })
  };

  saveBook = (savedBook) => {

    const books = this.state.books;
    books.forEach(book => {
      if (book.google_id === savedBook.google_id) {
        book.saved = true;
      }
    })
    this.setState({ books })

    API.saveBook(savedBook)
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
          disabled={book.saved ? true : false}
          onClick={() => this.saveBook(book)}
        >
          {book.saved ? 'Saved' : 'Save Book'}
        </SaveBtn>
        <ViewBtn
          href={book.link}
        />

        <BookDisplay
          title={book.title}
          authors={book.authors}
          image={book.image}
          description={book.description}
        />
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
              <h3 style={{ textAlign: "center" }}>No Results to Display</h3>
            )
        }
      </Container>
    );

  }
}

export default Books;
