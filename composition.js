const fs = require('fs');
const CookiesAndOvens = require('./cookies_and_ovens.js');
const ChocholateChip = CookiesAndOvens.ChocholateChip;
const OtherCookie = CookiesAndOvens.OtherCookie;
const PeanutButter = CookiesAndOvens.PeanutButter;
const Ingredients = require('./ingredients.js');

let options = fs.readFileSync('./cookies.txt','utf8');
options = options.split('\n');

class CookieFactory{
  static create(options){
    let cookies = [];
    for(var i = 0; i < options.length; i++){
      if(options[i] === 'peanut butter')  {
        let ingredient1 =new Ingredients('butter',1,true);
        let ingredient2 =new Ingredients('garam',1,false);
        let ingredients = [ingredient1,ingredient2] ;
        cookies.push(new PeanutButter(ingredients) );
      } else if(options[i] === 'chocolate chip'){
        let ingredient1 = new Ingredients('chocolate',1,false);
        let ingredient2 =new Ingredients('garam',1,false);
        let ingredients = [ingredient1,ingredient2] ;
        cookies.push(new ChocholateChip(ingredients));
      } else if(options[i] != '') {
        let ingredient1 = new Ingredients('sugar',1,true);
        let ingredient2 =new Ingredients('garam',1,false);
        let ingredients = [ingredient1,ingredient2] ;
        cookies.push(new OtherCookie(options[i],ingredients));
      }
    }
    return cookies;
  }
  static cookieRecomendation(day,batch_of_cookies){
    let sugarFreeFoods = [];
    for(var i = 0; i < batch_of_cookies.length; i++){
      if(day === 'tuesday'){
        let isHasSugar = false;
        for(var j = 0; j < batch_of_cookies[i].ingredients.length; j++){
          if(batch_of_cookies[i].ingredients[j].has_sugar){
            isHasSugar = true;
          }
        }
        if(!isHasSugar){
          sugarFreeFoods.push(batch_of_cookies[i]);
        }
      }
    }
    return sugarFreeFoods;
  }
}

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecomendation('tuesday',batch_of_cookies);
for(let i = 0; i < sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i].name)  
}

//module.exports = CookieFactory;
