/* =========================================================
   NEXORA - Main JavaScript
   Premium Mobile Store
   ========================================================= */

"use strict";

/* =========================================================
   PRODUCTS
   ========================================================= */

const products = [
    {
        id: 1,
        name: "Apple iPhone 17 Pro Max",
        brand: "Apple",
        category: "iphone",
        price: 4299,
        oldPrice: 4599,
        storage: "512GB",
        color: "Titanium",
        badge: "NEW",
        description:
            "Premium iPhone with powerful performance, advanced camera system and a stunning display."
    },
    {
        id: 2,
        name: "Samsung Galaxy S26 Ultra",
        brand: "Samsung",
        category: "samsung",
        price: 3799,
        oldPrice: 4099,
        storage: "512GB",
        color: "Titanium",
        badge: "HOT",
        description:
            "Flagship Samsung smartphone with an advanced camera, premium display and powerful processor."
    },
    {
        id: 3,
        name: "Xiaomi 15 Ultra",
        brand: "Xiaomi",
        category: "xiaomi",
        price: 2699,
        oldPrice: 2999,
        storage: "512GB",
        color: "Black",
        badge: "POPULAR",
        description:
            "High-performance Xiaomi flagship with a professional camera experience."
    },
    {
        id: 4,
        name: "Google Pixel 10 Pro",
        brand: "Google",
        category: "google",
        price: 2899,
        oldPrice: 3199,
        storage: "256GB",
        color: "Obsidian",
        badge: "NEW",
        description:
            "Clean Android experience with Google's advanced camera and AI features."
    },
    {
        id: 5,
        name: "iPhone 17 Pro",
        brand: "Apple",
        category: "iphone",
        price: 3699,
        oldPrice: 3999,
        storage: "256GB",
        color: "Natural Titanium",
        badge: "NEW",
        description:
            "Compact professional iPhone with flagship performance and camera features."
    },
    {
        id: 6,
        name: "Samsung Galaxy S26+",
        brand: "Samsung",
        category: "samsung",
        price: 3199,
        oldPrice: 3499,
        storage: "256GB",
        color: "Silver",
        badge: "HOT",
        description:
            "Premium Samsung smartphone with a large display and flagship performance."
    },
    {
        id: 7,
        name: "Xiaomi 15 Pro",
        brand: "Xiaomi",
        category: "xiaomi",
        price: 2399,
        oldPrice: 2699,
        storage: "256GB",
        color: "Black",
        badge: "SALE",
        description:
            "Powerful Xiaomi smartphone with premium hardware and modern design."
    },
    {
        id: 8,
        name: "Google Pixel 10",
        brand: "Google",
        category: "google",
        price: 2199,
        oldPrice: 2399,
        storage: "256GB",
        color: "Obsidian",
        badge: "NEW",
        description:
            "Smooth Android smartphone with Google's camera technology."
    },
    {
        id: 9,
        name: "MacBook Pro 14 M5",
        brand: "Apple",
        category: "laptop",
        price: 6499,
        oldPrice: 6999,
        storage: "1TB SSD",
        color: "Space Black",
        badge: "PRO",
        description:
            "Professional 14-inch MacBook with Apple Silicon performance for work, study and creative tasks."
    },
    {
        id: 10,
        name: "MacBook Air 15 M4",
        brand: "Apple",
        category: "laptop",
        price: 4299,
        oldPrice: 4599,
        storage: "512GB SSD",
        color: "Midnight",
        badge: "NEW",
        description:
            "Thin and powerful 15-inch laptop with all-day battery life and a premium portable design."
    },
    {
        id: 11,
        name: "ASUS ROG Zephyrus G16",
        brand: "ASUS",
        category: "laptop",
        price: 5899,
        oldPrice: 6299,
        storage: "1TB SSD",
        color: "Eclipse Gray",
        badge: "GAMING",
        description:
            "High-performance gaming laptop with a fast display, powerful GPU and premium metal chassis."
    },
    {
        id: 12,
        name: "Lenovo Legion Pro 7",
        brand: "Lenovo",
        category: "laptop",
        price: 6999,
        oldPrice: 7499,
        storage: "1TB SSD",
        color: "Onyx Gray",
        badge: "POWER",
        description:
            "Performance-focused gaming laptop built for demanding games, content creation and multitasking."
    },
    {
        id: 13,
        name: "AirPods Pro 3",
        brand: "Apple",
        category: "accessories",
        price: 899,
        oldPrice: 999,
        storage: "USB-C Case",
        color: "White",
        badge: "HOT",
        description:
            "Premium wireless earbuds with adaptive audio, active noise cancellation and a compact charging case."
    },
    {
        id: 14,
        name: "MagSafe Charger 25W",
        brand: "Apple",
        category: "accessories",
        price: 249,
        oldPrice: 279,
        storage: "25W",
        color: "White",
        badge: "ESSENTIAL",
        description:
            "Magnetic wireless charger designed for fast and convenient everyday charging."
    },
    {
        id: 15,
        name: "Anker Prime Power Bank",
        brand: "Anker",
        category: "accessories",
        price: 499,
        oldPrice: 579,
        storage: "27,650mAh",
        color: "Black",
        badge: "POPULAR",
        description:
            "Large-capacity premium power bank with multiple ports for phones, tablets and laptops."
    },
    {
        id: 16,
        name: "USB-C 8-in-1 Pro Hub",
        brand: "NEXORA",
        category: "accessories",
        price: 299,
        oldPrice: 349,
        storage: "8 Ports",
        color: "Space Gray",
        badge: "NEW",
        description:
            "Compact 8-in-1 USB-C hub with display, storage and connectivity options for modern laptops."
    }
];


/* =========================================================
   STATE
   ========================================================= */

let cart = [];
let favorites = [];
let currentCategory = "all";
let currentSearch = "";
let selectedProduct = null;


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function loadStorage() {
    try {
        const savedCart = localStorage.getItem("nexora_cart");
        const savedFavorites = localStorage.getItem("nexora_favorites");

        cart = savedCart ? JSON.parse(savedCart) : [];
        favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

        if (!Array.isArray(cart)) {
            cart = [];
        }

        if (!Array.isArray(favorites)) {
            favorites = [];
        }
    } catch (error) {
        console.error("Storage loading error:", error);
        cart = [];
        favorites = [];
    }
}


function saveStorage() {
    try {
        localStorage.setItem("nexora_cart", JSON.stringify(cart));
        localStorage.setItem(
            "nexora_favorites",
            JSON.stringify(favorites)
        );
    } catch (error) {
        console.error("Storage saving error:", error);
    }
}


/* =========================================================
   HELPERS
   ========================================================= */

function formatPrice(price) {
    return new Intl.NumberFormat("ka-GE").format(price) + " ₾";
}


function getProductById(id) {
    return products.find(function (product) {
        return Number(product.id) === Number(id);
    });
}


function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = String(value);
    return div.innerHTML;
}


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {
    const count = cart.reduce(function (total, item) {
        return total + Number(item.quantity || 0);
    }, 0);

    const elements = document.querySelectorAll(
        "#cart-count, .cart-count, [data-cart-count]"
    );

    elements.forEach(function (element) {
        element.textContent = count;
    });
}


/* =========================================================
   PRODUCT FILTERING
   ========================================================= */

function getFilteredProducts() {
    return products.filter(function (product) {
        const categoryMatch =
            currentCategory === "all" ||
            product.category === currentCategory;

        const searchText = currentSearch.trim().toLowerCase();

        const searchMatch =
            searchText === "" ||
            product.name.toLowerCase().includes(searchText) ||
            product.brand.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText);

        return categoryMatch && searchMatch;
    });
}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function createProductCard(product) {
    const isFavorite = favorites.includes(product.id);

    return `
        <article class="product-card" data-product-id="${product.id}">

            <div class="product-card-top">

                ${
                    product.badge
                        ? `<span class="product-badge">${escapeHTML(
                              product.badge
                          )}</span>`
                        : ""
                }

                <button
                    type="button"
                    class="favorite-btn ${
                        isFavorite ? "active" : ""
                    }"
                    data-favorite="${product.id}"
                    aria-label="Add to favorites"
                >
                    ${isFavorite ? "♥" : "♡"}
                </button>

            </div>

            <div class="product-image">

                <div class="fake-phone">
                    <div class="fake-phone-screen">
                        <span>${escapeHTML(product.brand)}</span>
                    </div>
                </div>

            </div>

            <div class="product-info">

                <span class="product-brand">
                    ${escapeHTML(product.brand)}
                </span>

                <h3>
                    ${escapeHTML(product.name)}
                </h3>

                <p class="product-meta">
                    ${escapeHTML(product.color)} •
                    ${escapeHTML(product.storage)}
                </p>

                <div class="product-bottom">

                    <div class="product-price">
                        <strong>${formatPrice(product.price)}</strong>

                        ${
                            product.oldPrice
                                ? `<del>${formatPrice(
                                      product.oldPrice
                                  )}</del>`
                                : ""
                        }
                    </div>

                    <button
                        type="button"
                        class="add-cart-btn"
                        data-add-cart="${product.id}"
                    >
                        +
                    </button>

                </div>

            </div>

        </article>
    `;
}


/* =========================================================
   RENDER PRODUCTS
   ========================================================= */

function renderProducts() {
    const grid =
        document.querySelector("#products-grid") ||
        document.querySelector(".products-grid") ||
        document.querySelector("[data-products]");

    if (!grid) {
        return;
    }

    const filtered = getFilteredProducts();

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-products">
                <div class="empty-icon">⌕</div>
                <h3>პროდუქტი ვერ მოიძებნა</h3>
                <p>სცადე სხვა საძიებო სიტყვა ან კატეგორია.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered
        .map(function (product) {
            return createProductCard(product);
        })
        .join("");

    setupProductEvents();
}


/* =========================================================
   PRODUCT EVENTS
   ========================================================= */

function setupProductEvents() {
    const grid =
        document.querySelector("#products-grid") ||
        document.querySelector(".products-grid") ||
        document.querySelector("[data-products]");

    if (!grid) {
        return;
    }

    grid.querySelectorAll("[data-add-cart]").forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.stopPropagation();

            const id = Number(button.dataset.addCart);

            addToCart(id);
        });
    });


    grid.querySelectorAll("[data-favorite]").forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.stopPropagation();

            const id = Number(button.dataset.favorite);

            toggleFavorite(id);
        });
    });


    grid.querySelectorAll(".product-card").forEach(function (card) {
        card.addEventListener("click", function () {
            const id = Number(card.dataset.productId);

            openProductModal(id);
        });
    });
}


/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(productId) {
    const product = getProductById(productId);

    if (!product) {
        return;
    }

    const existing = cart.find(function (item) {
        return Number(item.id) === Number(productId);
    });

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            quantity: 1
        });
    }

    saveStorage();
    updateCartCount();
    renderCart();

    showToast(
        product.name + " დაემატა კალათაში",
        "success"
    );
}


/* =========================================================
   REMOVE FROM CART
   ========================================================= */

function removeFromCart(productId) {
    cart = cart.filter(function (item) {
        return Number(item.id) !== Number(productId);
    });

    saveStorage();
    updateCartCount();
    renderCart();
}


/* =========================================================
   CHANGE QUANTITY
   ========================================================= */

function changeQuantity(productId, amount) {
    const item = cart.find(function (cartItem) {
        return Number(cartItem.id) === Number(productId);
    });

    if (!item) {
        return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveStorage();
    updateCartCount();
    renderCart();
}


/* =========================================================
   CART TOTAL
   ========================================================= */

function getCartTotal() {
    return cart.reduce(function (total, item) {
        const product = getProductById(item.id);
        if (!product) return total;
        let unitPrice = Number(product.price) || 0;
        if (item.variantId && Array.isArray(product.variants)) {
            const variant = product.variants.find(function (v) { return Number(v.id) === Number(item.variantId); });
            if (variant) unitPrice = Number(variant.price) || unitPrice;
        }
        return total + unitPrice * Number(item.quantity || 1);
    }, 0);
}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart() {
    const container =
        document.querySelector("#cart-items") ||
        document.querySelector(".cart-items") ||
        document.querySelector("[data-cart-items]");

    const totalElements = document.querySelectorAll(
        "#cart-total, .cart-total, [data-cart-total]"
    );

    if (container) {
        if (cart.length === 0) {
            container.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-icon">🛒</div>
                    <h3>კალათა ცარიელია</h3>
                    <p>დაამატე პროდუქტი კალათაში.</p>
                </div>
            `;
        } else {
            container.innerHTML = cart
                .map(function (item) {
                    const product = getProductById(item.id);

                    if (!product) {
                        return "";
                    }

                    return `
                        <div class="cart-item">

                            <div class="cart-item-image">
                                <div class="mini-phone"></div>
                            </div>

                            <div class="cart-item-info">

                                <strong>
                                    ${escapeHTML(product.name)}
                                </strong>

                                <span>
                                    ${formatPrice(product.price)}
                                </span>

                                <div class="cart-quantity">

                                    <button
                                        type="button"
                                        data-minus="${product.id}"
                                    >
                                        −
                                    </button>

                                    <span>
                                        ${item.quantity}
                                    </span>

                                    <button
                                        type="button"
                                        data-plus="${product.id}"
                                    >
                                        +
                                    </button>

                                </div>

                            </div>

                            <button
                                type="button"
                                class="remove-cart"
                                data-remove="${product.id}"
                            >
                                ×
                            </button>

                        </div>
                    `;
                })
                .join("");


            container
                .querySelectorAll("[data-minus]")
                .forEach(function (button) {
                    button.addEventListener("click", function () {
                        changeQuantity(
                            Number(button.dataset.minus),
                            -1
                        );
                    });
                });


            container
                .querySelectorAll("[data-plus]")
                .forEach(function (button) {
                    button.addEventListener("click", function () {
                        changeQuantity(
                            Number(button.dataset.plus),
                            1
                        );
                    });
                });


            container
                .querySelectorAll("[data-remove]")
                .forEach(function (button) {
                    button.addEventListener("click", function () {
                        removeFromCart(
                            Number(button.dataset.remove)
                        );
                    });
                });
        }
    }

    totalElements.forEach(function (element) {
        element.textContent = formatPrice(getCartTotal());
    });
}


/* =========================================================
   OPEN CART
   ========================================================= */

function openCart() {
    const drawer =
        document.querySelector("#cart-drawer") ||
        document.querySelector(".cart-drawer");

    const overlay =
        document.querySelector("#cart-overlay") ||
        document.querySelector(".cart-overlay");

    if (drawer) {
        drawer.classList.add("active");
        drawer.classList.add("open");
    }

    if (overlay) {
        overlay.classList.add("active");
    }

    document.body.classList.add("cart-open");

    renderCart();
}


/* =========================================================
   CLOSE CART
   ========================================================= */

function closeCart() {
    const drawer =
        document.querySelector("#cart-drawer") ||
        document.querySelector(".cart-drawer");

    const overlay =
        document.querySelector("#cart-overlay") ||
        document.querySelector(".cart-overlay");

    if (drawer) {
        drawer.classList.remove("active");
        drawer.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("active");
    }

    document.body.classList.remove("cart-open");
}


/* =========================================================
   FAVORITES
   ========================================================= */

function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);

    if (index === -1) {
        favorites.push(productId);

        showToast(
            "პროდუქტი დაემატა სურვილების სიაში",
            "success"
        );
    } else {
        favorites.splice(index, 1);

        showToast(
            "პროდუქტი წაიშალა სურვილების სიიდან",
            "info"
        );
    }

    saveStorage();
    renderProducts();
}


/* =========================================================
   PRODUCT MODAL
   ========================================================= */

function openProductModal(productId) {
    const product = getProductById(productId);

    if (!product) {
        return;
    }

    selectedProduct = product;

    const modal =
        document.querySelector("#product-modal") ||
        document.querySelector(".product-modal");

    if (!modal) {
        addToCart(product.id);
        return;
    }

    const visual = modal.querySelector(".modal-product-visual");
    if (visual) {
        visual.classList.remove("visual-laptop", "visual-accessory", "visual-phone");
        visual.classList.add(product.category === "laptop" ? "visual-laptop" : product.category === "accessories" ? "visual-accessory" : "visual-phone");
        if (product.image) {
            visual.innerHTML = `<img class="real-product-image" src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}">`;
        } else {
            visual.innerHTML = product.category === "laptop"
                ? `<div class="modal-laptop"><div class="modal-laptop-screen">${escapeHTML(product.brand)}<b>${escapeHTML(product.name)}</b></div><div class="modal-laptop-base"></div></div>`
                : product.category === "accessories"
                    ? `<div class="modal-accessory"><div class="modal-accessory-core">${escapeHTML(product.brand)}<b>${escapeHTML(product.name)}</b></div></div>`
                    : `<div class="modal-phone"></div>`;
        }
    }

    const name =
        modal.querySelector("[data-modal-name]") ||
        modal.querySelector(".modal-product-name");

    const price =
        modal.querySelector("[data-modal-price]") ||
        modal.querySelector(".modal-product-price");

    const description =
        modal.querySelector("[data-modal-description]") ||
        modal.querySelector(".modal-product-description");

    if (name) {
        name.textContent = product.name;
    }

    if (price) {
        price.textContent = formatPrice(product.price);
    }

    if (description) {
        description.textContent = product.description;
    }

    const storageDetail = modal.querySelector("[data-modal-storage-detail]");
    const colorDetail = modal.querySelector("[data-modal-color-detail]");
    const stockDetail = modal.querySelector("[data-modal-stock-detail]");
    const storage = modal.querySelector("[data-modal-storage]");
    const color = modal.querySelector("[data-modal-color]");
    const badge = modal.querySelector("[data-modal-badge]");
    if (storage) storage.textContent = product.storage || "—";
    if (color) color.textContent = product.color || "—";
    if (storageDetail) storageDetail.textContent = product.storage || "—";
    if (colorDetail) colorDetail.textContent = product.color || "—";
    if (stockDetail) stockDetail.textContent = product.stock === false ? "Out of stock" : "In stock";
    if (badge) badge.textContent = product.badge || "NEXORA";

    modal.classList.add("active");
    modal.classList.add("open");

    document.body.classList.add("modal-open");
}


/* =========================================================
   CLOSE PRODUCT MODAL
   ========================================================= */

function closeProductModal() {
    const modal =
        document.querySelector("#product-modal") ||
        document.querySelector(".product-modal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");
    modal.classList.remove("open");

    document.body.classList.remove("modal-open");

    selectedProduct = null;
}


/* =========================================================
   SEARCH
   ========================================================= */

function setupSearch() {
    const search =
        document.querySelector("#product-search") ||
        document.querySelector(".product-search") ||
        document.querySelector("[data-search]");

    if (!search) {
        return;
    }

    search.addEventListener("input", function () {
        currentSearch = search.value;

        renderProducts();
    });
}


/* =========================================================
   CATEGORIES
   ========================================================= */

function setupCategories() {
    const categoryButtons = document.querySelectorAll(
        "[data-category], .category-btn"
    );

    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const category =
                button.dataset.category ||
                button.getAttribute("data-filter") ||
                "all";

            currentCategory = category;

            categoryButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            renderProducts();
        });
    });
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMobileMenu() {
    const menuButton =
        document.querySelector("#menu-toggle") ||
        document.querySelector(".menu-toggle") ||
        document.querySelector(".mobile-menu-btn");

    const menu =
        document.querySelector("#mobile-menu") ||
        document.querySelector(".mobile-menu") ||
        document.querySelector(".nav-menu");

    if (!menuButton || !menu) {
        return;
    }

    menuButton.addEventListener("click", function () {
        menu.classList.toggle("active");

        menuButton.classList.toggle("active");

        document.body.classList.toggle("menu-open");
    });


    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            menu.classList.remove("active");
            menuButton.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });
}


/* =========================================================
   FAQ
   ========================================================= */

function setupFAQ() {
    const questions = document.querySelectorAll(
        ".faq-question, [data-faq-question]"
    );

    questions.forEach(function (question) {
        question.addEventListener("click", function () {
            const item =
                question.closest(".faq-item") ||
                question.parentElement;

            if (!item) {
                return;
            }

            const isActive = item.classList.contains("active");

            document
                .querySelectorAll(".faq-item.active")
                .forEach(function (activeItem) {
                    activeItem.classList.remove("active");
                });

            if (!isActive) {
                item.classList.add("active");
            }
        });
    });
}


/* =========================================================
   SUPPORT FORM
   ========================================================= */

function setupSupportForm() {
    const forms = document.querySelectorAll(
        "#support-form, .support-form"
    );

    forms.forEach(function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const name =
                form.querySelector('[name="name"]') ||
                form.querySelector("#support-name");

            const email =
                form.querySelector('[name="email"]') ||
                form.querySelector("#support-email");

            const message =
                form.querySelector('[name="message"]') ||
                form.querySelector("#support-message");

            if (!name || !email || !message) {
                showToast(
                    "გთხოვ შეავსო ყველა ველი",
                    "error"
                );
                return;
            }

            if (
                name.value.trim() === "" ||
                email.value.trim() === "" ||
                message.value.trim() === ""
            ) {
                showToast(
                    "გთხოვ შეავსო ყველა ველი",
                    "error"
                );
                return;
            }

            showToast(
                "მოთხოვნა წარმატებით გაიგზავნა",
                "success"
            );

            form.reset();
        });
    });
}


/* =========================================================
   CONTACT FORMS
   ========================================================= */

function setupForms() {
    document
        .querySelectorAll("form")
        .forEach(function (form) {
            if (
                form.id === "support-form" ||
                form.classList.contains("support-form")
            ) {
                return;
            }

            form.addEventListener("submit", function (event) {
                const action =
                    form.getAttribute("data-demo") ||
                    form.dataset.demo;

                if (action !== "false") {
                    event.preventDefault();

                    showToast(
                        "ფორმა წარმატებით გაიგზავნა",
                        "success"
                    );

                    form.reset();
                }
            });
        });
}


/* =========================================================
   CHECKOUT
   ========================================================= */

function checkout() {
    if (cart.length === 0) {
        showToast("კალათაში პროდუქტები არ არის", "error");
        return;
    }

    const modal = document.querySelector("#checkout-modal") || document.querySelector(".checkout-modal");
    if (!modal) {
        showToast("Checkout ვერ მოიძებნა", "error");
        return;
    }

    updateCheckoutSummary();
    modal.classList.add("active");
    modal.classList.add("open");
}


/* =========================================================
   COMPLETE ORDER
   ========================================================= */

function completeOrder() {
    if (cart.length === 0) {
        showToast(
            "კალათა ცარიელია",
            "error"
        );
        return;
    }

    cart = [];

    saveStorage();
    updateCartCount();
    renderCart();

    closeCheckout();

    closeCart();

    showToast(
        "შეკვეთა წარმატებით შეიქმნა",
        "success"
    );
}


/* =========================================================
   CLOSE CHECKOUT
   ========================================================= */

function closeCheckout() {
    const modal =
        document.querySelector("#checkout-modal") ||
        document.querySelector(".checkout-modal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");
    modal.classList.remove("open");
}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message, type) {
    let toast = document.querySelector("#toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.classList.remove(
        "active",
        "success",
        "error",
        "info"
    );

    toast.classList.add("active");

    if (type) {
        toast.classList.add(type);
    }

    clearTimeout(window.nexoraToastTimer);

    window.nexoraToastTimer = setTimeout(function () {
        toast.classList.remove("active");
    }, 3000);
}


/* =========================================================
   SCROLL ANIMATIONS
   ========================================================= */

function setupScrollAnimations() {
    const elements = document.querySelectorAll(
        ".reveal, [data-reveal], .animate-on-scroll"
    );

    if (elements.length === 0) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        elements.forEach(function (element) {
            element.classList.add("visible");
            element.classList.add("show");
        });

        return;
    }

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    elements.forEach(function (element) {
        observer.observe(element);
    });
}


/* =========================================================
   SMOOTH ANCHOR LINKS
   ========================================================= */

function setupSmoothScroll() {
    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {
            link.addEventListener("click", function (event) {
                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#" ||
                    targetId.length < 2
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });
}


/* =========================================================
   HEADER SCROLL
   ========================================================= */

function setupHeaderScroll() {
    const header =
        document.querySelector("header") ||
        document.querySelector(".header");

    if (!header) {
        return;
    }

    function updateHeader() {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

    updateHeader();
}


/* =========================================================
   CART BUTTONS
   ========================================================= */

function setupCartButtons() {
    document
        .querySelectorAll(
            "#cart-button, .cart-button, [data-open-cart]"
        )
        .forEach(function (button) {
            button.addEventListener("click", function (event) {
                event.preventDefault();

                openCart();
            });
        });


    document
        .querySelectorAll(
            "#cart-close, .cart-close, [data-close-cart]"
        )
        .forEach(function (button) {
            button.addEventListener("click", function () {
                closeCart();
            });
        });


    const overlay =
        document.querySelector("#cart-overlay") ||
        document.querySelector(".cart-overlay");

    if (overlay) {
        overlay.addEventListener("click", function () {
            closeCart();
        });
    }
}


/* =========================================================
   MODAL BUTTONS
   ========================================================= */

function setupModalButtons() {
    document
        .querySelectorAll(
            "#product-modal-close, .product-modal-close, [data-close-product]"
        )
        .forEach(function (button) {
            button.addEventListener("click", function () {
                closeProductModal();
            });
        });


    document
        .querySelectorAll(
            "#checkout-close, .checkout-close, [data-close-checkout]"
        )
        .forEach(function (button) {
            button.addEventListener("click", function () {
                closeCheckout();
            });
        });


    document
        .querySelectorAll(
            "[data-modal-add], .modal-add-cart"
        )
        .forEach(function (button) {
            button.addEventListener("click", function () {
                if (!selectedProduct) {
                    return;
                }

                addToCart(selectedProduct.id);

                closeProductModal();

                openCart();
            });
        });


    document
        .querySelectorAll(
            "[data-checkout], .checkout-btn"
        )
        .forEach(function (button) {
            button.addEventListener("click", function () {
                checkout();
            });
        });


    document
        .querySelectorAll(
            "[data-complete-order], .complete-order"
        )
        .forEach(function (button) {
            button.addEventListener("click", function () {
                completeOrder();
            });
        });
}


/* =========================================================
   KEYBOARD
   ========================================================= */

function setupKeyboard() {
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeCart();
            closeProductModal();
            closeCheckout();
        }
    });
}


/* =========================================================
   FAVORITES COUNT
   ========================================================= */

function updateFavoriteCount() {
    const elements = document.querySelectorAll(
        "#favorite-count, .favorite-count, [data-favorite-count]"
    );

    elements.forEach(function (element) {
        element.textContent = favorites.length;
    });
}


/* =========================================================
   SEARCH BUTTON
   ========================================================= */

function setupSearchButton() {
    document
        .querySelectorAll(
            "#search-button, .search-button, [data-focus-search]"
        )
        .forEach(function (button) {
            button.addEventListener("click", function () {
                const search =
                    document.querySelector("#product-search") ||
                    document.querySelector(".product-search") ||
                    document.querySelector("[data-search]");

                if (!search) {
                    return;
                }

                search.focus();

                search.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            });
        });
}


/* =========================================================
   CLEAR SEARCH
   ========================================================= */

function setupClearSearch() {
    document
        .querySelectorAll(
            "[data-clear-search], .clear-search"
        )
        .forEach(function (button) {
            button.addEventListener("click", function () {
                const search =
                    document.querySelector("#product-search") ||
                    document.querySelector(".product-search") ||
                    document.querySelector("[data-search]");

                if (search) {
                    search.value = "";
                }

                currentSearch = "";

                renderProducts();
            });
        });
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initNexora() {
    loadStorage();

    updateCartCount();
    updateFavoriteCount();

    renderProducts();
    renderCart();

    setupSearch();
    setupCategories();
    setupMobileMenu();
    setupFAQ();
    setupSupportForm();
    setupForms();
    setupScrollAnimations();
    setupSmoothScroll();
    setupHeaderScroll();
    setupCartButtons();
    setupModalButtons();
    setupKeyboard();
    setupSearchButton();
    setupClearSearch();
}


/* =========================================================
   START
   ========================================================= */

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initNexora
    );
} else {
    initNexora();
}
/* =========================================================
   NEXORA 2.0 - PREMIUM STORE EXTENSIONS
   Frontend/localStorage demo systems
   ========================================================= */

(function () {
    "use strict";

    const EXT = {
        compare: [],
        recently: [],
        orders: [],
        reviews: {},
        tickets: [],
        notifications: [],
        promo: null,
        theme: "dark",
        language: "ka",
        profile: { name: "", email: "" },
        auth: { registered: false, name: "", email: "" }
    };

    const STORAGE = "nexora_v2";

    function extLoad() {
        try {
            const raw = localStorage.getItem(STORAGE);
            if (!raw) return;
            const data = JSON.parse(raw);
            Object.keys(EXT).forEach(function (key) {
                if (data[key] !== undefined) EXT[key] = data[key];
            });
        } catch (error) {
            console.warn("NEXORA extension storage reset", error);
        }
    }

    function extSave() {
        try { localStorage.setItem(STORAGE, JSON.stringify(EXT)); } catch (error) {}
    }

    function esc(value) {
        return typeof escapeHTML === "function" ? escapeHTML(value) : String(value).replace(/[&<>"']/g, function (m) {
            return ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"})[m];
        });
    }

    function stockFor(product) {
        if (!product) return 0;
        if (Array.isArray(product.variants) && product.variants.length) return product.variants.reduce(function (sum, v) { return sum + Math.max(0, Number(v.stock) || 0); }, 0);
        return Math.max(0, Number(product.stock) || 0);
    }

    function productRating(id) {
        const reviews = EXT.reviews[id] || [];
        if (!reviews.length) return { avg: 4.8, count: 0 };
        const avg = reviews.reduce(function (sum, item) { return sum + Number(item.rating); }, 0) / reviews.length;
        return { avg: Math.round(avg * 10) / 10, count: reviews.length };
    }

    function addNotification(title, body) {
        EXT.notifications.unshift({
            id: Date.now(), title: title, body: body,
            time: new Date().toLocaleString("ka-GE", { dateStyle: "short", timeStyle: "short" })
        });
        EXT.notifications = EXT.notifications.slice(0, 12);
        extSave();
        updateToolBadges();
    }

    function showPanel(title, content, wide) {
        let overlay = document.querySelector("#nexora-panel-overlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "nexora-panel-overlay";
            overlay.className = "nexora-panel-overlay";
            overlay.innerHTML = '<div class="nexora-panel"><div class="nexora-panel-head"><h3 id="nexora-panel-title"></h3><button class="close-btn" id="nexora-panel-close">×</button></div><div class="nexora-panel-body" id="nexora-panel-body"></div></div>';
            document.body.appendChild(overlay);
            overlay.addEventListener("click", function (event) {
                if (event.target === overlay) closePanel();
            });
            overlay.querySelector("#nexora-panel-close").addEventListener("click", closePanel);
        }
        overlay.querySelector("#nexora-panel-title").textContent = title;
        overlay.querySelector("#nexora-panel-body").innerHTML = content;
        overlay.querySelector(".nexora-panel").style.width = wide ? "min(1050px,100%)" : "min(780px,100%)";
        overlay.classList.add("active");
        document.body.classList.add("modal-open");
    }

    function closePanel() {
        const overlay = document.querySelector("#nexora-panel-overlay");
        if (overlay) overlay.classList.remove("active");
        document.body.classList.remove("modal-open");
    }

    function addToolButtons() {
        const actions = document.querySelector(".nav-actions");
        if (!actions || document.querySelector(".nexora-tools")) return;

        const tools = document.createElement("div");
        tools.className = "nexora-tools";
        tools.innerHTML = `
            <button class="nexora-tool-btn" data-ext-action="notifications" aria-label="Notifications">♧<span class="tool-badge" data-badge="notifications">0</span></button>
            <button class="nexora-tool-btn" data-ext-action="wishlist" aria-label="Wishlist">♡<span class="tool-badge" data-badge="favorites">0</span></button>
            <button class="nexora-tool-btn" data-ext-action="account" aria-label="Account">◉</button>
            <button class="nexora-tool-btn" data-ext-action="theme" aria-label="Theme">◐</button>
        `;
        actions.insertBefore(tools, actions.firstChild);

        tools.querySelectorAll("[data-ext-action]").forEach(function (button) {
            button.addEventListener("click", function () {
                handleTool(button.dataset.extAction);
            });
        });
    }

    function updateToolBadges() {
        const fav = document.querySelector('[data-badge="favorites"]');
        const note = document.querySelector('[data-badge="notifications"]');
        if (fav) fav.textContent = Array.isArray(favorites) ? favorites.length : 0;
        if (note) note.textContent = EXT.notifications.length > 9 ? "9+" : EXT.notifications.length;
    }

    function handleTool(action) {
        if (action === "theme") toggleTheme();
        if (action === "account") openAccount();
        if (action === "wishlist") openWishlist();
        if (action === "notifications") openNotifications();
    }

    function toggleTheme() {
        EXT.theme = EXT.theme === "dark" ? "light" : "dark";
        document.body.classList.toggle("light-theme", EXT.theme === "light");
        extSave();
        showToast(EXT.theme === "light" ? "Light mode ჩაირთო" : "Dark mode ჩაირთო", "success");
    }

    function openAccount() {
        if (!EXT.auth || !EXT.auth.registered) {
            openAuthModal("register");
            return;
        }
        const name = EXT.auth.name || EXT.profile.name || "NEXORA Member";
        const email = EXT.auth.email || EXT.profile.email || "";
        showPanel("My NEXORA Account", `
            <div class="account-dashboard">
                <div class="account-hero">
                    <span class="section-label">NEXORA MEMBER</span>
                    <h4>${esc(name)}</h4>
                    <p>${esc(email || "Account active")}</p>
                    <div class="panel-actions">
                        <button type="button" data-panel-action="orders">My Orders</button>
                        <button type="button" data-panel-action="wishlist" class="secondary">Wishlist</button>
                        <button type="button" data-panel-action="delivery" class="secondary">Delivery</button>
                    </div>
                </div>
                <div class="account-stat-grid">
                    <div class="account-stat"><strong>${Array.isArray(orders) ? orders.length : 0}</strong><small>Orders</small></div>
                    <div class="account-stat"><strong>${Array.isArray(favorites) ? favorites.length : 0}</strong><small>Wishlist</small></div>
                    <div class="account-stat"><strong>${EXT.tickets.length}</strong><small>Tickets</small></div>
                    <div class="account-stat"><strong>${EXT.notifications.length}</strong><small>Notifications</small></div>
                </div>
            </div>
            <form class="profile-form" id="nexora-profile-form" style="margin-top:14px">
                <label class="panel-muted">Name</label>
                <input name="name" value="${esc(name)}" placeholder="Your name">
                <label class="panel-muted">Email</label>
                <input type="email" name="email" value="${esc(email)}" placeholder="you@example.com">
                <div class="panel-actions">
                    <button type="submit">Save Profile</button>
                    <button type="button" class="secondary" id="nexora-signout">Sign out</button>
                </div>
            </form>
        `);
        const form = document.querySelector("#nexora-profile-form");
        if (form) form.addEventListener("submit", function (event) {
            event.preventDefault();
            EXT.profile.name = this.name.value.trim();
            EXT.profile.email = this.email.value.trim();
            EXT.auth.name = EXT.profile.name;
            EXT.auth.email = EXT.profile.email;
            extSave();
            updateAccountNav();
            addNotification("პროფილი განახლდა", "NEXORA Account ინფორმაცია შენახულია.");
            showToast("პროფილი შენახულია", "success");
        });
        const signout = document.querySelector("#nexora-signout");
        if (signout) signout.addEventListener("click", function () {
            EXT.auth.registered = false;
            extSave();
            updateAccountNav();
            closePanel();
            openAuthModal("login");
        });
        bindPanelActions();
    }

    function openAuthModal(mode) {
        const existing = document.querySelector("#nexora-auth-overlay");
        if (existing) existing.remove();
        const overlay = document.createElement("div");
        overlay.id = "nexora-auth-overlay";
        overlay.className = "nexora-panel-overlay active";
        overlay.innerHTML = `
            <div class="nexora-panel auth-panel" role="dialog" aria-modal="true" aria-label="NEXORA Account">
                <div class="auth-brand">
                    <span class="section-label">NEXORA ACCOUNT</span>
                    <h2>Your phone.<br><em>Your account.</em></h2>
                    <p>შექმენი NEXORA ანგარიში და შეინახე შეკვეთები, Wishlist, Delivery და შენი პროფილი ერთ ადგილას.</p>
                    <div class="auth-pills"><span>Secure profile</span><span>Saved orders</span><span>Fast checkout</span></div>
                </div>
                <div class="auth-content">
                    <div class="nexora-panel-head" style="padding:0 0 18px;border:0"><h3>Welcome to NEXORA</h3><button type="button" class="close-btn" id="auth-close">×</button></div>
                    <div class="auth-tabs">
                        <button type="button" data-auth-tab="login" class="${mode === "login" ? "active" : ""}">Sign in</button>
                        <button type="button" data-auth-tab="register" class="${mode !== "login" ? "active" : ""}">Create account</button>
                    </div>
                    <form class="auth-form" id="nexora-auth-form">
                        <div id="auth-name-wrap" style="display:${mode === "login" ? "none" : "grid"};gap:7px"><label>FULL NAME</label><input name="name" placeholder="Your name" ${mode === "login" ? "" : "required"}></div>
                        <div style="display:grid;gap:7px"><label>EMAIL</label><input type="email" name="email" placeholder="you@example.com" required></div>
                        <div style="display:grid;gap:7px"><label>PASSWORD</label><input type="password" name="password" placeholder="••••••••" minlength="6" required></div>
                        <button class="auth-submit" type="submit">${mode === "login" ? "Sign in to NEXORA" : "Create NEXORA account"}</button>
                    </form>
                    <p class="auth-note">Frontend account demo — მონაცემები ინახება ამ ბრაუზერის LocalStorage-ში.</p>
                </div>
            </div>`;
        document.body.appendChild(overlay);
        let currentMode = mode === "login" ? "login" : "register";
        function renderMode(next) {
            currentMode = next;
            overlay.querySelectorAll("[data-auth-tab]").forEach(function (b) { b.classList.toggle("active", b.dataset.authTab === next); });
            const wrap = overlay.querySelector("#auth-name-wrap");
            const submit = overlay.querySelector(".auth-submit");
            wrap.style.display = next === "login" ? "none" : "grid";
            submit.textContent = next === "login" ? "Sign in to NEXORA" : "Create NEXORA account";
        }
        overlay.querySelectorAll("[data-auth-tab]").forEach(function (b) { b.addEventListener("click", function () { renderMode(b.dataset.authTab); }); });
        overlay.querySelector("#auth-close").addEventListener("click", function () { overlay.remove(); document.body.classList.remove("modal-open"); });
        overlay.addEventListener("click", function (e) { if (e.target === overlay) { overlay.remove(); document.body.classList.remove("modal-open"); } });
        overlay.querySelector("#nexora-auth-form").addEventListener("submit", function (e) {
            e.preventDefault();
            const email = this.email.value.trim();
            const password = this.password.value;
            if (password.length < 6) { showToast("Password უნდა იყოს მინიმუმ 6 სიმბოლო", "error"); return; }
            const name = (this.name && this.name.value.trim()) || email.split("@")[0] || "NEXORA Member";
            EXT.auth.registered = true;
            EXT.auth.name = name;
            EXT.auth.email = email;
            EXT.profile.name = name;
            EXT.profile.email = email;
            extSave();
            updateAccountNav();
            overlay.remove();
            document.body.classList.remove("modal-open");
            showToast(currentMode === "login" ? "NEXORA-ში შესვლა წარმატებულია" : "Account წარმატებით შეიქმნა", "success");
            openAccount();
        });
        document.body.classList.add("modal-open");
    }

    function updateAccountNav() {
        const nameEl = document.querySelector("#account-nav-name");
        const stateEl = document.querySelector("#account-nav-state");
        const avatarEl = document.querySelector("#account-nav-avatar");
        if (!nameEl || !stateEl || !avatarEl) return;
        const logged = EXT.auth && EXT.auth.registered;
        const name = logged ? (EXT.auth.name || "Member") : "Account";
        nameEl.textContent = name.length > 15 ? name.slice(0, 15) + "…" : name;
        stateEl.textContent = logged ? "My account" : "Sign in / Register";
        avatarEl.textContent = logged ? name.charAt(0).toUpperCase() : "N";
    }

    function bindPanelActions() {
        document.querySelectorAll("[data-panel-action]").forEach(function (button) {
            button.onclick = function () {
                const action = button.dataset.panelAction;
                if (action === "orders") openOrders();
                if (action === "tickets") openTickets();
                if (action === "delivery") openDelivery();
            };
        });
    }

    function openWishlist() {
        const list = (favorites || []).map(getProductById).filter(Boolean);
        showPanel("Wishlist", list.length ? `<div class="panel-grid">${list.map(function (p) {
            return `<div class="panel-card"><strong>${esc(p.name)}</strong><small>${formatPrice(p.price)} · ${esc(p.storage)}</small><div class="panel-actions"><button data-wish-add="${p.id}">კალათაში</button><button class="secondary" data-wish-remove="${p.id}">წაშლა</button></div></div>`;
        }).join("")}</div>` : `<div class="empty-products">სურვილების სია ცარიელია.</div>`);
        document.querySelectorAll("[data-wish-add]").forEach(function (b) { b.onclick = function () { addToCart(Number(b.dataset.wishAdd)); }; });
        document.querySelectorAll("[data-wish-remove]").forEach(function (b) { b.onclick = function () { toggleFavorite(Number(b.dataset.wishRemove)); openWishlist(); updateToolBadges(); }; });
    }

    function openNotifications() {
        showPanel("Notifications", EXT.notifications.length ? EXT.notifications.map(function (n) {
            return `<div class="notification"><strong>${esc(n.title)}</strong><div>${esc(n.body)}</div><small>${esc(n.time)}</small></div>`;
        }).join("") : `<div class="empty-products">ახალი შეტყობინებები არ არის.</div>`);
    }

    function openOrders() {
        if (!EXT.orders.length) {
            showPanel("My Orders", `<div class="empty-products">ჯერ შეკვეთები არ გაქვს.</div>`);
            return;
        }
        showPanel("My Orders", `<div class="panel-grid">${EXT.orders.map(function (o) {
            return `<div class="panel-card"><strong>#${esc(o.id)}</strong><small>${esc(o.date)}</small><p class="panel-muted">${o.items.length} პროდუქტი · ${formatPrice(o.total)}</p><div class="order-status"><span class="order-status-dot"></span>${esc(o.status)}</div><div class="progress"><span style="width:${o.progress}%"></span></div><div class="panel-actions"><button data-track-order="${esc(o.id)}">Tracking</button></div></div>`;
        }).join("")}</div>`);
        document.querySelectorAll("[data-track-order]").forEach(function (b) { b.onclick = function () { openDelivery(b.dataset.trackOrder); }; });
    }

    function openDelivery(orderId) {
        const order = orderId ? EXT.orders.find(function (o) { return o.id === orderId; }) : EXT.orders[0];
        if (!order) {
            showPanel("Delivery Status", `<div class="empty-products">აქტიური შეკვეთა არ მოიძებნა.</div>`);
            return;
        }
        showPanel("Delivery Status", `<div class="panel-card"><strong>Order #${esc(order.id)}</strong><p class="panel-muted">${esc(order.address || "მისამართი მითითებული არ არის")}</p><div class="order-status"><span class="order-status-dot"></span>${esc(order.status)}</div><div class="progress"><span style="width:${order.progress}%"></span></div><div class="panel-grid" style="margin-top:14px"><div class="panel-card"><strong>01</strong><small>Order confirmed</small></div><div class="panel-card"><strong>02</strong><small>Preparing</small></div><div class="panel-card"><strong>03</strong><small>On the way</small></div><div class="panel-card"><strong>04</strong><small>Delivered</small></div></div></div>`);
    }

    function openTickets() {
        showPanel("Support Tickets", `${EXT.tickets.length ? EXT.tickets.map(function (t) {
            return `<div class="ticket"><div class="ticket-top"><strong>#${esc(t.id)} · ${esc(t.subject)}</strong><span class="ticket-status">${esc(t.status)}</span></div><p>${esc(t.message)}</p><small class="panel-muted">${esc(t.date)}</small></div>`;
        }).join("") : `<div class="empty-products">Support ticket-ები არ არის.</div>`}<div class="panel-actions"><button data-new-ticket>ახალი ticket</button></div>`);
        const newTicket = document.querySelector("[data-new-ticket]");
        if (newTicket) newTicket.onclick = function () { openNewTicket(); };
    }

    function openNewTicket() {
        showPanel("New Support Ticket", `<form class="profile-form" id="ticket-form"><input name="subject" placeholder="თემა" required><textarea name="message" placeholder="რა მოხდა?" required style="min-height:130px"></textarea><button type="submit" class="btn btn-primary">Ticket-ის შექმნა</button></form>`);
        document.querySelector("#ticket-form").addEventListener("submit", function (event) {
            event.preventDefault();
            const ticket = { id: "TK" + Math.floor(10000 + Math.random() * 89999), subject: this.subject.value.trim(), message: this.message.value.trim(), status: "Open", date: new Date().toLocaleString("ka-GE") };
            EXT.tickets.unshift(ticket); extSave(); addNotification("Support ticket შეიქმნა", "Ticket #" + ticket.id + " მიღებულია."); showToast("Ticket შეიქმნა", "success"); openTickets();
        });
    }

    function installAdvancedToolbar() {
        const toolbar = document.querySelector(".shop-toolbar");
        if (!toolbar || document.querySelector(".advanced-toolbar")) return;
        const box = document.createElement("div");
        box.className = "advanced-toolbar reveal visible";
        box.innerHTML = `
            <select id="nexora-sort" aria-label="Sort"><option value="default">დალაგება: Default</option><option value="price-low">ფასი ↑</option><option value="price-high">ფასი ↓</option><option value="name">სახელი A-Z</option><option value="new">ახალი</option></select>
            <label>მაქს <input class="price-range" id="nexora-max-price" type="number" min="0" placeholder="5000"></label>
            <label><input id="nexora-stock" type="checkbox"> მხოლოდ მარაგში</label>
            <button class="btn btn-secondary" id="nexora-extra">More</button>
        `;
        toolbar.after(box);
        document.querySelector("#nexora-sort").addEventListener("change", renderEnhancedProducts);
        document.querySelector("#nexora-max-price").addEventListener("input", renderEnhancedProducts);
        document.querySelector("#nexora-stock").addEventListener("change", renderEnhancedProducts);
        document.querySelector("#nexora-extra").addEventListener("click", function () {
            showPanel("NEXORA Tools", `<div class="panel-grid"><div class="panel-card"><strong>Recently Viewed</strong><small>ბოლო ნანახი პროდუქტები</small><div class="panel-actions"><button data-extra="recent">გახსნა</button></div></div><div class="panel-card"><strong>Compare</strong><small>შეადარე 3-მდე მოწყობილობა</small><div class="panel-actions"><button data-extra="compare">გახსნა</button></div></div><div class="panel-card"><strong>Promo Code</strong><small>WELCOME10 = 10% • NEXORA10 = 10%</small><div class="promo-row"><input id="panel-promo" placeholder="PROMO CODE"><button data-extra="promo">Apply</button></div></div><div class="panel-card"><strong>Language</strong><small>ქართული / English</small><div class="panel-actions"><button data-extra="lang">Switch</button></div></div></div>`);
            document.querySelectorAll("[data-extra]").forEach(function (b) { b.onclick = function () { if (b.dataset.extra === "recent") openRecently(); if (b.dataset.extra === "compare") openCompare(); if (b.dataset.extra === "promo") applyPromo(document.querySelector("#panel-promo").value); if (b.dataset.extra === "lang") toggleLanguage(); }; });
        });
    }

    function getEnhancedFiltered() {
        const search = (typeof currentSearch === "string" ? currentSearch : "").trim().toLowerCase();
        const max = Number(document.querySelector("#nexora-max-price")?.value || 0);
        const stockOnly = !!document.querySelector("#nexora-stock")?.checked;
        const sort = document.querySelector("#nexora-sort")?.value || "default";
        let list = products.filter(function (p) {
            const cat = currentCategory === "all" || p.category === currentCategory;
            const text = !search || p.name.toLowerCase().includes(search) || p.brand.toLowerCase().includes(search) || p.category.toLowerCase().includes(search);
            const price = !max || p.price <= max;
            const stock = !stockOnly || stockFor(p) > 0;
            return cat && text && price && stock;
        });
        if (sort === "price-low") list.sort((a,b)=>a.price-b.price);
        if (sort === "price-high") list.sort((a,b)=>b.price-a.price);
        if (sort === "name") list.sort((a,b)=>a.name.localeCompare(b.name));
        if (sort === "new") list.sort((a,b)=>(b.badge === "NEW")-(a.badge === "NEW"));
        return list;
    }

    function enhancedCard(product) {
        const fav = favorites.includes(product.id);
        const rating = productRating(product.id);
        const stock = stockFor(product);
        const salePercent = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
        const stockLevel = Math.max(12, Math.min(100, stock * 9));
        return `<article class="product-card premium-product-card" data-product-id="${product.id}">
            <div class="product-card-top">
                <div class="product-badge-stack">${product.badge ? `<span class="product-badge">${esc(product.badge)}</span>` : ""}${salePercent > 0 ? `<span class="sale-badge">-${salePercent}%</span>` : ""}</div>
                <button type="button" class="favorite-btn ${fav ? "active" : ""}" data-favorite="${product.id}" aria-label="Favorite">${fav ? "♥" : "♡"}</button>
            </div>
            <div class="product-image premium-product-image"><div class="product-image-glow"></div>${product.image ? `<img class="real-product-image" src="${esc(product.image)}" alt="${esc(product.name)}" loading="lazy">` : product.category === "laptop" ? `<div class="fake-laptop"><div class="fake-laptop-screen"><span>${esc(product.brand)}</span><b>${esc(product.name.split(" ").slice(-2).join(" "))}</b></div><div class="fake-laptop-base"></div></div>` : product.category === "accessories" ? `<div class="fake-accessory"><div class="accessory-core"><span>${esc(product.brand)}</span><b>${esc(product.name.split(" ")[0])}</b></div></div>` : `<div class="fake-phone"><div class="fake-phone-screen"><span>${esc(product.brand)}</span></div></div>`}<button type="button" class="quick-view-btn" data-quick-view="${product.id}">Quick view</button></div>
            <div class="product-info"><div class="product-meta-top"><span class="product-brand">${esc(product.brand)}</span><span class="rating-mini">★ ${rating.avg}</span></div><h3>${esc(product.name)}</h3><p class="product-meta">${esc(product.color)} • ${esc(product.storage)}</p><div class="stock-line"><span>${stock <= 5 ? "მცირე მარაგი" : "მარაგშია"}</span><b>${stock}</b></div><div class="stock-track"><i style="width:${stockLevel}%"></i></div><div class="product-bottom"><div class="product-price"><strong>${formatPrice(product.price)}</strong>${product.oldPrice ? `<del>${formatPrice(product.oldPrice)}</del>` : ""}</div><button type="button" class="add-cart-btn" data-add-cart="${product.id}">+</button></div><button type="button" class="compare-btn ${EXT.compare.includes(product.id) ? "active" : ""}" data-compare="${product.id}">${EXT.compare.includes(product.id) ? "✓ შედარებაშია" : "＋ Compare"}</button></div>
        </article>`;
    }

    function renderEnhancedProducts() {
        const grid = document.querySelector("#products-grid");
        if (!grid) return;
        const list = getEnhancedFiltered();
        grid.innerHTML = list.length ? list.map(enhancedCard).join("") : `<div class="empty-products"><div class="empty-icon">⌕</div><h3>პროდუქტი ვერ მოიძებნა</h3><p>შეცვალე ძებნა, კატეგორია ან ფილტრი.</p></div>`;
        setupEnhancedProductEvents();
    }

    function setupEnhancedProductEvents() {
        const grid = document.querySelector("#products-grid");
        if (!grid) return;
        grid.querySelectorAll("[data-add-cart]").forEach(function (b) { b.addEventListener("click", function (e) { e.stopPropagation(); addToCart(Number(b.dataset.addCart)); }); });
        grid.querySelectorAll("[data-favorite]").forEach(function (b) { b.addEventListener("click", function (e) { e.stopPropagation(); toggleFavorite(Number(b.dataset.favorite)); updateToolBadges(); }); });
        grid.querySelectorAll("[data-compare]").forEach(function (b) { b.addEventListener("click", function (e) { e.stopPropagation(); toggleCompare(Number(b.dataset.compare)); renderEnhancedProducts(); }); });
        grid.querySelectorAll("[data-quick-view]").forEach(function (b) { b.addEventListener("click", function (e) { e.stopPropagation(); openProductModal(Number(b.dataset.quickView)); }); });
        grid.querySelectorAll(".product-card").forEach(function (card) { card.addEventListener("click", function () { openProductModal(Number(card.dataset.productId)); }); });
    }

    function toggleCompare(id) {
        const index = EXT.compare.indexOf(id);
        if (index >= 0) EXT.compare.splice(index,1);
        else if (EXT.compare.length >= 3) { showToast("მაქსიმუმ 3 პროდუქტის შედარება შეგიძლია", "error"); return; }
        else EXT.compare.push(id);
        extSave();
        showToast(index >= 0 ? "Compare-დან წაიშალა" : "Compare-ში დაემატა", "success");
    }

    function openCompare() {
        const list = EXT.compare.map(getProductById).filter(Boolean);
        showPanel("Compare Products", list.length ? `<div class="compare-grid">${list.map(function(p){return `<div class="compare-cell"><h4>${esc(p.name)}</h4><p>Brand: ${esc(p.brand)}</p><p>Storage: ${esc(p.storage)}</p><p>Color: ${esc(p.color)}</p><p>Price: <b>${formatPrice(p.price)}</b></p><p>Stock: ${stockFor(p)}</p><button class="btn btn-secondary" data-compare-remove="${p.id}">Remove</button></div>`}).join("")}</div>` : `<div class="empty-products">შედარებისთვის პროდუქტი ჯერ არ აგირჩევია.</div>`);
        document.querySelectorAll("[data-compare-remove]").forEach(function(b){b.onclick=function(){toggleCompare(Number(b.dataset.compareRemove));openCompare();renderEnhancedProducts();};});
    }

    function openRecently() {
        const list = EXT.recently.map(getProductById).filter(Boolean);
        showPanel("Recently Viewed", list.length ? `<div class="recent-row">${list.map(function(p){return `<div class="recent-card" data-recent="${p.id}"><div class="recent-phone"></div><strong>${esc(p.name)}</strong><small class="panel-muted">${formatPrice(p.price)}</small></div>`}).join("")}</div>` : `<div class="empty-products">ბოლო ნანახი პროდუქტები არ არის.</div>`);
        document.querySelectorAll("[data-recent]").forEach(function(b){b.onclick=function(){closePanel();openProductModal(Number(b.dataset.recent));};});
    }

    function rememberRecently(id) {
        EXT.recently = [id].concat(EXT.recently.filter(function(x){return Number(x)!==Number(id);})).slice(0,8);
        extSave();
    }

    function addReviewsToModal(product) {
        const info = document.querySelector(".modal-product-info");
        if (!info || info.querySelector(".product-review-box")) return;
        const reviews = EXT.reviews[product.id] || [];
        const rating = productRating(product.id);
        const box = document.createElement("div");
        box.className = "product-review-box";
        box.innerHTML = `<div class="review-row"><strong>Reviews</strong><span class="review-stars">★★★★★ ${rating.avg}</span></div><div class="review-list">${reviews.slice(0,3).map(function(r){return `<div class="review-row"><span class="review-text">${esc(r.text)}</span><span class="review-stars">${"★".repeat(Number(r.rating))}</span></div>`}).join("")}</div><form class="review-form" id="nexora-review-form"><input name="rating" type="number" min="1" max="5" value="5" aria-label="Rating"><input name="text" placeholder="დატოვე შეფასება..." required><button>გაგზავნა</button></form>`;
        info.appendChild(box);
        box.querySelector("form").addEventListener("submit",function(e){e.preventDefault();const text=this.text.value.trim();const rating=Number(this.rating.value);if(!text)return;EXT.reviews[product.id]=EXT.reviews[product.id]||[];EXT.reviews[product.id].unshift({text:text,rating:rating,date:Date.now()});extSave();showToast("შეფასება დაემატა", "success");box.remove();addReviewsToModal(product);renderEnhancedProducts();});
    }

    function wrapProductModal() {
        const original = openProductModal;
        openProductModal = function (id) {
            rememberRecently(id);
            original(id);
            const product = getProductById(id);
            if (!product) return;
            setTimeout(function(){addReviewsToModal(product);},20);
        };
    }

    async function applyPromo(code) {
        const normalized = String(code || "").trim().toUpperCase();
        if (!normalized) { showToast("Promo code შეიყვანე", "error"); return; }
        try {
            const response = await fetch('/api/promos/validate', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ code: normalized, subtotal: getCartTotal() }) });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Promo code ვერ მოიძებნა');
            EXT.promo = { code: data.code, discount: Number(data.discount || 0), type:data.type, value:Number(data.value||0) };
            extSave();
            showToast(normalized + " გააქტიურდა — " + formatPrice(data.discount) + " ფასდაკლება", "success");
            updateCartDiscount();
        } catch (error) { showToast(error.message, "error"); }
    }

    function updateCartDiscount() {
        const footer = document.querySelector(".cart-footer");
        if (!footer || !EXT.promo) return;
        let row = footer.querySelector(".promo-summary");
        if (!row) { row = document.createElement("div"); row.className="promo-summary cart-total-row"; footer.insertBefore(row, footer.querySelector(".cart-total-row")); }
        const discount = Math.round(getCartTotal() * EXT.promo.discount / 100);
        row.innerHTML = `<span>${esc(EXT.promo.code)} (-${EXT.promo.discount}%)</span><strong>-${formatPrice(discount)}</strong>`;
    }

    function toggleLanguage() {
        EXT.language = EXT.language === "ka" ? "en" : "ka";
        document.documentElement.classList.toggle("lang-en", EXT.language === "en");
        const map = EXT.language === "en" ? {"მაღაზია":"Store","კატეგორიები":"Categories","მთავარი":"Home","კონტაქტი":"Contact","კალათა":"Cart","ყველა":"All"} : {"Store":"მაღაზია","Categories":"კატეგორიები","Home":"მთავარი","Contact":"კონტაქტი","Cart":"კალათა","All":"ყველა"};
        document.querySelectorAll(".nav-links a,.mobile-menu a,.cart-button span,.category-btn").forEach(function(el){if(map[el.textContent.trim()])el.textContent=map[el.textContent.trim()];});
        extSave(); showToast(EXT.language === "en" ? "English mode" : "ქართული რეჟიმი", "success");
    }

    function enhanceChat() {
        const form = document.querySelector("#chat-form");
        const input = document.querySelector("#chat-input");
        const messages = document.querySelector("#chat-messages");
        if (!form || !input || !messages || form.dataset.enhanced) return;
        form.dataset.enhanced = "1";
        function answer(text) {
            const msg = document.createElement("div"); msg.className="message support-message"; msg.textContent=text; messages.appendChild(msg); messages.scrollTop=messages.scrollHeight;
        }
        function send(text){ if(!text.trim())return; const user=document.createElement("div");user.className="message user-message";user.textContent=text;messages.appendChild(user);input.value="";messages.scrollTop=messages.scrollHeight;setTimeout(function(){const t=text.toLowerCase();if(t.includes("order")||t.includes("შეკვეთ"))answer("შეკვეთების სანახავად გახსენი Account → My Orders. თუ შეკვეთა ჯერ არ გაქვს, Checkout-ით შექმნი ახალს.");else if(t.includes("delivery")||t.includes("მიწოდ"))answer("Delivery Status-ში შეგიძლია ნახო შეკვეთის მიმდინარე ეტაპი.");else if(t.includes("price")||t.includes("ფას"))answer("ფასები მოცემულია პროდუქტის ბარათზე და კალათაში.");else answer("მადლობა შეტყობინებისთვის. ეს NEXORA Support-ის frontend demo-ია.");},450);}
        form.addEventListener("submit",function(e){e.preventDefault();send(input.value);});
        document.querySelectorAll("[data-chat]").forEach(function(b){b.addEventListener("click",function(){send(b.textContent);});});
        const reset=document.querySelector("#chat-reset");if(reset)reset.addEventListener("click",function(){messages.innerHTML='<div class="message support-message">გამარჯობა 👋<br>მე NEXORA Support ვარ. რით შემიძლია დაგეხმარო?</div>';});
    }

    function updateCheckoutSummary() {
        const itemsBox = document.querySelector("#checkout-summary-items");
        const countBox = document.querySelector("#checkout-item-count");
        const productsTotal = document.querySelector("#checkout-products-total");
        const deliveryTotal = document.querySelector("#checkout-delivery-total");
        const promoTotal = document.querySelector("#checkout-promo-total");
        const grandTotal = document.querySelector("#checkout-grand-total");
        if (!itemsBox) return;

        const count = cart.reduce(function (n, item) { return n + item.quantity; }, 0);
        const subtotal = getCartTotal();
        const deliverySelect = document.querySelector('#checkout-form select[name="delivery"]');
        const delivery = deliverySelect && deliverySelect.value === "express" ? 10 : deliverySelect && deliverySelect.value === "pickup" ? 0 : 5;
        const discount = EXT.promo ? Math.round(subtotal * EXT.promo.discount / 100) : 0;
        const total = Math.max(0, subtotal - discount + delivery);

        if (countBox) countBox.textContent = count + (count === 1 ? " item" : " items");
        if (productsTotal) productsTotal.textContent = formatPrice(subtotal);
        if (deliveryTotal) deliveryTotal.textContent = delivery === 0 ? "უფასო" : formatPrice(delivery);
        if (promoTotal) promoTotal.textContent = discount ? "−" + formatPrice(discount) : "—";
        if (grandTotal) grandTotal.textContent = formatPrice(total);

        itemsBox.innerHTML = cart.map(function (item) {
            const product = getProductById(item.id);
            if (!product) return "";
            return `<div class="summary-item"><div class="summary-item-art">N</div><div><strong>${escapeHTML(product.name)}</strong><small>${item.quantity} × ${formatPrice(product.price)}</small></div><b>${formatPrice(product.price * item.quantity)}</b></div>`;
        }).join("");
    }

    function wrapCheckout() {
        const form = document.querySelector("#checkout-form");
        if (!form || form.dataset.enhanced) return;
        form.dataset.enhanced = "1";

        const deliverySelect = form.querySelector('select[name="delivery"]');
        if (deliverySelect) deliverySelect.addEventListener("change", updateCheckoutSummary);

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (!cart.length) { showToast("კალათა ცარიელია", "error"); return; }

            const data = new FormData(form);
            const subtotal = getCartTotal();
            const deliveryMethod = data.get("delivery") || "standard";
            const deliveryFee = deliveryMethod === "express" ? 10 : deliveryMethod === "pickup" ? 0 : 5;
            const discount = EXT.promo ? Math.round(subtotal * EXT.promo.discount / 100) : 0;
            const total = Math.max(0, subtotal - discount + deliveryFee);
            const order = {
                id: "NX" + Math.floor(100000 + Math.random() * 899999),
                date: new Date().toLocaleString("ka-GE"),
                items: cart.slice(),
                subtotal: subtotal,
                discount: discount,
                deliveryFee: deliveryFee,
                total: total,
                name: String(data.get("name") || "").trim(),
                phone: String(data.get("phone") || "").trim(),
                city: String(data.get("city") || "").trim(),
                address: String(data.get("address") || "").trim(),
                delivery: deliveryMethod,
                payment: String(data.get("payment") || "cash"),
                note: String(data.get("note") || "").trim(),
                status: "შეკვეთა დადასტურებულია",
                progress: 25
            };

            EXT.orders.unshift(order);
            EXT.orders = EXT.orders.slice(0, 20);
            EXT.promo = null;
            extSave();
            cart = [];
            saveStorage();
            updateCartCount();
            renderCart();
            closeCheckout();
            closeCart();
            form.reset();
            updateCheckoutSummary();
            addNotification("შეკვეთა შეიქმნა", "Order #" + order.id + " წარმატებით დადასტურდა.");
            showToast("შეკვეთა #" + order.id + " შეიქმნა", "success");

            setTimeout(function () { openDelivery(order.id); }, 500);
        }, true);
    }

    function wrapContactTicket() {
        const form=document.querySelector("#support-form");
        if(!form||form.dataset.ticketEnhanced)return;
        form.dataset.ticketEnhanced="1";
        form.addEventListener("submit",function(){
            const name=form.querySelector('[name="name"]')?.value.trim();const subject=form.querySelector('[name="subject"]')?.value.trim();const message=form.querySelector('[name="message"]')?.value.trim();
            if(!name||!subject||!message)return;
            EXT.tickets.unshift({id:"TK"+Math.floor(10000+Math.random()*89999),subject:subject,message:message,status:"Open",date:new Date().toLocaleString("ka-GE")});extSave();addNotification("Support ticket შეიქმნა",subject);
        }, true);
    }

    function applyTheme() { document.body.classList.toggle("light-theme", EXT.theme === "light"); document.documentElement.classList.toggle("lang-en", EXT.language === "en"); }

    function startEnhancement() {
        extLoad(); applyTheme(); if (!EXT.auth) EXT.auth = { registered: false, name: "", email: "" }; updateAccountNav();
        renderProducts = renderEnhancedProducts;
        const originalFavorite = toggleFavorite;
        toggleFavorite = function (id) { originalFavorite(id); updateToolBadges(); };
        addToolButtons(); installAdvancedToolbar(); enhanceChat(); wrapProductModal(); wrapCheckout(); wrapContactTicket(); updateToolBadges();
        const accountNav = document.querySelector("#nexora-account-nav");
        if (accountNav && !accountNav.dataset.bound) {
            accountNav.dataset.bound = "1";
            accountNav.addEventListener("click", openAccount);
        }
        const buyNow = document.querySelector("[data-modal-buy-now]");
        if (buyNow && !buyNow.dataset.bound) {
            buyNow.dataset.bound = "1";
            buyNow.addEventListener("click", function () {
                if (!selectedProduct) return;
                addToCart(selectedProduct.id);
                closeProductModal();
                const checkout = document.querySelector("[data-checkout]");
                if (checkout) checkout.click();
            });
        }
        document.querySelectorAll("[data-hub-action]").forEach(function (button) {
            button.addEventListener("click", function () {
                const action = button.dataset.hubAction;
                if (action === "account") openAccount();
                if (action === "orders") openOrders();
                if (action === "wishlist") openWishlist();
                if (action === "compare") openCompare();
                if (action === "recent") openRecently();
                if (action === "delivery") openDelivery();
                if (action === "notifications") openNotifications();
                if (action === "tickets") openTickets();
                if (action === "tools") {
                    const more = document.querySelector("#nexora-extra");
                    if (more) more.click(); else openAccount();
                }
                if (action === "theme") toggleTheme();
                if (action === "lang") toggleLanguage();
            });
        });
        const originalRender = renderCart;
        renderCart = function(){ originalRender(); setTimeout(updateCartDiscount,0); };
        renderEnhancedProducts();
        setTimeout(renderEnhancedProducts, 80);
        window.addEventListener("keydown", function(e){ if(e.key === "Escape") closePanel(); });
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", startEnhancement);
    else startEnhancement();
})();

/* =========================================================
   NEXORA LIVE SUPPORT CHAT + REAL CHECKOUT UX
   ========================================================= */
(function(){
  'use strict';
  const TOKEN_KEY='nexora_access_token';
  const STATE_KEY='nexora_v2';
  const token=()=>localStorage.getItem(TOKEN_KEY)||'';
  const state=()=>{try{return JSON.parse(localStorage.getItem(STATE_KEY)||'{}')||{}}catch{return {}}};
  const saveState=s=>localStorage.setItem(STATE_KEY,JSON.stringify(s));
  async function api(path,opt={}){
    const h=new Headers(opt.headers||{});
    if(opt.body && !h.has('Content-Type')) h.set('Content-Type','application/json');
    if(token()) h.set('Authorization','Bearer '+token());
    const r=await fetch('/api'+path,{...opt,headers:h});
    let b={}; try{b=await r.json()}catch{}
    if(!r.ok){const e=new Error(b.error||'Request failed');e.status=r.status;throw e;}
    return b;
  }
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const fmtDate=v=>v?new Date(v).toLocaleTimeString('ka-GE',{hour:'2-digit',minute:'2-digit'}):'';
  function toast(msg,type='success'){if(typeof showToast==='function')showToast(msg,type);}

  function mount(){
    if(document.getElementById('live-support-widget')) return;
    const wrap=document.createElement('div');
    wrap.id='live-support-widget';
    wrap.innerHTML=`
      <button class="live-chat-fab" id="live-chat-fab" aria-label="NEXORA Support">
        <span class="live-chat-fab-dot"></span><span class="live-chat-fab-icon">✦</span><span class="live-chat-fab-text">Support</span>
      </button>
      <section class="live-chat-panel" id="live-chat-panel" aria-hidden="true">
        <header class="live-chat-head">
          <div><span class="live-chat-title">NEXORA Support</span><small><i></i> ონლაინ დახმარება</small></div>
          <button id="live-chat-close" type="button" aria-label="Close">×</button>
        </header>
        <div class="live-chat-messages" id="live-chat-messages">
          <div class="live-chat-empty"><strong>გამარჯობა 👋</strong><span>მომწერე და შენი შეტყობინება პირდაპირ Support-ის Admin Panel-ში მივა.</span></div>
        </div>
        <div class="live-chat-login-hint" id="live-chat-login-hint">Support chat-ისთვის ანგარიშში შესვლა დაგჭირდება.</div>
        <form class="live-chat-form" id="live-chat-form">
          <input id="live-chat-input" type="text" maxlength="1000" placeholder="დაწერე შეტყობინება..." autocomplete="off">
          <button type="submit" aria-label="Send">↑</button>
        </form>
      </section>`;
    document.body.appendChild(wrap);

    const fab=document.getElementById('live-chat-fab');
    const panel=document.getElementById('live-chat-panel');
    const close=document.getElementById('live-chat-close');
    const form=document.getElementById('live-chat-form');
    const input=document.getElementById('live-chat-input');
    const box=document.getElementById('live-chat-messages');
    const hint=document.getElementById('live-chat-login-hint');
    let activeTicketId=null;
    let pollTimer=null;
    let sending=false;
    let lastSnapshot='';

    function loggedIn(){return !!token();}
    function toggle(open){
      panel.classList.toggle('open',open);
      panel.setAttribute('aria-hidden',String(!open));
      if(open){
        refresh();
        if(loggedIn()) input.focus();
      }
    }
    function renderTickets(tickets){
      const ticket=tickets.find(t=>t.id===activeTicketId) || tickets.find(t=>t.status!=='Closed') || tickets[0] || null;
      if(ticket) activeTicketId=ticket.id;
      const replies=ticket?.replies||[];
      if(!ticket){
        box.innerHTML='<div class="live-chat-empty"><strong>როგორ დაგეხმაროთ?</strong><span>დაწერე შეტყობინება და ახალ Support ticket-ს ავტომატურად შევქმნით.</span></div>';
        return;
      }
      const html=replies.map(m=>`<div class="live-chat-msg ${m.role==='admin'?'from-admin':'from-user'}"><div>${esc(m.text)}</div><small>${esc(m.name)} · ${fmtDate(m.date)}</small></div>`).join('');
      box.innerHTML=html || '<div class="live-chat-empty"><strong>Ticket მზად არის.</strong><span>მოგვწერე შენი კითხვა.</span></div>';
      box.scrollTop=box.scrollHeight;
    }
    async function refresh(){
      if(!loggedIn()){
        hint.textContent='Support chat-ისთვის ანგარიშში შესვლა დაგჭირდება.';
        hint.classList.add('show');
        input.disabled=true;
        return;
      }
      hint.classList.remove('show'); input.disabled=false;
      try{
        const r=await api('/tickets');
        const tickets=r.tickets||[];
        const snapshot=JSON.stringify(tickets.map(t=>[t.id,t.updatedAt,t.status,t.replies?.length||0]));
        if(lastSnapshot && snapshot!==lastSnapshot){
          const current=tickets.find(t=>t.id===activeTicketId);
          const latest=current?.replies?.[current.replies.length-1];
          if(latest?.role==='admin') toast('Support-მა ახალი პასუხი გამოგიგზავნა','success');
        }
        lastSnapshot=snapshot;
        const s=state(); s.tickets=tickets; saveState(s);
        renderTickets(tickets);
      }catch(e){ if(e.status===401){localStorage.removeItem(TOKEN_KEY);hint.textContent='სესია დასრულდა. თავიდან შედი ანგარიშში.';hint.classList.add('show');input.disabled=true;} }
    }
    async function send(message){
      if(!loggedIn()){toast('ჯერ შედი ანგარიშში','error');return;}
      const text=String(message||'').trim(); if(!text||sending)return;
      sending=true; input.disabled=true;
      try{
        let r;
        if(!activeTicketId){
          r=await api('/tickets',{method:'POST',body:JSON.stringify({subject:'Live Chat',message:text})});
          activeTicketId=r.ticket?.id||null;
        }else{
          await api('/tickets/'+encodeURIComponent(activeTicketId)+'/messages',{method:'POST',body:JSON.stringify({message:text})});
        }
        input.value=''; await refresh();
      }catch(e){toast(e.message,'error');}
      finally{sending=false;input.disabled=!loggedIn(); if(loggedIn())input.focus();}
    }
    fab.onclick=()=>toggle(!panel.classList.contains('open'));
    close.onclick=()=>toggle(false);
    form.onsubmit=e=>{e.preventDefault();send(input.value);};
    setInterval(()=>{if(panel.classList.contains('open'))refresh();},2200);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden&&panel.classList.contains('open'))refresh();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
