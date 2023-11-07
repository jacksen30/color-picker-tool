const hexInput = document.getElementById('hex-input');
const inputColorPreview = document.getElementById('color-box--original');
const alteredColorTextLabel = document.getElementById('color-box--altered-label');
const alteredColorPreview = document.getElementById('color-box--altered');
const sliderLabelText = document.getElementById('slider-label');
const sliderInput = document.getElementById('input--range-slider');

const toggleBtn = document.getElementById('toggleBtn');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');

toggleBtn.addEventListener('click', () => {
  if (toggleBtn.classList.contains('toggled')) {
    toggleBtn.classList.remove('toggled');
    lightenText.classList.remove('unselected-toggle-text');
    darkenText.classList.add('unselected-toggle-text');
  } else {
    toggleBtn.classList.add('toggled');
    darkenText.classList.remove('unselected-toggle-text');
    lightenText.classList.add('unselected-toggle-text');
  }
  reset();
});

// Sets the initial inputColorPreview & alteredColorPreview panels backgroundColor,
// as what the HTML hexInput value attribute is set as.
inputColorPreview.style.backgroundColor = hexInput.value;
alteredColorPreview.style.backgroundColor = hexInput.value;

hexInput.addEventListener('keyup', () => {
  // Adds a 'keyup' event listner to hex-input field
  // Passes the input to isValidHex function for validation
  // If validation returns true, updates the background color of DOM element with the id="color-box--original"
  const hex = hexInput.value;
  if(!isValidHex(hex)) {
    return;
  }
  // Remove the leading '#' if it exists to normalize the input.
  const strippedHex = hex.replace('#', '');
  inputColorPreview.style.backgroundColor = `#${strippedHex}`;
  alteredColorPreview.style.backgroundColor = `#${strippedHex}`;
  reset();
})

const isValidHex = (hex) => {
  // Check if hex has a value,
  // If a value is present it strips the # if present returns a boolean of true if hex is either 3 or 6 character and false if not.
    if(!hex) {
        return false;
    } else {
        // Remove the leading '#' if it exists to normalize the input.
        const strippedHex = hex.replace('#', '');
        return strippedHex.length === 3 || strippedHex.length === 6;
    }
}

const convertHexToRgb = (hex) => {
  // Remove the leading '#' if it exists to normalize the input.
  let strippedHex = hex.replace('#', '');

  // If the input is a short-form hex code (3 characters),
  // it is transformed into the long-form (6 characters) by duplicating each character.
  // This ensures compatibility with the subsequent parsing logic. For example, the input 'FFF' would be transformed to 'FFFFFF'.
  if(strippedHex.length === 3) {
    strippedHex = strippedHex[0] + strippedHex[0] + strippedHex[1] + strippedHex[1] + strippedHex[2] + strippedHex[2];
  }

  const r = parseInt(strippedHex.substring(0,2), 16);
  const g = parseInt(strippedHex.substring(2,4), 16);
  const b = parseInt(strippedHex.substring(4,6), 16);

  return {r,g,b}
}


const convertRgbToHex = (r, g, b) => {
  // Each RGB parameter is converted to a hexadecimal string using .toString(16).
  // To ensure that the resulting string always has two characters, "0" is
  // prepended to the converted string. This is necessary for RGB values less than 16 (e.g., 5 becomes "05").
  // .slice(-2) is then used to extract the last two characters of the string, ensuring that the result is always two characters long

  const hexPair1 = ("0" + r.toString(16)).slice(-2);
  const hexPair2 = ("0" + g.toString(16)).slice(-2);
  const hexPair3 = ("0" + b.toString(16)).slice(-2);

  const hex = `#${hexPair1}${hexPair2}${hexPair3}`;
  return hex;
}

const convertWithinRgbRange = (hex, amount) => {
  // Ensure when RGB value is updated by using percentage slider each value stays between 0 - 255
  const newHex = hex + amount;
  if (newHex > 255) {
    return 255;
  } else if (newHex < 0) {
    return 0;
  } else {
    return newHex;
  }
}

const alterColor = (hex, percentage) => {
  // Alter RGB values by percentage selected on slider input
  const {r, g, b} = convertHexToRgb(hex); //Object destructuring to grab values r , g and b

  const amount = Math.floor((percentage/100) * 255);

  const newR = convertWithinRgbRange(r, amount);
  const newG = convertWithinRgbRange(g, amount);
  const newB = convertWithinRgbRange(b, amount);
  return convertRgbToHex(newR, newG, newB);
}


sliderInput.addEventListener('input', () => {
  if(!isValidHex(hexInput.value)) {
    return
  }

  sliderLabelText.textContent = `${sliderInput.value} %`

  // valueAddition sets whether to use a positive or negative sliderInput.value,
  // when used in calculating the alteredHex below
  const valueAddition = toggleBtn.classList.contains('toggled') ? -sliderInput.value : sliderInput.value;

  const alteredHex = alterColor(hexInput.value, valueAddition);
  alteredColorTextLabel.textContent = `Altered Color ${alteredHex}`;
  alteredColorPreview.style.backgroundColor = alteredHex;
});

// Resets sliderInput.value, slider.text, alteredColorTextLabel and alteredColorPreview backgroundColor
// Currently calling the reset function via hexInput Event Listener & toggleBtn Event Listner
const reset = () => {
  sliderInput.value = 0;
  sliderLabelText.textContent = `${sliderInput.value} %`;
  alteredColorTextLabel.textContent = `Altered Color`;
  alteredColorPreview.style.backgroundColor = hexInput.value;
}



