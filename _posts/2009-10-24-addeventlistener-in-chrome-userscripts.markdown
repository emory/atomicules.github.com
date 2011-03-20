---
layout: page
type: text
title: addEventListener in Chrome UserScripts
categories: 
- code
---
Also, not necessarily related to the previous post, but something else I had trouble with in Chrome userscripting was trapping clicks. I couldn't get [addEventListener to work on elements](http://www.oreillynet.com/pub/a/network/2005/11/01/avoid-common-greasemonkey-pitfalls.html?page=3). So instead I went for the document level, trapped all clicks, and filtered for what I was interested in.   

    document.addEventListener('click', function(event) {
        if (event.target.id == "whatyouarelookingfor")
        {
        //Do something 

        // Then just let the default carry on 
        }
    },true);
