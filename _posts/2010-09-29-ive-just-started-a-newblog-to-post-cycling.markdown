---
layout: page
type: photo
title: 
photo: images/tumblr_l9i2ds5OyG1qzcagp.jpg
categories: 
- code
---
I've just started a newblog to post [cycling related stuff](http://custardycling.co.uk) to (I briefly thought about re-inventing this blog again due to the recent lapse in anything even remotely related to art or code, but decided against it) and so spent a bit of time setting up a tumblr theme (using this one as a template). I did all the development in Chrome and just assumed that nowadays if it worked in Chrome it would just look the same in Firefox and Opera, etc (and I don't give a crap about IE).

But it seems that isn't the case. It looks pants in Gecko 1.9 ,and in Gecko 2.0 doesn't get the rounded corners even though I thought [Gecko 2.0 now supported the CSS3 selectors](https://developer.mozilla.org/en/CSS/-moz-border-radius) instead of the `-moz` prefixed ones. If I use the `-moz` prefixes I can get the site looking as intended in Firefox 4. I think I might just leave it like that. Haven't figured out why the header and footer colours don't show in Gecko 1.9 - it really is quite a simple layout, nothing fancy.

**EDIT:** Ah, ok, this is to do with [parsing HTML5 elements](http://diveintohtml5.org/semantics.html#unknown-elements). Doing:

{% highlight css %}
article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {
	display:block;
}
{% endhighlight %}	
solves all of the problems in Gecko 1.9. Interestingly, I thought there were also issues with a child selector of <code>body>footer</code> in Gecko 1.9, even though <code>body>header</code> worked, but turns out this is just a glitch in the Tumblr customise/preview mode. In this mode the footer displays all wrong (even using an id to select it rather than the child selector, the width and position is still screwed up), but once published it's all ok. Bizarre!
