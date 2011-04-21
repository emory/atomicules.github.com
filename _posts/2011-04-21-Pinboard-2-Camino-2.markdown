---
layout: page
type: text
title: Pinboard to Camino, Take two
categories: 
- code
---
I live by the "It's Cool to be Crap" motto (from [R.A.D. magazine](http://www.whenwewasrad.co.uk/) for those that can remember). So to go with my [crap Haskell attempt](http://i5m.co.uk/code/2011/04/12/Selection-Sort-in-Haskell.html) here's my 2nd crap attempt at a [Pinboard to Camino bookmark importer](http://i5m.co.uk/code/2011/02/22/pinboard-bookmark-importer-for-camino.html), one that preserves Camino metadata (such as number of visits) rather than simply deleting and replacing all the bookmarks. I still have a long way to go, but I am on the right track (well I think I am). 

<script src="https://gist.github.com/934096.js?file=pinboard2camino.rb"></script>

This is as slow as chuff! Took about 35 mins to add a 1000 odd new bookmarks to my existing 2000 odd Camino bookmarks because it has to iterate through each node of the Camino bookmarks file for each bookmark exported from Pinboard.in. And I think it might have added some duplicates as well because I found out that Hpricot doesn't like finding URLs with additional colons in them, so will have failed to find the existing bookmark and added it again. 

The reason I stuck with this approach (iterating through each node) is that I can modify the Camino bookmarks structure on the fly. 
Now I've got this working I intend to speed it up by building a hash of the two bookmark files (which will make lookups and comparisons much easier, but complicates modifying the actual bookmark structure), make it more robust by using MD5s of URLs for searching and comparison and perhaps also looking into some Pinboard API options rather than doing a simple export of all bookmarks. But don't hold your breath...
 
