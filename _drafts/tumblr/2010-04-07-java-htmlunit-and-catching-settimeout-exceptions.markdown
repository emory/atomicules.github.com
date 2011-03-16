---
layout: page
type: text
title: Java, HTMLUnit and catching setTimeout exceptions
categories: 
- code
---
Colour as bleeding obvious, but in [HTMLUnit](http://htmlunit.sourceforge.net/) I could not figure out how to "[just use WebClient.setTimeout(int)](http://sourceforge.net/mailarchive/message.php?msg_id=4884C3E5.9090309@yahoo.fr)".

I was searching for something like this:

    try{
        webClient.setTimeout(60000);
        HtmlPage page = (HtmlPage) webClient.getPage("http://somepage");
    }
    catch(TimeoutError e) {
        //Try again, or abort, etc
    }

Except `TimeoutError` is made-up. I was sure `setTimeout()` must cause an exception, otherwise what the hell was the point of it? But no amount of searching would give me the answer, I'd either end up [on the trail](http://sourceforge.net/mailarchive/message.php?msg_id=BAY117-W21EBC7315CB5626E528C56D68A0@phx.gbl) to "[just use WebClient.setTimeout(int)](http://sourceforge.net/mailarchive/message.php?msg_id=4884C3E5.9090309@yahoo.fr)" or finding [my exact question](http://sourceforge.net/mailarchive/message.php?msg_id=26197231.post@talk.nabble.com), but with no answer at all.

Turns out all I needed to do was to piece together these two bits of information:

1. [setTimeout](http://htmlunit.sourceforge.net/apidocs/com/gargoylesoftware/htmlunit/WebClient.html#setTimeout(int)) Sets the timeout of the **WebConnection**. 

2. [WebConnection](http://htmlunit.sourceforge.net/apidocs/com/gargoylesoftware/htmlunit/WebConnection.html) - Throws: **IOException** - if an IO error occurs

Yes, handling timeouts is as simple as

    try{
        webClient.setTimeout(60000);
        HtmlPage page = (HtmlPage) webClient.getPage("http://somepage");
    }
    catch(IOException e) {
        //This catches a timeout error as well
    }

(Thankfully I figured this out before I asked on Stackoverflow - because it turns out there _is_ such a thing as a stupid question)