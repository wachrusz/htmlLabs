const Triangle = require('./tasks/triangle');
const Sequence = require('./tasks/sequence');
const Matrix = require('./tasks/matrix');
const Funcs = require('./tasks/funcs');

class Main {
    constructor() {
        this.tr = null;
        this.sq = null;
        this.mx = null;
        this.fc = null;
    }

    initialize() {
        try {
            this.tr = new Triangle(8, 10);
            this.tr.printArea();

            this.sq = new Sequence(0.5);
            this.sq.printResult();
        } catch (e) {
            console.error('Ошибка инициализации:', e.message);
        }

        try {
            const initialMatrix = [
                [10, 20, 30],
                [15, 25, 35],
                [20, 30, 40],
                [25, 35, 45]
            ];
            this.mx = new Matrix(initialMatrix);
            this.mx.printMatrix("Исходная матрица:");
            this.mx.subtractFirstRow();
            this.mx.printMatrix("\nМатрица после преобразования:");
        } catch (e) {
            console.error('Ошибка матрицы:', e.message);
        }

        this.fc = new Funcs();
        
        const n = 4;
        const generatedArray = this.fc.getArray(n);
        console.log("Сгенерированный массив:", generatedArray);
        const resultMatrix = this.fc.getResultArray(generatedArray);
        console.log("Матрица по схеме:");
        resultMatrix.forEach(row => console.log(row));

        const existingMatrix = [
            [9, 8, 7, 6],
            [5, 4, 3, 2],
            [1, 0, -1, -2],
            [-3, -4, -5, -6]
        ];
        const flatArray = existingMatrix.flat();
        const sortedMatrix = this.fc.getResultArray(flatArray);
        console.log("\nОтсортированная матрица:");
        sortedMatrix.forEach(row => console.log(row));
    }
}

const app = new Main();
app.initialize();