---
layout: page
type: text
title: Pinboard Bookmark Importer for Camino
categories: 
- code
---
It's been awhile since I had a play with Applescript, but I thought I'd use it to automate importing my Pinboard bookmarks (so I _(a)_ have a local backup and _(b)_ can search straight from Camino).

<script src="https://gist.github.com/835932.js?file=gistfile1.scpt"></script>

It's not very robust since it uses UI scripting and could fallover if you happen to have similarly named files already on the desktop, but it works for me. I thought (for now) I'd just use the built in bookmark importer rather than try to touch the bookmarks.plist file directly. The downside is that it completely replaces the pinboard bookmarks collection each time (which I think means you'd lose visit counts in Camino - not a concern for me), but the upside is that it isn't going to corrupt your bookmarks file. So as it is, it's ok for occasional or one off use, no good for regularly keeping Camino in sync with Pinboard (I'd have to do something more clever and target the bookmarks.plist file directly and I don't have the time or need to do that right now).