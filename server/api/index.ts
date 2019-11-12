import  express = require('express');
import LocationMiddleware from './location.middleware';
import WeatherService from '../services/weather';

const apiRouter = express.Router();

apiRouter.get('/location', [ LocationMiddleware, (
    req: any,
    res: any,
    next: any) => {
        if(res.user_location.status === "fail"){
            res.statusCode = 400;
        }
        res.send(res.user_location);
}]);

apiRouter.get('/current/:city', (req: express.Request, res: any, next: any) => {
    const city = req.params.city || res.user_location.country || null;
    if(city){
        WeatherService.getCurrentWeather(city)
        .then((response)=>{
            res.send(response.data);
        }).catch((error)=>{
            res.statusCode = 400;
            res.send(error);
        });
    }else{
        res.send({
            error: "couldnt get a city"
        })
    }
})

apiRouter.get('/forecast/:city', (req: express.Request, res: any, next: any) => {
    const city = req.params.city || res.user_location.country || null;
    if(city){
        WeatherService.getForecast(city)
        .then((response) => {
            res.send(response.data);
        }).catch((error) => {
            res.statusCode = 400;
            res.send(error);
        });
    }else{
        res.send({
            error: "couldnt get a city"
        })
    }
})

export default apiRouter;