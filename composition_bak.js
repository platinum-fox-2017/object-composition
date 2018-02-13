"use strict"

const fs = require('fs')
const options = fs.readFileSync('./cookies.txt', 'utf8').trim().split('\n')

class Cookie{
    constructor(name){
        this._name = name
        this._status = 'mentah'
        this._ingredients = []
    }

    bake(){
        this._status = 'selesai dimasak'
    }
}

class PeanutButter extends Cookie{
    constructor(name){
        super(name)
        this._taste = 'coklat kacang'
        this._peanut_count = 100
    }

}

class ChocolateChip extends Cookie{
    constructor(name){
        super(name)
        this._choc_chip_count = 200
    }
}

class OtherCookie extends Cookie{
    constructor(name){
        super(name)
        this._other_count = 150
    }
}

class CookieFactory{
    static create(options){
        let data = []
        for(let i=0; i<options.length; i++){
            if(options[i] === 'peanut butter'){
                data.push(new PeanutButter(options[i]))
            }
            else if(options[i] === 'chocolate chip'){
                data.push(new ChocolateChip(options[i]))
            }
            else{
                data.push(new OtherCookie(options[i]))
            }
        }
        return data

    }
}



let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)

// console.log(options)
// let peanut = new PeanutButter(100)
// console.log(peanut)

// let other = new OtherCookie(150)
// console.log(other)
