const bookList = [];

const bmsObject = {    

        addBookToList()
        {
            const form = document.getElementById('book-form');
            form.addEventListener('submit' , (e) =>{
            e.preventDefault();

            // slecting querry form hrml into variables
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

            const book = {title , author , isbn , year, genre};

            if ( !title || !author || !isbn || !year || !genre) 
                {
                    alert('Add all fields before adding the books');
                    return;
                }
            else
            {
                bookList.push(book);

                titleElement.value= '';
                authorElement.value = '';
                isbnElement.value = '';
                yearElement.value = '';
                genreElement.value = '';

                this.renderBooks();
                
            }
        });
        },

        renderBooks()
        {
            const tbody = document.querySelector('.book-table');
            tbody.innerHTML='';

            bookList.forEach((book , index) => 
                {
                   const age = this.calculateAge(); 
                   const category = this.categorizedGenre(book.genre); 
                   const row =  
                   `
                    <tr>
                        <td data-label="title">${book.title}</td>
                        <td data-label="author">${book.author}</td>
                        <td data-label="isbn">${book.isbn}</td>
                        <td data-label="year">${book.year}</td>
                        <td data-label="year">${book.genre}</td>
                        <td data-label="genre">${age}</td>
                        <td data-label="category">${category}</td>

                        <td data-label="Edit">    
                            <button class="edit-button">Edit</button>
                        </td>
                
                        <td data-label="Delete">    
                            <button class="delete-button">Delete</button>
                        </td>
                    </tr>
                   `
                   tbody.insertAdjacentHTML('beforeend', row);
                    
                });  

                
            document.querySelectorAll('.delete-button')
            .forEach((deleteButtonElement, index) =>
            {
                deleteButtonElement.addEventListener('click' , () => 
                    {
                    bookList.splice(index, 1); 
                    this.renderBooks();
                    });
                deleteButtonElement.addEventListener('click' , () =>
                    {
                        alert('book is deleted');
                    });
            });

        },

        editBook(index)
        {
            
            const book = bookList[index];
            document.getElementById('title').value = book.title;
            document.getElementById('author').value = book.author;
            document.getElementById('isbn').value = book.isbn;
            document.getElementById('year').value = book.year;
            document.getElementById('genre').value = book.genre;

            bookList.splice(index, 1);
            this.renderBooks();
        },

        calculateAge(year) 
        {
            const publishYear = parseInt(document.getElementById('year').value.trim());
            const currentYear = new Date().getFullYear;
            const age = parseInt(currentYear - publishYear);
            return age;
        },

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
        },
    
};

bmsObject.addBookToList();




