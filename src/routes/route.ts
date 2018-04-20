import * as express from "express";
import ba from "../controllers/bookController";

class Routes {
  public apiRouter: express.Router;

  constructor() {
    this.apiRouter = express.Router();
    this.configRoutes();
  }

  private configRoutes(): void {
    this.apiRouter.get("/", (req, res) => {
      res.json({
        message: "Welcome to our calculator API!"
      });
    });

    this.apiRouter.post("/add", ba.getAdditionResult);
  }
}

export default new Routes();
