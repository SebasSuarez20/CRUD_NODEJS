import express, { Router } from "express";
import PathBook from './routes/RouterBook';
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";


class Server {

  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.RoutesAll();
  }

  private config() {
    this.app.set("PORT", process.env.PORT || 3000);
    this.app.use(cors()); //darle permisos de solicitud http
    this.app.use(morgan('dev')); //Permisos DEV
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

  }

  private RoutesAll(): void {
    this.app.use(PathBook);
  }

  public StartConnection() {
    return this.app.listen(this.app.get("PORT"), () => {
      console.log(`The server run in the: ${this.app.get("PORT")}`);
    })
  }

}

export { Server };