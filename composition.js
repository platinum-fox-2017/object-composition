const fs = require('fs');
const options = fs.readFileSync('./cookies.txt','utf8').split("\n");
// console.log(options);
class Cookie {
    constructor(name, ingredient) {
        this.name = name;
        this.status = 'mentah';
        this.ingredients = ingredient;
        this.has_sugar = this.check_sugar();
    }

    check_sugar(){
        for(let i = 0; i < this.ingredients.length; i++){
            if(this.ingredients[i].name == 'sugar'){
                return true;
            }
        }
        return false;
    }

    bake() {
        this.status = 'selesai dimasak';
    }

}

class PeanutButter extends Cookie {
    constructor(name, ingredient){
        super(name, ingredient);
        this.peanut_count = 100;
    }
}

class ChocolateChip extends Cookie {
    constructor(name, ingredient) {
        super(name, ingredient);
        this.choc_chip_count = 200;
    }
}

class ChocolateChipCrumbled extends Cookie {
    constructor(name, ingredient){
        super(name, ingredient);
        this.peanut_count = 100;
    }
}

class PeanutButterCrumbled extends Cookie {
    constructor(name, ingredient){
        super(name, ingredient);
        this.peanut_count = 100;
    }
}

class OtherCookies extends Cookie {
    constructor(name, ingredient){
        super(name, ingredient);
        this.other_count = 150;
    }
}

class CookieFactory{

    static create(options){
        //accepts a list of cookie types and returns those cookies
        let tempCookie = new Array();
        for(let i = 0; i < options.length-1; i++){
            let cookie_name = this.find_name(options[i]);
            let cookie_ingredients = this.find_ingredients(options[i]);
            tempCookie.push(this.choose_object(cookie_name,cookie_ingredients));
        }
        return tempCookie;
    }

    static choose_object(name,ingredient){
        switch(name){
            case 'peanut butter':
            return new PeanutButter(name, ingredient);
            break;
            case 'chocolate chip':
            return new ChocolateChip(name, ingredient);
            break;
            case 'chocolate chip crumbled':
            return new ChocolateChip(name, ingredient);
            break;
            case 'peanut butter crumbled':
            return new ChocolateChip(name, ingredient);
            break;
            default:
            return new OtherCookies(name, ingredient);
            break;
        }
    }

    static see_ingredients(arr){
        for(let i=0; i < arr.length; i++){
            console.log(`[${arr[i].name}] \nIngredients: ${arr[i].ingredients.map(x => x.name + "(" +x.amount+")").join(", ")}`);
        }
    }

    static no_sugar_cookies(arr){
        let tempNoSugar = new Array();
        for(let i = 0; i < arr.length; i++){
            if(arr[i].has_sugar==false){
                tempNoSugar.push(arr[i].name);
            }
        }
        return tempNoSugar;
    }

    static find_ingredients(str){
        let tempStrIngredients = str.split(" = ")[1].split(", ");
        let tempArrIngredients = new Array();
        for (let i = 0; i < tempStrIngredients.length; i++){
            let tempIng = tempStrIngredients[i].split(" : ");
            tempArrIngredients.push(new Ingredient(tempIng[1],tempIng[0]));
        }
        return tempArrIngredients;
    }

    static find_name(str){
        return str.split(" = ")[0];
    }
}

class Ingredient{
    constructor(name,amount){
        this.name = name;
        this.amount = amount;
    }
}


let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
// console.log(batch_of_cookies[0].ingredients);
console.log("\n=============== List of Ingredients =================");
CookieFactory.see_ingredients(batch_of_cookies);
console.log("\nNo Sugar Cookies: ");
let no_sugar = CookieFactory.no_sugar_cookies(batch_of_cookies);
console.log(`${no_sugar}`);
