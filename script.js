/*TODO
1. add to cart btn functionality
- add item to the cart it gets removed
from the normal view and gets
moved to the cart / bag
- update the cart amt

2. delete from cart / bag btn
- remove the item thats being clicked on from the cart / bag
- update the cart amt

*/




const openCartBtn = document.querySelector(".my-cart-btn");
const closeCartBtn = document.querySelector(".close-cart-btn");
const cartSection = document.querySelector(".my-cart-section")
let shoppingItems = document.querySelector(".shopping__items")
let cartItems = document.querySelector(".cart__items")


/*open / close the cart section*/
openCartBtn.addEventListener("click", function(){
    cartSection.classList.toggle("my-cart--visible")
})

closeCartBtn.addEventListener("click", function() {
    cartSection.classList.remove("my-cart--visible")
})
/*=============================*/

let cartData = {
    item1:["apple"],
    item2:["grape"],
    item3:["pear"],
    item4:["orange"],

};

shoppingItems.addEventListener("click", event => {
    let item = event.target.closest(".shopping__item")
    let addToCartBtn = event.target.closest(".shopping__item__cart-btn")

    let itemImg = addToCartBtn.parentElement.children[0].src;
    let itemTitle = addToCartBtn.parentElement.children[1].textContent;
    let itemCost = addToCartBtn.parentElement.children[2].textContent;

    
    
    for(let i = 0; i < 4; i++) {
        console.log(cartData.item[i])
    }
})


// console.log(cartData)


// console.log(localStorage)






