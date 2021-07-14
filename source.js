const postsList = document.querySelector('.posts-list')
const addpostform = document.querySelector('.add-post-form')
const titleValue = document.getElementById('title-value')
const bodyValue = document.getElementById('body-value')
let addBtn  = document.getElementById("addBtn")

let output = '';

const renderPosts = (posts)=>{

    posts.forEach(post => {
        output += `
        <div class="card mt-4 col-md-6 bg-light" >
          <div class="card-body"data-id=${post.id}>
            <h5 class="card-title">${post.title}</h5>
            <h6 class ="card-subtitle mb-2">${post.id}</h6>
            <p class="card-text">${post.body}</p>
            <a href="#" class="card-link" onclick="editPosts()">Edit</a>
            <a href="#" class="card-link" id="delete-post">Delete</a>
          </div>
        </div>`;

    })

    postsList.innerHTML = output;
}
let url ='https://jsonplaceholder.typicode.com/posts'

fetch(url)
.then(res => res.json())
.then(data => renderPosts(data))



postsList.addEventListener("click",(e)=>{
    
  e.preventDefault();
  let deleteBtn =e.target.id =="delete-post";
  
  let parent = e.target.parentElement;
  let id = e.target.parentElement.dataset.id;

  if(deleteBtn){

    if(confirm('Are you sure you want to delete?'))
    {
        let  url = "https://jsonplaceholder.typicode.com/posts"
        fetch(`${url}/${id}`,{
        method: 'DELETE',
        })

        let td=parent.parentElement;
        let tf =td.parentElement;
        tf.removeChild(td);
    }
  }
})


function editPosts(index){
    
    let titleContent = document.querySelector('.card-title').textContent;
    let bodyContent = document.querySelector('.card-text').textContent;
    console.log(bodyContent)
    
    titleValue.innerHTML = titleContent;
    bodyValue.innerHTML = bodyContent;
 

  let saveBtn = document.getElementById("saveBtn")

  saveBtn.addEventListener("click",(e)=>{
       
    e.preventDefault();
    
    let a = titleValue.value;
    let b = bodyValue.value;
    let url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

      fetch(url,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title :titleValue.value,
            body  :bodyValue.value,
            userId : 1
        })
        
      })
      
      .then(res => res.json())
        .then((post)=>{
           
            let newtitleContent = document.querySelector('.card-title')
            let newbodyContent = document.querySelector('.card-text')
            console.log(newtitleContent)
    
            newtitleContent.textContent = post.title;
            newbodyContent.textContent = post.body;
        })
   
    }) 

  


addBtn.addEventListener("click",(e)=>{
    e.preventDefault();

     addList();
     

   
})



function addList(){
   
    let url = 'https://jsonplaceholder.typicode.com/posts'
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


addpostform.addEventListener("keyup",(e)=>{

    if(event.which===13){
        e.preventDefault();
        addList();
    }

})
