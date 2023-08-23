import express from 'express';
import logger from '@config/logger';

const app = express();

app.get('/', (req, res) => {
    res.send("YO");
});

app.listen(9000, () => {
    logger.info("Listening on port 9000");
    console.log("Listening on port 9000");
});