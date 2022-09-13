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
      :cctv_stream_address="cctvAdd"
      @fold="switchBars"
      @change-theme="changeTheme"
      @change-server-address="changeServerAddress"
      @change-cctv-address="changeCCTVAddress"
    />
    <small-side-bar
      v-if="smallSideBarOpen"
      class="fill-height"
      :messages="eventMessgaes"
      :main_theme="theme"
      :bar_ratio="sideBarScreenRatio"
      :sse_server_address="sseServerAdd"
      @fold="switchBars"
      @change-theme="changeTheme"
    />
  </v-app>
</template>

<script lang="ts">
import SideBar from '../components/SideBar.vue';
import SmallSideBar from '../components/SmallSideBar.vue';
import { Message, AppSettings } from '../data/test';
import {
  createDir,
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from '@tauri-apps/api/fs';

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
    cctvAdd: string;
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
      sseServerAdd: 'localhost:5000',
      cctvAdd: 'http://localhost/media/movie1.mp4',
    };
  },

  created() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
    this.readSettings();
  },

  unmounted() {
    this.disconnectSSE();
    window.removeEventListener('resize', this.onResize);
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.sideBarScreenRatio = this.screenWidth / this.windowWidth;
      if (this.windowWidth <= 155) {
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
      //write theme to settings
      this.writeSettings();
    },

    changeServerAddress(add: string) {
      if (this.sseServerAdd != add && add !== '') {
        //set new sse address
        this.sseServerAdd = add;
        //write the server address to settings
        this.writeSettings();
        //disconnect from current SSE server
        this.disconnectSSE();
        //reconnect to new SSE server
        this.connectSSE();
      }
    },

    changeCCTVAddress(add: string) {
      if (this.sseServerAdd != add && add !== '') {
        //set new sse address
        this.cctvAdd = add;
        //write the server address to settings
        this.writeSettings();
      }
    },

    // read settings from local storage
    async readSettings() {
      // BaseDirectory: ./config/com.autronica.sidebar
      try {
        const contents = await readTextFile('settings/app.json', {
          dir: BaseDirectory.App,
        });
        if (contents) {
          const obj = JSON.parse(contents);
          if (obj.ServerAddress) {
            this.sseServerAdd = obj.ServerAddress;
          }
          if (obj.MonitorAddress) {
            this.cctvAdd = obj.MonitorAddress;
          }
          if (obj.Theme) {
            this.theme = obj.Theme;
          }
        }
      } catch (e) {
        await createDir('settings', {
          dir: BaseDirectory.App,
          recursive: true,
        });
      }
      this.connectSSE();
    },

    writeSettings() {
      const settings: AppSettings = {
        EventsPerPage: 10,
        ServerAddress: this.sseServerAdd,
        MonitorAddress: this.cctvAdd,
        Theme: this.theme,
      };
      const stringJSON = JSON.stringify(settings);
      writeTextFile(
        { path: 'settings/app.json', contents: stringJSON },
        { dir: BaseDirectory.App }
      ).catch(() => console.log('write error'));
    },

    connectSSE() {
      if (this.event_source === null) {
        this.event_source = new EventSource(
          'http://' + this.sseServerAdd + '/sse/feed'
        );
        this.event_source.addEventListener('clear', (event: MessageEvent) => {
          const data = event.data;
          if (data === 'all') {
            this.eventMessgaes = [];
          }
        });

        this.event_source.addEventListener('frakon', (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          // not alarm message
          if (data.meta.codec !== 'alarmMsg') {
            return;
          }
          const messageIndex = this.eventMessgaes.findIndex(
            (mes: Message) => mes.Key === data.message.key.join('-')
          );

          // message exist
          if (messageIndex > -1) {
            // delete message
            if (data.meta.deleted) {
              // remove it from list
              this.eventMessgaes.splice(messageIndex, 1);
            } else {
              // update message
              this.eventMessgaes[messageIndex].Name = data.message.name;
              this.eventMessgaes[messageIndex].Description =
                data.message.description[0].text;
              this.eventMessgaes[messageIndex].Timestamp = new Date(
                data.message.time
              ).toLocaleString('en-GB', {
                hour12: false,
              });
              this.eventMessgaes[messageIndex].Timesvalue = data.message.time;
              this.eventMessgaes[messageIndex].Acknowledged =
                data.message.value[0].ack.state;
            }
          } else {
            // add new messsage
            const system_message = {
              Key: data.message.key.join('-'),
              Tag: data.message.tag,
              Name: data.message.name,
              Description: data.message.description[0].text,
              Type: data.meta.type,
              Timestamp: new Date(data.message.time).toLocaleString('en-GB', {
                hour12: false,
              }),
              Timesvalue: data.message.time,
              Quality: data.meta.quality,
              Acknowledged: data.message.value[0].ack.state,
            };
            this.eventMessgaes = this.eventMessgaes.concat(system_message);
          }
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
