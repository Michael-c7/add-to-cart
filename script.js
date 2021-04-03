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
        sleepingDogs:["https://cdn.cloudflare.steamstatic.com/steam/apps/307690/header.jpg?t=1602800785" || "./images/sleeping-dogs-img.jpg", "Sleeping Dogs", "2.99"],
        fallout4:["https://cdn.cloudflare.steamstatic.com/steam/apps/377160/header.jpg?t=1588615523" || "./images/fallout-4-img.jpg", "Fallout 4", "19.99"],
        metroExodus:["https://cdn.cloudflare.steamstatic.com/steam/apps/412020/header.jpg?t=1614093928" || "./images/metro-exodus.jpg", "Metro Exodus", "39.99"],
        doomEternal:["https://cdn.cloudflare.steamstatic.com/steam/apps/782330/header.jpg?t=1616080865" || "./images/doom-eternal.jpg", "DOOM Eternal", "29.99"],
    }
    // sessionStorage.setItem("shoppingCartData", JSON.stringify(shoppingCartData));

    let arrValues = Object.values(shoppingCartData);
    let fragment = new DocumentFragment();

    /*WHERE PART 2 GOES
    item(argument) in the forEach loop is equivalent to arrValues[i]
     */
    let iterateBy;

    if(sessionStorage["shoppingData"]) {
        iterateBy = JSON.parse(sessionStorage.getItem("shoppingData"));
    } else {
        iterateBy = arrValues;
    }

    /* go through each arr
    and get the first of each value(img)*/
    console.log(arrValues[0][0])

    let imgs = [];
    for(let i = 0; i < arrValues.length; i++) {
        imgs.push(arrValues[i][0])
    }


    iterateBy.forEach((item, index) => {
        let itemImg = item[0] || imgs[index];
        let itemTitle = item[1];
        let itemCost = item[2];

        // parts of the fragment
        let li = document.createElement("li");
        let img = document.createElement("img");
        let h2 = document.createElement("h2");
        let h3 = document.createElement("h3");
        let button = document.createElement("button");
        // classes in the fragment
        li.classList.add("shopping__item");
        img.classList.add("shopping__item__image");
        h2.classList.add("shopping__item__title");
        h3.classList.add("shopping__item__price");
        // attributes in the fragment
        button.classList.add("shopping__item__cart-btn");
        img.setAttribute("src", `${itemImg}`);
        img.setAttribute("alt", "the games cover image");
        // text in the fragment
        h2.textContent = `${itemTitle || item.itemTitle}`;
        h3.textContent = `$${itemCost || item.itemCost}`;
        button.textContent = "Add to cart";
        //  appending the elements together
        li.appendChild(img);
        li.appendChild(h2);
        li.appendChild(h3);
        li.appendChild(button);
        fragment.appendChild(li);
        // append the fragment into the DOM(shopping__items)
        shoppingItems.appendChild(fragment);
    });
}
createShoppingCartItems()



/*loop though each shopping cart item and give it an id*/
function giveShoppingCartItemId() {
    let shoppingItemsAll = Array.from(shoppingItems.children);

    let shoppingItemsTitles = shoppingItemsAll.map((element) => {
        let elementTitle = element.children[1].textContent.toLowerCase();
        return elementTitle;
    });

    let shoppingItemsTitlesCamelCase = shoppingItemsTitles.map((item, index) => {
        /*this code is only built to handle titles w/ 2 words*/
        let words = item.split(" ");

        let firstWord = words[0];

        let secondWord = words[1];
        let secondWordFirstLetter = secondWord[0].toUpperCase();
        let secondWordRestOfString = secondWord.slice(1);
        let entireSecondWord = secondWordFirstLetter + secondWordRestOfString;

        let firstAndSecondWord = firstWord + entireSecondWord;

        return firstAndSecondWord;
    });

    /*Set the camelCased titles
    as an id for the
    individual shopping items*/
    for(let i = 0; i < shoppingItemsAll.length; i++) {
        shoppingItemsAll[i].id = shoppingItemsTitlesCamelCase[i];
    }
}


/*delete shopping item*/
function deleteShoppingItem() {
    let dollarSignRegex = /\$+/gi;
    let data = [];

    let currentItem = event.target.parentElement;
    /*remove current shopping item from the DOM*/
    // currentItem.remove();

    /*comment here*/
    let shoppingItemChildren = shoppingItems.children;
    for(let i = 0; i < shoppingItemChildren.length; i++) {

        let itemImg = shoppingItemChildren[i].children[0];
        let itemTitle = shoppingItemChildren[i].children[1].textContent;
        /*has dollar sign on the text*/
        let itemCostText = shoppingItemChildren[i].children[2].textContent;
        let itemCost = itemCostText.replaceAll(dollarSignRegex, "");
        data.push({itemImg, itemTitle, itemCost})
    }
    sessionStorage.setItem("shoppingData", JSON.stringify(data));
}



shoppingItems.addEventListener("click", event => {
    let item = event.target.closest(".shopping__item");
    let addToCartBtn = event.target.closest(".shopping__item__cart-btn");
    let itemImg = addToCartBtn.parentElement.children[0].src;
    let itemTitle = addToCartBtn.parentElement.children[1].textContent;
    let itemCost = addToCartBtn.parentElement.children[2].textContent;
    let uniqueID = new Date().getTime();
    localStorage.setItem(uniqueID, JSON.stringify({itemImg, itemTitle, itemCost}));

    /*do session storage stuff w/ shopping item here*/
    deleteShoppingItem();

    /*Update the UI w/ the correct
    number of items in the cart*/
    amtOfItemsInCart();

    // reload the page
        location.reload();
        return false;
})




/*create the html / data that goes into the cart*/
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




/*display's how many item are currently in the cart*/
function amtOfItemsInCart() {
    let itemAmtNav = document.querySelector(".shopping__navbar__amt");
    let itemAmtCart = document.querySelector(".my-cart-heading");

    /*the amount of items*/
    itemAmtNav.textContent = localStorage.length;
    itemAmtCart.textContent = `My Cart (${localStorage.length})`;
}



// delete an item from the cart
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

/*delete all the cart items*/
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