<template>
  <div>
    <v-card :theme="main_theme" class="card">
      <top-widget
        :main_theme="main_theme"
        @change-theme="$emit('change-theme')"
        @change-size="$emit('fold')"
        @change-settings="showSettings"
        @screen-info="showScreenInfo"
      />
      <buttons-widget />
      <message-pin-list
        v-if="enablePin && pinedEventsList.length > 0"
        :pinedMessages="pinedEventsList"
        @unpin-event="unpinMessage"
      />
      <message-list
        class="list"
        :list_messages="messages"
        :event_per_page="enableSplit ? eventPerWindow : eventPerPage"
        :pined_messages="pinedEventsList"
        @pin-event="pinMessage"
      />
      <message-list
        v-if="enableSplit"
        class="list"
        :list_messages="messages"
        :event_per_page="eventPerWindow"
        :pined_messages="pinedEventsList"
        @pin-event="pinMessage"
      />
      <screen-info-widget
        v-if="dispScreenInfo"
        class="info-widget"
        :bar_ratio="bar_ratio"
        :screen_width="screen_width"
        :screen_height="screen_height"
        :width="width"
        :height="height"
      />
      <bottom-info class="bottom-widget" />
    </v-card>

    <v-overlay v-model="showOverlay" z-index="2"> </v-overlay>
    <setting-widget
      v-if="dispSettings"
      :theme="main_theme"
      :events_per_page="eventPerPage"
      :events_per_window="eventPerWindow"
      :enable_pin="enablePin"
      :enable_split="enableSplit"
      @close-settings="dispSettings = false"
      @events-per-page="setEventsPerPage"
      @events-per-window="setEventsPerWindow"
      @enable-pin-function="enablePinMessage"
      @enable-split-window="enableSplitWindow"
    />
  </div>
</template>

<script lang="ts">
import MessageCardList from './MessageCardList.vue';
import MessagePinList from './MessagePinList.vue';
import MessageList from './MessageList.vue';
import { Message } from '../data/test';
import TopWidget from './TopWidget.vue';
import ScreenInfoWidget from './ScreenInfoWidget.vue';
import ButtonsWidget from './ButtonsWidget.vue';
import BottomInfo from './BottomInfo.vue';
import SettingWidget from './SettingWidget.vue';
import ChipWidget from './ChipWidget.vue';

export default {
  emits: ['change-theme', 'fold'],
  components: {
    MessageCardList,
    MessagePinList,
    MessageList,
    TopWidget,
    ScreenInfoWidget,
    ButtonsWidget,
    BottomInfo,
    SettingWidget,
    ChipWidget,
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
  data(): {
    dispScreenInfo: boolean;
    dispSettings: boolean;
    eventPerPage: number;
    eventPerWindow: number;
    filtedEventTypes: string[];
    pinedEventsList: Message[];
    enablePin: boolean;
    enableSplit: boolean;
  } {
    return {
      dispScreenInfo: false,
      dispSettings: false,
      eventPerPage: 10,
      eventPerWindow: 5,
      filtedEventTypes: [],
      pinedEventsList: [],
      enablePin: false,
      enableSplit: false,
    };
  },
  computed: {
    showOverlay(): boolean {
      return this.dispSettings;
    },
  },
  methods: {
    unpinedMessages(): Message[] {
      return this.messages.filter(
        (m: Message) => !this.pinedEventsList.includes(m)
      );
    },
    showScreenInfo() {
      this.dispScreenInfo = !this.dispScreenInfo;
    },
    showSettings() {
      this.dispSettings = !this.dispSettings;
    },
    setEventsPerPage(num: number) {
      if (num > 0) {
        this.eventPerPage = num;
      }
    },
    setEventsPerWindow(num: number) {
      if (num > 0) {
        this.eventPerWindow = num;
      }
    },
    enablePinMessage(enable: boolean) {
      if (this.enablePin != enable) {
        this.enablePin = enable;
        if (!enable) {
          this.pinedEventsList = [];
        }
      }
    },
    pinMessage(m: Message) {
      if (!this.enablePin) {
        return;
      }
      const index = this.pinedEventsList.findIndex(
        (event: Message) => event === m
      );
      if (index === -1) {
        //add pined info for one event message
        this.pinedEventsList.push(m);
      }
      this.setEventsPerPage(this.eventPerPage - 1);
    },
    unpinMessage(m: Message) {
      const index = this.pinedEventsList.findIndex(
        (event: Message) => event === m
      );
      if (index > -1) {
        this.pinedEventsList.splice(index, 1);
      }
      this.setEventsPerPage(this.eventPerPage + 1);
    },

    enableSplitWindow(enable: boolean) {
      if (this.enableSplit != enable) {
        this.enableSplit = enable;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bar-area {
  background-color: #0f409b;
}

.card {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.list {
  flex: 1 1 100px;
}

.bottom-widget {
  flex: 0 1 55px;
}

.info-widget {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 55px;
}
</style>
