<template>
  <v-toolbar>
    <v-row align="center">
      <v-col>
        <v-row justify="center">
          <v-icon>mdi-earth</v-icon>
        </v-row>
        <v-row justify="center" class="mt-3">
          <v-label class="ml-1 text-subtitle-2"
            >63.43° N, 10.39° E</v-label
          ></v-row
        >
      </v-col>
      <v-col>
        <v-row justify="center">
          <v-icon>mdi-ship-wheel</v-icon>
        </v-row>
        <v-row justify="center" class="mt-3">
          <v-label class="ml-1 text-subtitle-2">{{ headingAngle }}°</v-label>
        </v-row>
      </v-col>
      <v-col>
        <v-row justify="center">
          <v-icon>mdi-speedometer</v-icon>
        </v-row>
        <v-row justify="center" class="mt-3">
          <v-label class="ml-1 text-subtitle-2">{{ shipSpeed }} k</v-label>
        </v-row>
      </v-col>
      <v-col>
        <v-row justify="center">
          <v-icon>mdi-weather-windy</v-icon>
        </v-row>
        <v-row justify="center" class="mt-3"
          ><v-label class="ml-1 text-subtitle-2">{{ windSpeed }} m/s</v-label>
        </v-row>
      </v-col>
      <v-col>
        <v-row justify="center">
          <v-icon>mdi-windsock</v-icon>
        </v-row>
        <v-row justify="center" class="mt-3"
          ><v-label class="ml-1 text-subtitle-2">{{ windAngle }}°</v-label>
        </v-row>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script lang="ts">
enum Trend {
  Increase,
  Decrease,
  Constant,
}

export default {
  data() {
    return {
      shipSpeed: 15.4,
      windSpeed: 12,
      headingAngle: 85,
      windAngle: 45,
      updateInterval: null,
    };
  },
  methods: {
    updateShipSpeed() {
      let value = 0;
      const trend = this.randomTrend();
      if (trend === Trend.Increase) {
        value = 0.1;
      } else if (trend === Trend.Decrease) {
        value = -0.1;
      }

      if (this.shipSpeed > 0.1 && this.shipSpeed < 20) {
        this.shipSpeed = Math.floor((this.shipSpeed + value) * 10) / 10;
      } else {
        this.shipSpeed = 15.4;
      }
    },

    updateHeadingAngle() {
      let value = 0;
      const trend = this.randomTrend();
      if (trend === Trend.Increase) {
        value = 1;
      } else if (trend === Trend.Decrease) {
        value = -1;
      }
      if (this.headingAngle > 1 && this.headingAngle < 360) {
        this.headingAngle = Math.floor(this.headingAngle + value);
      } else {
        this.headingAngle = 85;
      }
    },

    updateWindSpeed() {
      let value = 0;
      const trend = this.randomTrend();
      if (trend === Trend.Increase) {
        value = 1;
      } else if (trend === Trend.Decrease) {
        value = -1;
      }
      if (this.windSpeed > 1 && this.windSpeed < 20) {
        this.windSpeed = Math.floor(this.windSpeed + value);
      } else {
        this.windSpeed = 12;
      }
    },

    updateWindAngle() {
      let value = 0;
      const trend = this.randomTrend();
      if (trend === Trend.Increase) {
        value = 1;
      } else if (trend === Trend.Decrease) {
        value = -1;
      }
      if (this.windAngle > 1 && this.windAngle < 90) {
        this.windAngle = Math.floor(this.windAngle + value);
      } else {
        this.windAngle = 45;
      }
    },

    updateAllValue() {
      this.updateHeadingAngle();
      this.updateShipSpeed();
      this.updateWindSpeed();
      this.updateWindAngle();
    },

    randomTrend(): Trend {
      //random generate number between 0 - 1
      const rand = Math.random();
      if (rand > 0.7) {
        return Trend.Increase;
      }
      if (rand < 0.3) {
        return Trend.Decrease;
      }
      return Trend.Constant;
    },
  },
  mounted() {
    this.updateInterval = setInterval(this.updateAllValue, 2000);
  },
  unmounted() {
    clearInterval(this.updateInterval);
    this.updateInterval = null;
  },
};
</script>
