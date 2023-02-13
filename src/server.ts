import express from 'express';
import 'express-async-errors';
import { router } from './routes';
import { handlingErrors } from './middlewares/HandlingErrors';
const PORT = 3333;
const app = express();

app.use(express.json());

app.use('/api',router);

app.use(handlingErrors);

app.listen(PORT, () => {
    console.log(`server running, na porta ${PORT}`);
});