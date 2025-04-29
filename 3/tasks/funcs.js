class Funcs {
    constructor() {
    }
  
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  
    getArray(n) {
      const length = n * n;
      const arr = [];
      for (let i = 0; i < length; i++) {
        arr.push(this.getRandomInt(0, 100));
      }
      return arr;
    }
    
    getResultArray(a) {
        const sorted = [...a].sort((a, b) => a - b);
        const n = Math.sqrt(sorted.length);
        
        if (!Number.isInteger(n)) {
            throw new Error("Длина массива должна быть квадратом целого числа");
        }
    
        const matrix = Array.from({ length: n }, () => new Array(n));
        let currentIndex = 0;
    
        for (let col = 0; col < n; col++) {
            if (col % 2 === 0) {
                for (let row = 0; row < n; row++) {
                    matrix[row][col] = sorted[currentIndex++];
                }
            } else {
                for (let row = n - 1; row >= 0; row--) {
                    matrix[row][col] = sorted[currentIndex++];
                }
            }
        }
        
        return matrix;
    }
}

module.exports = Funcs;
