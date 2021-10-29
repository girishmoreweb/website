  // Preloader
  $(window).on('load', function() {
      if ($('#preloader').length) {
          $('#preloader').delay(100).fadeOut('slow', function() {
              $(this).remove();
          });
      }
  });

  function toggleDarkLight() {
      var body = document.getElementById("body");
      var currentClass = body.className;
      body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
  }
  document.getElementById('dark-mode-btn').addEventListener('click', function(e) {
      const toggler = document.body;
      toggler.classList.toggle('dark-mode');
      const target = e.target;
      target.classList.toggle('bi-moon-stars');
      target.classList.toggle('bi-sun');
  });

  //stars
  for (var i = 0; i < 100; i++) {
      var star = '<div class="star" style="animation: twinkle ' + ((Math.random() * 5) + 5) + 's linear ' + ((Math.random() * 5) + 5) + 's infinite; top: ' + Math.random() * $(window).height() + 'px; left: ' + Math.random() * $(window).width() + 'px;"></div>';
      $('body').append(star);
  }

  //
  var TxtRotate = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 100) || 4000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

      var that = this;
      var delta = 150 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 1000;
      }

      setTimeout(function() {
          that.tick();
      }, delta);
  };

  window.onload = function() {
      var elements = document.getElementsByClassName('txt-rotate');
      for (var i = 0; i < elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-rotate');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
              new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #F26921 }";
      document.body.appendChild(css);
  };