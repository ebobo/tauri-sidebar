<template>
  <v-container>
    <v-row>
      <v-col cols="2" xs="4" class="icon-area fill-height" align-self="center">
        <v-badge icon="mdi-pin-outline" color="grey-lighten-1" v-if="pined">
          <v-icon
            :color="cardParameters.mainColor"
            size="x-large"
            @click="pinEvent"
          >
            {{ cardParameters.mainIcon }}</v-icon
          ></v-badge
        >
        <v-icon
          :color="cardParameters.mainColor"
          size="x-large"
          @click="pinEvent"
          v-if="!pined"
        >
          {{ cardParameters.mainIcon }}</v-icon
        >
      </v-col>
      <v-col cols="8" xs="4">
        <v-row class="mt-0" align="center">
          <v-icon color="grey-darken-1" size="sm"
            >mdi-clock-time-nine-outline</v-icon
          >
          <v-label class="ml-1 mr-2 text-subtitle-2">
            {{ message.Timestamp }}
          </v-label>

          <v-label class="text-subtitle-2">
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
      <v-col
        cols="2"
        xs="4"
        class="fill-height btn-area"
        align-self="center"
        align="center"
      >
        <v-btn
          :variant="cardParameters.btnVariant"
          size="small"
          icon
          @click="acknowledge"
        >
          <v-icon size="large" color="grey-darken-1">{{
            cardParameters.ackIcon
          }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-divider
    v-if="!lastOne"
    inset
    :color="cardParameters.dividerColor"
  ></v-divider>
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
  emits: ['pin-event'],
  props: {
    message: {
      required: false,
      type: Object,
      default: '',
    },
    pined: {
      required: false,
      type: Boolean,
      default: false,
    },
    lastOne: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  methods: {
    //temp code
    acknowledge() {
      if (this.message.Type === State.Alarm) {
        this.message.Type = State.AlarmAck;
      } else if (this.message.Type === State.Fault) {
        this.message.Type = State.FaultAck;
      } else if (this.message.Type === State.Unknow) {
        this.message.Type = State.UnknowAck;
      } else if (this.message.Type === State.AlarmAck) {
        this.message.Type = State.Alarm;
      } else if (this.message.Type === State.FaultAck) {
        this.message.Type = State.Fault;
      } else if (this.message.Type === State.UnknowAck) {
        this.message.Type = State.Unknow;
      }
    },
    pinEvent() {
      this.$emit('pin-event');
    },
  },
  computed: {
    borderStyles() {
      let color = '#757575';
      switch (this.message.Type) {
        case State.SilentAlarm: {
          color = '#D32F2F';
          break;
        }
        case State.PreAlarm: {
          color = '#D32F2F';
          break;
        }
        case State.Alarm: {
          color = '#D32F2F';
          break;
        }
        case State.AlarmAck: {
          break;
        }
        case State.Fault: {
          color = '#F9A825';
          break;
        }
        case State.FaultAck: {
          break;
        }
        case State.EarlyWarning: {
          color = '#F9A825';
          break;
        }
        default:
          break;
      }
      return {
        'border-right': `4px solid ${color}`,
      };
    },

    cardParameters(): parameters {
      let para = {
        mainIcon: 'mdi-help-circle-outline',
        mainColor: 'grey-darken-2',
        ackIcon: 'mdi-account-question-outline',
        btnVariant: 'flat',
        dividerColor: 'grey-lighten-1',
      };
      switch (this.message.Type) {
        case State.SilentAlarm: {
          para.mainIcon = 'mdi-alert';
          para.mainColor = 'red-darken-2';
          // para.dividerColor = 'red-darken-2';
          break;
        }
        case State.PreAlarm: {
          para.mainIcon = 'mdi-alert';
          para.mainColor = 'red-darken-2';
          // para.dividerColor = 'red-darken-2';
          break;
        }
        case State.Alarm: {
          para.mainIcon = 'mdi-alert';
          para.mainColor = 'red-darken-2';
          para.btnVariant = 'flat';
          // para.dividerColor = 'red-darken-2';
          break;
        }
        case State.AlarmAck: {
          para.mainIcon = 'mdi-alert';
          para.mainColor = 'red-darken-2';
          para.btnVariant = 'flat';
          para.ackIcon = 'mdi-account-check-outline';
          break;
        }
        case State.Fault: {
          para.mainIcon = 'mdi-alert';
          para.mainColor = 'yellow-darken-3';
          para.btnVariant = 'flat';
          // para.dividerColor = 'yellow-darken-3';
          break;
        }
        case State.FaultAck: {
          para.mainIcon = 'mdi-alert';
          para.mainColor = 'yellow-darken-3';
          para.ackIcon = 'mdi-account-check-outline';
          break;
        }
        case State.UnknowAck: {
          para.ackIcon = 'mdi-account-check-outline';
          break;
        }
        case State.EarlyWarning: {
          para.mainIcon = 'mdi-alert-outline';
          para.mainColor = 'yellow-darken-3';
          // para.dividerColor = 'yellow-darken-3';
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
.border-left {
  border-left: 4px solid v-bind('cardParameters.dividerColor');
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
