let fs = require('fs')
let options = fs.readFileSync('./cookies.txt', 'utf8').toString().split('\n')

class Cookie {
    constructor(nama){
        this.name = nama
        this.status = 'mentah'
        this.ingredients = []
    }

    bake (){
        this.status = 'selesai dimask'
    }
}

class PeanutButter extends Cookie {
    constructor(nama){
        super(nama)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(nama){
        super(nama)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(nama){
        super(nama)
        this.other_count = 200
    }
}


class CookieFactory {
    static create(options){
        // accepts a list of cookie types and returns those cookies
        let result = []
        for (let i = 0; i < options.length; i++){
            if (options[i].toLowerCase().trim() === 'peanut butter'){
                result.push(new PeanutButter(options[i]))
            } else if (options[i].toLowerCase().trim() === 'chocolate chip'){
                result.push(new ChocolateChip(options[i]))
            } else {
                result.push(new OtherCookie(options[i]))
            }
        }
        return result
    }

    // define other methods as needed
}

// contoh driver code
// sesuaikan dengan model inheritance
// baca daftar kue dari file dan kirim ke cookie Factory
// di mana lokasi file yang kamu tulis supaya code bisa berjalan?

// Release 0
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)