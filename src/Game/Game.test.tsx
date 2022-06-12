import {userCheck} from './Game';

let squareArr = [
    {
        "idx": null,
        "user": "X"
    },
    {
        "idx": 1,
        "user": "X"
    }
];
let positionArr = [
    0,
    1,
    2
]

test('userCheck function - negative scenario', () => {
  expect(userCheck(positionArr, squareArr)).toBe(false);
});

let squareArr1 = [
    {
        "idx": null,
        "user": "X"
    },
    {
        "idx": 0,
        "user": "X"
    },
    {
        "idx": 1,
        "user": "O"
    },
    {
        "idx": 2,
        "user": "X"
    }
]; 

let positionArr1 = [
    0,
    1,
    2
]; 

test('userCheck function - positive scenario', () => {
    expect(userCheck(positionArr1, squareArr1)).toBe(true);
  });

