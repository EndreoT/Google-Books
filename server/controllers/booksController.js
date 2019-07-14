const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.Book
      .find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function (req, res) {
    db.Book
      .find({ google_id: req.body.google_id })
      .then(book => {
        // Check if book already exists
        if (book.length) {
          return res.status(422).json({ message: 'Book already exists' })
        }

        db.Book
          .create(req.body)
          .then(dbModel => {

            // Emit books saved message
            // req.io.on('', function(socket) {
            //   console.log('emit')
              // req.socket.broadcast.emit('book_saved', dbModel);
            // });
            // req.io.emit('book_saved', dbModel);

            res.json(dbModel);
          })
          .catch(err => {
            console.log(err)
            res.status(422).json(err)
          });
      }).catch(err => {
        console.log(err)
        res.status(422).json(err)
      })
  },

  update: function (req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function (req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findByGoogleId: function (req, res) {

    db.Book
      .find({ google_id: req.params.google_id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
