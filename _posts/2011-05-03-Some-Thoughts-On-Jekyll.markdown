---
layout: page
type: text
title: A few notes on using Jekyll (and Liquid) 
categories: 
- code
---
(since that's what I'm now using)

* Pagination - It is actually [documented](https://github.com/mojombo/jekyll/wiki/Pagination), and [this site](http://www.nonpolynomial.com/) is a [great example](https://github.com/qdot/nonpolynomial.com/blob/master/_layouts/front.html) of how to do it, BUT (and it is a big BUT), basically you can either have categories OR pagination. I opted for categories and then adding in the ability to [filter the archive page by category](https://github.com/i5m/i5m.github.com/blob/master/archive.html#L5-7) so there was still someway to get all the posts in a category.
* Nested for loops - don't seem to work in Liquid. I was [trying to get all the categories of a post as class names](https://github.com/i5m/i5m.github.com/commit/89646e8de6895ae91d8c3426203480268b29c297#archive.html), but couldn't get it to work. However, me being stupid, there was [a much easier way to do this](https://github.com/i5m/i5m.github.com/commit/42ab2d889b08ad9ada088124b60a7b28e48079f4#archive.html).
* Markdown processors - I'd read about there being different markdown processors, Rdiscount, Makuru, etc and wondered why? Until I tried my site, that is.  When you've things like having markdown files that use html elements, Rdiscount will process this fine, Makuru will fall over.
* Liquid syntax conflicts - (An aside: I actually like the Liquid markup syntax, it's pretty cool). I had a [blog post about Wolfram Alpha](http://i5m.co.uk/code/2009/05/17/wolframalpha.html) and a link to a matrix calculation that used double curly brackets for the matrix and got the error "Liquid Exception: Variable '{ {1%2C1%2C3}' was not properly terminated with regex p: /\}\}/" in the page. I've not figured out anyway to avoid this, I.e. escape curly brackets from being processed. I just had to [use square brackets instead](https://github.com/i5m/i5m.github.com/commit/90d4681b4364d4652e95b56436ceb14677b15bfa#_posts/2009-05-17-wolframalpha.html).
* The mystery of post vs pages - After awhile you figure this out, and you do clever things (I felt clever, anyway) like [use both in the same include](https://github.com/i5m/i5m.github.com/blob/46661e97f188f37a708dd14a600a2b69ef039c91/_includes/text.html). At least you think you'd figured it out, until you realise the page's aren't getting parsed by Markdown. Turns out you have to [just use content](https://github.com/i5m/i5m.github.com/commit/f4b0eaf76581b2f6c57555b5bbea5faab46d8ea0#_includes/text.html), even though page.title and post.title work as expected. Entirely weird.

 
