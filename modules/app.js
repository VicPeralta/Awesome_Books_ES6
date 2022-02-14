import BookShelf from './bookshelf.js';
import updateDate from './dateFunction.js';
import navToSection from './utils.js';

class App {
  BookShelf = new BookShelf();

  constructor() {
    window.setInterval(updateDate, 1000, document.querySelector('.datetime p'));
    this.#setListeners();
  }

  displayBooks() {
    this.BookShelf.saveData();
    const booksContainer = document.querySelector('.books-container');
    const booksTemplate = document.getElementById('books-template');
    booksContainer.innerHTML = '';
    this.BookShelf.bookList.forEach((book) => {
      const bookCard = booksTemplate.content.cloneNode(true).children[0];
      bookCard.querySelector('.title').textContent = book.title;
      bookCard.querySelector('.author').textContent = book.author;
      bookCard.querySelector('.remove-book').setAttribute('data-id', book.id);
      booksContainer.appendChild(bookCard);
    });
  }

  #setListeners() {
    // Event handler for add new book button
    document.querySelector('.add-btn').addEventListener('click', () => {
      const title = document.getElementById('title');
      const author = document.getElementById('author');
      if (!title.checkValidity()) {
        title.reportValidity();
        return;
      }
      if (!author.checkValidity()) {
        author.reportValidity();
        return;
      }
      this.BookShelf.addBook(title.value, author.value);
      document.querySelector('.add-message').textContent = 'Book Added';
      window.setTimeout(() => {
        document.querySelector('.add-message').textContent = '';
        document.getElementById('title').focus();
      }, 500);
      title.value = '';
      author.value = '';
      this.displayBooks();
    });
    // Event handler for all remove book buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('.remove-book')) {
        this.BookShelf.removeBook(e.target.dataset.id);
        this.displayBooks();
      }
      // Event handler for all nav links
      if (e.target.matches('.navlinks li a')) {
        navToSection(e.target, e.target.href.substring(e.target.href.indexOf('#')));
      }
    });
    document.addEventListener('dragstart', (e) => {
      // Event handlers for card's drag operations
      if (e.target.matches('.book-card')) {
        e.target.style.opacity = '0.4';
        this.dragSourceElement = e.target;
        this.dragSourceID = e.target.querySelector('.remove-book').dataset.id;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.innerHTML);
      }
    });
    document.addEventListener('dragend', (e) => {
      if (e.target.matches('.book-card')) {
        e.target.style.opacity = '1';
        e.target.classList.remove('over');
      }
    });

    document.addEventListener('dragenter', (e) => {
      if (e.target.matches('.book-card')) {
        e.target.classList.add('over');
      }
    });

    document.addEventListener('dragleave', (e) => {
      if (e.target.matches('.book-card')) {
        e.target.classList.remove('over');
      }
    });
    document.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    document.addEventListener('drop', (e) => {
      e.preventDefault();
      if (e.target.matches('.book-card')) {
        e.stopPropagation();
        if (this.dragSourceElement !== e.target) {
          this.dragTargetID = e.target.querySelector('.remove-book').dataset.id;
          this.dragSourceElement.innerHTML = e.target.innerHTML;
          e.target.innerHTML = e.dataTransfer.getData('text/html');
          e.target.classList.remove('over');
          this.BookShelf.swapElementsByID(this.dragTargetID, this.dragSourceID);
        }
      }
    });
  }
}

export default App;