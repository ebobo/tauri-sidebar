<template>
  <v-card :theme="theme">
    <v-toolbar color="rgba(0,0,0,0)" flat>
      <v-toolbar-title>AM4</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-label>{{ bar_ratio.toFixed(2) }}</v-label>
      <v-btn rounded small @click="changeTheme()"> theme </v-btn>
    </v-toolbar>
    <message-card
      v-for="m in messages"
      :key="m.UnitId"
      :message="m"
    ></message-card>
  </v-card>
</template>

<script lang="ts">
import MessageCard from './MessageCard.vue';
import { Message } from '@/data/test';

export default {
  components: {
    MessageCard,
  },
  props: {
    width: {
      required: true,
      type: Number,
      default: 0,
    },
    height: {
      required: true,
      type: Number,
      default: 0,
    },
    screen_width: {
      required: true,
      type: Number,
      default: 0,
    },
    screen_height: {
      required: true,
      type: Number,
      default: 0,
    },
    bar_ratio: {
      required: true,
      type: Number,
      default: 0,
    },
    messages: {
      required: false,
      type: Array as () => Message[],
      default: [],
    },
  },
  data() {
    return {
      theme: 'light',
    };
  },

  methods: {
    changeTheme() {
      if (this.theme === 'dark') {
        this.theme = 'light';
      } else {
        this.theme = 'dark';
      }
    },
  },
};
</script>
