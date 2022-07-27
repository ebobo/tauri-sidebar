<template>
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
    <chip-widget
      :total_events="totalEvents"
      @event-filter-change="setFiltedEventTypes"
    />
    <message-card-list
      class="list"
      :messages="messagesOnPage"
      @pin-event="pinMessage"
    />
    <v-pagination
      class="pagi"
      v-model="pagi.page"
      :length="totalPages"
      rounded="circle"
      :total-visible="pagi.visible"
    ></v-pagination>

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

  <v-overlay v-model="showOverlay" z-index="2" :close-on-content-click="false">
  </v-overlay>
  <setting-widget
    v-if="dispSettings"
    :theme="main_theme"
    :events_per_page="pagi.perPage"
    :enable_pin="enablePin"
    @close-settings="dispSettings = false"
    @events-per-page="setEventsPerPage"
    @enable-pin-function="enablePinMessage"
  />
</template>

<script lang="ts">
import MessageCardList from './MessageCardList.vue';
import MessagePinList from './MessagePinList.vue';
import { Message } from '../data/test';
import TopWidget from './TopWidget.vue';
import ScreenInfoWidget from './ScreenInfoWidget.vue';
import ButtonsWidget from './ButtonsWidget.vue';
import BottomInfo from './BottomInfo.vue';
import SettingWidget from './SettingWidget.vue';
import ChipWidget from './ChipWidget.vue';

interface pagination {
  page: number;
  perPage: number;
  visible: number;
}

export default {
  components: {
    MessageCardList,
    MessagePinList,
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
    pagi: pagination;
    filtedEventTypes: string[];
    pinedEventsList: Message[];
    enablePin: boolean;
  } {
    return {
      dispScreenInfo: false,
      dispSettings: false,
      pagi: {
        page: 1,
        perPage: 10,
        visible: 4,
      },
      filtedEventTypes: [],
      pinedEventsList: [],
      enablePin: false,
    };
  },
  computed: {
    displayMessages(): Message[] {
      return this.messages.filter(
        (m: Message) =>
          !this.filtedEventTypes.includes(m.Type) &&
          !this.pinedEventsList.includes(m)
      );
    },
    messagesOnPage(): Message[] {
      return this.displayMessages.slice(
        (this.pagi.page - 1) * this.pagi.perPage,
        this.pagi.page * this.pagi.perPage
      );
    },
    totalEvents(): number {
      return this.displayMessages.length;
    },
    totalPages(): number {
      if (this.displayMessages.length > 0) {
        return Math.ceil(this.displayMessages.length / this.pagi.perPage);
      }
      return 0;
    },
    showOverlay(): boolean {
      return this.dispSettings;
    },
  },
  methods: {
    showScreenInfo() {
      this.dispScreenInfo = !this.dispScreenInfo;
    },
    showSettings() {
      this.dispSettings = !this.dispSettings;
    },
    setFiltedEventTypes(type: string, value: boolean) {
      if (!value) {
        if (!this.filtedEventTypes.includes(type)) {
          this.filtedEventTypes.push(type);
        }
      } else {
        const index = this.filtedEventTypes.indexOf(type);
        if (index > -1) {
          this.filtedEventTypes.splice(index, 1);
        }
      }
    },
    setEventsPerPage(num: number) {
      if (num > 0) {
        this.pagi.perPage = num;
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
      this.setEventsPerPage(this.pagi.perPage - 1);
    },
    unpinMessage(m: Message) {
      const index = this.pinedEventsList.findIndex(
        (event: Message) => event === m
      );
      if (index > -1) {
        this.pinedEventsList.splice(index, 1);
      }
      this.setEventsPerPage(this.pagi.perPage + 1);
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

.pagi {
  flex: 0 1 50px;
}
</style>
