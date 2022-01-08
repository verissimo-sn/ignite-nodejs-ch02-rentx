import express from 'express';

import { categoriesRoute } from './routes/categories.routes';
import { specificationsRoutes } from './routes/specifications.routes';

const app = express();
app.use(express.json());

app.use('/categories', categoriesRoute);
app.use('/specifications', specificationsRoutes);

const port = 3333;
app.listen(port, () => console.log(`Server is running on port ${port} !`));
