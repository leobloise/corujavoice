import startApp from './configs/start';
import BotView from './app/view/BotView';
import TelegramBot, { Message }from 'node-telegram-bot-api';


const telegrambot: TelegramBot = startApp();

const botView = new BotView(telegrambot);

export default telegrambot;
