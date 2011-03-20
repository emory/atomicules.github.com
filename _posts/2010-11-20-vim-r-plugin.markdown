---
layout: page
type: text
title: Vim R Plugin
categories: 
- code
---
I am really growing to love [R](http://www.r-project.org/). I'd dabbled with it briefly awhile back, but owing to a change of role at work I now have cause to use it a lot more (certainly beats Minitab).

[RCmdr](http://www.rcommander.com/) is a great way of easing yourself into R as it allows you to pick up the commands and syntax. Pretty soon though, since R is basically a programming language, you are (well, if you are me) going to want to use Vim and it turns out there is excellent plugin: [Vim R Plugin](http://www.vim.org/scripts/script.php?script_id=2628) that allows you to pass the current file or selection to R (much the same way as selecting and submitting in RCmdr).

When I installed it, it required [Python 2.7](http://python.org/download/releases/2.7/) and the corresponding [Pywin32](http://sourceforge.net/projects/pywin32/files/), but I notice the latest release allows Python 3.1.

There's one tiny problem that affected me when trying to send the selection or file to R. I got the following error (although the DOMAIN\username bit was my actual domain and username):

    source("/tmp/r-plugin-DOMAIN\username/Rsource-5324-RCommander.R")
    Error: '\u' is an unrecognized escape in character string starting "/tmp/r-plugin-DOMAIN\u"

Seems Vim R Plugin uses the results of `whoami` to create the `VIMPLUGIN_TMPDIR`, which houses the temporary files for sending commands to R, but for Windows users on a domain (i.e. corporate or institution users) `whoami` returns the domain name with the username and the backslash screws up the filepath.

I learnt that [Vim Scripts are on Github](https://github.com/vim-scripts)  - a nice consequence of figuring out a little [fix](https://github.com/i5m/Vim-R-plugin/commit/d87305153328ac390ad99f75e9325ce411745).