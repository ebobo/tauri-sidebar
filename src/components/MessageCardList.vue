<template>
  <v-list class="card-list">
    <message-card
      v-for="m in messages"
      :key="m.UnitId"
      :message="m"
      @pin-event="$emit('pin-event', m)"
      @select-event="$emit('select-event', m.Tag)"
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
  methods: {
    emitPin(m: Message) {
      this.$emit('pin-event', m);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-list {
  overflow: auto;
  padding: 0;
}
</style>
