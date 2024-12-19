fetch('./scripts/items.json')
  .then(response => response.json())
  .then(data => {
   let swiper_items_sale=document.getElementById("swiper_items_sale");
   if(swiper_items_sale == null)return;
   data.forEach(product => {
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
  })
