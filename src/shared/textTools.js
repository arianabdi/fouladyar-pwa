export function convertToTitleCase(str) {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


export  function deleteAndReturnRemaining(arr, strToDelete) {
  // Find the index of the string to delete
  const indexToDelete = arr.indexOf(strToDelete);

  // Check if the string is found in the array
  if (indexToDelete !== -1) {
    // Use splice to remove the element at the found index
    arr.splice(indexToDelete, 1);
  }

  // Return the modified array
  return arr;
}
