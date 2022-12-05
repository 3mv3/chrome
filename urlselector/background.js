// https://codepen.io/knobo/pen/WNeMYjO



  chrome.runtime.onMessage.addListener(({ type, name }) => {
    if (type === "set-name") {
      chrome.storage.local.set({ name });
    }
  });
  