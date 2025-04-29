class Sequence {
    constructor(x) {
      if (x >= 1) throw new Error("NONONO, X < 1");
      this.x = x;
      this.denominatorStep = 4;
    }
  
    calculateSum() {
      const xSquared = this.x ** 2;
      let sum = 0;
      let currentDenominator = 2;
      let term;
      
      do {
        term = xSquared / currentDenominator;
        if (Math.abs(term) <= 0.0005) break;
        
        sum += term;
        currentDenominator += this.denominatorStep;
      } while(true);
  
      return sum;
    }
  
    printResult() {
        console.log(`sum: ${this.calculateSum().toFixed(6)}`);
    }
}
module.exports = Sequence;