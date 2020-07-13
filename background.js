import { CopyPasteStack } from './Stack.js'; //for import to work, needs to declared as a module in bg.html

let cpStack;

chrome.runtime.onInstalled.addListener(function () {
  cpStack = new CopyPasteStack();
  console.log(cpStack.data);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'copy') {
    //put to stack
    cpStack.push(request.text);
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
