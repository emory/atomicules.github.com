---
layout: page
type: text
title: Debugging XSLT files for Webkit
categories: 
- code
---
Annoyingly Webkit browsers give [bugger](https://bugs.webkit.org/show_bug.cgi?id=15751) [all](https://bugs.webkit.org/show_bug.cgi?id=5446) feedback if there are XSLT errors. This was making it very difficult for me to track down an error in a XSL file because the same file was working fine elsewhere (Firefox, Opera, IE), but just resulting in a blank page in Webkit. However, after a bit of reading and re-reading about how [Webkit uses libxslt](http://webkit.org/projects/xslt/index.html) I finally clicked through to the [libxslt](http://xmlsoft.org/XSLT/) page itself and found [xsldbg](http://xsldbg.sourceforge.net/).  It is [easy to use](http://xsldbg.sourceforge.net/#Testing), all you do is keep typing "continue" and it will show you the error(s) in the file. A very handy tool if you are struggling with Webkit XSLT mysteries.