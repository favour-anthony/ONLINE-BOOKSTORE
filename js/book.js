let books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, availability: true },
    { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, availability: true },
    { title: "1984", author: "George Orwell", year: 1949, availability: true },
    { title: "Pride and Prejudice", author: "Jane Austen", year: 1813, availability: true },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951, availability: false },
];

let cart = [];
let bookList = document.getElementById("book-list");
let searchInput = document.getElementById("search");
let cartCountDisplay = document.getElementById('cart-count');
let modal = document.getElementById('modal');
let modalMessage = document.getElementById('modal-message');
let closeModal = document.querySelector('.close');
let cartCount = 0;

function displayBooks(books) {
    bookList.innerHTML = ""; 
    books.forEach((book) => {
        let bookDiv = document.createElement("div");
        bookDiv.className = "book";
        bookDiv.innerHTML += `
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <p>Published: ${book.year}</p>
            <button class="borrow" data-title="${book.title}">Borrow Book</button>
            <button class="add-to-cart" data-title="${book.title}">Add to Cart</button>
        `;
        bookList.appendChild(bookDiv);
    });

    // Add event listeners to borrow buttons
    let borrowBtns = document.getElementsByClassName('borrow');
    for (let btn of borrowBtns) {
        btn.addEventListener('click', (event) => {
            let bookTitle = event.target.getAttribute('data-title');
            borrowBook(bookTitle);
            
        });
        
    }

    // Add event listeners to add-to-cart buttons
    let addToCartBtns = document.getElementsByClassName('add-to-cart');
    for (let btn of addToCartBtns) {
        btn.addEventListener('click', (event) => {
            let bookTitle = event.target.getAttribute('data-title');
            addToCart(bookTitle);
            cartCount++;
            cartCountDisplay.textContent = cartCount;
            showModal(`"${bookTitle}" has been added to your cart!`);
            
        });
    }
}

function borrowBook(bookTitle) {
    let book = books.find(b => b.title === bookTitle);
    if (book) {
        if (book.availability) {
            book.availability = false;
            alert(`You have borrowed: "${book.title}"`);
            showModal(`You have borrowed "${bookTitle}"!`);
        } else {
            alert(`Sorry, "${book.title}" is already borrowed`);
            showModal(`sorry  "${bookTitle}"! has been borrowed`);
        }
    } else {
        alert('Book not found');
    }
}

function addToCart(bookTitle) {
    let book = books.find(b => b.title === bookTitle);
    if (book) {
        if (!cart.includes(bookTitle)) {
            cart.push(bookTitle);
            alert(`"${book.title}" has been added to your cart.`);
        } else {
            alert(`"${book.title}" is already in your cart.`);
        }
    } else {
        alert('Book not found');
    }
}

function filterBooks() {
    let query = searchInput.value.toLowerCase();
    let filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
}
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = 'block';
}


// Initial display of books
displayBooks(books);

// Event listener for search input
searchInput.addEventListener("input", filterBooks);
/*document.addEventListener("DOMContentLoaded", () => {
    let cartCount = 0;

    let borrowButtons = document.querySelectorAll('.borrow-btn');
    let cartButtons = document.querySelectorAll('.cart-btn');
    let cartCountDisplay = document.getElementById('cart-count');
    let modal = document.getElementById('modal');
    let modalMessage = document.getElementById('modal-message');
    let closeModal = document.querySelector('.close');

    borrowButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            let bookTitle = event.target.closest('.book').dataset.title;
            showModal(`You have borrowed "${bookTitle}"!`);
        });
    });

    cartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const bookTitle = event.target.closest('.book').dataset.title;
            cartCount++;
            cartCountDisplay.textContent = cartCount;
            showModal(`"${bookTitle}" has been added to your cart!`);
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }
});*/
