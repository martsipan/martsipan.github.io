(function(window, document) {

  'use strict';

  var CANVAS_SELECTOR_ID = 'kreski';

  // private

  var canvas, context;
  var origin, kolor, direction;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function move(x, y) {
    var rgb = [255, kolor, 213];

    context.beginPath();

    context.moveTo(
      origin.x,
      origin.y
    );

    context.lineTo(
      Math.round(x),
      Math.round(y)
    );

    context.lineWidth = 0.5;

    context.closePath();

    context.strokeStyle = 'rgb(' + rgb.join(',') + ')';
    context.stroke();

    if (direction) {
      kolor++;
    } else {
      kolor--;
    }

    if (kolor >= 255) {
      direction = false;
    } else if (kolor <= 0) {
      direction = true;
    }
  }

  function setOrigin(x, y) {
    origin = {
      x: Math.round(x),
      y: Math.round(y)
    }
  }

  // public

  var kreski;

  kreski = {
    initialize: function() {
      canvas = document.getElementById(CANVAS_SELECTOR_ID);
      context = canvas.getContext('2d');
      context.translate(0.5, 0.5);

      resize();

      direction = true;
      kolor = 0;

      setOrigin(
        window.innerWidth / 2,
        window.innerHeight / 2
      );

      window.addEventListener('resize', resize);

      window.addEventListener('mousemove', function($event) {
        move($event.pageX, $event.pageY);
      });

      window.addEventListener('touchmove', function($event) {
        var touch = $event.changedTouches[0];
        move(touch.pageX, touch.pageY);
      });

      window.addEventListener('mousedown', function($event) {
        setOrigin($event.pageX, $event.pageY);
      });

      window.addEventListener('touchstart', function($event) {
        var touch = $event.changedTouches[0];
        setOrigin(touch.pageX, touch.pageY);
      });
    }
  };

  window.kreski = window.kreski || kreski;

})(window, document);
