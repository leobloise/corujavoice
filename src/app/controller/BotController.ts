import TelegramBot, { Message } from "node-telegram-bot-api";
import IBMcontroller from './IBMcontroller';
import fs from "fs";
import telegramAudio from "../interfaces/telegramAudio";

class BotController {

    private static msg: Message;

    /**
     * @function handleSpeechToText(msg,bot): string
     * It'll handle the requests made from Telgram to IBM Speech to text.
     */

    public static async handleSpeechToText(audio: any, bot: TelegramBot): Promise<any> 
    {
            try {
                const filePath: string = await bot.downloadFile(audio.file_id, 'src/app/audios');

                const options: telegramAudio = {
                    audioPath: filePath,
                    type: audio.mime_type
                }
                  
                const ibm = await new IBMcontroller();
                const resultsString: any = await ibm.recognizeVoice(options);
                await fs.unlinkSync(filePath);
                console.log(resultsString.results[0].alternatives);

                return resultsString.results[0].alternatives[0].transcript;

            } catch (error) {
                return error;
            }
    }
}

export default BotController;