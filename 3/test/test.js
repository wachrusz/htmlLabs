const chai = require('chai');
const assert = chai.assert;

const Triangle = require('../tasks/triangle');
const Sequence = require('../tasks/sequence');
const Matrix = require('../tasks/matrix');
const Funcs = require('../tasks/funcs');

describe('Тестирование классов', () => {
    describe('Класс Triangle', () => {
        it('должен корректно вычислять площадь треугольника', () => {
            const triangle = new Triangle(8, 10);
            assert.equal(triangle.calculateArea(), 40);
        });

        it('должен корректно выводить результат', () => {
            const triangle = new Triangle(5, 4);
            assert.doesNotThrow(() => triangle.printArea());
        });
    });

    describe('Класс Sequence', () => {
        it('должен выбрасывать ошибку при X >= 1', () => {
            assert.throws(() => new Sequence(1), Error, "NONONO, X < 1");
        });

        it('должен корректно вычислять сумму', () => {
            const seq = new Sequence(0.5);
            assert.approximately(seq.calculateSum(), 0.166666, 0.0001);
        });
    });

    describe('Класс Matrix', () => {
        const testMatrix = [
            [10, 20, 30],
            [15, 25, 35],
            [20, 30, 40],
            [25, 35, 45]
        ];

        it('должен проверять размерность матрицы', () => {
            assert.throws(() => new Matrix([[1, 2]]), Error, "Матрица должна быть 4x3");
        });

        it('должен корректно вычитать первую строку', () => {
            const matrix = new Matrix(testMatrix);
            matrix.subtractFirstRow();
            assert.deepEqual(matrix.matrix[1], [5, 5, 5]);
            assert.deepEqual(matrix.matrix[3], [15, 15, 15]);
        });
    });

    describe('Класс Funcs', () => {
        const funcs = new Funcs();
    
        it('должен создавать вертикальную зигзагообразную матрицу', () => {
            const testArray = Array.from({length: 16}, (_, i) => i + 1);
            const expected = [
                [1, 8, 9, 16],
                [2, 7, 10, 15],
                [3, 6, 11, 14],
                [4, 5, 12, 13]
            ];
            assert.deepEqual(funcs.getResultArray(testArray), expected);
        });
    
        it('должен корректно обрабатывать нечетные размеры', () => {
            const testArray = [1,2,3,4,5,6,7,8,9];
            const expected = [
                [1, 6, 7],
                [2, 5, 8],
                [3, 4, 9]
            ];
            assert.deepEqual(funcs.getResultArray(testArray), expected);
        });
    });
});