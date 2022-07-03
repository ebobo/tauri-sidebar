<template>
  <v-card :theme="theme">
    <top-window @change-theme="changeTheme" />
    <message-card-list height="300px" :messages="messages" />
    <info-window />
  </v-card>
</template>

<script lang="ts">
import MessageCardList from './MessageCardList.vue';
import { Message } from '@/data/test';
import InfoWindow from './InfoWindow.vue';
import TopWindow from './TopWindow.vue';

export default {
  components: {
    MessageCardList,
    InfoWindow,
    TopWindow,
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
