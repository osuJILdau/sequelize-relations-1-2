const Author = require('./Author');
const Book = require('./Book');

Author.hasMany(Book, {
  foreignKey: { name: 'authorId', allowNull: false },
  as: 'books',
});

Book.belongsTo(Author, {
  foreignKey: { name: 'authorId', allowNull: false },
  as: 'author',
});

module.exports = { Author, Book };
