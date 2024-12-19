// Setup Local Storage

if(localStorage.getItem("myCartItems") == null){
  localStorage.setItem("myCartItems", JSON.stringify([]));
}
if(localStorage.getItem("myCartTotalPrice") == null){
  localStorage.setItem("myCartTotalPrice", 0.0);
}
updateCart();


if(localStorage.getItem("myProducts") == null){
  getProductsAPIs().then(() => ShowMyProduct());
} else{
  ShowMyProduct();
}


if(localStorage.getItem("myProducts_sale") == null){
  getProductsJSON().then(() => ShowMyProductSale());
} else{
  ShowMyProductSale();
}


function ShowMyProduct(){

  let myProducts = JSON.parse(localStorage.getItem("myProducts"));

  let swiper_items = document.getElementById("swiper_items");
    if (swiper_items == null) {
      return;
    }
    myProducts.forEach(product => {
      if (!product.old_price) {
        swiper_items.innerHTML += `  <div class="product swiper-slide">
              <div class="icons">
                <span><i class="fa-solid fa-cart-plus" onclick="addToCart(${product.id})"></i></span>
                <span><i class="fa-solid fa-heart"></i></span>
                <span><i class="fa-solid fa-share"></i></span>
              </div>

              <div class="img_product" onclick="ShowProductDetails(${product.id})">
                <img src="${product.image}" alt="${product.title}" />
                <img class="img_hover" src="${product.image}" alt="" />

              </div>
              <h3 class="name_product">
                <a href="#">${product.title}</a>
              </h3>
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <div class="price">
                <p><span>$ ${product.price}</span></p>
              </div>
            </div>
            `;
      }
    });
}
function ShowMyProductSale(){

  let myProducts_sale = JSON.parse(localStorage.getItem("myProducts_sale"));

  let swiper_items_sale=document.getElementById("swiper_items_sale");
   if(swiper_items_sale == null)return;
   myProducts_sale.forEach(product => {
    if(product.old_price){
        swiper_items_sale.innerHTML+=`<div class="product swiper-slide">

              <div class="icons">
                <span><i class="fa-solid fa-cart-plus" onclick="addToCart(${product.id})"></i></span>
                <span><i class="fa-solid fa-heart"></i></span>
                <span><i class="fa-solid fa-share"></i></span>
              </div>
              <span class="sale_present">10%</span>

              <div class="img_product" onclick="ShowProductDetails(${product.id})">
                <img src="${product.img}" alt="${product.name}" />
                <img class="img_hover" src="${product.img_hover}" alt="" />
              </div>
              <h3 class="name_product">
                <a href="#">${product.name}</a>
              </h3>
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <div class="price">
                <p><span>$ ${product.price}</span></p>
                <p class="old_price">$ ${product.old_price}</p>
              </div>
            </div>`;
    }
   });
}


var cart = document.querySelector('.cart');

function openCart() {
  cart.classList.add('active_cart');
  //console.log("blabla");

}
function closeCart() {
  cart.classList.remove('active_cart');
}



// Getting the products_sale (JSON)
async function getProductsJSON(){

  var myProducts_sale = [];

  fetch('./scripts/items.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
      myProducts_sale.push(product);
    });
  }).then(() => {
    console.log(myProducts_sale);
    // Set the products sale in the local storage
    localStorage.setItem("myProducts_sale", JSON.stringify(myProducts_sale));
  });

}


// Getting the products (API)
async function getProductsAPIs(){

  var myProducts = [];

  fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
      myProducts.push(product);
    });
  }).then(() => {

    // Set the products in the local storage
    localStorage.setItem("myProducts", JSON.stringify(myProducts));

  });

}







// Cart functions
function addToCart(id) {

  CartItems = JSON.parse(localStorage.getItem("myCartItems"));
  CartTotalPrice = Number(localStorage.getItem("myCartTotalPrice"));

  let myProducts = JSON.parse(localStorage.getItem("myProducts"));
  let myProducts_sale = JSON.parse(localStorage.getItem("myProducts_sale"));

  // console.log(CartItems);
  // console.log(CartTotalPrice);
  

  let item = myProducts.find((product) => product.id == id);
  if (item == undefined) {
    item = myProducts_sale.find((product) => product.id == id);
  }


  if (CartItems.find((product) => product.id == item.id) != undefined) {
  let index;
  for(let i = 0; i < CartItems.length; i++){
    if(item.id == CartItems[i].id){
      index = i;
      break;
    }
  }
    CartItems[index].count++;
  }
  else {
    item.count = 1;
    CartItems.push(item);
  }

  CartTotalPrice += Number(item.price);
  CartTotalPrice = Number((CartTotalPrice).toFixed(2));


  localStorage.setItem("myCartItems", JSON.stringify(CartItems));
  localStorage.setItem("myCartTotalPrice", CartTotalPrice);

  updateCart();
}

function deleteFromCart(id) {

  CartItems = JSON.parse(localStorage.getItem("myCartItems"));
  CartTotalPrice = Number(localStorage.getItem("myCartTotalPrice"));

  let myProducts = JSON.parse(localStorage.getItem("myProducts"));
  let myProducts_sale = JSON.parse(localStorage.getItem("myProducts_sale"));

  let item = myProducts.find((product) => product.id == id);
  if (item == undefined) {
    item = myProducts_sale.find((product) => product.id == id);
  }
  // console.log(item);
  let index;
  for(let i = 0; i < CartItems.length; i++){
    if(item.id == CartItems[i].id){
      index = i;
      break;
    }
  }
  CartTotalPrice -= Number(CartItems[index].price) * Number(CartItems[index].count);
  CartTotalPrice = Number((CartTotalPrice).toFixed(2));
  CartItems.splice(index, 1);
  
  localStorage.setItem("myCartItems", JSON.stringify(CartItems));
  localStorage.setItem("myCartTotalPrice", CartTotalPrice);

  updateCart();
}

function updateCart() {

  CartItems = JSON.parse(localStorage.getItem("myCartItems"));
  CartTotalPrice = Number(localStorage.getItem("myCartTotalPrice"));


  // Update the UI List
  let CartListElement = document.getElementsByClassName("item_in_cart")[0];
  if(CartListElement == null)return;
  while (CartListElement.firstChild != null) {
    CartListElement.removeChild(CartListElement.firstChild);
  }

  CartItems.forEach((item) => {

    CartListElement.innerHTML += `
        <div class="item_cart">
          <img
            src="${item["img"] ?? item["image"]}"
            alt=""
          />
          <div class="content">
            <h4>${item.name ?? item.title}</h4>
            <div class="price_cart">${item.price} $</div>
          </div>
          <button type="button" style="height: 30px;width: 80px;" onclick="IncreaseQty(${item.id})">+</button>
          <div class="item_count">${item.count}</div>
          <button type="button" style="height: 30px;width: 80px;" onclick="DecreaseQty(${item.id})">-</button>
          <button class="delete_item">
            <i class="fa-solid fa-trash-can" onclick="deleteFromCart(${item.id})"></i>
          </button>
        </div>
        
        `;
  });


  // Update the items number
  let topCartElement = document.getElementsByClassName("top_cart")[0].firstElementChild;
  let countitems = document.getElementsByClassName("countitems")[0];

  if(topCartElement == null || countitems == null)return;

  topCartElement.innerHTML = `My Cart <span> ( ${CartItems.length} Item In Cart ) </span>`;
  countitems.innerHTML = `${CartItems.length}`;

  // Update the price
  let CartTotalPriceElement = document.getElementsByClassName("price_cart_total")[0];
  let priceCartHead = document.getElementsByClassName("pricecarthead")[0];

  if(CartTotalPriceElement == null || priceCartHead == null)return;

  priceCartHead.innerHTML = `${CartTotalPrice} $`
  CartTotalPriceElement.innerHTML = `${CartTotalPrice}$`;

}


function IncreaseQty(id) {

  CartItems = JSON.parse(localStorage.getItem("myCartItems"));
  CartTotalPrice = Number(localStorage.getItem("myCartTotalPrice"));

  let item = CartItems.find((item) => item.id == id);

  CartItems[CartItems.indexOf(item)].count++;
  CartTotalPrice += Number(CartItems[CartItems.indexOf(item)].price);
  CartTotalPrice = Number((CartTotalPrice).toFixed(2));

  localStorage.setItem("myCartItems", JSON.stringify(CartItems));
  localStorage.setItem("myCartTotalPrice", CartTotalPrice);

  updateCart();
}

function DecreaseQty(id) {

  CartItems = JSON.parse(localStorage.getItem("myCartItems"));
  CartTotalPrice = Number(localStorage.getItem("myCartTotalPrice"));

  let item = CartItems.find((item) => item.id == id);

  if (CartItems[CartItems.indexOf(item)].count > 1) {
    CartItems[CartItems.indexOf(item)].count--;
    CartTotalPrice -= Number(CartItems[CartItems.indexOf(item)].price);
    CartTotalPrice = Number((CartTotalPrice).toFixed(2));
  }

  localStorage.setItem("myCartItems", JSON.stringify(CartItems));
  localStorage.setItem("myCartTotalPrice", CartTotalPrice);

  updateCart();
}


function getCookie(cookieName) {
  var allCookie = document.cookie;

  var name = cookieName + "=";
  var part1 = allCookie.split(name)[1];
  //console.log(part1);
  var part2 = part1.split(";")[0];
  //console.log(part2);
  return part2;
}

let usernameLabelElement = document.getElementsByClassName("usernameLabel")[0];
if (usernameLabelElement != null) {
  let usernameCookie = getCookie("username");
  usernameLabelElement.innerHTML = `${usernameCookie}`;
}

// Login Script
function Login() {
  let username = String(document.getElementById("usernameField").value);
  let email = document.getElementById("emailField").value;
  let password = document.getElementById("passField").value;
  let confPassword = document.getElementById("confPassField").value;

  let valid = true;

  // console.log(username);
  // console.log(email);
  // console.log(password);
  // console.log(confPassword);


  if (username.length < 2) {
    let userError = document.getElementById("usernameError");
    userError.innerHTML = "Invalid Username";
    valid = false;
  }

  if (email.length < 1) {
    let emailError = document.getElementById("emailError");
    emailError.innerHTML = "Invalid Email Format";
    valid = false;
  }


  if (password.length < 6) {
    let passError = document.getElementById("passError");
    passError.innerHTML = "Password should be more than 6 characters";
    valid = false;
  }

  if (password != confPassword) {
    let confPassError = document.getElementById("confPassError");
    confPassError.innerHTML = "The confirm password not equal the password";
    valid = false;
  }


  if (valid) {
    // document.cookie = `username=${username}`;
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "username=" + username + ";" + expires + ";path=/";
    window.location.href = "idx.html";

  }

}


function PlaceOrder() {

  CartItems = JSON.parse(localStorage.getItem("myCartItems"));

  if (CartItems.length == 0) {
    alert("Your Cart is Empty");
    return;
  }

  window.location.href = "order_shipped.html";
}


function ShowProductDetails(id) {
  
  let myProducts = JSON.parse(localStorage.getItem("myProducts"));
  let myProducts_sale = JSON.parse(localStorage.getItem("myProducts_sale"));

  let currentProduct = myProducts.find((product) => product.id == id);
  if(currentProduct == undefined){
    currentProduct = myProducts_sale.find((product) => product.id == id);
  }

  //console.log(currentProduct);
  localStorage.setItem("id", id);
  localStorage.setItem("product", JSON.stringify(currentProduct));

  window.location.href = "product_details.html";
}