import { Router } from 'express';
import { ResetController } from '../controller/ResetController';

const resetRouter = Router();

const resetController = new ResetController();

resetRouter.post('/reset', async (request, response) => {
    const { userNumber, bot, stage } = request.body;

    const responseDeleteSession = await resetController.deleteSession({
        userNumber,
        bot,
        stage
    });

    return response.json({ message: responseDeleteSession });

});

export default resetRouter;