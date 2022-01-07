import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

const port = 3333;
app.listen(port, () => console.log(`Server is running on port ${port} !`));
