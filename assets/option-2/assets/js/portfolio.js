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
  document.getElementById('dark-mode-btn1').addEventListener('click', function(e) {
      const toggler = document.body;
      toggler.classList.toggle('dark-mode');
      const target = e.target;
      target.classList.toggle('bi-moon-stars');
      target.classList.toggle('bi-sun');

  });