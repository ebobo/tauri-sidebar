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
  Key: string;
  Tag: string;
  Name: string;
  Description?: string;
  Type: State;
  Timestamp: string;
  Timesvalue: number;
  Acknowledged: boolean;
  Content?: string;
  AutoPined?: boolean;
}

export const TestMessages: Message[] = [
  {
    Key: 'N1-P1',
    Tag: 'PNT1',
    Name: 'AutroSafe P1',
    Type: State.Fault,
    Timestamp: '23.05.22-15:42',
    Timesvalue: 1662619323000,
    Acknowledged: false,
  },
  {
    Key: 'N1-P2',
    Tag: 'PNT2',
    Name: 'AutroSafe P2',
    Type: State.SilentAlarm,
    Timestamp: '23.05.22-15:43',
    Timesvalue: 1662619383000,
    Acknowledged: false,
  },
  {
    Key: 'N1-P3',
    Tag: 'PNT3',
    Name: 'AutroSafe P3',
    Type: State.Unknow,
    Timestamp: '23.05.22-15:44',
    Timesvalue: 1662619453000,
    Acknowledged: false,
  },
  {
    Key: 'N1-P4',
    Tag: 'PNT4',
    Name: 'AutroPrime P1',
    Type: State.Alarm,
    Timestamp: '23.05.22-15:45',
    Timesvalue: 1662619553000,
    Acknowledged: false,
  },
  {
    Key: 'N1-P5',
    Tag: 'PNT5',
    Name: 'AutroPrime P5',
    Type: State.FaultAck,
    Timestamp: '23.05.22-15:48',
    Timesvalue: 1662619653000,
    Acknowledged: false,
  },
  {
    Key: 'N1-P6',
    Tag: 'PNT6',
    Name: 'AutroSafe P6',
    Type: State.FaultAck,
    Timestamp: '23.05.22-15:49',
    Timesvalue: 1662619663000,
    Acknowledged: false,
  },
  {
    Key: 'N1-P7',
    Tag: 'PNT7',
    Name: 'AutroSafe P7',
    Type: State.EarlyWarning,
    Timestamp: '23.05.22-15:51',
    Timesvalue: 1662619683000,
    Acknowledged: false,
  },
  {
    Key: 'N1-P8',
    Tag: 'PNT8',
    Name: 'AutroSafe P8',
    Type: State.SilentAlarm,
    Timestamp: '23.05.22-15:52',
    Timesvalue: 1662619753000,
    Acknowledged: false,
  },
  {
    Key: 'N1-P9',
    Tag: 'PNT9',
    Name: 'AutroSafe P9',
    Type: State.PreAlarm,
    Timestamp: '23.05.22-15:53',
    Timesvalue: 1662619783000,
    Acknowledged: false,
  },
  {
    Key: 'N1-P10',
    Tag: 'PNT10',
    Name: 'AutroSafe P10',
    Type: State.Fault,
    Timestamp: '23.05.22-15:54',
    Timesvalue: 1662619803000,
    Acknowledged: false,
  },
  {
    Key: 'N1-P11',
    Tag: 'PNT11',
    Name: 'AutroSafe P11',
    Type: State.Fault,
    Timestamp: '23.05.22-15:55',
    Timesvalue: 1662619823000,
    Acknowledged: false,
  },
  {
    Key: 'N1-P12',
    Tag: 'PNT12',
    Name: 'AutroPrime P12',
    Type: State.FaultAck,
    Timestamp: '23.05.22-15:56',
    Timesvalue: 1662619843000,
    Acknowledged: false,
  },
  {
    Key: 'N1-P13',
    Tag: 'PNT13',
    Name: 'AutroPrime P13',
    Type: State.Fault,
    Timestamp: '23.05.22-15:55',
    Timesvalue: 1662619853000,
    Acknowledged: false,
  },
  {
    Key: 'N1-P14',
    Tag: 'PNT14',
    Name: 'AutroSafe P14',
    Type: State.FaultAck,
    Timestamp: '23.05.22-15:56',
    Timesvalue: 1662619386000,
    Acknowledged: false,
  },
];
