export enum State {
  Quiescent = 0,
  EarlyWarning,
  PreAlarm,
  Alarm,
  SilentAlarm,
  SmallAlarm,
  LargeAlarm,
  Fault,
  FaultAck,
  FaultOK,
}

export interface Message {
  UnitId: string;
  UnitClass: string;
  UnitFunc: string;
  Type: State;
  Content?: string;
}

export const TestMessages: Message[] = [
  {
    UnitId: 'N1.P1',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    Type: State.EarlyWarning,
  },
  {
    UnitId: 'N1.P2',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    Type: State.SilentAlarm,
  },
  {
    UnitId: 'N1.P3',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    Type: State.PreAlarm,
  },
  {
    UnitId: 'N1.P4',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    Type: State.Fault,
  },
  {
    UnitId: 'N1.P5',
    UnitClass: 'INP',
    UnitFunc: '*',
    Type: State.Fault,
  },
  {
    UnitId: 'N1.P6',
    UnitClass: 'PNT',
    UnitFunc: 'MUL',
    Type: State.FaultAck,
  },
];
