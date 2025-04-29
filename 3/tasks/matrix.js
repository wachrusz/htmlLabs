class Matrix {
    constructor(matrix) {
      if (!Array.isArray(matrix) || matrix.length !== 4 || matrix.some(row => !Array.isArray(row) || row.length !== 3)) {
        throw new Error("Матрица должна быть 4x3");
      }
      this.matrix = matrix;
    }
  
    subtractFirstRow() {
      const firstRow = this.matrix[0];
      
      for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          this.matrix[i][j] -= firstRow[j];
        }
      }
    }
  
    printMatrix(title = "Матрица:") {
      console.log(title);
      for (const row of this.matrix) {
        console.log(`[${row.map(num => num.toString().padStart(5)).join(", ")}]`);
      }
    }
}
module.exports = Matrix;