import server from './serverHTTPS';
import startBot from './telegramBot';
import './env';

import TelegramBot from 'node-telegram-bot-api';

export default function startApp(): TelegramBot
{

    const url: any = process.env.URL_DEV + '/';
    const token: any = process.env.TOKEN;

    server.listen(process.env.PORT_DEV, () => {
        console.log('Local server on!');
    })

    return startBot(url, token);

}
