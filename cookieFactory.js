
const {PeanutButter, ChocholateChip, OtherCookie, Ingredient} = require('./composition')

class CookieFactory {
    static create(cookies){
    let arrCookies = []
    for(let i =0; i<cookies.length; i++){
       let splitCookie = cookies[i].split('=')
       let cookieName = splitCookie[0].trim()
       let ingredients = splitCookie[1].split(',')
       let arrIngredient =[]
       for(let i =0; i<ingredients.length; i++){
            let splitIngr = ingredients[i].split(':')
            let objIngredient = {
                name :splitIngr[1].trim(),
                amount :splitIngr[0].trim(),
            }
            arrIngredient.push(new Ingredient(objIngredient))
        }
            if(cookieName === 'peanut butter'){
                arrCookies.push(new PeanutButter(cookieName, arrIngredient))
            }else if(cookieName === 'chocolate chip'){
                arrCookies.push(new ChocholateChip(cookieName, arrIngredient))
            }else{
                arrCookies.push(new OtherCookie(cookieName, arrIngredient))
            }
    }
      return arrCookies
    }

    static cookieRecommendation(day, cookies){
      let arrCookies = []
        for(let i=0; i<cookies.length; i++){
          if(cookies[i].has_sugar===false){
            arrCookies.push(cookies[i])
          }
      }
      return arrCookies
    }
}
 

module.exports = CookieFactory