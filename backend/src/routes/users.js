"use strict";

const users = require("express").Router();
const wkhtmltopdf = require("wkhtmltopdf");
const { validationResult } = require("express-validator");
const fs = require("fs");

const operations = require("../operations/users");
const { authenticateToken } = require("../middleware/auth");
const { validate } = require("../middleware/validator");

users.get("/", async (req, res, next) => {
  try {
    const users = await operations.getAllUsers();
    if (users instanceof Error) throw users;
    res.send(users);
  } catch (error) {
    res.send(500);
  }
});

users.post(
  "/register",
  validate("registerUserValidator"),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    try {
      const result = await operations.register(req.body);
      if (result === 409) return res.sendStatus(409);
      if (result instanceof Error) throw result;
      res.send(result);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

users.post("/login", validate("loginUserValidator"), async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  try {
    const result = await operations.login(req.body);
    if (result instanceof Error) throw result;
    res.send(result);
  } catch (error) {
    res.sendStatus(500);
  }
});

users.post("/logout", authenticateToken, async (req, res, next) => {
  try {
    const result = await operations.logout(req.body);
    if (result instanceof Error) throw result;
    res.send(result);
  } catch (error) {
    res.sendStatus(500);
  }
});

users.post("/:id/products", authenticateToken, async (req, res, next) => {
  try {
    req.body.id = req.params.id;
    const result = await operations.saveProducts(req.body);
    if (result instanceof Error) throw result;
    res.send(result);
  } catch (error) {
    res.sendStatus(500);
  }
});

users.post("/:id/billing-info", authenticateToken, async (req, res, next) => {
  try {
    req.body.id = req.params.id;
    const result = await operations.saveBillingInfo(req.body);
    if (result instanceof Error) throw result;
    res.send(result);
  } catch (error) {
    res.sendStatus(500);
  }
});

users.get("/:id/offer", authenticateToken, async (req, res, next) => {
  try {
    const offer = await operations.getOffer(req.params.id);
    if (offer instanceof Error) throw offer;
    return res.send(offer);
  } catch (error) {
    return res.sendStatus(500);
  }
});

users.post("/:id/offer", authenticateToken, async (req, res, next) => {
  try {
    res.writeHead(200, {
      "Access-Control-Expose-Headers": "Content-Disposition",
      "Content-Type": "application/pdf",
      "Content-disposition": "attachment;filename=certificate.pdf",
    });
    wkhtmltopdf(req.body.html).pipe(res);
  } catch (error) {
    return res.sendStatus(500);
  }
});

module.exports = users;
