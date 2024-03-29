import Location from "../models/location";

export const LOCATIONS = [
  new Location(
    "loc1",
    { latitude: 47.659229, longitude: -122.350251 },
    "Pecado Bueno - Fremont",
    "Mexican Restaurant",
    "2020-11-10",
    "freeway-1"
  ),

  new Location(
    "loc2",
    { latitude: 47.641316, longitude: -122.32578 },
    "Pecado Bueno - Eastlake",
    "Mexican Restaurant",
    "2020-11-09",
    "air-hum"
  ),
  new Location(
    "loc3",
    { latitude: 47.692788, longitude: -122.34508 },
    "House",
    "Someone actually lives here",
    "2020-11-07",
    "freeway-1"
  ),
  new Location(
    "loc4",
    { latitude: 47.620422, longitude: -122.349358 },
    "Space Needle",
    "Iconic observation tower in Seattle",
    "2020-11-05",
    "airport-gate-1"
  ),
];
