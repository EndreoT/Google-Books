import axios from "axios";

const googleAPIKey = process.env.REACT_APP_GOOGLE_API_KEY;
const googleBooksSearchBaseUrl = 'https://www.googleapis.com/books/v1/volumes';

function createGoogleBooksSearchUrl(query) {
  return `${googleBooksSearchBaseUrl}?q=${query}&key=${googleAPIKey}`;
}

export default {
  searchBooks: (query) => {
    return axios.get(createGoogleBooksSearchUrl(query))
  },
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  getBookByGoogleId: function(id) {
    return axios.get("/api/books/googleid/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
