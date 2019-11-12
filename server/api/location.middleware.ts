import express = require('express');
import LocationService from '../services/location';

const LocationMiddleware = (req: any, res: any, next: any) => {
    const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    LocationService.getLocation(ip).then((response) => {
        res.user_location = response.data;
        next();
    })
    .catch((error)=>{
        next();
    })
}

export default LocationMiddleware;