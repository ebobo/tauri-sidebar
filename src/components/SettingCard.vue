<template>
  <v-container>
    <div class="d-flex justify-space-around align-center">
      <v-label>Sort</v-label>
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
      <v-row align="center" class="mt-0 mb-0">
        <v-chip size="small" class="ml-6">{{ total_events }}</v-chip>
        <v-chip
          size="small"
          append-icon="mdi-sort-alphabetical-descending"
          class="ml-1"
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
  </v-container>
</template>

<style lang="scss" scoped>
.main {
  margin: 0;
  padding: 0;
  background-color: #424a48;
}

.pink-background {
  background-color: #cd7cdd;
}
</style>
