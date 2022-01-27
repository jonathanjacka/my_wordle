const state = {
    word: 'hello',
    attempts: 0,
    isSolved: false,
    currentRow: document.getElementById('row-1'),
    currentWord: ''
}

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

const disableRow = (currentRow) => {
    const cells = currentRow.querySelectorAll('.cell');
    cells.forEach(cell => {cell.disabled = true; cell.blur()});
}

const enableRow = (currentRow) => {
    const cells = currentRow.querySelectorAll('.cell');
    cells.forEach(cell => cell.disabled = false);
}

const checkRowComplete = (currentRow) => {
    let count = 0;
    currentRow.querySelectorAll('.cell').forEach(cell => cell.value !== '' && count++);
    return count === 5 ? true : false;
}

const updateCurrentWord = (currentRow) => {
    let word = ''; 
    currentRow.querySelectorAll('.cell').forEach(cell => word = word + cell.value);
    console.log('Current word: ', word);
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

const checkLetters = async (word, currentWord, currentRow) => {
    const pause = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
    const cells = currentRow.querySelectorAll('.cell');

    for(let i = 0; i < currentWord.length; i++){
            if(currentWord[i] === word[i]){
                cells[i].style.backgroundColor = '#90ee90';
                cells[i].style.color = 'white';
            } else if(word.indexOf(currentWord[i]) >= 0) {
                cells[i].style.backgroundColor = '#eeee90';
            } else {
                cells[i].style.backgroundColor = '#bebebe';
                cells[i].style.color = 'white';
            }
            // currentWord = currentWord.replace(currentWord[i], '');
            await pause(500);
    }
}

const handleEnter = async () => {

    const pause = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    if(checkRowComplete(state.currentRow)) {
        //check to see if word is valid

        setWord(updateCurrentWord(state.currentRow))
        console.log(getCurrentWord());
        
        addAttempt();

        removeCellListeners(getCurrentRow());

        //disable current row
        disableRow(getCurrentRow());

        //color letters accordingly
        checkLetters(getWord(), getCurrentWord(), getCurrentRow());
        await pause(2800);

        //check to see if winner

        if(getAttempts() < 6  && !getIsSolved()) {
            setCurrentRow(`row-${getAttempts() + 1}`);
            enableRow(getCurrentRow());
            setCellListeners(getCurrentRow());
            
        } else {
            console.log('Game is finished!');
            //complete end game 
        }
    }
}


/* **************************** */

enableRow(getCurrentRow());
setCellListeners(getCurrentRow());




