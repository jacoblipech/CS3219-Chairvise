<template>
  <canvas class="canvasStyle" width="1300" height="480"></canvas>
</template>

<script>
  import renderWordCloudNative from 'wordcloud';

  export default {
    name: "WordCloud",

    props: {
      data: {
        type: Array,
        required: true
      },
    },
    watch: {
      data() {
        this.renderWordCloud()
      },
    },
    mounted() {
      this.renderWordCloud()
    },
    updated() {
      this.renderWordCloud()
    },

    computed: {
      weightFactor() {
        return this.data.reduce((previous, current) => {
          return Math.max(previous, current[1])
        }, 0) / 4.0; // magic number
      }
    },

    methods: {
      renderWordCloud() {
        renderWordCloudNative(this.$el, {
          list: JSON.parse(JSON.stringify(this.data)),
          weightFactor: this.weightFactor,
          rotateRatio: 0
        })
      }
    }
  }
</script>

<style scoped>
.canvasStyle {
  width: 100%;
  height: 300px;
}
</style>