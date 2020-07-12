//enabled on all urls
console.log('content script!');

document.addEventListener('copy', (e) => {
  const selection = document.getSelection().toString();
  chrome.runtime.sendMessage({ message: 'copy', text: selection }, function (
    response
  ) {
    console.log(response);
    updateClipboard(response.text);
  });
});

updateClipboard = (text) => {
  navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
    if (result.state == 'granted' || result.state == 'prompt') {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log('Text copied to clipboard');
        })
        .catch((err) => {
          // This can happen if the user denies clipboard permissions:
          console.error('Could not copy text: ', err);
        });
    }
  });
};

document.addEventListener('paste', function (e) {
  console.log(e);
  console.log(e.clipboardData.getData('text'));
  //send a message to bg to once again updateClipboard()
});
