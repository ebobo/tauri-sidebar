<template>
  <div>
    <v-row align="center" class="mt-0 mb-0">
      <v-chip size="small" class="ml-6">{{ total_events }}</v-chip>
      <v-chip
        size="small"
        :append-icon="
          ascendingSort ? 'mdi-sort-bool-ascending' : 'mdi-sort-bool-descending'
        "
        class="ml-1"
        @click="changeSorting"
        >Sort</v-chip
      >
      <v-spacer />
      <v-chip-group class="mr-3" v-model="messageFilter" column multiple>
        <v-chip
          size="small"
          color="red-darken-2"
          filter
          outlined
          @group:selected="filterChanged($event, 'Alarm')"
          >Alarm</v-chip
        >
        <v-chip
          size="small"
          color="yellow-darken-3"
          filter
          outlined
          @group:selected="filterChanged($event, 'Fault')"
          >Fault</v-chip
        >
        <v-chip
          size="small"
          color="gray-darken-4"
          filter
          outlined
          @group:selected="filterChanged($event, 'Unknow')"
          >Unknown</v-chip
        >
        <!-- <v-chip
          size="small"
          color="green-darken-4"
          filter
          outlined
          @group:selected="filterChanged($event, 'Acked')"
          >Acked</v-chip
        > -->
      </v-chip-group>
    </v-row>
  </div>
</template>

<script lang="ts">
export default {
  emits: ['event-filter-change', 'event-sorting-change'],
  data() {
    return {
      messageFilter: [0, 1, 2],
      ascendingSort: true,
    };
  },
  props: {
    total_events: {
      required: true,
      type: Number,
      default: 0,
    },
  },
  methods: {
    filterChanged(e: any, name: string) {
      this.$emit('event-filter-change', name, e.value);
    },
    changeSorting() {
      this.ascendingSort = !this.ascendingSort;
      this.$emit('event-sorting-change', this.ascendingSort);
    },
  },
};
</script>

<style lang="scss" scoped>
.chip-bar {
  background-color: #eeeeee;
}
</style>
