function orbitalPeriod(arr) {
  return arr.map(satellite => ({name: satellite.name, orbitalPeriod: convertAltituteToOrbitalPeriod(satellite.avgAlt)}));
}

function convertAltituteToOrbitalPeriod(altitude) {
  const GM = 398600.4418;
  const earthRadius = 6367.4447;
  return Math.round(2.0 * Math.PI * Math.sqrt(Math.pow(earthRadius + altitude, 3) / GM));
}

console.log(JSON.stringify(orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}])) +"=="+ JSON.stringify([{name: "sputnik", orbitalPeriod: 86400}]));
console.log(JSON.stringify(orbitalPeriod([{name: "iss", avgAlt: 413.6}, {name: "hubble", avgAlt: 556.7}, {name: "moon", avgAlt: 378632.553}])) +"=="+ JSON.stringify([{name : "iss", orbitalPeriod: 5557}, {name: "hubble", orbitalPeriod: 5734}, {name: "moon", orbitalPeriod: 2377399}]));

