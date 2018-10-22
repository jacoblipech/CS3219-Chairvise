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
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <h3>You can find more information about our project in the link below:</h3>
    <ul>
      <li><a href="https://github.com/CS3219-SEM1/chairvise-project-2018-team-01" target="_blank" ref="noopener">Github Project Page</a></li>
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
  ul {
    list-style-type: none;
    padding: 0;
  }
  ul > li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
