"use strict"
const fs = require ('fs')

class Cookie {
  constructor(name) {
		this.name = name
		this.status = "mentah"
		this.ingredients = []
  }

  bake() {
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor() {
		super()
		this.name = 'Peanut Butter'
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor() {
		super()
		this.name = 'Chocholcate chip'
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
		super(name)
    this.other_count = 150
  }
}




class CookieFactory {
	constructor(){

	}
  static create(options){
		let arrCookie = []
		let cookieList = options.split('\n')
		let objCookies;
		for(let i =0;i<cookieList.length;i++){
			// console.log('------------'+cookieList[i]+'-----------')
			if(cookieList[i]=== 'peanut butter'){
				objCookies = new PeanutButter()
			}
			else if(cookieList[i]=== 'chocolate chip'){
				objCookies = new ChocholateChip()
			}
			else{
				objCookies = new OtherCookie(cookieList[i])
			}
			arrCookie.push(objCookies)
		}
		
		// console.log(arrCookie)
		return arrCookie
  }
	
}


let options = fs.readFileSync('cookies.txt','utf8')
// console.log(options)
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

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
