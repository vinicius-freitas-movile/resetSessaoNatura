import axios from 'axios';
import { phoneNumbers } from './config/config';
interface RecivedRequest {
    bot: number,
    userNumber: string,
    stage: string;
}

const deleteSession = async ({ bot, userNumber, stage }: RecivedRequest): Promise<string> => {
    let url;
    let token;
    let numberBot;
    let conversationId;

    switch (bot) {
        case 3052:
            numberBot = stage.toUpperCase() === 'DRAFT' ? phoneNumbers['NatBrDev'] : phoneNumbers['NatBrPrd'];

            token = stage.toUpperCase() === 'DRAFT' ? process.env.KEYDEV : process.env.KEYPRD

            conversationId = verifyExistPlusInUserNumber(userNumber);

            conversationId = numberBot.concat(conversationId);

            url = `https://api.staging.chatlayer.ai/v1/bots/${bot}/conversations/${conversationId}/session-data?version=${stage}`;

            break;

        case 3859:
            numberBot = stage.toUpperCase() === 'DRAFT' ? phoneNumbers['NatLatamDev'] : phoneNumbers['NatLatamPrd'];

            token = stage.toUpperCase() === 'DRAFT' ? process.env.KEYDEV : process.env.KEYPRD

            conversationId = verifyExistPlusInUserNumber(userNumber);

            conversationId = numberBot.concat(conversationId);

            url = `https://api.staging.chatlayer.ai/v1/bots/${bot}/conversations/${conversationId}/session-data?version=${stage}`;

            break;

        case 3242:
            numberBot = stage.toUpperCase() === 'DRAFT' ? phoneNumbers['AvonHispDev'] : phoneNumbers['AvonHispPrd'];

            token = process.env.KEYAVON

            conversationId = verifyExistPlusInUserNumber(userNumber);

            conversationId = numberBot.concat(conversationId);

            url = `https://api.staging.chatlayer.ai/v1/bots/${bot}/conversations/${conversationId}/session-data?version=${stage}`;

            break;
    }

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

const verifyExistPlusInUserNumber = (userNumber: string) => {
    if (userNumber.includes('+')) {
        return userNumber.split('+').join();
    } else {
        return userNumber;
    }
}

export const handler = async (event: any, context: any) => {

    try {
        deleteSession(JSON.parse(event.body));

    } catch (e: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: e.message
            })
        }
    }

}