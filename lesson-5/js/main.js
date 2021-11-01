const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: `/catalogData.json`,
    goods: [],
    imgCatalog: `https://place-hold.it/200x150`,
    searchLine: "",
    isVisibleCart: false,
    cartList: [],
    emptyCart: true,
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => console.log(error))
    },
    addProduct(good) {
      if (this.emptyCart) {
        this.emptyCart = false;
        let cartProd = {
          ...good
        };
        cartProd.quantity = 1;
        this.cartList.push(cartProd);
      } else {
        let find = this.cartList.find(el => el.id_product === good.id_product);
        if (find) {
          find.quantity++;
        } else {
          let cartProd = {
            ...good
          };
          cartProd.quantity = 1;
          this.cartList.push(cartProd);

        }
      }
    },

    cartVisual() {
      if (this.isVisibleCart) {
        this.isVisibleCart = false;
      } else {
        this.isVisibleCart = true;
      }

    },

    removeCart() {

    },
  },

  computed: {
    filterGoods() {
      return this.goods.filter(el => {
        return el.product_name.toLowerCase().indexOf(this.searchLine.toLowerCase()) > -1;
      });
    },
  },
  mounted() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.goods.push(el);
        }
      });
  }
});

/* 
1. Добавить методы и обработчики событий для поля поиска.
Создать в объекте данных поле searchLine и привязать к нему содержимое поля ввода.
На кнопку «Искать» добавить обработчик клика, вызывающий метод FilterGoods.

2. Добавить корзину. В html-шаблон добавить разметку корзины. 
Добавить в объект данных поле isVisibleCart, управляющее видимостью корзины.

3. *Добавлять в .goods-list заглушку с текстом «Нет данных» в случае, если список товаров пуст.
*/