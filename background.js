//bg: can interact with the system clipboard
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('hello');
  if (request.message === 'copy') {
    // chrome.storage.sync.set({ color: '#3aa757' }, function () {
    //   console.log('The color is green.');
    // });
    sendResponse({});
    //do smth with the sender tab as well: sender.tab
    //save the sender to the storage along with the copied thing!
    //how to retrieve the text that was copied??
  }
});
