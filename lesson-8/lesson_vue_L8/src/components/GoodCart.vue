<template>
  <div v-on:click="onClick" class="good-card">
    <h2>{{ title }}</h2>
    <p>$ {{ price }}</p>
  </div>
</template>

<script>
export default {
  name: 'GoodCart',
  props: {
    title: String,
    price: Number
  },
  methods: {
    onClick() {
      this.$emit('add')
    }
  }
}
</script>
