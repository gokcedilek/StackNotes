//enabled on all urls
console.log('content script!');

document.addEventListener('copy', (e) => {
  //alert('copy detected!');
  //send a message to bg
  console.log('hi!!');
  const selection = document.getSelection();
  console.log(selection.toString());
  chrome.runtime.sendMessage({ message: 'copy' }, function (response) {
    console.log('copied!');
  });
});

document.addEventListener('paste', function (e) {
  alert('paste detected!');
  //send a message to bg
});
