'use strict';

import './popup.css';

(function() {
  var aLinks = [];

  function openLinks() {
    for (var i=0; i<aLinks.length; i++) {
      var newURL = aLinks[i];
      chrome.tabs.create({url: newURL});
    }
  }

  function hiddenOpenButton(hidden) {
    var display = 'block';
    if (hidden) {
      display = 'none';
    }
    document.getElementById('openLinks').style.display = display;
  }

  function getContentFromClipboard() {
    var result = "";
    var sandbox = document.getElementById("sandbox");
    sandbox.style.display = 'block';
    sandbox.value = "";
    sandbox.select();
    if (document.execCommand("paste")) {
        result = sandbox.value;
    }
    sandbox.value = '';
    sandbox.style.display = 'none';
    console.log(result);

    //parsing result
    if (result !== "") {
      if (result.charAt(0) == "\"" && result.charAt(result.length-1) == "\"") {
        result = result.substring(1, result.length-1);
      }
    }
    return result;
  }

  function htmlConvert(text) {
    if (text === "") {
      return '<button class="button-28" role="button" disabled>Clipboard is empty :(</button>';
    }
    var links = text.split("http");
    if (links.length < 2) {
      return '<button class="button-28" role="button" disabled>Clipboard no link found :(</button>';
    }
    var html = "";
    for (var i = 1; i < links.length; i++) {
      if (!links[i].includes("://")) {
        continue;
      }
      aLinks.push('http'+links[i]);
      var displayString = links[i];
      html += "<a class=\"button-28\" href='http" + links[i] + "'>http" + displayString + "</a><br>";
    }
    html += "<p>";
  
    hiddenOpenButton(false);
  
    return html;
  }

  hiddenOpenButton(true);
  document.getElementById('openLinks').onclick = openLinks;
  var result = htmlConvert(getContentFromClipboard());
  document.getElementById('links').innerHTML = result;
  console.log('test');

})();
