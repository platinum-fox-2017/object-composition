"use strict"

const fs = require('fs');

class Ingredient {
	constructor(options) {
		this.name = options['name'];
		this.amount = options['amount'];
	}
}

class Cookie {
	constructor(name, ingredients) {
		this.name = name;
		this.status = "mentah";
		this.ingredients = ingredients;
		this.has_sugar = this.isHasSugar();
	}

	bake() {
		this.status = "selesai dimasak";
	}

	isHasSugar() {
		for (let i = 0; i < this.ingredients.length; i++) {
			if (this.ingredients[i].name == 'sugar') return true;
		}

		return false;
	}
}

class PeanutButter extends Cookie {
	constructor(name, ingredients) {
		super(name, ingredients);
		this.peanut_count = 100;
	}
}

class ChocolateChip extends Cookie {
	constructor(name, ingredients) {
		super(name, ingredients);
		this.choc_chip_count = 200;
	}
}

class PeanutButterCrumbled extends Cookie {
	constructor(name, ingredients) {
		super(name, ingredients);
		this.peanut_count = 50;
	}
}

class ChocolateChipCrumbled extends Cookie {
	constructor(name, ingredients) {
		super(name, ingredients);
		this.choc_chip_count = 50;
	}
}

class OtherChip extends Cookie {
	constructor(name, ingredients) {
		super(name, ingredients);
		this.other_count = 150;
	}
}

class CookieFactory {
	static create(options) {

		let cookies = [];
		for (let i = 0; i < options.length; i++) {
			let name = options[i].split(' = ')[0];
			let ingredients_array = [];

			let ingredients = options[i].split(' = ')[1].split(', ');
			for (let j = 0; j < ingredients.length; j++) {
				let ingredients_name = options[i].split(' = ')[1].split(', ')[j].split(' : ')[1];
				let ingredients_amount = options[i].split(' = ')[1].split(', ')[j].split(' : ')[0];

				ingredients_array.push(new Ingredient({name : ingredients_name, amount : ingredients_amount}));
			}

			if (name == 'peanut butter') cookies.push(new PeanutButter(name, ingredients_array));
			else if (name == 'chocolate chip') cookies.push(new ChocolateChip(name, ingredients_array));
			else if (name == 'peanut butter crumbled') cookies.push(new PeanutButterCrumbled(name, ingredients_array));
			else if (name == 'chocolate chip crumbled') cookies.push(new ChocolateChipCrumbled(name, ingredients_array));
			else cookies.push(new OtherChip(name, ingredients_array));
		}

		return cookies;
	}

	static cookieRecommendation(day, cookies) {
		let result = [];
		for (let i = 0; i < cookies.length; i++) {
			if (!cookies[i].has_sugar && day == 'tuesday') result.push(cookies[i]);
		}
		return result;
	}
}

let options = fs.readFileSync('./cookies.txt', 'utf8').split('\r\n');

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
for (let i = 0; i < sugarFreeFoods.length; i++) {
	console.log(sugarFreeFoods[i].name);
}