---
layout: page
type: text
title: Github Works
categories: 
- code
---
I'm fortunate in that I'm not particularly bothered about the underlying [VCS](http://en.wikipedia.org/wiki/Revision_control) I'm using. So I don't have to get into any philosphical arguments about [Git](http://git-scm.com/) vs [Mercurial](http://mercurial.selenic.com/wiki/), [etc](http://bazaar-vcs.org/),  because for my needs, [SVN](http://subversion.tigris.org/) would be fine; I'm not working on any big multi-user projects, I'm just interested in version control for my stuff.

Days gone by I've used a locally installed VCS, but now I feel that is a bit pointless: One, it's nice having some remoteness, should said local machine die a death; Two, it's not just about the VCS itself, having a hosted solution brings with it the benefit of wikis, bug trackers, download pages, project statistics, etc; and Three, although I may not be collaborating with someone, it can be handy to point someone in the direction of the code, which you can't do if it's on only on your machine. At work I'm working on a project which benefits from a centrally hosted SVN server. Because this project is arguabley not a personal project (even if it is practically), I'm allowed to use their hosting. But they make a big point about no personal projects (By personal they mean work-personal). So if I'm working on a bit of code that benefits me only, or only one other person only, I can't get version control for it.

Although I can.

Thanks to [Github](http://github.com/) providing ssh access on port 443 I can use Git and Github to host my code when work 'says' no to hosting it and no to anyone else hosting it (via the kindness of proxies and firewalls). I'm not stupid enough to put any sensitive work stuff on there (there's being frowned upon and then being FROWNED upon), but it is nice to have a solution for my day to day hacks. And so that is why I choose Github and Git over the other options. It works where [others don't](http://bitbucket.org/jespern/bitbucket/issue/939/cannot-authenticate-when-pushing-via-https).  Yes [bitbucket](http://bitbucket.org/plans) and [Beanstalk](http://beanstalkapp.com/pricing) (A beautiful SVN solution, by the way) may provide a free account that includes a private repository (although no secure checkouts/commits with the free plan on Beanstalk, but you do with bitbucket -  nice), whereas with Github you [have to pay](http://github.com/plans), but Github works, so gets the pennies.

Plus, Github is a beautiful web app. It's lovely for visualising commits and changes, far nicer than diff-ing in any application I've ever used. And it's design encourages people to dive in and help code open source projects because it's so easy to use. It's dead easy to fork a project, fast forward to catch up with recent changes should you have forked and then forgotten to do anything, and then easy to put in a pull request for your changes back to the master. So easy in fact even I felt encouraged to do it for [Shoes](http://github.com/i5m/shoes/commit/f4a12f4f83ccd9443a0284996c8975c210fe4f51).

Addendum: I never knew this existed, I wish my company would do this: [Github Firewall Install](http://fi.github.com/).
