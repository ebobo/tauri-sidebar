<template>
  <v-card class="info-card" color="primary">
    <v-row class="info-row">
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

    <v-row class="info-row">
      <v-col cols="1">
        <v-row justify="center"> <v-icon>mdi-console-line</v-icon></v-row>
      </v-col>
      <v-col>
        <v-row justify="center">
          <p class="ml-1 text-subtitle-2">{{ debug_message }}</p>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
export default {
  props: {
    width: {
      required: false,
      type: Number,
      default: 0,
    },
    height: {
      required: false,
      type: Number,
      default: 0,
    },
    screen_width: {
      required: false,
      type: Number,
      default: 0,
    },
    screen_height: {
      required: false,
      type: Number,
      default: 0,
    },
    bar_ratio: {
      required: false,
      type: Number,
      default: 0,
    },
    debug_message: {
      required: false,
      type: String,
      default: '',
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

<style lang="scss" scoped>
.info-card {
  padding-top: 20px;
  padding-right: 15px;
  padding-left: 15px;
  border-radius: 0;
}

.info-row {
  margin-bottom: 20px;
}
</style>
