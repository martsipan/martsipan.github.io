(function(window, kreski, media) {
  'use strict';

  var marta = {
    puss: function() {
      kreski.initialize();
      media.initialize();
    }
  };

  window.marta = window.marta || marta;
})(window, kreski, media);
