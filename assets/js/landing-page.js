  // Preloader
  $(window).on('load', function() {
      if ($('#preloader').length) {
          $('#preloader').delay(100).fadeOut('slow', function() {
              $(this).remove();
          });
      }
  });
  (function($) {
      $(window).on("load", function() {

          $("body").mCustomScrollbar({
              theme: "minimal"
          });

          $('.showButton').click(function() {
              $('.hidden').show();
              $('.show').hide();
          });

          $('.hideButton').click(function() {
              $('.hidden').hide();
              $('.show').show();
          });
      });

  })(jQuery);

  function toggleDarkLight() {
      var body = document.getElementById("body");
      var currentClass = body.className;
      body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
  }
  document.getElementById('dark-mode-btn').addEventListener('click', function(e) {
      const toggler = document.body;
      toggler.classList.toggle('dark-mode');
      const target = e.target;
      target.classList.toggle('bi-sun');
      target.classList.toggle('bi-moon-stars');
  });
  document.getElementById('dark-mode-btn1').addEventListener('click', function(e) {
      const toggler = document.body;
      toggler.classList.toggle('dark-mode');
      const target = e.target;
      target.classList.toggle('bi-moon-stars');
      target.classList.toggle('bi-sun');

  });

  let greetings = new Date();
  let time = greetings.getHours();

  function datetime() {
      if (time >= 5 && time <= 12) {
          return "Good Morning"
      } else if (time >= 12 && time <= 17) {
          return "Good Afternoon"
      } else {
          return "Good Evening"
      }
  }
  let greet = datetime();
  document.getElementById("greetings-time").innerHTML = greet;

  // text animation
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
      css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #000 }";
      document.body.appendChild(css);
  };

  // background animation
  (function() {

      var Base, Particle, canvas, colors, context, draw, drawables, i, mouseX, mouseY, mouseVX, mouseVY, rand, update, click, min, max, colors, particles;

      min = 1;
      max = 8;
      particles = 200;
      colors = ["64, 32, 0", "250, 64, 0", "242, 188, 29", "200, 200, 200"];

      rand = function(a, b) {
          return Math.random() * (b - a) + a;
      };

      Particle = (function() {
          function Particle() {
              this.reset();
          }

          Particle.prototype.reset = function() {
              this.color = colors[~~(Math.random() * colors.length)];
              this.radius = rand(min, max);
              this.x = rand(0, canvas.width);
              this.y = rand(-20, canvas.height * 0.5);
              this.vx = -5 + Math.random() * 10;
              this.vy = 0.7 * this.radius;
              this.valpha = rand(0.02, 0.09);
              this.opacity = 0;
              this.life = 0;
              this.onupdate = undefined;
              this.type = "dust";
          };

          Particle.prototype.update = function() {
              this.x = (this.x + this.vx / 3);
              this.y = (this.y + this.vy / 3);

              if (this.opacity >= 1 && this.valpha > 0) this.valpha *= -1;
              this.opacity += this.valpha / 3;
              this.life += this.valpha / 3;

              if (this.type === "dust")
                  this.opacity = Math.min(1, Math.max(0, this.opacity));
              else
                  this.opacity = 1;

              if (this.onupdate) this.onupdate();
              if (this.life < 0 || this.radius <= 0 || this.y > canvas.height) {
                  this.onupdate = undefined;
                  this.reset();
              }
          };

          Particle.prototype.draw = function(c) {
              c.strokeStyle = "rgba(" + this.color + ", " + Math.min(this.opacity, 0.25) + ")";
              c.fillStyle = "rgba(" + this.color + ", " + Math.min(this.opacity, 0.25) + ")";
              c.beginPath();
              c.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
              c.fill();
              c.stroke();
          };

          return Particle;

      })();

      mouseVX = mouseVY = mouseX = mouseY = 0;

      canvas = document.getElementById("bg");
      context = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      drawables = (function() {
          var _i, _results;
          _results = [];
          for (i = _i = 1; _i <= particles; i = ++_i) {
              _results.push(new Particle);
          }
          return _results;
      })();

      draw = function() {
          var d, _i, _len;
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          context.clearRect(0, 0, canvas.width, canvas.height)

          for (_i = 0, _len = drawables.length; _i < _len; _i++) {
              d = drawables[_i];
              d.draw(context);
          }
      };

      update = function() {
          var d, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = drawables.length; _i < _len; _i++) {
              d = drawables[_i];
              _results.push(d.update());
          }
          return _results;
      };

      document.onmousemove = function(e) {
          mouseVX = mouseX;
          mouseVY = mouseY;
          mouseX = ~~e.pageX;
          mouseY = ~~e.pageY;
          mouseVX = ~~((mouseVX - mouseX) / 2);
          mouseVY = ~~((mouseVY - mouseY) / 2);

      };

      window.addEventListener('resize', draw, false);
      setInterval(draw, 1000 / 30);
      setInterval(update, 1000 / 60);
  }).call(this);