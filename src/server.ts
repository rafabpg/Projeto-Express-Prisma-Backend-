import express from 'express';
import { router } from './routes';
const PORT = 3333;
const app = express();

app.use(express.json());

app.use('/api',router);

app.listen(PORT, () => {
    console.log(`server running, na porta ${PORT}`);
});