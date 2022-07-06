<template>
  <v-banner lines="one" :icon="mainIcon" :color="mainColor">
    <v-banner-text>
      {{
        message.UnitId + ' ' + message.UnitClass + ' on loop 1 is activated.'
      }}
    </v-banner-text>

    <v-banner-actions>
      <v-btn :color="mainColor">Ack</v-btn>
    </v-banner-actions>
  </v-banner>
</template>

<script lang="ts">
import { State } from '../data/test';

export default {
  props: {
    message: {
      required: false,
      type: Object,
      default: '',
    },
  },
  methods: {},
  computed: {
    mainIcon(): string {
      switch (this.message.Type) {
        case State.SilentAlarm: {
          return 'mdi-alert-octagram-outline';
        }
        case State.PreAlarm: {
          return 'mdi-alert-octagram-outline';
        }
        case State.Alarm: {
          return 'mdi-alert-octagram';
        }
        case State.Fault: {
          return 'mdi-alert';
        }
        case State.FaultAck: {
          return 'mdi-alert-outline';
        }
        case State.EarlyWarning: {
          return 'mdi-alert-outline';
        }
        default:
          return 'mdi-help-circle-outline';
      }
    },
    mainColor(): string {
      switch (this.message.Type) {
        case State.SilentAlarm: {
          return 'red-darken-2';
        }
        case State.PreAlarm: {
          return 'red-darken-2';
        }
        case State.Alarm: {
          return 'red-darken-2';
        }
        case State.Fault: {
          return 'yellow-darken-3';
        }
        case State.FaultAck: {
          return 'yellow-darken-3';
        }
        case State.EarlyWarning: {
          return 'yellow-darken-3';
        }
        default:
          return 'grey-darken-2';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.border {
  border-left: 5px solid rgb(255, 255, 255);
}
</style>
