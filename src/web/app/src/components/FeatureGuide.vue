<template>
  <div class="guide">
    <h3>A step by step guide to use the system:</h3>
    <ol>
      <li>Create an user account with us through "Login" button.</li>
      <li>Upload any number of csv files using the "Import Data" function.</li>
      <li>Create a new presentation and add visualizations using the data uploaded.</li>
      <li>Share the presentation to your fellow friends to view or edit.</li>
    </ol>
    <h3>Currently, these are the pre-defined features that we support:</h3>
    <ul>
      <li>Word cloud</li>
      <li>Bar chart graph</li>
      <li>Line plot</li>
      <li>Pie chart</li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "featureGuide.vue",
    }
</script>

<style scoped>
  h3 {
    margin: 40px 0 0;
  }
</style>
