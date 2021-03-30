/* TODO
save the main item eg: w/ add to cart in session storage
https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
*/





const openCartBtn = document.querySelector(".my-cart-btn");
const closeCartBtn = document.querySelector(".close-cart-btn");
const cartSection = document.querySelector(".my-cart-section");
let shoppingItems = document.querySelector(".shopping__items");
let cartItems = document.querySelector(".cart__items");
let deleteAllCartItemsBtn = document.querySelector(".cart__delete-all-btn");


/*open / close the cart section*/
openCartBtn.addEventListener("click", function(){
    cartSection.classList.toggle("my-cart--visible")
})

closeCartBtn.addEventListener("click", function() {
    cartSection.classList.remove("my-cart--visible")
})
/*=============================*/



function createShoppingCartItems() {
    let shoppingCartData = {
        sleepingDogs:["https://cdn.cloudflare.steamstatic.com/steam/apps/307690/header.jpg?t=1602800785", "Sleeping Dogs", "2.99"],
        fallout4:["https://cdn.cloudflare.steamstatic.com/steam/apps/377160/header.jpg?t=1588615523", "Fallout 4", "19.99"],
        metroExodus:["https://cdn.cloudflare.steamstatic.com/steam/apps/412020/header.jpg?t=1614093928", "Metro Exodus", "39.99"],
        doomEternal:["https://cdn.cloudflare.steamstatic.com/steam/apps/782330/header.jpg?t=1616080865", "DOOM Eternal", "29.99"],
    }
    sessionStorage.setItem("shoppingCartData", JSON.stringify(shoppingCartData));
    // console.log(sessionStorage)

    let arrValues = Object.values(shoppingCartData);
    let fragment = new DocumentFragment();

    arrValues.forEach((item) => {
        let itemImg = item[0];
        let itemTitle = item[1];
        let itemCost = item[2];
        /* parts of the fragment*/
        let li = document.createElement("li");
        let img = document.createElement("img");
        let h2 = document.createElement("h2");
        let h3 = document.createElement("h3");
        let button = document.createElement("button")
        /*classes in the fragment*/
        li.classList.add("shopping__item");
        img.classList.add("shopping__item__image");
        h2.classList.add("shopping__item__title");
        h3.classList.add("shopping__item__price");
        button.classList.add("shopping__item__cart-btn");
        /*attributes in the fragment*/
        img.setAttribute("src", `${itemImg}`);
        img.setAttribute("alt", "the games cover image");
        /*text in the fragment*/
        h2.textContent = `${itemTitle}`;
        h3.textContent = `$${itemCost}`;
        button.textContent = "Add to cart";
        /*appending the elements together*/
        li.appendChild(img);
        li.appendChild(h2);
        li.appendChild(h3);
        li.appendChild(button);
        fragment.appendChild(li);
        /*append the fragment into the DOM(shopping__items)*/
        shoppingItems.appendChild(fragment);
    });
}
createShoppingCartItems()



/*loop though each shopping cart item and give it an id*/
function giveShoppingCartItemId() {
    let shoppingItemsAll = Array.from(shoppingItems.children);
    let titles = [];
    let ids = [];
        // give each shopping cart item an id
        shoppingItemsAll.forEach(element => {
            let elementTitle = element.children[1].textContent.toLowerCase();
            
            /*Id should be in camelCase in order
            to match the session object names*/
           
            


            // console.log(elementTitleSplit)



            // replace all space w/ - (minus sign)
            // let sessionElementKey = elementTitle.replace(/\s/gi, "-");
            // element.id  = sessionElementKey;
            // ids.push(sessionElementKey);
        });

        /*Save all the id's
        session keys for the shopping item)
        into session storage*/
        // sessionStorage.setItem("shoppingCartIds", JSON.stringify(ids));
    }






shoppingItems.addEventListener("click", event => {
    let item = event.target.closest(".shopping__item");
    let addToCartBtn = event.target.closest(".shopping__item__cart-btn");

    let itemImg = addToCartBtn.parentElement.children[0].src;
    let itemTitle = addToCartBtn.parentElement.children[1].textContent;
    let itemCost = addToCartBtn.parentElement.children[2].textContent;

    let uniqueID = new Date().getTime();
    localStorage.setItem(uniqueID, JSON.stringify({itemImg, itemTitle, itemCost}));
    // item.remove();

    // whatever
    // shoppingItem(uniqueID, addToCartBtn)


    /*remove the item from session storage*/
    let shoppingItemsIds = JSON.parse(sessionStorage["shoppingCartData"]);
    // let rest;
    // shoppingItemsIds.forEach((item) => {
    //     let currentTitleId = addToCartBtn.parentElement.id;
    //     if(currentTitleId === item) {
    //         let titleIndex = shoppingItemsIds.indexOf(currentTitleId);
    //         rest = shoppingItemsIds.splice(titleIndex, titleIndex + 1);
    //     }
    //     // stuff here
    //     sessionStorage.clear();
    //     sessionStorage.setItem("shoppingItemsIds", JSON.stringify(shoppingItemsIds))
    //     console.log(sessionStorage)
    // })
    console.log(shoppingItemsIds)

    /*remove the shopping item
    that was clicked on
    from session storage*/
    



    /*Update the UI w/ the correct
    number of items in the cart*/
    amtOfItemsInCart();

    // reload the page
    // location.reload();
    // return false;
})




/* */
function cartItem() {
    let keysArr = Object.keys(localStorage);
    let valuesArr = Object.values(localStorage);
    let fragment = new DocumentFragment();

    // each item as an object
    for(let i = 0; i < valuesArr.length; i++) {
        // the value
        let imgItem = JSON.parse(valuesArr[i]).itemImg;
        let itemTitle = JSON.parse(valuesArr[i]).itemTitle;
        let itemCost = JSON.parse(valuesArr[i]).itemCost;


        /*parts of the document fragment*/
            /*elements of the fragment */
            let li = document.createElement("li");
            let img = document.createElement("img");
            let h2 = document.createElement("h2");
            let h3 = document.createElement("h3");
            let button = document.createElement("button");
            let iconElement = document.createElement("i");
            /*classes in the fragment*/
            li.classList.add("cart__item");
            img.classList.add("cart__item__image");
            h2.classList.add("cart__item__title");
            h3.classList.add("cart__item__price");
            button.classList.add("close-cart-btn", "delete-from-cart-btn");
            iconElement.classList.add("fa", "fa-times");
            /*attributes * id in the fragment*/
            img.setAttribute("src", imgItem);
            iconElement.setAttribute("aria-hidden", "false");
            li.id = keysArr[i];
            /*text added to the fragment*/
            h2.textContent = itemTitle;
            h3.textContent = itemCost;
            /*appending the elements together*/
            li.appendChild(img);
            li.appendChild(h2);
            li.appendChild(h3);
            li.appendChild(button);
            button.appendChild(iconElement);
            fragment.appendChild(li);
            /*append the fragment into the DOM(cart__items)*/
            cartItems.appendChild(fragment)
    }
}





function amtOfItemsInCart() {
    let itemAmtNav = document.querySelector(".shopping__navbar__amt");
    let itemAmtCart = document.querySelector(".my-cart-heading");

    /*the amount of items*/
    itemAmtNav.textContent = localStorage.length;
    itemAmtCart.textContent = `My Cart (${localStorage.length})`;
}



// delete cart item
cartItems.addEventListener("click", function(event) {
    // delete cart item
    let closeBtn = event.target.closest(".close-cart-btn");
    let item = closeBtn.parentElement;
    let itemId = item.id;
    // delete item in the DOM
    item.remove();
    // delete the item in local storage
    localStorage.removeItem(itemId);

    /*Update the UI w/ the correct
    number of items in the cart*/
    amtOfItemsInCart();
});


function deleteAllCartItems() {
    if(localStorage.length > 0) {
        let confirmChat = confirm("Are you sure you want to delete every item in your cart?")
        if(confirmChat) {
            localStorage.clear();
            location.reload();
            return false;
        }
    }
}
deleteAllCartItemsBtn.addEventListener("click", deleteAllCartItems);


// run functions here
amtOfItemsInCart();
cartItem();
giveShoppingCartItemId();