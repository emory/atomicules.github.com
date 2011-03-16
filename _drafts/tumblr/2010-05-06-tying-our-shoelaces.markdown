---
layout: page
type: text
title: Tying our Shoelaces
categories: 
- code
- shoes
---
It might be collectively slow progress, but progress _is_ being made on the next version of [Shoes](http://shoes.heroku.com), Policeman. 

Ashbb, continues his [excellent work](http://github.com/ashbb/shoes_hack_note/) on the Windows side of things. [MinGW is now the recommended build route](http://wiki.github.com/shoes/shoes/buildingshoeswithmingw), which although currently a bit more buggy that the old WDK route, should make things easier in the future.

OSX was struggling. Although I am really interested in Shoes, I have no discernible OSX programming skills (you can even drop the OSX from that if you want ;-) ) and only have limited access to OSX PPC (and PPC Macs are the way of the dinosaur). So although I could build and test on OSX PPC, everyone else was on 10.6, but unable to build because of the Carbon code Shoes used. We tried the route of building as 32-Bit and got no where. Now, all of a sudden, things are looking great:

* We have [someone](http://github.com/summitpush) who has popped up to do [10.5 Intel Builds](github.com/shoes/shoes/wikis/recentbuilds).
* I finally got a chance to [rebuild](http://wiki.github.com/shoes/shoes/buildingshoesonosx) and update the [deps for OSX PPC](http://wiki.github.com/shoes/shoes/buildingshoesonosxppc). And can now knock out [recent builds](github.com/shoes/shoes/wikis/recentbuilds).
* And a [saviour](http://github.com/mkelly) appeared who could actually [re-write the Carbon stuff](http://github.com/mkelly/shoes/commit/f9ef6bb9f8dce97784eeddaed1c459db64cece95) in Cocoa and get it to build on Snow Leopard. 

Packaging, arguably one of the desirable features of Shoes was (is) a messy situation on Policeman due to changes in Ruby 1.9, but [ashbb](http://github.com/ashbb/shoes/commit/7c106b1e858462eddf6bcf6335584b2ac694af7a) and [Cecil Coupe](http://github.com/ccoupe/shoes/commit/7e0ac87ee760695e72a8f4f9bfb67618ff114114) have made progress there. 

Fingers crossed we can release Policeman soon, although we might have to release with just Shy file packaging first of all. 