import telegrambot from '../app';
import { Application, Request, Response } from "express";
import '../configs/env';

const rthw: any = process.env.ROUTE_WH;

export default function setRoutes(app: Application): void 
{
    app.post(rthw ,(req: Request, res: Response) =>{
        telegrambot.processUpdate(req.body);
        res.sendStatus(200);
    });

}