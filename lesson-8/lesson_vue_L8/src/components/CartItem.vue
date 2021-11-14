<template>
  <div class="good-card">
    <h2>{{ good.product_name }}</h2>
    <p>$ {{ good.price }}</p>
    <button v-on:click="onRemove">Х</button>
  </div>
</template>

<script>
export default {
  props: {
    good: Object
  },
  methods: {
    onRemove() {
      this.$store.dispatch('removeFromCart', this.good);
    }
  }
}
</script>
