export enum State {
  Quiescent = 0,
  EarlyWarning,
  PreAlarm,
  Alarm,
  AlarmAck,
  SilentAlarm,
  SmallAlarm,
  LargeAlarm,
  Fault,
  FaultAck,
  FaultOK,
  Unknow,
}

export interface Message {
  UnitId: string;
  UnitClass: string;
  UnitFunc: string;
  System: string;
  Type: State;
  Timestamp: string;
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
  },
  {
    UnitId: 'N1.P2',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.SilentAlarm,
    Timestamp: '23.05.22-15:43',
  },
  {
    UnitId: 'A2018',
    UnitClass: 'PNT',
    UnitFunc: '',
    System: 'AutroPrime',
    Type: State.Unknow,
    Timestamp: '23.05.22-15:44',
  },
  {
    UnitId: 'A2022',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroPrime',
    Type: State.Alarm,
    Timestamp: '23.05.22-15:45',
  },
  {
    UnitId: 'N1.P5',
    UnitClass: 'INP',
    UnitFunc: '*',
    System: 'AutroSafe',
    Type: State.FaultAck,
    Timestamp: '23.05.22-15:48',
  },
  {
    UnitId: 'N1.P6',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.FaultAck,
    Timestamp: '23.05.22-15:49',
  },
  {
    UnitId: 'N1.P9',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.EarlyWarning,
    Timestamp: '23.05.22-15:51',
  },
  {
    UnitId: 'N1.M7',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.SilentAlarm,
    Timestamp: '23.05.22-15:52',
  },
  {
    UnitId: 'N1.P3',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.PreAlarm,
    Timestamp: '23.05.22-15:53',
  },
  {
    UnitId: 'N2.P4',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.Fault,
    Timestamp: '23.05.22-15:54',
  },
  {
    UnitId: 'N2.P5',
    UnitClass: 'INP',
    UnitFunc: '*',
    System: 'AutroSafe',
    Type: State.Fault,
    Timestamp: '23.05.22-15:55',
  },
  {
    UnitId: 'N2.P1',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    System: 'AutroSafe',
    Type: State.FaultAck,
    Timestamp: '23.05.22-15:56',
  },
];
