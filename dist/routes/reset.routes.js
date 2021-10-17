"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ResetController = require("../controller/ResetController");

const resetRouter = (0, _express.Router)();
const resetController = new _ResetController.ResetController();
resetRouter.post('/reset', async (request, response) => {
  const {
    userNumber,
    bot,
    stage
  } = request.body;
  const responseDeleteSession = await resetController.deleteSession({
    userNumber,
    bot,
    stage
  });
  return response.json({
    message: responseDeleteSession
  });
});
var _default = resetRouter;
exports.default = _default;