---
layout: page
type: text
title: Java Smack API and  java.io.EOFException
categories: 
- code
---
I came across this confusing error using the [Smack API](http://www.igniterealtime.org/projects/smack/):

    java.io.EOFException: no more data available - expected end tag </stream:stream> to close start tag <stream:stream> from line 1, parser stopped on END_TAG seen ...EZah/08YglY=\' xmlns=\'http://jabber.org/protocol/caps\'/></presence>... @1:2797
    at org.xmlpull.mxp1.MXParser.fillBuf(MXParser.java:3035)
    at org.xmlpull.mxp1.MXParser.more(MXParser.java:3046)
    at org.xmlpull.mxp1.MXParser.nextImpl(MXParser.java:1144)
    at org.xmlpull.mxp1.MXParser.next(MXParser.java:1093)
    at org.jivesoftware.smack.PacketReader.parsePackets(PacketReader.java:36

Turns out this was because I was trying to send a message containing the string "&amp;nbsp;".  

I was pulling data from an xml document, that unfortunately rather than containing nothing where there was no entry for an element, contained four "&amp;nbsp;".

It seems even trying to pass one   makes Smack throw a major wobbly.

Figuring out the error took ages. Fixing was easy as I just stripped out all "&amp;nbsp;" characters.  

**EDIT:** It's ampersands in general that causes the problem (makes more sense really). What's more, I can't figure out a way to catch the "java.io.EOFException". I get "never thrown in body of corresponding try statement" if I try (no pun intended!) to catch it where the Bot is connecting. So I don't think anything can be done apart form make sure you are never passing Ampersands via Smack. 
