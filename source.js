window.addEventListener('DOMContentLoaded',getPosts);

function getPosts(){
    try{
    	let url = 'https://jsonplaceholder.typicode.com/posts'
    	fetch(url).then((res)=>res.json()).then((posts)=>{
    		addPosts(posts);
    	})
    }catch(error){
    	console.log(error);
    	alert('Internet connection is poor,try again later!');
    }
};


function addPosts(posts) {
	let createTable = document.getElementById('createTable');
	for(let post= 0; post<posts.length; post++){
	  let newRow = createTable.insertRow();
	  let newCell1 = newRow.insertCell(0);
	  let newCell2 = newRow.insertCell(1);
	  let newCell3 = newRow.insertCell(2);
      
          let deleteBtn = document.createElement("BUTTON");
          let editBtn = document.createElement("BUTTON");
      
          let txtDelete = document.createTextNode("Delete");
          let txtEdit = document.createTextNode("Edit");

          deleteBtn.setAttribute('class','btn btn-danger badge-pill btn-sm');
          editBtn.setAttribute('class','btn btn-primary badge-pill btn-sm');

         deleteBtn.appendChild(txtDelete);
         deleteBtn.addEventListener('click',function(){deleteAlert(posts[post].id)});
         editBtn.appendChild(txtEdit);
         editBtn.addEventListener('click',function(){letsEdit(posts[post].id)});

	 newCell1.innerHTML = posts[post].id;
	 newCell2.innerHTML = posts[post].title;
	 newCell3.appendChild(editBtn);
	 newCell3.appendChild(deleteBtn);
	}
};

function deleteAlert(id){
	if(confirm('Are you sure you want to delete?')){
		deletPost(id);
	}
};

function deletPost(id){
	try{
		let url = 'https://jsonplaceholder.typicode.com/posts/'+id;
		fetch(url, {
  		method: 'DELETE',
        });
        let td = event.target.parentNode; 
        let tr = td.parentNode; 
        tr.parentNode.removeChild(tr);
	}
	catch(err){
		alert(err);
	}
};

function letsEdit(id){
	alert('Do some update');
};
