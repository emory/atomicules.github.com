---
layout: page
type: text
title: A Quick Note for Idiots (me) on Installing the xapian-full gem on Linux
categories: 
- code
---


I've been playing around with [Sup](http://sup.rubyforge.org/) (I'll come to that in another post soon, fingers crossed), but couldn't get the [xapian-full gem](http://rubygems.org/gems/xapian-full) to install on Linux as it bombed out as follows:

{% highlight bash %}
gem install xapian-full
Building native extensions.  This could take a while...
...
checking whether the C compiler works... no
configure: error: in `/home/me/.rvm/gems/ruby-1.9.2-p290/gems/xapian-full-1.2.3/xapian-core-1.2.3':
configure: error: C compiler cannot create executables
See `config.log' for more details.
rake aborted!


Tasks: TOP => default
(See full trace by running task with --trace)


Gem files will remain installed in /home/me/.rvm/gems/ruby-1.9.2-p290/gems/xapian-full-1.2.3 for inspection.
Results logged to /home/me/.rvm/gems/ruby-1.9.2-p290/gems/xapian-full-1.2.3/./gem_make.out
{% endhighlight %}

And checking `config.log` I got:

{% highlight bash %}
configure:3866: checking whether the C compiler works
configure:3888: gcc   -R/home/me/.rvm/gems/ruby-1.9.2-p290/gems/xapian-full-1.2.3/lib conftest.c  >&5
gcc: error: unrecognized option '-R'
configure:3892: $? = 1
configure:3930: result: no
{% endhighlight %}

I found [this post on archlinux](https://bbs.archlinux.org/viewtopic.php?pid=926929#p926929) (which almost exactly explains what to do, I just didn't quite get it at the time) and [this github issue](https://github.com/rlane/xapian-full/pull/4) but it took me awhile to figure out how to apply the patch. It's always easy when you know how...

{% highlight bash %}
gem fetch xapian-full
gem unpack xapian-full-1.2.3.gem
cd xapian-full-1.2.3
curl -O https://github.com/rlane/xapian-full/pull/4.patch
patch < 4.patch
gem build xapian-full.gemspec
gem install ./xapian-full-1.2.3.gem
cd ..
rm -rf xapian-full-1.2.3
rm xapian-full-1.2.3.gem
{% endhighlight %}

I thought after unpacking I'd just be able to run `rake` and install the gem that way, but if you can I can't figure out how. So repacking it (`build`) it is - at least that doesn't take long.

Have to say, Ruby on Linux has been a lot fiddlier than I thought. On my ancient OSX 10.5 PPC no problems at all installing xapian and sup. Colour me suprised.

