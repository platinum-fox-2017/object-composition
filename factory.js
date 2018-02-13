const {Cookie,PeanutButter,ChocolateChip,OtherCookie} = require ('./composition')
const fs = require ('fs')

class CookieFactory{
  static create(options){
    let batchOfCookies = []
    for(let i =0;i<options.length;i++){
      let cookie = {}
      if(options[i] == 'peanut butter'){
        cookie = new PeanutButter(options[i])
      } else if(options[i] == 'chocolate chip') {
        cookie = new ChocolateChip(options[i])
      } else {
        cookie = new OtherCookie(options[i])
      }
      console.log(cookie);
      batchOfCookies.push(cookie)
    }
    return batchOfCookies
  }
}


let options = fs.readFileSync('cookies.txt','UTF-8').trim().split('\n')
// console.log(options);
let kueh = CookieFactory.create(options)
console.log(kueh);
