---
layout: page
type: text
title: Creating a (Feeda)Fever Shared Items Page
categories: 
- code
---
In a vain attempt to slightly de-googlefy my life, and also to regain control over my RSS subscriptions, I switched to [Fever](http://feedafever.com/) from [Google Reader](http://reader.google.com/) a little while ago.

If I had an Intel Mac and was just on one platform then I may have just used [Reeder](http://reederapp.com/) and therefore stuck with Google Reader, but with the added benefit of never really having to visit Google Reader. I was a big fan of the [Helvitreader](http://helvetireader.com/) theme whilst using Google Reader, but that is no longer being maintained; I tried Feedly and it isn't for me. However, it's not just the UI... I like the idea of [Fever's Hot list](http://feedafever.com/#demo).

Anyway, I've gone off track already and all of that is besides the point of this post...

What I liked with Google Reader was that I had a shared items page. Fever offers similar, but it's only available as a RSS feed. So I set about using [jFeed](https://github.com/jfhovinne/jFeed) to turn the [feed into a html](https://github.com/jfhovinne/jFeed/blob/master/example.html) page. jFeed is really pretty nifty, but a bugger to debug (that could just be my inexperience with jQuery though) as it just seems to fail silently.

The first problem I had in doing an offline test was that my RSS file started with a blank line rather than the xml declaration. An easy fix, but took me a while to twig why jFeed was just doing nothing. After getting it working offline, the next problem I had was due to bloody [CORS](http://enable-cors.org/). My Fever installation is on a sub-domain (seemed like a sensible idea at the time!) and of course trying to load the feed would result in:

    XMLHttpRequest cannot load <url> Origin <origin> is not allowed by Access-Control-Allow-Origin

According to the Enable CORS website that is easily fixed by adding the following into the [.htaccess file for Apache](http://enable-cors.org/#how-apache), but I could not get that to work and even started to wonder whether the [.htaccess file was being ignored](http://jappler.com/blog/archive/2008/10/22/how-to-test-htaccess-files), but it wasn't. What did (almost) work in the end was editing my Fever installation itself, the `index.php` page, and [setting the headers](http://enable-cors.org/#how-php) from there. I say almost, because I now got a slight different error:

    XMLHttpRequest cannot load <url> Request header field x-requested-with is not allowed by Access-Control-Allow-Headers.

And oddly enough was solved by a [post on jQuery](https://forum.jquery.com/topic/jquery-1-5-latest-chrome-post-ajax-request-xmlhttprequest-cannot-load-url-request-header-field-x-requested-with-is-not-allowed-by-access-control-allow-headers) (even though the error is nothing to do with jQuery).So, adding the following into Fever's index.php (so this may get wiped out each time Fever is updated, but this doesn't seem to happen too often) did the trick:

    <?php
    header("Access-Control-Allow-Headers: x-requested-with");
    header("Access-Control-Allow-Origin: http://i5m.co.uk");

I think the last thing I then did was update the version of jQuery over the one that ships with jFeed (1.6.2 vs 1.1.3.1 at the time of writing). If I recall correctly, I'd got rid of all the CORS errors, but the page still wasn't being generated (odd, because an offline copy of the exact same RSS fee worked fine). I didn't really hold out much hope that updating jQuery would fix the issue, but thankfully it did.

So now I have my [Fever Shared Item's page](http://i5m.co.uk/fever.html) and here's the [code](https://github.com/i5m/i5m.github.com/blob/ef3d7f7337cd4ad580c21ba45632c1d70b999d7c/fever.html).
