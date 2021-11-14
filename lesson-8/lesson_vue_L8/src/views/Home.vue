<template>
  <div class="page">
    <header>
      <Search></Search>
      <button class="cart-button" type="button" v-on:click="onToggleCart">Корзина</button>
    </header>
    <main>
      <GoodsList></GoodsList>
    </main>
    <Cart
        v-bind:isVisibleCart="isVisibleCart"
        v-on:close="onToggleCart"
        v-if="isVisibleCart"
    ></Cart>
  </div>
</template>

<script>
import Search from '../components/Search.vue';
import GoodsList from '../components/GoodsList.vue';
import Cart from '../components/Cart.vue';


export default {
  components: {
    Search,
    GoodsList,
    Cart,
  },
  data() {
    return {
      isVisibleCart: false,
    };
  },
  methods: {
    onToggleCart() {
      this.isVisibleCart = !this.isVisibleCart
    }
  },
  mounted() {
    this.$store.dispatch('loadGoods'),
        this.$store.dispatch('loadCart')
  }
}
</script>
