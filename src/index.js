document.addEventListener('DOMContentLoaded', () => {
    const ramenMenuDiv = document.getElementById('ramen-menu');
    const ramenDetailDiv = document.getElementById('ramen-detail');
    const ratingDisplay = document.getElementById('rating-display');
    const commentDisplay = document.getElementById('comment-display');
    const newRamenForm = document.getElementById('new-ramen');
  
    // Function to create an img tag with the given image URL
    function createImageElement(url) {
      const img = document.createElement('img');
      img.src = url;
      return img;
    }
  
    // Function to display the ramen details in the ramen-detail div
    function displayRamenDetails(ramen) {
      const { name, restaurant, image, rating, comment } = ramen;
      const detailImage = document.querySelector('.detail-image');
      const nameElement = document.querySelector('.name');
      const restaurantElement = document.querySelector('.restaurant');
  
      detailImage.src = image;
      detailImage.alt = name;
      nameElement.textContent = name;
      restaurantElement.textContent = restaurant;
      ratingDisplay.textContent = rating;
      commentDisplay.textContent = comment;
    }
  
    // Function to handle click events on ramen images
    function handleRamenClick(event) {
      const ramenId = event.target.dataset.id;
      const selectedRamen = ramens.find(ramen => ramen.id.toString() === ramenId);
  
      if (selectedRamen) {
        displayRamenDetails(selectedRamen);
      }
    }
  
    // Function to create a new ramen and add it to the ramen menu
    function addNewRamen(event) {
      event.preventDefault();
  
      const newRamen = {
        id: ramens.length + 1,
        name: document.getElementById('new-name').value,
        restaurant: document.getElementById('new-restaurant').value,
        image: document.getElementById('new-image').value,
        rating: parseInt(document.getElementById('new-rating').value),
        comment: document.getElementById('new-comment').value,
      };
  
      const img = createImageElement(newRamen.image);
      img.dataset.id = newRamen.id;
      img.addEventListener('click', handleRamenClick);
      ramenMenuDiv.appendChild(img);
  
      newRamenForm.reset();
    }
  
    // Fetch the ramen data from the server
    async function fetchRamenData() {
      try {
        const response = await fetch('./db.json');
        const data = await response.json();
        return data.ramens;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    // Initialize the page
    async function initializePage() {
      const ramens = await fetchRamenData();
  
      // Display ramen images in the ramen-menu div
      ramens.forEach(ramen => {
        const img = createImageElement(ramen.image);
        img.dataset.id = ramen.id;
        img.addEventListener('click', handleRamenClick);
        ramenMenuDiv.appendChild(img);
      });
  
      // Handle new ramen form submission
      newRamenForm.addEventListener('submit', addNewRamen);
    }
  
    initializePage();
  });
  
