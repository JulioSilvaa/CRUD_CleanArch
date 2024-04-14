export default interface SchedulesRepository {
  save({ serviceData, userTokenAuth }: any): Promise<void>;
}
