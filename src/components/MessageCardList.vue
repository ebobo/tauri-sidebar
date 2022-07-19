<template>
  <v-list class="card-list">
    <message-card
      v-for="m in messages"
      :key="m.UnitId"
      :message="m"
    ></message-card>
  </v-list>
</template>

<script lang="ts">
import MessageCard from './MessageCard.vue';
import { Message } from '../data/test';
export default {
  components: {
    MessageCard,
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

<style lang="scss" scoped>
.card-list {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
