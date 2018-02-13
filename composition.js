class Cookie {
  constructor(name) {
    this.name = name
    this.status = "mentah"
    this.ingredients = []
  }

  bake(){
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie{
  constructor(name){
    super(name)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie{
  constructor(name){
    super(name)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie{
  constructor(name){
    super(name)
    this.other_count = 150
  }
}

// let kacang = new PeanutButter('kueKacang')
// console.log(kacang);
// let cokelat = new ChocolateChip('cokelat')
// console.log(cokelat);
// let nastar = new OtherCookie('nastar')
// console.log(nastar);

module.exports = {Cookie,PeanutButter,ChocolateChip,OtherCookie}
