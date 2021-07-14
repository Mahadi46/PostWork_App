const postsList = document.querySelector('.posts-list')
const addpostform = document.querySelector('.add-post-form')
const titleValue = document.getElementById('title-value')
const bodyValue = document.getElementById('body-value')
const btnSubmit = document.querySelector('.btn')
let output = '';
const url = "https://jsonplaceholder.typicode.com/users/1/posts";

const renderPosts = (posts)=>{
    posts.forEach(post => {
        output += `
        <div class="card mt-4 col-md-6 bg-light" >
          <div class="card-body"data-id=${post.id}>
            <h5 class="card-title">${post.title}</h5>
            <h6 class ="card-subtitle mb-2">${post.id}</h6>
            <p class="card-text">${post.body}</p>
            <a href="#" class="card-link" id="edit-post">Edit</a>
            <a href="#" class="card-link" id="delete-post">Delete</a>
          </div>
        </div>`;
    })
    postsList.innerHTML = output;
}



fetch(url)
.then(res => res.json())
.then(data => renderPosts(data))

postsList.addEventListener("click",(e)=>{
    
    e.preventDefault();
  let deleteBtn =e.target.id =="delete-post";
  let editBtn =e.target.id =="edit-post";
  let parent = e.target.parentElement;
  let id= e.target.parentElement.dataset.id;

  if(deleteBtn){

    if(confirm('Are you sure you want to delete?'))
    {
        fetch(`${url}/${id}`,{
        method: 'DELETE',
        })
        let td=parent.parentElement;
        let tf =td.parentElement;
        tf.removeChild(td);
    }
  }
  if(editBtn){
    let titleContent = parent.querySelector('.card-title').textContent;
    let bodyContent = parent.querySelector('.card-text').textContent;
    let newtitleContent = parent.querySelector('.card-title')
    let newbodyContent = parent.querySelector('.card-text')
    titleValue.value = titleContent;
    bodyValue.value = bodyContent;
  
    btnSubmit.addEventListener("click",(e)=>{
    e.preventDefault();
    
     let a = titleValue.value;
     let b = bodyValue.value;
    
     fetch(url,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title : a,
            body  : b,
            userId : 1
        })
        
    })
    .then(res => res.json())
        .then((post)=>{
           
            
            newtitleContent.textContent = post.title;
            newbodyContent.textContent = post.body;
        })
   
   }) 
  
  } 
})
  
   
addpostform.addEventListener("submit",(e)=>{
    e.preventDefault();
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
})
