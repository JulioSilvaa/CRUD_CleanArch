import jwt from "jsonwebtoken";

export default class CreateSchedules {
  execute({ serviceData, userTokenAuth }: any) {
    const token = userTokenAuth;
    const decodedToken = jwt.decode(token);

    console.log(decodedToken);
  }
}
