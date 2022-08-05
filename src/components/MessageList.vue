<template>
  <div class="main">
    <chip-widget
      :total_events="totalEvents"
      @event-filter-change="setFiltedEventTypes"
    />
    <message-card-list
      v-if="!compact_card"
      class="list"
      :messages="messagesOnPage"
      @pin-event="pinEvent"
    />
    <compact-message-card-list
      v-if="compact_card"
      class="list"
      :messages="messagesOnPage"
      @pin-event="pinEvent"
    />
    <v-pagination
      class="pagi"
      v-model="pagi.page"
      :length="totalPages"
      size="small"
      rounded="circle"
      :total-visible="pagi.visible"
    ></v-pagination>
  </div>
</template>

<script lang="ts">
import MessageCardList from './MessageCardList.vue';
import CompactMessageCardList from './CompactMessageCardList.vue';
import ChipWidget from './ChipWidget.vue';
import { Message } from '../data/test';

interface pagination {
  page: number;
  visible: number;
}

export default {
  components: {
    MessageCardList,
    CompactMessageCardList,
    ChipWidget,
  },
  props: {
    list_messages: {
      required: false,
      type: Array as () => Message[],
      default: [],
    },
    pined_messages: {
      required: false,
      type: Array as () => Message[],
      default: [],
    },
    event_per_page: {
      required: false,
      type: Number,
      default: 10,
    },
    compact_card: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data(): {
    pagi: pagination;
    filtedEventTypes: string[];
  } {
    return {
      pagi: {
        page: 1,
        visible: 4,
      },
      filtedEventTypes: [],
    };
  },
  computed: {
    displayMessages(): Message[] {
      return this.list_messages.filter(
        (m: Message) =>
          !this.filtedEventTypes.includes(m.Type) &&
          !this.pined_messages.includes(m)
      );
    },
    messagesOnPage(): Message[] {
      return this.displayMessages.slice(
        (this.pagi.page - 1) * this.event_per_page,
        this.pagi.page * this.event_per_page
      );
    },
    totalEvents(): number {
      return this.displayMessages.length;
    },
    totalPages(): number {
      if (this.displayMessages.length > 0) {
        return Math.ceil(this.displayMessages.length / this.event_per_page);
      }
      return 0;
    },
  },
  methods: {
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

    pinEvent(m: Message) {
      this.$emit('pin-event', m);
    },
  },
};
</script>

<style lang="scss" scoped>
.bar-area {
  background-color: #0f409b;
}

.main {
  display: flex;
  flex-flow: column;
}

.list {
  flex: 1 1 100px;
  // background-color: pink;
}

.pagi {
  flex: 0 1 50px;
}
</style>
