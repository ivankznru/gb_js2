const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue( {
    el: '#app',
    data: {
        
    },
    methods: {
        getJson( url ) {
            return fetch( url )
                .then( result => result.json() )
                .catch( error => this.$refs.error.showError(error) )
        },
        // метод коррекции окончания слов. например 1 товар 2 товара 5 товаров
        correctWord( value, words ) {
            let cases = [ 2, 0, 1, 1, 1, 2 ];
            return words[ ( value % 100 > 4 && value % 100 < 20 ) ? 2 : cases[ ( value % 10 < 5 ) ? value % 10 : 5 ] ];
        },
    },
} );




/*
https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses – адрес API;

/catalogData.json – получить список товаров;
/getBasket.json – получить содержимое корзины;
/addToBasket.json – добавить товар в корзину;
/deleteFromBasket.json – удалить товар из корзины.
*/
