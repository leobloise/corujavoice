import https from 'https';
import fs from 'fs';
import app from './server';

const server = https.createServer({
    key: fs.readFileSync('src/configs/server.key'),
    cert: fs.readFileSync('src/configs/server.cert')
}, app);

export default server;