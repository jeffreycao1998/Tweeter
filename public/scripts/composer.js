// If user scrolls, 'scroll to top' button appears at bottom right of screen
$(window).on('scroll', () => {
  $('.scroll-top').css('height', '60px');
  $('.scroll-top').css('opacity', '1');

  $('.scroll-top').on('click', () => {
    window.scrollTo(0, 0);
  });
});