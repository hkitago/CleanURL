//
//  content.js
//  CleanURL
//
//  Created by Hiroyuki KITAGO on 2025/12/02.
//
(() => {
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'APPLY_CLEAN_URL') {
      const newUrl = message.cleanedUrl;

      if (newUrl && newUrl !== location.href) {
        history.replaceState(null, '', newUrl);
      }
    }

    if (message.action === 'RESTORE_ORIGINAL_URL') {
      const original = message.originalUrl;

      if (original && original !== location.href) {
        history.replaceState(null, '', original);
      }
    }
  });
})();
