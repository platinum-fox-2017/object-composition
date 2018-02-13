class Cookie {
    constructor(name,objIngre) {
          this.name = name
          this.status = "mentah"
          this.ingredients = objIngre
          this.has_sugar = false
    }
  
    bake() {
      this.status = "selesai dimasak"
      }
      checkSugar(){
          for(let i =0;i<this.ingredients.length;i++){
              if(this.ingredients[i].name.trim() === 'sugar'){
                  return this.has_sugar = true
              }
          }
          return this.has_sugar
      }
  
  }

  module.exports = Cookie