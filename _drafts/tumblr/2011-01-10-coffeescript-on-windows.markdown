---
layout: page
type: link
title: CoffeeScript on Windows
link: http://blog.mnasyrov.com/coffeescript-on-windows-how-to-roast-coffee
categories: 
- code
---
I found this post by Mikhail Nasyrov from [an answer on Stackoverflow](http://stackoverflow.com/questions/3175561/coffeescript-on-windows/4021046#4021046). It includes a clever little batch file to let you call the `coffee` command from directories other than the bin directory using the normal Windows path syntax (as opposed to the cygwin syntax). This is all very clever, but still means you must pass the path of the file you wish to compile, etc, in the cygwin format.

I thought I'd reverse this idea. I have a much simpler coffee.bat file which contains:

    @node /cygdrive/D/Users/me/code/github/coffee-script/bin/coffee %*

this way, if I add the coffee.bat directory to my Windows PATH, all I have to do is call

    coffee -c filetocompile.coffee

from the directory containing the file I'm working on and it'll compile into the same place. Which also means I can do it straight from vim:

     :!coffee -c %

For single files, this works great for me. For anything more complicated Mikhail Nasyrov has some solutions towards the end of his blog post. 

**EDIT 11-Jan-2011:**

This simple batch file works a treat with the [vim-coffee-script](https://github.com/kchmck/vim-coffee-script) plugin that can compile the current file on save. Ace!

