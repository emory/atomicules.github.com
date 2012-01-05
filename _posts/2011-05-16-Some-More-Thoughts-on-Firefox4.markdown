---
layout: page
type: text
title: Some More Thoughts on Firefox 4 and TenFourFox
categories: 
- code
---
As a result of my [FormData frustrations](http://atomicules.co.uk/2011/05/07/Pinboard-Save-Tabs-and-Camino.html) I thought I'd give TenFourFox a proper whirl and at the same time try FireFox 4 as my default on Windows (instead of Chrome) so I could also try out the synchronisation service.

## Firefox 4 (in general)

* Out of the box i don't think it looks as good as Chrome or Camino, etc, but thanks to the high level of customisation you can - [after quite a bit of fiddling](https://gist.github.com/972769) - get an ok result (one that uses less vertical space than Chrome, which is pretty good).
    ![""](/images/ff4win.png "Firefox 4 on Windows XP")
    ![""](/images/tffosx.png "TenFourFox on OSX 10.5")
* However, it requires slightly different UI tweaks for each platform
* Tabs on top on OSX actually uses ever so slightly more vertical space!
* The biggest problem on Windows (for me) is the modal dialogue for proxy authentication, but only because I use Lastpass and so I can't then get to the Lastpass button to get the password - (I have to launch a new browser window). In Chrome I don't have this problem as the authentication dialog isn't modal; although I used to have a whole bigger problem where opening new tabs would randomly lock up Chrome altogether until I figured out it was because I had "DNS Prefetching" (or "Predict network actions to improve page load performance" as it now seems to be called) checked, which must cause some hidden, impossible to get to, authentication dialog to appear in the background - we have very aggressive and annoying proxy authentication at work. It sucks.
* Other annoyance (minor) on Windows is that I'd set Chrome as PDF viewer instead of Acrobat and actually prefer this over launching Acrobat reader; I always have a browser window open so this is much quicker for me. I wish Firefox had the same.

## TenFourFox

Just out of interest I thought I'd see how TenFourFox performed at the Sunspider benchmark, since the developer is very clever and [finished implementing nanojit for PPC](http://tenfourfox.blogspot.com/2011/04/attention-g5-owners-your-javascript-no.html).


<table style="border: 1px solid grey; border-collapse: collapse;">
<thead>
    <tr><th>Browser</th><th>Sunspider</th></tr>
<tbody style="border: 1px solid grey; border-collapse: collapse;">
    <tr><td style="border-right: 1px solid grey; border-collapse: collapse;">Camino</td><td style="text-align: right">13558.8ms +/- 5.5%</td></tr>
    <tr><td style="border-right: 1px solid grey; border-collapse: collapse;">TenFourFox</td><td style="text-align: right">5667.5ms +/- 1.7%</td></tr>
    <tr><td style="border-right: 1px solid grey; border-collapse: collapse;">Safari 5</td><td style="text-align: right">10051.2ms +/- 11.5%</td></tr>
    <tr><td style="border-right: 1px solid grey; border-collapse: collapse;">Webkit nightly</td><td style="text-align: right">9637.7ms +/- 6.9%</td></tr>
</table>
<br/>
   
Wow, so it really is the best for PPC Macs at the moment for JavaScript performance. What's more interesting is comparing my 1GHz G4 PowerBook  to my work's 2.4 GHz Core 2 Duo laptop.

<table style="border: 1px solid grey; border-collapse: collapse;">
<thead>
    <tr><th>Browser</th><th>Sunspider</th></tr>
<tbody style="border: 1px solid grey; border-collapse: collapse;">
    <tr><td style="border-right: 1px solid grey; border-collapse: collapse;">Firefox 3.6 (equivalent to Camino)</td><td style="text-align: right">926.8ms +/- 2.6%</td></tr>     
    <tr><td style="border-right: 1px solid grey; border-collapse: collapse;">Firefox 4 (equivalent to TenFourFox)</td><td style="text-align: right">375.9ms +/- 1.0%</td></tr>
    <tr><td style="border-right: 1px solid grey; border-collapse: collapse;">Safari 5</td><td style="text-align: right">364.2ms +/- 2.8%</td></tr>
    <tr><td style="border-right: 1px solid grey; border-collapse: collapse;">Webkit nightly</td><td style="text-align: right">377.1ms +/- 1.4%</td></tr>
    <tr><td style="border-right: 1px solid grey; border-collapse: collapse;">Internet Explorer 8</td><td style="text-align: right">5245.8ms +/- 2.2%</td></tr>
</table>
<br/>
   
Ok, so as expected, when comparing similar web browsers, my Powerbook gets eclipsed by a more modern processor, but I think it's pretty impressive that TenFourFox on my PowerBook almost equals IE8 (the default and official web browser of the company I work for; it was until very recently IE6!) on a Core 2 Duo.

## Firefox Home (The iOS app)

My main gripe here is I don't really understand the point in syncing tabs if it isn't going to sync cookies - since password management is fiddly on a mobile app (on a desktop browser, cookie sync is not so important as I use Lastpass to log in; which works more fluidly on the desktop than it does on iOS). It's actually an ok little app and you can use it as a general web browser although it would be better if it had actual tabs (since it does sync them).

## Firefox Sync

It turns out I really don't want or need my 'work' browser synchronised with my 'home' browser. I don't need the same bookmarks on bookmarks bar - although I was impressed it got the order of them correct and also separators, etc. I guess sync is more for people with multiple home computers, etc, where I imagine it would be quite handy. History syncing is probably the most useful thing, for those oh-so-too-frequent-times when I've neglected to bookmark something useful I found earlier in the day and now for some reason can't find the page again via Google (or actually, DuckDuckGo).

