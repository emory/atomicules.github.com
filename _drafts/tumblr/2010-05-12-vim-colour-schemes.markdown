---
layout: page
type: text
title: Vim Colour Schemes
categories: 
- code
---
Owing to having to set-up Vim again on my work machine, I decided to have a look around to see if I could find a better colour scheme than [pyte](http://www.vim.org/scripts/script.php?script_id=1492), which I've been using for awhile.

It seems there are a few good dark background ones (I didn't find any other light background ones):

* [IR_Black](http://blog.infinitered.com/entries/show/8) - Very good.
* [wombat](http://dengmao.wordpress.com/2007/01/22/vim-color-scheme-wombat/)
* [zenburn](http://slinky.imukuppi.org/zenburnpage/)

Of those I like IR_Black best, but I think I'll likely toogle between pyte and IR_Black as overall I'm definitely more of a light background guy and don't really get the whole "view on black" obsession.

I also went looking to see if the toolbar icons could be improved, because they are pretty terrible on Windows and was surprised to find someone [had tackled this already](http://zaaghad.blogspot.com/2009/10/nice-gvim-toolbar-icons-for-windows.html), but I've decided to hide the toolbar as I don't really ever use it. So that solves that problem.

And note to self:

    set guioptions-=T  "remove toolbar
    colorscheme ir_black "set default colour scheme

