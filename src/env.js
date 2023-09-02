import "dotenv-flow/config";

const STAGE = process.env.NODE_ENV || "development";

class Env {
  constructor() {
    this.stage = STAGE;
  }

  get isDevelopment() {
    return this.stage === "development";
  }

  get isTest() {
    return this.stage === "test";
  }

  get isProduction() {
    return this.stage === "prod";
  }
}

export default new Env();
