"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetController = void 0;

var _config = require("../config/config");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

class ResetController {
  async deleteSession({
    bot,
    userNumber,
    stage
  }) {
    let url;
    let token;
    let numberBot;
    let conversationId;

    switch (bot) {
      case 3052:
        numberBot = stage.toUpperCase() === 'DRAFT' ? _config.phoneNumbers['NatBrDev'] : _config.phoneNumbers['NatBrPrd'];
        token = stage.toUpperCase() === 'DRAFT' ? process.env.KEYDEV : process.env.KEYPRD;
        conversationId = this.verifyExistPlusInUserNumber(userNumber);
        conversationId = numberBot.concat(conversationId);
        url = `https://api.staging.chatlayer.ai/v1/bots/${bot}/conversations/${conversationId}/session-data?version=${stage}`;
        break;

      case 3859:
        numberBot = stage.toUpperCase() === 'DRAFT' ? _config.phoneNumbers['NatLatamDev'] : _config.phoneNumbers['NatLatamPrd'];
        token = stage.toUpperCase() === 'DRAFT' ? process.env.KEYDEV : process.env.KEYPRD;
        conversationId = this.verifyExistPlusInUserNumber(userNumber);
        conversationId = numberBot.concat(conversationId);
        url = `https://api.staging.chatlayer.ai/v1/bots/${bot}/conversations/${conversationId}/session-data?version=${stage}`;
        break;

      case 3242:
        numberBot = stage.toUpperCase() === 'DRAFT' ? _config.phoneNumbers['AvonHispDev'] : _config.phoneNumbers['AvonHispPrd'];
        token = process.env.KEYAVON;
        conversationId = this.verifyExistPlusInUserNumber(userNumber);
        conversationId = numberBot.concat(conversationId);
        url = `https://api.staging.chatlayer.ai/v1/bots/${bot}/conversations/${conversationId}/session-data?version=${stage}`;
        break;
    }

    console.log(url, conversationId);

    try {
      const response = await (0, _axios.default)({
        method: "DELETE",
        url,
        headers: {
          'Authorization': token
        }
      });

      if (response.status == 204) {
        return `Sessão do numero ${userNumber} resetada com sucesso`;
      } else {
        return 'Sessão inexistente ou com falha na requisição';
      }
    } catch (e) {
      return e.message;
    }
  }

  verifyExistPlusInUserNumber(userNumber) {
    if (userNumber.includes('+')) {
      return userNumber.split('+').join();
    } else {
      return userNumber;
    }
  }

}

exports.ResetController = ResetController;