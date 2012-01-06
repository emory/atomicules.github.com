---
layout: page
type: text
title: Pinboard to Camino, Take two
categories: 
- code
---
I live by the "It's Cool to be Crap" motto (from [R.A.D. magazine](http://www.whenwewasrad.co.uk/) for those that can remember). So to go with my [crap Haskell attempt]({{ site.baseurl }}2011/04/12/Selection-Sort-in-Haskell.html) here's my 2nd crap attempt at a [Pinboard to Camino bookmark importer]({{ site.baseurl }}2011/02/22/pinboard-bookmark-importer-for-camino.html), one that preserves Camino metadata (such as number of visits) rather than simply deleting and replacing all the bookmarks. I still have a long way to go, but I am on the right track (well I think I am). 

{% highlight ruby %}
# Pinboard to Camino
#
# A Ruby script to import/update Pinboard bookmarks into Camino
# This is a evolution of this Applescript: https://gist.github.com/835932 which simply deleted and 
# replaced a bookmarks collection. This Ruby script attempts to update, rather than delete and replace,
# so Camino bookmark visit counts are preserved, etc.
#
# IT IS VERY SLOW!
#
# Really, it is. Took about 35 mins to run through a Camino bookmarks file with 2003 existing "pinboard"
# bookmarks and add a further 1159 new "pinboard" bookmarks. 
# The reason why it is so slow is that it takes a full export from Pinboard and for each bookmark
# has to check every node in the Camino bookmarks file until it finds / doesn't find a match.
#
# This script "just about works for me", but is rubbish (may create duplicates).
# I'm just using this as a stepping stone to the next script where I will attempt
# to speed things up:
# - Create a hash of the two bookmark files for faster lookup
# - Search based on a MD5 of the urls, rather than the url itself, since this is what the API uses...
# - Consider using API to fetch 'changes' rather than 'everything'
#
require 'rubygems'
require 'hpricot' #Tried Nokogiri, but it wouldn't parse my pinboard bookmarks file. Hurray for Hpricot!
require 'hpricot/xchar'
require 'fileutils'
require 'optparse' #Command line option parser
require 'ostruct' #For storing options

#Set defaults for command line options. Inelegant, but...
options = OpenStruct.new
options.camino = false
options.pinboard = false
options.username = false
options.password = false

#Command line options
optparse = OptionParser.new do |opts|
	opts.on('-c', '--camino bookmarks.plist', "Specify location of Camino bookmarks file") { |c| options.camino = c }
	opts.on('-p', '--pinboard export.html', "Specifiy location of Pinboard export") { |p| options.pinboard = p }
	opts.on('-u', '--username USERNAME', "Pinboard Username") { |u| options.username = u }
	opts.on('-P', '--password PASSWORD', "Pinboard password") { |p| options.password = p }
end
optparse.parse!

#Let's just use constants:
Camino = options.camino
Pinboard = options.pinboard
Username = options.username
Password = options.password

# If -c or -p specified, both need to be specified. Will override 
if (Camino || Pinboard)
	unless Camino && Pinboard # http://stackoverflow.com/questions/2547201/how-do-i-handle-a-missing-mandatory-argument-in-ruby-optionparser/2548272#2548272
		$stderr.puts "Error: you must specify both --camino and --pinboard options."
		exit
	end
	$stdout.puts "Using locally provided files"
elsif (Username || Password) && !(Camino || Pinboard)
	unless (Username && Password)
		$stderr.puts "Error: you must specify both --username and --password options."
		exit
	end
	#Set Camino and Pinboard
	Camino = "#{ENV['HOME']}/Library/Application Support/Camino/bookmarks.plist"
	Pinboard = "https://#{Username}:#{Password}@pinboard.in/export/"
end

# Backup bookmarks file 
FileUtils.cp Camino, "#{Camino}.pb2cambak"
# Might need to use single quotes.

# Open bookmarks files
camino = Hpricot(open(Camino))
pinboard = Hpricot(open(Pinboard))

# Find the "Pinboard" folder in the Camino bookmarks
caminopbfolder = camino.search("//plist/dict/array/dict/string[text()='pinboard']")[0].parent.search("//array")[0]

pbbadurls = []
cambadurls = []

pinboard.search('//dl/dt/a').each do |plink|
	#For testing via irb: plink = pinboard.search("//dl/dt/a[@href='']")[0]
	puts plink['href']
	#bug if url contains single quote. Hpricot finds wrong element - would prefer if it just failed!
	# Step 1) Find existing URL in Camino and update Title and Description from Pinboard
	begin # Bad urls can cause a problem
		#caminourls = caminopbfolder.search("//dict/string[text()=#{plink['href']}]") #Don't need to fix ampersand here. Seems to happen automagically.
		#Re-write to get around single quote issue in URLs
		caminourls = caminopbfolder.search("//dict/string").select { |e| e.inner_text == plink['href'].strip } #Strip leading/trailing whitespace
		caminourl = nil
		if caminourls != []
			caminourls.each do |url|
				if url.preceding_siblings.last.innerHTML == "URL"
					caminourl = url
				end
			end
		end
		#Another problem here is that //dict/string isn't guaranteed to the be the URL key
		#So if happened to include URL as description, etc it would fall over.
		#Can't seem to get preceding-sibling to work though in XPath
		#Need above work around
		
		if caminourl != nil
			caminoitem = caminourl.parent
			# Then need to update Description
			if plink.parent.next_sibling #Very last one might not have a sibling
				if plink.parent.next_sibling.name == "dd" #If there is a Pinboard Description???
					# If existing Camino Description, update
					if caminoitem.search("//key[text()='Description']")[0] != nil
						caminodescription = caminoitem.search("//key[text()='Description']")[0].next_sibling
						caminodescription.innerHTML = Hpricot.xs(plink.parent.next_sibling.innerText) #Need to escape for XML! Need to remove line returns aswell
					else # Need to add a new element into bookmarks.plist
						camimoitem.after "<key>Description</key><string>#{Hpricot.xs(plink.parent.next_sibling.innerText)}</string>"
					end
				else # Might need to remove Camino Description elements (This is a bit messy)
					if caminoitem.search("//key[text()='Description']")[0] != nil
						caminoitem.search("//key[text()='Description']")[0].next_sibling.remove #Do it in this order ;-)
						caminoitem.search("//key[text()='Description']")[0].remove
					end
				end
			end
			# And title. I think can assume there is always a title in both files
			caminotitle = caminoitem.search("//key[text()='Title']")[0].next_sibling
			caminotitle.innerHTML = Hpricot.xs(plink.innerText)
		else 
		# Step 2) Add new URLS to Camino from Pinboard
			# A wobbly is being thrown here. Anything without a description is throwing an error
			caminodescriptionelem = ""
			if plink.parent.next_sibling.name == "dd" #If there is a Pinboard Description???
				caminodescriptionelem = "<key>Description</key><string>#{Hpricot.xs(plink.parent.next_sibling.innerText)}</string>"
			end
			caminopbfolder.search("//dict").last.after "<dict>#{caminodescriptionelem}<key>Title</key><string>#{Hpricot.xs(plink.innerText)}</string><key>URL</key><string>#{Hpricot.xs(plink['href'].strip)}</string></dict>" #.gsub(/&(?!amp;)/, '&amp;')
			# Hmm what about UUID? How's that going to work? Just skip?
			# Do I need line breaks, etc?
		end
	rescue
		#Log bad urls
		pbbadurls << plink['href'] #This is not working properly. Everything is getting logged!
	end
end

#Step 3) Search in reverse and delete in Camino if not in Pinboard #Not sure what to do about ampersands here.
# This isn't working properly. Hpricot doesn't seem to like finding urls with additional colons in them
# (Which also means duplicates could be created above!)
# Also, sometimes the urls from pinboard have a space after them, i.e. "http://a.url.com " which will fail to match
# So I will leave removing urls until I have a more robust search
=begin
caminopbfolder.search("//dict/key[text()='URL']").each do |key|
	begin
		found = pinboard.search("//dl/dt/a[@href=#{key.next_sibling.innerText}]")[0] #Same here, ampersands handled automagically
		if found == nil
			key.parent.remove # Don't think this is quite right either
		end
	rescue
		cambadurls << key.next_sibling.innerText
	end
end
=end

# Last of all, write out file
f = File.new(Camino, 'w')
f.write(camino)
f.close

# Output if couldn't sync some
if pbbadurls.length > 0
	File.open(File.join(File.dirname(Camino),'pbbadurls.log'), 'w') do |f|
		f << "Couldn't add the following URLs to Camino:\n"
		pbbadurls.each do |url|
			f << url+"\n"
		end
	end
end
if cambadurls.length > 0
	File.open(File.join(File.dirname(Camino),'cambadurls.log'), 'w') do |f|
		f << "Couldn't remove the following URLs from Camino:\n"
		cambadurls.each do |url|
			f << url+"\n"
		end
	end
end

#Need to verify bookmarks added:
caminoold = Hpricot(open("#{Camino}.pb2cambak"))
caminopbfolderold = caminoold.search("//plist/dict/array/dict/string[text()='pinboard']")[0].parent.search("//array")[0]
puts "Old number of bookmarks: #{caminopbfolderold.search("//dict/key[text()*='URL']").count}"
caminonew = Hpricot(open(Camino))
caminopbfoldernew = caminonew.search("//plist/dict/array/dict/string[text()='pinboard']")[0].parent.search("//array")[0]
puts "New number of bookmarks: #{caminopbfoldernew.search("//dict/key[text()*='URL']").count}"

{% endhighlight %}
[Link to gist](https://gist.github.com/934096)

This is as slow as chuff! Took about 35 mins to add a 1000 odd new bookmarks to my existing 2000 odd Camino bookmarks because it has to iterate through each node of the Camino bookmarks file for each bookmark exported from Pinboard.in. And I think it might have added some duplicates as well because I found out that Hpricot doesn't like finding URLs with additional colons in them, so will have failed to find the existing bookmark and added it again. 

The reason I stuck with this approach (iterating through each node) is that I can modify the Camino bookmarks structure on the fly. 
Now I've got this working I intend to speed it up by building a hash of the two bookmark files (which will make lookups and comparisons much easier, but complicates modifying the actual bookmark structure), make it more robust by using MD5s of URLs for searching and comparison and perhaps also looking into some Pinboard API options rather than doing a simple export of all bookmarks. But don't hold your breath...
 
