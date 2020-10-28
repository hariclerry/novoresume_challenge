const { MongoClient } = require("mongodb");

const mongodb = require("../../database/mongodb");
const operations = require("../../src/operations/users");

// mock user data
const userData = {
  firstName: "Jane1",
  lastName: "Doe",
  email: "janedoe123!@gmail.com",
  password: "jane123!",
};
const loginData = {
  email: "janedoe123!@gmail.com",
  password: "jane123!",
};

const inValidLoginData = {
  email: "janedoe1!@gmail.com",
  password: "jane",
};

describe("insert", () => {
  let newUser;
  beforeEach(async () => {
    newUser = await operations.register(userData);
  });

  afterEach(async () => {
    await mongodb.collection("users").deleteMany({});
  });

  it("should login with valid data and return access token", async () => {
    const result = await operations.login(loginData);
    
    expect(result.token).toBeDefined();
    expect(typeof result).toBe("object");
  });

  it("should fail to login if invalid data", async () => {
    const result = await operations.login(inValidLoginData);
    expect(result).toEqual(404);
  });
});
