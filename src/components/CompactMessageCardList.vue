<template>
  <v-list class="card-list">
    <compact-message-card
      v-for="m in messages"
      :key="m.UnitId"
      :message="m"
      @pin-event="$emit('pin-event', m)"
      @select-event="$emit('select-event', m.Tag)"
    ></compact-message-card>
  </v-list>
</template>

<script lang="ts">
import CompactMessageCard from './CompactMessageCard.vue';
import { Message } from '../data/test';
export default {
  components: {
    CompactMessageCard,
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
