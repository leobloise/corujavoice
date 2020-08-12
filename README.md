#   CorujaVoice - Speech To Text    

O CorujaVoice é um bot do telegram que utiliza um dos serviços promovidos pela IBM Watsom para fazer um texto a partir de um áudio gravado por um usuário. Ele está em atualização e já tem uma versão hospedada no heroku em funcionamento. 

## Preparando o ambiente de desenvolvimento

A API do telegram exige a utilização do protocolo HTTPS quando estamos utilizando webhooks. Por isso, faz-se necessário um servidor HTTPS local para que ele funcione. Por sua vez, o HTTPS necessita de alguns elementos que, nesse caso, serão produzidos por nós mesmos - vale ressaltar que você não deve utilizar esses elementos em ambiente de produção:

<pre>
    Certificado privado
    $ openssl genrsa -out key.pem 2048

    Certificado público
    $ openssl req -new -sha256 -key key.pem -out crt.pem
</pre>

***Salve os arquivos gerados de modo seguro.***

Depois disso, basta configurar um servidor HTTPS juntamente com o express, por exemplo:

<pre>
    import https from 'https';
    import fs from 'fs';
    import app from 'path/to/express/app';

    const server = https.createServer({
        key: fs.readFileSync('path/to/public/key'),
        cert: fs.readFileSync('path/to/public/cert')
    }, app);

    export default server;
</pre>

Por fim, com tudo pronto, basta configurar o webhook do bot do telegram. Para isso, irei deixar linkado aqui a documentação do pacote utilizado: [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/usage.md#webhooks)

## NPM
Em relação ao npm, os passos resumem-se a instalar as dependências e executar o script:
<pre>
    npm install
    .
    .
    .
    .
    .
    .
    .
    .
    npm start
</pre>

## Variáveis do ambiente

Nesse bot, como estamos utilizando duas APIs, precisaremos de dois conjuntos de tokens e credenciais diferentes:
<pre>
    TOKEN_API_TELEGRAM
    ROUTE_WEBHOOK
    URL_PUBLICA --> Você pode conseguir isso daqui a partir do Ngrok.
    PORT
    SPEECH_TO_TEXT_APIKEY
    SPEECH_TO_TEXT_IAM_APIKEY
    SPEECH_TO_TEXT_URL
    SPEECH_TO_TEXT_AUTH_TYPE
</pre>