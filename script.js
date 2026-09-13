const products = [

    {
        id: 1,
        name: "Smartphone",
        price: "$699",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 2,
        name: "Laptop",
        price: "$999",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 3,
        name: "Headphones",
        price: "$199",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 4,
        name: "Smart Watch",
        price: "$249",
        category: "accessories",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 5,
        name: "Running Shoes",
        price: "$129",
        category: "fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 6,
        name: "Leather Bag",
        price: "$159",
        category: "fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 7,
        name: "Camera",
        price: "$799",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 8,
        name: "Sunglasses",
        price: "$89",
        category: "accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
    }

];


const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const noProducts = document.getElementById("noProducts");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxPrice = document.getElementById("lightboxPrice");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");


let currentCategory = "all";
let filteredProducts = [...products];
let currentIndex = 0;


/* Display Products */

function displayProducts(items) {

    productGrid.innerHTML = "";

    if (items.length === 0) {

        noProducts.style.display = "block";

        return;
    }

    noProducts.style.display = "none";


    items.forEach((product, index) => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img 
                src="${product.image}" 
                alt="${product.name}"
            >

            <div class="product-info">

                <p class="category">
                    ${product.category}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <p class="price">
                    ${product.price}
                </p>

            </div>
        `;


        card.addEventListener("click", () => {

            currentIndex = index;

            openLightbox();

        });


        productGrid.appendChild(card);

    });

}


/* Filter Products */

function filterProducts() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    filteredProducts = products.filter(product => {

        const matchesCategory =
            currentCategory === "all" ||
            product.category === currentCategory;


        const matchesSearch =
            product.name.toLowerCase().includes(searchText);


        return matchesCategory && matchesSearch;

    });


    displayProducts(filteredProducts);

}


/* Category Buttons */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentCategory =
            button.dataset.category;


        filterProducts();

    });

});


/* Search */

searchInput.addEventListener("input", () => {

    filterProducts();

});


/* Open Lightbox */

function openLightbox() {

    if (filteredProducts.length === 0) {
        return;
    }


    const product =
        filteredProducts[currentIndex];


    lightboxImage.src = product.image;

    lightboxImage.alt = product.name;

    lightboxTitle.textContent =
        product.name;

    lightboxPrice.textContent =
        product.price;


    lightbox.classList.add("show");

}


/* Close Lightbox */

function closeLightbox() {

    lightbox.classList.remove("show");

}


closeBtn.addEventListener("click", closeLightbox);


/* Previous */

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex =
            filteredProducts.length - 1;

    }

    openLightbox();

});


/* Next */

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= filteredProducts.length) {

        currentIndex = 0;

    }

    openLightbox();

});


/* Close by clicking outside */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* Keyboard Navigation */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) {
        return;
    }


    if (event.key === "Escape") {

        closeLightbox();

    }


    if (event.key === "ArrowLeft") {

        prevBtn.click();

    }


    if (event.key === "ArrowRight") {

        nextBtn.click();

    }

});


/* Initial Display */

displayProducts(products);