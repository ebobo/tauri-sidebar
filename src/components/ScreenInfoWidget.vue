<template>
  <v-toolbar color="primary">
    <v-row align="center">
      <v-col cols="1">
        <v-row justify="center"> <v-icon>mdi-monitor-screenshot</v-icon></v-row>
      </v-col>
      <v-col>
        <v-row justify="center">
          <p class="ml-1 text-subtitle-2">{{ barRatio }}</p></v-row
        >
      </v-col>
      <v-col>
        <v-row justify="center">
          <p class="ml-1 text-subtitle-2">{{ screenWidth }}</p>
        </v-row>
      </v-col>
      <v-col>
        <v-row justify="center">
          <p class="ml-1 text-subtitle-2">{{ screenHeight }}</p>
        </v-row>
      </v-col>
      <v-col>
        <v-row justify="center">
          <p class="ml-1 text-subtitle-2">{{ appWidth }}</p>
        </v-row>
      </v-col>
      <v-col>
        <v-row justify="center">
          <p class="ml-1 text-subtitle-2">{{ appHeight }}</p>
        </v-row>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script lang="ts">
export default {
  props: {
    width: {
      required: true,
      type: Number,
      default: 0,
    },
    height: {
      required: true,
      type: Number,
      default: 0,
    },
    screen_width: {
      required: true,
      type: Number,
      default: 0,
    },
    screen_height: {
      required: true,
      type: Number,
      default: 0,
    },
    bar_ratio: {
      required: true,
      type: Number,
      default: 0,
    },
  },

  computed: {
    barRatio(): string {
      return 'R: ' + this.bar_ratio.toFixed(1);
    },
    screenWidth(): string {
      return 'SW: ' + this.screen_width;
    },
    screenHeight(): string {
      return 'SH: ' + this.screen_height;
    },
    appWidth(): string {
      return 'W: ' + this.width;
    },
    appHeight(): string {
      return 'H: ' + this.height;
    },
  },
};
</script>
