class Book
{
    bookList = [];
    age = undefined;

    constructor()
    {
        this.start();
    }

    start()  // Valadating and calling add function.
    {
        const form = document.getElementById('book-form');
        form.addEventListener('submit' , 
            (e) => {e.preventDefault();

        const book = this.querrySelector();
        this.addBookToList(book);
        form.reset();
        });
    }

    querrySelector() // returning book object with values from html page.
    {
        // slecting querry from html into variables
        const titleElement = document.querySelector('.title');
        const authorElement = document.querySelector('.author');
        const isbnElement = document.querySelector('.isbn');
        const yearElement = document.querySelector('.year');
        const genreElement = document.querySelector('.genre');
        
        // putting querry values into a varable
        const title = titleElement.value;
        const author = authorElement.value;
        const isbn = isbnElement.value;
        const year = yearElement.value;
        const genre = genreElement.value;

        // Validation 
        if (!title || !author || !isbn || !year || !genre) {
           return alert('Fill all the fields');
        }
        else{
        const book = 
        {title : title, author : author, isbn : isbn, year : year, genre : genre};

        return book;
        }
    }


    addBookToList(book)
    {
        this.bookList.push(book);
        alert('book added to the database');
        this.age = this.calculateAge();
        this.renderBooks();
        return;
    }

    calculateAge() 
    {
        const publishYear = parseInt(document.getElementById('year').value.trim());
        const currentYear = new Date().getFullYear();

        const age1 = currentYear - publishYear;
        return age1;
    }

    renderBooks()
    {
        let bookHtml = '';
        const tbody = document.querySelector('.book-table');         tbody.innerHTML='';

        for(let i = 0; i < this.bookList.length ; i++)
            {
                const bookObject = this.bookList[i];
                const{title , author , isbn , year , genre} = bookObject;
                const category = this.categorizedGenre(genre); 
                const row =  
                `
                <tr>
                    <td data-label="title">${title}</td>
                    <td data-label="author">${author}</td>
                    <td data-label="isbn">${isbn}</td>
                    <td data-label="year">${year}</td>
                    <td data-label="year">${genre}</td>
                    <td data-label="genre">${this.age}</td>
                    <td data-label="category">${category}</td>

                    <td data-label="Edit">    
                        <button type = "button" class="edit-button">Edit</button>
                    </td>
            
                    <td data-label="Delete">    
                        <button type = "button" class="delete-button">Delete</button>
                    </td>
                </tr>
                `
                bookHtml += row;
            }  

        tbody.insertAdjacentHTML('beforeend', bookHtml);
            
        document.querySelectorAll('.delete-button')
        .forEach((deleteButtonElement, index) =>
        {
            deleteButtonElement.addEventListener('click',() => 
                {
                    this.deleteBook(index);
                });
        });

        document.querySelectorAll('.edit-button')
        .forEach((editButtonElement, index) =>
        {
           
            editButtonElement.addEventListener('click',() => 
                {
                   this.editBook(index);
                }); 
        });
    }

    deleteBook(index) 
    {
        this.bookList.splice(index, 1);
        setTimeout(
            () => {alert('book is deleted')},500);
        this.renderBooks();
    }

    categorizedGenre(genre)
    {
        const genreMap = 
        {
            action:'Action',
            thriler:'Thriler',
            romance: 'Romance',
            fiction: 'Fiction',
            nonfiction: 'Non-Fiction',
            mystery: 'Mystery',
            scifi: 'Science Fiction',
            fantasy: 'Fantasy'
        };

        return genreMap[genre.toLowerCase()] || 'other';
    }

    editBook(index) 
    {
        const book = this.bookList[index];

        document.querySelector('.title').value = book.title;
        document.querySelector('.author').value = book.author;
        document.querySelector('.isbn').value = book.isbn;
        document.querySelector('.year').value = book.year;
        document.querySelector('.genre').value = book.genre;


        this.updateBook(index);
        
    }

    updateBook(index)
    {
        this.bookList.splice(index, 1);
    }

}

const button = document.querySelector('.add-button');
button.addEventListener('click', new Book());





