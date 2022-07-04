<template>
  <v-card flat>
    <v-row>
      <v-col xs="12">
        <v-label>{{ barRatio }}</v-label>
      </v-col>
      <v-col xs="12">
        <v-label>{{ appWidth }}</v-label></v-col
      >
      <v-col xs="12">
        <v-label>{{ appHeight }}</v-label></v-col
      >
      <v-col xs="12">
        <v-label>{{ screenWidth }}</v-label></v-col
      >
      <v-col xs="12">
        <v-label>{{ screenHeight }}</v-label></v-col
      >
    </v-row>
  </v-card>
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
