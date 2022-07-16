<template>
  <v-card :theme="main_theme">
    <top-widget
      :main_theme="main_theme"
      @change-theme="$emit('change-theme')"
      @change-size="$emit('fold')"
    />
    <buttons-widget />
    <message-card-list height="75vh" :messages="messages" />
    <v-pagination v-model="page" :length="4" rounded="circle"></v-pagination>
    <screen-info-widget
      class="info-widget"
      :bar_ratio="bar_ratio"
      :screen_width="screen_width"
      :screen_height="screen_height"
      :width="width"
      :height="height"
    />
    <bottom-info class="bottom-widget" />
  </v-card>
</template>

<script lang="ts">
import MessageCardList from './MessageCardList.vue';
import MessageBannerList from './MessageBannerList.vue';
import { Message } from '../data/test';
import TopWidget from './TopWidget.vue';
import ScreenInfoWidget from './ScreenInfoWidget.vue';
import ButtonsWidget from './ButtonsWidget.vue';
import BottomInfo from './BottomInfo.vue';

export default {
  components: {
    MessageCardList,
    MessageBannerList,
    TopWidget,
    ScreenInfoWidget,
    ButtonsWidget,
    BottomInfo,
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
    main_theme: {
      required: true,
      type: String,
      default: 'light',
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.bar-area {
  background-color: #0f409b;
}

.bottom-widget {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}

.info-widget {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 55px;
}
</style>
