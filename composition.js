"use strict"

const fs = require('fs');

class Cookie {
	constructor(name) {
		this.name = name;
		this.status = "mentah";
		this.ingredients = [];
	}

	bake() {
		this.status = "selesai dimasak";
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

class OtherChip extends Cookie {
	constructor(name) {
		super(name);
		this.other_count = 150;
	}
}

class CookieFactory {
	static create(options) {
		let cookies = [];
		for (var i = 0; i < options.length; i++) {
			if (options[i] == 'peanut butter') cookies.push(new PeanutButter(options[i]));
			else if (options[i] == 'chocolate chip') cookies.push(new ChocolateChip(options[i]));
			else cookies.push(new OtherChip(options[i]));
		}

		return cookies;
	}
}

let options = fs.readFileSync('./cookies.txt', 'utf8').split('\r\n');
// console.log(options);
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);