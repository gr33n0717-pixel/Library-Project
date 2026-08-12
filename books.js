let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".books");

  booksWrapper.classList += ' books__loading'

  if (!books) {
   books = await getBooks();
}
  
  booksWrapper.classList.remove('books__loading')



  if(filter === 'LOW_TO_HIGH') {
  books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice))
  }
  else if (filter === 'HIGH_TO_LOW') {
    books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice))
  }
  else if (filter === 'RATING'){
    books.sort((a, b) => b.rating  - a.rating)

  }

  const booksHtml = books.map(book => {
    return `<div class="book">
  <figure class="book__img--wrapper">
      <img class="book__img" src="${book.url}">
  </figure>
  <div class="book__title">
      ${book.title}
  </div>
  <div class="book__rating">
      ${ratingHTML(book.rating)}
  </div>
  <div class="book__price">
    ${priceHTML(book.originalPrice, book.salePrice)}
      </div>
</div>`
  })
  .join("")
  

  booksWrapper.innerHTML = booksHtml;
}

function  priceHTML(originalPrice, salePrice) {
  if (!salePrice){
    return `$${originalPrice.toFixed(2)}`
  }
    return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span> $${salePrice.toFixed(2)}`
}

function ratingHTML(rating) {
   let ratingHTML = "";

  for (let i = 0; i < Math.floor(rating); ++ i) {
    ratingHTML += '<i class="fa-solid fa-star"></i>\n'
  }

  if(!Number.isInteger(rating)) {
    ratingHTML += '<i class="fa-solid fa-star-half-alt"></i>'
  }
  return ratingHTML
}

function filterBooks(event) {
  renderBooks(event.target.value)
}

setTimeout(() => {
  renderBooks();
});

// FAKE DATA
function getBooks() {
  return new Promise ((resolve) => {
    setTimeout (() => {
      resolve([
        {
          id: 1,
          title: "Scythe",
          url: "assets__portfolio/book-1.jpeg",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "The Titan's Curse",
          url: "assets__portfolio/book-2.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Red Rising",
          url: "assets__portfolio/book-3.jpg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The Martian",
          url: "assets__portfolio/book-4.jpg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Strangers In Time",
          url: "assets__portfolio/book-5.jpg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "The Sea Of Monsters",
          url: "assets__portfolio/book-6.jpg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "The Book Of Fallen Leaves",
          url: "assets__portfolio/book-7.jpg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "Thunderhead",
          url: "assets__portfolio/book-8.jpg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "Mark Of Athena",
          url: "assets__portfolio/book-9.jpg",
          originalPrice: 35,
          salePrice: null,
          rating: 2,
        },
        {
          id: 10,
          title: "Hail Mary",
          url: "assets__portfolio/book-10.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Cyberpunk No_Coincidence",
          url: "assets__portfolio/book-11.jpg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
        {
          id: 12,
          title: "Ode To The Half-Broken",
          url: "assets__portfolio/book-12.jpg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
      ])
    }, 1000)
  })
}
