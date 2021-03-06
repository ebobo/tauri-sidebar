export enum State {
  Quiescent = 'Quiescent',
  EarlyWarning = 'EarlyWarning',
  PreAlarm = 'PreAlarm',
  Alarm = 'Alarm',
  AlarmAck = 'AlarmAck',
  SilentAlarm = 'SilentAlarm',
  SmallAlarm = 'SmallAlarm',
  LargeAlarm = 'LargeAlarm',
  Fault = 'Fault',
  FaultAck = 'FaultAck',
  FaultOK = 'FaultOK',
  Unknow = 'Unknow',
}

export interface Message {
  UnitId: string;
  UnitClass?: string;
  UnitFunc?: string;
  System: string;
  Type: State;
  Timestamp: string;
  Acknowledged: boolean;
  Content?: string;
}

export const TestMessages: Message[] = [
  {
    UnitId: 'N1.P1',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.Fault,
    Timestamp: '23.05.22-15:42',
    Acknowledged: false,
  },
  {
    UnitId: 'N1.P2',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.SilentAlarm,
    Timestamp: '23.05.22-15:43',
    Acknowledged: false,
  },
  {
    UnitId: 'A2018',
    UnitClass: 'PNT',
    UnitFunc: '',
    System: 'AutroPrime',
    Type: State.Unknow,
    Timestamp: '23.05.22-15:44',
    Acknowledged: false,
  },
  {
    UnitId: 'A2022',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroPrime',
    Type: State.Alarm,
    Timestamp: '23.05.22-15:45',
    Acknowledged: false,
  },
  {
    UnitId: 'N1.P5',
    UnitClass: 'INP',
    UnitFunc: '*',
    System: 'AutroSafe',
    Type: State.FaultAck,
    Timestamp: '23.05.22-15:48',
    Acknowledged: false,
  },
  {
    UnitId: 'N1.P6',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.FaultAck,
    Timestamp: '23.05.22-15:49',
    Acknowledged: false,
  },
  {
    UnitId: 'N1.P9',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.EarlyWarning,
    Timestamp: '23.05.22-15:51',
    Acknowledged: false,
  },
  {
    UnitId: 'N1.M7',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.SilentAlarm,
    Timestamp: '23.05.22-15:52',
    Acknowledged: false,
  },
  {
    UnitId: 'N1.P3',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.PreAlarm,
    Timestamp: '23.05.22-15:53',
    Acknowledged: false,
  },
  {
    UnitId: 'N2.P4',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.Fault,
    Timestamp: '23.05.22-15:54',
    Acknowledged: false,
  },
  {
    UnitId: 'N2.P5',
    UnitClass: 'INP',
    UnitFunc: '*',
    System: 'AutroSafe',
    Type: State.Fault,
    Timestamp: '23.05.22-15:55',
    Acknowledged: false,
  },
  {
    UnitId: 'N2.P1',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.FaultAck,
    Timestamp: '23.05.22-15:56',
    Acknowledged: false,
  },
  {
    UnitId: 'N2.P7',
    UnitClass: 'INP',
    UnitFunc: '*',
    System: 'AutroSafe',
    Type: State.Fault,
    Timestamp: '23.05.22-15:55',
    Acknowledged: false,
  },
  {
    UnitId: 'N2.P8',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.FaultAck,
    Timestamp: '23.05.22-15:56',
    Acknowledged: false,
  },
];
