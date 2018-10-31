<template>
  <div>
    <h3 id="element">A step by step general guide to use the system:</h3>
    <img alt="Guiding Diagram" src="../../assets/GeneralGuide.png">
    <p>
      <ol>
        <li>Create an user account with us through "Login" button.</li>
        <li>Upload any number of csv files using the "Import Data" function.</li>
        <li>Create a new presentation and add visualizations using the data uploaded.</li>
        <li>Share the presentation to your fellow friends to view or edit.</li>
      </ol>
    </p>  
    <h3>Currently, these are the pre-defined features that we support:</h3>
    <p>
      <ul>
        <li>Word cloud for all submissions keywords</li>
        <li>Submission rank author</li>
        <li>Submission rank country</li>
        <li>Submission rank organization</li>
        <li>Accepted submission organization rank</li>
        <li>Review Score Distribution</li>
        <li>Review weighted evaluation score statistic summary</li>
        <li>Reviewer Expertise Level Statistic Summary</li>
        <li style="color:red">More options can be found under the presentation pre-defined dropdown.</li>
      </ul>
    </p>
  </div>
  
</template>

<script>
    export default {
        name: "featureGuide.vue",
    }
</script>

<style scoped>
  img {
    width: 100%;
    height: auto;
  }
  h3 {
    margin: 40px 0 0 0;
  }
  p {
    font-size: 120%
  }
  
</style>
