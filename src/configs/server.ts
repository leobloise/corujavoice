import express, {Application} from 'express';
import setRoutes from '../app/routes';

let app: Application = express();

app.use(express.json());
setRoutes(app);

export default app;