import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import appConfig from  './config/app';

const app = express();
const port = appConfig.app.port

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Server started on port ${port}`));
