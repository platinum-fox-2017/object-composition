"use strict";
const fs = require('fs')
const objCookie = require('./composition')
const Cookie = objCookie.Cookie
const PeanutButter = objCookie.PeanutButter
const ChocholateChip = objCookie.ChocholateChip
const OtherCookie = objCookie.OtherCookie

class CookieFactory {
  static create() {
    let data = fs.readFileSync('./cookies.txt', 'utf8').split('\r\n');
    let arrCookies = []
    for(let i = 0; i < data.length; i++) {
      let cookie;
      if(data[i] === 'peanut butter') {
        cookie = new PeanutButter(data[i]);
      } else if(data[i] === 'chocolate chip') {
        cookie = new ChocholateChip(data[i]);
      } else {
        cookie = new OtherCookie(data[i]);
      }
      arrCookies.push(cookie)
    }
    return arrCookies;
  }
  // define other methods as needed
}

let batch_of_cookies = CookieFactory.create();
console.log(batch_of_cookies);

// var data = fs.readFileSync('./cookies.txt', 'utf8').split('\r\n');
// console.log(data.length)
// let my_cookie = new Cookie()
// let peanut_butter = new PeanutButter()
// let choco_chip = new ChocholateChip()