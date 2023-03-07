const postsList = document.querySelector('.posts-list');
const addPostForm = document.querySelector('.add-post-form');
const titleValue = document.querySelector('#title-value');
const bodyValue = document.querySelector('#body-value')
const btnSubmit = document.querySelector('.btn') 
let output = '';

const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `
        <div class="card mt-4 col-md-6 bg-light">
            <div class="card-body" data-id=${post._id}>
                <h5 class="card-title">${post.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
                <p class="card-text">${post.body}</p>
                <a href="#" class="card-link" id="edit-post">Edit</a>
                <a href="#" class="card-link" id="delete-post">Delete</a>
            </div>
        </div>
        `;
    });
    postsList.innerHTML = output;
}


const url = 'http://localhost:5000/api/posts';

//Get - Read posts
//Method: GET
fetch(url)
.then(res => res.json())
.then(data => {renderPosts(data)})


//--Delete and Update auxiliar coding
postsList.addEventListener('click', (event) => {
    event.preventDefault();
    let delButtonIsPressed = event.target.id == 'delete-post';
    let editButtonIsPressed = event.target.id == 'edit-post';

    let id = event.target.parentElement.dataset.id;

    //Delete - Remove an existing post
    //method: DELETE
    if(delButtonIsPressed) {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(() => location.reload()) //reloads the page
    };

    //Update an existing post
    //method: PATCH
    if(editButtonIsPressed){
        const parent = event.target.parentElement;
        let titleContent = parent.querySelector('.card-title').textContent;
        let bodyContent = parent.querySelector('.card-text').textContent;
        
        titleValue.value = titleContent;
        bodyValue.value = bodyContent;
    }

    btnSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleValue.value,
                body: bodyValue.value,
            })
        })
        .then(res => res.json())
        .then(() => location.reload())
    })
})




//Create - Insert new post
//Method: POST
addPostForm.addEventListener('submit', (event) => {
    event.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title: titleValue.value,
            body: bodyValue.value
        })
    })
    .then(res => res.json())
    .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderPosts(dataArr);
    })

    //reset input field to empty
    titleValue.value = '';
    bodyValue.value = '';
})