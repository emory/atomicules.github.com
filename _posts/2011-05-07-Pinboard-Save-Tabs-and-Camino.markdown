---
layout: page
type: text
title: Pinboard Save Tabs and Camino (almost!) 
categories: 
- code
---
I really like [Pinboard](http://www.pinboard.in/) and I'm probably [as thankful as Maciej](http://blog.pinboard.in/2011/03/anatomy_of_a_crushing/) for Yahoo dropping the ball with Delicious as otherwise it would have just remained "one of those things on my radar". I don't know what the pace of development was like before I joined (obviously), but I love the features that have been added since, such as Twitter archiving and the fabulous [Save Tab](http://blog.pinboard.in/2011/04/new_save_tabs_feature/) sets feature.

This is something I've wanted for awhile due to two main reasons: **1)** I'm cross platform and cross browser (I typically use Chrome on Windows at work and Camino on OSX at home, so this kind of functionality is better than browser sync for me) and **2)** at work we have horrendous proxy authentication which means I can't effectively use pinned tabs; In fact, before I twigged, Chrome would randomly lock up for me when opening a new tab because DNS pre-fetching was causing a unreachable authentication dialogue to occur in the background (or something like that) so pinned tabs would lock up the browser on start-up. Unchecking the DNS-prefetching stops the lock-up, but still means a few tabs waiting for authentication details and by the time I've got Lastpass sorted and got the password I need the pages have failed with authentication errors and have some weird proxy url - So, quite frankly it's better to launch with a page within the intranet, manually make one request to a page on the internet (Pinboard saved tabs page!) and once authenticated, open all the required tabs.

So I thought I'd have a crack at implementing it for Camino (as I knew I'd be able to use Applescript to get a list of tabs). The first stumbling block is that the Pinboard extension(s) use [FormData](http://dev.w3.org/2006/webapi/XMLHttpRequest-2/Overview.html#the-formdata-interface/) that is only [available in Gecko 2](http://hacks.mozilla.org/2010/05/formdata-interface-coming-to-firefox/), not Gecko 1.9 that Camino uses. However, some [clever person](http://identi.ca/francois2) has made a [fake FormData](https://github.com/francois2metz/html5-formdata) script that works a treat. So I really thought I was game on. I then spent about a week being frustrated not being able to get this to work. It was odd, as if I tried from Safari or Chrome (forcing the use of fake Formdata) it worked as expected. I then tried Firefox 4 (again forcing the use of Fake form data) and it wouldn't work. Ah ha! A quick email to Pinboard and Maciej mentioned cookies and I had a closer look at Firebug and realised that when Gecko was making the post that a cookie was not being sent. Turns out Webkit does by default what you have to do explicitly with Gecko ([XMLHttpRequest withCredentials](https://developer.mozilla.org/en/XMLHttpRequest#status)) - I was then able to get it to work in Firefox 4. So back to Camino full of hope but it still wouldn't work! After more frustration and trying Firefox 3.6 on windows and also failing I finally learnt that Gecko 1.9 is a piece of shit because it [preflights all request except text/plain](https://developer.mozilla.org/en/http_access_control#Preflighted_requests).

So even though the fake FormData is remarkabley clever, it is effectively pointless.

And this really might have tipped me over the edge to using TenFourFox instead of Camino.

{% highlight applescript %}
--Camino Pinboard save tabs

-- An Applescript to Save Open Tabs to Pinboard, using the Save Tabs functionality:
-- http://blog.pinboard.in/2011/04/new_save_tabs_feature/
-- Uses francois2metz fake html5-FormData since Gecko 1.9 doesn't have this
-- https://github.com/francois2metz/html5-formdata
-- BUT DOESN'T BLOODY WELL WORK BECAUSE OF A RESTRICTION IN GECKO 1.9
-- Gecko 1.9 preflights all requests except from text/plain which screws the whole thing up
-- (https://developer.mozilla.org/en/http_access_control#Preflighted_requests)
-- Oh well, it was a nice idea. 

property winz : ""
property tabz : ""
property resultz : ""
property source : ""

--Get list of tabs and windows, 
tell application "Camino"
    repeat with i from 1 to (count browser windows)
        repeat with j from 1 to (count of tabs of browser window i)
            set tabz to tabz & "{ \"title\": \"" & title of tab j of browser window i & "\", \"url\": \"" & URL of tab j of browser window i & "\"}"
            if ((j < (count of tabs of browser window i)) and ((count of tabs of browser window i) > 1)) then
                set tabz to tabz & ","
            end if
        end repeat
        set winz to winz & "[" & tabz & "]"
        if ((i < (count of browser windows)) and ((count of browser windows) > 1)) then
            set winz to winz & ","
        end if
        set tabz to ""
    end repeat
end tell
set resultz to resultz & "{\"browser\":\"camino\",\"windows\":[" & winz & "]}"

set source to ("<html><head></head><body>
<script type=\"text/javascript\" src=\"https://github.com/francois2metz/html5-formdata/raw/master/formdata.js\"></script>
<script>
var params = new FormData();
var req = new XMLHttpRequest();
params.append(\"data\", '" & resultz as string) & "'); // I have an inkling, that should a tab title contain an apostrophe, it may muck this up.

req.open(\"POST\", \"https://pinboard.in/tabs/save/\", true);
//Don't think these need to be set
//req.setRequestHeader(\"Cache-Control\", \"no-cache\");
//req.setRequestHeader(\"X-Requested-With\", \"XMLHttpRequest\");
//This needs to be set explicity for Gecko, Webkit seems to do by default
req.withCredentials = true
req.setRequestHeader(\"Content-Type\", \"multipart/form-data; boundary=\"+ params.boundary);
req.onreadystatechange = function() {
    if (req.readyState == 4) {
        window.location.href = \"https://pinboard.in/tabs/show/\";
    }
}
req.send(params.toString());
</script></body></html>"

do shell script "rm -f $HOME/Library/'Application Support'/Camino/caminosavetabstopinboard.html"
do shell script "touch $HOME/Library/'Application Support'/Camino/caminosavetabstopinboard.html"
set js to ((path to home folder as string) & "Library:Application Support:Camino:caminosavetabstopinboard.html") as alias
open for access js with write permission
write source to js
close access js


tell application "Camino"
    open js
end tell
{% endhighlight %}
[Link to gist](https://gist.github.com/955471)

