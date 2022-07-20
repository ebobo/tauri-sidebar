<template>
  <v-app class="app-area">
    <side-bar
      v-if="!smallSideBarOpen"
      :main_theme="theme"
      class="fill-height"
      :width="windowWidth"
      :height="windowHeight"
      :screen_width="screenWidth"
      :screen_height="screenHeight"
      :bar_ratio="sideBarScreenRatio"
      :messages="eventMessgaes"
      @fold="switchBars"
      @change-theme="changeTheme"
    />
    <small-side-bar
      v-if="smallSideBarOpen"
      class="fill-height"
      :messages="eventMessgaes"
      :main_theme="theme"
      :bar_ratio="sideBarScreenRatio"
      @fold="switchBars"
      @change-theme="changeTheme"
    />
  </v-app>
</template>

<script lang="ts">
import SideBar from '../components/SideBar.vue';
import SmallSideBar from '../components/SmallSideBar.vue';
import { Message } from '../data/test';

export default {
  components: {
    SideBar,
    SmallSideBar,
  },
  data(): {
    screenWidth: number;
    screenHeight: number;
    windowWidth: number;
    windowHeight: number;
    sideBarScreenRatio: number;
    smallSideBarOpen: boolean;
    theme: string;
    eventMessgaes: Message[];
    event_source: EventSource | null;
  } {
    return {
      screenWidth: screen.availWidth,
      screenHeight: screen.availHeight,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      sideBarScreenRatio: screen.availWidth / window.innerWidth,
      smallSideBarOpen: false,
      theme: 'light',
      eventMessgaes: [],
      event_source: null,
    };
  },
  created() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
    this.connectSSE();
  },
  destroyed() {
    this.disconnectSSE();
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.sideBarScreenRatio = this.screenWidth / this.windowWidth;
      if (this.sideBarScreenRatio > 30) {
        this.smallSideBarOpen = true;
      } else {
        this.smallSideBarOpen = false;
      }
    },

    switchBars() {
      this.smallSideBarOpen = !this.smallSideBarOpen;
    },

    changeTheme() {
      if (this.theme === 'dark') {
        this.theme = 'light';
      } else {
        this.theme = 'dark';
      }
    },

    connectSSE() {
      if (this.event_source === null) {
        this.event_source = new EventSource('http://localhost:5005/stream');

        console.log('connect to sse');

        this.event_source.addEventListener('clear', (event: MessageEvent) => {
          const data = event.data;
          console.log(data);
          if (data === 'all') {
            this.eventMessgaes = [];
          }
        });

        this.event_source.addEventListener('message', (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          console.log('add event : ', data.length);
          this.eventMessgaes = this.eventMessgaes.concat(data);
        });
      }
    },

    disconnectSSE() {
      if (this.event_source !== null) {
        this.event_source.close();
        this.eventMessgaes = [];
        this.event_source = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
