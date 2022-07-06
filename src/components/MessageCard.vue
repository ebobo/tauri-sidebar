<template>
  <v-container>
    <v-row>
      <v-col cols="2" xs="4" class="icon-area fill-height" align-self="center">
        <v-icon :color="cardParameters.mainColor" size="x-large">
          {{ cardParameters.mainIcon }}</v-icon
        >
      </v-col>
      <v-col cols="8" xs="4">
        <v-row class="mt-0" align="center">
          <v-icon color="grey-darken-1" size="sm"
            >mdi-clock-time-nine-outline</v-icon
          >
          <v-label class="ml-1 text-subtitle-2">
            {{ message.Timestamp }}
          </v-label>

          <v-label class="ml-4 text-subtitle-2">
            {{ message.System + ': ' + message.UnitId }}
          </v-label>
          <!-- <v-badge
          class="ml-4"
          color="red-darken-2"
          dark
          content="alarm"
          inline
        ></v-badge> -->
        </v-row>
        <v-row class="mt-3">
          <p class="text-body-2 font-italic">
            {{ 'Alarm: ' + message.UnitId + ' on loop 1 is activated.' }}
          </p>
        </v-row>
      </v-col>
      <v-col cols="2" xs="4" class="fill-height btn-area" align-self="center">
        <v-btn
          :variant="cardParameters.btnVariant"
          size="small"
          :color="cardParameters.mainColor"
          icon
          @click="acknowledge"
        >
          <v-icon>{{ cardParameters.ackIcon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-divider inset :color="cardParameters.dividerColor"></v-divider>
  <v-divider inset :color="cardParameters.dividerColor"></v-divider>
</template>

<script lang="ts">
import { State } from '../data/test';

interface parameters {
  mainIcon: string;
  ackIcon: string;
  mainColor: string;
  dividerColor: string;
  btnVariant: string;
}

export default {
  props: {
    message: {
      required: false,
      type: Object,
      default: '',
    },
  },
  methods: {
    acknowledge() {
      if (this.message.Type === State.Alarm) {
        this.message.Type = State.AlarmAck;
      } else if (this.message.Type === State.Fault) {
        this.message.Type = State.FaultAck;
      }
    },
  },
  computed: {
    cardParameters(): parameters {
      let para = {
        mainIcon: 'mdi-help-circle-outline',
        mainColor: 'grey-darken-2',
        ackIcon: 'mdi-account-question-outline',
        btnVariant: 'tonal',
        dividerColor: 'grey-darken-2',
      };
      switch (this.message.Type) {
        case State.SilentAlarm: {
          para.mainIcon = 'mdi-alert-octagram-outline';
          para.mainColor = 'red-darken-2';
          para.dividerColor = 'red-darken-2';
          break;
        }
        case State.PreAlarm: {
          para.mainIcon = 'mdi-alert-octagram-outline';
          para.mainColor = 'red-darken-2';
          para.dividerColor = 'red-darken-2';
          break;
        }
        case State.Alarm: {
          para.mainIcon = 'mdi-alert-octagram';
          para.mainColor = 'red-darken-2';
          para.btnVariant = 'flat';
          para.dividerColor = 'red-darken-2';
          break;
        }
        case State.AlarmAck: {
          para.mainIcon = 'mdi-alert-octagram';
          para.mainColor = 'red-darken-2';
          para.btnVariant = 'flat';
          para.ackIcon = 'mdi-account-check-outline';
          break;
        }
        case State.Fault: {
          para.mainIcon = 'mdi-alert';
          para.mainColor = 'yellow-darken-3';
          para.btnVariant = 'flat';
          para.dividerColor = 'yellow-darken-3';
          break;
        }
        case State.FaultAck: {
          para.mainIcon = 'mdi-alert';
          para.mainColor = 'yellow-darken-3';
          para.ackIcon = 'mdi-account-check-outline';
          break;
        }
        case State.EarlyWarning: {
          para.mainIcon = 'mdi-alert-outline';
          para.mainColor = 'yellow-darken-3';
          para.dividerColor = 'yellow-darken-3';
          break;
        }
        default:
          break;
      }
      return para;
    },
  },
};
</script>

<style lang="scss" scoped>
.border {
  border-left: 5px solid rgb(255, 255, 255);
}
.icon-area {
  min-width: min-content;
  /* background-color: #0f9b0f; */
}
.content {
  background-color: #eef7fc;
}
.btn-area {
  min-width: min-content;
  /* background-color: #9525b1; */
}
</style>
