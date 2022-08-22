<template>
  <v-app>
    <side-bar
      v-if="!smallSideBarOpen"
      class="fill-height"
      :main_theme="theme"
      :width="windowWidth"
      :height="windowHeight"
      :screen_width="screenWidth"
      :screen_height="screenHeight"
      :bar_ratio="sideBarScreenRatio"
      :messages="eventMessgaes"
      :sse_server_address="sseServerAdd"
      @fold="switchBars"
      @change-theme="changeTheme"
      @change-server-address="changeServerAddress"
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
    sseServerAdd: string;
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
      sseServerAdd: '127.0.0.1:5005/stream',
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
      if (this.windowWidth < 150) {
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

    changeServerAddress(add: string) {
      if (this.sseServerAdd != add && add !== '') {
        //set new sse address
        this.sseServerAdd = add;
        //disconnect from current SSE server
        this.disconnectSSE();
        //reconnect to new SSE server
        this.connectSSE();
      }
    },

    connectSSE() {
      if (this.event_source === null) {
        this.event_source = new EventSource('http://' + this.sseServerAdd);
        this.event_source.addEventListener('clear', (event: MessageEvent) => {
          const data = event.data;
          if (data === 'all') {
            this.eventMessgaes = [];
          }
        });
        this.event_source.addEventListener('message', (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          this.eventMessgaes = this.eventMessgaes.concat(data);
        });
        this.event_source.addEventListener('open', () => {
          this.eventMessgaes = [];
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
