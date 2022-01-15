import TypeIt from "typeit";

new TypeIt("#title", {
  speed: 50,
  waitUntilVisible: true,
}).go();

new TypeIt("#typeit-1", {
  speed: 55,
  startDelay: 2100,
  cursor: false,
  waitUntilVisible: true,
}).go();

new TypeIt("#typeit-2", {
  speed: 65,
  startDelay: 250,
  cursor: false,
  waitUntilVisible: true,
}).go();

new TypeIt("#typeit-3", {
  speed: 75,
  waitUntilVisible: true,
}).go();

new TypeIt("#typeit-4", {
  speed: 100,
  cursor: false,
  waitUntilVisible: true,
}).go();
