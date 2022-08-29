<template>
  <v-card class="main-area" flat :theme="main_theme">
    <div class="buttons">
      <v-row :style="IconStyle" align="center" justify="center">
        <img
          alt="Autronica Logo"
          class="shrink mt-2"
          contain
          :src="mainIconPath"
          transition="scale-transition"
          width="50"
        />
      </v-row>
      <v-row class="mt-4 mb-4" align="center" justify="center">
        <v-btn variant="flat" icon @click="changeTheme">
          <v-icon>mdi-brightness-4</v-icon>
        </v-btn>
      </v-row>
      <v-row class="mt-4 mb-4" align="center" justify="center">
        <v-btn variant="flat" icon @click="changeSize">
          <v-icon>mdi-resize</v-icon>
        </v-btn>
      </v-row>
      <v-row class="mt-5 mb-5" align="center" justify="center">
        <v-btn class="text-subtitle-2" variant="flat" icon>Operate</v-btn>
      </v-row>
      <v-row class="mt-5 mb-5" align="center" justify="center">
        <v-btn class="text-subtitle-2" icon flat @click="sendReset"
          >Reset</v-btn
        >
      </v-row>
      <v-row class="mt-5 mb-5" align="center" justify="center">
        <v-btn class="text-subtitle-2" icon flat @click="sendAcknowledge"
          >Ack</v-btn
        >
      </v-row>
    </div>
    <div class="icons">
      <v-badge class="icon" :content="TotalAlarms" color="red-darken-2">
        <v-icon size="x-large" color="red-darken-2">mdi-alert-octagram</v-icon>
      </v-badge>

      <v-badge class="icon" :content="TotalFaults" color="yellow-darken-3">
        <v-icon size="x-large" color="yellow-darken-3">mdi-alert</v-icon>
      </v-badge>

      <v-badge class="icon" :content="TotalUnknowns" color="grey-darken-2">
        <v-icon size="x-large" color="grey-darken-2"
          >mdi-help-circle-outline</v-icon
        ></v-badge
      >
      <v-badge class="icon" :content="TotalAckeds" color="green-darken-3">
        <v-icon size="x-large" color="green-darken-3"
          >mdi-account-check-outline</v-icon
        ></v-badge
      >
    </div>

    <div class="infos">
      <v-col>
        <v-row justify="center" class="mt-0">
          <v-icon>mdi-latitude</v-icon>
        </v-row>
        <v-row justify="center">
          <v-label class="mt-2 text-subtitle-2">63.43°N</v-label>
        </v-row></v-col
      >

      <v-col>
        <v-row justify="center" class="mt-0">
          <v-icon>mdi-longitude</v-icon>
        </v-row>
        <v-row justify="center">
          <v-label class="mt-2 text-subtitle-2">10.39°E</v-label>
        </v-row></v-col
      >

      <v-col>
        <v-row justify="center" class="mt-0">
          <v-icon>mdi-ship-wheel</v-icon>
        </v-row>
        <v-row justify="center">
          <v-label class="mt-2 text-subtitle-2">{{ headingAngle }}°</v-label>
        </v-row></v-col
      >

      <v-col>
        <v-row justify="center" class="mt-0">
          <v-icon>mdi-speedometer</v-icon>
        </v-row>
        <v-row justify="center">
          <v-label class="mt-2 text-subtitle-2">{{ shipSpeed }} k</v-label>
        </v-row></v-col
      >

      <v-col>
        <v-row justify="center" class="mt-0">
          <v-icon>mdi-weather-windy</v-icon>
        </v-row>
        <v-row justify="center">
          <v-label class="mt-2 text-subtitle-2">{{ windSpeed }} m/s</v-label>
        </v-row></v-col
      >

      <v-col>
        <v-row justify="center" class="mt-0">
          <v-icon>mdi-windsock</v-icon>
        </v-row>
        <v-row justify="center">
          <v-label class="mt-2 text-subtitle-2">{{ windAngle }}°</v-label>
        </v-row></v-col
      >
    </div>
  </v-card>
</template>

<script lang="ts">
import ScreenInfoWidget from './ScreenInfoWidget.vue';
import logo from '../assets/autronica_logo.png';
import darkLogo from '../assets/autronica_logo_dark.png';
import { State, Message } from '../data/test';
import { sendCommand, commandRequest, commandResponse } from '../service/rest';

enum Trend {
  Increase,
  Decrease,
  Constant,
}

export default {
  data() {
    return {
      shipSpeed: 15.4,
      windSpeed: 12,
      headingAngle: 85,
      windAngle: 45,
      updateInterval: null,
      test_color: 'red',
    };
  },
  components: {
    ScreenInfoWidget,
  },
  props: {
    main_theme: {
      required: true,
      type: String,
      default: 'light',
    },
    bar_ratio: {
      required: true,
      type: Number,
      default: 0,
    },
    messages: {
      required: false,
      type: Array as () => Message[],
      default: [],
    },
    sse_server_address: {
      required: false,
      type: String,
      default: '',
    },
  },
  methods: {
    changeTheme() {
      this.$emit('change-theme');
    },
    changeSize() {
      this.$emit('fold');
    },
    sendReset() {
      const data: commandRequest = {
        type: 'reset',
      };
      sendCommand(data, this.sse_server_address)
        .then((response: commandResponse) =>
          console.log('response from server: ' + JSON.stringify(response))
        )
        .catch(() => {
          console.log('error on reset');
        });
    },
    sendAcknowledge() {
      const data: commandRequest = {
        type: 'acknowledge',
      };
      sendCommand(data, this.sse_server_address)
        .then((response: commandResponse) =>
          console.log('response from server: ' + JSON.stringify(response))
        )
        .catch(() => {
          console.log('error on acknowledge');
        });
    },
    updateShipSpeed() {
      let value = 0;
      const trend = this.randomTrend();
      if (trend === Trend.Increase) {
        value = 0.1;
      } else if (trend === Trend.Decrease) {
        value = -0.1;
      }

      if (this.shipSpeed > 0.1 && this.shipSpeed < 20) {
        this.shipSpeed = Math.floor((this.shipSpeed + value) * 10) / 10;
      } else {
        this.shipSpeed = 15.4;
      }
    },

    updateHeadingAngle() {
      let value = 0;
      const trend = this.randomTrend();
      if (trend === Trend.Increase) {
        value = 1;
      } else if (trend === Trend.Decrease) {
        value = -1;
      }
      if (this.headingAngle > 1 && this.headingAngle < 360) {
        this.headingAngle = Math.floor(this.headingAngle + value);
      } else {
        this.headingAngle = 85;
      }
    },

    updateWindSpeed() {
      let value = 0;
      const trend = this.randomTrend();
      if (trend === Trend.Increase) {
        value = 1;
      } else if (trend === Trend.Decrease) {
        value = -1;
      }
      if (this.windSpeed > 1 && this.windSpeed < 20) {
        this.windSpeed = Math.floor(this.windSpeed + value);
      } else {
        this.windSpeed = 12;
      }
    },

    updateWindAngle() {
      let value = 0;
      const trend = this.randomTrend();
      if (trend === Trend.Increase) {
        value = 1;
      } else if (trend === Trend.Decrease) {
        value = -1;
      }
      if (this.windAngle > 1 && this.windAngle < 90) {
        this.windAngle = Math.floor(this.windAngle + value);
      } else {
        this.windAngle = 45;
      }
    },

    updateAllValue() {
      this.updateHeadingAngle();
      this.updateShipSpeed();
      this.updateWindSpeed();
      this.updateWindAngle();
    },

    randomTrend(): Trend {
      //random generate number between 0 - 1
      const rand = Math.random();
      if (rand > 0.7) {
        return Trend.Increase;
      }
      if (rand < 0.3) {
        return Trend.Decrease;
      }
      return Trend.Constant;
    },
  },

  mounted() {
    this.updateInterval = setInterval(this.updateAllValue, 2000);
  },

  unmounted() {
    clearInterval(this.updateInterval);
    this.updateInterval = null;
  },

  computed: {
    TotalAlarms() {
      const num = this.messages.filter(
        (m: Message) => m.Type === State.Alarm
      ).length;
      if (num > 999) {
        return '99+';
      }
      return num.toString();
    },

    TotalFaults() {
      const num = this.messages.filter(
        (m: Message) => m.Type === State.Fault
      ).length;
      if (num > 999) {
        return '99+';
      }
      return num.toString();
    },

    TotalUnknowns() {
      const num = this.messages.filter(
        (m: Message) => m.Type === State.Unknow
      ).length;
      if (num > 999) {
        return '99+';
      }
      return num.toString();
    },

    TotalAckeds() {
      const num = this.messages.filter(
        (m: Message) => m.Acknowledged === true
      ).length;
      if (num > 999) {
        return '99+';
      }
      return num.toString();
    },

    mainIconPath() {
      if (this.main_theme === 'dark') {
        return logo;
      }
      return darkLogo;
    },

    IconStyle() {
      if (this.main_theme === 'dark') {
        return 'background-color: #424242; height: 68px; min-width: min-content;';
      }
      return 'background-color: #eeeeee; height: 68px; min-width: min-content; ';
    },

    infoStyle() {
      if (this.main_theme === 'dark') {
        return 'background-color: #424242; height: 62px;';
      }
      return 'background-color: #eeeeee; height: 62px;';
    },
  },
};
</script>

<style lang="scss" scoped>
.main-area {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.icons {
  flex: 1 1 100px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

.icon {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.buttons {
  flex: 0 1 100px;
}

.infos {
  flex: 0 1 100px;
}
</style>
