import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv"
import Router from "./routes";
import dbConfig from "./config/database";
import bodyParser from "body-parser";

dotenv.config()

const PORT = process.env.PORT || 8000
const app: Application = express();
const corsOption = { credentials: true, orgin: process.env.URL || '*' }

app.use(express.json());
app.use(cors(corsOption))
app.use(cookieParser())
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    }
  })
)

app.use(Router);

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });

