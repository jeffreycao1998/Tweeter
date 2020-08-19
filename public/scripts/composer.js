// If user scrolls, 'scroll to top' button appears at bottom right of screen
$(window).on('scroll', () => {
  if (window.scrollY > 150) {
    $('.scroll-top').css('height', '60px');
    $('.scroll-top').css('opacity', '1');
  } else {
    $('.scroll-top').css('height', '0');
    $('.scroll-top').css('opacity', '0');
  }

  $('.scroll-top').on('click', () => {
    window.scrollTo(0, 0);
  });
});