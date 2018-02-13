"use strict"

class Cookie {
  constructor(name) {
    this.name = name;
    this.status = 'mentah';
    this.ingredients = [];
  }

  bake() {
    this.status = 'selesai dimasak';
  }

}

class PeanutButter extends Cookie {
  constructor(name) {
    super();
    this.name = name;
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super();
    this.name = name;
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super()
    this.name = name;
    this.other_count = 150;
  }
}

class CookieFactory {
  static create(options){
    let array = [];
    for(let i=0; i<options.length-1; i++){
      if(options[i]==='peanut butter'){
        var peanut = new PeanutButter(options[i]);
        array.push(peanut);
      } else if(options[i]==='chocolate chip'){
        var choc = new ChocolateChip(options[i]);
        array.push(choc);
      } else {
        var other = new OtherCookie(options[i]);
        array.push(other);
      }
    }
    return array;
  }
  // define other method as needed
}

var fs = require('fs');
var options = fs.readFileSync('cookies.txt', 'UTF-8')
  .split('\n');

// sesuaikan dengan model inheritance
// baca daftar kue dari file dan kirim ke cookie factory
// dimana lokasi file yang kamu tulis supaya kode bisa berjalan?
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
// var peanut = new PeanutButter();
// console.log(options[3]);
