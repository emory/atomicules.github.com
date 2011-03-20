---
layout: page
type: text
title: Fed up with Firefox
categories: 
- code
---
I've had enough of Firefox freezing and locking up. I know it's the stupid intranet sites and [IETab](https://addons.mozilla.org/en-US/firefox/addon/1419) that do it, so not strictly the fault of Firefox, but I'm fed up of one tab bringing the whole thing down. So I'm giving [ChromePlus](http://i5m.co.uk/post/205002917/chrome-with-ietab) a proper go. 

The *only* thing remaining that Firefox still has over ChromePlus is [gmail notifier](https://addons.mozilla.org/en-US/firefox/addon/173) - incredibly useful because it supports multiple accounts, provides me with actual notification windows and helps keep my personal (I.e: non-work related) clutter down (which was pretty much contained to Firefox). Oh, that and [FireGPG](ttp://getfiregpg.org), but I use that so rarely it doesn't matter. 

ChromePlus has everything else I use in Firefox built in: Userscripts ([Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/748)), Application shortcuts ([Prism](http://prism.mozilla.com/)), Developer Tools ([Firebug](http://getfirebug.com/)). 

I had hoped I could use this new standalone [Gmail Notifier](http://www.gmailnotifier.com/) to solve the email problem, but no - it uses IMAP and if I could access Gmail over IMAP at work I'd be fine anyway. So in the meantime I'm running two instances of Google's Gmail Notifier (someone needs to break out a thesaurus for "Notifier") [Gnotify](http://toolbar.google.com/gmail-helper/notifier_windows.html) app (Although when I'm not behind my work firewall I'm going to try downloading the [Gmail Growl for Windows](http://gmailgrowl.blogspot.com/). The Firefox Gmail Notifier also does some magic to let you switch between accounts pretty seamlessly. To get something equivalent I'm using an incognito application shortcut and a normal application shortcut so I can have both Gmail accounts logged in at the sametime.

A couple of notes on using ChromePlus:   

1) I've installed ChromePlus to my user directory (D:\Users\me\Applications\ChromePlus) since it doesn't follow the windows recommended practice of creating separate user data directories - it's more akin to a portable app.

2) I couldn't get themes to work by selecting one as you would in Chrome.  Using chrome://extension I managed to load an unpacked crx file: I created a directory called Unpacked Extensions in the ChromePlus UserData folder and used 7zip to unpack the extension.