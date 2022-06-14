let nextMoveSlot = '';

let sudokuTable = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let optionsTable = [
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
];
function difficulty(level) {//require the amount of slots to be filled, filing the visual board acordingly.
    newBoard()
    document.getElementById('dificulty1').style.display = 'none';
    document.getElementById('sudokuFrame1').style.display = 'block';
    for (let i = 0; i < 9; i++) {//reseting the visual board.
        for (let i2 = 0; i2 < 9; i2++) {
            document.getElementById(i.toString() + ',' + i2.toString()).innerText = '';
        }
    }
    let selected = [];
    for (let q = 0; q < level;) {//select randomly whitch slots to reveal "level" times
        let num1 = Math.floor(Math.random() * 9 + 0);
        let num2 = Math.floor(Math.random() * 9 + 0);
        if (selected.indexOf(num1 + ',' + num2) < 0) {
            selected.push([[num1], [num2]])
            q++
        }
    }
    for (let i = 0; i < selected.length; i++) {//revealing the chosen slots
        let adres = selected[i][0].toString() + ',' + selected[i][1].toString();
        document.getElementById(adres).innerText = sudokuTable[selected[i][0]][selected[i][1]].toString();
    }
}
function newBoard() { //creating resolved sudoku table
    resetBoards();
    let slotsOptions = [];
    let slot = [];
    optionsTable = optionsCalc(sudokuTable);//calculating the options availble for each slot.
    for (let i = 0; i < 82;) {
        slotsOptions = nextSlotFinder(optionsTable); // finding the optimal slots for the next move.
        if (slotsOptions.length < 1) { break; }
        slot = slotsOptions[Math.floor(Math.random() * (slotsOptions.length - 1))]; //randomly choosing one slot out of the optimal.
        let newNum = Math.floor((Math.random() * (optionsTable[slot[0]][slot[1]].length - 1)) + 0); //randomly choosing one move out of the posible options in the slot.
        newNum = Number(optionsTable[slot[0]][slot[1]].slice(newNum, newNum + 1));
        sudokuTable[slot[0]][slot[1]] = newNum;
        optionsTable = optionsCalc(sudokuTable);
        if (!deadlock(sudokuTable, optionsTable)) {//checking if there is a dead lock after this move.
            resetBoards();
            i = 0;
        } else { i++; }
    }
}
function optionsCalc(gameTable) {// require the sudoku game table and returns table with all availble move options for each slot.
    let tempOptions = [
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ];
    for (let i = 0; i < 9; i++) {
        for (let i2 = 0; i2 < 9; i2++) {
            let gameOptions = '123456789';
            if (gameTable[i][i2] > 0) {
                gameOptions = '';
            } else {
                for (let q = 0; q < 9; q++) {//eliminating options if they are alredy made in the same row and colum.
                    if (gameOptions.indexOf(gameTable[i][q]) >= 0) {
                        gameOptions = gameOptions.slice(0, gameOptions.indexOf(gameTable[i][q])) + gameOptions.slice(gameOptions.indexOf(gameTable[i][q]) + 1);
                    }
                    if (gameOptions.indexOf(gameTable[q][i2]) >= 0) {
                        gameOptions = gameOptions.slice(0, gameOptions.indexOf(gameTable[q][i2])) + gameOptions.slice(gameOptions.indexOf(gameTable[q][i2]) + 1);
                    }
                }
                const cubeRange = [];// finding the relevant cube.
                if (i >= 0 && i <= 2) {
                    cubeRange.push(0);
                    cubeRange.push(2);
                } else if (i >= 3 && i <= 5) {
                    cubeRange.push(3);
                    cubeRange.push(5);
                } else if (i >= 6 && i <= 8) {
                    cubeRange.push(6);
                    cubeRange.push(8);
                }
                if (i2 >= 0 && i2 <= 2) {
                    cubeRange.push(0);
                    cubeRange.push(2);
                } else if (i2 >= 3 && i2 <= 5) {
                    cubeRange.push(3);
                    cubeRange.push(5);
                } else if (i2 >= 6 && i2 <= 8) {
                    cubeRange.push(6);
                    cubeRange.push(8);
                }
                for (let w = cubeRange[0]; w <= cubeRange[1]; w++) {//eliminating options if they are alredy made in the same cube.
                    for (let w2 = cubeRange[2]; w2 <= cubeRange[3]; w2++) {
                        if (gameOptions.indexOf(gameTable[w][w2]) >= 0) {
                            gameOptions = gameOptions.slice(0, gameOptions.indexOf(gameTable[w][w2])) + gameOptions.slice(gameOptions.indexOf(gameTable[w][w2]) + 1);
                        }
                    }
                }
            }
            tempOptions[i][i2] = gameOptions;//the remaning options assigned to the options table with the same adres as the slot.
        }
    }
    return tempOptions;
}
function nextSlotFinder(optTable) {//returns the slots with the leaste options availble.
    let optSlot = [];
    let tempSlot = [];
    for (let i = 0; i < 9; i++) {
        for (let i2 = 0; i2 < 9; i2++) {
            tempSlot = [i, i2];
            if (optTable[i][i2].length > 0) {
                if (optSlot.length === 0) {// if optSlot is empty  thene put the first value.
                    optSlot.push(tempSlot)
                } else {
                    if (optTable[i][i2].length < optTable[optSlot[0][0]][optSlot[0][1]].length) { //if the amount of options in this slot more than in one that alredy in optSlot thene replace theme.
                        optSlot = [];
                        optSlot.push(tempSlot);
                    } else if (optTable[i][i2].length === optTable[optSlot[0][0]][optSlot[0][1]].length) {//if the amount of options in this slot equal to the other options in optSlot thene add this to the list.
                        optSlot.push(tempSlot);
                    }
                }
            }
        }
    }
    if (optSlot.length > 0) { optSlot = uniqueMove(optSlot); }// check if there is slots with unique moves that has to be played next.
    return optSlot;
}
function uniqueMove(moveSlots) {// require array of move adreses return only the necessary moves if there is ones.
    if (optionsTable[moveSlots[0][0]][moveSlots[0][1]].length < 6) {//unique move can not occur in large amount of move options.
        let newMoveSlots = [];
        for (const iter of moveSlots) {
            let onlyUniqueMoves = '';
            let moveOptions = optionsTable[iter[0]][iter[1]];
            if (moveOptions.length > 1) {
                for (const iter2 of moveOptions) {//check if each move is unique by iterating in a row, colum and cube.
                    let uniqueRow = true;
                    let uniqueColum = true;
                    let uniqueCube = true;

                    for (let i = 0; i < 9; i++) {
                        //row iteration
                        if (optionsTable[iter[0]][i].indexOf(iter2) >= 0 && i != iter[1]) {
                            uniqueRow = false;
                        }
                        //colum iteration
                        if (optionsTable[i][iter[1]].indexOf(iter2) >= 0 && i != iter[0]) {
                            uniqueColum = false;
                        }
                    }
                    //cube iteration
                    const cubeRange = [];
                    if (iter[0] >= 0 && iter[0] <= 2) {
                        cubeRange.push(0);
                        cubeRange.push(2);
                    } else if (iter[0] >= 3 && iter[0] <= 5) {
                        cubeRange.push(3);
                        cubeRange.push(5);
                    } else if (iter[0] >= 6 && iter[0] <= 8) {
                        cubeRange.push(6);
                        cubeRange.push(8);
                    }
                    if (iter[1] >= 0 && iter[1] <= 2) {
                        cubeRange.push(0);
                        cubeRange.push(2);
                    } else if (iter[1] >= 3 && iter[1] <= 5) {
                        cubeRange.push(3);
                        cubeRange.push(5);
                    } else if (iter[1] >= 6 && iter[1] <= 8) {
                        cubeRange.push(6);
                        cubeRange.push(8);
                    }
                    for (let w = cubeRange[0]; w <= cubeRange[1]; w++) {
                        for (let w2 = cubeRange[2]; w2 <= cubeRange[3]; w2++) {
                            if (optionsTable[w][w2].indexOf(iter2) >= 0 && (w != iter[0] || w2 != iter[1])) {
                                uniqueCube = false;
                            }
                        }
                    }
                    if (uniqueColum || uniqueRow || uniqueCube) {// if even in one acation the mave is unique it gets to the list.
                        onlyUniqueMoves += iter2;
                    }
                }
                if (onlyUniqueMoves.length > 0) {// if there is a unique move we make it the only move option and making it the next move.
                    optionsTable[iter[0]][iter[1]] = onlyUniqueMoves;
                    newMoveSlots.push(iter);
                }
            }
        }
        if (newMoveSlots.length > 0) { return newMoveSlots; }
    }
    return moveSlots;
}
function deadlock(game, options) {//require the sudoku game table and the move options for this table, returns if there is at least one move option for each empty slot.
    for (let i = 0; i < 9; i++) {
        for (let i2 = 0; i2 < 9; i2++) {
            if (game[i][i2] === 0 && options[i][i2].length < 1) {
                return false;
            }
        }
    }
    return true;
}
function resetBoards() {
    sudokuTable = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    optionsTable = [
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ];
}
function signIn(userName, password) {
    document.getElementById('welcomeBanner').innerText = 'Welcom';
    if (userName === 'abcd' && password === '1234') {
        document.getElementById('logIn1').style.display = 'none';
        document.getElementById('dificulty1').style.display = 'block';
        return true;
    }
    return false;
}

function newMoveAdres(adres) {//require adres of the selected slot, defines the slot of interest.
    let slot = document.getElementById(adres);
    if (nextMoveSlot.length > 0) {
        document.getElementById(nextMoveSlot).style.boxShadow = 'none';
        document.getElementById(nextMoveSlot).style.backgroundColor = 'white';
        nextMoveSlot = '';
    }
    nextMoveSlot = adres;
    slot.style.boxShadow = '1px 1px 1px black inset';
    slot.style.backgroundColor = 'rgb(170, 170, 170)';
}

function moveNum(value) {//require value thet will be set in selected slot.
    if (nextMoveSlot.length < 2) { return; }
    let slot = document.getElementById(nextMoveSlot);
    if (slot.innerText && slot.style.color != 'red') {//continue only if the slot empty filled or has the wrong number.
        return;
    } else {// seting the requiered value
        slot.innerText = value;
        slot.style.color = 'black';
        slot.style.boxShadow = 'none';
        slot.style.backgroundColor = 'white';
        if (sudokuTable[nextMoveSlot[0]][nextMoveSlot[2]] != value) {//check if the set value is corect.
            slot.style.color = 'red';
            console.log(sudokuTable[nextMoveSlot[0]][nextMoveSlot[2]])
        }
    }
    nextMoveSlot = '';
}

function finish() {//check if all the slots has been filled and there is no wrong values in slots.
    for (let i = 0; i < 9; i++) {
        for (let i2 = 0; i2 < 9; i2++) {
            let cell = document.getElementById(i.toString() + ',' + i2.toString());
            console.log(cell.innerText)
            if (cell.innerText === '' || cell.style.color === 'red') {
                document.getElementById('errorBanner').innerText = 'Unfinished!! Please resolve all tehe red sells.';
                return;
            }
        }
    }
    document.getElementById('sudokuFrame1').style.display = 'none';
    document.getElementById('dificulty1').style.display = 'block';
    document.getElementById('welcomeBanner').innerText = 'Congratulations! you win.';
}

function again() {// returning to the dificulty selector.
    document.getElementById('sudokuFrame1').style.display = 'none';
    document.getElementById('dificulty1').style.display = 'block';
}
