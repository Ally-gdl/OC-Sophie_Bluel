
let allWorks = [];

function displayWorks(works) { 
	const gallery = document.querySelector('.gallery');
	gallery.innerHTML = ''; 


	works.forEach(function(work) {


		const figure = document.createElement('figure');

		const img = document.createElement('img');


		img.src = work.imageUrl;
		img.alt = work.title;


		const figcaption = document.createElement('figcaption');
		figcaption.textContent = work.title;

		figure.appendChild(img);
		figure.appendChild(figcaption);
		gallery.appendChild(figure);
	});
}

function addFilterListeners() {

	const filterButtons = document.querySelectorAll('.filter-btn');

	filterButtons.forEach(function(btn) {

		btn.addEventListener('click', function() {

			filterButtons.forEach(function(b) {
				b.classList.remove('active');
			});



			btn.classList.add('active');

			const filter = btn.getAttribute('data-filter');

			if (filter === 'all') {
				displayWorks(allWorks);
			} else {
				const filteredWorks = allWorks.filter(function(work) { 
                  
					return work.categoryId === parseInt(filter); 
                    
                });
				displayWorks(filteredWorks);
                
			}
		});
	});
}


function displayCategories(categories) {


	const filtersDiv = document.querySelector('.filters');

	const allBtn = document.createElement('button');
	allBtn.classList.add('filter-btn', 'active');
	allBtn.textContent = 'All';
	allBtn.setAttribute('data-filter', 'all');
	filtersDiv.appendChild(allBtn);

	categories.forEach(function(category) {
		const btn = document.createElement('button');
		btn.classList.add('filter-btn');
		btn.textContent = category.name;
		btn.setAttribute('data-filter', category.id);
		filtersDiv.appendChild(btn);
	});

	addFilterListeners();
}


fetch('http://localhost:5678/api/works')
	.then(function(response) {
		return response.json();
	})
	.then(function(works) {
		allWorks = works; 
		displayWorks(allWorks); 

		
		return fetch('http://localhost:5678/api/categories');
	})
	.then(function(response) {
		return response.json();
	})
	.then(function(categories) {
		displayCategories(categories); 

		setupAdminMode();
	});

function setupAdminMode() {


	const token = localStorage.getItem('token');

	if (!token) return;

	const loginLink = document.querySelector('nav a[href="login.html"]');
	if (loginLink) {
		loginLink.textContent = 'Logout';
		loginLink.href = '#';

		loginLink.addEventListener('click', function() {
			localStorage.removeItem('token'); // delete the token
			window.location.reload(); // reload the page as a visitor
		});
	}

	document.querySelector('.filters').style.display = 'none';

	const adminBar = document.createElement('div');
	adminBar.id = 'admin-bar';
	adminBar.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Edit mode';
	document.body.insertBefore(adminBar, document.body.firstChild);

	const portfolioTitle = document.querySelector('#portfolio h2');
	const editBtn = document.createElement('button');
	editBtn.id = 'edit-btn';
	editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Edit';
	portfolioTitle.appendChild(editBtn);

	*/
	createModal();

	editBtn.addEventListener('click', function() {
		openModal();
	});
}


function createModal() {

	const overlay = document.createElement('div');
	overlay.id = 'modal-overlay';

	const box = document.createElement('div');
	box.id = 'modal-box';


	const closeBtn = document.createElement('button');
	closeBtn.id = 'modal-close';
	closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
	closeBtn.addEventListener('click', closeModal);

	const view1 = document.createElement('div');
	view1.id = 'modal-view1';

	const title1 = document.createElement('h3');
	title1.textContent = 'Photo Gallery';


	const modalGallery = document.createElement('div');
	modalGallery.id = 'modal-gallery';

	const hr1 = document.createElement('hr');


	const addPhotoBtn = document.createElement('button');
	addPhotoBtn.id = 'btn-add-photo';
	addPhotoBtn.textContent = 'Add a photo';
	addPhotoBtn.addEventListener('click', function() {
		showView(2);
	});

	view1.appendChild(title1);
	view1.appendChild(modalGallery);
	view1.appendChild(hr1);
	view1.appendChild(addPhotoBtn);

	const view2 = document.createElement('div');
	view2.id = 'modal-view2';
	view2.style.display = 'none'; 

	const backBtn = document.createElement('button');
	backBtn.id = 'modal-back';
	backBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
	backBtn.addEventListener('click', function() {
		showView(1);
	});

	const title2 = document.createElement('h3');
	title2.textContent = 'Add a photo';

	const uploadArea = document.createElement('div');
	uploadArea.id = 'upload-area';


	const uploadIcon = document.createElement('i');
	uploadIcon.className = 'fa-regular fa-image';

	const fileInput = document.createElement('input');
	fileInput.type = 'file';
	fileInput.id = 'photo-file';
	fileInput.accept = 'image/*'; 
	fileInput.style.display = 'none'; 

	const uploadLabel = document.createElement('label');
	uploadLabel.htmlFor = 'photo-file'; 
	uploadLabel.textContent = '+ Add photo';
	uploadLabel.id = 'upload-label';

	const uploadHint = document.createElement('p');
	uploadHint.textContent = 'jpg, png : 4mb max';

	
	const preview = document.createElement('img');
	preview.id = 'photo-preview';
	preview.style.display = 'none';

	uploadArea.appendChild(uploadIcon);
	uploadArea.appendChild(fileInput);
	uploadArea.appendChild(uploadLabel);
	uploadArea.appendChild(uploadHint);
	uploadArea.appendChild(preview);

	
	fileInput.addEventListener('change', function() {
		if (this.files[0]) {
			preview.src = URL.createObjectURL(this.files[0]);
			preview.style.display = 'block';
			uploadIcon.style.display = 'none';
		}
	});

	
	const labelTitle = document.createElement('label');
	labelTitle.textContent = 'Title';
	const inputTitle = document.createElement('input');
	inputTitle.type = 'text';
	inputTitle.id = 'photo-title';

	
	const labelCat = document.createElement('label');
	labelCat.textContent = 'Category';
	const selectCat = document.createElement('select');
	selectCat.id = 'photo-category';

	
	fetch('http://localhost:5678/api/categories')
		.then(function(res) { return res.json(); })
		.then(function(categories) {
			categories.forEach(function(cat) {
				const option = document.createElement('option');
				option.value = cat.id;
				option.textContent = cat.name;
				selectCat.appendChild(option);
			});
		});

	const hr2 = document.createElement('hr');

	const submitBtn = document.createElement('button');
	submitBtn.id = 'photo-submit';
	submitBtn.textContent = 'Validate';
	submitBtn.addEventListener('click', submitNewPhoto);

	view2.appendChild(backBtn);
	view2.appendChild(title2);
	view2.appendChild(uploadArea);
	view2.appendChild(labelTitle);
	view2.appendChild(inputTitle);
	view2.appendChild(labelCat);
	view2.appendChild(selectCat);
	view2.appendChild(hr2);
	view2.appendChild(submitBtn);

	
	box.appendChild(closeBtn);
	box.appendChild(view1);
	box.appendChild(view2);
	overlay.appendChild(box);
	document.body.appendChild(overlay); 

	
	overlay.addEventListener('click', function(event) {
		if (event.target === overlay) {
			closeModal();
		}
	});
}


function openModal() {
	document.getElementById('modal-overlay').style.display = 'flex';
	showView(1);
	fillModalGallery();
}


function closeModal() {
	document.getElementById('modal-overlay').style.display = 'none';
}


function showView(number) {
	document.getElementById('modal-view1').style.display = number === 1 ? 'block' : 'none';
	document.getElementById('modal-view2').style.display = number === 2 ? 'block' : 'none';
}



function fillModalGallery() {
	const modalGallery = document.getElementById('modal-gallery');
	modalGallery.innerHTML = ''; 
	allWorks.forEach(function(work) {
		const figure = document.createElement('figure');

		const img = document.createElement('img');
		img.src = work.imageUrl;
		img.alt = work.title;

		const deleteBtn = document.createElement('button');
		deleteBtn.classList.add('delete-btn');
		deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

		deleteBtn.addEventListener('click', function() {
			deleteWork(work.id, figure);
		});

		figure.appendChild(img);
		figure.appendChild(deleteBtn);
		modalGallery.appendChild(figure);
	});
}



function deleteWork(id, figureElement) {
	const token = localStorage.getItem('token');

	fetch('http://localhost:5678/api/works/' + id, {
		method: 'DELETE',
		headers: {
			
			'Authorization': 'Bearer ' + token
		}
	})
	.then(function(response) {
		if (response.ok) {
			
			figureElement.remove();

			allWorks = allWorks.filter(function(work) {
				return work.id !== id;
			});

			displayWorks(allWorks);
		} else {
			alert('Could not delete this work.');
		}
	});
}


function submitNewPhoto() {
	const token = localStorage.getItem('token');

	const file = document.getElementById('photo-file').files[0]; 
	const title = document.getElementById('photo-title').value;
	const category = document.getElementById('photo-category').value;

	if (!file || !title || !category) {
		alert('Please fill in all fields.');
		return;
	}

	const formData = new FormData();
	formData.append('image', file);
	formData.append('title', title);
	formData.append('category', category);

	fetch('http://localhost:5678/api/works', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + token
			
		},
		body: formData
	})
	.then(function(response) {
		if (response.ok) {
			return response.json(); 
		} else {
			alert('Error: could not add this photo.');
		}
	})
	.then(function(newWork) {
		if (newWork) {
			allWorks.push(newWork); 

			displayWorks(allWorks); 

			showView(1);
			fillModalGallery();

			document.getElementById('photo-file').value = '';
			document.getElementById('photo-title').value = '';
			document.getElementById('photo-preview').style.display = 'none';
			document.querySelector('#upload-area .fa-regular').style.display = 'block';
		}
	});
}