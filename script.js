const hexInput = document.getElementById('hex-input');
const inputColorPreview = document.getElementById('color-box--original');
const alteredColorPreview = document.getElementById('color-box--alterd');

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
