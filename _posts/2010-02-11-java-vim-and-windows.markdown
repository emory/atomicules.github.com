---
layout: page
type: text
title: Java, Vim and Windows
categories: 
- code
---
I've been having a bit of a play about with Java at work and creating a Jabber Bot. It's yet-another-side project of mine, but it is for work and about as legitimate as side projects can get. It's been a nice intro to Java as there are plenty of [examples](http://www.freddyvazquez.com/Simple_XMPP_Jabber_Bot_Java_Smack_API.html) out there and I actually have a real app to produce at the end; I find just doing tutorials gets me no where. 

After I got over the initial shock of squiggly brackets (It looks way harder than it is), I've actually learnt a couple of things in a couple of weeks that I've not learnt in five years of playing with Ruby (the benefit of Java being so fussy):

1. Using **Classes**. Somehow I've managed to be remarkably lazy in Ruby and write an app with a thousand lines of code without really having to use classes (I use just one, based on this to [post arbitrary data with Mechanize](http://thread.gmane.org/gmane.comp.lang.ruby.modules.mechanize.user/375)). Other than that the code is just all methods. Although I have now relented and split stuff into modules.
2. **Logging** - I've never logged anything in Ruby, having  just used IRB for all my developing and debugging. 

One of the example programmes I was working with used System.out.println to debug, but I [quickly found](http://www.vipan.com/htdocs/log4jhelp.html) I should be using an actual logger. I went with the built-in logger:

    Logger.getLogger("global").fine("Here's what's happening: "+stufftooutput);

Because then you can control/grade which messages get shown according to their severity:

    Logger.getLogger("global").setLevel(Level.FINE);
    Logger.getLogger("").getHandlers()[0].setLevel(Level.FINE);

I [found out](http://coding.derkeiler.com/Archive/Java/comp.lang.java.help/2005-09/msg00152.html) I had to use both lines above to change this setting, rather than just one command. Don't know why. 

It seems every tutorial sets out by telling you to get an IDE, but you really don't need to for simple programmes. I just used Vim and a couple of little tricks on Windows. To deal with classpaths, I stored them in a text file, so I could read them into an environment variable. I.e. create a empty text file called "classpath.txt". Open it in Vim and then read in the directory of the jar files you are referencing:

    :r !dir /b

Then do a quick find and replace to get this all on one line, add in necessary path prefixes and semi-colons to separate. Then in Command Prompt I could just do this each session, to read the classpath into an environment variable:

    set /P cpstr=<classpath.txt

Compiling and running was then dead simple from the Command Prompt:

    javac -cp %cpstr% -d ./bin ./src/File.java
    java -cp %cpstr%;bin File

If you want to be ultra-Vimmy and not leave Vim to run commands in the Command Prompt, unfortunately I found you couldn't do this in Vim:

    :!set /P cpstr=<classpath.txt & javac -cp \%cpstr\% etc

as it just puts "%cpstr%". Even though I was escaping Vim's use of the % to reference the current file. Yet if you do

    !:echo \%HOME\% 

it does what you expect. Grrrrrrr..... You might be able to get around this using setx (to set user environment variables), but you would have to run two separate commands, as setx only affects future Command Prompt windows. You can create a little batch file to work around this, i.e. a file "c.bat" containing:

    set /P cpstr= <classpath.txt
    javac -cp %cpstr% -d ./bin %1

then in Vim, assuming correct directory, just do

    !c.bat %

and create a similar batch file to run the app. Although I found you have to write the actual class name from Vim:

    !start j.bat classname

as % includes path and extension (%< removes the extension, but it still includes the path. Aaargh!)

**EDIT:** Fun and games. Combined the compile and run DOS batch command, for those stupid moments when I forget I need to compile:

    set /P cpstr= <classpath.txt
    javac -cp %cpstr% -d ./bin %1
    for /f "tokens=1,2 delims=.\" %%a in ("%1") do set class=%%b
    java -cp %cpstr%;bin %class%

Also, note to self:

    !start r.bat % & pause

runs [asynchronously](http://vim.wikia.com/wiki/Execute_external_programs_asynchronously_under_Windows).
