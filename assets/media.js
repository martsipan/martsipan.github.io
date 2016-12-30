(function(window, document) {
  'use strict';

  var MEDIA_PREVIEW_SELECTOR = '.media-preview';
  var MEDIA_PLAYER_ID = 'media-player';
  var MEDIA_PLAYER_VISIBLE_CLASS = 'visible';
  var MEDIA_PLAYER_BODY_VISIBLE_CLASS = 'player-visible';
  var MEDIA_PLAYER_CONTENT_ID = 'media-content';
  var MEDIA_PLAYER_BUTTON_ID = 'media-close';

  var OEMBED_ENDPOINT = 'https://noembed.com/embed?url=';

  // private

  var player, content;
  var embeds = {};

  function ajax(url, callback) {
    var xmlhttp;

    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        callback(JSON.parse(xmlhttp.responseText));
      }
    };

    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  }

  function show(id) {
    player.classList.add(MEDIA_PLAYER_VISIBLE_CLASS);
    document.body.classList.add(MEDIA_PLAYER_BODY_VISIBLE_CLASS);
    content.innerHTML = embeds[id];
  }

  function hide(id) {
    player.classList.remove(MEDIA_PLAYER_VISIBLE_CLASS);
    document.body.classList.remove(MEDIA_PLAYER_BODY_VISIBLE_CLASS);
    content.innerHTML = '';
  }

  function createItem(elem, id, preview, html) {
    embeds[id] = html;
    elem.style.backgroundImage = 'url(' + preview + ')';
  }

  function prepare(elem) {
    if (!elem.dataset || !elem.dataset.url) {
      return false;
    }

    var url = elem.dataset.url;

    ajax(OEMBED_ENDPOINT + url, function(result) {
      createItem(elem, url, result.thumbnail_url, result.html);
    });

    elem.addEventListener('click', function() {
      show(url);
    })
  }

  // public

  var media;

  media = {
    initialize: function() {
      player = document.getElementById(MEDIA_PLAYER_ID);
      content = document.getElementById(MEDIA_PLAYER_CONTENT_ID);

      var elems = document.querySelectorAll(MEDIA_PREVIEW_SELECTOR);

      for (var i = 0; i < elems.length; i++) {
        prepare(elems[i]);
      }

      var button = document.getElementById(MEDIA_PLAYER_BUTTON_ID);

      if (button) {
        button.addEventListener('click', hide);
        player.addEventListener('click', hide);
      }
    }
  };

  window.media = window.media || media;
})(window, document);
