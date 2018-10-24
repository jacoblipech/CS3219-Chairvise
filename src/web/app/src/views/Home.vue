<template>
  <div>
    <WelcomeMessage />
    <FeatureGuide />
  </div>
</template>

<script>
// @ is an alias to /src
import WelcomeMessage from '@/components/WelcomeMessage.vue'
import FeatureGuide from '@/components/FeatureGuide.vue'

export default {
  name: 'home',
  components: {
    WelcomeMessage,
    FeatureGuide
  }
}
</script>
