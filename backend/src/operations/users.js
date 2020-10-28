"use strict";

const ObjectId = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");

const mongodb = require("../../database/mongodb");
const { generateAccessToken } = require("../middleware/auth");

module.exports = {
  async getAllUsers() {
    try {
      const users = await mongodb.collection("users").find({}).toArray();
      users.map((user) => {
        user.id = user._id;
        delete user._id;
      }); // We don't wanna expose which database we use to the view by the way id is stored
      return users;
    } catch (error) {
      return error;
    }
  },

  async register(userData) {
    try {
      const user = (
        await mongodb
          .collection("users")
          .find({ email: userData.email })
          .toArray()
      )[0];

      if (user) return 409;

      bcrypt.hash(userData.password, 10).then(async (hash) => {
        delete userData.password;
        userData.password = hash;
        await mongodb.collection("users").insertOne(userData);
      });
    } catch (error) {
      return error;
    }
  },

  async login(userData) {
    const { email, password } = userData;
    try {
      const user = await mongodb
        .collection("users")
        .find({ email: email })
        .toArray();

      if (!user[0]) {
        return 404;
      }
      const { _id, password: hashedPassword } = user[0];
      const validPassword = await bcrypt.compare(password, hashedPassword);
      if (!validPassword) return 400;

      const token = generateAccessToken(_id);
      return { token, userId: _id };
    } catch (error) {
      return error;
    }
  },

  async getOffer(userId) {
    try {
      const user = await mongodb
        .collection("users")
        .find({ _id: ObjectId(userId) })
        .project({ _id: 0, products: 1, billingInfo: 1 })
        .toArray();
      return user;
    } catch (error) {
      return error;
    }
  },

  async saveProducts(userData) {
    try {
      return await mongodb
        .collection("users")
        .findOneAndUpdate(
          { _id: ObjectId(userData.id) },
          { $set: { products: userData.products } },
          { upsert: true }
        );
    } catch (error) {
      return error;
    }
  },

  async saveBillingInfo(userData) {
    try {
      await mongodb
        .collection("users")
        .findOneAndUpdate(
          { _id: ObjectId(userData.id) },
          { $set: { billingInfo: userData.billingInfo } },
          { upsert: true }
        );
    } catch (error) {
      return error;
    }
  },
};
