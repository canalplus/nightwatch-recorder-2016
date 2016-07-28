# nightwatch-recorder-2016

Functional-oriented and javascript-friendly test recorder. Exports NightwatchJS scripts.
Inspired from the "resurectio" extension.

## Load the extension

Visit chrome://extensions in your browser.

1. Ensure that the Developer mode checkbox in the top right-hand corner is checked.
2. Click Load unpacked extension… to pop up a file-selection dialog.
3. Navigate to the directory in which your extension files live (top directory that contains the manifest.json), and select it.

## Global architecture

### controler

This module display the pop-up when the user starts the Chrome extension (by clicking on the CANAL+ logo)

Les commandes sont relayées au plugin Chrome (module <code>background</code>) via l'API <code>chrome.runtime</code> (https://developer.chrome.com/extensions/runtime)

```
         controler                                 background
[chrome.runtime.sendMessage]  -->  	[chrome.runtime.onMessage.addListener]
                                                        |
                                                        V
        [callback]            <--                  (Response)
```

## Debug tip

On the chrome://extension page, use the 'Examiner les vues : page en arrière-plan' link to get console logs from background.js

## See also

* https://developer.chrome.com/extensions/runtime