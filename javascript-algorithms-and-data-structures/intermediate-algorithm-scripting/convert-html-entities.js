const htmlCharacterCodes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': "&quot;",
  "'": "&apos;"
}
function getHTMLCharacterOrCode(character) {
  if (character in htmlCharacterCodes)
    return htmlCharacterCodes[character];
  else
    return character;
}

function convertHTML(str) {
  return str.split("").map(getHTMLCharacterOrCode).join("");
}

convertHTML("Dolce & Gabbana");