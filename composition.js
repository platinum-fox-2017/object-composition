"use strict"
const fs = require ('fs')

class Cookie {
  constructor(name,objIngre) {
		this.name = name
		this.status = "mentah"
		this.ingredients = objIngre
		this.has_sugar = true
  }

  bake() {
    this.status = "selesai dimasak"
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
			// console.log(cookieList[i].split('='),"---------")
			let splitCookieName = cookieList[i].split('=')
			// console.log('--------'+splitCookieName[0].trim()+'-----nameeee')
			let splitIngredients = splitCookieName[1].split(',')
			// console.log(splitIngredients,"-------")
			let arrIngre = []
			for(let j=0;j<splitIngredients.length;j++){
				// console.log(splitIngredients[j].split(':'),'ingre')
				let cookieIngre = splitIngredients[j].split(':')
				// console.log('----'+cookieIngre[1].trim()+'-----------')
				
				// if(cookieIngre[1].trim()=== 'sugar'){
				// 	let objIngeCookie = new Ingredients(cookieIngre[1],cookieIngre[0],true)
				// 	arrIngre.push(objIngeCookie)
				// }else{
				// 	let objIngeCookie = new Ingredients(cookieIngre[1],cookieIngre[0],false)
				// 	arrIngre.push(objIngeCookie)
				// }
				// console.log(arrIngre)
				let objIngeCookie = new Ingredients(cookieIngre[1],cookieIngre[0])
					arrIngre.push(objIngeCookie)
			}
				if(splitCookieName[0].trim() === 'peanut butter'){
					// console.log(arrIngre,'peanut---------------')
					let objCookies = new PeanutButter(splitCookieName[0].trim(),arrIngre)
					console.log(objCookies,'ini masuk')
					arrCookie.push(JSON.stringify(objCookies))
				}
				else if(splitCookieName[0].trim() === 'chocolate chip'){
					// console.log(arrIngre,'chocolatechip---------------')
					let objCookies = new ChocholateChip(splitCookieName[0].trim(),arrIngre)
					arrCookie.push(objCookies)
				}
				else{
					// console.log(arrIngre,'other---------------')
					let objCookies = new OtherCookie(splitCookieName[0].trim(),arrIngre)
					arrCookie.push(objCookies)
				}
				// console.log(arrCookie)
		}
		return arrCookie
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
console.log(batch_of_cookies);


// let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
// console.log("sugar free cakes are :");
// for(let i = 0; i < sugarFreeFoods.length; i++){
//   console.log(sugarFreeFoods[i].name);
// }

// Contoh result nya :
// [ PeanutButter {
//     name: 'peanut butter',
//     status: 'mentah',
//     ingredients: [],
//     peanut_count: 100 },
//   ChocholateChip {
//     name: 'chocolate chip',
//     status: 'mentah',
//     ingredients: [],
//     choc_chip_count: 200 },
//   OtherCookie {
//     name: 'chocolate cheese',
//     status: 'mentah',
//     ingredients: [],
//     other_count: 150 },
//   OtherCookie {
//     name: 'chocolate butter',
//     status: 'mentah',
//     ingredients: [],
//     other_count: 150 } ]
