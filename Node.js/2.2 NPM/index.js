// console.log("Hello from NPM");
// var generateName = require("sillyname");

import generateName from "sillyname";

import { randomSuperhero } from "superheroes";

var sillyName = generateName();

console.log(`I am known as ${sillyName}`);

const superName = randomSuperhero();

console.log(`My superhero name is ${superName}!`);
