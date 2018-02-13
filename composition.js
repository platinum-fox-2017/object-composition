const fs  = require('fs')
const options = fs.readFileSync('cookies.txt','UTF-8')

class Cookie{
    constructor(name,inggredients){
        this.name = name
        this.status = 'mentah',
        this.inggredients = inggredients
    }

    bake(){
        this.status = "selesai dimasak"
    }
}

class PeanutButter extends Cookie{
    constructor(name,inggredients){
        super(name,inggredients)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie{
    constructor(name,inggredients){
        super(name,inggredients)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie{
    constructor(name,inggredients){
        super(name,inggredients)
        this.other_count = 150
    }
}

class Ingrediens{
    constructor(options){
        this.name = options['name']
        this.amount = options['amount']
        this.has_sugar= options['has_sugar']
    }
}

class CookieFactory{
    constructor(){
    }

    static create(options){
        let collection = []
        let splitDataRaw = options.split("\n")
        let newProduct;
        const createClass = splitDataRaw.map(each =>{
            
            let split = each.split("=")
            let slice = split.slice(1,split.length)
            if(split[0].trim() === 'peanut butter'){
                let inggredients = CookieFactory.parsingInggredients(slice)
                newProduct = new PeanutButter(split[0].trim(),inggredients)
                collection.push(newProduct)
                
            }else if(split[0].trim() === 'chocolate chip'){
                let inggredients = CookieFactory.parsingInggredients(slice)
                newProduct = new ChocolateChip(split[0].trim(),inggredients)
                collection.push(newProduct)
            }else{
                let inggredients = CookieFactory.parsingInggredients(slice)
                newProduct = new OtherCookie(split[0].trim(),inggredients)
                collection.push(newProduct)
            }
        })
        return collection
    }

    static parsingInggredients(data){
        let split = data[0].split(',')
        
        let combine = []
        for(let [index,value] of split.entries()){
            let newValue = value.split(':')
            let obj = {}
            let count = 0
            for(let [index,value] of newValue.entries()){
                
                if(index === 0){
                    obj['amount'] = value.trim()
                    if(value.indexOf('gluten') !== -1){
                        obj['has_sugar'] = false
                        count++
                    }
                }else{
                    obj['name'] = value.trim()
                    if(value.indexOf('sugar') !== -1 && count === 0){
                        obj['has_sugar'] = true
                    }else if(count === 0){
                        obj['has_sugar'] = false
                    }
                }
            }
            count = 0
            let inggredients = new Ingrediens(obj)
            combine.push(inggredients)
        }

        // console.log(combine)
        return combine
    }

    static cookieRecommendation(day,batch_of_cookies){
        let hasil = []
        for(let [index,value] of batch_of_cookies.entries()){
            let count = 0
            for(let [index,value2] of value.inggredients.entries()){
                if(value2.has_sugar === true){
                    count++
                }
            }
            if(count === 0){
                hasil.push(value)
            }
        }
        return hasil
            
        
        // console.log(getSugarFree)
    }
}

let batch_of_cookies = CookieFactory.create(options)
let sugarFreeFoods = CookieFactory.cookieRecommendation('Tuesday',batch_of_cookies)

const sugarFree = sugarFreeFoods.map(each =>{
    return each.name
})
console.log(sugarFree)


