<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>AM4</v-toolbar-title>
    </v-toolbar>
    <v-btn height="50">
      <v-icon>mdi-home-floor-a</v-icon>
    </v-btn>
    <v-btn height="50">
      <v-icon>mdi-file-document-edit-outline</v-icon>
    </v-btn>
    <v-btn height="50">
      <v-icon>mdi-file-tree</v-icon>
    </v-btn>
    <v-btn height="50">
      <v-icon>mdi-altimeter</v-icon>
    </v-btn>
  </v-card>
  <screen-info-widget
    :bar_ratio="bar_ratio"
    :screen_width="screen_width"
    :screen_height="screen_height"
    :width="width"
    :height="height"
  />
</template>

<script lang="ts">
import ScreenInfoWidget from './ScreenInfoWidget.vue';
export default {
  components: {
    ScreenInfoWidget,
  },
  props: {
    bar_ratio: {
      required: true,
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      theme: 'light',
    };
  },

  methods: {
    changeTheme() {
      if (this.theme === 'dark') {
        this.theme = 'light';
      } else {
        this.theme = 'dark';
      }
    },
  },
};
</script>
