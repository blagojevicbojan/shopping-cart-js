const label = document.getElementById('label');
const shoppingCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem('data')) || [];

console.log(basket);

let calculation = () => {
    let sum = basket.reduce((total, num) => total + num.item, 0);
    cartAmount.innerHTML = sum;
}

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        console.log("basket is not empty");
        shoppingCart.innerHTML = basket.map(x => {
            let {id, item} = x;
            let search = shopItemsData.find(y => y.id === id) || [];
            let {img, name, price} = search;
            return `
                <div class="cart-item">
                    <img width="100" src=${img} alt="" />
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${name}</p>
                                <p class="cart-item-price">$ ${price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id="${id}" class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                        <h3>$ ${item * price}</h3>
                    </div>
                </div>
            `
        }).join('');
    } else {
        shoppingCart.innerHTML = '';
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class="homeBtn">Back to Home</button>
            </a>
        `;
    }
}

generateCartItems();

let increment = (id) => {
    const selectedItem = id;
    let search = basket.find((x) => {
        return x.id === selectedItem.id; 
    });

    if (search === undefined) { 
        basket.push({
            id: selectedItem.id,
            item: 1
        });
    } else {
        search.item++;
    }
    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem('data', JSON.stringify(basket));
}

let decrement = (id) => {
    const selectedItem = id;
    let search = basket.find((x) => {
        return x.id === selectedItem.id; 
    });
    if (search === undefined) return;
    else if (search.item === 0 ) return;
    else {
        search.item--;
    }
    update(selectedItem.id);
    basket = basket.filter(x => x.item !== 0); 
    generateCartItems(); 
    localStorage.setItem('data', JSON.stringify(basket));
}


let update = (id) => {
    const scoreElement = document.getElementById(id);
    const search = basket.find(x => x.id === id);
    scoreElement.innerHTML = search.item;
    calculation();
    totalAmount();
}

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter(x => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem('data', JSON.stringify(basket));
}

let clearCart = ()  => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem('data', JSON.stringify(basket));
}

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map(x => {
            let search = shopItemsData.find(y => x.id === y.id) || [];
            return x.item * search.price;
        }).reduce((t, n) => t + n, 0);
        label.innerHTML = `
            <h3>Total Bill: $ ${amount}</h3>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `
    }
    else return;
}

totalAmount();