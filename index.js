const sequelize = require('./db');
const { Author, Book } = require('./models/relations');

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    const author1 = await Author.create({
      name: 'Лев Толстой',
      country: 'Россия',
    });

    await author1.createBook({
      title: 'Война и мир',
      year: 1869,
      genre: 'Роман',
    });

    await author1.createBook({
      title: 'Анна Каренина',
      year: 1877,
      genre: 'Роман',
    });

    const author2 = await Author.create({
      name: 'Антон Чехов',
      country: 'Россия',
    });

    await author2.createBook({
      title: 'Чайка',
      year: 1896,
      genre: 'Пьеса',
    });

    const authors = await Author.findAll({
      include: [{ model: Book, as: 'books' }],
      order: [['id', 'ASC']],
    });

    for (const author of authors) {
      console.log('Автор: ' + author.name + ' (' + author.country + ')');

      for (const book of author.books) {
        console.log('  - ' + book.title + ', ' + book.year + ', ' + book.genre);
      }
    }
  } catch (error) {
    console.error('Ошибка:', error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

main();
