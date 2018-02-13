"use strict"
const fs = require ('fs')

class Cookie {
  constructor(name,objIngre) {
		this.name = name
		this.status = "mentah"
		this.ingredients = objIngre
		this.has_sugar = false
  }

  bake() {
    this.status = "selesai dimasak"
	}
	checkSugar(){
		for(let i =0;i<this.ingredients.length;i++){
			if(this.ingredients[i].name.trim() === 'sugar'){
				return this.has_sugar = true
			}
		}
		return this.has_sugar
	}

}

class PeanutButter extends Cookie {
  constructor(name,objIngre) {
		super(name,objIngre)
		this.name = name ||'Peanut Butter'
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name,objIngre) {
		super(name,objIngre)
		this.name = name ||'Chocholcate chip'
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name,objIngre) {
		super(name,objIngre)
    this.other_count = 150
  }
}




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

class Ingredients {
	constructor(name,amount){
		this.name = name
		this.amount = amount
	}
}


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
