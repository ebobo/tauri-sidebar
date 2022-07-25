<template>
  <v-list class="pined-list">
    <message-card
      v-for="m in pinedMessages"
      :key="m.UnitId"
      :message="m"
      :pined="true"
      @pin-event="$emit('unpin-event', m)"
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
    pinedMessages: {
      required: false,
      type: Array as () => Message[],
      default: [],
    },
  },
};
</script>

<style lang="scss" scoped>
.pined-list {
  overflow: auto;
  padding: 0;
}
</style>
