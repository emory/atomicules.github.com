---
layout: page
type: text
title: Data.Table Dingleberry
categories: 
- code
---
It's not the first time (and I'm sure it won't be the last time) that I blindly copied, pasted and adapted code before fully understanding what's going on. 

I had two sets of data ("Step 1" and "Step 2"), both of which looked something like this:

			  id             Date
	[1,]  1986524-23      2011-01-20
	[2,]  2458768-21      2011-04-17
	[3,]  2457845-24      2011-05-15
	[4,]  4785874-32      2011-02-28
	[5,]  7841111-12      2011-03-01
	...

For each row in the Step 2 set of data, I wanted to find the matching IDs in Step 1, calculate the date difference(s) (since there could be more than one match), find the minimum date difference, and then add that into a new column into the Step 2 data.

I was being clever and using the [data.table](http://datatable.r-forge.r-project.org/) package (since it really is much, much speedier for lookups than using functions like `subset()`, but I was misled (because these examples abound!) by the help files and seeing things like this:

	DT["a"]     # join to 1st column of key
	DT[J("a")]  # same

_(`DT[J("a")]` crops up a lot, but as far as I can tell (unless I'm completely ignorant) it is just a frivolous example as it's just doing `DT[data.table("a")]`, and why on earth would you want to create a data.table just for "a"?)_

And confused by the [FAQ](http://datatable.r-forge.r-project.org/datatable-faq.pdf)(PDF file), section "1.6 Ok but I don’t know the expressions in advance. How do I programatically pass them in?" and the use of `eval()` and `quote()`, etc, which (I think I've now twigged) are really for `j` expressions, not `i` expressions.

So I ended up with this:

<script src="https://gist.github.com/1273684.js?file=slower_use_of_data_table.r"></script>

The `eval` and `quote` are doing NOTHING here, removing them gets the same result (and still takes just as long). For my case, doing the below was 2400%(!) faster:

<script src="https://gist.github.com/1273684.js?file=faster_use_of_data_table.r"></script>

Thought it was worth pointing out, just in case anyone else is as stupid as me and takes the trivial `DT[J("a")]` example at face value.
