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
      <buttons-widget
        @search-item="setSearchKeyword"
        @reset="resetCommand"
        @acknowledge="acknowledgeCommand"
      />
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
        :compact_card="enableSplit"
        :search_keyword="searchKeyword"
        @pin-event="pinMessage"
        @select-event="selectMessage"
        @debug-message="setDebugMessage"
      />
      <message-list
        v-if="enableSplit"
        class="list"
        :list_messages="messages"
        :event_per_page="eventPerWindow"
        :pined_messages="pinedEventsList"
        :compact_card="enableSplit"
        :search_keyword="searchKeyword"
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
        :debug_message="debugMessage"
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
      :enable_auto_pin="enableAutoPin"
      :enable_split="enableSplit"
      :auto_pin_alarm="autoPinAlarm"
      :message_sorting="messageSorting"
      :server_address="sse_server_address"
      @close-settings="dispSettings = false"
      @events-per-page="setEventsPerPage"
      @events-per-window="setEventsPerWindow"
      @enable-pin-function="enablePinMessage"
      @enable-auto-pin="enableAutoPinMessage"
      @enable-split-window="enableSplitWindow"
      @enable-auto-pin-alarm="enableAutoPinAlarm"
      @sse-server-address="setSseServerAddress"
    />
  </div>
</template>

<script lang="ts">
import MessageCardList from './MessageCardList.vue';
import MessagePinList from './MessagePinList.vue';
import MessageList from './MessageList.vue';
import { Message, State } from '../data/test';
import TopWidget from './TopWidget.vue';
import ScreenInfoWidget from './ScreenInfoWidget.vue';
import ButtonsWidget from './ButtonsWidget.vue';
import BottomInfo from './BottomInfo.vue';
import SettingWidget from './SettingWidget.vue';
import ChipWidget from './ChipWidget.vue';
import {
  eventSelect,
  sendCommand,
  commandRequest,
  eventSelectedRequest,
  commandResponse,
} from '../service/rest';

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
    sse_server_address: {
      required: false,
      type: String,
      default: '',
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
    enableAutoPin: boolean;
    AutoPinAlarm: boolean;
    enableSplit: boolean;
    messageSorting: string;
    debugMessage: string;
    searchKeyword: string;
  } {
    return {
      dispScreenInfo: false,
      dispSettings: false,
      eventPerPage: 10,
      eventPerWindow: 8,
      filtedEventTypes: [],
      pinedEventsList: [],
      enablePin: false,
      enableAutoPin: false,
      AutoPinAlarm: false,
      enableSplit: false,
      messageSorting: 'timestamp',
      debugMessage: '',
      searchKeyword: '',
    };
  },
  watch: {
    messages(newList: Message[]) {
      //incoming event list is empty
      if (newList.length < 1) {
        this.pinedEventsList = [];
        return;
      }
      // pined event list not empty
      if (this.pinedEventsList.length > 0) {
        const removeList: Message[] = [];
        this.pinedEventsList.forEach((m: Message, i: number) => {
          if (m.AutoPined) {
            removeList.push(m);
          } else {
            const index = newList.findIndex(
              (event: Message) => event.Key === m.Key
            );
            // can not find this message in new message list add to remove list
            if (index === -1) {
              removeList.push(m);
            }
          }
        });
        removeList.forEach((m) => {
          this.unpinMessage(m);
        });
        //Auto pin enabled
        if (this.enableAutoPin) {
          if (this.autoPinAlarm) {
            newList = newList.filter((m: Message) => m.Type === State.Alarm);
          }
          if (newList.length > 1) {
            newList[newList.length - 1].AutoPined = true;
            this.pinedEventsList.unshift(newList[newList.length - 1]);
          }
          newList[0].AutoPined = true;
          this.pinedEventsList.unshift(newList[0]);
        }
      }
    },
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
          this.enableAutoPin = false;
        }
      }
    },

    enableAutoPinAlarm(enable: boolean) {
      if (this.autoPinAlarm != enable) {
        this.autoPinAlarm = enable;

        this.pinedEventsList.forEach((m: Message) => (m.AutoPined = false));
        this.pinedEventsList = [];

        if (this.messages.length > 0) {
          let filteredMessages = this.messages;
          if (this.autoPinAlarm) {
            filteredMessages = this.messages.filter(
              (m: Message) => m.Type === State.Alarm
            );
          }
          if (filteredMessages.length > 1) {
            const mes = filteredMessages[filteredMessages.length - 1];
            const index = this.pinedEventsList.findIndex(
              (event: Message) => event === mes
            );
            mes.AutoPined = true;
            if (index === -1) {
              this.pinedEventsList.unshift(mes);
            }
          }
          const mes = filteredMessages[0];
          const index = this.pinedEventsList.findIndex(
            (event: Message) => event === mes
          );
          mes.AutoPined = true;
          if (index === -1) {
            this.pinedEventsList.unshift(mes);
          }
        }
      }
    },

    enableAutoPinMessage(enable: boolean) {
      if (this.enableAutoPin != enable) {
        this.enableAutoPin = enable;
        if (!enable) {
          this.pinedEventsList = this.pinedEventsList.filter(
            (m: Message) => !m.AutoPined
          );
        } else if (enable && this.messages.length > 0) {
          let filteredMessages = this.messages;
          if (this.autoPinAlarm) {
            filteredMessages = this.messages.filter(
              (m: Message) => m.Type === State.Alarm
            );
          }
          if (filteredMessages.length > 1) {
            const mes = filteredMessages[filteredMessages.length - 1];
            const index = this.pinedEventsList.findIndex(
              (event: Message) => event === mes
            );
            mes.AutoPined = true;
            if (index === -1) {
              this.pinedEventsList.unshift(mes);
            }
          }
          const mes = filteredMessages[0];
          const index = this.pinedEventsList.findIndex(
            (event: Message) => event === mes
          );
          mes.AutoPined = true;
          if (index === -1) {
            this.pinedEventsList.unshift(mes);
          }
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
        m.AutoPined = false;
        this.pinedEventsList.splice(index, 1);
      }
      this.setEventsPerPage(this.eventPerPage + 1);
    },

    enableSplitWindow(enable: boolean) {
      if (this.enableSplit != enable) {
        this.enableSplit = enable;
      }
    },

    setDebugMessage(m: string) {
      if (this.debugMessage != m) {
        this.debugMessage = m;
      }
    },

    setSearchKeyword(m: string) {
      if (this.searchKeyword != m) {
        this.searchKeyword = m;
      }
    },

    setSseServerAddress(add: string) {
      this.$emit('change-server-address', add);
    },

    selectMessage(tag: string) {
      const data: eventSelectedRequest = {
        tag,
      };
      eventSelect(data, this.sse_server_address)
        .then()
        .catch(() => {
          console.log('error on select');
        });
    },

    resetCommand() {
      const data: commandRequest = {
        type: 'reset',
      };
      sendCommand(data, this.sse_server_address)
        .then((response: commandResponse) =>
          console.log('response from server: ' + JSON.stringify(response))
        )
        .catch(() => {
          console.log('error on reset');
        });
    },

    acknowledgeCommand() {
      const data: commandRequest = {
        type: 'acknowledge',
      };
      sendCommand(data, this.sse_server_address)
        .then((response: commandResponse) =>
          console.log('response from server: ' + JSON.stringify(response))
        )
        .catch(() => {
          console.log('error on acknowledge');
        });
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
  height: 80px;
}
</style>
