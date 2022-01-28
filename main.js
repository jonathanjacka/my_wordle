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

    const colors = {
        0: 'grey',
        1: 'grey',
        2: 'grey',
        3: 'grey',
        4: 'grey'
    };
    
    for (let i = 0; i < currentWord.length; i++) {
        if(word[i] === currentWord[i]){
            colors[i] = 'green';
            console.log(word[i], currentWord[i]);
            currentWord = currentWord.substring(0, i) + 'G' + currentWord.substring(i + 1);
            word = word.substring(0, i) + 'G' + word.substring(i + 1);
        }
    }

    for (let j = 0; j < currentWord.length; j++) {
        const wordIdx = word.indexOf(currentWord[j]);
        console.log(wordIdx);
        if(wordIdx >= 0 && (currentWord[j] !== 'G')){
            colors[j] = 'yellow';
            currentWord = currentWord.substring(0, j) + 'G' + currentWord.substring(j + 1);
            word = word.substring(0, wordIdx) + 'G' + word.substring(wordIdx + 1);
        }
    }

    let i = 0;
    for (let idx in colors) {
        if(colors[idx] === 'green'){
            cells[i].style.backgroundColor = '#1AA33C';
            cells[i].style.color = '#fff';
        } else if (colors[idx] === 'yellow') {
            cells[i].style.backgroundColor = '#F6E695';
        } else {
            cells[i].style.backgroundColor = '#D7D7D7';
            cells[i].style.color = '#fff'; 
        }
        i++;
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
        setIsSolved(getWord() === getCurrentWord());

        if(getAttempts() < 6  && !getIsSolved()) {
            setCurrentRow(`row-${getAttempts() + 1}`);
            enableRow(getCurrentRow());
            setCellListeners(getCurrentRow());
            
        } else {
            const endMessage = getIsSolved() ? `You win in ${getAttempts()} attempts!` : 'You did not complete the Wordle!';
            console.log(endMessage);
            console.log('Game is finished!');
            
        }
    }
}


/* **************************** */

enableRow(getCurrentRow());
setCellListeners(getCurrentRow());




