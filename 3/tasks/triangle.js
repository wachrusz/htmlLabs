class Triangle {
    constructor(a, h) {
      this.a = a;
      this.h = h;
    }
  
    calculateArea() {
      return (this.a * this.h) / 2;
    }
  
    printArea() {
      console.log(`Площадь прямоугольного треугольника равна ${this.calculateArea()}`);
    }
}
module.exports = Triangle;