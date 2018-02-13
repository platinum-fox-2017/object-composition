const fs = require('fs')
const options = fs.readFileSync('./cookies.txt','utf8').trim()
// console.log(options);

class Cookie {
  constructor() {
    this.status = 'mentah'
  }
  bake() {
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super()
    this.name = name
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super()
    this.name = name
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super()
    this.name = name
    this.other_count = 150
  }
}

class CookieFactory extends Cookie {
  constructor(name) {
    super()
    this.name = name
    other_count = 150
  }
  static create(options) {
    let array = options.split('\n')
    let newArr = []
    for (var i = 0; i < array.length; i++) {
      if (array[i] === 'chocolate chip') {
        newArr.push(new ChocolateChip(array[i]))
      }
      else if (array[i] === 'peanut butter') {
        newArr.push(new PeanutButter(array[i]))
      }
      else {
        newArr.push(new OtherCookie(array[i]))
      }
    }
    return newArr
  }

}

const batch_of_cookie = CookieFactory.create(options)
console.log(batch_of_cookie);
