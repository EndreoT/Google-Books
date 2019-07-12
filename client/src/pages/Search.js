import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
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

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.searchBooks('calvin and hobbes')
      .then(res => {
        const processedBooks = [];

        res.data.items.forEach(book => {
          processedBooks.push({
            googleId: book.id,
            title: book.volumeInfo.title,
            description: book.volumeInfo.description,
            authors: book.volumeInfo.authors,
            image: book.volumeInfo.imageLinks,
            link: book.selfLink,
          })
        })
        this.setState({ books: processedBooks })
      })
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  renderBooks = () => {
    return this.state.books.map(book => (
      <List
        key={book.googleId}
      >
        <h3>{book.title}</h3>
        <p>{book.description}</p>
        <p>{book.googleId}</p>
        <p>{book.authors}</p>
        {/* {book.image} */}
        <p>{book.link}</p>
      </List>
    ))
  }

  render() {
    return (
      <Container fluid>
        <Jumbotron>

          <Input 
          name=''
          onChange={this.handleInputChange}></Input>

          <FormBtn
            onClick={this.handleFormSubmit}
          >Search</FormBtn>


        </Jumbotron>

        {this.state.books.length ? (
          this.renderBooks()
        ) : (
            <h3>No Results to Display</h3>
          )
        }
      </Container>
    );

  }
}

export default Books;

{/* <ListItem key={book.googleId}> */ }
{/* <Link to={"/books/" + book.googleId}> */ }
{/* <strong> */ }
{/* {book.title} by {book.author} */ }
// {book}
{/* </strong> */ }
{/* </Link> */ }
{/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */ }
{/* </ListItem> */ }