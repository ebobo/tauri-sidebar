<template>
  <v-list class="card-list">
    <message-card
      v-for="m in messages"
      :key="m.UnitId"
      :message="m"
      @pin-event="$emit('pin-event', m)"
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
    emitPin(id: string, system: string) {
      this.$emit('pin-event', id, system);
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
