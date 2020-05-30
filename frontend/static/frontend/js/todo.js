

const fetchData=()=>{
	const url=`/todo/list`

	fetch(url,{
    method: "GET"
  })
	.then(res=>{
		if (res.ok) {
        return res.json();
    }
	})
	.then(data=>{
		TaskListing(data)
	});
};

const postData=(e)=>{
	e.preventDefault();
	let task=document.getElementById('new-task-input').value
	if (task){
		const url='/todo/new/'
		fetch(url,{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({'title':task})
		})
		.then(res=>{
			fetchData();
		})
	}
}

const putDataStrike=(e)=>{
	e.preventDefault()
	let id=parseInt(e.target.parentNode.parentNode.attributes['task-id'].value)
	let text=e.target.parentNode.nextSibling.innerText
	let checkboxValue=e.target.checked
	const url=`/todo/update/${id}/`
	fetch(url,{
		method:'PUT',
		headers:{
	'Content-Type':'application/json'
	},
	body:JSON.stringify({'status':checkboxValue})
	})
	.then(res=>{
		fetchData();
	})
}

const deleteData=(e)=>{
	e.preventDefault()
	let id=parseInt(e.target.parentNode.parentNode.attributes['task-id'].value)
	const url=`/todo/delete/${id}/`
	fetch(url,{
		method:'DELETE',
		headers:{
	'Content-Type':'application/json'
	},
	})
	.then(res=>{
		fetchData();
	})
}

const putDataText=(e)=>{
	e.preventDefault()
	let id=parseInt(e.target.parentNode.parentNode.attributes['task-id'].value)
	const url=`/todo/update/${id}/`
	// fetch(url,{
	// 	method:'PUT',
	// 	headers:{
	// 'Content-Type':'application/json'
	// },
	// body:JSON.stringify('title':)
	// })
	// .then(res=>{
	// 	fetchData();
	// })
}

const TaskListing=((data)=>{
	// console.log(data)
	const taskList=document.getElementById('tasks-list').getElementsByTagName('tbody')[0]
	taskList.innerHTML=''
	data.forEach(task=>{
		const checkboxStatus=document.createElement('input')
		checkboxStatus.setAttribute("type","checkbox")
		checkboxStatus.className='strike-checkbox'
		let textStyle=task.title;
		if(task.status===true){
			checkboxStatus.checked=true
			textStyle=`<strike>${textStyle}</strike>`
		}else{
			checkboxStatus.checked=false
		}

		const deleteButton=document.createElement('button')
		const editButton=deleteButton.cloneNode()

		deleteButton.className='delete-btn'
		editButton.className='edit-btn'

		deleteButton.textContent='D'
		editButton.textContent='E'


		const wrapperCheckbox=document.createElement('td')
		const wrapperText=document.createElement('td')
		const wrapperEditButton=document.createElement('td')
		const wrapperDeleteButton=document.createElement('td')

		const letItemRow=document.createElement('tr')
		letItemRow.setAttribute('task-id',task.id)

		editButton.addEventListener('click',putDataText);

		deleteButton.addEventListener('click',deleteData);

		checkboxStatus.addEventListener('change',putDataStrike);

		wrapperCheckbox.append(checkboxStatus)
		wrapperText.innerHTML=`${textStyle}`
		wrapperText.className=`text-data`
		wrapperEditButton.append(editButton)
		wrapperDeleteButton.append(deleteButton)

		letItemRow.append(wrapperCheckbox)
		letItemRow.append(wrapperText)
		letItemRow.append(wrapperEditButton)
		letItemRow.append(wrapperDeleteButton)

		taskList.append(letItemRow)
	})
});

		const addTaskForm=document.getElementById('new-task-form')
		addTaskForm.addEventListener('submit',postData);




fetchData();