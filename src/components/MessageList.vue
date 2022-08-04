<template>
  <div class="main">
    <chip-widget
      :total_events="totalEvents"
      @event-filter-change="setFiltedEventTypes"
    />
    <message-card-list class="list" :messages="messagesOnPage" />
    <v-pagination
      class="pagi"
      v-model="pagi.page"
      :length="totalPages"
      rounded="circle"
      :total-visible="pagi.visible"
    ></v-pagination>
  </div>
</template>

<script lang="ts">
import MessageCardList from './MessageCardList.vue';
import ChipWidget from './ChipWidget.vue';
import { Message } from '../data/test';

interface pagination {
  page: number;
  perPage: number;
  visible: number;
}

export default {
  components: {
    MessageCardList,
    ChipWidget,
  },
  props: {
    list_messages: {
      required: false,
      type: Array as () => Message[],
      default: [],
    },
  },
  data(): {
    pagi: pagination;
    filtedEventTypes: string[];
  } {
    return {
      pagi: {
        page: 1,
        perPage: 10,
        visible: 4,
      },
      filtedEventTypes: [],
    };
  },
  computed: {
    displayMessages(): Message[] {
      return this.list_messages.filter(
        (m: Message) => !this.filtedEventTypes.includes(m.Type)
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
    setEventsPerPage(num: number) {
      if (num > 0) {
        this.pagi.perPage = num;
      }
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
  height: 50%;
  background-color: aquamarine;
}

.list {
  flex: 1 1 100px;
  background-color: pink;
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
