window.addEventListener('DOMContentLoaded',getPosts);

function getPosts(){
    try{
    	let url = 'https://jsonplaceholder.typicode.com/posts'
    	fetch(url).then((response)=>response.json()).then((posts)=>{
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
      let updateBtn = document.createElement("BUTTON");
      let txtDelete = document.createTextNode("Delete");
      let txtUpdate = document.createTextNode("Update");

  	  deleteBtn.setAttribute('class','btn btn-danger badge-pill btn-sm');
  	  updateBtn.setAttribute('class','btn btn-warning badge-pill btn-sm');

      deleteBtn.appendChild(txtDelete);
      deleteBtn.addEventListener('click',function(){deleteAlert(posts[post].id)});
      updateBtn.appendChild(txtUpdate);
      updateBtn.addEventListener('click',function(){updateView(posts[post].id)});

	  newCell1.innerHTML = posts[post].id;
	  newCell2.innerHTML = posts[post].title;
	  newCell3.appendChild(updateBtn);
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

function updateView(id){
	alert('update view clicked');
};
