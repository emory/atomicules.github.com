---
layout: page
type: text
title: Learning C
categories: 
- code
---
Yesterday I decided I'd make a start on learning C as I'd like to be able to hack [Shoes](http://shoes.heroku.com) a bit. So the first thing I needed to sort out was a build environment as there's no such loveliness as [IRB](http://en.wikipedia.org/wiki/Interactive_Ruby_Shell). I already had the [WDK](http://www.microsoft.com/whdc/devtools/WDK/default.mspx) (previously, DDK) build environment installed for [building Shoes](http://wiki.github.com/shoes/shoes/buildingshoeswithwindowsddk) so figured that I should also be able to use this for plain C, but just didn't know how (the only things I've ever typed are _rake_ and _make_). Thankfully someone else had documented how to [use WDK to build C programs](http://randomlearningnotes.wordpress.com/2009/04/20/using-wdkddk-build-environment-for-drivers-and-non-drivers/) so I was all set to go. 

That was until I stumbled across this cryptic error message trying to build: "[fatal error U1087: cannot have : and :: dependents for same target](http://stackoverflow.com/questions/1154660/fatal-error-u1087-cannot-have-and-dependents-for-same-target)”. Turns out this is because the path I was using had a space in it. This would be because I was using something along the lines of "D:\Users\me\\*My Friggin' Documents*\code\". You know the whole "My Documents" thing that Windows pushes on you (and while I'm at it why are "My Pictures", "My Videos", etc indside "My Documents"?!!). Had it been a home PC (well apart from the fact I wouldn't have been using Windows in the first place) I gather this would have been [simple to fix](http://www.edbott.com/weblog/?p=737), but as it was it meant searching through the registry and making changes in mutliple entries (Shell Folders) so I could finally eliminate "My Documents" (hmmm, why not just "Documents" in the first place?) and while I was at it reorganise my "Home" directory into a much more [sensible layout](http://www.apple.com/macosx/). I guess it shouldn't have come as a suprise that the hardest bit about setting out to learn C would be using bloody Windows. 

Anyway, with that out of the way I set off to find some handy Vim plugins to help me with C:

* [a.vim](http://www.vim.org/scripts/script.php?script_id=31) for switching between header and source files.
* [taglist.vim](http://vim.sourceforge.net/scripts/script.php?script_id=273) I don't really need this with my simple C files, but I think this is what helps turn Vim into an IDE, rather than being an editor that works on separate files. Will probably be handy for my Ruby stuff. Requires [Exuberant CTags](http://ctags.sourceforge.net/). All explained, complete with cute baby pic, at [thegeekstuff.com](http://www.thegeekstuff.com): [Ctags and Taglist: Convert Vim Editor to Beautiful Source Code Browser for Any Programming Language](http://www.thegeekstuff.com/2009/04/ctags-taglist-vi-vim-editor-as-sourece-code-browser/). And also thanks to Google for turning up [this person's twitter](http://twitter.com/kuy/statuses/190014312) status. I would have never figured it out otherwise. 
* [Pyte](http://vim.sourceforge.net/scripts/script.php?script_id=1492) Not related to C, but I found this colour scheme which looks nice.

Didn't bother with:

* [c.vim](http://vim.sourceforge.net/scripts/script.php?script_id=213) I reckon SnipMate will get me most of this, and it'll get too confusing using more than one snippet style plugin.