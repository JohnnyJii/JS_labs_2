let x = prompt("numerator");
let y = prompt("denumerator");

function gcd(x, y) {
  if (y == 0)
  {return x;}
    else {
  var remainder = x%y;
  return gcd(y, remainder);
  }
}

document.write(gcd(x, y));
