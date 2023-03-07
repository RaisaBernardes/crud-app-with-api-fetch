const postsList = document.querySelector('.posts-list');
const addPostForm = document.querySelector('.add-post-form');
const titleValue = document.querySelector('#title-value');
const bodyValue = document.querySelector('#body-value')
let output = '';

const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `
        <div class="card mt-4 col-md-6 bg-light">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
                <p>${post.body}</p>
                <a href="#" class="card-link">Edit</a>
                <a href="#" class="card-link">Delete</a>
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
})