const bookList = [];


const calculateAge = () => 
{
    const publishYear = parseInt(document.getElementById('year').value.trim());
    const currentYear = new Date().getFullYear();

    const age = currentYear - publishYear;
    const inputElement =  document.querySelector('.age-input');
    inputElement.value = age 
};

const ageElement = document.querySelector('.age-button');
ageElement.addEventListener('click' , calculateAge);

const addBookToList = () =>
{
    // slecting querry form hrml into variables
    const titleElement = document.querySelector('.title');
    const authorElement = document.querySelector('.author');
    const isbnElement = document.querySelector('.isbn');
    const yearElement = document.querySelector('.year');
    const ageElement = document.querySelector('.age-input');
    const genreElement = document.querySelector('.genre');

    // putting querry values into a varable
    const title = titleElement.value;
    const author = authorElement.value;
    const isbn = isbnElement.value;
    const year = yearElement.value;
    const age = ageElement.value;
    const genre = genreElement.value;
    

    if (!title || !author || !isbn || !year || !age || !genre) {
        alert("Add all fields than add the book");
        return;
    }
    else{
    bookList.push({title, author, isbn, year, age, genre});

    // will make input box back to empty like a reset form
    titleElement.value= '';
    authorElement.value = '';
    isbnElement.value = '';
    yearElement.value = '';
    ageElement.value = '';
    genreElement.value = '';


    renderBooks();
    }
};

const renderBooks = () =>
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
            <button class="delete-button"> Delete </button>
            `
            bookHtml += divHtml;
        }

        document.querySelector('.book-render').innerHTML = bookHtml;

        document.querySelectorAll('.delete-button')
        .forEach((deleteButtonElement, index) =>
            {
                deleteButtonElement.addEventListener('click' , () => 
                    {
                    bookList.splice(index, 1); 
                    renderBooks();
                    });
                deleteButtonElement.addEventListener('click' , () =>
                    {
                        alert('book is deleted');
                    })
            }
        );
       
};

// added event listner instead on onclick - better way
const buttonElement = document.querySelector('.add-button');
buttonElement.addEventListener('click' , addBookToList );













// document.getElementById('Book-Form').
//         addEventListener('submit' , (e) => 
//         {
//             e.preventDefault();

//             const title = document.getElementById('title').value.trim();
//             const author = document.getElementById('author').value.trim();
//             const isbn = document.getElementById('isbn').value.trim();
//             const year = document.getElementById('year').value.trim();
//             const age = document.getElementById('age-button').value.trim();
//             const genre = document.getElementById('genre').value.trim();

//             if(!title || !author || !isbn || !year || !genre || !age)
//             {
//                 alert("Make sure to fill all fields");
//                 return;
//             }

//             if (isNaN(isbn)) {
//                 alert("ISBN should be a number.");
//                 return;
//             }

//         });

// class Book
// {
//     constructor(title, author, isbn, year, genre) 
//     {
//     this.title = title;
//     this.author = author;
//     this.isbn = isbn;
//     this.year = parseInt(year);
//     this.genre = genre;
//     }
    
// }

