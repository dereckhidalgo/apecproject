import express from 'express';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import  {authValidator} from './middlewares/authValidation';

const app = express();
const PORT = process.env.PORT || 3000;
const mainPath = '/api/v1';

app.use(express.json());

app.use(`${mainPath}/auth`, authRouter);
app.use(`${mainPath}/users`,authValidator, userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${mainPath}`);
});