<template>
  <div>
    <div>
      <el-container>
        <el-aside width="250px">
          <ListOfGuide />
        </el-aside>
        <el-main>
          <div style="margin: 30px">
            <WelcomeMessage />
            <FeatureGuide />
            <div style="padding: 20px 0 0 0">
              <DetailedFeatureGuide />
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import WelcomeMessage from '@/components/homePageDetail/WelcomeMessage.vue'
import FeatureGuide from '@/components/homePageDetail/FeatureGuide.vue'
import DetailedFeatureGuide from '@/components/homePageDetail/DetailedFeatureGuide.vue'
import ListOfGuide from '@/components/homePageDetail/ListOfGuide.vue'

export default {
  name: 'home',
  components: {
    WelcomeMessage,
    FeatureGuide,
    DetailedFeatureGuide,
    ListOfGuide
  }
}
</script>
