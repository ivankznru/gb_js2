<template>
<div class="modal">
<span class="close" v-on:click="onClose">x</span>

<div class="goods-list">
  <CartItem  v-for="good of cart" v-bind:key="good.id_product" v-bind:good="good" ></CartItem>
</div>
</div>
</template>

<script>
import CartItem from '../components/CartItem.vue'

export default {
  components: {
    CartItem
  },
  computed: {
    cart() {
      console.log(this.$store.getters.cart)
      return this.$store.getters.cart
    }
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    onRemove(good) {
      this.$emit('remove', good)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal{
  width: 600px;
  height: 400px;
  position: absolute;
  top: 100px;
  left: calc(50% - 300px);
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 4px;
}
.close{
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
