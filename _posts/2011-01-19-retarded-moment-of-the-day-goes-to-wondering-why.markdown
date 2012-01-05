---
layout: page
type: photo
title: 
photo: http://atomicules.co.uk/images/tumblr_lf9u1sfalL1qzcagp.jpg
click-through: https://github.com/i5m/Pinboard-Tools-for-Google-Chrome
categories: 
- code
---
Retarded moment of the day goes to: Wondering why I couldn't get [content scripts](http://code.google.com/chrome/extensions/content_scripts.html) to load when trying to pass page content to an extension. I tried [all](http://code.google.com/chrome/extensions/messaging.html) [kinds](http://groups.google.com/group/chromium-extensions/browse_thread/thread/eab847f0a32ec25c/61ef3f54ca14c98c?pli=1) [of](http://stackoverflow.com/questions/1964225/accessing-current-tab-dom-object-from-popup-html) [things](http://stackoverflow.com/questions/2914973/how-to-grab-data-from-webpage-in-chrome-and-output-into-chrome-extension-popup). Reloaded the extension a hundred times. Then it finally dawned on me: the content script is for the page (duh!) not the extension. Reloaded the tab and hey presto. &lt;Incredibly ashamed face&gt;.

Anyway, since moving to [Pinboard](http://pinboard.in) I've been looking for a decent [Chrome extension](http://pinboard.in/resources/#chrome), but most of them just seem to be glorified [bookmarklets](http://pinboard.in/howto/#saving) ([an exception](https://chrome.google.com/extensions/detail/nfccdohlgojifgadgnbjoejdfaalaehn), but I'm not interested in searching). I did however notice that [one of them is on Github](https://github.com/jonnablaze/Pinboard-Tools-for-Google-Chrome) which just made it all too inviting to click 'Fork' and start playing.

So, [I've started doing some little tweaks](https://github.com/i5m/Pinboard-Tools-for-Google-Chrome) to load the bookmarking window in the extension popup, rather than have it opening in a separate window (there are [some downsides to this approach](https://github.com/i5m/Pinboard-Tools-for-Google-Chrome/commit/7222e1ebc49773f56fa7b0230835636ef949b74e), but this is how I like it) and it also pulls in selected text to the description field. Next on the list is fixing the Read Later option similarly so it doesn't open a new window.

As an aside, before I got into tinkering with code, but when I had just started using and being interested in open source software, I used to get a wee bit upset at 'forking'. It would annoy me that rather then "get along" and contribute to one project, people would fork and you'd be stuck choosing between two (or more) options until one developed more than the other and became the obvious choice ([Inkscape and Sodipodi](http://wiki.inkscape.org/wiki/index.php/FAQ#How_did_Inkscape_start.3F) spring to mind). However, now I've got a bit more of a clue and what's more the advent of Git and (especially) Github really do make forking a feature; of all those Chrome extensions the easiest one to start modifying was the one on Github. And the [network](https://github.com/jonnablaze/Pinboard-Tools-for-Google-Chrome/network) ensures that even if my changes never get pulled back it's still linked in some way and findable by others.
