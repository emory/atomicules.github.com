---
layout: page
type: text
title: Writing a Binary Search
categories: 
- code
---
Or subtitled: Why turn down a chance to completely embarrass myself on the internet?

I read this post on [Binary search](http://reprog.wordpress.com/2010/04/19/are-you-one-of-the-10-percent/) on the [Reinvigorated Programmer](http://reprog.wordpress.com) blog (In trying to learn more programming, I thought it wouldn't hurt to read some programming blogs; plus as an unexpected bonus [he likes Doctor Who](http://reprog.wordpress.com/2010/04/17/victory-of-the-daleks-11th-doctor-episode-3/)) and thought I'd have a crack at it. However, the rules were a bit hard for me, namely:

> "NO TESTING until after you’ve decided your program is correct."

Even with Ruby, which I'm vaguely familiar with, I knew I couldn't possibly write even the most basic program without resorting to trying out stuff in IRB. It's the same as simple maths (times tables, etc) and spelling for me - I make no attempt to memorise this stuff when it's easy to use a calculator, dictionary, etc. So that's how my programming works. I can write a vague outline of the logic required in note form, but I need to use IRB or (if in another language) break my programme into chunks to compile and test, etc. 

So, an honest a first attempt as possible (with just checking things like "How do ranges work in arrays again?" in IRB (told you it was embarrassing)) would be as follows:

## First Attempt
    
    #Assumes a pre-sorted array
    def binsearch(array, target)
        m = (array.length/2).floor #round down 
        until array[m] == target
            #Find middle value of array
            m = (array.length/2).floor #round down 
            puts m
            #Which half contains target
            if array[m] > target
                #delete top half
                array = array[0..m]
            else 
                #delete bottom half
                array = array[m..-1]
            end
        end
        puts m
        puts target
        #Do we need to know where we found it?
    end

This doesn't work, the main problem being that I didn't understand/forgot/didn't-think-about-it-properly how the loop would check its condition. With `m` being updated at the start of the loop, it's too late - the loop has begun so it'll carry on and never break out of a loop.

Oh well, a bad first guess. At least with that out of the way I could try again, but this time I could test as I went along.

## Second Attempt

      def binsearch(array, target)
       #Find middle index of array
        m = (array.length/2).floor #round down
        until array[m] == target
            puts m
            #Which half contains target
            if array[m] > target
                #delete top half
                array = array[0..m]
            else 
                #delete bottom half
                array = array[m..-1]
            end
           m = (array.length/2).floor #round down 
        end
       puts "Value found is " + array[m].to_s
       puts "Target was " + target.to_s
        #Do we need to know where we found it?
     end

The main change is moving the update of `m` from top of loop to end. This got it basically working. I then decided (and I don't *think* this is a requirement of the task set) to report out the index of the array where the result was found (because to me there didn't seem to be a lot of point searching for something without knowing where it is).

## Third attempt

     def binsearch(array, target)
        #Duplicate array so we have a copy of the original
        orig = array.dup

        #Find middle index of array
        m = (array.length/2).floor #round down
        #tracking index
        tidx = m
        until array[m] == target
            puts "m= " + m.to_s
            puts "tidx= " + tidx.to_s
            #Which half contains target
            if array[m] > target
                #delete top half
                array = array[0..m]
                subtractidx = true
            else 
                #delete bottom half
                array = array[m+1..-1]
                subtractidx = false
            end
            m = (array.length/2).floor 
            if subtractidx == true
                tidx = tidx - m + 1
            else
                tidx = tidx + m + 1
            end
        end
        puts "Value found is " + array[m].to_s
        puts "Target was " + target.to_s
        puts "Index of value is " + tidx.to_s
        puts "Value at index is " + orig[tidx].to_s
     end

I'd mucked up splitting the arrays and had overlapping ranges, `0..m` and `m..-1` so fixed that here as well. This attempt seemed to be working ok, but having accidentally seen a bit of [the next post](http://reprog.wordpress.com/2010/04/21/binary-search-redux-part-1/) that dealt with common bugs in other people's attempts at this problem, I knew there were things I'd not done: such as dealing with elements not in the array, etc. So that would be the next effort. Fair enough I wouldn't have got this with my first "paper" attempt anyway, but I would have twigged pretty soon with testing (and as I said, testing is how I develop).

## Fourth attempt:

    def binsearch(array, target)
        #Duplicate array so we have a copy of the original
        orig = array.dup
        found = true
        #Find middle index of array
        m = (array.length/2).floor #round down
        #tracking index
        tidx = m
        until array[m] == target
            puts "m= " + m.to_s
            puts "tidx= " + tidx.to_s
            #Which half contains target
            if array[m] > target
                #delete top half
                array = array[0..m]
                subtractidx = true
            else 
                #delete bottom half
                array = array[m+1..-1]
                subtractidx = false
            end
            m = (array.length/2).floor 
            if subtractidx == true
                tidx = tidx - m + 1
            else
                tidx = tidx + m + 1
            end
            if array.length == 1 and array[m] != target #if not found
                found = false
                break
            end
        end
        puts found
        if not found
            puts "Value not found"      
        else
            puts "Value found is " + array[m].to_s
            puts "Target was " + target.to_s
            puts "Index of value is " + tidx.to_s
            puts "Value at index is " + orig[tidx].to_s
        end
     end

This still wasn't completely right though. I.e. the index was not always right. 

## Fifth attempt

    def binsearch(array, target)
        #Duplicate array so we have a copy of the original
        orig = array.dup
        found = true
        #Find middle index of array
        m = (array.length/2)-1
        #tracking index
        tidx = m
        until array[m] == target
            puts array.to_s
            puts "m= " + m.to_s
            puts "tidx= " + tidx.to_s
            #Which half contains target
            if array[m] > target
                #delete top half
                array = array[0..m]
                subtractidx = true
            else 
                #delete bottom half
                array = array[m+1..-1]
                subtractidx = false
            end
            m = (array.length/2)-1 
            if subtractidx == true
                tidx = tidx - m - 1 
            else
                tidx = tidx + m
            end
            if array.length == 1 and array[m] != target #if not found
                found = false
                break
            end
        end
        puts found
        if not found
            puts "Value not found"		
        else
            puts array.to_s
            puts "m= " + m.to_s
            puts "tidx= " + tidx.to_s
            puts "Value found is " + array[m].to_s
            puts "Target was " + target.to_s
            puts "Index of value is " + tidx.to_s
            puts "Value at index is " + orig[tidx].to_s
        end
     end

Trying to get the index correct, but still crap. I did discover though that I didn't need the `floor` method to round down, as that was happening anyway (see, further embarrassment). Decided to give up figuring this (index tracking) out. Must be a simpler way. Rather than split the array up, just change the range we are looking at:

## Sixth (and final-ish) attempt

    def binsearch(array, target)
        #Assume search suceeds
        found = true
        #initial lower, upper and middle indexes
        l = 0
        u = array.length-1
        m = (u-l)/2
        until array[m] == target
            #Visualise the search
            puts array[l..u].to_s
            puts "l= " + l.to_s
            puts "m= " + m.to_s
            puts "u= " + u.to_s
            #Which half contains target?
            if array[m] > target
                u = m #Set new upper boundary
            else 
                l = m + 1 #set new lower boundary
            end
            m = (u-l)/2+l #set new mid point
            #Break if not found / out-of-range
            if l==u and array[m] != target
                found = false
                break
            end
        end
        #Visualise search
        puts array[l..u].to_s
        puts "l= " + l.to_s
        puts "m= " + m.to_s
        puts "u= " + u.to_s
        if not found
            puts "Value not found"		
        else
            puts "Value found is " + array[m].to_s
            puts "Target was " + target.to_s
            puts "Index found at is " + m.to_s		
        end
     end

Ok, so pretty happy with that. Seems to work ok. It's longer than it needs to be thanks to all the `puts` statements, but I like seeing how it arrives at the solution. Seems to find values, return correct indexes, deal with values not in the array. But what about single element or zero element arrays (also [accidentally peeked at](http://reprog.wordpress.com/2010/04/21/binary-search-redux-part-1/))? Whoops no good. 

e.g.

    binsearch([0], 1)
    binsearch([-1], 1)
    binsearch([-1], 0)

all just loop continuously, and

    binsearch([], 1) 

throws an error.

Zero length arrays are not such a worry, easy to check for that up front (even for me!), but the single element one going into a continuous loop is a more of a concern. A crappy, but simple fix would be:

    if array.length == 1
        if array[0] == target
            #Joy to the world
        else
            #Best stop things now
            break
        end
    end

But I'm sure there is a more elegant way?

## Finally

I'd like to be able to use a get out clause:

> I am confident that nearly everyone who reads this blog is already familiar with the binary search algorithm

and say "Well, nope I'm not familiar", which I'm not, but I did understand the principle of the search. Really this just harks back to school Maths (which was a while ago for me) and iterative searches, etc. "Binary Search" is just different terminology. So no excuse really - I should have been able to figure it out. Perhaps what I should have done was forget the programming language aspect and just write it down logically/mathematically. Ah well, eager beaver and that.

Guess I have a long way to go yet if I want to be a programmer.