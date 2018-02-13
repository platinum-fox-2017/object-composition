// Your code here

class Cookie {
  constructor(ingredients)  {
    this.status = 'mentah';
    this.ingredients = ingredients;
  }
  bake(){
    this.status = "selesai dimasak";
  }
}

class PeanutButter extends Cookie {
  constructor(ingredients){
    super(ingredients);
    this.name = 'peanut butter';
    this.peanut_conut = 100;  
  }
}
class PeanutButterCrumbled extends Cookie {
  constructor(ingredients){
    super(ingredients);
    this.name = 'peanut butter crumbled';
    this.peanut_conut = 100;  
  }
}
class ChocholateChip extends Cookie {
  constructor(ingredients){
    super(ingredients);
    this.name = 'chocolate chip';
    this.choc_chip_count = 200;  
  }
}
class ChocholateChipCrumbled extends Cookie {
  constructor(ingredients){
    super(ingredients);
    this.name = 'chocolate chip crumbled';
    this.choc_chip_count = 200;  
  }
}

class OtherCookie extends Cookie {
  constructor(name,ingredients){
    super(ingredients);
    this.name = name;
    this.other_count = 150;  
  }
}


module.exports = {
   PeanutButter: PeanutButter,
   ChocholateChip: ChocholateChip,
   OtherCookie: OtherCookie
}
