/* eslint-disable no-undef */
export default class TypeWriter {
  constructor (words, options = {}) {
    this.typed = ''
    this.currentIndex = 0
    this.words = words.length > 0 ? words : ['TypeWriter']
    this.typeInterval = options.typeInterval || 300
    this.delInterval = options.delInterval || 100
    this.timer = null
  }

  get target () {
    return this.words[this.currentIndex]
  }

  /*
   * 1: need to type
   * 0: equal
   * -1: need to delete
  */
  get diff () {
    let common = ''
    for (let i = 0; i < this.typed.length; i++) {
      if (i >= this.target.length || this.typed[i] !== this.target[i]) break
      common += this.target[i]
    }

    if (common.length < this.typed.length) return -1
    if (this.target.length > common.length) return 1
    return 0
  }

  update (callback = () => {}) {
    let delay = this.typeInterval

    switch (this.diff) {
      case -1:
        this.typed = this.typed.substring(0, this.typed.length - 1)
        delay = this.delInterval
        break;
      case 1:
        this.typed += this.target[this.typed.length]
        break
      default:
        this.currentIndex = (this.currentIndex + 1) % this.words.length
        break
    }

    callback(this.typed)
    this.nextTick(delay, callback)
  }

  nextTick (delay, callback) {
    this.timer = setTimeout(() => {
      this.update(callback)
    }, delay);
  }

  destroy () {
    clearTimeout(this.timer)
  }
}
