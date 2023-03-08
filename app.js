// document.addEventListener('DOMContentLoaded', function () {
//     const list = document.querySelector('#movie-list ul');
//     const forms = document.forms;

//     //delete movie
//     list.addEventListener('click', function (e) {
//         if (e.target.className == 'delete') {
//             const li = e.target.parentElement;
//             // display a confirmation dialog box
//             if (confirm('Are you sure you want to delete this movie?')) {
//                 li.parentNode.removeChild(li);
//             }
//         }
//     });

//     //add movie 
//     const addForm = forms['add-movie'];
//     addForm.addEventListener('submit', function (e) {
//         e.preventDefault();

//         //creating elements
//         const value = addForm.querySelector('input[type="text"]').value;
//         const li = document.createElement('li');
//         const movieName = document.createElement('span');
//         const deleteBtn = document.createElement('span');

//         //add text content
//         movieName.textContent = value;
//         deleteBtn.textContent = 'delete';

//         //add classes
//         movieName.classList.add('name');
//         deleteBtn.classList.add('delete');

//         //append to DOM
//         li.appendChild(movieName);
//         li.appendChild(deleteBtn);
//         list.appendChild(li);

//         //clear user input
//         addForm.querySelector('input[type="text"]').value = '';
//     });
// });




// document.addEventListener('DOMContentLoaded', function () {
//     const list = document.querySelector('#movie-list ul');
//     const forms = document.forms;

//     //delete movie
//     list.addEventListener('click', function (e) {
//         if (e.target.className == 'delete') {
//             const li = e.target.parentElement;
//             // display a confirmation dialog box
//             if (confirm('Are you sure you want to delete this movie?')) {
//                 li.parentNode.removeChild(li);
//                 // update the movie list in the cookie
//                 updateMovieListCookie();
//             }
//         }
//     });

//     //add movie 
//     const addForm = forms['add-movie'];
//     addForm.addEventListener('submit', function (e) {
//         e.preventDefault();

//         //creating elements
//         const value = addForm.querySelector('input[type="text"]').value;
//         const li = document.createElement('li');
//         const movieName = document.createElement('span');
//         const deleteBtn = document.createElement('span');

//         //add text content
//         movieName.textContent = value;
//         deleteBtn.textContent = 'delete';

//         //add classes
//         movieName.classList.add('name');
//         deleteBtn.classList.add('delete');

//         //append to DOM
//         li.appendChild(movieName);
//         li.appendChild(deleteBtn);
//         list.appendChild(li);

//         // update the movie list in the cookie
//         updateMovieListCookie();

//         //clear user input
//         addForm.querySelector('input[type="text"]').value = '';
//     });

//     // load the movie list from the cookie when the page is loaded
//     loadMovieListFromCookie();

//     function updateMovieListCookie() {
//         // get the list of movie names
//         const movieNames = [];
//         list.querySelectorAll('.name').forEach(function (movieName) {
//             movieNames.push(movieName.textContent);
//         });

//         // convert the list to a JSON string and store it in a cookie
//         document.cookie = 'movieList=' + JSON.stringify(movieNames) + '; expires=' + new Date(Date.now() + 86400000).toUTCString();
//     }

//     function loadMovieListFromCookie() {
//         // get the cookie value
//         const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)movieList\s*\=\s*([^;]*).*$)|^.*$/, '$1');
//         if (cookieValue) {
//             // convert the JSON string to an array of movie names
//             const movieNames = JSON.parse(cookieValue);
//             // create a movie list item for each movie name and add it to the DOM
//             movieNames.forEach(function (movieName) {
//                 const li = document.createElement('li');
//                 const span = document.createElement('span');
//                 const deleteBtn = document.createElement('span');
//                 span.textContent = movieName;
//                 deleteBtn.textContent = 'delete';
//                 span.classList.add('name');
//                 deleteBtn.classList.add('delete');
//                 li.appendChild(span);
//                 li.appendChild(deleteBtn);
//                 list.appendChild(li);
//             });
//         }
//     }
// });




document.addEventListener('DOMContentLoaded', function () {
    const list = document.querySelector('#movie-list ul');
    const forms = document.forms;

    // delete movie
    list.addEventListener('click', function (e) {
        if (e.target.className == 'delete') {
            const li = e.target.parentElement;
            li.parentNode.removeChild(li);
        } else if (e.target.className == 'edit') {
            const li = e.target.parentElement;
            const movieName = li.querySelector('.name');
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = movieName.textContent;
            li.insertBefore(editInput, movieName);
            li.removeChild(movieName);
            e.target.textContent = 'Save';
            e.target.classList.remove('edit');
            e.target.classList.add('save');
        } else if (e.target.className == 'save') {
            const li = e.target.parentElement;
            const editInput = li.querySelector('input[type="text"]');
            const movieName = document.createElement('span');
            movieName.classList.add('name');
            movieName.textContent = editInput.value;
            li.insertBefore(movieName, editInput);
            li.removeChild(editInput);
            e.target.textContent = 'Edit';
            e.target.classList.remove('save');
            e.target.classList.add('edit');
        }
    });

    // add movie 
    const addForm = forms['add-movie'];
    addForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // creating elements
        const value = addForm.querySelector('input[type="text"]').value;
        const li = document.createElement('li');
        const movieName = document.createElement('span');
        const deleteBtn = document.createElement('span');
        const editBtn = document.createElement('span');

        // add text content
        movieName.textContent = value;
        deleteBtn.textContent = 'delete';
        editBtn.textContent = 'edit';

        // add classes
        movieName.classList.add('name');
        deleteBtn.classList.add('delete');
        editBtn.classList.add('edit');

        // append to DOM
        li.appendChild(movieName);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        list.appendChild(li);

        // clear input
        addForm.querySelector('input[type="text"]').value = '';

        // store movie list in cookies
        const movieList = list.innerHTML;
        document.cookie = `movieList=${movieList}`;
    });

    // load movie list from cookies
    const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)movieList\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (cookieValue) {
        list.innerHTML = cookieValue;
    }
});
