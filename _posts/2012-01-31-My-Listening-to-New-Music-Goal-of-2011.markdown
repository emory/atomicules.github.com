---
layout: page
type: text
title: My "Listening to New Music" Goal of 2010
categories: 
- code
- owtelse
---
I'll mostly skip the end of year review thing this time around as otherwise I will be unable to prevent a moan of truly EPIC proportions. I'll just let out a little sigh and crack on with this:

I don't think I explicitly set this as a new year's resolution last year, but during the year I certainly developed an intent of listening to as much new music as possible. And although it felt like I'd achieved that aim I wanted to prove it. 

I found this excellent [Last.fm discoveries app](http://bananabo.at/lastfm/) via [build.last.fm](http://build.last.fm/item/553) earlier in the year, which almost exactly does what I want, but it only works with artists that have a minimum of twenty five plays in your library whereas I wanted to count even one play (because I'd have still listened to that artist even if I'd then immediately decided it was crap and warranted no further plays).

Rather than try to hack/modify that, it just so happened that I'd also been playing with moving (or simultaneously using) [libre.fm](http://alpha.libre.fm/user/atomicules) and so was exporting scrobbles from last.fm to a local file. I'd started using the [tool recommended on libre.fm](http://bugs.foocorp.net/projects/librefm/wiki/LastToLibre), but it missed some scrobbles (even though it went through every page of my last.fm scrobbles) so looking around I then found [this other tool](http://www.easyclasspage.de/lastfm/seite-14.html) that worked much better and got everything; it backs up to an XML file, rather than the (nicer) simple file format used by the `lastexport.py` script (I'm still trying to find the time to make sure my libre.fm history matches my last.fm history, let alone set-up dual scrobbling; it's harder than it seems to get reliable offline scobbling on Linux).

Using R it's really easy to import an XML file and get it into a dataframe. It's then possible to split plays by year and identify what artists haven't appeared in a previous year:

{% highlight r %}
#Last.fm analysis

library('XML')
# See here for use: http://www.omegahat.org/RSXML/gettingStarted.html

doc = xmlRoot(xmlTreeParse("lastfmscrobbles.xml"))
mat = xmlSApply(doc, function(x) xmlSApply(x, xmlValue)) #Has side effect that all cell contents are in lists
mat <- t(mat) #transpose
scrobbles <- as.data.frame(mat)

#Unlist columns of interest
scrobbles$date <- unlist(scrobbles$date, use.names=FALSE)
scrobbles$artist <- unlist(scrobbles$artist, use.names=FALSE)
#Make sure dates are actual dates.
scrobbles$date <- as.Date(scrobbles$date, "%d %b %Y")

#Subset scrobbles by year
scrobbles2011 <- subset(scrobbles, grepl("^2011", date))
scrobblespre2011 <- subset(scrobbles, !grepl("^2011", date))
scrobbles2010 <- subset(scrobbles, grepl("^2010", date))
scrobblespre2010 <- subset(scrobbles, !(grepl("^2011", date) | grepl("^2010", date)))

#Then find number of unique in a year
#2011
unique(scrobbles2011$artist)[!unique(scrobbles2011$artist) %in% unique(scrobblespre2011$artist)]

#2010
unique(scrobbles2010$artist)[!unique(scrobbles2010$artist) %in% unique(scrobblespre2010$artist)]
{% endhighlight %}

Based on this raw data, I had 162 artists in 2011 and 113 in 2010. However, this needs quite a bit of manual filtering as I've only been scrobbling since 2008 and I like to delve back into the past (bands I listened to when I was about sixteen seem to be a favourite). So, after a bit of manual sifting I get this to [129 new artists for 2011 vs 73 new artists for 2010](http://simp.ly/publish/QrvxfY). So, yep, I did succeed in my goal of finding more new music.

This is pretty impressive as both my iPod mini (finally!) and iPod Touch died permanent deaths last year so listening and scrobbling has relied on me using a computer. This year I'm taking it easier: It was just too much work to keep checking through the Line of Best Fit and the Guardian New Band of the Day feeds, looking for what seemed interesting and then trying to "find" tracks by those artists lying around on the internet. I'm hoping to use libre.fm to find more legitimately free music to listen to this year, but I'm not going to go mad about it.

(As a footnote: One of the most impressive things about last year is that I managed to oust Freesteylers from [my top artists](http://www.last.fm/user/i5m/charts?rangetype=year&subtype=artist) spot. That took a lot of self-control).
