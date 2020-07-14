import { CopyPasteStack } from './Stack.js'; //for import to work, needs to declared as a module in bg.html

let cpStack;

chrome.runtime.onInstalled.addListener(function () {
  cpStack = new CopyPasteStack();

  //tabs (in all windows) need to be refreshed for the c/p logic to work
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(function (tab) {
      chrome.tabs.reload(tab.id);
    });
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let newText;
  switch (request.message) {
    case 'copy':
      //push to the stack
      cpStack.push(request.text);
      //store the stack
      chrome.storage.sync.set({ stackNotes: cpStack }, function () {
        console.log('Updated stackNotes in copy!');
      });
      //update clipboard
      newText = cpStack.peek();
      console.log('top item is (copy): ', newText);
      sendResponse({ text: newText });
      break;
    case 'paste':
      //pop from the stack
      cpStack.pop();
      //store the stack
      chrome.storage.sync.set({ stackNotes: cpStack }, function () {
        console.log('Updated stackNotes in paste!');
      });
      //update clipboard
      newText = cpStack.peek();
      console.log('top item is (paste): ', newText);
      sendResponse({ text: newText });
      break;
    default:
      sendResponse({});
  }
});
