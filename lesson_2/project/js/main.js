/**
 * добавил класс со статическим методом для правильного вывода окончания слова при разном кол-ве
 * @param value - какое число обрабатываем
 * @param words - массив слов которые надо обработать
 * @returns {*} - возвращаем слово с правильным окончанием
 */
class correctEndOfWord {
    static operation( value, words ) {
        let cases = [ 2, 0, 1, 1, 1, 2 ];
        return words[ ( value % 100 > 4 && value % 100 < 20 ) ? 2 : cases[ ( value % 10 < 5 ) ? value % 10 : 5 ] ];
    }
}

/**
 * класс обьединяет карточки товаров в список
 */

class GoodsList {
    constructor( container = '.products' ) {
        this.data = [];
        this.container = container;
        this.productsAll = [];
        this.totalPrice = 0;
        this.countGoods = 0;
        this.init();
        
    }
    
    init() {
        this._fetchProducts();
        this._render();
        this._totalPriceAll();
        this._eventHandlerForButtons();
    }
    
    /**
     * метод получения товаров
     */
    _fetchProducts() {
        this.data = [
           
            { id: 1, title: 'Prod-1', price: 150, img: 'img/prod-1.png',amount:5 },
            { id: 2, title: 'Prod-2', price: 30 , img: 'img/prod-2.png',amount:15},
            { id: 3, title: 'Prod-3', price: 55, img: 'img/prod-3.png',amount:20 },
            { id: 4, title: 'Prod-4', price: 65, img: 'img/prod-4.png',amount:8 },
            { id: 5, title: 'Prod-5', price: 120, img: 'img/prod-5.png',amount:10 },
        ];
    }
   
    /**
     * метод отрисовывает товары
     */
    _render() {
        const block = document.querySelector( this.container );
        for ( let product of this.data ) {
            const prod = new GoodsItem( product );
            this.productsAll.push( prod );
            block.insertAdjacentHTML( 'beforeend', prod.render() );
        }
    }
    
    /**
     * метод , определяющий суммарную стоимость всех товаров.
     */
    _totalPriceAll() {
        const block = document.querySelector( this.container );
        for ( let item of this.productsAll ) {
            this.totalPrice += item.price;
            this.countGoods++;
        }
        let outlet = `<div>В каталоге ${ this.countGoods } ${ correctEndOfWord.operation( this.countGoods, [ 'товар', 'товара', 'товаров' ] ) }
                        на сумму ${ this.totalPrice }  ${ correctEndOfWord.operation( this.totalPrice, [ 'рубль', 'рубля', 'рублей' ] ) }
                      </div> `;
        block.insertAdjacentHTML( 'afterend', outlet );
    }
    
    /**
     * Метод навешивания обработчика на кнопки в карточках товаров 
     */
    _eventHandlerForButtons() {
        const addBtn = document.querySelectorAll( '.buy-btn' );
        for ( let i = 0; i < addBtn.length; i++ ) {
            addBtn[ i ].addEventListener( 'click', event => cart.increment( +event.target.dataset.id ) );
        }
    }
}

/**
 * класс отвечяет за карточку товара
 */
class GoodsItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = product.img;
        this.amount =product.amount;
    }
    
    /**
     * метод отрисовывает карточку товара
     */
    render() {
        return `<div class="product-item">
        <img src="${ this.img }" alt="${ this.title }">   
                  <div class="desc">
                      <h3>${ this.title }</h3>
                      <p> Цена: ${ this.price }</p>
                      <p> Код: ${ this.id }</p>
                      <p> На складе: ${ this.amount }</p>
                      <!--в кнопки добавляем айдишник-->
                      <button class="buy-btn" data-id="${ this.id }">Купить</button>
                  </div>
              </div>`
    }
}

/**
 * класс для корзины товаров
 */
class Cart {
    constructor() {
        this.countGoods = 0; //Общая стоимость товаров
        this.totalPrice = 0; //Общая стоимость товаров
        this.basketItems = []; //Массив для хранения товаров
        this.$container = document.querySelector( '.cart' ); // контейнер для корзины
        this.init();
    }
    
    init() {
        this._fetchItems();
        this._render(); // отрисовываем корзину
    }
    
    /**
     * метод получения списка товаров в корзине
     */
    _fetchItems() {
    }
    
    /**
     * метод отрисовки корзины
     */
    _render() {
    }
    
    /**
     * Метод добавления товара в корзину или увеличения на 1 единицу данной позиции товара
     * @param id
     */
    increment( id ) {
        console.log( id ); // уже получаем айдишник товара
    }
    
    /**
     * Метод уменьшения кол-ва данного товара в корзине на одну единицу
     * @param id
     */
    decrement( id ) {
    }
    
    /**
     * Метод удаления всей позиции данного товара из корзины
     * @param id
     */
    remove( id ) {
    }
    
}
 
/**
 * класс элемента корзины товаров
 */
class CartItem {
    constructor( product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = product.img;
       
    }
   
    render() {
        return `<div class="cart-item">
        <img src="${ this.img }" alt="${ this.title }">  
                  <div class="desc">
                      <h3>${ this.title }</h3>
                      <p>${ this.price }</p>
                      <div class="options">
                          <span class="increment-btn" data-id="${ this.id }">+</span>
                          <span>&nbsp;&nbsp;</span>
                          <span class="decrement-btn" data-id="${ this.id }">-</span>
                      </div>
                  </div>
              </div>`
    }
}

const goods = new GoodsList();
const cart = new Cart();

/*
1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. 
Продумайте, какие методы понадобятся для работы с этими сущностями.
2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
*/