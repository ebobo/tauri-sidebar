<template>
  <v-container>
    <v-row>
      <v-col xs="4" class="icon-area fill-height" align-self="center">
        <v-badge icon="mdi-pin-outline" color="grey-lighten-1" v-if="pined">
          <v-icon
            :color="cardParameters.mainColor"
            size="large"
            @click="pinEvent"
          >
            {{ cardParameters.mainIcon }}</v-icon
          ></v-badge
        >
        <v-icon
          :color="cardParameters.mainColor"
          size="large"
          @click="pinEvent"
          v-if="!pined"
        >
          {{ cardParameters.mainIcon }}</v-icon
        >
      </v-col>
      <v-col xs="4" class="content" @click="messageClick">
        <v-row class="mt-0" align="center">
          <v-icon color="grey-darken-1" size="sm"
            >mdi-clock-time-nine-outline</v-icon
          >
          <v-label class="ml-1 text-subtitle-2">
            {{ message.Timestamp }}
          </v-label>

          <v-label class="ml-1 text-subtitle-2">
            {{ message.Name }}
          </v-label>
        </v-row>
        <v-row class="description" v-if="opened">
          <p class="text-body-2">
            {{ message.Description }}
          </p>
        </v-row>
      </v-col>
      <v-col xs="4" class="btn-area" align="end" align-self="center">
        <v-btn
          :variant="cardParameters.btnVariant"
          size="x-small"
          icon
          @click="acknowledge"
        >
          <v-icon color="grey-darken-1">{{ cardParameters.ackIcon }}</v-icon>
        </v-btn>
        <v-btn
          size="x-small"
          :variant="cardParameters.btnVariant"
          icon
          @click="openDetail"
        >
          <v-icon color="grey-darken-1">{{ cardParameters.detailIcon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-divider
    class="divider"
    v-if="!lastOne"
    :color="cardParameters.dividerColor"
  ></v-divider>
</template>

<script lang="ts">
import { State } from '../data/test';

interface parameters {
  mainIcon: string;
  ackIcon: string;
  detailIcon: string;
  mainColor: string;
  dividerColor: string;
  btnVariant: string;
}

export default {
  emits: ['pin-event'],
  data() {
    return {
      opened: false,
    };
  },
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
    openDetail() {
      this.opened = !this.opened;
    },
    messageClick() {
      this.$emit('select-event');
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
        detailIcon: this.opened ? 'mdi-menu-up' : 'mdi-menu-down',
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
  max-width: min-content;

  padding: 0.2rem;
  margin-right: 0.5rem;
}
.content {
  padding-top: 0.4rem;
  padding-left: 0.4rem;
}
.btn-area {
  max-width: 65px;
  padding: 0;
}
.main-area {
  height: 50px;
}

.description {
  margin-top: 0.8rem;
}

.divider {
  /* background-color: pink; */
  margin-left: 3rem;
}
</style>
