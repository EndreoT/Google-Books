import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import ViewBtn from "../components/buttons/ViewBtn";
import DeleteBtn from "../components/buttons/DeleteBtn";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";


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

  // getBook = () => {
  //   API.getBook(this.props.match.params.id)
  //     .then(res => {
  //       console.log(res)
  //       this.setState({book: res.data})
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  deleteBook = (id) => {
    console.log(id)
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
