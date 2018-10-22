<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      This project is designed to enable conference program chairpersons to visualize and share conference submission statistics.
      By parsing information in different formats, we aim to assist user to obtain the most valued out of the information uploaded.
      We also support sharing and exporting of such visualization.
    </p>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  max-width: 600px
}
</style>
