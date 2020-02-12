class Vector2d {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  static fromPCS (length, radian) {
    const x = Math.cos(radian) * length
    const y = Math.sin(radian) * length
    return new Vector2d(x, y)
  }

  clone () {
    return new Vector2d(this.x, this.y)
  }

  scale (ratio) {
    this.x *= ratio
    this.y *= ratio
  }

  get length () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }

  // angle in radians
  get angle () {
    return Math.atan2(this.y, this.x)
  }

  set angle (radian) {
    const length = this.length
    this.x = length * Math.cos(radian)
    this.y = length * Math.sin(radian)
  }

  // angle in degree
  get deg () {
    return this.angle * (180 / Math.PI)
  }

  set deg (degree) {
    this.angle = degree / 180 * Math.PI
  }
}

export default Vector2d
