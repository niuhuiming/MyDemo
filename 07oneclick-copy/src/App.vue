<template>
  <div id="app">
    <textarea v-model="copyText" cols="100" rows="10"></textarea>
    <!-- 使用自定义指令 -->
    <button v-copy="copyText">copy</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      copyText: '《醉翁亭记》\n醉翁之意不在酒，在乎山水之间也。山水之乐，得之心而寓之酒也。',
    };
  }
}
</script>