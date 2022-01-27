const state = {
    word: 'audio',
    attempts: 0,
    isSolved: false,
    currentRow: document.getElementById('row-1'),
    currentWord: []
}

console.log(state);

const getState = () => state;

const getWord = () => state.word;
const setWord = (currentWord) => state.currentWord = currentWord;

const getAttempts = () => state.attempts;
const addAttempt = () => state.attempts = state.attempts + 1;

const getIsSolved = () => state.isSolved;
const setIsSolved = (isSolved) => state.isSolved = isSolved; 

const getCurrentRow = () => state.currentRow;
const setCurrentRow = (row) => state.currentRow = document.getElementById(row);

const getCurrentWord = () => state.currentWord;
const setCurrentWord = (currentWord) => state.currentWord = currentWord;

const setCellListeners = (currentRow) => {
    const cells = currentRow.querySelectorAll('.cell');

    cells[0].focus();

    cells.forEach((cell, idx) => {
        cell.addEventListener('keydown', ({key}) => handleKeyDown(key, cells, cell, idx));
    }); 

    document.addEventListener('keydown', handleDocListener);
}

const removeCellListeners = (currentRow) => {
    const cells = currentRow.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeEventListener('keydown', handleKeyDown));
    document.removeEventListener('keydown', handleDocListener);
}

const handleEnter = () => {
    if(checkRowComplete(state.currentRow)) {

        //check to see if word is valid

        setWord(updateCurrentWord(state.currentRow))

        addAttempt();

        removeCellListeners(getCurrentRow());

        //disable current row

        //color letters accordingly 

        //check to see if winner

        if(getAttempts() < 6  && !getIsSolved()) {
            setCurrentRow(`row-${getAttempts() + 1}`);
            setCellListeners(getCurrentRow());
        } else {
            console.log('Game is finished!');
            //complete end game 
        }
    }
}

const checkRowComplete = (currentRow) => {
    let count = 0;
    currentRow.querySelectorAll('.cell').forEach(cell => cell.value !== '' && count++);
    return count === 5 ? true : false;
}

const updateCurrentWord = (currentRow) => {
    const word = []; 
    currentRow.querySelectorAll('.cell').forEach(cell => word.push(cell.value));
    return word;
}

const handleKeyDown = (key, cells, cell, idx) => {

    if(key >= 'a' && key <= 'z') {
        cell.value = '';
        if(idx < cells.length - 1) {
            setTimeout(() => cells[idx + 1].focus(), 10);
        }
    }else if (key === 'Backspace'){

        if(idx > 0) {
            setTimeout(() => {
                cells[idx - 1].focus(); 
                cell.value = '';
            }, 10);
        }
    } else if(key === 'ArrowRight') {
        idx < cells.length - 1 && cells[idx + 1].focus(); 
    } else if (key === 'ArrowLeft') {
        idx > 0 && cells[idx - 1].focus(); 
    }
    else if(key !== 'Enter'){
        console.log(key, 'Invalid!'); 
        setTimeout(() => {
            cell.value = '';
            cells[idx].focus(); 
        }, 0);
    } 
}

const handleDocListener = ({key}) => {
    if(key === 'Enter' || key === 'Return') {
        handleEnter();
    }
}


/* **************************** */

setCellListeners(getCurrentRow());



