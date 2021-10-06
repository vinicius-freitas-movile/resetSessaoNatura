import { Router } from 'express';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
require('dotenv').config();

const KarinaRouter = Router();

KarinaRouter.get('/latamDev', async (request, response) => {

    try {
        const r = await axios({
            method: "DELETE",
            url: 'https://api.staging.chatlayer.ai/v1/bots/3859/conversations/wvywhtspp_5511937418840_5519996861081/session-data?version=DRAFT',
            headers: {
                'Authorization': process.env.KEYDEV || '',
                
            }
        });

        return response.json(r);
    } catch (e: any) {
        return response.json(e)
    } finally {
        return response.json();
    }

});

KarinaRouter.get('/latamPrd', async (request, response) => {

    try {
        const r = await axios({
            method: "DELETE",
            url: 'https://api.chatlayer.ai/v1/bots/3859/conversations/wvywhtspp_5511930380000_5519996861081/session-data?version=LIVE',
            headers: {
                'Authorization': process.env.KEYPRD || '',
                
            }
        });

        return response.json(r);
    } catch (e: any) {
        return response.json(e)
    } finally {
        return response.json();
    }

});


KarinaRouter.get('brDev', async (request, response) => {

    try {
        const r = await axios({
            method: "DELETE",
            url: 'https://api.chatlayer.ai/v1/bots/3052/conversations/wvywhtspp_5511930370000_5519996861081/session-data?version=LIVE',
            headers: {
                'Authorization': process.env.KEYDEV || '',
                
            }
        });

        return response.json(r);
    } catch (e: any) {
        return response.json(e)
    } finally {
        return response.json();
    }

});


KarinaRouter.get('/brPrd', async (request, response) => {

    try {
        const r = await axios({
            method: "DELETE",
            url: 'https://api.chatlayer.ai/v1/bots/3052/conversations/wvywhtspp_5511930360000_5519996861081/session-data?version=LIVE',
            headers: {
                'Authorization': process.env.KEYPRD || '',
                
            }
        });

        return response.json(r);
    } catch (e: any) {
        return response.json(e)
    } finally {
        return response.json();
    }

});


KarinaRouter.get('/avonHispDev', async (request, response) => {

    try {
        const r = await axios({
            method: "DELETE",
            url: 'https://api.chatlayer.ai/v1/bots/3242/conversations/wvywhtspp_5511933528111_5519996861081/session-data?version=LIVE',
            headers: {
                'Authorization': process.env.KEYAVON || '',
                
            }
        });

        return response.json(r);
    } catch (e: any) {
        return response.json(e)
    } finally {
        return response.json();
    }

});


KarinaRouter.get('/latamPrd', async (request, response) => {

    try {
        const r = await axios({
            method: "DELETE",
            url: 'https://api.chatlayer.ai/v1/bots/3859/conversations/wvywhtspp_5511974223520_5519996861081/session-data?version=LIVE',
            headers: {
                'Authorization': process.env.KEYAVON || '',
                
            }
        });

        return response.json(r);
    } catch (e: any) {
        return response.json(e)
    } finally {
        return response.json();
    }

});

export default KarinaRouter;