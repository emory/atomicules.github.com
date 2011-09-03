---
layout: page
type: text
title: Snow Leopard and Gems 'wrong architecture'
categories: 
- code
---
Not that I'm on Snow Leopard yet (ever??), but should you get an error such as:

    "hpricot_scan.bundle: mach-o, but wrong architecture"

Or any other gem, doesn't have to be Hpricot, then it is, as the error message says, because of a mismatch between the architecture of Ruby and the gem. And on Snow Leopard this is most likely because you are using a 32-bit version of Ruby and the gem has built as 64-bit (as is the default on Snow Leopard). And this has most likely come about because in 10.5 you followed one of the [Hivelogic articles](http://hivelogic.com/articles/ruby-rails-leopard) and installed a version of Ruby that is still your default after upgrading to 10.6. The quick way to check is to do

    which ruby

if it returns **/usr/local/bin/ruby** then you need to change your PATH so you are using the Apple installed 64-bit version in **/usr/bin**, or follow the [new Hivelogic article](http://hivelogic.com/articles/compiling-ruby-rubygems-and-rails-on-snow-leopard/).

If the above isn't your case, then use the [file](http://ss64.com/osx/file.html) command to find out what the architecture mismatch is:

    file /path/to/gem/eg/hpricot_scan.bundle
    file /path/to/ruby

32-bit binaries will return **Mach-O executable i386** and 64-bit **Mach-O 64-bit executable x86_64**. Because, as unlikely as it is, it's possible that you are [accidentally building your gems as 32 Bit](http://stackoverflow.com/questions/1367380/snow-leopard-64-bit-ruby-gem-problem/#comment-1214390).
