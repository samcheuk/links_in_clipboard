// Google Analytics
var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-93987323-2']);
  _gaq.push(['_trackEvent', 'button', 'clicked', 'app_icon']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
// End Google Analytics

var aLinks = [];

function hiddenOpenButton(hidden) {
  var display = 'block';
  var fontSize = '14pt';
  if (hidden) {
    display = 'none';
    fontSize = '20pt';
  }
  document.getElementById('links').style.fontSize = fontSize;
  document.getElementById('openLinks').style.display = display;
}

function openLinks() {
  _gaq.push(['_trackEvent', 'button', 'clicked', 'all_link']);
  for (var i=0; i<aLinks.length; i++) {
    var newURL = aLinks[i];
    chrome.tabs.create({url: newURL});
  }
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
    return "Clipboard is empty :(";
  }

  var links = text.split("http");
  if (links.length < 2) {
    return "Clipboard no link found :(";
  }

  var html = "";
  for (var i = 1; i < links.length; i++) {
    if (!links[i].includes("://")) {
      continue;
    }
    aLinks.push('http'+links[i]);
    var displayString = links[i];
    html += "<a class=\"btn\" href='http" + links[i] + "'>http" + displayString + "</a><br>";
    //html += "<a class=\"btn\" href='http" + links[i] + "' onClick=\"_gaq.push(['_trackEvent', 'button_link', 'clicked', 'sublink']);\">http" + displayString + "</a><br>";
  }
  html += "<p>";

  hiddenOpenButton(false);

  return html;
}

window.onload = function() {
  hiddenOpenButton(true);
  document.getElementById('openLinks').onclick = openLinks;
  var result = htmlConvert(getContentFromClipboard());
  document.getElementById('links').innerHTML = result;
};
