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
const setWord = (word) => state.word = word;

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
        cell.addEventListener('keydown', ({key}) => {

            if(key >= 'a' && key <= 'z') {
                cell.value = '';
                if(idx < cells.length - 1) {
                    setTimeout(() => cells[idx + 1].focus(), 10);
                }
            }else if(key === 'Enter' || key === 'Return') {
                handleEnter();

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
            else {
                console.log(key, 'Invalid!'); 
                setTimeout(() => {
                    cell.value = '';
                    cells[idx].focus(); 
                }, 0);
                
            }
        })
    }); 
}

const handleEnter = () => {
    
}

const checkRowComplete = (currentRow) => {
    let count = 0;
    currentRow.forEach(cell => cell.value !== '' && count++);
    return count === 5 ? true : false;
}

const updateCurrentWord = (currentRow) => {
    const word = []; 
    currentRow.forEach(cell => word.push(cell.value));
    return word;
}


/* **************************** */

setCellListeners(getCurrentRow());



