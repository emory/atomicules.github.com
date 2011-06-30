---
layout: page
type: text
title: Smile.co.uk Bank QIF Generator Bookmarklet
categories: 
- code
---
Errr... didn't mean to end up doing this <s>today</s> yesterday.

I bank with [Smile](http://www.smile.co.uk), probably the most luddite "internet" bank account in the history of the universe, and to date have relied on (as have probably most Smile account holders) the very useful [QIF generator](http://4square.co.uk/smile) by [Dave Small](http://benward.me/blog/online-banking-wishlist#comment-907) (that blog comment is the only "official" post that I can find about the tool, I think most have come across it via [word-of-mouth](https://www.wesabe.com/groups/39-uk-wesabe-users/discussions/384-any-other-uk-users#comment_4752)) to export my statements to [PocketSmith](https://my.pocketsmith.com/login). So all is usually well, and since laziness rules I've never bothered to write my own convertor. On occasion the tool has gone offline and I've gone looking at [alternatives](http://userscripts.org/scripts/search?q=smile.co.uk&submit=), but they've never really worked for me, and by the time I've finished looking and checked back again the 4square tool is usually back online. 

However, on a couple of occassions recently the 4square website has been down (again not for long), but it's been at a critical time for me (I need to know how skint I am NOW!). So I decided to finally stop being lazy and write my own back-up QIF-generator tool.

I thought about doing a user-script style extension or a browser add-on, but then thought a bookmarklet would be more cross platform (and simpler!).

So this is the source-code (In CoffeeScript):

<script src="https://gist.github.com/1053858.js?file=Smile.coffee"></script>

and this is the bookmarklet:

<script src="https://gist.github.com/1053858.js?file=Smile_Bookmarklet.js"></script>

(I'll be buggered if I can get an actual bookmarklet link to display correctly via Markdown. I got almost there, but couldn't stop RDiscount from turning the caret ^ into a `<sup>` element, so you'll just have to copy the above text and manually add a new bookmark). The same bookmarklet works on both Recent Items and Previous Statement pages. A limitation of doing a bookmarklet is that I can't generate a QIF file for download. All I can do is open up a web page that you can then save as a text file (add the ".qif" extension yourself) or copy and paste the text into a text editor and save as a QIF file - this is the same limitation that affects the [OFX/CSV userscript](http://userscripts.org/scripts/show/6976) (that only works on Previous Statement pages).

Came across an interesting issue whilst doing this in that it seems you [can't pass line breaks to a plain text file](http://stackoverflow.com/questions/4203110/creating-an-export-function-with-javascript) using the Data URI scheme. The only way to get a line break to show up is using text/html:

Doesn't work: `window.open("data:text/plain;charset=utf-8, No \n line \n breaks");`

Works: `window.open("data:text/html;charset=utf-8, Yes <br />line <br /> breaks");`
