<template>
  <v-card class="setting-widget" :theme="main_theme">
    <v-toolbar flat class="topbar">
      <v-toolbar-title class="title">Settings</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="$emit('close-settings')">
        <v-icon size="small">mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-label class="subtitle">Events per page</v-label>

    <v-row class="sub-row" justify="center">
      <v-btn
        size="small"
        variant="text"
        icon="mdi-minus"
        @click="addEventsPerPage(false)"
      ></v-btn>
      <v-label class="num-disp">{{ events_per_page }}</v-label>
      <v-btn
        size="small"
        variant="text"
        icon="mdi-plus"
        @click="addEventsPerPage(true)"
      ></v-btn>
    </v-row>

    <v-divider></v-divider>

    <v-label class="subtitle">Sorting</v-label>
    <v-card-actions>
      <!-- <v-btn color="primary" text @click="dispSettings = false"> Close </v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
export default {
  props: {
    main_theme: {
      required: false,
      type: String,
      default: 'light',
    },
    events_per_page: {
      required: true,
      type: Number,
    },
  },
  //   data() {
  //     return {
  //       eventsPerPage: 10,
  //     };
  //   },

  methods: {
    addEventsPerPage(plusOne: boolean) {
      let numberEvents = this.events_per_page;
      if (plusOne) {
        if (numberEvents < 99) {
          numberEvents++;
        }
      } else {
        if (numberEvents > 1) {
          numberEvents--;
        }
      }
      this.$emit('events-per-page', numberEvents);
    },
  },
};
</script>

<style lang="scss" scoped>
.setting-widget {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 250px;
}
.title {
  font-size: large;
}

.subtitle {
  font-size: medium;
  font-weight: bold;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
}

.topbar {
  background-color: #82b1ff;
}

.num-disp {
  font-size: x-large;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.sub-row {
  margin-bottom: 0.5rem;
}
</style>
