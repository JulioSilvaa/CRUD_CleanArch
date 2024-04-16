import { PrismaClient } from "@prisma/client";
import { ISchedule } from "src/core/entities/ScheduleEntity";
import ScheduleRepository from "src/core/repositories/ScheduleRepository";

const prisma = new PrismaClient()

export default class ScheduleRepositorySQL implements ScheduleRepository {
  async update({ id, userId, dateTime, schedulestatusId, serviceId }: any): Promise<void> {
    await prisma.schedules.update({ where: { id, userId }, data: { dateTime, schedulestatusId, serviceId } });
  }
  async delete(id: string, userId: string): Promise<void> {
    await prisma.schedules.delete({ where: { id, userId } });
  }
  async find(id: string, userId: string): Promise<any> {
    const schedule = await prisma.schedules.findUnique({ where: { id, userId }, select: { user: { select: { name: true, email: true, phone: true, id: true } }, service: { select: { name: true, price: true, description: true } }, schedulestatus: { select: { status: true } }, dateTime: true } });
    return schedule;
  }
  async getAll(id: string): Promise<any> {
    const schedulesList = await prisma.schedules.findMany({ where: { userId: id }, select: { user: { select: { name: true, email: true, phone: true } }, service: { select: { name: true, price: true, description: true, } }, schedulestatus: { select: { status: true } }, dateTime: true } });
    return schedulesList
  }
  async save({ dateTime, schedulestatusId, serviceId, userId }: ISchedule): Promise<void> {
    await prisma.schedules.create({
      data: {
        dateTime, schedulestatusId, serviceId, userId
      }
    })
  }

}