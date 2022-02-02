export const createKeyboard = () => {
  const lettersRow1 = 'qwertyuiop'.toUpperCase();
  const lettersRow2 = 'asdfghjkl'.toUpperCase();
  const lettersRow3 = 'zxcvbnm<'.toUpperCase();

  const lettersRow1List = [...lettersRow1];
  const lettersRow2List = [...lettersRow2];
  const lettersRow3List = [...lettersRow3];

  const keyboardContainer = document.getElementById('keys-row');

  keyboardContainer.appendChild(createKeyRow(lettersRow1List));
  keyboardContainer.appendChild(createKeyRow(lettersRow2List));
  keyboardContainer.appendChild(createKeyRow(lettersRow3List));

  function createKeyRow(lettersList) {
    const keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keys-row');

    lettersList.forEach((letter) => {
      const key = document.createElement('div');
      key.classList.add('key');
      key.innerText = letter;

      //add event listener
      key.addEventListener('click', () => {
        window.dispatchEvent(
          new KeyboardEvent('keydown', { key: `${letter.toLowerCase()}` })
        );
        console.log('pressed!');
      });

      keyboardRow.appendChild(key);
    });
    return keyboardRow;
  }
};

// Create listener
window.addEventListener('keydown', () => {
  console.log('test');
});

// Create event
const keyboardEvent = document.createEvent('KeyboardEvent');
const initMethod =
  typeof keyboardEvent.initKeyboardEvent !== 'undefined'
    ? 'initKeyboardEvent'
    : 'initKeyEvent';

keyboardEvent[initMethod](
  'keydown', // event type: keydown, keyup, keypress
  true, // bubbles
  true, // cancelable
  window, // view: should be window
  false, // ctrlKey
  false, // altKey
  false, // shiftKey
  false, // metaKey
  40, // keyCode: unsigned long - the virtual key code, else 0
  0 // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
);

// Fire event
document.dispatchEvent(keyboardEvent);
