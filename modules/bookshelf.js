class BookShelf {
  constructor() {
    this.#loadDataFromStorage();
  }

  #loadDataFromStorage() {
    this.bookList = JSON.parse(window.localStorage.getItem('bookshelf'));
    if (!this.bookList) this.bookList = [];
  }

  saveData() {
    window.localStorage.setItem('bookshelf', JSON.stringify(this.bookList));
  }

  addBook(title, author) {
    let maxId = 0;
    this.bookList.forEach((element) => {
      if (element.id > maxId) maxId = element.id;
    });
    maxId += 1;
    this.bookList.push({
      id: maxId,
      title,
      author,
    });
  }

  removeBook(id) {
    this.bookList = this.bookList.filter((book) => book.id !== Number(id));
  }

  swapElementsByID(lID, rID) {
    let indexA = 0;
    let indexB = 0;
    for (let i = 0; i < this.bookList.length; i += 1) {
      if (this.bookList[i].id === Number(lID)) indexA = i;
      if (this.bookList[i].id === Number(rID)) indexB = i;
    }
    const tempo = this.bookList[indexA];
    this.bookList[indexA] = this.bookList[indexB];
    this.bookList[indexB] = tempo;
    this.saveData();
  }
}

export default BookShelf;