//enabled on all urls
console.log('content script!');

document.addEventListener('copy', (e) => {
  console.log('in copy!');
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
          //note that we should update the clipboard only AFTER we read from the clipboard - this problems happens as the tab asks for user confirmation to use the clipboard
          chrome.runtime.sendMessage({ message: 'paste' }, function (response) {
            updateClipboard(response.text);
          });
        })
        .catch((err) => {
          console.error('Could not read text: ', err);
        });
    }
  });
};

document.addEventListener('paste', function (e) {
  console.log('in paste!');
  readClipboard();
});
