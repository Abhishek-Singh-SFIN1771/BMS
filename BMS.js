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

function calculateAge ()
{
    const publishYear = parseInt(document.getElementById('year').value.trim());
    
    const currentYear = new Date().getFullYear();

    const age = currentYear - publishYear;
    
    const ageInput = document.querySelector('.js-age-input');
    ageInput.value = age + ' years';
}
