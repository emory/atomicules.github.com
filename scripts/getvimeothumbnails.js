(function() {
  var getvimeothumbnail;
  getvimeothumbnail = function(id) {
    var xmldoc, xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://vimeo.com/api/v2/video/" + id + ".xml", false);
    xmlhttp.send();
    xmldoc = xmlhttp.responseXML;
    return document.getElementById(id).src = xmldoc.getElementsByTagName('thumbnail_small')[0].textContent;
  };
}).call(this);
