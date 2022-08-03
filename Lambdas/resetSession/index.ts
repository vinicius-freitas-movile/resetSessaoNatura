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
            token = process.env.KEYNATBRDEV;
            conversationId = verifyExistPlusInUserNumber(userNumber);
            conversationId = numberBot.concat(conversationId);
            url = `https://api.staging.chatlayer.ai/v1/bots/${bot}/conversations/${conversationId}/session-data?version=${stage}`;

            break;
        case 3859:
            numberBot = stage.toUpperCase() === 'DRAFT' ? phoneNumbers['NatLatamDev'] : phoneNumbers['NatLatamPrd'];
            token = process.env.KEYNATHSPDEV;
            conversationId = verifyExistPlusInUserNumber(userNumber);
            conversationId = numberBot.concat(conversationId);
            url = `https://api.staging.chatlayer.ai/v1/bots/${bot}/conversations/${conversationId}/session-data?version=${stage}`;

            break;
        case 3242:
            numberBot = stage.toUpperCase() === 'DRAFT' ? phoneNumbers['AvonHispDev'] : phoneNumbers['AvonHispPrd'];
            token = process.env.KEYAVONDEV;
            conversationId = verifyExistPlusInUserNumber(userNumber);
            conversationId = numberBot.concat(conversationId);
            url = `https://api.staging.chatlayer.ai/v1/bots/${bot}/conversations/${conversationId}/session-data?version=${stage}`;

            break;
    } 

    console.log('url : ', url)
    console.log('token: ', token)
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

export const handler = async (event: any, context: any, callback: any) => {
    const body = JSON.parse(event.body);

    console.log(`body: ${JSON.stringify(body)}, event: ${JSON.stringify(event)}`)
    
    if (event.httpMethod !== 'POST') {
        callback(null, {
            statusCode: 405,
            body: 'Method Not Allowed',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }

    if (!body) {
        callback(null, {
            statusCode: 400,
            body: 'Bad Request not have a body',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }

    if (body.bot == undefined || body.userNumber == undefined || body.stage == undefined) {
        callback(null, {
            statusCode: 400,
            body: `Bad Request your body: ${JSON.stringify(event.body)}`,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }

    try {
        const response = await deleteSession(body);

        callback(null, {
            statusCode: 200,
            body: response,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });

    } catch (e: any) {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({
                message: e.message
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
    }

}