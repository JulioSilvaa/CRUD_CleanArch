import express, { Request, Response, NextFunction } from "express";
import UserRouter from "src/infra/router/UserRouter";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", UserRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
