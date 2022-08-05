const shop = document.getElementById("shop");
const cartAmount = document.getElementById('cartAmount');

let basket = JSON.parse(localStorage.getItem('data')) || []; 

let generateShop = () => {
    //return 
        shop.innerHTML = shopItemsData.map((x) => {
            let {id, name, price, desc, img} = x;
            let search = basket.find(x => x.id === id) || [];
            return `
                <div id="product-id-${id}" class="item">
                <img width="220" src="${img}" alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id="${id}" class="quantity">${search.item === undefined ? 0 : search.item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
            `
        }).join('');
    //)
}

generateShop();

let increment = (id) => {
    const selectedItem = id;
    let search = basket.find((x) => {
        return x.id === selectedItem.id; // return first element that past the test, and not find any element then return undefind!
    });

    if (search === undefined) { // Mada može i !search (ja mislim)
        basket.push({
            id: selectedItem.id,
            item: 1
        });
    } else {
        search.item++;
    }
    update(selectedItem.id);
    localStorage.setItem('data', JSON.stringify(basket));
}

let decrement = (id) => {
    const selectedItem = id;
    let search = basket.find((x) => {
        return x.id === selectedItem.id; // return first element that past the test, and not find any element then return undefind!
    });

    if (search === undefined) return;
    else if (search.item === 0 ) return;
    else {
        search.item--;
    }
    update(selectedItem.id);
    basket = basket.filter(x => x.item !== 0); // Nema smisla da u basket-u bude objekti sa item = 0;
    localStorage.setItem('data', JSON.stringify(basket));
}


let update = (id) => {
    const scoreElement = document.getElementById(id);
    const search = basket.find(x => x.id === id);
    scoreElement.innerHTML = search.item;
    calculation();
}

let calculation = () => {
    let sum = basket.reduce((total, num) => total + num.item, 0);
    cartAmount.innerHTML = sum;
}

calculation(); 