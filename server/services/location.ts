import config from '../config';
import axios from 'axios';

// Maping only needed data
export type UserLocation = {
    country: string,
    countryCode: string,
    city: string,
}

class LocationService {
    baseUrl = config.rest.location
    constructor(){}
    getLocation(ip: string) {
        return axios.get<UserLocation>(this.baseUrl.concat(ip));
    }
}

export default new LocationService;