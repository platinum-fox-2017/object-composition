let fs = require('fs')
let options = fs.readFileSync('./cookies.txt', 'utf8').toString().replace(/[,]/g, '|').split('\n')

class Cookie {
    constructor(nama, ingredient){
        this.name = nama
        this.status = 'mentah'
        this.ingredients = this.items(ingredient)
        this.has_sugar = this.hasSugar()
    }
    bake (){
        this.status = 'selesai dimask'
    }
    items(ingredient){
        let result = []
        let items = ingredient.split('|')
        for (let i = 0; i < items.length; i++){
            result.push(new Ingredient(items[i]))
        }
        return result
    }
    hasSugar(){
        for (let i = 0; i < this.ingredients.length; i++){
            if (this.ingredients[i].name === 'sugar'){
                return true;
            }
        }
        return false
    }

}

class Ingredient {
    constructor(item){
        this.name = this.nama(item)
        this.amount = this.quantity(item)
    }
    nama (item){
        let dataName = item.split(':').map(x => x.trim())[1]
        return dataName

    }
    quantity (item){
        let amount = item.split(':').map(x => x.trim())[0]
        return amount
    }
}

class PeanutButter extends Cookie {
    constructor(nama, ingredient){
        super(nama, ingredient)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(nama, ingredient){
        super(nama, ingredient)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(nama, ingredient){
        super(nama, ingredient)
        this.other_count = 200
    }
}

class ChocolateChipCrumble extends ChocolateChip {
    constructor(nama, ingredient){
        super(nama, ingredient)
        this.state = 'crumbled'
    }
}

class PeanutButterCrumble extends PeanutButter {
    constructor(nama, ingredient){
        super(nama, ingredient)
        this.state = 'crumbled'
    }
}

class CookieFactory {
    static create(options){
        // accepts a list of cookie types and returns those cookies
        let result = []
        for (let i = 0; i < options.length; i++){
            let recipe = options[i].split('=')
            if (recipe[0].trim().toLowerCase() === 'peanut butter'){
                result.push(new PeanutButter(recipe[0].trim(), recipe[1].trim()))
            } else if (recipe[0].trim().toLowerCase() === 'chocolate chip'){
                result.push(new ChocolateChip(recipe[0].trim(), recipe[1].trim()))
            } else if (recipe[0].trim().toLowerCase() === 'peanut butter crumble'){
                result.push(new PeanutButterCrumble(recipe[0].trim(), recipe[1].trim()))
            } else if (recipe[0].trim().toLowerCase() === 'chocolate chip crumble'){
                result.push(new ChocolateChipCrumble(recipe[0].trim(), recipe[1].trim()))
            }else {
                result.push(new OtherCookie(recipe[0].trim(), recipe[1].trim()))
            }
        }
        return result
    }

    static cookieRecommendation(day, array){
        // mengembalikan array objek2 yang tidak memiliki ingridient sugar
        let result = []
        for (let i = 0; i < array.length; i++){
            if (array[i].has_sugar === false){
                result.push(array[i])
            }
        }
        return result
    }
}

// contoh driver code
// sesuaikan dengan model inheritance
// baca daftar kue dari file dan kirim ke cookie Factory
// di mana lokasi file yang kamu tulis supaya code bisa berjalan?

// Release 0
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)

// Release 1
let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies)
console.log(sugarFreeFoods)
console.log('sugar free cakes are: ')
for (let i = 0; i < sugarFreeFoods.length; i++){
    console.log(sugarFreeFoods[i].name)
}