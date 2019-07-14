import React, { Component } from "react";

import API from "../utils/API";
import { Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import ViewBtn from "../components/buttons/ViewBtn";
import DeleteBtn from "../components/buttons/DeleteBtn";
import { List, ListItem } from "../components/List";
import BookDisplay from '../components/BookDisplay';


class Saved extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  deleteBookFromState = (id) => {
    const books = this.state.books.filter(book => {
      return book._id !== id;
    })

    this.setState({ books })
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        this.setState({ books: res.data })
      })
      .catch(err => console.log(err));
  };

  deleteBook = (id) => {
    API.deleteBook(id)
      .then(res => this.deleteBookFromState(id))
      .catch(err => console.log(err));
  }

  renderBooks = () => {

    return this.state.books.map(book => (
      <ListItem
        key={book.google_id}
      >
        <DeleteBtn
          onClick={() => this.deleteBook(book._id)}
        />
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
          <h2>
            Saved Books
              </h2>
        </Jumbotron>

        <List>
          {this.renderBooks()}
        </List>

      </Container>
    );
  }
}

export default Saved;
