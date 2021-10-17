import { phoneNumbers } from '../config/config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
require('dotenv').config();


interface Request {
    bot: number,
    userNumber: string,
    stage: string;
}

export class ResetController {
    async deleteSession({ bot, userNumber, stage }: Request): Promise<string> {
        let url;
        let token;
        let numberBot;
        let conversationId;

        switch (bot) {
            case 3052:
                numberBot = stage.toUpperCase() === 'DRAFT' ? phoneNumbers['NatBrDev'] : phoneNumbers['NatBrPrd'];

                token = stage.toUpperCase() === 'DRAFT' ? process.env.KEYDEV : process.env.KEYPRD

                conversationId = this.verifyExistPlusInUserNumber(userNumber);

                conversationId = numberBot.concat(conversationId);

                url = `https://api.staging.chatlayer.ai/v1/bots/${bot}/conversations/${conversationId}/session-data?version=${stage}`;

                break;

            case 3859:
                numberBot = stage.toUpperCase() === 'DRAFT' ? phoneNumbers['NatLatamDev'] : phoneNumbers['NatLatamPrd'];

                token = stage.toUpperCase() === 'DRAFT' ? process.env.KEYDEV : process.env.KEYPRD

                conversationId = this.verifyExistPlusInUserNumber(userNumber);

                conversationId = numberBot.concat(conversationId);

                url = `https://api.staging.chatlayer.ai/v1/bots/${bot}/conversations/${conversationId}/session-data?version=${stage}`;

                break;

            case 3242:
                numberBot = stage.toUpperCase() === 'DRAFT' ? phoneNumbers['AvonHispDev'] : phoneNumbers['AvonHispPrd'];

                token = process.env.KEYAVON

                conversationId = this.verifyExistPlusInUserNumber(userNumber);

                conversationId = numberBot.concat(conversationId);

                url = `https://api.staging.chatlayer.ai/v1/bots/${bot}/conversations/${conversationId}/session-data?version=${stage}`;

                break;
        }

        console.log(url, conversationId)

        try {
            const response = await axios({
                method: "DELETE",
                url,
                headers: {
                    'Authorization': token,

                }
            });

            if (response.status == 204) {
                return `Sessão do numero ${userNumber} resetada com sucesso`;
            } else {
                return 'Sessão inexistente ou com falha na requisição'
            }
        } catch (e: any) {
            return e.message;
        }

    }

    verifyExistPlusInUserNumber(userNumber: string) {
        if (userNumber.includes('+')) {
            return userNumber.split('+').join();
        } else {
            return userNumber;
        }
    }
}