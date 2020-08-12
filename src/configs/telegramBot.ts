import TelegramBot from 'node-telegram-bot-api';

export default function setBot(url: string, token: string): TelegramBot 
{
    const options = {
        webHook: {
            port: 443
        }
    };
    
    const bot = new TelegramBot(token, options);
    bot.setWebHook(`${url}/bot${token}`);
    return bot;
};