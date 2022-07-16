<template>
  <v-card class="main-area" flat :theme="main_theme">
    <v-row :style="IconStyle" align="center" justify="center">
      <img
        alt="Autronica Logo"
        class="shrink mt-2"
        contain
        :src="mainIconPath"
        transition="scale-transition"
        width="50"
      />
    </v-row>
    <v-row class="mt-4 mb-4" align="center" justify="center">
      <v-btn variant="flat" icon @click="changeTheme">
        <v-icon>mdi-brightness-4</v-icon>
      </v-btn>
    </v-row>
    <v-row class="mt-4 mb-4" align="center" justify="center">
      <v-btn variant="flat" icon @click="changeSize">
        <v-icon>mdi-resize</v-icon>
      </v-btn>
    </v-row>
    <v-row class="mt-5 mb-5" align="center" justify="center">
      <v-btn class="text-subtitle-2" variant="flat" icon>Operate</v-btn>
    </v-row>
    <v-row class="mt-5 mb-5" align="center" justify="center">
      <v-btn class="text-subtitle-2" icon flat>Reset</v-btn>
    </v-row>
    <v-row class="mt-5 mb-5" align="center" justify="center">
      <v-btn class="text-subtitle-2" icon flat>Ack</v-btn>
    </v-row>
    <div class="space"></div>
    <v-row class="mr-1 mt-10 mb-10" justify="center">
      <v-badge content="99+" color="red-darken-2">
        <v-icon size="x-large" color="red-darken-2">mdi-alert-octagram</v-icon>
      </v-badge>
    </v-row>
    <v-row class="mr-1 mt-10 mb-10" justify="center">
      <v-badge content="10" color="yellow-darken-3">
        <v-icon size="x-large" color="yellow-darken-3">mdi-alert</v-icon>
      </v-badge>
    </v-row>
    <v-row class="mr-1 mt-10 mb-10" justify="center">
      <v-badge content="1" color="grey-darken-2">
        <v-icon size="x-large" color="grey-darken-2"
          >mdi-help-circle-outline</v-icon
        ></v-badge
      >
    </v-row>
    <v-row class="mr-1 mt-10 mb-10" justify="center">
      <v-badge content="45" color="green-darken-3">
        <v-icon size="x-large" color="green-darken-3"
          >mdi-account-check-outline</v-icon
        ></v-badge
      >
    </v-row>
    <div class="space"></div>

    <v-col>
      <v-row justify="center" class="mt-0">
        <v-icon>mdi-latitude</v-icon>
      </v-row>
      <v-row justify="center">
        <v-label class="mt-2 text-subtitle-2">63.43°N</v-label>
      </v-row></v-col
    >

    <v-col>
      <v-row justify="center" class="mt-0">
        <v-icon>mdi-longitude</v-icon>
      </v-row>
      <v-row justify="center">
        <v-label class="mt-2 text-subtitle-2">10.39°E</v-label>
      </v-row></v-col
    >

    <v-col>
      <v-row justify="center" class="mt-0">
        <v-icon>mdi-ship-wheel</v-icon>
      </v-row>
      <v-row justify="center">
        <v-label class="mt-2 text-subtitle-2">-85°</v-label>
      </v-row></v-col
    >

    <v-col>
      <v-row justify="center" class="mt-0">
        <v-icon>mdi-speedometer</v-icon>
      </v-row>
      <v-row justify="center">
        <v-label class="mt-2 text-subtitle-2">15.3 k</v-label>
      </v-row></v-col
    >

    <v-col>
      <v-row justify="center" class="mt-0">
        <v-icon>mdi-weather-windy</v-icon>
      </v-row>
      <v-row justify="center">
        <v-label class="mt-2 text-subtitle-2">12 m/s</v-label>
      </v-row></v-col
    >

    <v-col>
      <v-row justify="center" class="mt-0">
        <v-icon>mdi-windsock</v-icon>
      </v-row>
      <v-row justify="center">
        <v-label class="mt-2 text-subtitle-2">45°</v-label>
      </v-row></v-col
    >
  </v-card>
</template>

<script lang="ts">
import ScreenInfoWidget from './ScreenInfoWidget.vue';
import logo from `../assets/autronica_logo.png`
import darkLogo from `../assets/autronica_logo_dark.png`

export default {
  data() {
    return {
      test_color: 'red',
    };
  },
  components: {
    ScreenInfoWidget,
  },
  props: {
    main_theme: {
      required: true,
      type: String,
      default: 'light',
    },
    bar_ratio: {
      required: true,
      type: Number,
      default: 0,
    },
  },
  methods: {
    changeTheme() {
      this.$emit('change-theme');
    },
    changeSize() {
      this.$emit('fold');
    },
  },

  computed: {
    mainIconPath() {
      if (this.main_theme === 'dark') {
        return logo;
      }
      return darkLogo;
    },
    IconStyle() {
      if (this.main_theme === 'dark') {
        return 'background-color: #424242; height: 68px; min-width: min-content;';
      }
      return 'background-color: #eeeeee; height: 68px; min-width: min-content; ';
    },
    infoStyle() {
      if (this.main_theme === 'dark') {
        return 'background-color: #424242; height: 62px;';
      }
      return 'background-color: #eeeeee; height: 62px;';
    },
  },
};
</script>

<style lang="scss" scoped>
.space {
  height: 25px;
}
</style>
