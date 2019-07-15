# Google Books

Deployed link: https://find-google-books.herokuapp.com/

# Description 
A full stack application allowing users to search for Google Books and save them to a MongoDB database. 

# Motivation
This app gives users a bite sized way to find books and keep track of their favorite ones.

# Results
Implements the MERN (MongoDB, Express, React, Node) stack. Users search for books through the Google Books API, which are then nicely displayed. Books can then be saved and removed from the database. An API call checks in advance of rendering the 'save book' button to make sure the book has not already been saved. Uses Socket.io for real time communication between the server and clients. Push notifications are displayed to all users on book save using the react-toastify package. Furthermore, the save book button availability is updated in real time on a book save for all clients.

# Future Improvements
- [ ] Send push notifications to all users except for the client that saved a book
- [ ] Update books saved in real time on book save and deletion for all clients
