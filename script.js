//Listen for submit form

formSubmit=document.querySelector('#zipForm');
formSubmit.addEventListener('submit',getLocationInfo);

//Add event for Delete button

document.querySelector('body').addEventListener('click',deleteFunction);




 function getLocationInfo(e){
 	e.preventDefault();
 	const zipInput = document.querySelector('.zip').value;
	console.log(zipInput);

	//Make request 

	fetch (`http://api.zippopotam.us/us/${zipInput}`)
	.then(response=>{
		if(response.status !=200){
			showIcon('remove')
			document.querySelector('#output').innerHTML = 
			`
			<article class="message message-body is-danger">
				Invalid ZipCode , please try again
			</article>	
			`;
			throw Error(response.statusText)
		}else{
			showIcon('check');
			return response.json();
		}
	})
	.then(data =>{
		
		// console.log(data);
		//Show Location Info

		let output = '';
		data.places.forEach(place=>{
			output+=`
				<article class="message is-primary">
					<div class="message-header">
						<p>Location Info></p>
						<button class="delete"></button>
					</div>
					<div class="message-body">
					<ul>
						<li><strong>City: </strong>${place ['place name']}</li>
						<li><strong>State: </strong>${place ['state']}</li>
						<li><strong>Longitude: </strong>${place ['longitude']}</li>
						<li><strong>Latitude: </strong>${place ['latitude']}</li>
					</ul>
					</div>
				</article>
			`
		})
		//Insert into output div

		document.querySelector('#output').innerHTML=output;

		

	})
	.catch(err=>console.log(err))
	

	

	}
	function showIcon(icon){
		//Clear icons
		document.querySelector('.icon-remove').style.display = 'none';
		document.querySelector('.icon-check').style.display = 'none';

		//Show coorect icon
		document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';

	}
	function deleteFunction(e) {
		// console.log(123)
		if(e.target.className=='delete'){
			// console.log(123);
			document.querySelector('.message').remove();
			document.querySelector('.zip').value=''
			document.querySelector('.icon-check').remove();
	
		}
	}

