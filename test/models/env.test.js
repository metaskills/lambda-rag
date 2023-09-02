import env from "../../src/env";

let envStage;

beforeEach(() => {
  envStage = env.stage;
});

afterEach(() => {
  env.stage = envStage;
});

test("isDevelopment", () => {
  env.stage = "development";
  expect(env.isDevelopment).toBeTruthy();
});

test("isProduction", () => {
  env.stage = "prod";
  expect(env.isProduction).toBeTruthy();
});
