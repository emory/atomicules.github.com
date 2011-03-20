---
layout: page
type: text
title: Vim and xmllint on Windows. 
categories: 
- code
---
I had occasion to get this working again. Not that it's hard mind you, just that I gave up too easily last time. I'd been logging an xml response from a Java programme and ended up with a massive xml file all on one line. Obviously not ideal if you want to search through the file.

Googling lead to [xmllint](http://vim.wikia.com/wiki/Format_your_xml_document_using_xmllint), and last time I didn't even try after reading about Windows difficulties. 

Turns out it's simple. 

1. Just download [xmllint for Windows](http://code.google.com/p/xmllint/downloads/list).
2. Simply place the executable in the same directory as the xml files for the lazy approach
3. `:% !xmllint.exe % --format` from within vim. (The syntax on the wiki page was wrong (for windows at least), `:! xmllint.exe --format %` tries to load the file "--format", need to swop the order of the % and the flag. Also the leading % is required (referring to the currently open file) as otherwise it'll run it through xmllint, but will not actually replace the contents of the file you have open.)
4. Done

But then I read [another wiki page](http://vim.wikia.com/wiki/Pretty-formatting_XML) and found this much more clever approach:

    :%s/></>\r</g
    :0
    =:$

The `%` means search the whole file, performing a search and replace using this syntax: `s/search/replace/g`. So it's searching for "><" and replacing with the same, but with the addition of `\r` which simply means split line at this point. Dead clever. Requiring nothing more than vim itself. The rest (`:0` and `=:$`) is just moving back to the start of the file and indenting it all.

(I've been a good boy and edited the wiki)
