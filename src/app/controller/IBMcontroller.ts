import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1';
import {IamAuthenticator } from 'ibm-watson/auth';
import fs from 'fs';
import '../../configs/env';

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
     c @function recognizeVoice(): : Promise<unknown>
     */
    public async recognizeVoice(params: any): Promise<unknown>
    {   
        const fsrd = await fs.createReadStream(params.audioPath)
        const options = {
            audio:  fsrd,
            contentType: params.type,
            model : 'pt-BR_BroadbandModel'
        }

        const res = await this.speechToText.recognize(options, (error, response) =>{
            if(response) {
                return(JSON.stringify(response, null, 2))
            } else {
                return error;
            }
        } );
        
        await fsrd.destroy();
        console.log(res.result);
        return  (res.result);
    }
}

export default IBMcontroller;