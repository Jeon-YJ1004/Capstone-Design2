import React from "react";

const celestialJson = [
  {
    index: 0,
    cameraX: 150,
    sizeFactor: 5,
    orbitFactor: 110,
    name: "Mercury",
    image: require("./img/8k_mercury.jpg"),
    mass: 0.33,
    ellipticity: 0.0,
    diameter: 4879,
    density: 5427,
    gravity: 3.7,
    escapeVelocity: 4.3,
    rotationPeriod: 1407.6,
    lengthOfDay: 4222.6,
    distanceFromSun: 57.9,
    perihelion: 46.0,
    aphelion: 69.8,
    orbitalPeriod: 88.0,
    orbitalVelocity: 47.4,
    orbitalInclination: 7.0,
    orbitalEccentricity: 0.205,
    obliquityToOrbit: 0.01,
    meanTemperature: 167,
    numberOfSatellites: 0,
  },
  {
    index: 1,
    cameraX: 372,
    sizeFactor: 7,
    orbitFactor: 120,
    name: "Venus",
    image: require("./img/8k_venus_surface.jpg"),
    mass: 4.87,
    ellipticity: 0.0,
    diameter: 12104,
    density: 5243,
    gravity: 8.9,
    escapeVelocity: 10.4,
    rotationPeriod: -5832.5,
    lengthOfDay: 2802.0,
    distanceFromSun: 108.2,
    perihelion: 107.5,
    aphelion: 108.9,
    orbitalPeriod: 224.7,
    orbitalVelocity: 35.0,
    orbitalInclination: 3.4,
    orbitalEccentricity: 0.007,
    obliquityToOrbit: 177.4,
    meanTemperature: 464,
    numberOfSatellites: 0,
  },
  {
    index: 2,
    cameraX: 388,
    sizeFactor: 7,
    orbitFactor: 150,
    name: "Earth",
    image: require("./img/8k_earth_daymap.jpg"),
    mass: 5.97,
    ellipticity: 0.00335,
    diameter: 12756,
    density: 5514,
    gravity: 9.8,
    escapeVelocity: 11.2,
    rotationPeriod: 23.9,
    lengthOfDay: 24.0,
    distanceFromSun: 149.6,
    perihelion: 147.1,
    aphelion: 152.1,
    orbitalPeriod: 365.2,
    orbitalVelocity: 29.8,
    orbitalInclination: 0.0,
    orbitalEccentricity: 0.017,
    obliquityToOrbit: 23.4,
    meanTemperature: 15,
    numberOfSatellites: 1,
  },
  {
    index: 3,
    cameraX: 590,
    sizeFactor: 7,
    orbitFactor: 140,
    name: "Mars",
    image: require("./img/8k_mars.jpg"),
    mass: 0.642,
    ellipticity: 0.00589,
    diameter: 6792,
    density: 3933,
    gravity: 3.7,
    escapeVelocity: 5.0,
    rotationPeriod: 24.6,
    lengthOfDay: 24.7,
    distanceFromSun: 227.9,
    perihelion: 206.6,
    aphelion: 249.2,
    orbitalPeriod: 687.0,
    orbitalVelocity: 24.1,
    orbitalInclination: 1.9,
    orbitalEccentricity: 0.094,
    obliquityToOrbit: 25.2,
    meanTemperature: -65,
    numberOfSatellites: 2,
  },
  {
    index: 4,
    cameraX: 2017,
    sizeFactor: 30,
    orbitFactor: 80,
    name: "Jupiter",
    image: require("./img/8k_jupiter.jpg"),
    mass: 1898,
    ellipticity: 0.06487,
    diameter: 142984,
    density: 1326,
    gravity: 23.1,
    escapeVelocity: 59.5,
    rotationPeriod: 9.9,
    lengthOfDay: 9.9,
    distanceFromSun: 778.6,
    perihelion: 740.5,
    aphelion: 816.6,
    orbitalPeriod: 4331,
    orbitalVelocity: 13.1,
    orbitalInclination: 1.3,
    orbitalEccentricity: 0.049,
    obliquityToOrbit: 3.1,
    meanTemperature: -120,
    numberOfSatellites: 67,
  },
  {
    index: 5,
    cameraX: 3714,
    sizeFactor: 30,
    orbitFactor: 80,
    name: "Saturn",
    image: require("./img/8k_saturn.jpg"),
    mass: 568,
    ellipticity: 0.09796,
    diameter: 120536,
    density: 687,
    gravity: 9.0,
    escapeVelocity: 35.5,
    rotationPeriod: 10.7,
    lengthOfDay: 10.7,
    distanceFromSun: 1433.5,
    perihelion: 1352.6,
    aphelion: 1514.5,
    orbitalPeriod: 10.747,
    orbitalVelocity: 9.7,
    orbitalInclination: 2.5,
    orbitalEccentricity: 0.057,
    obliquityToOrbit: 26.7,
    meanTemperature: -140,
    numberOfSatellites: 62,
  },
  {
    index: 6,
    cameraX: 7442,
    sizeFactor: 30,
    orbitFactor: 50,
    name: "Uranus",
    image: require("./img/2k_uranus.jpg"),
    mass: 86.8,
    ellipticity: 0.02293,
    diameter: 51118,
    density: 1271,
    gravity: 8.7,
    escapeVelocity: 21.3,
    rotationPeriod: -17.2,
    lengthOfDay: 17.2,
    distanceFromSun: 2872.5,
    perihelion: 2741.3,
    aphelion: 3003.6,
    orbitalPeriod: 30.589,
    orbitalVelocity: 6.8,
    orbitalInclination: 0.8,
    orbitalEccentricity: 0.046,
    obliquityToOrbit: 97.8,
    meanTemperature: -195,
    numberOfSatellites: 27,
  },
  {
    index: 7,
    cameraX: 11645,
    sizeFactor: 30,
    orbitFactor: 40,
    name: "Neptune",
    image: require("./img/2k_neptune.jpg"),
    mass: 102,
    ellipticity: 0.01708,
    diameter: 49528,
    density: 1638,
    gravity: 11.0,
    escapeVelocity: 23.5,
    rotationPeriod: 16.1,
    lengthOfDay: 16.1,
    distanceFromSun: 4495.1,
    perihelion: 4444.5,
    aphelion: 4545.7,
    orbitalPeriod: 59.8,
    orbitalVelocity: 5.4,
    orbitalInclination: 1.8,
    orbitalEccentricity: 0.011,
    obliquityToOrbit: 28.3,
    meanTemperature: -200,
    numberOfSatellites: 14,
  },
];
export default celestialJson;

// https://nssdc.gsfc.nasa.gov/planetary/planetfact.html 참고
