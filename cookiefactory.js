const Ingredients = require ('./ingredient')
const PeanutButter = require ('./peanut_butter')
const ChocholateChip = require ('./chocholatechip')
const OtherCookie = require ('./othercookie')

class CookieFactory {
	constructor(){

	}
  static create(options){
		let arrCookie = []
		let cookieList = options.split('\n')
		for(let i =0;i<cookieList.length;i++){
			let splitCookieName = cookieList[i].split('=')
			let splitIngredients = splitCookieName[1].split(',')
			let arrIngre = []
			for(let j=0;j<splitIngredients.length;j++){
				let cookieIngre = splitIngredients[j].split(':')
				let objIngeCookie = new Ingredients(cookieIngre[1],cookieIngre[0])
					arrIngre.push(objIngeCookie)
			}
			if(splitCookieName[0].trim() === 'peanut butter'){
				let objCookies = new PeanutButter(splitCookieName[0].trim(),arrIngre)
				objCookies.checkSugar()
				// console.log(objCookies.checkSugar(),'ini masuk')//
				arrCookie.push(objCookies)
			}
			else if(splitCookieName[0].trim() === 'chocolate chip'){
				let objCookies = new ChocholateChip(splitCookieName[0].trim(),arrIngre)
				objCookies.checkSugar()
				arrCookie.push(objCookies)
			}
			else{
				let objCookies = new OtherCookie(splitCookieName[0].trim(),arrIngre)
				objCookies.checkSugar()
				arrCookie.push(objCookies)
			}
		}
		return arrCookie
	}

	static cookieRecommendation(day,cookies){
		let freeSugar = []
		for(let i =0;i<cookies.length;i++){
			// console.log(cookies[i].has_sugar,'has sugar???????')
			if(cookies[i].has_sugar === false){
				// console.log(cookies[i].name)
				freeSugar.push(cookies[i])
			}
		}
		// console.log(freeSugar[0].name)
		return freeSugar

	}
}

module.exports = CookieFactory