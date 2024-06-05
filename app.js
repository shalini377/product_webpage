document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = 'https://dummyjson.com/products?limit=100';
    const productGrid = document.getElementById('product-grid');
    const searchBar = document.getElementById('search-bar');
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modal-image');
    const modalContentDetails = document.getElementById('modal-content-details');
    const span = document.getElementsByClassName('close')[0];
    const navHamburger = document.querySelector('.nav-hamburger');
    const navContainer = document.querySelector('.nav-container');
  
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => displayProducts(data.products));
  
    function displayProducts(products) {
      productGrid.innerHTML = '';
      products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'grid-item';
        productItem.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}">
          <h2>${product.title}</h2>
          <p>$${product.price}</p>
        `;
        productItem.addEventListener('click', () => showProductDetails(product));
        productGrid.appendChild(productItem);
      });
    }
  
    function showProductDetails(product) {
      modalImage.src = product.thumbnail;
      modalImage.alt = product.title;
      modalContentDetails.innerHTML = `
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <p>Category: ${product.category}</p>
        <p>Brand: ${product.brand}</p>
      `;
      modal.style.display = 'block';
    }
  
    span.onclick = function() {
      modal.style.display = 'none';
    }
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    }
  
    searchBar.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
          const filteredProducts = data.products.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
          );
          displayProducts(filteredProducts);
        });
    });
  
    navHamburger.addEventListener('click', () => {
      navContainer.classList.toggle('active');
    });
  
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navContainer.classList.remove('active');
      }
    });
  });
  