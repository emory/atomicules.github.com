---
layout: page
type: text
title: Selection Sort in Haskell
categories: 
- code
---
For me there is just no such thing as spare time any more - it's basically time when I should be doing something else. So when [this popped up](http://reprog.wordpress.com/2010/05/19/another-challenge-can-you-write-a-correct-selection-sort/) I thought it would be an ideal time to learn a bit of Haskell. I had a quick play at the time and had the "Oh! Haskell doesn't have mutable variables!" revelation (although I didn't know they were called mutable back then) had a bit more of a play with recursion, etc and then got busy with other stuff for, well, almost a year(!) until I 'found' time again:

{% highlight haskell %}
-- Selection Sort in Haskell 
--
-- Cheating by using IORef for mutable variables since I don't know what I'm doing
-- with Haskell, although do have an inkling that the benefit of Haskell is that
-- all of below can be done in about three lines. 
--
-- Assumes integer input only.

import Data.IORef
import Data.List.Split	-- cabal install split 
						-- http://hackage.haskell.org/packages/archive/split/0.1.2.3/doc/html/Data-List-Split.html#v%3asplitOn
						-- I'm not even going to think about doing this myself.
						-- Used to get a comma delimted string as a list

main = do 
	-- Set up 'variables'
	putStr "Enter List to Sort:"
	stringinput <- getLine
	let listinput = splitOn "," stringinput -- Convert comma delimited string to list
	let intinput = [ read x :: Int | x <- listinput]	--Convert list of strings to list of Integers
														--Need to specify type http://learnyouahaskell.com/types-and-typeclasses
	unsortlistIO <- newIORef intinput
	elementIO <- newIORef []
	sortlistIO <- newIORef []
	sort unsortlistIO elementIO sortlistIO

sort unsortlistIO' elementIO' sortlistIO' = do
	unsortlist <- (readIORef unsortlistIO')
	sortlist <- (readIORef sortlistIO') -- initialise, for all intents and purposes
	--print unsortlist --debug
	if ((length unsortlist) > 0)
		then do -- Note to self: Must remember to ident these after if!

			-- find smallest element(s)
			unsortlist <- (readIORef unsortlistIO')
			writeIORef elementIO'  (filter (==(minimum unsortlist)) unsortlist)
			element <- readIORef elementIO'

			-- Add to sorted list
			sortlist <- readIORef sortlistIO'
			writeIORef sortlistIO' (sortlist++element)

			-- remove from original list
			writeIORef unsortlistIO' (filter (not.(==(minimum unsortlist))) unsortlist)

			readIORef sortlistIO'
			--print sortlist --debug
			sort unsortlistIO' elementIO' sortlistIO' -- loop. Ha!
		else return sortlist -- Note to self: must be careful about returning the right type of thing

{% endhighlight %}
[Link to gist](https://gist.github.com/914610)

I gather the benefit of Haskell is that this can actually be written in a couple  of lines. Maybe in another eleven months time I'll have figured that out.  
