<template>
  <v-toolbar>
    <img
      alt="Autronica Logo"
      class="shrink mr-2"
      contain
      :src="mainIconPath"
      transition="scale-transition"
      width="50"
    />
    <v-spacer></v-spacer>
    <v-btn icon @click="showScreenInfo">
      <v-icon size="xsmall">mdi-monitor-screenshot</v-icon>
    </v-btn>
    <v-btn icon @click="changeSize">
      <v-icon>mdi-resize</v-icon>
    </v-btn>
    <v-btn icon @click="changeSettings">
      <v-icon>mdi-cog-outline</v-icon>
    </v-btn>
    <v-btn icon @click="changeTheme">
      <v-icon>mdi-brightness-4</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import logo from `../assets/autronica_logo.png`
import darkLogo from `../assets/autronica_logo_dark.png`

export default {
  emits: ['change-theme', 'change-size', 'change-settings', 'screen-info'],
  props: {
    main_theme: {
      required: true,
      type: String,
      default: 'light',
    },
  },
  computed: {
    mainIconPath() {
      if (this.main_theme === 'dark') {
        return logo;
      }
      return darkLogo;
    },
  },
  methods: {
    changeTheme() {
      this.$emit('change-theme');
    },
    changeSize() {
      this.$emit('change-size');
    },
    changeSettings() {
      this.$emit('change-settings');
    },
    showScreenInfo() {
      this.$emit('screen-info');
    },
  },
};
</script>
