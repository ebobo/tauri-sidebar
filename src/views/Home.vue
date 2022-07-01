<template>
  <v-app>
    <side-bar
      :width="windowWidth"
      :height="WindowHeight"
      :screen_width="screenWidth"
      :screen_height="screenHeight"
      v-if="!smallSideBarOpen"
    />
    <small-side-bar v-if="smallSideBarOpen" />
  </v-app>
</template>

<script lang="ts">
import SideBar from '../components/SideBar.vue';
import SmallSideBar from '../components/SmallSideBar.vue';

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
    WindowHeight: number;
  } {
    return {
      smallSideBarOpen: false,
      screenWidth: screen.availWidth,
      screenHeight: screen.availHeight,
      windowWidth: window.innerWidth,
      WindowHeight: window.innerHeight,
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
      this.WindowHeight = window.innerHeight;
      if (this.screenWidth / this.windowWidth > 39) {
        this.smallSideBarOpen = true;
      } else {
        this.smallSideBarOpen = false;
      }
    },
  },
};
</script>
