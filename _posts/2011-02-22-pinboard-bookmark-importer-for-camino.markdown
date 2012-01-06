---
layout: page
type: text
title: Pinboard Bookmark Importer for Camino
categories: 
- code
---
It's been awhile since I had a play with Applescript, but I thought I'd use it to automate importing my Pinboard bookmarks (so I _(a)_ have a local backup and _(b)_ can search straight from Camino).

{% highlight applescript %}
--Pinboard Bookmark Importer

--An Applescript to automate importing of Pinboard.in bookmarks to a collection in Camino. To be used for occasional or one off import

-- pinboard username and password
property pbuser : "pinboard username"
property pbpass : "pinboard password"

--Download bookmarks via curl to desktop (because can use shortcut when selecting file for import via UI scripting)
do shell script ("cd ~/Desktop; curl https://" & pbuser & ":" & pbpass & "@pinboard.in/export/ -o pinboard.html")


--import bookmarks via UI scripting
tell application "System Events"
	if UI elements enabled then
		tell process "Camino"
			set frontmost to true
		end tell
		click menu item "Import Bookmarks…" of menu of menu bar item "File" of menu bar 1 of process "Camino"
		click pop up button of window "Import Bookmarks" of process "Camino"
		click menu item 5 of menu 1 of pop up button of window "Import Bookmarks" of process "Camino"
		keystroke "D" using {command down} --go to desktop downloads?
		keystroke "pinboard" --this works as long as there is no other file called "pinboard something or other" on the desktop.
		keystroke return
		
		
	else
		tell application "System Preferences"
			activate
			set current pane to pane "com.apple.preference.universalaccess"
			display dialog "UI element scripting is not enabled. Check \"Enable access for assistive devices\""
			
		end tell
		
	end if
	
end tell


--delete the previous pinboard folder
tell application "Camino"
	try
		with timeout of 120 seconds
			delete bookmark folder "pinboard"
		end timeout
	end try
end tell


--rename the new imported folder
tell application "Camino"
	try
		set name of bookmark folder "Imported Bookmarks" to "pinboard"
	end try
end tell

--delete pinboard file from the desktop
tell application "Finder"
	move file (((path to desktop) & "pinboard.html") as string) to trash
end tell
{% endhighlight %}
[Link to gist](https://gist.github.com/835932)

It's not very robust since it uses UI scripting and could fallover if you happen to have similarly named files already on the desktop, but it works for me. I thought (for now) I'd just use the built in bookmark importer rather than try to touch the bookmarks.plist file directly. The downside is that it completely replaces the pinboard bookmarks collection each time (which I think means you'd lose visit counts in Camino - not a concern for me), but the upside is that it isn't going to corrupt your bookmarks file. So as it is, it's ok for occasional or one off use, no good for regularly keeping Camino in sync with Pinboard (I'd have to do something more clever and target the bookmarks.plist file directly and I don't have the time or need to do that right now).
