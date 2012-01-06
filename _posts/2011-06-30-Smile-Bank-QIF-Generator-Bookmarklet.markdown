---
layout: page
type: text
title: Smile.co.uk Bank QIF Generator Bookmarklet
categories: 
- code
---
Errr... didn't mean to end up doing this <s>today</s> yesterday.

I bank with [Smile](http://www.smile.co.uk), probably the most luddite "internet" bank account in the history of the universe, and to date have relied on (as have probably most Smile account holders) the very useful [QIF generator](http://www.web-development.co.uk/smile/) by [Dave Small](http://benward.me/blog/online-banking-wishlist#comment-907) (that blog comment is the only "official" post that I can find about the tool, I think most have come across it via [word-of-mouth](https://www.wesabe.com/groups/39-uk-wesabe-users/discussions/384-any-other-uk-users#comment_4752)) to export my statements to [PocketSmith](https://my.pocketsmith.com/login). So all is usually well, and since laziness rules I've never bothered to write my own convertor. On occasion the tool has gone offline and I've gone looking at [alternatives](http://userscripts.org/scripts/search?q=smile.co.uk&submit=), but they've never really worked for me, and by the time I've finished looking and checked back again the 4square tool is usually back online. 

However, on a couple of occassions recently the 4square website has been down (again not for long), but it's been at a critical time for me (I need to know how skint I am NOW!). So I decided to finally stop being lazy and write my own back-up QIF-generator tool.

I thought about doing a user-script style extension or a browser add-on, but then thought a bookmarklet would be more cross platform (and simpler!).

So this is the source-code (In CoffeeScript):

{% highlight coffeescript %}
#Bookmarklet to generate QIF for Recent Item and Previous Statement pages on SMILE.co.uk bank
#Will (try to) open a new popup window where you will have to either:
#a) Copy text from and paste to text editor (Chrome)
#b) Save the page as a text file (Firefox)
#
#Written in Coffescript, but just use http://javascriptcompressor.com/ to compress the 
#compiled javascript so you have a bookmarklet.

data = document.getElementsByClassName("summarytable")[0].children[1].children

qif = "!Type:Bank<br />"
transaction = (row) -> 
	unless row.children[0].innerHTML.trim() is "&nbsp;" #skip last row on Recent Items page
		unless row.children[1].innerHTML.trim() is "BROUGHT FORWARD" #skip first row on Previous Statements page
			qif += "D"+row.children[0].innerHTML.trim()+"<br />"
			qif += "P"+row.children[1].innerHTML.trim()+"<br />"
			#Then need transaction amount
			unless row.children[2].innerHTML.trim() is "&nbsp;"
				qif += "T"+row.children[2].innerHTML.trim().substring(1)+"<br />"
			else 
				qif += "T-"+row.children[3].innerHTML.trim().substring(1)+"<br />"
			qif += "^<br />"

transaction(row) for row in data

window.open("data:text/html;charset=utf-8,"+qif)

undefined #To get the void 0 bit so doesn't affect current window.

{% endhighlight %}
[Link to gist](https://gist.github.com/1053858)

and this is the bookmarklet:

{% highlight javascript %}
javascript:var data,qif,row,transaction,_i,_len;data=document.getElementsByClassName("summarytable")[0].children[1].children;qif="!Type:Bank<br />";transaction=function(row){if(row.children[0].innerHTML.trim()!=="&nbsp;"){if(row.children[1].innerHTML.trim()!=="BROUGHT FORWARD"){qif+="D"+row.children[0].innerHTML.trim()+"<br />";qif+="P"+row.children[1].innerHTML.trim()+"<br />";if(row.children[2].innerHTML.trim()!=="&nbsp;"){qif+="T"+row.children[2].innerHTML.trim().substring(1)+"<br />"}else{qif+="T-"+row.children[3].innerHTML.trim().substring(1)+"<br />"}return qif+="^<br />"}}};for(_i=0,_len=data.length;_i<_len;_i++){row=data[_i];transaction(row)}window.open("data:text/html;charset=utf-8,"+qif);void 0;
{% endhighlight %}

(I'll be buggered if I can get an actual bookmarklet link to display correctly via Markdown. I got almost there, but couldn't stop RDiscount from turning the caret ^ into a `<sup>` element, so you'll just have to copy the above text and manually add a new bookmark). The same bookmarklet works on both Recent Items and Previous Statement pages. A limitation of doing a bookmarklet is that I can't generate a QIF file for download. All I can do is open up a web page that you can then save as a text file (add the ".qif" extension yourself) or copy and paste the text into a text editor and save as a QIF file - this is the same limitation that affects the [OFX/CSV userscript](http://userscripts.org/scripts/show/6976) (that only works on Previous Statement pages).

Came across an interesting issue whilst doing this in that it seems you [can't pass line breaks to a plain text file](http://stackoverflow.com/questions/4203110/creating-an-export-function-with-javascript) using the Data URI scheme. The only way to get a line break to show up is using text/html:

Doesn't work: `window.open("data:text/plain;charset=utf-8, No \n line \n breaks");`

Works: `window.open("data:text/html;charset=utf-8, Yes <br />line <br /> breaks");`

*[EDIT 04-Aug-2011: Updated link to new home of Dave Small's Smile QIF Generator web page]*
