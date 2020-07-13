//enabled on all urls
console.log('content script!');

document.addEventListener('copy', (e) => {
  const selection = document.getSelection().toString();
  chrome.runtime.sendMessage({ message: 'copy', text: selection }, function (
    response
  ) {
    updateClipboard(response.text);
  });
});

updateClipboard = (text) => {
  navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
    if (result.state == 'granted' || result.state == 'prompt') {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log('Copied to clipboard: ', text);
        })
        .catch((err) => {
          // This can happen if the user denies clipboard permissions:
          console.error('Could not copy text: ', err);
        });
    }
  });
};

readClipboard = () => {
  navigator.permissions.query({ name: 'clipboard-read' }).then((result) => {
    if (result.state == 'granted' || result.state == 'prompt') {
      navigator.clipboard
        .readText()
        .then((text) => {
          console.log('Read from the clipboard: ', text);
          return text;
        })
        .catch((err) => {
          console.error('Could not read text: ', err);
        });
    }
  });
};

document.addEventListener('paste', function (e) {
  const paste = readClipboard();
  console.log('paste is: ', paste);
  //if(paste) then sendMessage?
  chrome.runtime.sendMessage({ message: 'paste' }, function (response) {
    updateClipboard(response.text);
  });
});
