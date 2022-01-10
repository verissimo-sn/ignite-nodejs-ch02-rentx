import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { router } from './routes';
import swaggerConf from './swagger.json';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConf));

app.use(router);

const port = 3333;
app.listen(port, () => console.log(`Server is running on port ${port} !`));
