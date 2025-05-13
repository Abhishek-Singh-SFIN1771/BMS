const bookList = [];

function calculateAge ()
{
    const publishYear = parseInt(document.getElementById('year').value.trim());
    const currentYear = new Date().getFullYear();

    const age = currentYear - publishYear;
    console.log(age);

    const inputElement =  document.querySelector('.js-age-input');
    inputElement.value = age 
    console.log(inputElement);
    

}

function addBookToList()
{
    // slecting querry form hrml into variables
    const titleElement = document.querySelector('.js-title');
    const authorElement = document.querySelector('.js-author');
    const isbnElement = document.querySelector('.js-isbn');
    const yearElement = document.querySelector('.js-year');
    const ageElement = document.querySelector('.js-age-input');
    const genreElement = document.querySelector('.js-genre');

    // putting querry values into a varable
    const title = titleElement.value;
    const author = authorElement.value;
    const isbn = isbnElement.value;
    const year = yearElement.value;
    const age = ageElement.value;
    const genre = genreElement.value;

    bookList.push({title, author, isbn, year, age, genre});
    console.log(bookList);

    // will make input box back to empty like a reset form
    titleElement.value= '';
    authorElement.value = '';
    isbnElement.value = '';
    yearElement.value = '';
    ageElement.value = '';
    genreElement.value = '';


    renderBooks();

}

function renderBooks()
{
    let bookHtml = '';

    for(let i = 0; i < bookList.length; i++)
        {
            const bookObject = bookList[i];
            const{title , author , isbn , year , age , genre} = bookObject;

            const divHtml = `
            <div>
            ${title} 
            </div>
            <div>
            ${author} 
            </div>
            <div>
            ${isbn} 
            </div>
            <div>
            ${year} 
            </div>
            <div>
            ${age} 
            </div>
            <div>
            ${genre}
            </div>
            <button  onclick="bookList.splice(${i}, 1); 
        renderBooks();" class="js-delete-button"> Delete </button>
            `
            bookHtml += divHtml;
        }

        document.querySelector('.js-book-render').innerHTML = bookHtml;
}



document.getElementById('Book-Form').
        addEventListener('submit' , (e) => 
        {
            e.preventDefault();

            const titile = document.getElementById('title').value.trim();
            const author = document.getElementById('author').value.trim();
            const isbn = document.getElementById('isbn').value.trim();
            const date = document.getElementById('year').value.trim();
            const genre = document.getElementById('genre').value.trim();

            if(!titile || !author || !isbn || !year || !genre)
            {
                alert("Make sure to fill all fields");
                return;
            }

            if (isNaN(isbn)) {
                alert("ISBN should be a number.");
                return;
            }

        });

class Book
{
    constructor(title, author, isbn, year, genre) 
    {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.year = parseInt(year);
    this.genre = genre;
    }
    
}

