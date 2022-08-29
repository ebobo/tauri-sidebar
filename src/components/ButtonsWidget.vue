<template>
  <div class="mt-1 d-flex justify-space-around align-center">
    <v-btn text flat rounded="pill"> Operate </v-btn>
    <v-btn text flat rounded="pill" @click="sendReset"> Reset </v-btn>
    <v-btn text flat rounded="pill" @click="sendAcknowledge"> Ack-All </v-btn>
    <v-btn
      text
      size="small"
      color="grey-lighten-2"
      flat
      rounded="pill"
      @click="openSearch"
    >
      Search
    </v-btn>
  </div>
  <div>
    <v-text-field
      v-if="search"
      class="mr-8 ml-10 mb-1"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      v-model="searchItem"
      variant="underlined"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      search: false,
      searchItem: '',
    };
  },
  methods: {
    openSearch() {
      this.searchItem = '';
      this.search = !this.search;
    },
    sendReset() {
      this.$emit('reset');
    },
    sendAcknowledge() {
      this.$emit('acknowledge');
    },
  },
  watch: {
    searchItem() {
      this.$emit('search-item', this.searchItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.cyan-background {
  background-color: #5db4a1;
}

.pink-background {
  background-color: #cd7cdd;
}
</style>
