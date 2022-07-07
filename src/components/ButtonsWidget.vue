<template>
  <div class="mt-1 d-flex justify-space-around align-center">
    <v-btn text flat rounded="pill"> Operate </v-btn>
    <v-btn text flat rounded="pill"> Reset </v-btn>
    <v-btn text flat rounded="pill"> Ack-All </v-btn>
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
    <v-row justify="end">
      <v-col cols="12">
        <v-text-field
          v-if="search"
          class="mr-8 ml-10 mb-1"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          variant="underlined"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-0 mb-0">
      <v-chip class="mt-1 ml-6">78</v-chip>
      <v-chip
        size="small"
        append-icon="mdi-sort-alphabetical-descending"
        class="mt-2 ml-4"
        >Filter</v-chip
      >
      <v-spacer />
      <v-chip-group class="mr-3" v-model="messageFilter" column multiple>
        <v-chip size="small" color="red-darken-2" filter outlined>Alarm</v-chip>
        <v-chip size="small" color="yellow-darken-3" filter outlined
          >Fault</v-chip
        >
        <v-chip size="small" color="green-darken-3" filter outlined
          >Acknowledged</v-chip
        >
      </v-chip-group>
    </v-row>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      search: false,
    };
  },
  methods: {
    openSearch() {
      this.search = !this.search;
    },
  },
};
</script>
