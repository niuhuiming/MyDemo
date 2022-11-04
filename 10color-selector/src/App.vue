<template>
  <div id="app" :style="{ backgroundColor: color }">
    <input type="text" :style="{ color: color }" v-model="color" />
    <input type="color" v-model="color" />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      color: '#ffb5ba'
    }
  }
}
</script>

<style>
#app {
  width: 1000px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

input[type="text"] {
  padding: 1rem 1rem;
  font-size: 2rem;
  background-color: #fff;
  border-radius: 3px;
}

input[type="color"] {
  width: 40px;
  height: 40px;
  margin-left: 10px;
  /* padding: 5px;
  padding: 0; */
  border-radius: 5px;
  background-color: #fff;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
}

input[type="color"]::-moz-color-swatch {
  border: none;
}
</style>