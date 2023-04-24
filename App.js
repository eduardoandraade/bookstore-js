const Database = require("./Database.js")
const Author = require("./entites/Author.js")
const Book = require("./entites/Book.js")
const Order = require("./entites/Order.js")
const Poster = require("./entites/Poster.js")
const User = require("./entites/User.js")

module.exports = class App {
    static #database = new Database()

    createUser(name, email, password) {
        const user = new User(name, email, password)
        App.#database.saveUser(user)
    }

    getUsers() {
        return App.#database.find('users')
    }

    createAuthor(name, nationality, bio) {
        const author = new Author(name, nationality, bio)
        App.#database.saveAuthor(author)
    }

    getAuthors() {
        return App.#database.find('authors')
    }

    createBook(title, synopsis, genre, pages, author, description, price, inStock) {
        const book = new Book(title, synopsis, genre, pages, author, description, price, inStock)
        App.#database.saveBook(book)
    }

    addBook(bookName, quantity) {
        App.#database.addBookToStock(bookName, quantity)
    }

    getBooks() {
        return App.#database.find('books')
    }

    createPoster(name, description, height, width, price, inStock) {
        const poster = new Poster(name, description, height, width, price, inStock)
        App.#database.savePoser(poster)
    }

    addPoster(postername, quantity) {
        App.#database.addPosterToStock(postername, quantity)
    }

    getPosters() {
        return App.#database.find('posters')
    }

    createOrder(items, user) {
        const order = new Order(items, user)
        App.#database.saveOrder(order)
        order.data.items.forEach(({ product, quantity }) => {
            if (product instanceof Book) {
                App.#database.removeBooksFromStock(product.name, quantity)
            } else if (product instanceof Poster) {
                App.#database.removePostersFromStock(product.name, quantity)
            }
        })
    }

    gerOrders() {
        return App.#database.find('orders')
    }

    showDatabase() {
        App.#database.showStorage()
    }
}