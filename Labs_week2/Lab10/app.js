function rndIntFromTo (from, to) {
  min = Math.ceil(from);
  max = Math.floor(to);
  return Math.floor(Math.random() * 9 ) + 1;
}

console.log(rndIntFromTo());