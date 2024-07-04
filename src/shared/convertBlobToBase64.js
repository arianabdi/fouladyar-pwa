function isBlob(obj) {
  return (
    obj instanceof Blob ||
    (obj && obj.constructor && obj.constructor.name === 'Blob')
  );
}

export function blobToBase64(blobImage, callback) {
  if (!isBlob(blobImage)) {
    console.error('Invalid Blob object');
    return;
  }

  const reader = new FileReader();
  reader.onloadend = function () {
    const base64String = reader.result;
    callback(base64String);
  };
  reader.readAsDataURL(blobImage);
}
