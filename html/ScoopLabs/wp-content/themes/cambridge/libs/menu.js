    jQuery(document).ready(function(){
      $('.menu-item').addClass('menu-trigger');
      $('.menu-trigger').click(function(){
        $('.menu-trigger').toggleClass('clicked');
        $('.page_wrapper').toggleClass('push');
        $('.menu-type').toggleClass('open');

        if ( $('.menu-type').hasClass('open') ) hideScroll();
        else showScroll();
      });
      
      $('.filter-item').addClass('filter-trigger');
      $('.filter-trigger').click(function() {
          $('#filter-trigger').toggleClass('filter_clicked');
          $('.filter_wrapper').toggleClass('filter_push');
          $('.filter-type').toggleClass('filter_open');
      });
        
      $('.settings-item').addClass('filter-trigger');
      $('.settings-trigger').click(function() {
          $('#settings-trigger').toggleClass('settings_clicked');
          $('.settings_wrapper').toggleClass('settings_push');
          $('.settings-type').toggleClass('settings_open');
      });
  });