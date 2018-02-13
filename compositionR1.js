"use strict"

const fs = require('fs');

var splitIngredients = fs.readFileSync('./ingredients.txt', 'UTF-8').split('\r\n');
// console.log(splitIngredients); 

// PROCESS INGREDIENTS CUTTING
var arrlist = [];
for (var i = 0; i < splitIngredients.length; i++) {
    arrlist.push([]);
    arrlist[i].push(splitIngredients[i].split(' =').join(', '));
}
// console.log(arrlist);

var arrlist1 = [];
for (var i = 0; i < arrlist.length; i++) {
    for (var j = 0; j < arrlist[i].length; j++) {
        arrlist1.push(arrlist[i][j].split(', ').join(' : '));
    }
}
// console.log(arrlist1);

var arrList2 = [];
for (var i = 0; i < arrlist1.length; i++) {
    arrList2.push(arrlist1[i].split(' : '));
}
// console.log(arrList2);

var arrList3 = [];
for (var i = 0; i < arrList2.length; i++) {
    arrList3.push([]);
    for (var j = 0; j < arrList2[i].length; j++) {
        arrList3[i].push(arrList2[i][j].trim());
    }
}
// console.log(arrList3);

// PROCESS CREATING INGREDIENTS OBJ
var arrObj = []
for (var i = 0; i < arrList3.length; i++) {
    for (var j = 1; j < arrList3[i].length-1; j++) {
        var obj = {}; 
        if (j % 2 != 0) {
            obj['name'] = arrList3[i][j+1]
            obj['amount'] = arrList3[i][j];
            arrObj.push(obj);
        }
    }
}
// console.log(arrObj); // length: 15

class Ingredients {
    constructor(options) {
        this._name = options['name']
        this._amount = options['amount']
    }
    
}



class Cookie {
    constructor(ingredients) {
        this._ingredients = ingredients;
        this._hasSugar = options['has_sugar']
    }

}


function CookieFactory() {
    function create(cookies) {

    }
}





// var batch_of_cookies = CookieFactory.create(options);
// console.log(batch_of_cookies);

// let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
// console.log('sugar free cakes are :');

// for (let i = 0; i < sugarFreeFoods.length; i++) {
    // console.log(sugarFreeFoods[i].name);
// }

