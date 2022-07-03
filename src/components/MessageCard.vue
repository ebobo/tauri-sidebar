<template>
  <v-banner lines="one" icon="mdi-alert-octagram-outline" color="error">
    <v-banner-text>
      {{ message.UnitId + ' ' + message.UnitClass }}
    </v-banner-text>
    <v-banner-actions>
      <v-btn>Ack</v-btn>
    </v-banner-actions>
  </v-banner>
</template>

<script lang="ts">
export default {
  props: {
    message: {
      required: false,
      type: Object,
      default: '',
    },
  },
  methods: {},
};
</script>
