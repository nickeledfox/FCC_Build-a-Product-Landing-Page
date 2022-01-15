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
  speed: 50,
  waitUntilVisible: true,
})
  .type("free punks! ", { delay: 1000 })
  .move(-7)
  .delete(1)
  .type(" icp")
  .move(null, { to: "END" })
  .delete(2)
  .type(" : ")
  .move(-8)
  .delete(1)
  .move(-8)
  .go();

new TypeIt("#typeit-4", {
  speed: 55,
  startDelay: 250,
  waitUntilVisible: true,
}).go();

// input
const element = document.querySelector("#email");
const effect = new TypeIt(element, {
  startDelay: 2000,
  speed: 100,
})
  .type("Subscribe")
  .exec(async () => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve();
      }, 600);
    });
  })
  .type(". . .");

element.addEventListener("focus", () => {
  effect.reset();
});

element.addEventListener("blur", (e) => {
  if (!e.target.value.length) {
    effect.go();
  }
});

effect.go();
