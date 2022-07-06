<template>
  <v-list>
    <message-banner
      v-for="m in messages"
      :key="m.UnitId"
      :message="m"
    ></message-banner>
  </v-list>
</template>

<script lang="ts">
import MessageBanner from './MessageBanner.vue';
import { Message } from '../data/test';
export default {
  components: {
    MessageBanner,
  },
  props: {
    messages: {
      required: false,
      type: Array as () => Message[],
      default: [],
    },
  },
};
</script>
