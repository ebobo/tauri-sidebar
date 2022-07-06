<template>
  <v-app class="app-area">
    <side-bar
      class="fill-height"
      :width="windowWidth"
      :height="windowHeight"
      :screen_width="screenWidth"
      :screen_height="screenHeight"
      :bar_ratio="sideBarScreenRatio"
      :messages="testMessgaes"
      @fold="switchBars"
      v-if="!smallSideBarOpen"
    />
    <small-side-bar :bar_ratio="sideBarScreenRatio" v-if="smallSideBarOpen" />
  </v-app>
</template>

<script lang="ts">
import SideBar from '../components/SideBar.vue';
import SmallSideBar from '../components/SmallSideBar.vue';
import { TestMessages, Message } from '../data/test';

export default {
  components: {
    SideBar,
    SmallSideBar,
  },
  data(): {
    smallSideBarOpen: boolean;
    screenWidth: number;
    screenHeight: number;
    windowWidth: number;
    windowHeight: number;
    sideBarScreenRatio: number;
    testMessgaes: Message[];
  } {
    return {
      smallSideBarOpen: false,
      screenWidth: screen.availWidth,
      screenHeight: screen.availHeight,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      sideBarScreenRatio: screen.availWidth / window.innerWidth,
      testMessgaes: TestMessages,
    };
  },
  created() {
    window.addEventListener('resize', this.onResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.sideBarScreenRatio = this.screenWidth / this.windowWidth;
      if (this.sideBarScreenRatio > 40) {
        this.smallSideBarOpen = true;
      } else {
        this.smallSideBarOpen = false;
      }
    },

    switchBars() {
      this.smallSideBarOpen = !this.smallSideBarOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-area {
  background-color: #0f9b0f;
}
</style>
