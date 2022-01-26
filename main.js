const state = {
    word: 'audio',
    attempt: 0,
    isSolved: false,
    currentWord: []
}

checkRowComplete = (row) => {
    let count = 0;
    row.forEach(cell => cell.value !== '' && count++);
    return count === 5 ? true : false;
}

const updateCurrentWord = (row) => {
    const word = []; 
    row.forEach(cell => word.push(cell.value));
    return word;
}

const row = document.querySelectorAll('.cell');
row[0].focus();

row.forEach((code, idx) => {
  code.addEventListener('keydown', (event) => {
    if (event.key >= 'a' && event.key <= 'z') {
      row[idx].value = '';

      if(idx < row.length - 1) {
        setTimeout(() => row[idx + 1].focus(), 10);
      }
      
    } else if (event.key === 'Backspace' && idx !== 0) {
      setTimeout(() => row[idx - 1].focus(), 10);
    } 
  });
});

document.addEventListener('keydown',(event) => {
    if(event.key === 'Enter' || event.key === 'Return') {
        console.log('Enter was pressed!');
        console.log(checkRowComplete(row));
        console.log(updateCurrentWord(row));
    }
});

