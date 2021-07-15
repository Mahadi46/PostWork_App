const postsList = document.querySelector('.posts-list')
const addpostform = document.querySelector('.add-post-form')
const titleValue = document.getElementById('title-value')
const bodyValue = document.getElementById('body-value')
let addBtn  = document.getElementById("addBtn")
let output = '';
const url = "https://jsonplaceholder.typicode.com/posts";

document.addEventListener('DOMContentLoaded', () => {

   fetch(url)
  .then((response) => response.json())
  .then((posts) => renderPosts(posts))
  .catch((err)=>alert(`${err.name} occurs!`))
});

function renderPosts(posts) {
    posts.forEach(post => {
        output += `
        <div class="card mt-4 col-md-6 bg-light" >
          <div class="card-body"data-id=${post.id}>
            <h5 class="card-title" id = "postTitle">${post.title}</h5>
            <h6 class ="card-subtitle mb-2" id= "postId">Post Id : ${post.id}</h6>
            <h6 class ="card-subtitle mb-2" id = "userId">${post.userId}</h6>
            <p class="card-text" id="postBody">${post.body}</p>
            <a href="#" class="card-link" onclick="editPost(${post.id})">Edit</a>
            <a href="#" class="card-link" onclick="deletePost(${post.id})">Delete</a>
          </div>
        </div>`;

    })

    postsList.innerHTML = output;
}

function deletePost(postId) {

    let deleteBtn =event.target;
    let parent = deleteBtn.parentElement;
    let id = parent.dataset.id;

    if(confirm('Are you sure you want to delete?'))

    {
        let grandParent=parent.parentElement;
        let bossParent =grandParent.parentElement;

        fetch(`${url}/${postId}`,{
        method: 'DELETE',
        })

        .then(()=>
        bossParent.removeChild(grandParent))
    }
}


function editPost(postId){

    let updatePostDiv = document.getElementById('updatePostDiv');
    updatePostDiv.style.display = 'block';

    let editBtn =event.target;
    let saveUpdateBtn = document.getElementById('saveUpdateBtn');
    let parent = editBtn.parentElement;
    let titleContent = parent.querySelector('#postTitle').innerHTML;
    let bodyContent = parent.querySelector('#postBody').textContent;
    let userId = parent.querySelector('#userId').textContent;
    let postBodyField = updatePostDiv.querySelector('#postBodyField');
    let postTitleField = updatePostDiv.querySelector('#postTitleField');
    
    postTitleField.value = titleContent;
    postBodyField.value = bodyContent;

    saveUpdateBtn.addEventListener("click",(e)=>{

       e.preventDefault();
    
      let newPostTitleField =  postTitleField.value;
      let newPostBodyField = postBodyField.value;

      fetch(`${url}/${postId}`, {
          method: 'PUT',
          body: JSON.stringify({
            id: postId,
            title:  newPostTitleField,
            body:  newPostBodyField ,
            userId: parseInt(userId),
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },

        })

          .then((response) => response.json())
          .then((post) => {
            parent.querySelector('#postTitle').innerHTML = post.title;
            parent.querySelector('#postBody').innerHTML = post.body;
            alert('Update successfull')
        })

        .catch((err)=>alert(`${err.name} occurs`)) ;
        updatePostDiv.style.display = 'none'; 
        
      })
      
}
  

addBtn.addEventListener("click",(e)=>{

    e.preventDefault();

     addList();
     

   
})



function addList(){
   
    fetch(url,{

        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
        userId: 1,
        title: titleValue.value,
        body: bodyValue.value
        })
    })
  
  

    .then(res => res.json())
    .then(data =>{

        const dataArr =[]
        dataArr.push(data);
        renderPosts(dataArr);
        alert("Successfully added")
        
    })

    titleValue.value = '';
    bodyValue.value = '';
}


bodyValue.addEventListener("keyup",(e)=>{

    if(event.which===13){

        e.preventDefault();
        addList();
    }

})

