import TelegramBot, { Message, SendMessageOptions } from "node-telegram-bot-api";
import BotController from '../controller/BotController';

class BotView {

    private bot: TelegramBot;

    constructor(bot: TelegramBot){
        this.bot = bot
        this.initialize();
    }

    initialize() {

        this.bot.onText(/\/start/,(msg: Message) =>{
           this.starterMessage(msg);
        })

        this.bot.on('message', async (msg: Message)=> {
             this.bot.on('voice', async (msg: Message) =>{
                let transcript: string = await BotController.handleSpeechToText(msg.voice, this.bot);
                await this.replieToOlderMsg(msg, transcript, this.getMessageId(msg));
            });
        })
    }

    /**
     * @function basicSendMessage(msg): void
     * It'll send a message to any user.
     */

    public basicSendMessage(msg: Message, msgText: string): void 
    {
        this.bot.sendMessage(msg.chat.id, msgText);    
    }

    public starterMessage(msg: Message):void {
       this.bot.sendMessage(msg.chat.id, `*Bem Vindo ao Coruja Voice* 🦉🎵 \n\nEu forneço um serviço de Speech\-To\-Text utilizando a API promovida e mantida pela _IBM Watsom_.\n\nCaso queira utilizar meus serviços, basta enviar-me um áudio em Português.\n\n🌌 Produzido e mantido por: Léo Bloise 🔭`, {
           parse_mode: 'Markdown'
       })
    }

    private getMessageId(msg: Message) {
        return msg.message_id;
    }
    /**
     * @function replieToOlderMsg: void
     * It will replie any message.
     */
    public async replieToOlderMsg(msg: Message, msgText: string, message_id: number) {
            
            try{ 
                
                this.bot.sendMessage(msg.chat.id, msgText, {
                reply_to_message_id: message_id,
                });

            }catch(e) {
                    //Error infundado
            }
        
    }
}

export default BotView;