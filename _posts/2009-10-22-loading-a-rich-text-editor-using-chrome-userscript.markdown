---
layout: page
type: text
title: Loading a Rich Text Editor using Chrome UserScript
categories: 
- Code
---
Chrome UserScripting doesn't have the advantage of [UnsafeWindow](http://wiki.greasespot.net/UnsafeWindow) that GreaseMonkey does. From what I can tell UnsafeWindow seems to be the lazy way to do things, but which has the advantage of being FAR F*CKING easier, hence it's popularity.

Like a lot of things, the end solution is very simple, but it took me hours to get there:

    var editor = document.createElement('textarea');
    editor.id = "msgpost"
    editor.name = "msgpost"
    document.getElementById("whereyouwantit").appendChild(editor);
    
Creates the text area on the page

    var scriptnic = document.createElement('script');
    scriptnic.type = 'text/javascript';
    scriptnic.src = 'http://js.nicedit.com/nicEdit-latest.js';
    document.getElementsByTagName("head")[0].appendChild(scriptnic);
    
Creates a script element in the head of the page that loads [NicEdit](http://nicedit.com/). I had been playing about with the [YUI RichEditor](http://developer.yahoo.com/yui/editor/), but nicEdit is much more lightweight. And lightweight = awesome.

Now the fun part:

    function waitforlibs() {
        if (typeof bkLib=='undefined')
            window.setTimeout(waitforlibs, 100);
        else
            // Lazy, turns all text areas to editors, but you can target specific IDs        
            nicEditors.allTextAreas() 
    }
    
Since this is all being inserted via UserScript, even the call to the external library, need to ensure that it's loaded before calling the function. This is what this function does, which was pieced together from [Rich Manalang](http://manalang.com/loading-external-javascript-libraries-in-grea) and [RunningBlind](http://userscripts.org/topics/19388#posts-85803).   

The biggest problem I had was how to get the above to actually run. It's no good calling it from the UserScript itself as it needs to be in the context of the window. And there's no UnsafeWindow, so...

    var script = document.createElement('script');
    script.type = 'text/javascript';
    // Define function and run function
    script.textContent = waitforlibs +"; waitforlibs();"; 
    document.getElementById("whereyouwantit").appendChild(script);
    
which seems incredibly simple and straightforward now, but had me banging my head for hours.

And that's it. Now I can create a textarea and load the nicEditor. Of course this is useless on it's own, but I intend to tie into other stuff.

Why would you want to do this? Well I did so I guess some other idiot might.
