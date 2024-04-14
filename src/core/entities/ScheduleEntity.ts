export interface ISchedule {
  id?: string;
  dataTime: Date;
  userId: string;
  serviceId: string;
  scheduleStatusId: string;
}

export default class ScheduleEntity {
  id?: string;
  dataTime: Date;
  userId: string;
  serviceId: string;
  scheduleStatusId: string;

  constructor(props: ISchedule) {
    this.id = props.id;
    this.dataTime = props.dataTime;
    this.userId = props.userId;
    this.serviceId = props.serviceId;
    this.scheduleStatusId = props.scheduleStatusId;
  }
}
