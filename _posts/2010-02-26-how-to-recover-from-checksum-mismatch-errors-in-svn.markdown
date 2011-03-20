---
layout: page
type: link
title: How-to recover from checksum mismatch errors in SVN
link: http://andrew.hedges.name/blog/2009/01/25/how-to-recover-from-checksum-mismatch-errors-in-svn
categories: 
- code
---
Very handy, and not as scary as I first thought. I'll add that to fix the error I had to replace the svn-base file _and_ the file itself. E.g: say I have this directory:

<pre>
+-trunk/
 |
 |-file.java
 |
+-.svn/
    |
    +-text-base/
     |
     |-file.java.svn-base
</pre>

I had to copy both file.java.svn-base and file.java in order to resolve the checksum mismatch.