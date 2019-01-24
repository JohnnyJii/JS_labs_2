const intRange = (low, high, step) => {
  const newArray = [];
  for ( let i = low; i <= high; i = i + step ) {
    pickRnd(newArray, 7) {
      rnd = randomArray(0, arr.lenght -1);
      picked = new Set();
        while (picked.size < 7) {
          picked.add(rnd());
        }
    }
    newArray.push(i);
  }
  return newArray;
};

console.log(intRange(1, 40, 1));

