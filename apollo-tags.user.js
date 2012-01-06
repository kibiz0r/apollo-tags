// ==UserScript==
// @match http://*.apollohq.com/
// ==/UserScript==

// Originally copied from a Gist at https://gist.github.com/1109648
function addJS(callback, jses) {
  var waitingForScripts = 0; // keep track of how many scripts have yet to load

  for (var i = 0; i < jses.length; i++) {
    var script = document.createElement('script');
    script.setAttribute('src', jses[i]);

    waitingForScripts++;

    script.addEventListener('load', function() {
      waitingForScripts--;
      if (waitingForScripts == 0) {
        var script = document.createElement('script');
        script.textContent = '(' + callback.toString() + ')();';
        document.body.appendChild(script);
      }
    }, false);
    document.body.appendChild(script);
  }
}


// the guts of this userscript
function main() {
  jQuery.noConflict();

  jQuery(document).create('.apTaskSubject', function(event) {
    var task = jQuery(event.target);
    var originalHtml = task.html();
    var taglessHtml = originalHtml.replace(/\s*\[([^\]]+)\]\s*/, function(tag) {
      task.after(' <a class="lolTaskTag">' + tag.strip() + '</a>');
      return '';
    });
    task.html(taglessHtml);
  });
}

// load external JS and execute the main function
addJS(main,
  [
    'http://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js',
    'http://code.jquery.com/jquery-1.7.1.min.js',
    'https://raw.github.com/snesin/jcade/master/jcade.js',
    'http://documentcloud.github.com/underscore/underscore-min.js'
  ]
);

