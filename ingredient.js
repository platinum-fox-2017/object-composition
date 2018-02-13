"use strict"
const fs = require('fs')

class Ingredient {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
  }
}

module.exports = Ingredient