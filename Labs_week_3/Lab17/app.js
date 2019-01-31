class Marker {
  constructor () {
    this._capOn = true;
    this._inkLeft = 10;
  }

  putCapOn () {
    this._capOn = true;
  }

  takeCapOff () {
    this._capOff = false;
  }

  write () {
    if (!this._capOn && this._inkLeft >= 1 ) {
      this._inkLeft--;
      return true;
    } else {
      return false;
    }

  }

}

