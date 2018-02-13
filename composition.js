"use strict"
// kodenya terasa barbar
class Cookie {
  constructor(name) {
    this.name = name;
    this.status = 'mentah';
    this.ingredients = this.composition();
  }



  composition(){
    let array = [];
    for(let i=0; i<ingred.length; i++){
      let pisah = ingred[i].split(',');
      if(pisah[0]===this.name){
        for(let c=1; c<pisah.length; c++){
          array.push(pisah[c]);
        }
      }
    }
    return array;
  }

}

class PeanutButter extends Cookie {
  constructor(name) {
    super(name);
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super(name);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name);
    this.other_count = 150;
  }
}

class CookieFactory {
  static create(options){
    let array = [];
    for(let i=0; i<options.length-1; i++){
      if(options[i]==='peanut butter'){
        let peanut = new PeanutButter(options[i]);
        array.push(peanut);
      } else if(options[i]==='chocolate chip'){
        let choc = new ChocolateChip(options[i]);
        array.push(choc);
      } else {
        let other = new OtherCookie(options[i]);
        array.push(other);
      }
    }
    return array;
  }
}

class NoSugar {
  static no_sugar(){
    let cookie = CookieFactory.create(options);
    let withSugar = [];
    for(let b=0; b<cookie.length; b++){
      for(let v=0; v<cookie[b].ingredients.length; v++){
        if(cookie[b].ingredients[v]==='sugar'){
          withSugar.push(cookie[b].name);
        }
      }
    }
    return `If you want to eat no-sugar cookies on Tuesday, you can eat all cookies except ${withSugar}!`;
  }
}

var fs = require('fs');
var options = fs.readFileSync('cookies.txt','UTF-8')
  .split('\n');
var ingred = fs.readFileSync('ingredients.txt','UTF-8')
  .split('\n');

let batch_of_cookies = CookieFactory.create(options);
//liat daftar kue dan komposisinya
console.log(batch_of_cookies);
let nosugar = NoSugar.no_sugar();
// //rekomendasi makanan yang tidak mengandung gula
console.log('---------------------------')
console.log(nosugar);
