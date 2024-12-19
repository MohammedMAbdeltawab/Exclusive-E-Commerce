
let currentId = localStorage.getItem("id");
//console.log(currentId);
//console.log(localStorage.getItem("product"));
let currentProduct = JSON.parse(localStorage.getItem("product"));

console.log(currentProduct);


document.addEventListener("DOMContentLoaded", function () {
    var bodyElement = document.getElementsByClassName("main_product")[0];

    console.log(bodyElement);

    bodyElement.innerHTML = `<div class="product_detail">
                <div class="top_product row">
                    <h2 class="col-12">${currentProduct.title ?? currentProduct.name}</span></h2>
                </div>
                <div class="item_in_product row">
                    <div class="product_img col-4">
                        <img src="${currentProduct.image ?? currentProduct.img}" alt="">
                    </div>
                    <div class="details col-8">
                        <div class="details_row">
                            <div class="description col-12">
                                <h2>Details</h2>
                                <p>${currentProduct.description ?? ""}
                                </p>
                            </div>
                            <div class="price col-6">$${currentProduct.price}</div>
                            <div class="Rating col-6"> 4.1 / 5 </div>
                        </div>
                    </div>

                </div>
            </div>`;

});



function updateCart() {

    CartItems = JSON.parse(localStorage.getItem("myCartItems"));
    CartTotalPrice = Number(localStorage.getItem("myCartTotalPrice"));


    // Update the UI List
    let CartListElement = document.getElementsByClassName("item_in_cart")[0];
    if (CartListElement == null) return;
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

    if (topCartElement == null || countitems == null) return;

    topCartElement.innerHTML = `My Cart <span> ( ${CartItems.length} Item In Cart ) </span>`;
    countitems.innerHTML = `${CartItems.length}`;

    // Update the price
    let CartTotalPriceElement = document.getElementsByClassName("price_cart_total")[0];
    let priceCartHead = document.getElementsByClassName("pricecarthead")[0];

    if (CartTotalPriceElement == null || priceCartHead == null) return;

    priceCartHead.innerHTML = `${CartTotalPrice} $`
    CartTotalPriceElement.innerHTML = `${CartTotalPrice}$`;

}

updateCart();