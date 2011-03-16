---
layout: page
type: text
title: Some Notes on Developing Extensions for Chrome vs Firefox 
categories: 
- code
---
I recently developed a pretty basic extension for Chrome for something at work and then ported it to Firefox. Getting the whole thing working in Chrome probably took a day, Firefox took me a a couple of weeks longer (not continuous development time mind you, this was a little side project). But I got stuck a lot on Firefox, whereas I didn't with Chrome.

1. *Number of files*. As it stands at the moment. The Chrome extension has zero folders, three files: a png icon, a json configuration file, and a html file (also contains the css and javascript). In Firefox I have 5 folders, and 12 files. Ok, Firefox pushes you down the correct route for localisation from the get-go, but still!

2. *Icons*. In Chrome you simply dump in the icon file and it works. In Firefox they have half implemented this for display in the AddOns dialog, but you then have to include it again as a toolbar button, etc. And a css file to point to it.

3. *UI* - I have to admit I was a bit wary of developing a Chrome extension as they all look so good, I didn't realise you get that contained popup window as a default without having to lift a finger. In Firefox I'm currently stuck. I have an XUL window (started with a dialog), but I want a popup so need to look at panels (I think). Almost too much choice. How are you supposed to know what to use? For my extension the Chrome popup approach has the benefits of acting as a natural way to refresh that window (if you click outside of it, it disappears, the user doesn't have to manually close and re-open it).

    In Chrome you are working purely with HTML, so a simple web form is as follows:

		<body onload="initialise()">
			<form action="javascript:somefunction(document.getElementById('sometext').value)" method="POST" >
				<input type="text" name="sometext" id ="sometext" value="">
				<input type="submit" name="submit" id="submit" value="Submit">
			</form>
		</body>


    In Firefox you end you with something like: 

		<?xml version="1.0" encoding="UTF-8"?>
		<?xml-stylesheet href="chrome://global/skin/" type="text/css"?>
		<?xml-stylesheet href="chrome://myfirefoxextension/skin/myfirefoxextension.css" type="text/css"?>

		<!DOCTYPE window SYSTEM "chrome://myfirefoxextension/locale/myfirefoxextension.dtd">
		<window id="myfirefoxextension-dialog" 
			xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
			xmlns:html="http://www.w3.org/1999/xhtml"
			autosize="true"
			resizable="no"
			
			onload="initialise();"
			title="&dialog.title;">
			
			<script src="myfirefoxextension.js"/>

			<html:body id="body">
				<html:form action="javascript:somefunction(document.getElementById('sometext').value)" method="POST" id="form" >
					<html:input type="text" name="sometext" id ="sometext" value="" />
					<html:input type="submit" name="submit" id="submit" value="submit" />
				</html:form>
				<html:p id="logintxt">You need to <html:a href="http://somewebsite.com" target="_blank">logon to some website</html:a> first.</html:p>
			</html:body>
		</window>


4. *Configuration files*. Apart from me always forgetting commas in the json file, the Chrome configuration file is much, much simpler than in Firefox. I can understand what all of it means:

		{
			"name": "My simple extension",
			"version": "0.0.1",
			"description": "Does something ace.",
			"browser_action": {
				"default_icon": "icon.png",
				"popup": "popup.html"
			},
			"permissions": [
				"https://xml.website.com/*",
				"http://a.website.com/*",
				"tabs"
			]

		}



    In Firefox you have an `install.rdf` file:

		<?xml version="1.0" encoding="UTF-8"?>
		<RDF xmlns="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:em="http://www.mozilla.org/2004/em-rdf#">
		  <Description about="urn:mozilla:install-manifest">
			<em:id>myfirefoxextension@domain.com</em:id>
			<em:type>2</em:type>
			<em:name>myfirefoxextension</em:name>
			<em:version>0.0.1</em:version>
			<em:creator>Me</em:creator>
			<em:contributor></em:contributor>
			<em:description>Do something ace</em:description>
			<em:targetApplication>
			  <Description>
				<em:id>{ec8030f7-c20a-464f-9b0e-13a3a9e97384}</em:id> <!-- Firefox -->
				<em:minVersion>3.6</em:minVersion>
				<em:maxVersion>3.6.*</em:maxVersion>
			  </Description>
			</em:targetApplication>
		  </Description>
		</RDF>



    and a `chrome.manifest` file:

		content   myfirefoxextension                 chrome/content/
		skin      myfirefoxextension   classic/1.0   chrome/skin/
		locale    myfirefoxextension   en-US         chrome/locale/en-US/
		overlay   chrome://browser/content/browser.xul   chrome://myfirefoxextension/content/ff-overlay.xul
		style chrome://global/content/customizeToolbar.xul chrome://myfirefoxextension/skin/overlay.css



    I still don't fully understand these or the syntax. These are not the kind of things you want to create yourself (a small mistake and the extension won't load) hence why Mozilla provide an [extension generator](https://addons.mozilla.org/en-US/developers/tools/builder). This is a neat idea (but also shows you it's more complicated than it needs to be), and in my experience it wouldn't work, I had to replace the generated javascript code.

5. *Development tools / environment* - Chrome gets the superb Webkit developer tools for free. The popup window can be inspected just like any other window, which means you also get a javascript console for free. This helps tracking down errors and debugging much easier.

    Firefox, you are out of luck. With some [changes to configuration files](http://blog.mozilla.com/addons/2009/01/28/how-to-develop-a-firefox-extension/) you can get some errors reported in the error console (Tools > Error Console), but no Firebug to inspect the XUL window, etc.

    Which also brings me to: In Chrome (and Firefox) you can load an 'unpacked' extension (i.e. you don't need to zip up your files and install each time you want to test), but in Chrome you can edit your code and simply reload the extension. In Firefox you have to quit and restart.

6. *Quick and dirty* - In Chrome you can do 

		document.body.innerHTML = '<p>You need to log on to <a href="http://somewebsite.com" target="_blank">somewebsite</a> first<p>'

    In Firefox, you have to do things 'properly':

		var link = document.createElementNS("http://www.w3.org/1999/xhtml","a"); //from http://www.techjini.com/blog/2006/01/12/identifying-and-displaying-hyperlinks-in-xul/
		link.setAttribute("href", somelink);
		link.setAttribute("target", "_blank");
		link.setAttribute("style", "color: rgb(0,0,255); text-decoration:underline");
		var txt = document.createTextNode(sometext);
		link.appendChild(txt);
		document.getElementById('body').appendChild(link);




The only pluses I give Firefox is that it was easier to get the current URL:

	var locationURL = window.opener.gBrowser.contentDocument.location.href  //thanks to  http://forums.mozillazine.org/viewtopic.php?f=19&t=778165&start=0 

than in Chrome:

	chrome.tabs.getSelected(null, function(tab) { //thanks to http://stackoverflow.com/questions/1979583/how-can-i-get-the-url-for-a-google-chrome-tab/1979709#1979709
				var tablink = tab.url; })

and that in Firefox it is easy to copy text to the clipboard:

	const gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);  //from https://developer.mozilla.org/en/Using_the_Clipboard
	gClipboardHelper.copyString(sometext); 

whereas in Chrome the support is in an [experimental API](http://code.google.com/chrome/extensions/experimental.clipboard.html) and requires the user to by on the development channel of Chrome.