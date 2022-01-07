import express from 'express';

import { categoriesRoute } from './routes/categories.routes';

const app = express();
app.use(express.json());

app.use('/categories', categoriesRoute);

const port = 3333;
app.listen(port, () => console.log(`Server is running on port ${port} !`));
