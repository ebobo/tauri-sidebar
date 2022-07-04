<template>
  <v-card :theme="theme">
    <top-widget @change-theme="changeTheme" @change-size="$emit('fold')" />
    <buttons-widget />
    <message-card-list height="300px" :messages="messages" />
    <info-widget />
    <screen-info-widget
      :bar_ratio="bar_ratio"
      :screen_width="screen_width"
      :screen_height="screen_height"
      :width="width"
      :height="height"
    />
  </v-card>
</template>

<script lang="ts">
import MessageCardList from './MessageCardList.vue';
import { Message } from '../data/test';
import InfoWidget from './InfoWidget.vue';
import TopWidget from './TopWidget.vue';
import ScreenInfoWidget from './ScreenInfoWidget.vue';
import ButtonsWidget from './ButtonsWidget.vue';

export default {
  components: {
    MessageCardList,
    InfoWidget,
    TopWidget,
    ScreenInfoWidget,
    ButtonsWidget,
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
        console.log(this.height);
      } else {
        this.theme = 'dark';
      }
    },
  },
};
</script>
