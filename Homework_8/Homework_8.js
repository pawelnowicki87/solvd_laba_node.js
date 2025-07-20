
/**
 * Book - Base class representing a general book.
 * Includes basic properties and availability check.
 */
class Book {
  constructor(title, author, isbn, price, availability = true) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.availability = availability;
  }

  // Check if the book is available for purchase
  isAvailable() {
    return this.availability;
  }

  // Return a formatted string with book info
  getDetails() {
    return `${this.title} by ${this.author} - $${this.price.toFixed(2)}`;
  }
}

/**
 * FictionBook - Subclass of Book for fiction titles.
 * Demonstrates inheritance and polymorphism.
 */
class FictionBook extends Book {
  constructor(title, author, isbn, price, availability, genre) {
    super(title, author, isbn, price, availability);
    this.genre = genre;
  }
}

/**
 * NonFictionBook - Subclass of Book for non-fiction titles.
 * Demonstrates inheritance and polymorphism.
 */
class NonFictionBook extends Book {
  constructor(title, author, isbn, price, availability, subject) {
    super(title, author, isbn, price, availability);
    this.subject = subject;
  }
}

/**
 * User - Represents a user of the bookstore.
 * Includes basic identity and contact info.
 */
class User {
  constructor(name, email, userId) {
    this.name = name;
    this.email = email;
    this.userId = userId;
  }

  // Return formatted user info
  getInfo() {
    return `${this.name} (${this.email})`;
  }
}

/**
 * Cart - Represents a shopping cart linked to a user.
 * Supports adding, removing books and calculating total.
 */
class Cart {
  constructor(user) {
    this.user = user;
    this.items = []; // Array of Book instances
  }

  // Add a book to the cart if available
  addBook(book) {
    if (book.isAvailable()) {
      this.items.push(book);
      console.log(`Added to cart: ${book.title}`);
    } else {
      console.log(`Sorry, ${book.title} is not available.`);
    }
  }

  // Remove book from cart by ISBN
  removeBook(isbn) {
    const index = this.items.findIndex(b => b.isbn === isbn);
    if (index > -1) {
      const removed = this.items.splice(index, 1)[0];
      console.log(`Removed from cart: ${removed.title}`);
    } else {
      console.log(`Book with ISBN ${isbn} not found in cart.`);
    }
  }

  // Calculate total price of all books in the cart
  getTotalPrice() {
    return this.items.reduce((total, book) => total + book.price, 0);
  }

  // List all books in the cart
  listItems() {
    return this.items.map(book => book.getDetails()).join('\n');
  }

  // Empty the cart
  clearCart() {
    this.items = [];
  }
}

/**
 * Order - Represents a completed order by a user.
 * Includes user info, books, total, and order metadata.
 */
class Order {
  constructor(user, books) {
    this.user = user;
    this.books = books;
    this.total = books.reduce((sum, b) => sum + b.price, 0);
    this.date = new Date();
    this.orderId = `ORD-${Math.floor(Math.random() * 100000)}`;
  }

  // Return full order summary
  getOrderSummary() {
    return `
Order ID: ${this.orderId}
Customer: ${this.user.getInfo()}
Date: ${this.date.toLocaleString()}
Books:
${this.books.map(b => `- ${b.title} ($${b.price})`).join('\n')}
Total: $${this.total.toFixed(2)}
`;
  }
}

// DEMONSTRATION SCENARIO

//Create Book Instances (Fiction and Non-fiction)
const book1 = new FictionBook("The Hobbit", "J.R.R. Tolkien", "123-A", 25.99, true, "Fantasy");
const book2 = new NonFictionBook("Sapiens", "Yuval Noah Harari", "456-B", 19.99, true, "History");
const book3 = new FictionBook("1984", "George Orwell", "789-C", 15.49, false, "Dystopian");

// Create Users
const user1 = new User("Alice", "alice@example.com", "U001");
const user2 = new User("Bob", "bob@example.com", "U002");

// Alice Browses and Adds Books
const aliceCart = new Cart(user1);
aliceCart.addBook(book1);
aliceCart.addBook(book2);
aliceCart.addBook(book3);

console.log("\n Alice's Cart Contents:");
console.log(aliceCart.listItems());
console.log(`\n Total: $${aliceCart.getTotalPrice().toFixed(2)}`);

// Alice Places an Order
const aliceOrder = new Order(user1, aliceCart.items);
console.log("\n Alice's Order Summary ");
console.log(aliceOrder.getOrderSummary());

aliceCart.clearCart(); // Clear cart after placing order

// Bob Creates Cart and Orders a Book
const bobCart = new Cart(user2);
bobCart.addBook(book2);

const bobOrder = new Order(user2, bobCart.items);
console.log("\n Bob's Order Summary");
console.log(bobOrder.getOrderSummary());
