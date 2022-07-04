<template>
  <v-toolbar>
    <img
      alt="Autronica Logo"
      class="shrink mr-2"
      contain
      src="../assets/autronica_logo.png"
      transition="scale-transition"
      width="50"
    />
    <v-spacer></v-spacer>
    <v-label></v-label>
    <!-- <v-btn icon @click="changeSize">
      <v-icon>mdi-resize</v-icon>
    </v-btn> -->
    <v-btn icon @click="changeTheme">
      <v-icon>mdi-brightness-4</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
export default {
  methods: {
    changeTheme() {
      this.$emit('change-theme');
    },
    changeSize() {
      this.$emit('change-size');
    },
  },
};
</script>
