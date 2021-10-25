'use strict';


const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


let makeGetRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error');
                } else {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.send();
    });
};

makeGetRequest(`${API}/catalogData.json`).then(result => console.log(result)).catch(error => console.log(error));

// описываем класс списка каталога продуктов
class List {
  constructor(container, url, list = list2) {
    this.container = container;
    this.list = list;
    this.url = url;
    this.goods = [];
    this.allProducts = [];
    this._init();
  }

  // метод подтягивающий продукты из API
  getJson(url) {
    return fetch(url ? url : `${API + this.url}`).then(result => result.json()).catch(error => console.log(error));
  }

  // метод вставлящий полученный объект в массив и запускающий вывод товаров на страницу
  handlerData(data) {
    this.goods = [...data];
    this.render();
  }

  // метод расчета общей суммы товаров
  calcSum() {
    return this.allProducts.reduce((accum, item) => accum += item.price, 0);
  }

  // метод выводящий товары на страницу
  render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      console.log(this.constructor.name);
      const productObj = new this.list[this.constructor.name](product);
      console.log(productObj);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML('beforeend', productObj.render());
    }
  }

  // метод для инициализации
  _init() {
    return false;
  }
}

// описываем класс для товара
class Item {
  constructor(element, image = '') {
    this.product_name = element.product_name;
    this.price = element.price;
    this.id_product = element.id_product;
    this.img = image;
  }
  // вывод товара на страницу
  render() {
      return `<div class="product-item" data-id="${this.id_product}">
          <img src="${this.img}" alt="image product">
          <h3>${this.product_name}</h3>
          <p>${this.price} руб.</p>
          <button class="buy-btn" 
          data-id="${this.id_product}" 
          data-name="${this.product_name}"
          data-price="${this.price}">Добавить</button>
        </div>`;
  }
}


class ProductList extends List {
    constructor(cart, container = '.products', url='/catalogData.json') {
        super(container, url);
        this.cart = cart;
        this.getJson().then(data => this.handlerData(data));
    }
// метод для инициализации
    _init() {
        document.querySelector(this.container).addEventListener('click', event => {
            if (event.target.classList.contains('buy-btn')) {
                this.cart.addProduct(event.target);
            }
        })
    }
}

class ProductItem extends Item {}

class Cart extends List {
    constructor(container = '.cart-container', url = '/getBasket.json') {
        super(container, url);
        this.getJson().then(data => this.handlerData(data.contents));
    }

    // добавление товара
    addProduct(element) {
        this.getJson(`${API}/addToBasket.json`).then(data => {
            if(data.result === 1) {
                let productId = +element.dataset['id'];
                let find = this.allProducts.find(product => product.id_product === productId);
                if(find) {
                    find.quantity++;
                    this._upDateCart(find);
                } else {
                    let product = {
                        id_product: productId,
                        price: +element.dataset['price'],
                        product_name: element.dataset['name'],
                        quantity: 1
                    };
                    this.goods = [product];
                    this.render();
                }
            } else {
                alert('Ошибка добавления');
            }
        })
    }

    // удаление товара
    removeProduct(element) {
        this.getJson(`${API}/deleteFromBasket.json`).then(data => {
            if(data.result === 1) {
                let productId = +element.dataset['id'];
                let find = this.allProducts.find(product => product.id_product === productId);
                if(find.quantity > 1) {
                    find.quantity--;
                    this._upDateCart(find);
                } else {
                    this.allProducts.splice(this.allProducts.indexOf(find), 1);
                    document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                }
            } else {
                alert('Ошибка удаления');
            }
        })
    }

    // обновление
    _upDateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Кол-во: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `$${product.quantity*product.price}`;
    }

    _init() {
        document.querySelector('.cart-btn').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('hidden');
        });
        document.querySelector(this.container).addEventListener('click', event => {
            if(event.target.classList.contains('remove-item')) {
                this.removeProduct(event.target);
            }
        })
    }
}


// класс корзины

class CartItem extends Item {
    constructor(element, image = 'img/prod-1.png') {
        super(element, image);
        this.quantity = element.quantity;
    }
// прорисовка карточек в корзине
    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
            <div class="left-block">
            <img src="${this.img}" alt="image">
            <div class="product-info">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Кол-во: ${this.quantity}</p>
            <p class="product-single-price">$${this.price}</p>
            </div>
            </div>
            <div class="right-block">
                <p class="product-price">$${this.quantity*this.price}</p>
                <i class="fa fa-times-circle remove-item" data-id="${this.id_product}" aria-hidden="true"></i>
            </div>
            </div>`
    }
}

const list2 = {
  ProductList: ProductItem,
  Cart: CartItem
};

let cart = new Cart();
let products = new ProductList(cart);