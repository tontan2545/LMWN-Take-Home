import express, { Application, Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import DataProps from "./types";

const cors = require("cors");

const app: Application = express();

app.use(cors());

app.get("/api/trips", async (req: Request, res: Response) => {
  const response: AxiosResponse<DataProps[]> = await axios.get(
    "http://localhost:9000/trips"
  );

  let database: DataProps[] = response.data;

  if (req.query.keyword) {
    const keyword = req.query.keyword as string;
    database = database.filter((data) => {
      return (
        data.tags.includes(keyword) ||
        data.description.includes(keyword) ||
        data.tags.includes(keyword)
      );
    });
  }
  res.send(database);
});

app.listen(8000);
