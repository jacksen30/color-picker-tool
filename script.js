const hexInput = document.getElementById('hex-input');
const inputColorPreview = document.getElementById('color-box--original');
const alteredColorPreview = document.getElementById('color-box--alterd');

// Adds a 'keyup' event listner to hex-input field
// Passes the input to isValidHex function for validation
// If validation returns true, updates the background color of DOM element with the id="color-box--original"
hexInput.addEventListener('keyup', () => {
  const hex = hexInput.value;
  if(!isValidHex(hex)) {
    return;
  }

  const strippedHex = hex.replace('#', '');
  inputColorPreview.style.backgroundColor = `#${strippedHex}`;
})

// Check if hex has a value,
// If a value is present it strips the # if present returns a boolean of true if hex is either 3 or 6 character and false if not.
const isValidHex = (hex) => {
    if(!hex) {
        return false;
    } else {
        const strippedHex = hex.replace('#', '');
        return strippedHex.length === 3 || strippedHex.length === 6;
    }
}

const convertHexToRgb = (hex) => {

}

