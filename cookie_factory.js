
class CookieFactory {
  constructor() {
    // this.batch_of_cookies = 0
  }
  static create(options){
    let batch = []
    for (let i = 0; i < options.length; i++) {
      if (options[i] === 'peanut butter') {
        // console.log('PeanutButter');
        batch.push(new PeanutButter(options[i]))
      } else if (options[i] === 'chocolate chip') {
        // console.log('ChocolateChip');
        batch.push(new ChocolateChip(options[i]))
      } else {
        // console.log('OtherCookie');
        batch.push(new OtherCookie(options[i]))
      }
    }
    return batch
  }

}

module.exports ={
  CookieFactory : CookieFactory
}
