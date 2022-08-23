export enum State {
  Quiescent = 'quiescent',
  EarlyWarning = 'earlyWarning',
  PreAlarm = 'preAlarm',
  Alarm = 'alarm',
  AlarmAck = 'alarmAck',
  SilentAlarm = 'SilentAlarm',
  SmallAlarm = 'SmallAlarm',
  LargeAlarm = 'LargeAlarm',
  Fault = 'fault',
  FaultAck = 'FaultAck',
  FaultOK = 'FaultOK',
  Unknow = 'Unknow',
  UnknowAck = 'UnknowAck',
}

export interface Message {
  UnitId?: string;
  UnitClass?: string;
  UnitFunc?: string;
  Description?: string;
  Name?: string;
  System?: string;
  Type?: State;
  Timestamp: number;
  Timesvalue?: number;
  Acknowledged?: boolean;
  Deleted?: boolean;
  Content?: string;
  AutoPined?: boolean;
}

export const TestMessages: Message[] = [
  {
    UnitId: 'N1.P1',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.Fault,
    Timestamp: '23.05.22-15:42',
    Timesvalue: 1662619323000,
    Acknowledged: false,
  },
  {
    UnitId: 'N1.P2',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.SilentAlarm,
    Timestamp: '23.05.22-15:43',
    Timesvalue: 1662619383000,
    Acknowledged: false,
  },
  {
    UnitId: 'A2018',
    UnitClass: 'PNT',
    UnitFunc: '',
    System: 'AutroPrime',
    Type: State.Unknow,
    Timestamp: '23.05.22-15:44',
    Timesvalue: 1662619453000,
    Acknowledged: false,
  },
  {
    UnitId: 'A2022',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroPrime',
    Type: State.Alarm,
    Timestamp: '23.05.22-15:45',
    Timesvalue: 1662619553000,
    Acknowledged: false,
  },
  {
    UnitId: 'N1.P5',
    UnitClass: 'INP',
    UnitFunc: '*',
    System: 'AutroSafe',
    Type: State.FaultAck,
    Timestamp: '23.05.22-15:48',
    Timesvalue: 1662619653000,
    Acknowledged: false,
  },
  {
    UnitId: 'N1.P6',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.FaultAck,
    Timestamp: '23.05.22-15:49',
    Timesvalue: 1662619663000,
    Acknowledged: false,
  },
  {
    UnitId: 'N1.P9',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.EarlyWarning,
    Timestamp: '23.05.22-15:51',
    Timesvalue: 1662619683000,
    Acknowledged: false,
  },
  {
    UnitId: 'N1.M7',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.SilentAlarm,
    Timestamp: '23.05.22-15:52',
    Timesvalue: 1662619753000,
    Acknowledged: false,
  },
  {
    UnitId: 'N1.P3',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.PreAlarm,
    Timestamp: '23.05.22-15:53',
    Timesvalue: 1662619783000,
    Acknowledged: false,
  },
  {
    UnitId: 'N2.P4',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.Fault,
    Timestamp: '23.05.22-15:54',
    Timesvalue: 1662619803000,
    Acknowledged: false,
  },
  {
    UnitId: 'N2.P5',
    UnitClass: 'INP',
    UnitFunc: '*',
    System: 'AutroSafe',
    Type: State.Fault,
    Timestamp: '23.05.22-15:55',
    Timesvalue: 1662619823000,
    Acknowledged: false,
  },
  {
    UnitId: 'N2.P1',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.FaultAck,
    Timestamp: '23.05.22-15:56',
    Timesvalue: 1662619843000,
    Acknowledged: false,
  },
  {
    UnitId: 'N2.P7',
    UnitClass: 'INP',
    UnitFunc: '*',
    System: 'AutroSafe',
    Type: State.Fault,
    Timestamp: '23.05.22-15:55',
    Timesvalue: 1662619853000,
    Acknowledged: false,
  },
  {
    UnitId: 'N2.P8',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.FaultAck,
    Timestamp: '23.05.22-15:56',
    Timesvalue: 1662619386000,
    Acknowledged: false,
  },
];
