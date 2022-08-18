<template>
  <v-card class="setting-widget" :theme="main_theme">
    <v-toolbar flat class="topbar">
      <v-toolbar-title class="title">Settings</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="$emit('close-settings')">
        <v-icon size="small">mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Events per page -->
    <v-label class="subtitle-tight">Events per page</v-label>
    <div class="sub-row" justify="center">
      <v-btn
        size="small"
        variant="text"
        icon="mdi-minus"
        @click="addEventsPerPage(false)"
      ></v-btn>
      <v-label class="num-disp">{{ events_per_page }}</v-label>
      <v-btn
        size="small"
        variant="text"
        icon="mdi-plus"
        @click="addEventsPerPage(true)"
      ></v-btn>
    </div>
    <v-divider></v-divider>

    <!-- Pin Events -->
    <v-label class="subtitle-tight">Enable pin event</v-label>
    <v-switch
      class="center-switch"
      v-model="enable_pin"
      color="#1E88E5"
      hide-details
      inset
      :label="`${enable_pin ? 'on' : 'off'}`"
    ></v-switch>
    <v-divider></v-divider>

    <!-- Auto Pin Events -->
    <v-label class="subtitle-tight">Auto pin</v-label>
    <v-switch
      :disabled="!enable_pin"
      class="center-top-switch"
      v-model="enable_auto_pin"
      color="#1E88E5"
      hide-details
      inset
      :label="`${enable_auto_pin ? 'on' : 'off'}`"
    ></v-switch>
    <v-switch
      :disabled="!enable_auto_pin"
      class="center-sub-switch"
      v-model="auto_pin_alarm"
      color="#1E88E5"
      hide-details
      inset
      :label="`${auto_pin_alarm ? 'Alarm' : 'Event'}`"
    ></v-switch>
    <v-divider></v-divider>

    <!-- Split Window -->
    <v-label class="subtitle-tight">Split window</v-label>
    <v-switch
      class="center-switch"
      v-model="enable_split"
      color="#1E88E5"
      hide-details
      inset
      :label="`${enable_split ? 'on' : 'off'}`"
    ></v-switch>
    <v-divider></v-divider>

    <v-label class="subtitle-tight">Events per window</v-label>
    <div class="sub-row" justify="center">
      <v-btn
        :disabled="!enable_split"
        size="small"
        variant="text"
        icon="mdi-minus"
        @click="addEventsPerWindow(false)"
      ></v-btn>
      <v-label class="num-disp">{{ events_per_window }}</v-label>
      <v-btn
        :disabled="!enable_split"
        size="small"
        variant="text"
        icon="mdi-plus"
        @click="addEventsPerWindow(true)"
      ></v-btn>
    </div>
    <v-divider></v-divider>

    <!-- Sorting -->
    <v-label class="subtitle-tight">Sorting</v-label>
    <div class="sub-row" justify="center">
      <v-btn-toggle
        rounded="md"
        variant="outlined"
        class="btn-group"
        v-model="message_sorting"
        tile
        color="#82b1ff"
        group
      >
        <v-btn value="timestamp"> Timestamp </v-btn>
        <v-btn value="order"> Order </v-btn>
      </v-btn-toggle>
    </div>
    <v-divider></v-divider>

    <!-- Server Address -->
    <v-label class="subtitle-tight">Server address</v-label>
    <div class="sub-row-column">
      <v-text-field
        class="ip-editor"
        v-model="server_address"
        :rules="rules"
        variant="underlined"
        color="#82b1ff"
      ></v-text-field>
      <v-btn
        class="btn-single"
        variant="tonal"
        color="#82b1ff"
        @click="setServerAddress"
      >
        Reconnect
      </v-btn>
    </div>
    <v-divider></v-divider>
  </v-card>
</template>

<script lang="ts">
export default {
  emits: [
    'close-settings',
    'enable-pin-function',
    'enable-auto-pin',
    'auto-pin-alarm',
    'events-per-page',
    'enable-split-window',
    'events-per-window',
  ],
  props: {
    main_theme: {
      required: false,
      type: String,
      default: 'light',
    },
    events_per_page: {
      required: true,
      type: Number,
    },
    enable_pin: {
      required: true,
      type: Boolean,
    },
    enable_auto_pin: {
      required: true,
      type: Boolean,
    },
    auto_pin_alarm: {
      required: true,
      type: Boolean,
    },
    enable_split: {
      required: true,
      type: Boolean,
    },
    events_per_window: {
      required: true,
      type: Number,
    },
    message_sorting: {
      required: true,
      type: String,
    },
    server_address: {
      required: true,
      type: String,
    },
  },
  watch: {
    enable_pin(newValue: boolean) {
      this.$emit('enable-pin-function', newValue);
    },
    enable_auto_pin(newValue: boolean) {
      this.$emit('enable-auto-pin', newValue);
    },
    auto_pin_alarm(newValue: boolean) {
      this.$emit('enable-auto-pin-alarm', newValue);
    },
    enable_split(newValue: boolean) {
      this.$emit('enable-split-window', newValue);
    },
  },
  methods: {
    addEventsPerPage(plusOne: boolean) {
      let numberEvents = this.events_per_page;
      if (plusOne) {
        if (numberEvents < 30) {
          numberEvents++;
        }
      } else {
        if (numberEvents > 1) {
          numberEvents--;
        }
      }
      this.$emit('events-per-page', numberEvents);
    },

    addEventsPerWindow(plusOne: boolean) {
      let numberEvents = this.events_per_window;
      if (plusOne) {
        if (numberEvents < 15) {
          numberEvents++;
        }
      } else {
        if (numberEvents > 1) {
          numberEvents--;
        }
      }
      this.$emit('events-per-window', numberEvents);
    },

    setServerAddress() {
      this.$emit('sse-server-address', this.server_address);
    },
  },
};
</script>

<style lang="scss" scoped>
.setting-widget {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  z-index: 1000;
}
.title {
  font-size: large;
}

.subtitle {
  font-size: medium;
  font-weight: bold;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
}
.subtitle-tight {
  font-size: medium;
  font-weight: bold;
  margin-top: 1rem;
  margin-left: 1rem;
}
.topbar {
  background-color: #82b1ff;
}

.num-disp {
  font-size: x-large;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.btn-group {
  height: 40px;
  margin-bottom: 0.5rem;
}

.sub-row {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
.sub-row-column {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 1rem;
}

.center-switch {
  display: flex;
  justify-content: center;
  margin-left: 1rem;
}

.center-top-switch {
  display: flex;
  justify-content: center;
  margin-left: 1rem;
  height: 40px;
}

.center-sub-switch {
  display: flex;
  justify-content: center;
  margin-left: 40px;
}

.ip-editor {
  width: 210px;
  height: 60px;
}

.ip-editor input {
  text-align: center;
}
.btn-single {
  width: 120px;
}

.pink-background {
  background-color: pink;
}
</style>
