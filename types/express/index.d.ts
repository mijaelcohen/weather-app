import { UserLocation } from "../../server/services/location";

// extend express response interface
declare namespace Express {
   export interface Response {
      user_location?: UserLocation
   }
}
