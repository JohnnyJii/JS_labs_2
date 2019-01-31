Array.prototype.swap = (function() {
  let i = 0, j = 1;
  try {
    [i, j] = [j, i];
  }
  catch (e) {
  }
  if (i) {
    return function(i, j) {
      [this[i], this[j]] = [this[j], this[i]];
      return this;
    };
  } else {
    return function(i, j) {
      let temp = this[i];
      this[i] = this[j];
      this[j] = temp;
      return this;
    };
  }
})();

Array.prototype.pick = function(n) {
  if (!n || !this.length) return [];
  let i = Math.floor(this.length * Math.random());
  return this.splice(i, 1).concat(this.pick(n - 1));
};

function pick(low, high, step) {
  let a = [], i = high;
  while (i >= low) a.push(i--);
  return a.pick(step);
}

console.log(pick(1, 40, 7));