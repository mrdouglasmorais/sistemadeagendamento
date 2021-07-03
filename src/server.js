
import cors from 'cors';
import app from './app';

const PORT = process.env.PORT || 3000;
app.use(cors)
app.listen(PORT);