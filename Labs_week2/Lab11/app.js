let Array = [];
for (let n = 0; n < 100; n++) {
  let rndNumber = Math.floor(Math.random() * 100) + 1;
  Array.push(rndNumber);
  n++;
}

let random = Math.floor((Math.random() * 200) + 1);
let newArray = [];

function pickn(a) {
  a = Array;
  for (let i = 0; i < random; i++) {
    let random = a[Math.floor(Math.random() * a.length)];
    newArray.push(random);
  }
  return Array;
}

console.log(Array);
console.log(pickn(newArray));

