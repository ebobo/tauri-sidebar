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
    <v-label class="subtitle-tight">Pin events</v-label>
    <v-switch
      class="center-switch"
      v-model="enable_pin"
      color="#1E88E5"
      hide-details
      inset
      :label="`${enable_pin ? 'on' : 'off'}`"
    ></v-switch>
    <v-divider></v-divider>

    <!-- Split Window -->
    <v-label class="subtitle-tight">Split window</v-label>
    <v-switch
      class="center-switch"
      v-model="enable_spilt"
      color="#1E88E5"
      hide-details
      inset
      :label="`${enable_spilt ? 'on' : 'off'}`"
    ></v-switch>
    <v-divider></v-divider>

    <!-- Sorting -->
    <v-label class="subtitle">Sorting</v-label>
    <v-card-actions>
      <!-- <v-btn color="primary" text @click="dispSettings = false"> Close </v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
export default {
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
    enable_spilt: {
      required: true,
      type: Boolean,
    },
  },
  //   data() {
  //     return {
  //       eventsPerPage: 10,
  //     };
  //   },
  watch: {
    enable_pin(newValue: boolean) {
      this.$emit('enable-pin-function', newValue);
    },
  },
  methods: {
    addEventsPerPage(plusOne: boolean) {
      let numberEvents = this.events_per_page;
      if (plusOne) {
        if (numberEvents < 99) {
          numberEvents++;
        }
      } else {
        if (numberEvents > 1) {
          numberEvents--;
        }
      }
      this.$emit('events-per-page', numberEvents);
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

.sub-row {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}

.center-switch {
  display: flex;
  justify-content: center;
  margin-left: 1rem;
}
.pink-background {
  background-color: pink;
}
</style>
