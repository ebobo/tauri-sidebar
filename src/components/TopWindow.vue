<template>
  <v-card color="grey lighten-4" flat height="55px">
    <v-toolbar>
      <v-toolbar-title>AM4</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-label></v-label>
      <v-btn icon @click="changeTheme">
        <v-icon>mdi-brightness-4</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script lang="ts">
export default {
  methods: {
    changeTheme() {
      this.$emit('change-theme');
    },
  },
};
</script>
