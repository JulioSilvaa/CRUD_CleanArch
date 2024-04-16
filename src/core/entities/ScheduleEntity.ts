export interface ISchedule {
  id?: string;
  dateTime: string;
  userId: string;
  serviceId: string;
  schedulestatusId: string;
}

export default class ScheduleEntity {
  id?: string;
  dateTime: string;
  userId: string;
  serviceId: string;
  schedulestatusId: string;

  constructor(props: ISchedule) {
    this.id = props.id;
    this.dateTime = props.dateTime;
    this.userId = props.userId;
    this.serviceId = props.serviceId;
    this.schedulestatusId = props.schedulestatusId;
  }
}
