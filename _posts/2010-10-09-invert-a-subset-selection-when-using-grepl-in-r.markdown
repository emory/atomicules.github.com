---
layout: page
type: text
title: Invert a subset selection when using grepl in R
categories: 
- code
---
One of those embarrassing Doh! moments to share with the world.

I was trying to [subset](http://sekhon.berkeley.edu/library/base/html/subset.html) some data using [grepl](http://sekhon.berkeley.edu/library/base/html/grep.html), but wanted to do a negated search. So any column not beginning with "08" (they all began with "0" something). 

Which you can do with: 

`grepl("0(?!8)",Dataset$Some.Column, perl=T)` (negative lookahead) 
or `grepl("^0[^8]",Dataset$Some.Column, perl=T)` (negated character class)

But, because grepl is returning a vector of "Yays" or "Nays" there is a much, much simpler approach. Just do:

`!(grepl("^08",Dataset$Some.Column))`

Doh!





