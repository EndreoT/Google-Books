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
  // Add code to get the book with an _id equal to the id in the route param
  // e.g. http://localhost:3000/books/:id
  // The book id for this route can be accessed using this.props.match.params.id

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        this.setState({ books: res.data })
      }
      )
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
        {/* <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.book.title} by {this.state.book.author}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Synopsis</h1>
              <p>{this.state.book.synopsis}</p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Authors</Link>
          </Col>
        </Row> */}
        <List>
          {this.renderBooks()}
        </List>

      </Container>
    );
  }
}

export default Saved;
