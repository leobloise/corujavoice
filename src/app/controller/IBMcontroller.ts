import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1';
import {IamAuthenticator } from 'ibm-watson/auth';
import fs from 'fs';
import '../../configs/env';
import telegramAudio from '../interfaces/telegramAudio';

class IBMcontroller {

    private apikey: any = process.env.SPEECH_TO_TEXT_IAM_APIKEY;
    private url: any = process.env.SPEECH_TO_TEXT_URL;
    private speechToText: SpeechToTextV1;

    constructor() {
        this.speechToText = new SpeechToTextV1({
            authenticator:  new IamAuthenticator({apikey: `${this.apikey}`}),
            url: this.url
        })
    }
    /**
     * @function getResults(res): string
     * Peguei os dados de modo separado para facilitar a manutenção
     */
    private getResults(res: any): string 
    {   
         
        if(!res) {
            return 'Houve um erro no lado do servidor. Por favor, contate o projeto divulgar';
        }

        return res.result.results[0].alternatives[0].transcript;
    }
    /**
     * @function recognizeVoice(): : Promise<ar>
     * Mudei isso daqui para pegar os dados binários do áudio ao invés de pegar uma stream.
     */
    public async recognizeVoice(params: telegramAudio): Promise<string>
    {   
        const fsrd = await fs.readFileSync(params.audioPath)
        
        const options = {
            audio:  fsrd,
            contentType: `${params.type}`,
            model : 'pt-BR_BroadbandModel',
        }
        //Para utilizar os tipos ele pede que use promises, mas o método pede callbacks e fica impossível de usar...
        //Sério, mano, tem vezes que eu odeio programar QUE IDIOTAAAAAAA
        const res: any = await this.speechToText.recognize(options, (error, response) =>{

            if(response) {
            
                return(JSON.stringify(response, null, 2))
            
            } else {
            
                console.log(error);
                
            }
        });

        return this.getResults(res);
    }
}

export default IBMcontroller;