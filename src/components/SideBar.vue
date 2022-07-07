<template>
  <v-card :theme="theme">
    <top-widget @change-theme="changeTheme" @change-size="$emit('fold')" />
    <buttons-widget />
    <message-card-list height="75vh" :messages="messages" />

    <!-- <screen-info-widget
      :bar_ratio="bar_ratio"
      :screen_width="screen_width"
      :screen_height="screen_height"
      :width="width"
      :height="height"
    /> -->

    <bottom-info class="bottom-widget" />
  </v-card>
</template>

<script lang="ts">
import MessageCardList from './MessageCardList.vue';
import MessageBannerList from './MessageBannerList.vue';
import { Message } from '../data/test';
import InfoWidget from './InfoWidget.vue';
import TopWidget from './TopWidget.vue';
import ScreenInfoWidget from './ScreenInfoWidget.vue';
import ButtonsWidget from './ButtonsWidget.vue';
import BottomInfo from './BottomInfo.vue';

export default {
  components: {
    MessageCardList,
    MessageBannerList,
    InfoWidget,
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

<style lang="scss" scoped>
.bar-area {
  background-color: #0f409b;
}

.bottom-widget {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}

.info-widget {
  position: absolute;
  right: 0;
  left: 0;
}
</style>
