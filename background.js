//import Stack.js please!

chrome.runtime.onInstalled.addListener(function () {
  //initialize the stack: cpStack
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'copy') {
    //put to stack
    //cpStack.push(request.text);
    //store the stack
    // chrome.storage.sync.set({ stackNotes: cpStack }, function () {
    //   console.log('Updated stackNotes!');
    // });
    //update clipboard
    //const newText = cpStack.top();
    sendResponse({ text: 'hi' });

    //do smth with the sender tab as well: sender.tab
    //save the sender to the storage along with the copied thing!
  }
});
