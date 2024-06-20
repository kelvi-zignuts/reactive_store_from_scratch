import express from 'express';
import cors from 'cors'; //import the cors (cross-origin resource sharing) middleware, which allows requests from different origins
import { today, thisWeek, thisMonth } from '../posts';

const app = express();
app.use(cors());

//define a route for the '/posts' endpoint that responds to GET requests.
app.get('/posts', (req, res) => {
    console.log(req.query);
    res.json([today, thisWeek, thisMonth]); //send a JSON response containing an array with the toda, thisWeek,thisMonth variable
});

app.listen(8000, () => {
    console.log('Listening on port 8000');
});
