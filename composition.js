"use strict"
const fs = require ('fs')
const Cookie = require('./cookie')
const CookieFactory = require('./cookiefactory')


let options = fs.readFileSync('cookies.txt','utf8')
// console.log(options)
let batch_of_cookies = CookieFactory.create(options);
// console.log(batch_of_cookies);


let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
console.log("sugar free cakes are :");
for(let i = 0; i < sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i].name);
}
// console.log(sugarFreeFoods)
