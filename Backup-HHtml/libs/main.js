var activeChangeGorizontalSlider = 0;

jQuery(function () {
  if ($(window).scrollTop() >= 0) {
    $(".header__main__item h1").addClass("anime");
    $(".logo").addClass("anime");
    // setTimeout(function() {
    // }, 2000);
  }

  setCalendars();

  jQuery(".popup_check").each(function (i, popup) {
    jQuery(".popup_check_block").on("click", function () {
      jQuery(popup).find(".popup_check_block.active").removeClass("active");
      jQuery(this).addClass("active");

      jQuery(popup).find("input").val(jQuery(this).attr("data-value"));
    });
  });

  jQuery(document).on(
    "click",
    ".topic_sl .gorizontal-slider-item:not(.active).visible",
    function (event) {
      event.preventDefault();

      var track = jQuery(this)
        .parents(".gorizontal-slider-track")
        .first()
        .get(0);

      var direction = "next";
      if (jQuery(this).next().hasClass("active")) direction = "prev";

      productGorizontalSlideChange(track, direction, true);
    }
  );

  jQuery(".popup.popup_4").on("show-popup", function () {
    var hash = location.hash;
    var link = jQuery('a[href="' + hash + '"]').first();

    var dateJSON = JSON.parse(link.attr("data-date"));

    if (dateJSON) {
      var list = [];
      for (var i in dateJSON.steps) {
        var step = dateJSON.steps[i];

        list.push(
          '<div class="pop_4_block">' +
            "<p>" +
            step.date_formated +
            "<br/>" +
            "<span>" +
            step.title +
            "</span>" +
            "</p>" +
            "</div>"
        );
      }

      jQuery(this).find(".pop_4_flex").html(list.join(""));

      var versions = JSON.parse(jQuery(this).attr("data-versions"));

      jQuery(this)
        .find(".pop_4 > .pop_4_block p.exam-price")
        .html(
          versions[dateJSON.version] +
            "<br/>" +
            "<span>" +
            dateJSON.price +
            "₴</span>"
        );

      jQuery(this)
        .find("h3")
        .html(
          dateJSON.category ? dateJSON.category.title : dateJSON.exam_title
        );

      jQuery(this)
        .find(".show-popup")
        .attr("href", "#order-exam-" + dateJSON.slug);
    }
  });
  jQuery(".popup.error").on("show-popup", function () {
    var hash = location.hash;
    var link = jQuery('a[href="' + hash + '"]').first();

    var dateJSON = JSON.parse(link.attr("data-date"));

    if (dateJSON) {
      jQuery(this)
        .find(".show-popup")
        .attr("href", "#order-exam-" + dateJSON.slug);
    }
  });
  jQuery(".popup.popup_5").on("show-popup", function () {
    var hash = location.hash;
    var link = jQuery('a[href="' + hash + '"]').first();

    var dateJSON = JSON.parse(link.attr("data-date"));

    if (dateJSON) {
      jQuery(".exam-data").val(JSON.stringify(dateJSON));

      jQuery(this)
        .find(".exam-title-view")
        .html(
          dateJSON.category ? dateJSON.category.title : dateJSON.exam_title
        );
      jQuery(this)
        .find(".exam-date-view")
        .html(dateJSON.steps[0].date_formated);

      jQuery(this)
        .find(".exam-title")
        .val(dateJSON.category ? dateJSON.category.title : dateJSON.exam_title);
      jQuery(this).find(".exam-date").val(dateJSON.steps[0].date_formated);
      jQuery(this).find(".exam-date-clean").val(dateJSON.steps[0].date_from);
      jQuery(this).find(".exam-version").val(dateJSON.version);
      jQuery(this).find(".exam-level").val(dateJSON.level_slug);
    }
  });
  jQuery(".popup.popup_6").on("show-popup", function () {
    var hash = location.hash;
    var link = jQuery('a[href="' + hash + '"]').first();

    var dateJSON = JSON.parse(link.attr("data-date"));

    if (dateJSON) {
      jQuery(".exam-data").val(JSON.stringify(dateJSON));

      jQuery(this)
        .find(".exam-title")
        .val(dateJSON.category ? dateJSON.category.title : dateJSON.exam_title);
      jQuery(this).find(".exam-date").val(dateJSON.steps[0].date_formated);
      jQuery(this).find(".exam-date-clean").val(dateJSON.steps[0].date_from);
      jQuery(this).find(".exam-version").val(dateJSON.version);
      jQuery(this).find(".exam-level").val(dateJSON.level_slug);
    }
  });
  jQuery(".popup.examen").on("show-popup", function () {
    var hash = location.hash;
    var link = jQuery('a[href="' + hash + '"]').first();

    var datesJSON = JSON.parse(link.attr("data-dates"));

    if (datesJSON) {
      var versions = JSON.parse(jQuery(this).attr("data-versions"));
      var levels = JSON.parse(jQuery(this).attr("data-levels"));

      var filterExam = jQuery("#calendar-filter-exam").val();
      var filterVersion = jQuery("#calendar-filter-version").val();
      var filterLevel = jQuery("#calendar-filter-level").val();

      var list = [];

      for (var i in datesJSON) {
        var dateJSON = datesJSON[i];

        if (
          dateJSON &&
          (!filterExam || filterExam == dateJSON.code) &&
          (!filterVersion || filterVersion == dateJSON.version) &&
          (!filterLevel || filterLevel == dateJSON.level_slug)
        ) {
          list.push(
            '<div class="examen_cont">' +
              '<a href="#exam-' +
              dateJSON.slug +
              '" class="examen_cont_block show-popup" data-popup="popup_4">' +
              (dateJSON.category
                ? dateJSON.category.title
                : dateJSON.exam_title) +
              "</a>" +
              '<div class="examen_cont_text">' +
              "<div><span>" +
              jQuery(this).attr("data-version") +
              ": </span>" +
              versions[dateJSON.version] +
              "</div>" +
              "<div><span>" +
              jQuery(this).attr("data-level") +
              ": </span>" +
              levels[dateJSON.level_slug] +
              "</div>" +
              "</div>" +
              "</div>"
          );
        }
      }

      jQuery(this).find(".examen_sec").html(list.join(""));
    }
  });

  jQuery(".popup").on("show-popup", function () {
    var hash = location.hash;
    var link = jQuery('a[href="' + hash + '"]').first();

    var serviceType = link.attr("data-service_type") || "";
    var serviceTitle = link.attr("data-service_title") || "";

    jQuery(this).find(".crm-service_type").val(serviceType);
    jQuery(this).find(".crm-service_title").val(serviceTitle);
  });

  // jQuery('.double_grup').each(function( is, slider ){
  //     jQuery(slider).find('.double_grup_item').on('click', function( event ){
  //         event.preventDefault();

  //         var index = parseInt( jQuery(this).attr('data-index') );

  //         changeSlide( index );
  //     });

  //     jQuery(slider).find('.slide-left').on('click', function( event ){
  //         event.preventDefault();

  //         changeSlide( 'prev' );
  //     });
  //     jQuery(slider).find('.slide-right').on('click', function( event ){
  //         event.preventDefault();

  //         changeSlide( 'next' );
  //     });

  //     jQuery(slider).find('.double_grup_item, .slide-left, .slide-right').hover(function(){
  //         jQuery(slider).addClass('hovered');
  //     }, function(){
  //         jQuery(slider).removeClass('hovered');
  //     });
  //     var slideChangeInterval = setInterval(function(){
  //         if ( !jQuery(slider).hasClass('hovered') ) changeSlide( 'next' );
  //     }, 3000);

  //     function changeSlide( direction ){
  //         if ( direction == 'next' || direction == 'prev' ){
  //             jQuery(slider).find('.double_grup_item').each(function( iss, slide ){
  //                 var index = parseInt( jQuery(slide).attr('data-index') );

  //                 if ( direction == 'prev' ) index--;
  //                 else index++;

  //                 var limit = jQuery(slider).find('.double_grup_item').length - 1;
  //                 if ( index < 0 ) index = limit;
  //                 else if ( index > limit ) index = 0;

  //                 setSlideIndex( index, slide );
  //             });
  //         } else if ( direction != 1 ){
  //             var newActive = jQuery(slider).addClass( 'double_grup_' + ( is + 1 ) + '_' + direction ).first().get(0);
  //             var oldActive = jQuery(slider).addClass( 'double_grup_' + ( is + 1 ) + '_1' ).first().get(0);

  //             setSlideIndex( 1, newActive );
  //             setSlideIndex( direction, oldActive );
  //         }
  //     }

  //     function setSlideIndex( index, slide ){
  //         jQuery(slide).attr( 'data-index', index );

  //         for ( var i=0; i<10; i++ ){
  //             for ( var ii=0; ii<10; ii++ ){
  //                 jQuery(slide).removeClass( 'double_grup_' + i + '_' + ii );
  //             }
  //         }
  //         jQuery(slide).addClass( 'double_grup_' + ( is + 1 ) + '_' + ( index + 1 ) );

  //         if ( !index ) jQuery(slide).addClass('active');
  //         else jQuery(slide).removeClass('active');
  //     }
  // });

  jQuery(".accordion-button").on("click", function () {
    setTimeout(function () {
      var top =
        jQuery(".accordion-collapse.show")
          .parents(".accordion-item")
          .first()
          .offset().top - 16;
      if (top < jQuery(window).scrollTop()) {
        top -= jQuery(".top_menu").outerHeight();

        jQuery("html, body").animate(
          {
            scrollTop: top + "px",
          },
          400,
          "linear"
        );
      }
    }, 400);
  });

  jQuery(".video .play").on("click", function (event) {
    event.preventDefault();

    jQuery(this).parents(".video").addClass("active");
  });

  jQuery(".popup .square_el").on("click", function (event) {
    event.preventDefault();

    var popup = jQuery(this).parents(".popup").get(0);

    if (jQuery(this).hasClass("activated")) hidePopup();
    else {
      jQuery(popup).find(".zaiavka_cont_3").first().addClass("active");
      jQuery(popup).find(".zaiavka_coun").first().addClass("none");

      jQuery(this).addClass("activated");
      jQuery(this).find("span").first().html("OK");

      if (jQuery(window).width() >= 1200)
        jQuery(popup).find(".zaiavka_cont_1").first().addClass("none");
      else {
        jQuery(this)
          .parents(".popup_cont")
          .first()
          .animate(
            {
              scrollTop:
                jQuery(this).parents(".popup_cont").first().height() * 4 + "px",
            },
            1000
          );
      }
    }
  });

  jQuery(".intab-slider").each(function (is, slider) {
    jQuery(slider)
      .find(".intab-slider-left")
      .on("click", function (event) {
        event.preventDefault();

        changeSlide("prev");
      });

    jQuery(slider)
      .find(".intab-slider-right")
      .on("click", function (event) {
        event.preventDefault();

        changeSlide("next");
      });

    jQuery(slider)
      .find(".intab-slider-dot")
      .on("click", function (event) {
        event.preventDefault();

        var index = parseInt(jQuery(this).attr("data-index"));

        changeSlide(index);
      });

    function changeSlide(direction) {
      var limit = jQuery(slider).find(".intab-slide").length;
      var index = parseInt(
        jQuery(slider).find(".intab-slide.active").attr("data-index")
      );

      if (direction == "prev") index--;
      else if (direction == "next") index++;
      else index = direction;

      if (index < 1) index = limit;
      else if (index > limit) index = 1;

      jQuery(slider).find(".intab-slide.active").removeClass("active");
      jQuery(slider)
        .find('.intab-slide[data-index="' + index + '"]')
        .addClass("active");

      jQuery(slider).find(".intab-slider-dot.active").removeClass("active");
      jQuery(slider)
        .find('.intab-slider-dot[data-index="' + index + '"]')
        .addClass("active");

      recountDots();

      if (jQuery(".linear_trans_top").length) {
        var top =
          jQuery(".linear_trans_top").offset().top -
          jQuery(".top_menu").outerHeight() -
          parseFloat(jQuery(".top_menu").css("top"));

        jQuery("html, body").animate(
          {
            scrollTop: top + "px",
          },
          1000
        );
      }
    }

    function recountDots() {
      if (jQuery(window).width() >= 1200)
        jQuery(slider).find(".intab-slider-dots li").removeClass("hidden");
      else {
        jQuery(slider)
          .find(".intab-slider-dots li")
          .addClass("hidden")
          .removeClass("prev")
          .removeClass("next");

        var active = jQuery(slider)
          .find(".intab-slider-dot.active")
          .parents("li")
          .first();

        active.removeClass("hidden");

        active.next("li").removeClass("hidden").addClass("next");
        active.next("li").next("li").removeClass("hidden").addClass("next");

        active.prev("li").removeClass("hidden").addClass("prev");
        active.prev("li").prev("li").removeClass("hidden").addClass("prev");

        if (!jQuery(slider).find("li.prev").length) {
          active
            .next("li")
            .next("li")
            .next("li")
            .removeClass("hidden")
            .addClass("next");
          active
            .next("li")
            .next("li")
            .next("li")
            .next("li")
            .removeClass("hidden")
            .addClass("next");
        } else if (jQuery(slider).find("li.prev").length == 1) {
          active
            .next("li")
            .next("li")
            .next("li")
            .removeClass("hidden")
            .addClass("next");
        }

        if (!jQuery(slider).find("li.next").length) {
          active
            .prev("li")
            .prev("li")
            .prev("li")
            .removeClass("hidden")
            .addClass("prev");
          active
            .prev("li")
            .prev("li")
            .prev("li")
            .prev("li")
            .removeClass("hidden")
            .addClass("prev");
        } else if (jQuery(slider).find("li.next").length == 1) {
          active
            .prev("li")
            .prev("li")
            .prev("li")
            .removeClass("hidden")
            .addClass("prev");
        }
      }
    }
    recountDots();
  });

  jQuery(".sert_sl").each(function (is, slider) {
    jQuery(slider)
      .find(".slide-left")
      .on("click", function (event) {
        event.preventDefault();

        changeSlide("prev");
      });

    jQuery(slider)
      .find(".slide-right")
      .on("click", function (event) {
        event.preventDefault();

        changeSlide("next");
      });

    var clickStartX = null;
    var clickStartY = null;
    var clickEndX = null;
    var clickEndY = null;
    jQuery(slider).on("touchstart", function (event) {
      clickStartX =
        event.touches && event.touches[0]
          ? event.touches[0].pageX
          : event.pageX;
      clickStartY =
        event.touches && event.touches[0]
          ? event.touches[0].pageY
          : event.pageY;
    });
    jQuery("body").bind("touchmove", function (event) {
      event.preventDefault();

      clickEndX =
        event.touches && event.touches[0]
          ? event.touches[0].pageX
          : event.pageX;
      clickEndY =
        event.touches && event.touches[0]
          ? event.touches[0].pageY
          : event.pageY;
    });
    jQuery("body").bind("touchend", function () {
      jQuery("body").removeClass("overflow-hidden");

      if (
        clickStartX !== null &&
        clickStartY !== null &&
        clickEndX !== null &&
        clickEndY !== null &&
        Math.abs(clickStartX - clickEndX) > 10 &&
        Math.abs(clickStartY - clickEndY) < Math.abs(clickStartX - clickEndX)
      ) {
        var direction = clickStartX - clickEndX > 0 ? "next" : "prev";

        changeSlide(direction);
      }

      clickStartX = null;
      clickStartY = null;
      clickEndX = null;
      clickEndY = null;
    });

    jQuery(slider)
      .find(".sert_sl_block")
      .on("click", function (event) {
        event.preventDefault();

        // var index = parseInt( jQuery(this).attr('data-index') );

        // if ( index === 1 ){
        jQuery(".popup.imgpop .imgpop_cont img").attr(
          "src",
          jQuery(this).find("img").attr("src")
        );
        showPopup(event, jQuery("#imgpop-link").get(0), "imgpop");
        // } else changeSlide( index );
      });

    function changeSlide(direction) {
      var limit = jQuery(slider).find(".sert_sl_block").length;

      jQuery(slider)
        .find(".sert_sl_block")
        .each(function (iss, slide) {
          var index = parseInt(jQuery(this).attr("data-index"));

          if (direction == "prev") index++;
          else if (direction == "next") index--;
          else index += parseInt(direction) - 1;

          if (index < 1) index = limit - index;
          else if (index > limit) index = index - limit;

          jQuery(this)
            .removeClass("active")
            .removeClass("sert_block_1")
            .removeClass("sert_block_2")
            .removeClass("sert_block_3")
            .removeClass("sert_block_4")
            .addClass("sert_block_" + index)
            .attr("data-index", index);

          // if ( index == 1 ) jQuery(this).addClass('active');
        });
    }
  });

  jQuery(".header_tab_cont").each(function (i, section) {
    jQuery(".header_tab").each(function (it) {
      jQuery(this).attr("data-index", it);
    });

    if (
      window.location.hash &&
      jQuery(".header_tab[data-slug='" + window.location.hash.slice(1) + "']")
        .length > 0
    ) {
      jQuery(".header_tab.active").removeClass("active");
      jQuery(
        ".header_tab[data-slug='" + window.location.hash.slice(1) + "']"
      ).addClass("active");
    } else window.location.hash = jQuery(".header_tab.active").attr("data-slug");

    jQuery(".tab-left").on("click", function (event) {
      event.preventDefault();

      var index =
        parseInt(
          jQuery(section).find(".header_tab.active").attr("data-index")
        ) - 1;
      var limit = jQuery(section).find(".header_tab").length;
      if (index < 0) index = limit - 1;
      else if (index >= limit) index = 0;

      jQuery(".header_tab.active").removeClass("active");
      jQuery('.header_tab[data-index="' + index + '"]').addClass("active");

      window.location.hash = jQuery(".header_tab.active").attr("data-slug");
    });

    jQuery(".tab-right").on("click", function (event) {
      event.preventDefault();

      var index =
        parseInt(
          jQuery(section).find(".header_tab.active").attr("data-index")
        ) + 1;
      var limit = jQuery(section).find(".header_tab").length;
      if (index < 0) index = limit - 1;
      else if (index >= limit) index = 0;

      jQuery(".header_tab.active").removeClass("active");
      jQuery('.header_tab[data-index="' + index + '"]').addClass("active");

      window.location.hash = jQuery(".header_tab.active").attr("data-slug");
    });
  });

  jQuery(".tabs-section").each(function (i, section) {
    jQuery(section)
      .find(".tab-button")
      .on("click", function (event) {
        event.preventDefault();

        var index = parseInt(jQuery(this).attr("data-index"));

        setTab(index);

        var url = jQuery(this).attr("data-url");
        if (url && location.href != url) history.pushState({}, "", url);
      });

    function setTab(index) {
      jQuery(section).find(".tab-button").removeClass("active");
      jQuery(section)
        .find(".tab-button[data-index=" + index + "]")
        .addClass("active");

      jQuery(section).find(".tab-content").removeClass("active");
      jQuery(section)
        .find(".tab-content[data-index=" + index + "]")
        .addClass("active");
    }
  });

  jQuery(".header_tab").each(function (i, section) {
    jQuery(section)
      .find(".tab-button")
      .on("click", function (event) {
        event.preventDefault();

        var index = parseInt(jQuery(this).attr("data-index"));

        jQuery(section).find(".tab-button").removeClass("active");
        jQuery(section)
          .find(".tab-button[data-index=" + index + "]")
          .addClass("active");

        jQuery(section).find(".tab-content").removeClass("active");
        jQuery(section)
          .find(".tab-content[data-index=" + index + "]")
          .addClass("active");
      });
  });

  // var mousecursorAnimationInterval = null;
  // jQuery('body').bind('mousemove', function (event) {
  //     var x = event.pageX;
  //     var y = event.pageY - jQuery(window).scrollTop();

  //     if (mousecursorAnimationInterval !== null) {
  //         clearInterval(mousecursorAnimationInterval);
  //         mousecursorAnimationInterval = null;
  //     }
  //     mousecursorAnimationInterval = setInterval(function () {
  //         var mx = jQuery('.mousecursor').offset().left;
  //         var my = jQuery('.mousecursor').offset().top - jQuery(window).scrollTop();

  //         if (
  //             Math.abs(mx - x) < 1
  //             && Math.abs(my - y) < 1
  //         ) {
  //             jQuery('.mousecursor').css({
  //                 left: x + 'px',
  //                 top: y + 'px'
  //             });

  //             jQuery('.mousecursor .secondary-circle').css({
  //                 transform: 'scale(1)',
  //                 opacity: 1
  //             });

  //             clearInterval(mousecursorAnimationInterval);
  //             mousecursorAnimationInterval = null;
  //         } else {
  //             var cx = mx - (mx - x) / 10;
  //             var cy = my - (my - y) / 10;

  //             var d = (Math.abs(mx - x) + Math.abs(my - y)) / 2;
  //             if (d > 20) d = 20;

  //             jQuery('.mousecursor').css({
  //                 left: cx + 'px',
  //                 top: cy + 'px'
  //             });

  //             jQuery('.mousecursor .secondary-circle').css({
  //                 transform: 'scale(' + (d * .033 + 1) + ')',
  //                 opacity: (1 - .02 * d)
  //             });
  //         }
  //     }, 1);

  //     var left = (x - jQuery(window).width() / 2) / jQuery(window).width();
  //     var top = (y - jQuery(window).height() / 2) / jQuery(window).height();
  //     jQuery('.header__main__image .fon').css({
  //         marginLeft: (left * -200) + 'px',
  //         marginTop: (top * -150) + 'px'
  //     });
  // });
  // jQuery('*').filter(function () {
  //     return jQuery(this).css('cursor') == 'pointer';
  // }).hover(function () {
  //     jQuery('.mousecursor').addClass('pointer');
  // }, function () {
  //     jQuery('.mousecursor').removeClass('pointer');
  // });

  jQuery(".partners_sl_track").hover(
    function () {
      jQuery(this).addClass("hovered");
    },
    function () {
      jQuery(this).removeClass("hovered");
    }
  );
  var partnersMoveInterval = setInterval(function () {
    if (!jQuery(".partners_sl_track").hasClass("hovered")) {
      var translate =
        parseFloat(jQuery(".partners_sl_track").attr("data-translate")) || 0;
      translate -= 1;

      jQuery(".partners_sl_track")
        .attr("data-translate", translate)
        .css({
          transform: "translateX(" + translate + "px)",
        });

      jQuery(".partners_sl_block").each(function () {
        var plus =
          parseFloat(jQuery(this).outerWidth()) +
          parseFloat(jQuery(".partners_sl_track").css("column-gap"));
        var left = parseFloat(jQuery(this).offset().left + plus);

        if (left < 0) {
          translate += plus;

          jQuery(".partners_sl_track")
            .attr("data-translate", translate)
            .css({
              transform: "translateX(" + translate + "px)",
            });

          jQuery(".partners_sl_track").append(this);
        }
      });
    }
  }, 10);

  jQuery(".header-slider").each(function (i, slider) {
    jQuery(slider)
      .find(".header-slider-dots li")
      .on("click", function (event) {
        event.preventDefault();

        var index = parseInt(jQuery(this).attr("data-index"));

        changeSlide(index);
      });

    var clickStartX = null;
    var clickStartY = null;
    var clickEndX = null;
    var clickEndY = null;

    jQuery(slider)
      .find(".header-slide")
      .on("mousedown touchstart", function (event) {
        clickStartX =
          event.touches && event.touches[0]
            ? event.touches[0].pageX
            : event.pageX;
        clickStartY =
          event.touches && event.touches[0]
            ? event.touches[0].pageY
            : event.pageY;
      });
    jQuery("body").bind("mousemove touchmove", function (event) {
      event.preventDefault();

      clickEndX =
        event.touches && event.touches[0]
          ? event.touches[0].pageX
          : event.pageX;
      clickEndY =
        event.touches && event.touches[0]
          ? event.touches[0].pageY
          : event.pageY;
    });
    jQuery("body").bind("mouseup mouseleave touchend", function () {
      jQuery("body").removeClass("overflow-hidden");

      if (
        clickStartX !== null &&
        clickStartY !== null &&
        clickEndX !== null &&
        clickEndY !== null &&
        Math.abs(clickStartX - clickEndX) > 10 &&
        Math.abs(clickStartY - clickEndY) < Math.abs(clickStartX - clickEndX)
      ) {
        var index = parseInt(
          jQuery(slider)
            .find(".header-slider-dots li.active")
            .attr("data-index")
        );

        if (clickStartX - clickEndX > 0) index++;
        else index--;

        var limit = jQuery(slider).find(".header-slider-dots li").length;
        if (index < 1) index = 1;
        else if (index > limit) index = limit;

        changeSlide(index);
      }

      clickStartX = null;
      clickStartY = null;
      clickEndX = null;
      clickEndY = null;
    });

    jQuery(slider).on("mouseover", function () {
      jQuery(slider).addClass("hovered");
    });
    jQuery(slider).on("mouseout", function () {
      jQuery(slider).removeClass("hovered");
    });
    setInterval(function () {
      if (!jQuery(slider).hasClass("hovered")) {
        var index =
          parseInt(
            jQuery(slider)
              .find(".header-slider-dots li.active")
              .attr("data-index")
          ) + 1;

        var limit = jQuery(slider).find(".header-slider-dots li").length;
        if (index < 1) index = limit;
        else if (index > limit) index = 1;

        changeSlide(index);
      }
    }, 4000);

    function changeSlide(index) {
      jQuery(slider)
        .find(".header-slider-dots li.active")
        .removeClass("active");
      jQuery(slider)
        .find('.header-slider-dots li[data-index="' + index + '"]')
        .addClass("active");

      jQuery(slider).find(".header-slide.active").removeClass("active");
      jQuery(slider)
        .find('.header-slide[data-index="' + index + '"]')
        .addClass("active");
    }
  });

  jQuery(".arhiv_sl.gorizontal-slider").on("slider-prechange", function () {
    var track = jQuery(this).find(".gorizontal-slider-track").first().get(0);

    var scale = parseInt(jQuery(track).attr("data-scale"));
    var itemsCount = parseInt(jQuery(track).data("items-count"));
    var itemsCCount =
      jQuery(track).find(".gorizontal-slider-item").length - itemsCount;

    var left = Math.round((scale / itemsCCount) * 10000) / 100;

    jQuery(this)
      .find(".arhiv_bot_main_point")
      .animate(
        {
          left: left + "%",
        },
        400
      );
  });
  jQuery(".arhiv_sl.gorizontal-slider .arhiv_bot_main_track").on(
    "click",
    function (event) {
      var slider = jQuery(this).parents(".gorizontal-slider").first().get(0);
      var track = jQuery(slider)
        .find(".gorizontal-slider-track")
        .first()
        .get(0);

      var scale = parseInt(jQuery(track).attr("data-scale"));
      var itemsCount = parseInt(jQuery(track).data("items-count"));
      var itemsCCount =
        jQuery(track).find(".gorizontal-slider-item").length - itemsCount;

      var clickScale = Math.round(
        ((event.originalEvent.pageX - jQuery(this).offset().left) /
          jQuery(this).width()) *
          itemsCCount
      );

      var direction = clickScale - scale;

      productGorizontalSlideChange(track, direction, true);
    }
  );
  jQuery(".arhiv_sl.gorizontal-slider .arhiv_bot_main_point").each(function (
    i,
    point
  ) {
    var pointTrack = jQuery(this)
      .parents(".arhiv_bot_main_track")
      .first()
      .get(0);
    var slider = jQuery(this).parents(".gorizontal-slider").first().get(0);
    var track = jQuery(slider).find(".gorizontal-slider-track").first().get(0);

    var activate = 0;
    jQuery(".arhiv_sl.gorizontal-slider .arhiv_bot_main_point").on(
      "mousedown touchstart",
      function () {
        activate = 1;
      }
    );
    jQuery("body").bind("mouseup touchend", function () {
      activate = 0;
    });
    jQuery("body").bind("mousemove touchmove", function (event) {
      if (activate) {
        var scale = parseInt(jQuery(track).attr("data-scale"));
        var itemsCount = parseInt(jQuery(track).data("items-count"));
        var itemsCCount =
          jQuery(track).find(".gorizontal-slider-item").length - itemsCount;

        var pageX = event.touches ? event.touches[0].pageX : event.pageX;
        var clickScale = Math.round(
          ((pageX - jQuery(pointTrack).offset().left) /
            jQuery(pointTrack).width()) *
            itemsCCount
        );

        var direction = clickScale - scale;

        if (direction != 0)
          productGorizontalSlideChange(track, direction, true);
      }
    });
  });

  jQuery(".opacity-slider").each(function (i, slider) {
    jQuery(slider).attr("data-index", 0);
    jQuery(slider).find(".opacity-slider-item").first().addClass("active");

    jQuery(slider)
      .find(".arrow-left")
      .on("click", function () {
        changeOpacitySlide(-1);
      });
    jQuery(slider)
      .find(".arrow-right")
      .on("click", function () {
        changeOpacitySlide(1);
      });

    var touchStart = 0;
    var touchEnd = 0;
    var touchStartY = 0;
    var touchEndY = 0;
    jQuery(slider).on("touchstart", function (e) {
      touchStart = e.touches[0].pageX;
      touchStartY = e.touches[0].pageY;

      jQuery("html, body").css({ overflowY: "hidden" });
    });
    jQuery(slider).on("touchend", function (e) {
      if (Math.abs(touchStart - touchEnd) > Math.abs(touchStartY - touchEndY)) {
        var direction = touchStart - touchEnd > 0 ? -1 : 1;

        activeChangeGorizontalSlider = 1;
        if (touchEnd) changeOpacitySlide(direction);
        activeChangeGorizontalSlider = 0;

        touchStart = 0;
        touchEnd = 0;
        touchStartY = 0;
        touchEndY = 0;

        setTimeout(function () {
          jQuery("html, body").removeAttr("style");
        }, 400);
      } else jQuery("html, body").removeAttr("style");
    });
    jQuery(slider).on("touchmove", function (e) {
      touchEnd = e.touches[0].pageX;
      touchEndY = e.touches[0].pageY;

      if (Math.abs(touchStartY - touchEndY) > 10)
        jQuery("html, body").removeAttr("style");
      else jQuery("html, body").css({ overflowY: "hidden" });
    });

    var allow = 1;
    function changeOpacitySlide(plus) {
      if (allow) {
        allow = 0;

        var index = parseInt(jQuery(slider).attr("data-index")) + plus;
        var limit = jQuery(slider).find(".opacity-slider-item").length - 1;
        if (index < 0) index = limit;
        else if (index > limit) index = 0;
        jQuery(slider).attr("data-index", index);

        if (plus < 0)
          jQuery(slider)
            .find(".opacity-slider-slides")
            .first()
            .addClass("anime_right");
        else
          jQuery(slider)
            .find(".opacity-slider-slides")
            .first()
            .addClass("anime_left");

        setTimeout(function () {
          jQuery(slider)
            .find(".opacity-slider-item.active")
            .removeClass("active");
          jQuery(slider)
            .find(".opacity-slider-item")
            .eq(index)
            .addClass("active");
        }, 400);

        setTimeout(function () {
          allow = 1;

          jQuery(slider)
            .find(".opacity-slider-slides")
            .first()
            .removeClass("anime_right")
            .removeClass("anime_left");
        }, 1000);
      }
    }
  });

  var audiostream = document.getElementById("audiostream");
  if (audiostream) {
    jQuery(".header_top_center .play_stop").on("click", function () {
      if (audiostream.paused) {
        audiostream.play();
        jQuery(".header_top_center .play_stop").removeClass("active");
        jQuery(".music .play_stop").addClass("active");

        for (var i in youtubePlayers)
          if (youtubePlayers[i] && youtubePlayers[i].pauseVideo)
            youtubePlayers[i].pauseVideo();
      } else {
        audiostream.pause();
        jQuery(".header_top_center .play_stop").addClass("active");
      }
    });

    jQuery(".volume_gorizont").on("click", function (event) {
      radioSetVolume(
        (event.pageX - jQuery(".volume_gorizont").offset().left) /
          jQuery(".volume_gorizont").outerWidth()
      );
    });

    var radioDotDnDActivated = false;
    jQuery(".volume_polz").on("mousedown touchstart", function () {
      radioDotDnDActivated = true;
    });
    jQuery("body").bind("mousemove touchmove", function (event) {
      if (radioDotDnDActivated) {
        radioSetVolume(
          (event.touches
            ? event.touches[0].pageX
            : event.pageX - jQuery(".volume_gorizont").offset().left) /
            jQuery(".volume_gorizont").outerWidth()
        );
      }
    });
    jQuery("body").bind("mouseup mouseleave touchend", function () {
      radioDotDnDActivated = false;
    });

    jQuery(".voice").on("click", function () {
      jQuery(this).toggleClass("active");

      var muted = jQuery(this).hasClass("active") ? 0 : 1;

      setCookie("radio_muted", muted, 16);

      radioSetVolume(getCookie("radio_valume"));
    });

    function radioSetVolume(value) {
      var muted = parseInt(getCookie("radio_muted"));

      value = parseFloat(value);
      if (!value) value = 0.5;
      else if (value < 0) value = 0;
      else if (value > 1) value = 1;

      audiostream.volume = muted ? 0 : Math.round(value * 100) / 100;

      jQuery(".volume_gorizont_black").css({ width: value * 100 + "%" });
      jQuery(".volume_polz").css({ left: value * 100 + "%" });

      setCookie("radio_valume", value, 16);
    }
    radioSetVolume(getCookie("radio_valume"));
  }

  jQuery(".add-to-wish").on("click", function (event) {
    event.preventDefault();

    jQuery(".add-to-wish").toggleClass("active");

    if (jQuery(".add-to-wish").hasClass("active")) {
      jQuery(".add-to-wish-label").each(function () {
        jQuery(this).html(jQuery(this).attr("data-active"));
      });
    } else {
      jQuery(".add-to-wish-label").each(function () {
        jQuery(this).html(jQuery(this).attr("data-disactive"));
      });
    }
  });

  jQuery(".add-to-cart").on("click", function () {
    jQuery(this)
      .parents(".katalog_obrani_block_img")
      .first()
      .addClass("dodano");

    jQuery(".block_fix").addClass("active");
  });

  jQuery(".katalog_alfovit_flex .active").on("click", function (event) {
    event.preventDefault();

    var letter = jQuery(this).attr("data-letter");

    if (letter) {
      var section = jQuery(
        '.katalog_obrani[data-letter="' + letter + '"]'
      ).first();
      if (section.get(0))
        jQuery("html, body").animate(
          {
            scrollTop:
              section.offset().top - jQuery(".top_menu ").height() - 30 + "px",
          },
          1000
        );
    }
  });

  jQuery(".top_menu").on("add_scrolled", function () {
    setTimeout(function () {
      jQuery(".top_menu .logo_h .lottie").data("anim").goToAndPlay(0);
    }, 100);
  });

  jQuery(".like-album").on("click", function (event) {
    event.preventDefault();
  });

  jQuery(".latest_news_block a:not(.other)").hover(
    function () {
      jQuery(this)
        .parents(".latest_news_block")
        .first()
        .find("a:not(.other)")
        .addClass("active");
    },
    function () {
      jQuery(this)
        .parents(".latest_news_block")
        .first()
        .find("a:not(.other)")
        .removeClass("active");
    }
  );
  jQuery(".strochka_img_block a:not(.other)").hover(
    function () {
      jQuery(this)
        .parents(".strochka_img_block")
        .first()
        .find("a:not(.other)")
        .addClass("active");
    },
    function () {
      jQuery(this)
        .parents(".strochka_img_block")
        .first()
        .find("a:not(.other)")
        .removeClass("active");
    }
  );
  jQuery(".project_block a:not(.other)").hover(
    function () {
      jQuery(this)
        .parents(".project_block")
        .first()
        .find("a:not(.other)")
        .addClass("active");
    },
    function () {
      jQuery(this)
        .parents(".project_block")
        .first()
        .find("a:not(.other)")
        .removeClass("active");
    }
  );

  jQuery(".poisk_ic").on("click", function () {
    jQuery(".poisk").toggleClass("active");
  });
  jQuery(".poisk .exit").on("click", function () {
    jQuery(".poisk").removeClass("active");
  });
  jQuery(".poisk").hover(
    function () {
      jQuery(this).addClass("hovered");
    },
    function () {
      jQuery(this).removeClass("hovered");
    }
  );
  jQuery("body").bind("click", function () {
    if (!jQuery(".poisk").hasClass("hovered"))
      jQuery(".poisk").removeClass("active");
  });

  var lazyInterval = setInterval(function () {
    jQuery("img.lazy-image").each(function () {
      if (getIsVisible(this)) lazyImage(this);
    });

    if (!jQuery("img.lazy-image").length) clearInterval(lazyInterval);
  }, 100);
  setTimeout(function () {
    jQuery("img.lazy-image").each(function () {
      lazyImage(this);
    });
  }, 10000);

  var date = new Date();
  date.setDate(date.getDate() + 30);
  jQuery("#discount-date").html(
    ("0" + date.getDate()).slice(-2) +
      "." +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "." +
      date.getFullYear()
  );

  jQuery(".header_sl_img .header_sl_track .header_sl_block").each(function (i) {
    jQuery(this).attr("data-pos", i);
  });
  jQuery(".header__main .header_opis").each(function (i) {
    jQuery(this).attr("data-pos", i);
  });
  //header_opis

  jQuery(".video-block").on("mouseover", function () {
    if (jQuery(this).find("iframe").first().data("muted"))
      jQuery(this).find("iframe").first().data("muted", false);
  });

  jQuery(".top_menu li a, #leftside-navigation .nano-content a").on(
    "click",
    function (event) {
      event.preventDefault();

      var href = jQuery(this).attr("href");
      var section = jQuery(href);

      if (section.get(0)) {
        jQuery("html, body").animate(
          {
            scrollTop: section.offset().top + "px",
          },
          1000
        );

        jQuery(".menu, .menu-trigger").removeClass("open");
        jQuery(".menu-trigger").removeClass("clicked");
      }
    }
  );

  jQuery(".showreal-play").on("click", function (event) {
    event.preventDefault();

    jQuery("html, body").addClass("disabled-scroll");

    jQuery("#video-background").addClass("active");
    setTimeout(function () {
      jQuery("#video-background").get(0).requestFullscreen();

      setTimeout(function () {
        var video = jQuery("#video-background video").get(0);
        video.play();
      }, 200);
    }, 400);
  });
  jQuery("#video-background .exit").on("click", function () {
    var video = jQuery("#video-background video").get(0);
    video.pause();

    jQuery("html, body").removeClass("disabled-scroll");

    jQuery("#video-background").removeClass("active");

    setTimeout(function () {
      document.exitFullscreen();
    }, 400);
  });
  jQuery("#video-background video").on("click", function () {
    if (this.paused) this.play();
    else this.pause();
  });

  jQuery(".vipod").on("click", function () {
    jQuery(".vipod").removeClass("active");
    jQuery(this).addClass("active");
  });

  jQuery(".reviews_track").each(function () {
    jQuery(this)
      .find(".reviews_block")
      .each(function (i) {
        if (!i) jQuery(this).addClass("active");
        else if (i === 1) jQuery(this).addClass("min");
        else jQuery(this).addClass("next");
      });

    var next = jQuery(this).find(".reviews_block").first().clone(true);
    next
      .removeClass("active")
      .removeClass("min")
      .removeClass("prev")
      .addClass("next");

    var prev = jQuery(this).find(".reviews_block").last().clone(true);
    prev
      .removeClass("active")
      .removeClass("min")
      .removeClass("next")
      .addClass("prev");

    jQuery(this).append(next).prepend(prev);

    var slider = jQuery(this).parents(".reviews_sl").first();
    repositionateArrows(slider);
  });
  jQuery(".reviews_sl .arr_r").on("click", function (event) {
    event.preventDefault();

    var slider = jQuery(this).parents(".reviews_sl").first();

    changeSlide(slider, "next");
  });
  jQuery(".reviews_sl .arr_l").on("click", function (event) {
    event.preventDefault();

    var slider = jQuery(this).parents(".reviews_sl").first();

    changeSlide(slider, "prev");
  });

  var activeChangeGorizontalSlider = 1;
  var touchStart = 0;
  var touchEnd = 0;
  var touchStartY = 0;
  var touchEndY = 0;
  jQuery(".reviews_track").on("touchstart", function (e) {
    touchStart = e.touches[0].pageX;
    touchStartY = e.touches[0].pageY;

    jQuery("html, body").css({
      overflowY: "hidden",
    });
  });
  jQuery(".reviews_track").on("touchend", function (e) {
    if (Math.abs(touchStart - touchEnd) > Math.abs(touchStartY - touchEndY)) {
      var slider = jQuery(this).parents(".reviews_sl").first();
      var direction = touchStart - touchEnd > 0 ? "next" : "prev";

      activeChangeGorizontalSlider = 1;
      if (touchEnd) changeSlide(slider, direction);
      activeChangeGorizontalSlider = 0;

      touchStart = 0;
      touchEnd = 0;
      touchStartY = 0;
      touchEndY = 0;

      setTimeout(function () {
        jQuery("html, body").removeAttr("style");
      }, 400);
    } else jQuery("html, body").removeAttr("style");
  });
  jQuery(".reviews_track").on("touchmove", function (e) {
    touchEnd = e.touches[0].pageX;
    touchEndY = e.touches[0].pageY;

    if (Math.abs(touchStartY - touchEndY) > 10)
      jQuery("html, body").removeAttr("style");
    else
      jQuery("html, body").css({
        overflowY: "hidden",
      });
  });

  jQuery(".block_v").hover(
    function () {
      jQuery(this).addClass("hovered");
    },
    function () {
      jQuery(this).removeClass("hovered");
    }
  );
  jQuery(".block_v .block_v_cont, .block_v .block_arrow").on(
    "click",
    function (event) {
      // C
      event.preventDefault();

      var vipod = jQuery(this).parents(".block_v").first();
      setTimeout(function () {
        vipod.toggleClass("opened").toggleClass("active");
      }, 0);
    }
  );

  jQuery(".block_v_acord").each(function (i) {
    jQuery(this).attr("data-index", i);
  });
  jQuery(".block_v_acord .block_v_cont").on("click", function (event) {
    event.preventDefault();

    var vipod = jQuery(this).parents(".block_v_acord").first();
    var index = parseInt(vipod.attr("data-index"));

    jQuery('.block_v_acord[data-index!="' + index + '"]')
      .removeClass("opened")
      .removeClass("active");
    vipod.addClass("hovered").toggleClass("opened").toggleClass("active");

    setTimeout(function () {
      vipod.removeClass("hovered");
    }, 40);
  });
  jQuery(".block_v_acord .block_item").on("click", function (event) {
    event.preventDefault();

    var block = jQuery(this).parents(".block_v").first();

    block.find(".block_item.active").removeClass("active");
    jQuery(this).addClass("active");

    block.find(".block_v_chosen").html(jQuery(this).html());
    block.find(".block_v_ivalue").val(jQuery(this).attr("data-value"));

    block.trigger("select-change");

    setTimeout(function () {
      block.removeClass("hovered").removeClass("opened").removeClass("active");

      if (block.parents(".course-tabs").get(0)) {
        var top = jQuery(".course-tabs").first().offset().top;

        if (top < jQuery(window).scrollTop())
          jQuery("html, body").animate(
            {
              scrollTop: top + "px",
            },
            1000
          );
      }
    }, 40);
  });
  jQuery(".calendar-filter").on("select-change", function () {
    setDatesInfo(jQuery(".registg_cont").get(0));
  });

  jQuery("body").bind("click", function () {
    jQuery(".block_v:not(.hovered), block_v_acord:not(.hovered)")
      .removeClass("opened")
      .removeClass("active");
  });

  jQuery(".menu ul.nano-content li").on("mouseover", function () {
    var index = parseInt(jQuery(this).attr("data-index"));

    jQuery(".menu .photo_mennu img.active").removeClass("active");
    jQuery(".menu .photo_mennu img[data-index=" + index + "]").addClass(
      "active"
    );
  });

  jQuery(".honey_vypod .vipod_zag").on("click", function () {
    var parent = jQuery(this).parents(".honey_vypod").first();
    setTimeout(function () {
      parent.addClass("active");
    }, 50);
  });

  jQuery(".whi_sl_img .whi_sl_img_block").each(function (i) {
    jQuery(this).attr("data-index", i);
  });
  jQuery(".whi_sl_text .whi_sl_text_block").each(function (i) {
    jQuery(this).attr("data-index", i);
  });
  jQuery(".whi_min_cl li").each(function (i) {
    jQuery(this).attr("data-index", i);
  });
  jQuery(".whi_sl_bot_numb a").each(function (i) {
    jQuery(this).attr("data-index", i);
  });

  jQuery(".whi_min_cl li, .whi_sl_bot_numb a").on("click", function (event) {
    event.preventDefault();

    var index = parseInt(jQuery(this).attr("data-index"));
    changeSlideHowWorks(index);
  });
  jQuery(".whi_sl .arr_l").on("click", function (event) {
    event.preventDefault();

    var active = jQuery(".whi_sl_img .whi_sl_img_block.active").first();
    var index = 0;
    if (active.prev(".whi_sl_img_block").get(0))
      index = parseInt(
        active.prev(".whi_sl_img_block").first().attr("data-index")
      );
    else
      index = parseInt(
        jQuery(".whi_sl_img .whi_sl_img_block").last().attr("data-index")
      );

    changeSlideHowWorks(index);
  });
  jQuery(".whi_sl .arr_r").on("click", function (event) {
    event.preventDefault();

    var active = jQuery(".whi_sl_img .whi_sl_img_block.active").first();
    var index = 0;
    if (active.next(".whi_sl_img_block").get(0))
      index = parseInt(
        active.next(".whi_sl_img_block").first().attr("data-index")
      );
    else
      index = parseInt(
        jQuery(".whi_sl_img .whi_sl_img_block").first().attr("data-index")
      );

    changeSlideHowWorks(index);
  });
  var wtouchStart = 0;
  var wtouchEnd = 0;
  var wtouchStartY = 0;
  var wtouchEndY = 0;
  jQuery(".whi_sl").on("touchstart", function (e) {
    wtouchStart = e.touches[0].pageX;
    wtouchStartY = e.touches[0].pageY;

    jQuery("html, body").css({
      overflowY: "hidden",
    });
  });
  jQuery(".whi_sl").on("touchend", function (e) {
    if (
      Math.abs(wtouchStart - wtouchEnd) > Math.abs(wtouchStartY - wtouchEndY)
    ) {
      var direction = wtouchStart - wtouchEnd > 0 ? "next" : "prev";

      if (wtouchEnd) {
        var active = jQuery(".whi_sl_img .whi_sl_img_block.active").first();
        var index = 0;

        if (direction == "prev") {
          if (active.prev(".whi_sl_img_block").get(0))
            index = parseInt(
              active.prev(".whi_sl_img_block").first().attr("data-index")
            );
          else
            index = parseInt(
              jQuery(".whi_sl_img .whi_sl_img_block").last().attr("data-index")
            );
        } else {
          if (active.next(".whi_sl_img_block").get(0))
            index = parseInt(
              active.next(".whi_sl_img_block").first().attr("data-index")
            );
          else
            index = parseInt(
              jQuery(".whi_sl_img .whi_sl_img_block").first().attr("data-index")
            );
        }

        changeSlideHowWorks(index);
      }

      wtouchStart = 0;
      wtouchEnd = 0;
      wtouchStartY = 0;
      wtouchEndY = 0;

      setTimeout(function () {
        jQuery("html, body").removeAttr("style");
      }, 400);
    } else jQuery("html, body").removeAttr("style");
  });
  jQuery(".whi_sl").on("touchmove", function (e) {
    wtouchEnd = e.touches[0].pageX;
    wtouchEndY = e.touches[0].pageY;

    if (Math.abs(wtouchStartY - wtouchEndY) > 10)
      jQuery("html, body").removeAttr("style");
    else
      jQuery("html, body").css({
        overflowY: "hidden",
      });
  });

  jQuery(".delivery_sl_block").each(function (i) {
    jQuery(this).attr("data-index", i + 1);
    jQuery(this).attr("data-pos", i + 1);
  });
  jQuery(".delivery_sl_block").on("click", function (event) {
    event.preventDefault();

    var limit = jQuery(".delivery_sl_block").length;

    var index = parseInt(jQuery(this).attr("data-index"));

    if (index < 1) index = limit;
    else if (index > limit) index = 1;

    changeSlideFace(index);
  });
  jQuery(
    ".delivery__main .delivery_sl .arr_l, .delivery__main .delivery_sl .arr_r"
  ).on("click", function (event) {
    event.preventDefault();

    var limit = jQuery(".delivery_sl_block").length;

    var index = parseInt(
      jQuery(".delivery_sl_block.active").attr("data-index")
    );

    if (jQuery(this).hasClass("arr_l")) index--;
    else index++;

    if (index < 1) index = limit;
    else if (index > limit) index = 1;

    changeSlideFace(index);
  });
  var dtouchStart = 0;
  var dtouchEnd = 0;
  var dtouchStartY = 0;
  var dtouchEndY = 0;
  jQuery(".delivery_sl").on("touchstart", function (e) {
    dtouchStart = e.touches[0].pageX;
    dtouchStartY = e.touches[0].pageY;

    jQuery("html, body").css({
      overflowY: "hidden",
    });
  });
  jQuery(".delivery_sl").on("touchend", function (e) {
    if (
      Math.abs(dtouchStart - dtouchEnd) > Math.abs(dtouchStartY - dtouchEndY)
    ) {
      var direction = dtouchStart - dtouchEnd > 0 ? "next" : "prev";

      if (dtouchEnd) {
        var limit = jQuery(".delivery_sl_block").length;

        var index = parseInt(
          jQuery(".delivery_sl_block.active").attr("data-index")
        );

        if (direction == "prev") index--;
        else index++;

        if (index < 1) index = limit;
        else if (index > limit) index = 1;

        changeSlideFace(index);
      }

      dtouchStart = 0;
      dtouchEnd = 0;
      dtouchStartY = 0;
      dtouchEndY = 0;

      setTimeout(function () {
        jQuery("html, body").removeAttr("style");
      }, 400);
    } else jQuery("html, body").removeAttr("style");
  });
  jQuery(".delivery_sl").on("touchmove", function (e) {
    dtouchEnd = e.touches[0].pageX;
    dtouchEndY = e.touches[0].pageY;

    if (Math.abs(dtouchStartY - dtouchEndY) > 10)
      jQuery("html, body").removeAttr("style");
    else
      jQuery("html, body").css({
        overflowY: "hidden",
      });
  });

  setInterval(function () {
    if (jQuery(window).width() >= 1200) {
      if (
        jQuery(".str_strichka__main__item").height() >
        jQuery(".custom-sticky-move").height()
      )
        jQuery(".str_strichka__main")
          .removeAttr("style")
          .css({ height: jQuery(".str_strichka__main__item").height() });
    }
  }, 400);

  setTimeout(function () {
    if (!youTubeAPILoaded) loadYouTubeAPI();
  }, 4000);

  jQuery("#reviews").each(function (ir, reviews) {
    // jQuery(reviews).find('.reviews_sl_track').on('mousewheel wheel DOMMouseScroll', function( event ){
    //     if ( !jQuery(reviews).find('.reviews_sl_track').hasClass('stopWheel') ){
    //         event.preventDefault();

    //         if ( Math.abs( event.originalEvent.deltaY ) > 2 ){
    //             var plus = event.originalEvent.deltaY;

    //             reviewsScroll( plus );
    //         }
    //     }
    // });

    var arrowClicked = false;
    var intervalByKey = null;
    jQuery(reviews)
      .find(".arrow-left")
      .on("mousedown", function (event) {
        event.preventDefault();

        if (!arrowClicked) {
          arrowClicked = true;

          setTimeout(function () {
            if (!arrowClicked) {
              var itemWidth = jQuery(reviews)
                .find(".reviews_sl_track .reviews_cont")
                .first()
                .outerWidth();
              reviewsScroll(itemWidth * -1, 400, true);
            } else {
              if (intervalByKey !== null) {
                clearInterval(intervalByKey);
                intervalByKey = null;
              }

              intervalByKey = setInterval(function () {
                reviewsScroll(-2);
              }, 1);
            }
          }, 200);
        }
      });
    jQuery(reviews)
      .find(".arrow-right")
      .on("mousedown", function (event) {
        event.preventDefault();

        if (!arrowClicked) {
          arrowClicked = true;

          setTimeout(function () {
            if (!arrowClicked) {
              var itemWidth = jQuery(reviews)
                .find(".reviews_sl_track .reviews_cont")
                .first()
                .outerWidth();
              reviewsScroll(itemWidth, 400, true);
            } else {
              if (intervalByKey !== null) {
                clearInterval(intervalByKey);
                intervalByKey = null;
              }

              intervalByKey = setInterval(function () {
                reviewsScroll(2);
              }, 1);
            }
          }, 200);
        }
      });
    jQuery(reviews)
      .find(".reviews_sl_track, .arrow-left, .arrow-right")
      .on("mouseup mouseleave", function (event) {
        if (intervalByKey !== null) {
          clearInterval(intervalByKey);
          intervalByKey = null;
        }

        arrowClicked = false;
      });

    jQuery(reviews)
      .find(".reviews_sl_track")
      .on("keydown", function (event) {
        var plus = 0;

        if (event.keyCode == 37) plus = -1;
        else if (event.keyCode == 39) plus = 1;

        if (plus !== 0) {
          event.preventDefault();

          if (intervalByKey !== null) {
            clearInterval(intervalByKey);
            intervalByKey = null;
          }

          intervalByKey = setInterval(function () {
            reviewsScroll(plus);
          }, 1);
        }
      });
    jQuery(reviews)
      .find(".reviews_sl_track")
      .on("keyup", function (event) {
        if (intervalByKey !== null) {
          clearInterval(intervalByKey);
          intervalByKey = null;
        }
      });

    // var movingInterval = setInterval(function(){
    //     if (
    //         !jQuery(reviews).find('.reviews_sl_track').hasClass('hovered')
    //         && jQuery(window).width() >= 1200
    //     ) reviewsScroll( 1 );
    // }, 10);

    jQuery(reviews)
      .find(".reviews_sl_track")
      .hover(
        function () {
          jQuery(this).addClass("hovered");
        },
        function () {
          jQuery(this).removeClass("hovered");
        }
      );

    jQuery(reviews)
      .find(".reviews_sl_track .reviews_cont .reviews_block_text")
      .on("mouseover", function () {
        if (
          jQuery(this).prop("scrollHeight") - jQuery(this).outerHeight() > 10 &&
          jQuery(this).parents(".reviews_block").hasClass("active")
        ) {
          jQuery(reviews).find(".reviews_sl_track").addClass("stopWheel");
        }
      });
    jQuery(reviews)
      .find(".reviews_sl_track .reviews_cont .reviews_block_text")
      .on("mouseout mouseleave", function () {
        jQuery(reviews).find(".reviews_sl_track").removeClass("stopWheel");
      });

    var touchStart = null;
    var touchEnd = null;
    var touchStartY = null;
    var touchEndY = null;
    var touchAccept = true;
    // var touchIntervalCount = 0;
    // var touchInterval = null;
    jQuery(reviews)
      .find(".reviews_sl_track")
      .on("touchstart", function (e) {
        touchStart = e.touches[0].pageX;
        touchStartY = e.touches[0].pageY;

        jQuery("html, body").css({ overflowY: "hidden" });
      });
    jQuery(reviews)
      .find(".reviews_sl_track")
      .on("touchend", function (e) {
        if (
          Math.abs(touchStart - touchEnd) - Math.abs(touchStartY - touchEndY) >
            10 &&
          // && touchInterval === null
          touchAccept
        ) {
          jQuery("html, body").css({ overflowY: "hidden" });
          touchAccept = false;

          var direction = touchStart - touchEnd > 0 ? "next" : "prev";

          var width = jQuery(reviews)
            .find(".reviews_sl_track .reviews_cont")
            .outerWidth();
          if (direction == "prev") width *= -1;

          // touchIntervalCount = 0;
          // touchInterval = setInterval(function(){
          //     if ( touchIntervalCount >= 40 ){
          //         touchIntervalCount = 0;

          //         clearInterval( touchInterval );
          //         touchInterval = null
          //     } else {
          //         reviewsScroll( width / 40 );
          //         touchIntervalCount++;
          //     }
          // }, 10);

          reviewsScroll(width, 400);

          touchStart = null;
          touchEnd = null;
          touchStartY = null;
          touchEndY = null;

          setTimeout(function () {
            jQuery("html, body").removeAttr("style");
            touchAccept = true;
          }, 400);
        } else jQuery("html, body").removeAttr("style");
      });
    jQuery(reviews)
      .find(".reviews_sl_track")
      .on("touchmove", function (e) {
        touchEnd = e.touches[0].pageX;
        touchEndY = e.touches[0].pageY;

        if (Math.abs(touchStartY - touchEndY) > 100)
          jQuery("html, body").removeAttr("style");
        else jQuery("html, body").css({ overflowY: "hidden" });
      });

    function reviewsScroll(plus, timeout, animate) {
      if (!timeout) timeout = 0;

      if (plus != 0) {
        var left = parseFloat(jQuery(".reviews_sl_track").css("left"));

        left -= plus;

        if (animate) {
          jQuery(reviews)
            .find(".reviews_sl_track")
            .animate({
              left: left + "px",
            });
        } else {
          jQuery(reviews)
            .find(".reviews_sl_track")
            .css({
              left: left + "px",
            });
        }
      }

      setTimeout(function () {
        jQuery(reviews)
          .find(".reviews_sl_track .reviews_cont")
          .each(function () {
            if (
              jQuery(this).offset().left > 0 &&
              jQuery(this).offset().left + jQuery(this).outerWidth() <
                jQuery(window).width()
            )
              jQuery(this).find(".reviews_block").addClass("active");
            else jQuery(this).find(".reviews_block").removeClass("active");

            if (
              jQuery(this).offset().left + jQuery(this).outerWidth() < 0 &&
              plus > 0
            ) {
              jQuery(this).appendTo(
                jQuery(this).parents(".reviews_sl_track").first()
              );

              var left = parseFloat(
                jQuery(".reviews_sl_track").css("margin-left")
              );

              left += jQuery(this).outerWidth();

              jQuery(".reviews_sl_track").css({
                marginLeft: left + "px",
              });
            } else if (
              jQuery(this).offset().left > jQuery(window).width() &&
              plus < 0
            ) {
              jQuery(this).prependTo(
                jQuery(this).parents(".reviews_sl_track").first()
              );

              var left = parseFloat(
                jQuery(".reviews_sl_track").css("margin-left")
              );

              left -= jQuery(this).outerWidth();

              jQuery(".reviews_sl_track").css({
                marginLeft: left + "px",
              });
            }
          });
      }, timeout);
    }

    if (jQuery(window).width() >= 1200) {
      var itemWidth = jQuery(reviews)
        .find(".reviews_sl_track .reviews_cont")
        .first()
        .outerWidth();
      var sectionWidth = jQuery(reviews)
        .find(".reviews_sl")
        .first()
        .outerWidth();
      var scaleLeft =
        (sectionWidth - itemWidth * Math.floor(sectionWidth / itemWidth)) / 2;
      reviewsScroll(scaleLeft);
    } else {
      var itemWidth = jQuery(reviews)
        .find(".reviews_sl_track .reviews_cont")
        .first()
        .outerWidth();
      reviewsScroll(itemWidth);
    }
  });

  jQuery("#more-reviews").on("click", function (event) {
    event.preventDefault();

    var comments = jQuery(".comments_block.no_v.d_n").slice(0, 6);

    comments.removeClass("d_n");
    setTimeout(function () {
      comments.removeClass("no_v");
    }, 100);

    if (jQuery(".comments_block.d_n").length < 1) {
      jQuery("#more-reviews").addClass("d_n");
      setTimeout(function () {
        jQuery("#more-reviews").addClass("no_v");
      }, 100);
    }
  });

  resizeFunction();
  jQuery(window).bind("resize", resizeFunction);

  scrollFunction();
  jQuery(window).bind("scroll", scrollFunction);
  jQuery("body, html").on("scroll", scrollFunction);
});

var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}
var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

var posSmoothScroll = 0;
function smoothScroll(target, speed, smooth) {
  if (target === document)
    target =
      document.scrollingElement ||
      document.documentElement ||
      document.body.parentNode ||
      document.body; // cross browser support for document scrolling

  var moving = false;
  posSmoothScroll = target.scrollTop;
  var frame =
    target === document.body && document.documentElement
      ? document.documentElement
      : target; // safari is the new IE

  target.addEventListener("mousewheel", scrolled, { passive: false });
  target.addEventListener("DOMMouseScroll", scrolled, { passive: false });

  function scrolled(e) {
    if (!jQuery("body").hasClass("on-scrollable")) {
      e.preventDefault(); // disable default scrolling

      var delta = normalizeWheelDelta(e);

      posSmoothScroll += -delta * speed;
      posSmoothScroll = Math.max(
        0,
        Math.min(posSmoothScroll, target.scrollHeight - frame.clientHeight)
      ); // limit scrolling

      if (!moving) update();
    }
  }

  function normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta)
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
      // Opera
      else return -e.detail / 3; // Firefox
    } else return e.wheelDelta / 120; // IE,Safari,Chrome
  }

  function update() {
    moving = true;

    var delta = (posSmoothScroll - target.scrollTop) / smooth;

    target.scrollTop += delta;

    if (Math.abs(delta) > 0.5) requestFrame(update);
    else moving = false;
  }

  var requestFrame = (function () {
    // requestAnimationFrame cross browser
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  })();
}

function resizeFunction() {
  var windowWidth = jQuery(window).width();
  var windowHeight = jQuery(window).height();

  if (windowWidth >= 1200) {
    jQuery(".strochka__main").append(jQuery(".strochka__main__img"));

    jQuery(".latest_news_block_cont").each(function () {
      jQuery(this)
        .find(".pod_zag")
        .first()
        .after(jQuery(this).find(".data").first());
    });

    jQuery(".str_strichka_sticky").css({ position: "absolute" });
    if (
      jQuery(".str_strichka__main__item").height() >
      jQuery(".custom-sticky-move").height()
    )
      jQuery(".str_strichka__main")
        .removeAttr("style")
        .css({ height: jQuery(".str_strichka__main__item").height() });
    jQuery(".str_strichka_sticky").css({ position: "relative" });

    jQuery(".title-mobile-top .latest_news_block").each(function () {
      jQuery(this)
        .find(".latest_news_block_cont")
        .first()
        .prepend(jQuery(this).find(".pod_zag ").first());
    });

    jQuery(".zaiavka_cont_main").each(function () {
      jQuery(this)
        .find(".zaiavka_cont_3")
        .first()
        .after(jQuery(this).find(".zaiavka_coun").first());
    });

    jQuery(".benefits_cont_title").each(function () {
      jQuery(this)
        .parents(".benefits")
        .first()
        .find(".benefits_cont_text")
        .first()
        .prepend(jQuery(this).first());
    });

    jQuery(".range_block").each(function () {
      jQuery(this)
        .find(".range_block_text > div")
        .first()
        .prepend(jQuery(this).find("h3").first());
      jQuery(this)
        .find(".range_block_text > div")
        .first()
        .prepend(jQuery(this).find(".fire").first());
    });

    jQuery(".courses_img_sl").before(jQuery(".courses_text"));

    jQuery(".tab_cont_text_img.right").each(function () {
      jQuery(this).prepend(jQuery(this).find(".tab_cont_img_img").first());
    });

    jQuery(".double_cont").each(function () {
      jQuery(this).prepend(jQuery(this).find(".double_block.img").first());
    });
  } else {
    jQuery(".strochka__main").prepend(jQuery(".strochka__main__img"));

    jQuery(".latest_news_block_cont").each(function () {
      jQuery(this).prepend(jQuery(this).find(".data").first());
    });

    jQuery(".title-mobile-top .latest_news_block").each(function () {
      jQuery(this).prepend(jQuery(this).find(".pod_zag ").first());
    });

    jQuery(".zaiavka_cont_main").each(function () {
      jQuery(this)
        .find(".zaiavka_cont_2")
        .first()
        .before(jQuery(this).find(".zaiavka_coun").first());
    });

    jQuery(".benefits_cont_title").each(function () {
      jQuery(this)
        .parents(".benefits")
        .first()
        .find(".benefits_cont")
        .first()
        .before(jQuery(this).first());
    });

    jQuery(".range_block").each(function () {
      jQuery(this).prepend(jQuery(this).find("h3").first());
      jQuery(this).prepend(jQuery(this).find(".fire").first());
    });

    jQuery(".courses_img_sl").prepend(jQuery(".courses_text"));

    jQuery(".tab_cont_text_img.right").each(function () {
      jQuery(this).append(jQuery(this).find(".tab_cont_img_img").first());
    });
    jQuery(".double_cont").each(function () {
      jQuery(this).append(jQuery(this).find(".double_block.img").first());
    });
  }
}

function changeSlideFace(index) {
  jQuery(".delivery_sl_block.active .delivery_sl_block_text").removeClass(
    "text_vis"
  );
  jQuery(
    '.delivery_sl_block[data-index="' + index + '"] .delivery_sl_block_text'
  ).addClass("text_vis");

  jQuery(".delivery_sl_block.active").removeClass("active");
  jQuery('.delivery_sl_block[data-index="' + index + '"]').addClass("active");

  jQuery(".delivery_sl_track").append(
    jQuery(".delivery_sl_block").slice(
      0,
      parseInt(jQuery(".delivery_sl_block.active").first().attr("data-pos")) - 1
    )
  );

  jQuery(".delivery_sl_block").each(function (i) {
    var pos = i + 1;
    if (pos > 6) pos = 6;

    if (i <= 4) jQuery(this).addClass("anime");
    else jQuery(this).removeClass("anime");

    jQuery(this)
      .removeClass("pos_1")
      .removeClass("pos_2")
      .removeClass("pos_3")
      .removeClass("pos_4")
      .removeClass("pos_5")
      .removeClass("pos_6")
      .removeClass("pos_last")
      .addClass("pos_" + pos);

    if (i == jQuery(".delivery_sl_block").length - 1)
      jQuery(this).addClass("pos_last");

    jQuery(this).attr("data-pos", i + 1);
  });

  jQuery("#current-faceslider-index").html(index);
}

function recountOrder(parent) {
  if (!parent) parent = jQuery("body");

  var service = jQuery("#order-service .vipod_hide p.selected").attr(
    "data-value"
  );
  var persons = parseInt(jQuery("#persons-count").val());

  var orderDetails = {
    service: jQuery("#order-service .vipod_hide p.selected").html(),
    persons_count: persons,
    selected: [],
    fullPrice: 0,
  };

  if (service && persons) {
    parent.find(".sotu_max").addClass("required");

    parent
      .find(".sotu_normal.required:not(.activated)")
      .removeClass("required");

    parent
      .find(
        ".sotu_max.required, .sotu_normal.required, .sotu_max.activated, .sotu_normal.activated"
      )
      .each(function () {
        var requireds = (jQuery(this).attr("data-requireds") || "").split(",");
        for (var i in requireds)
          jQuery("#sotu-" + requireds[i]).addClass("required");
      });

    var fullPrice = 0;
    parent
      .find(
        ".sotu_max.required, .sotu_normal.required, .sotu_max.activated, .sotu_normal.activated"
      )
      .each(function () {
        var price = parseFloat(
          jQuery(this).attr("data-" + service + "-price") ||
            jQuery(this).attr("data-s-price")
        );

        if (jQuery(this).attr("data-price-per-person")) price *= persons;

        fullPrice += price;

        orderDetails.selected.push(jQuery(this).find("p").html());
      });

    setPrice(fullPrice);

    orderDetails.fullPrice = formatePrice(fullPrice) + "грн.";
    jQuery("#order-details").val(JSON.stringify(orderDetails));
  } else {
    parent
      .find(".sotu_max, .sotu_normal")
      .removeClass("activated")
      .removeClass("required");
    setPrice(0);

    jQuery("#order-details").val("");
  }
}

function setPrice(fullPrice) {
  var oldPrice = parseFloat(jQuery("#full-price").attr("data-price"));
  jQuery("#full-price").attr("data-price", fullPrice);

  var delta = (fullPrice - oldPrice) / 20;
  var i = 0;
  var priceAnimation = setInterval(function () {
    if (i >= 20) {
      clearInterval(priceAnimation);
      jQuery("#full-price").html(formatePrice(fullPrice));
    } else {
      jQuery("#full-price").html(formatePrice(oldPrice + delta * i));
      i++;
    }
  }, 50);
}

function formatePrice(price) {
  price = price.toString();

  var formatedPrice = [];
  while (price) {
    formatedPrice.unshift(price.slice(-3));
    price = price.slice(0, -3);
  }
  formatedPrice = formatedPrice.join(" ");

  return formatedPrice;
}

// Start Slider

var acceptSlide = 1;

function changeSlide(slider, direction) {
  if (!acceptSlide) return null;
  acceptSlide = 0;

  if (direction == "next") {
    slider
      .find(".reviews_block.active")
      .first()
      .removeClass("active")
      .addClass("prev");
    slider
      .find(".reviews_block.min")
      .first()
      .removeClass("min")
      .addClass("active");
    slider
      .find(".reviews_block.next")
      .first()
      .removeClass("next")
      .addClass("min");

    var clone = slider.find(".reviews_block").first();
    clone.removeClass("prev").addClass("next");
    slider.find(".reviews_track").append(clone);
  } else if (direction == "prev") {
    slider
      .find(".reviews_block.min")
      .first()
      .removeClass("min")
      .addClass("next");
    slider
      .find(".reviews_block.active")
      .first()
      .removeClass("active")
      .addClass("min");
    slider
      .find(".reviews_block.prev")
      .first()
      .removeClass("prev")
      .addClass("active");

    var clone = slider.find(".reviews_block").last();
    clone.removeClass("next").addClass("prev");
    slider.find(".reviews_track").prepend(clone);
  }

  setTimeout(function () {
    repositionateArrows(slider);

    acceptSlide = 1;
  }, 400);
}

function repositionateArrows(slider) {
  if (jQuery(window).width() >= 1200) {
    slider.find(".arr_l").css({
      left:
        slider.find(".reviews_block.active").offset().left -
        slider.offset().left -
        64 +
        "px",
    });

    slider.find(".arr_r").css({
      left:
        slider.find(".reviews_block.active").offset().left +
        slider.find(".reviews_block.active").width() -
        slider.offset().left +
        16 +
        "px",
    });
  }
}
//  paralax__mouse

// $(function(){
//     var parent = document.getElementsByTagName('body')[0];
//     var items1 = document.getElementsByClassName('item1');
//     var items2 = document.getElementsByClassName('item2');
//     var center = {
//       x: parent.offsetWidth / 2,
//       y: parent.offsetHeight / 2
//     }
//     parent.onmousemove = function(event) {

//       for (var i = 0; i < items1.length; i++) {
//         items1[i].setAttribute('style', 'transform: translate3d(' +
//           Math.round((center.x - event.pageX)/60) +'px, ' +
//           Math.round((center.y - event.pageY)/60) + 'px, 0);');
//       }

//       for (var i = 0; i < items2.length; i++) {
//         items2[i].setAttribute('style', 'transform: translate3d(' +
//           Math.round((center.x - event.pageX)/180) +'px, ' +
//           Math.round((center.y - event.pageY)/180) + 'px, 0);');
//       }
//     }
//   });

//  paralax__mouse

// $(function(){

//     $(".box").inertiaScroll({
//       parent: $("#content")
//     });

//     $(".box").each(function(){
//       var speed = $(this).data("speed");
//       var height = $(this).height() + "px";
//       $(this).css("line-height",height).text(speed);
//     });

//   });

// Finnish Slider

// $(function() {
//     var parent = document.getElementsByTagName('body')[0];
//     var items = document.getElementsByClassName('item');
//     var center = {
//         x: parent.offsetWidth / 2,
//         y: parent.offsetHeight / 2
//     }
//     parent.onmousemove = function(event) {

//         for (var i = 0; i < items.length; i++) {
//             items[i].setAttribute('style', 'transform: translate3d(' +
//                 Math.round((center.x - event.pageX) / 10) + 'px, ' +
//                 Math.round((center.y - event.pageY) / 10) + 'px, 0);');
//         }
//     }
// });

function animateAttributesByScroll(matches, c) {
  matches = matches.slice(1, -1).split(",");

  if (matches.length == 1) return matches[0];
  else {
    var from = parseFloat(matches[0]);
    var to = parseFloat(matches[1]);

    var value = from + (to - from) * (1 - c);

    return value;
  }
}

var scene = document.getElementById("scene");
// var parallaxInstance = new Parallax(scene);

var courses_1 = false;
var courses_2 = false;
var benefits = false;
var school = false;
var share_block = false;
var argument = false;
var ic_info = false;
var numb = false;
var all_soc = false;
var double_grup_1 = false;
var double_grup_2 = false;

var startScrollTop = 0;
var startScrollInterval = null;
function scrollFunction() {
  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;
  var scrollTop = $(window).scrollTop();

  jQuery(".courses_img_sl_track").each(function () {
    var topLimit = parseFloat(
      jQuery(".courses_img_sl_block").first().css("top")
    );
    var bottomLimit =
      parseFloat(jQuery(".courses_img_sl_block").first().outerHeight()) +
      parseFloat(jQuery(".courses_block_2").css("margin-top"));

    jQuery(".courses_img_sl_block")
      .removeClass("end")
      .each(function (is) {
        var currentTop = jQuery(this).offset().top - scrollTop - topLimit;

        var c = parseFloat(currentTop / bottomLimit);
        if (c < 0) c = 0;
        else if (c > 1) c = 1;

        jQuery(this)
          .find(".courses_img_sl_block_bg")
          .css({
            background:
              "linear-gradient(0deg, #e2eafe " +
              50 * c +
              "%, transparent " +
              100 * c +
              "%)",
          });

        if (c == 0 || is == 0) {
          jQuery(this).addClass("active");

          jQuery("#home-course-active-link").attr(
            "data-service_title",
            jQuery.trim(
              jQuery(this)
                .find(".courses_block_min h2")
                .html()
                .replace(/[\r\n\t]|\<[^\>]+\>/g, "")
            )
          );
        } else jQuery(this).removeClass("active");

        if (c < 0.5 || is == 0) jQuery(this).addClass("preactive");
        else jQuery(this).removeClass("preactive");
      });

    jQuery(".courses_img_sl_block.preactive")
      .slice(0, -1)
      .removeClass("active")
      .addClass("end");
  });

  jQuery(".exams_img_sl_track").each(function () {
    var topLimit = parseFloat(jQuery(".exams_img_sl_block").first().css("top"));
    var bottomLimit =
      parseFloat(jQuery(".exams_img_sl_block").first().outerHeight()) +
      parseFloat(jQuery(".exams_block_2").css("margin-top"));

    jQuery(".exams_img_sl_block").each(function (is) {
      var currentTop = jQuery(this).offset().top - scrollTop - topLimit;

      var c = parseFloat(currentTop / bottomLimit);
      if (c < 0 || is == 0) c = 0;
      else if (c > 1) c = 1;

      var transform = jQuery(this)
        .attr("data-transform")
        .replace(/\{[^\}]+\}/g, function (matches) {
          return animateAttributesByScroll(matches, c);
        });
      var background = jQuery(this)
        .attr("data-background")
        .replace(/\{[^\}]+\}/g, function (matches) {
          return animateAttributesByScroll(matches, c);
        });
      var color = jQuery(this)
        .attr("data-color")
        .replace(/\{[^\}]+\}/g, function (matches) {
          return animateAttributesByScroll(matches, c);
        });
      var opacity = jQuery(this)
        .attr("data-opacity")
        .replace(/\{[^\}]+\}/g, function (matches) {
          return animateAttributesByScroll(matches, c);
        });
      jQuery(this).css({
        transform: transform,
        // background: background,
        // color: color,
        opacity: opacity,
      });

      jQuery(this).removeClass("end");

      if (c < 0.05 || is == 0) {
        jQuery(this).addClass("active");

        jQuery("#home-exam-active-link").attr(
          "data-service_title",
          jQuery.trim(
            jQuery(this)
              .find(".exams_img_sl_block_text h3")
              .html()
              .replace(/[\r\n\t]|\<[^\>]+\>/g, "")
          )
        );
      } else jQuery(this).removeClass("active");
    });

    jQuery(".exams_img_sl_block.active")
      .slice(0, -1)
      .removeClass("active")
      .addClass("end");
  });

  // spane

  if (windowWidth >= 1200) {
    jQuery("#first-parallax-bottom").each(function () {
      var firstParallaxHeight = parseFloat(
        jQuery("#first-parallax").attr("data-height")
      );

      var topLimit = 30;
      var bottomLimit =
        parseFloat(jQuery("#first-parallax").attr("data-top")) -
        firstParallaxHeight / 4;

      var minus = (scrollTop - topLimit) / bottomLimit;

      if (minus > 1) minus = 1;
      else if (minus < 0) minus = 0;

      var top = firstParallaxHeight - firstParallaxHeight * minus;

      jQuery(this).css({
        transform: "translateY(" + top + "px)",
      });
    });
    jQuery(".roks-bottom").each(function () {
      var roksHeight = parseFloat(jQuery("#roks").attr("data-height"));

      var topLimit = parseFloat(jQuery("#roks").attr("data-top"));
      var bottomLimit =
        parseFloat(jQuery("#roks").attr("data-height")) - windowHeight / 4;

      var minus = (scrollTop - topLimit) / bottomLimit;

      if (minus > 1) minus = 1;
      else if (minus < 0) minus = 0;

      var top = roksHeight - roksHeight * minus;

      jQuery(this).css({
        transform: "translateY(" + top + "px)",
      });
    });
    jQuery("#footer").each(function () {
      var footerHeight = parseFloat(jQuery("#footer").attr("data-height")) / 2;

      var topLimit = parseFloat(jQuery(this).attr("data-top")) - windowHeight;

      var minus = (scrollTop - topLimit) / footerHeight;

      if (minus > 1) minus = 1;
      else if (minus < 0) minus = 0;

      var top = footerHeight * minus * -1;

      jQuery(this).css({
        transform: "translateY(" + top + "px)",
      });

      jQuery(".top_menu, main").css({
        filter: "brightness(" + (1 - (minus / 5) * 3) + ")",
      });
    });
  } else {
    jQuery(".header .header_img img").each(function () {
      var topLimit = 0;
      var bottomLimit = windowHeight / 4;

      var minus = (scrollTop - topLimit) / bottomLimit;

      if (minus > 1) minus = 1;
      else if (minus < 0) minus = 0;

      minus *= 0.3;

      jQuery(this).css({
        transform: "scale(" + (1.3 - minus) + ")",
      });
    });

    jQuery("#first-parallax").each(function () {
      var firstParallaxHeight = parseFloat(jQuery(this).attr("data-height"));

      var topLimit = 30;
      var bottomLimit =
        parseFloat(jQuery(this).attr("data-top")) - firstParallaxHeight / 8;

      var minus = 1 - (scrollTop - topLimit) / bottomLimit;

      if (minus > 1) minus = 1;
      else if (minus < 0) minus = 0;

      var height = firstParallaxHeight * minus;

      jQuery(this).css({
        height: height + "px",
      });
    });
  }

  setTimeout(function () {
    jQuery(".lottie.loaded-animation").each(function (i, span) {
      if (jQuery(span).hasClass("onscroll")) {
        var anim = jQuery(span).data("anim");

        var delay = parseInt(jQuery(span).attr("data-delay"));
        if (!delay) delay = 0;

        if (getIsVisible(span) && !jQuery(span).data("played-onscroll")) {
          setTimeout(function () {
            if (jQuery(span).hasClass("start-on-last-frame"))
              anim.goToAndPlay(anim.getDuration(true), true);
            else anim.goToAndPlay(0);
          }, delay);

          jQuery(span).data("played-onscroll", true);

          jQuery(anim).on("complete", function () {
            if (jQuery(span).hasClass("stop-on-last-frame"))
              anim.goToAndStop(anim.getDuration(true), true);
            else anim.goToAndStop(0);
          });
        }
      }
    });
  }, 10);

  // spane

  if ($(".courses_1").length) {
    var offsetTop =
      $(".courses_1").offset().top +
      (windowWidth >= 1200 ? 500 : 100) -
      windowHeight;
    if (scrollTop >= offsetTop && !courses_1) {
      $(".courses_block_1").addClass("anime");
      setTimeout(function () {
        $(".courses_text_block p").addClass("anime");
      }, 400);
      setTimeout(function () {
        $(".courses_block_2").addClass("anime");
      }, 500);
      setTimeout(function () {
        $(".courses_block_3").addClass("anime");
      }, 600);
      setTimeout(function () {
        $(".courses_block_4").addClass("anime");
      }, 700);
      setTimeout(function () {
        $(".courses_block_5").addClass("anime");
        $(".courses_text_botton").addClass("anime");
      }, 800);
      setTimeout(function () {
        $(".courses_block_6").addClass("anime");
      }, 900);
      setTimeout(function () {
        $(".courses_block_7").addClass("anime");
      }, 100);
      setTimeout(function () {
        $(".courses_block_8").addClass("anime");
      }, 1100);

      courses_1 = true;
    }
  }

  if ($(".courses_2").length) {
    var offsetTop =
      $(".courses_2").offset().top +
      (windowWidth >= 1200 ? 500 : 100) -
      windowHeight;
    if (scrollTop >= offsetTop && !courses_2) {
      setTimeout(function () {
        $(".exams_text_block p").addClass("anime");
      }, 400);
      $(".exams_block_1").addClass("anime");
      setTimeout(function () {
        $(".exams_block_2").addClass("anime");
      }, 500);
      setTimeout(function () {
        $(".exams_block_3").addClass("anime");
      }, 600);
      setTimeout(function () {
        $(".exams_block_4").addClass("anime");
      }, 700);
      setTimeout(function () {
        $(".exams_block_5").addClass("anime");
        $(".exams_text_botton").addClass("anime");
      }, 800);
      setTimeout(function () {
        $(".exams_block_6").addClass("anime");
      }, 900);
      setTimeout(function () {
        $(".exams_block_7").addClass("anime");
      }, 1000);
      setTimeout(function () {
        $(".exams_block_8").addClass("anime");
      }, 1100);

      courses_2 = true;
    }
  }

  if ($("#benefits").length) {
    var offsetTop =
      $("#benefits").offset().top +
      (windowWidth >= 1200 ? 500 : 100) -
      windowHeight;
    if (scrollTop >= offsetTop && !benefits) {
      $(".benefits_1").addClass("anime");
      setTimeout(function () {
        $(".benefits_2").addClass("anime");
      }, 200);
      setTimeout(function () {
        $(".benefits_3").addClass("anime");
      }, 400);
      setTimeout(function () {
        $(".ic_1").addClass("anime");
      }, 500);
      setTimeout(function () {
        $(".benefits_4").addClass("anime");
        $(".ic_2").addClass("anime");
      }, 600);
      setTimeout(function () {
        $(".ic_3").addClass("anime");
      }, 700);
      setTimeout(function () {
        $(".benefits_5").addClass("anime");
        $(".ic_4").addClass("anime");
      }, 800);
      setTimeout(function () {
        $(".ic_5").addClass("anime");
      }, 900);
      setTimeout(function () {
        $(".benefits_6").addClass("anime");
        $(".ic_6").addClass("anime");
      }, 1000);

      benefits = true;
    }
  }

  if ($("#school").length) {
    var offsetTop =
      $("#school").offset().top +
      (windowWidth >= 1200 ? 500 : 100) -
      windowHeight;
    if (scrollTop >= offsetTop && !school) {
      $(".school").addClass("anime");

      school = true;
    }
  }
  if ($(".share-block").length) {
    var offsetTop =
      $(".share-block").offset().top +
      (windowWidth >= 1200 ? 500 : 100) -
      windowHeight;
    if (scrollTop >= offsetTop && !share_block) {
      $(".share-block").addClass("anime");

      share_block = true;
    }
  }
  if ($(".all_soc").length) {
    var offsetTop =
      $(".all_soc").offset().top +
      (windowWidth >= 1200 ? 100 : 100) -
      windowHeight;
    if (scrollTop >= offsetTop && !all_soc) {
      $(".all_soc").addClass("anime");

      all_soc = true;
    }
  }

  if ($(".ic_info").length) {
    var offsetTop =
      $(".ic_info").offset().top +
      (windowWidth >= 1200 ? 100 : 100) -
      windowHeight;
    if (scrollTop >= offsetTop && !ic_info) {
      $(".ic_info_block_1").addClass("anime");
      $(".ic_1").addClass("anime");
      $(".ic_5").addClass("anime");
      $(".ic_11").addClass("anime");
      $(".ic_15").addClass("anime");
      setTimeout(function () {
        $(".ic_info_block_2").addClass("anime");
        $(".ic_2").addClass("anime");
        $(".ic_7").addClass("anime");
        $(".ic_12").addClass("anime");
      }, 200);
      setTimeout(function () {
        $(".ic_info_block_3").addClass("anime");
        $(".ic_3").addClass("anime");
        $(".ic_7").addClass("anime");
        $(".ic_9").addClass("anime");
        $(".ic_13").addClass("anime");
        $(".ic_16").addClass("anime");
      }, 400);
      setTimeout(function () {
        $(".ic_info_block_4").addClass("anime");
        $(".ic_4").addClass("anime");
        $(".ic_8").addClass("anime");
        $(".ic_10").addClass("anime");
        $(".ic_14").addClass("anime");
        $(".ic_17").addClass("anime");
      }, 600);

      ic_info = true;
    }
  }

  if ($(".numb").length) {
    var offsetTop =
      $(".numb").offset().top +
      (windowWidth >= 1200 ? 100 : 100) -
      windowHeight;
    if (scrollTop >= offsetTop && !numb) {
      $(".numb_1").addClass("anime");
      setTimeout(function () {
        $(".numb_2").addClass("anime");
      }, 200);
      setTimeout(function () {
        $(".numb_3").addClass("anime");
      }, 400);
      setTimeout(function () {
        $(".numb_4").addClass("anime");
      }, 600);
      setTimeout(function () {
        $(".numb_5").addClass("anime");
      }, 800);

      numb = true;
    }
  }

  if ($("#argument").length) {
    var offsetTop =
      $("#argument").offset().top +
      (windowWidth >= 1200 ? 500 : 100) -
      windowHeight;
    if (scrollTop >= offsetTop && !argument) {
      $(".argument_1").addClass("anime");
      $(".ic_1").addClass("anime");
      setTimeout(function () {
        $(".argument_2").addClass("anime");
        $(".ic_2").addClass("anime");
      }, 300);
      setTimeout(function () {
        $(".argument_3").addClass("anime");
        $(".ic_3").addClass("anime");
      }, 600);

      exams = true;
    }
  }

  if ($(".double_grup_1").length) {
    var offsetTop =
      $(".double_grup_1").offset().top +
      (windowWidth >= 1200 ? 200 : 100) -
      windowHeight;
    if (scrollTop >= offsetTop && !double_grup_1) {
      $(".double_grup_1_2").addClass("anime");
      setTimeout(function () {
        $(".double_grup_1_3").addClass("anime");
      }, 1500);
      setTimeout(function () {
        $(".double_grup_1_1").addClass("anime");
        $(".double_grup_s1").addClass("mask_black");
      }, 3000);

      double_grup_1 = true;
    }
  }

  if ($(".double_grup_2").length) {
    var offsetTop =
      $(".double_grup_2").offset().top +
      (windowWidth >= 1200 ? 200 : 100) -
      windowHeight;
    if (scrollTop >= offsetTop && !double_grup_2) {
      $(".double_grup_2_2").addClass("anime");
      setTimeout(function () {
        $(".double_grup_2_4").addClass("anime");
      }, 1500);
      setTimeout(function () {
        $(".double_grup_2_3").addClass("anime");
      }, 3000);
      setTimeout(function () {
        $(".double_grup_2_1").addClass("anime");
        $(".double_grup_s2").addClass("mask_black");
      }, 4500);

      double_grup_2 = true;
    }
  }

  jQuery(".h2_anime:not(.scrolled)").each(function () {
    var top = jQuery(this).offset().top;
    if (top < scrollTop + windowHeight - (windowWidth >= 1200 ? 0 : 100))
      jQuery(this).addClass("scrolled");
  });
  jQuery(".h2_amine_v2:not(.scrolled)").each(function () {
    var top = jQuery(this).offset().top;
    if (top < scrollTop + windowHeight - (windowWidth >= 1200 ? 0 : 100))
      jQuery(this).addClass("scrolled");
  });
  jQuery(".mask_img:not(.scrolled)").each(function () {
    var top = jQuery(this).offset().top;
    if (top < scrollTop + windowHeight - (windowWidth >= 1200 ? 0 : 100))
      jQuery(this).addClass("scrolled");
  });

  jQuery(".lazy-iframe").each(function () {
    if (getIsVisible(this)) lazyFrames(this);
  });

  jQuery("img.lazy-image").each(function () {
    if (getIsVisible(this)) lazyImage(this);
  });

  if (
    jQuery(window).scrollTop() >
    (windowWidth < 1200 || jQuery("body").hasClass("home-body") ? 50 : 50)
  ) {
    jQuery(".top_menu").addClass("scrolling");

    if (
      scrollTop < previousScrollTop &&
      !(
        jQuery("#courses").length &&
        scrollTop >= jQuery("#courses").offset().top &&
        scrollTop <=
          jQuery("#exams").offset().top + jQuery("#exams").outerHeight()
      ) &&
      !(
        jQuery(".course-tabs").length &&
        scrollTop >= jQuery(".course-tabs").offset().top &&
        scrollTop <=
          jQuery(".course-tabs").offset().top +
            jQuery(".course-tabs").outerHeight() +
            64
      ) &&
      scrollTop <
        jQuery("footer").offset().top - jQuery(".top_menu").outerHeight()
    ) {
      setTimeout(function () {
        if (
          jQuery(window).scrollTop() >
          (windowWidth < 1200 || jQuery("body").hasClass("home-body")
            ? 50
            : 200)
        )
          jQuery(".top_menu").addClass("prescrolled").addClass("scrolled");
      }, 400);
    } else {
      jQuery(".top_menu").removeClass("scrolled");
    }
  } else {
    jQuery(".top_menu")
      .removeClass("scrolled")
      .removeClass("prescrolled")
      .removeClass("scrolling")
      .removeClass("scrolled");
  }
  previousScrollTop = scrollTop;
}
var previousScrollTop = 0;

function lazyImage(image) {
  if (jQuery(image).attr("data-src"))
    jQuery(image).attr("src", jQuery(image).attr("data-src"));
  jQuery(image).removeClass("lazy-image").removeClass("lazy-preload");
  jQuery(image).removeAttr("data-src");
}

function lazyFrames(span) {
  var iframe = document.createElement("iframe");

  var id = jQuery(span).attr("data-id");
  if (id) jQuery(iframe).attr("id", id);

  var classAttr = jQuery(span).attr("data-class");
  if (classAttr) jQuery(iframe).attr("class", classAttr);

  jQuery(iframe).addClass("loaded-lazy-iframe");

  var src = jQuery(span).attr("data-src");
  if (src) {
    if (jQuery(span).hasClass("permanent")) {
      jQuery(iframe).attr("src", src);
      jQuery(iframe).addClass("permanent");
    } else {
      jQuery(iframe).attr("data-src", src);
      jQuery(iframe).attr("src", "");
      jQuery(iframe).removeClass("permanent");
    }
  }

  setTimeout(function () {
    getLazyFrameParent("iframe.loaded-lazy-iframe[data-src]")
      .off("mouseover")
      .on("mouseover", function (event) {
        event.preventDefault();

        jQuery(this).addClass("lf-hovered");

        var iframe = jQuery(this).find("iframe");
        if (!iframe.hasClass("permanent") && !iframe.attr("src")) {
          var src = iframe.attr("data-src");

          iframe.attr("src", "");
          iframe.attr("src", src);

          iframe.off("load").on("load", function () {
            var self = getLazyFrameParent(this);
            if (jQuery(self).hasClass("lf-hovered"))
              iframe.parent().addClass("no-background");
          });
        }
      });
    getLazyFrameParent("iframe.loaded-lazy-iframe[data-src]")
      .off("mouseout mouseleave")
      .on("mouseout mouseleave", function (event) {
        event.preventDefault();

        var iframe = jQuery(this).find("iframe");
        if (!iframe.hasClass("permanent")) {
          iframe.attr("src", "");
          iframe.parent().removeClass("no-background");
        }

        jQuery(this).removeClass("lf-hovered");
      });
  }, 200);

  jQuery(span).after(iframe);
  jQuery(span).remove();
}

function getLazyFrameParent(selector) {
  var parents = jQuery([]);

  jQuery(selector).each(function () {
    var parent = jQuery(this).parents(".lazy-frame-parent").first();
    if (!parent.get(0)) parent = jQuery(this).parent();

    parents.push(parent.get(0));
  });

  return parents;
}

// ======>

function getIsVisible(node) {
  var element = node;

  var windowLeft = 0;
  var windowRight = window.innerWidth;
  var windowTop = jQuery(window).scrollTop();
  var windowBottom = windowTop + window.innerHeight;

  var elementLeft = jQuery(element).offset().left + 32;
  var elementTop = jQuery(element).offset().top + 32;
  var elementRight = elementLeft + jQuery(element).width() - 32;
  var elementBottom = elementTop + jQuery(element).height() - 32;

  var hidden =
    elementBottom < windowTop ||
    elementTop > windowBottom ||
    elementLeft > windowRight ||
    elementRight < windowLeft;

  if (!hidden) {
    while (element && element != document) {
      if (
        jQuery(element).css("display") == "none" ||
        jQuery(element).css("opacity") == 0 ||
        jQuery(element).css("visibility") == "hidden"
      ) {
        hidden = true;
        break;
      }

      element = element.parentNode;
    }
  }

  return !hidden;
}

// ======>

/* popup start */

jQuery(function () {
  jQuery(".show-popup")
    .filter(function () {
      return this.tagName != "A";
    })
    .on("click", showPopup);

  jQuery(".pop_up .exit:not(.exit_b), .close-popup-ok").on("click", hidePopup);
  jQuery(".bg_pop_up").on("click", function () {
    if (!jQuery(this).hasClass("popup-hovered")) hidePopup();
  });

  jQuery(".pop_up").hover(
    function () {
      jQuery(".bg_pop_up").addClass("popup-hovered");
    },
    function () {
      jQuery(".bg_pop_up").removeClass("popup-hovered");
    }
  );

  jQuery(".textarea_block textarea").on("keyup change", function () {
    if (jQuery.trim(jQuery(this).val())) jQuery(this).addClass("filled");
    else jQuery(this).removeClass("filled");
  });

  loadPopupOnLoad();

  jQuery(window).on("popstate", function () {
    setTimeout(function () {
      var status = isPopupHref(location.href.split("#")[1]).status;

      if (status) loadPopupOnLoad();
      else hidePopup();

      var href = location.href;
      var tab = jQuery('.tab-button[data-url="' + href + '"]').get(0);
      if (tab) {
        var section = jQuery(tab).parents(".tabs-section").get(0);
        var index = parseInt(jQuery(tab).attr("data-index"));

        jQuery(section).find(".tab-button").removeClass("active");
        jQuery(tab).addClass("active");

        jQuery(section).find(".tab-content").removeClass("active");
        jQuery(section)
          .find(".tab-content[data-index=" + index + "]")
          .addClass("active");
      }
    }, 10);
  });

  //   jQuery(".phone_numb").mask("+91 (099) 999 99 99");
  jQuery(".date-input").mask("99.99.9999");

  jQuery(".request-form, .popup form").on("submit", function (event) {
    event.preventDefault();

    if (allowRequest) {
      allowRequest = 0;

      var form = this;
      if (formValidation(jQuery(form), true)) {
        var data = new FormData(form);
        data.append("langcode", jQuery("#langcode").val());

        jQuery(".request-form, .popup form")
          .find("button")
          .prop("disabled", true);

        jQuery.ajax({
          url: "/wp-admin/admin-ajax.php",
          data: data,
          type: "POST",
          processData: false,
          contentType: false,
          dataType: "json",
          success: function (data) {
            jQuery(".request-form, .popup form")
              .find("button")
              .prop("disabled", false);
            allowRequest = 1;

            console.log(data);
            if (data) {
              if (data.message)
                jQuery(form).find(".form-info").html(data.message);
              if (data.status) {
                showPopup(event, jQuery("#thanks-link").get(0), "thakns_1");
                history.pushState({}, "", "#thanks");

                ga("send", "Form", "otpravka");

                // gtag('event', 'conversion', {'send_to': 'AW-315989192/xinlCJDR46AYEMi51pYB'});
              }
            }
          },
        });
      }
    }
  });

  jQuery(".subscribe-form").on("submit", function (event) {
    event.preventDefault();

    if (allowRequest) {
      allowRequest = 0;

      var form = this;
      if (formValidation(jQuery(form), true)) {
        var data = new FormData(form);
        data.append("langcode", jQuery("#langcode").val());

        jQuery.ajax({
          url: "/wp-admin/admin-ajax.php",
          data: data,
          type: "POST",
          processData: false,
          contentType: false,
          dataType: "json",
          success: function (data) {
            console.log(data);
            if (data) {
              if (data.message)
                jQuery(form).find(".form-info").html(data.message);
              if (data.status) {
                showPopup(
                  event,
                  jQuery("#thanks-subscribe").get(0),
                  "thanks-subscribe"
                );
                history.pushState({}, "", "#thanks-subscribe");
              }

              allowRequest = 1;
            }
          },
        });
      }
    }
  });

  jQuery(".input_required").bind("focus", function () {
    jQuery(this).addClass("focused");
  });
  jQuery(".input_required").on("blur", function () {
    formValidation(jQuery(this).parents("form").first());
  });
});
var allowRequest = 1;

function loadPopupOnLoad() {
  var locations = location.href.split("#");
  var popupHref = isPopupHref(locations[1]);
  if (popupHref.status) showPopup(event, popupHref.linkNode);

  jQuery(".lottie:not(.loaded-animation)").each(function (i, span) {
    var data = jQuery.trim(jQuery(span).attr("data-animation"));

    try {
      if (data && (data[0] == "[" || data[0] == "{")) {
        var autoplay =
          jQuery(span).hasClass("onhover") ||
          jQuery(span).hasClass("onclick") ||
          jQuery(span).hasClass("onscroll")
            ? false
            : true;

        var anim = lottie.loadAnimation({
          container: span,
          renderer: "svg",
          loop: autoplay,
          autoplay: autoplay,
          animationData: JSON.parse(data),
        });
        jQuery(span).data("anim", anim);

        if (jQuery(span).hasClass("onhover")) {
          var node = jQuery(span).parents(".lazy-frame-parent").length
            ? jQuery(span).parents(".lazy-frame-parent").first()
            : jQuery(span);

          if (jQuery(span).attr("data-sibling")) {
            jQuery(
              '[data-lottie-sibling="' +
                jQuery(span).attr("data-sibling") +
                '"]'
            ).each(function () {
              node = node.add(this);
            });
          }

          node.hover(
            function () {
              if (
                !jQuery(span).hasClass("hovered") &&
                !jQuery(span).hasClass("prevented-animation")
              ) {
                if (jQuery(span).hasClass("once-play"))
                  jQuery(span).addClass("prevented-animation");

                var segments = jQuery(span).attr("data-hover-segments");
                if (segments) {
                  segments = segments.split(",");

                  var start = parseFloat(segments[0]);
                  var end = parseFloat(segments[1]);

                  if (start == anim.currentFrame) {
                    anim.setDirection(1);
                    anim.goToAndPlay(start, true);
                    anim.onEnterFrame = function (event) {
                      if (event.currentTime >= end) {
                        anim.onEnterFrame = null;
                        anim.goToAndStop(end, true);
                      }
                    };
                  }
                } else {
                  if (jQuery(span).hasClass("start-on-last-frame"))
                    anim.goToAndPlay(animGetEnd(anim), true);
                  else anim.goToAndPlay(animGetStart(anim), true);

                  jQuery(anim)
                    .off("complete")
                    .on("complete", function () {
                      if (
                        jQuery(span).hasClass("hovered") &&
                        !jQuery(span).hasClass("once-onhover")
                      ) {
                        if (jQuery(span).hasClass("start-on-last-frame"))
                          anim.goToAndPlay(anim.getDuration(true), true);
                        else anim.goToAndPlay(0, true);
                      }
                    });
                }

                jQuery(span).addClass("no-background").addClass("hovered");
              }
            },
            function () {
              var segments = jQuery(span).attr("data-hover-segments");
              if (segments) {
                lottieGoToAndPlay(anim, function () {
                  segments = segments.split(",");

                  var start = parseFloat(segments[0]);
                  var end = parseFloat(segments[1]);

                  if (end == anim.currentFrame) {
                    anim.setDirection(-1);
                    anim.goToAndPlay(end, true);
                    anim.onEnterFrame = function (event) {
                      if (event.currentTime <= start) {
                        anim.onEnterFrame = null;
                        anim.setDirection(1);
                        anim.goToAndStop(start, true);
                      }
                    };
                  }
                });
              } else {
                if (jQuery(span).hasClass("fullplay")) {
                  jQuery(anim).on("complete", function () {
                    if (jQuery(span).hasClass("stop-on-last-frame"))
                      anim.goToAndStop(anim.getDuration(true), true);
                    else anim.goToAndStop(0, true);
                  });
                } else {
                  if (jQuery(span).hasClass("stop-on-last-frame"))
                    anim.goToAndStop(animGetEnd(anim), true);
                  else anim.goToAndStop(0, true);
                }
              }

              jQuery(span).removeClass("no-background").removeClass("hovered");
            }
          );
        }

        if (jQuery(span).hasClass("onclick")) {
          var node = jQuery(span).parents(".lazy-frame-parent").length
            ? jQuery(span).parents(".lazy-frame-parent").first()
            : jQuery(span);

          if (jQuery(span).attr("data-sibling")) {
            jQuery(
              '[data-lottie-sibling="' +
                jQuery(span).attr("data-sibling") +
                '"]'
            ).each(function () {
              node = node.add(this);
            });
          }

          node.on("click", function () {
            lottieGoToAndPlay(anim, function () {
              if (!jQuery(span).hasClass("playing")) {
                jQuery(span).addClass("playing").toggleClass("toggle-clicked");

                if (
                  jQuery(span).hasClass("toggle-direction") &&
                  !jQuery(span).hasClass("toggle-clicked")
                ) {
                  anim.setDirection(-1);

                  if (jQuery(span).hasClass("start-on-last-frame"))
                    anim.goToAndPlay(animGetStart(anim), true);
                  else anim.goToAndPlay(animGetEnd(anim), true);
                } else {
                  anim.setDirection(1);

                  if (jQuery(span).hasClass("start-on-last-frame"))
                    anim.goToAndPlay(animGetEnd(anim), true);
                  else anim.goToAndPlay(animGetStart(anim), true);
                }

                jQuery(anim)
                  .off("complete")
                  .on("complete", function () {
                    if (
                      jQuery(span).hasClass("toggle-direction") &&
                      !jQuery(span).hasClass("toggle-clicked")
                    ) {
                      if (jQuery(span).hasClass("stop-on-last-frame"))
                        anim.goToAndStop(0, true);
                      else anim.goToAndStop(anim.getDuration(true), true);
                    } else {
                      if (jQuery(span).hasClass("stop-on-last-frame"))
                        anim.goToAndStop(anim.getDuration(true), true);
                      else anim.goToAndStop(0, true);
                    }

                    jQuery(span).removeClass("playing");
                  });
              }
            });
          });
        }

        jQuery(span).addClass("loaded-animation");
      }
    } catch (ex) {
      console.log(ex, data, span.parentNode);
    }
  });
}
function animGetStart(anim) {
  if (anim.currentFrame < anim.getDuration(true)) return anim.currentFrame;
  return 0;
}
function animGetEnd(anim) {
  if (anim.currentFrame > 0) return anim.currentFrame;
  return anim.getDuration(true);
}
function lottieGoToAndPlay(anim, callback) {
  setTimeout(function () {
    var waitUntilPlaying = setInterval(function () {
      if (anim.isPaused) {
        clearInterval(waitUntilPlaying);

        callback();
      }
    }, 10);
  }, 40);
}

function formValidation(form, force) {
  if (!force) force = false;

  var accept = true;

  form.find(".input_required").each(function () {
    if (!jQuery(this).attr("data-placeholder"))
      jQuery(this).attr("data-placeholder", jQuery(this).attr("placeholder"));

    if (force || jQuery(this).hasClass("focused")) {
      if (!jQuery(this).val()) {
        jQuery(this).addClass("invalid");
        jQuery(this).attr(
          "placeholder",
          jQuery(this).attr("data-invalid") || "Р—Р°РїРѕР»РЅРёС‚Рµ"
        );
        accept = false;
      } else {
        jQuery(this).removeClass("invalid");
        jQuery(this).attr("placeholder", jQuery(this).attr("data-placeholder"));
      }
    }
  });

  return accept;
}

function showPopup(
  event,
  _item,
  _popupClass,
  _popupTitle,
  _popupButtun,
  _additionals
) {
  // if (event) event.preventDefault();

  var self = this;
  if (typeof _item == "object") {
    self = _item;
    _item = undefined;
  }

  if (self.tagName != "A") {
    var href = jQuery(self).attr("data-href");
    if (href) history.pushState({}, "", href);
  }

  var item = _item || jQuery(self).attr("data-item");
  var title = _popupTitle || jQuery(self).attr("data-popup-title");
  var button = _popupButtun || jQuery(self).attr("data-popup-button");

  var popupClass =
    _popupClass || jQuery(self).attr("data-popup") || "pop_up_fon_th";
  var activePopup = jQuery(".popup." + popupClass);

  var titleNode = jQuery(".popup-title");
  if (!titleNode.attr("data-title"))
    titleNode.attr("data-title", titleNode.html());
  var buttonNode = jQuery(".popup-button");
  if (!buttonNode.attr("data-button"))
    buttonNode.attr("data-button", buttonNode.html());
  var itemNode = activePopup.find(".popup-item");
  if (!itemNode.attr("data-item")) itemNode.attr("data-item", itemNode.val());

  if (title) titleNode.html(title);
  else titleNode.html(titleNode.attr("data-title"));

  if (button) buttonNode.html(button);
  else buttonNode.html(buttonNode.attr("data-title"));

  jQuery(".popup-item").attr("data-additionals", "");
  if (_additionals)
    jQuery(".popup-item").attr(
      "data-additionals",
      JSON.stringify(_additionals)
    );

  if (item) jQuery(".popup-item").val(item);
  else itemNode.val(itemNode.attr("data-item"));

  jQuery("input").on("keydown", function (event) {
    var form = jQuery(this).parents("form").first();

    if (form.get(0) && event.keyCode == 13) form.submit();
  });

  jQuery("body").bind("keydown", function (event) {
    if (event.keyCode == 27) hidePopup();
  });

  var callbackFunction = jQuery.trim(jQuery(self).attr("callback-function"));
  if (callbackFunction) window[callbackFunction](self);

  activePopup.trigger("show-popup");

  hideScroll();
  jQuery(".popup").addClass("closed");
  activePopup.removeClass("closed");
  jQuery(".bg_pop_up").addClass("shown");

  jQuery(".request-form, .popup form").find("button").prop("disabled", false);
  allowRequest = 1;
}

function hidePopup() {
  jQuery(".popup:not(.closed)").trigger("hide-popup");

  setTimeout(function () {
    if (!jQuery(".bg_pop_up").hasClass("shown")) showScroll();
  }, 100);

  if (
    !jQuery(".thakns_1").hasClass("closed") ||
    !jQuery(".thakns_2").hasClass("closed")
  )
    history.pushState({}, "", location.pathname);
  else if (isPopupHref(location.href.split("#")[1]).status) history.back();

  jQuery(".popup").addClass("closed");
  jQuery(".bg_pop_up").removeClass("shown");

  jQuery(".pop_up input").removeClass("invalid");
}

function isPopupHref(href) {
  var popupHref = jQuery(
    '.show-popup[href="#' + href + '"], .show-popup[data-href="#' + href + '"]'
  );

  return {
    status: Boolean(popupHref.length),
    linkNode: popupHref.get(0),
  };
}

function hideScroll() {
  var scrollbarWidth = jQuery(window).width() >= 1200 ? getScrollbarWidth() : 0;

  jQuery("html").css("overflow-y", "hidden");
  jQuery("body").css("padding-right", scrollbarWidth + "px");
  jQuery(".top_menu").css("width", "calc(100% - " + scrollbarWidth + "px)");
}

function showScroll() {
  jQuery("html, body").removeAttr("style");
  jQuery(".top_menu").css("width", "100%");
}

function getScrollbarWidth() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return scrollbarWidth + 1;
}

/* popup end */

/* Slider begin */

jQuery(function () {
  // jQuery(window).bind('resize', resizeFunctionGorizontalSlider);

  loadGorizontalSliders();
});

var touchStart = 0;
var touchEnd = 0;
var touchStartY = 0;
var touchEndY = 0;

function loadGorizontalSliders() {
  jQuery(".gorizontal-slider").each(function (is, slider) {
    if (jQuery(this).hasClass("mouseinter")) {
      var sliderInterval = null;

      jQuery(this)
        .find(".arrow-left")
        .off("mousedown")
        .on("mousedown", function (event) {
          event.preventDefault();

          sliderInterval = runSliderInterval(sliderInterval, slider, "prev");
        });
      jQuery(this)
        .find(".arrow-right")
        .off("mousedown")
        .on("mousedown", function (event) {
          event.preventDefault();

          sliderInterval = runSliderInterval(sliderInterval, slider, "next");
        });
      jQuery("body").bind("mouseup mouseleave", function (event) {
        event.preventDefault();

        if (sliderInterval !== null && sliderInterval !== undefined) {
          clearInterval(sliderInterval);
          sliderInterval = null;
        }
      });
    }

    jQuery(this)
      .find(".arrow-left")
      .off("click")
      .on("click", function (event) {
        event.preventDefault();

        var self = this;
        jQuery(self).addClass("clicked");
        setTimeout(function () {
          jQuery(self).removeClass("clicked");
        }, 200);

        var track = jQuery(this)
          .parents(".gorizontal-slider")
          .first()
          .find(".gorizontal-slider-track")
          .first()
          .get(0);
        activeChangeGorizontalSlider = 1;
        productGorizontalSlideChange(track, "prev");
        activeChangeGorizontalSlider = 0;
      });

    jQuery(this)
      .find(".arrow-right")
      .off("click")
      .on("click", function (event) {
        event.preventDefault();

        var self = this;
        jQuery(self).addClass("clicked");
        setTimeout(function () {
          jQuery(self).removeClass("clicked");
        }, 200);

        var track = jQuery(this)
          .parents(".gorizontal-slider")
          .first()
          .find(".gorizontal-slider-track")
          .first()
          .get(0);
        activeChangeGorizontalSlider = 1;
        productGorizontalSlideChange(track, "next");
        activeChangeGorizontalSlider = 0;
      });
  });

  jQuery(
    ".gorizontal-slider-item.clickable, .gorizontal-slider-item .clickable"
  ).each(function () {
    if (!jQuery(this).data("click-evented")) {
      jQuery(this).on("click", function (event) {
        event.preventDefault();

        var slider = jQuery(this).parents(".gorizontal-slider-track").first();

        if (
          !slider
            .parents(".gorizontal-slider")
            .first()
            .hasClass("mobile-wheel") ||
          jQuery(window).width() >= 1200
        ) {
          var oldPos = parseInt(
            slider.find(".gorizontal-slider-item.active").attr("data-pos")
          );
          var newPos = parseInt(
            (jQuery(this).hasClass("gorizontal-slider-item")
              ? jQuery(this)
              : jQuery(this).parents(".gorizontal-slider-item").first()
            ).attr("data-pos")
          );
          var pos = newPos - oldPos;

          // slider.find('.gorizontal-slider-item').removeClass('active');
          // jQuery(this).addClass('active');

          // headerCarMove( slider );
          activeChangeGorizontalSlider = 1;
          productGorizontalSlideChange(slider.get(0), pos);
          activeChangeGorizontalSlider = 0;
        }
      });

      jQuery(this).data("click-evented", true);
    }
  });

  jQuery(".gorizontal-slider-track").each(function (it, track) {
    jQuery(track)
      .children(".gorizontal-slider-item")
      .each(function (i) {
        jQuery(this).attr("data-pos", i);
      });

    if (jQuery(track).hasClass("make-doubles")) {
      jQuery(track)
        .children(".gorizontal-slider-item")
        .each(function () {
          jQuery(track).append(jQuery(this).clone(true));
        });
    }
  });

  resizeFunctionGorizontalSlider(true);
}

var previousWindowWidth = 0;
function resizeFunctionGorizontalSlider(force) {
  var windowHeight = jQuery(window).height();
  var windowWidth = jQuery(window).width();
  var scrollTop = jQuery(window).scrollTop();

  if (previousWindowWidth !== jQuery(window).width() || force) {
    jQuery(".gorizontal-slider-track").each(function (i, self) {
      var slider = jQuery(this).parents(".gorizontal-slider").first();

      jQuery(this).find(".gorizontal-slider-item.pseudo").remove();

      jQuery(this).css({
        height: "auto",
        marginTop: 0,
        top: 0,
      });
      jQuery(this).parents(".gorizontal-slider-slides").first().css({
        height: "auto",
      });

      var widths = {};
      jQuery.each(this.attributes, function () {
        var s = this.name.toString().split("-");
        if (s[0] == "data" && s[1] == "width")
          widths[s[2]] = parseInt(this.value);
      });

      var itemsCount = null;
      for (var i in widths) {
        if (windowWidth <= parseInt(i)) {
          itemsCount = widths[i];
          break;
        }
      }
      if (itemsCount === null) itemsCount = widths.default;

      if (itemsCount > 0) {
        if (slider.hasClass("mobile-wheel")) {
          var touchWStart = 0;
          var touchWEnd = 0;
          var touchWStartY = 0;
          var touchWEndY = 0;
          var startWTrackLeft = 0;

          var animStopper = null;

          jQuery(this).on("touchstart", function (e) {
            touchWStart = e.touches[0].pageX;
            touchWStartY = e.touches[0].pageY;

            startWTrackLeft = parseFloat(jQuery(self).css("left"));

            if (animStopper !== null) clearInterval(animStopper);

            // jQuery('html, body').css({ overflowY: 'hidden' });
          });
          jQuery("body").bind("touchmove", function (e) {
            touchWEnd = e.touches[0].pageX;
            touchWEndY = e.touches[0].pageY;

            if (animStopper !== null) clearInterval(animStopper);

            if (
              Math.abs(touchWStart - touchWEnd) > 100 &&
              Math.abs(touchWStart - touchWEnd) -
                Math.abs(touchWStartY - touchWEndY) >
                100
            ) {
              var delta = (touchWStart - touchWEnd) * 1.5;
              var trackLeft = startWTrackLeft - delta;

              var limit =
                jQuery(self)
                  .parents(".gorizontal-slider-slides")
                  .first()
                  .width() - jQuery(self).outerWidth();
              if (trackLeft > 0) trackLeft = 0;
              else if (trackLeft < limit) trackLeft = limit;

              jQuery(self).css({ left: trackLeft + "px" });

              // setTimeout(function(){
              //     jQuery('html, body').css({ overflowY: 'auto' });
              // }, 400);
            } //else jQuery('html, body').css({ overflowY: 'auto' });
          });
          jQuery("body").bind("touchend", function (e) {
            if (touchWStart != 0) {
              if (
                Math.abs(touchWStart - touchWEnd) > 100 &&
                Math.abs(touchWStart - touchWEnd) -
                  Math.abs(touchWStartY - touchWEndY) >
                  100
              ) {
                var direction = touchWStart - touchWEnd > 0 ? "next" : "prev";

                var leftNull = parseFloat(jQuery(self).css("column-gap"));
                var minusLeft = 0;
                jQuery(self)
                  .find(".gorizontal-slider-item")
                  .each(function () {
                    if (!minusLeft) {
                      var left = jQuery(this).offset().left;
                      var width = jQuery(this).width();
                      if (direction == "next" && left > leftNull)
                        minusLeft = left - leftNull;
                      else if (direction == "prev" && left + width > leftNull)
                        minusLeft = left - leftNull;
                    }
                  });

                var trackLeftCurrent = parseFloat(jQuery(self).css("left"));

                var trackLeft = trackLeftCurrent - minusLeft;
                var limit =
                  jQuery(self)
                    .parents(".gorizontal-slider-slides")
                    .first()
                    .width() - jQuery(self).outerWidth();
                if (trackLeft > 0) trackLeft = 0;
                else if (trackLeft < limit) trackLeft = limit;

                var deltaX = trackLeftCurrent - trackLeft;
                if (animStopper !== null) clearInterval(animStopper);
                animStopper = setInterval(function () {
                  var deltaXS = deltaX / 10;
                  deltaX -= deltaXS;
                  trackLeftCurrent -= deltaXS;

                  if (Math.abs(deltaX) < 0.2) {
                    clearInterval(animStopper);
                    animStopper = null;

                    jQuery(self).css({ left: trackLeft + "px" });
                  } else jQuery(self).css({ left: trackLeftCurrent + "px" });
                }, 1);
              }

              touchWStart = 0;
              touchWEnd = 0;
              touchWStartY = 0;
              touchWEndY = 0;
              startWTrackLeft = 0;

              if (Math.abs(touchWStartY - touchWEndY) > 40)
                jQuery("html, body").removeAttr("style");
              else jQuery("html, body").css({ overflowY: "hidden" });
            }
          });
        } else {
          jQuery(this).on("touchstart", function (e) {
            touchStart = e.touches[0].pageX;
            touchStartY = e.touches[0].pageY;

            jQuery("html, body").css({ overflowY: "hidden" });
          });
          jQuery(this).on("touchend", function (e) {
            if (
              Math.abs(touchStart - touchEnd) -
                Math.abs(touchStartY - touchEndY) >
              100
            ) {
              jQuery("html, body").css({ overflowY: "hidden" });

              var direction = touchStart - touchEnd > 0 ? "next" : "prev";

              activeChangeGorizontalSlider = 1;
              if (touchEnd) productGorizontalSlideChange(this, direction);
              activeChangeGorizontalSlider = 0;

              touchStart = 0;
              touchEnd = 0;
              touchStartY = 0;
              touchEndY = 0;

              setTimeout(function () {
                jQuery("html, body").removeAttr("style");
              }, 400);
            } else jQuery("html, body").removeAttr("style");
          });
          jQuery(this).on("touchmove", function (e) {
            touchEnd = e.touches[0].pageX;
            touchEndY = e.touches[0].pageY;

            if (Math.abs(touchStartY - touchEndY) > 100)
              jQuery("html, body").removeAttr("style");
            else jQuery("html, body").css({ overflowY: "hidden" });
          });
        }

        if (!jQuery(this).hasClass("wheel-attached")) {
          jQuery(this).on("mousewheel wheel DOMMouseScroll", function (e) {
            if (
              jQuery(window).width() > 1199 &&
              Math.abs(e.originalEvent.deltaX) >
                Math.abs(e.originalEvent.deltaY) &&
              !jQuery(self).data("allow-wheel")
            ) {
              jQuery(self).data("allow-wheel", true);
              e.preventDefault();
              e.returnValue = false;

              var direction = "next";

              if (e.originalEvent.deltaX)
                direction = e.originalEvent.deltaX > 0 ? "next" : "prev";

              activeChangeGorizontalSlider = 1;
              productGorizontalSlideChange(this, direction);
              activeChangeGorizontalSlider = 0;

              setTimeout(function () {
                jQuery(self).data("allow-wheel", false);
              }, 1000);

              return false;
            }
          });
          jQuery(this).addClass("wheel-attached");
        }

        jQuery(this).data("items-count", itemsCount);
        if (itemsCount) {
          var items = jQuery(this).find(".gorizontal-slider-item");

          var itemWidth = getSliderItemWidth(this);

          console.log(itemsCount, ">=", items.length);

          if (itemsCount >= items.length) {
            slider.find(".arrow-left, .arrow-right").hide();

            items.addClass("visible");

            var trackWidth = items.length * itemWidth;

            jQuery(this).css({
              flex: "0 0 " + trackWidth + "px",
              width: trackWidth + "px",
              marginLeft: 0,
              left: 0,
            });
          } else {
            slider.find(".arrow-left, .arrow-right").css({ display: "flex" });

            items.removeClass("visible");

            if (!jQuery(self).hasClass("no-change-active")) {
              items.removeClass("active");
              if (jQuery(this).hasClass("start-center")) {
                var center = Math.floor(itemsCount / 2);
                items.slice(center, center + 1).addClass("active");
              } else items.first().addClass("active");
            }

            items.slice(0, itemsCount).addClass("visible");

            var trackWidth =
              itemsCount <= items.length
                ? itemWidth * items.length + "px"
                : "auto";
            jQuery(this).css({
              flex: "0 0 " + trackWidth,
              width: trackWidth,
              marginLeft: 0,
              left: 0,
            });

            var flexWidth = parseFloat(items.first().css("flex-basis"));
            if (flexWidth && !slider.hasClass("width100"))
              jQuery(this)
                .parents(".gorizontal-slider-slides")
                .first()
                .css({
                  flex: "0 0 " + itemWidth * itemsCount + "px",
                  width: itemWidth * itemsCount + "px",
                });
            else {
              if (slider.hasClass("flex-resize"))
                items.css({
                  flex: "0 0 " + itemWidth + "px",
                });
              items.css({
                width: itemWidth + "px",
              });
            }

            if (items.length)
              jQuery(this).css({
                margin: "auto",
              });
          }
        } else {
          jQuery(this).css({
            margin: "auto",
          });
        }

        if (jQuery(this).width() < jQuery(this).parent().width())
          jQuery(this).css({
            marginLeft: "auto",
            marginRight: "auto",
          });

        setTimeout(function () {
          if (slider.hasClass("orientation-change")) {
            var callbackkKey = jQuery(self).attr("data-callback");
            if (callbackkKey && window[callbackkKey] instanceof Function)
              window[callbackkKey](slider);
            else activateMainImage(slider);
          }
        }, 200);

        jQuery(self).attr("data-scale", 0);

        if (slider.hasClass("slides-to-center")) {
          var itemsVCount = jQuery(self).data("items-count");
          var scale = Math.floor(
            (jQuery(self).find(".gorizontal-slider-item").length -
              itemsVCount) /
              2
          );

          if (jQuery(window).width() >= 1200) {
            jQuery(self).attr("data-scale", scale);

            activeChangeGorizontalSlider = 1;
            productGorizontalSlideChange(self, scale);
            activeChangeGorizontalSlider = 0;
          } else {
            var leftNull = parseFloat(jQuery(self).css("column-gap"));
            var minusLeft =
              jQuery(self)
                .find(".gorizontal-slider-item:eq(" + scale + ")")
                .offset().left - leftNull;

            var trackLeftCurrent = parseFloat(jQuery(self).css("left"));

            var trackLeft = trackLeftCurrent - minusLeft;
            var limit =
              jQuery(self)
                .parents(".gorizontal-slider-slides")
                .first()
                .width() - jQuery(self).outerWidth();
            if (trackLeft > 0) trackLeft = 0;
            else if (trackLeft < limit) trackLeft = limit;

            jQuery(self).css({ left: trackLeft + "px" });
          }
        }
      } else jQuery(this).data("items-count", 0);
    });

    jQuery(".gorizontal-slider").each(function () {
      jQuery(this).find(".gorizontal-slider-item.pseudo").remove();

      var dots = jQuery(this).find(".gorizontal-slider-dots");
      dots.html("");

      var track = jQuery(this).find(".gorizontal-slider-track");
      var itemsVCount = track.data("items-count");

      track
        .find(".gorizontal-slider-item.active-slide")
        .on("click", function (event) {
          event.preventDefault();

          var direction =
            parseInt(jQuery(this).attr("data-pos")) -
            parseInt(
              track
                .find(".gorizontal-slider-item.active")
                .first()
                .attr("data-pos")
            );

          activeChangeGorizontalSlider = 1;
          productGorizontalSlideChange(track.get(0), direction);
          activeChangeGorizontalSlider = 0;
        });

      if (dots.length && itemsVCount > 0) {
        var itemsCount = track.find(".gorizontal-slider-item").length;
        var dotsCount = Math.ceil(itemsCount / itemsVCount);

        if (jQuery(this).hasClass("fullmove")) {
          for (var i = 0; i < dotsCount * itemsVCount - itemsCount; i++) {
            track.append("<div class='gorizontal-slider-item pseudo'></div>");
          }
        }

        for (var i = 0; i < dotsCount; i++) {
          var li = document.createElement("li");
          jQuery(li).attr("data-index", i);
          if (!i) jQuery(li).addClass("active");

          if (dots.hasClass("numeric")) jQuery(li).html(i + 1);

          dots.append(li);
        }
        dots.find("li").first().addClass("first");
        dots.find("li").last().addClass("last");

        renderTripleDots(jQuery(this));

        if (dotsCount > 1) dots.show();
        else dots.hide();

        jQuery(this)
          .find("li")
          .on("click", function (i) {
            var slider = jQuery(this).parents(".gorizontal-slider").first();
            var track = slider.find(".gorizontal-slider-track");

            var index = parseInt(jQuery(this).attr("data-index"));
            var scale = parseInt(track.attr("data-scale"));

            var direction = index * itemsVCount - scale;

            activeChangeGorizontalSlider = 1;
            productGorizontalSlideChange(track.get(0), direction);
            activeChangeGorizontalSlider = 0;
          });
      }
    });
  }
}

function renderTripleDots(slider) {
  slider.find(".gorizontal-slider-dots li.tripledots").remove();

  slider
    .find(".gorizontal-slider-dots li")
    .removeClass("prev")
    .removeClass("next");
  if (jQuery(window).width() >= 1200) {
    slider
      .find(".gorizontal-slider-dots li.active")
      .prev("li")
      .addClass("prev");
    slider
      .find(".gorizontal-slider-dots li.active")
      .next("li")
      .addClass("next");
  }

  if (slider.hasClass("fullmove")) {
    var lad = slider
      .find(
        ".gorizontal-slider-dots li.active, .gorizontal-slider-dots li.next"
      )
      .last();
    var adIndex = parseInt(lad.attr("data-index"));
    if (adIndex < slider.find(".gorizontal-slider-dots li").length - 2)
      lad.after("<li class='tripledots'>...</li>");

    var lad = slider
      .find(
        ".gorizontal-slider-dots li.active, .gorizontal-slider-dots li.prev"
      )
      .first();
    var adIndex = parseInt(lad.attr("data-index"));
    if (adIndex > 1) lad.before("<li class='tripledots'>...</li>");
  }
}

var allowGorizontalSliderChange = 1;

function runSliderInterval(sliderInterval, slider, direction) {
  if (sliderInterval === null) {
    sliderInterval = setInterval(function () {
      var track = jQuery(slider)
        .find(".gorizontal-slider-track")
        .first()
        .get(0);

      activeChangeGorizontalSlider = 1;
      productGorizontalSlideChange(track, direction);
      activeChangeGorizontalSlider = 0;
    }, 500);
  }

  return sliderInterval;
}
function productGorizontalSlideChange(track, direction, ignoreACGS) {
  if (
    allowGorizontalSliderChange &&
    jQuery(track).data("items-count") &&
    (activeChangeGorizontalSlider || ignoreACGS) &&
    jQuery(track).data("items-count") <
      jQuery(track).find(".gorizontal-slider-item").length
  ) {
    var slider = jQuery(track).parents(".gorizontal-slider").first();

    allowGorizontalSliderChange = 0;

    var itemsCount = jQuery(track).data("items-count");
    var itemsCCount =
      jQuery(track).find(".gorizontal-slider-item").length - itemsCount + 1;

    var activeWidth = getSliderItemWidth(track);

    var left = parseFloat(jQuery(track).css("left"));
    var marginLeft = parseFloat(jQuery(track).css("margin-left"));
    var movable = null;

    var activeItem = jQuery(track).find(".gorizontal-slider-item.active");

    var stepsCount = parseInt(direction);
    if (!stepsCount) {
      stepsCount = direction === "prev" ? -1 : 1;

      if (slider.hasClass("fullmove")) stepsCount *= itemsCount;
    }
    var absStepsCount = Math.abs(stepsCount);

    if (!jQuery(track).hasClass("no-change-active"))
      activeItem.removeClass("active");

    var currentScale = parseInt(jQuery(track).attr("data-scale")) + stepsCount;
    if (currentScale < 0) currentScale = itemsCCount - 1;
    else if (currentScale >= itemsCCount) currentScale = 0;
    jQuery(track).attr("data-scale", currentScale);

    jQuery(track)
      .parents(".gorizontal-slider")
      .first()
      .trigger("slider-prechange");

    slider.find(".gorizontal-slider-dots li.active").removeClass("active");
    slider
      .find(
        ".gorizontal-slider-dots li[data-index=" +
          Math.ceil(currentScale / itemsCount) +
          "]"
      )
      .addClass("active");

    renderTripleDots(slider);

    if (direction === "prev" || stepsCount < 0) {
      left += activeWidth * absStepsCount;
      marginLeft -= activeWidth * absStepsCount;

      movable = jQuery(track).find(".gorizontal-slider-item").slice(stepsCount);
      movable.removeClass("visible");
      movable.addClass("movable");

      if (!jQuery(track).hasClass("no-change-active")) {
        // activeItem.prev('.gorizontal-slider-item').addClass('active');
        // movable.removeClass('active');
        activeItem.removeClass("active");
      }

      var clones = movable.clone(true);
      setTimeout(function () {
        clones.find(".lottie svg").remove();
        clones.find(".lottie").removeClass("loaded-animation");
        loadPopupOnLoad();
        jQuery(track)
          .find(".gorizontal-slider-item.visible .lottie")
          .each(function () {
            if (jQuery(this).hasClass("toggle-clicked")) {
              var anim = jQuery(this).data("anim");
              anim.goToAndPlay(anim.getDuration(true) - 1, true);
            }
          });
      }, 300);
      jQuery(track).prepend(clones);

      var items = jQuery(track)
        .find(".gorizontal-slider-item")
        .slice(itemsCount);
      items.removeClass("visible");

      if (!jQuery(track).hasClass("no-change-active")) {
        if (!jQuery(track).hasClass("start-center"))
          items.removeClass("active");
        else {
          for (var iii = 0; iii < absStepsCount; iii++)
            activeItem = activeItem.prev(".gorizontal-slider-item");
          activeItem.addClass("active");
          movable.removeClass("active");
        }
      }

      var slides = jQuery(track)
        .find(".gorizontal-slider-item")
        .slice(0, itemsCount);
      var visibles = slides.filter(function () {
        return jQuery(this).hasClass("visible");
      });
      if (visibles.length < itemsCount)
        jQuery(track)
          .find(".gorizontal-slider-item")
          .slice(0, itemsCount)
          .addClass("visible");
      if (
        !jQuery(track).find(".gorizontal-slider-item.active").length &&
        !jQuery(track).hasClass("no-change-active")
      )
        jQuery(track)
          .find(".gorizontal-slider-item.visible")
          .first()
          .addClass("active");

      jQuery(track).css({
        marginLeft: marginLeft + "px",
      });
    } else if (direction === "next" || stepsCount > 0) {
      left -= activeWidth * absStepsCount;
      marginLeft += activeWidth * absStepsCount;

      movable = jQuery(track)
        .find(".gorizontal-slider-item")
        .slice(0, stepsCount);
      movable.removeClass("visible");
      movable.addClass("movable");

      if (!jQuery(track).hasClass("no-change-active")) {
        for (var iii = 0; iii < stepsCount; iii++)
          activeItem = activeItem.next(".gorizontal-slider-item");
        activeItem.addClass("active");
        movable.removeClass("active");
      }

      var clones = movable.clone(true);
      clones.find(".lottie svg").remove();
      clones.find(".lottie").removeClass("loaded-animation");
      loadPopupOnLoad();
      jQuery(track)
        .find(".gorizontal-slider-item.visible .lottie")
        .each(function () {
          if (jQuery(this).hasClass("toggle-clicked")) {
            var anim = jQuery(this).data("anim");
            anim.goToAndPlay(anim.getDuration(true) - 1, true);
          }
        });
      jQuery(track).append(clones);

      var visibles = jQuery(track).find(".gorizontal-slider-item.visible");
      if (visibles.length < itemsCount)
        jQuery(track)
          .find(".gorizontal-slider-item")
          .slice(stepsCount, itemsCount + stepsCount)
          .addClass("visible");

      if (
        !jQuery(track).find(".gorizontal-slider-item.active").length &&
        !jQuery(track).hasClass("no-change-active")
      )
        jQuery(track)
          .find(".gorizontal-slider-item.visible")
          .first()
          .addClass("active");
    }

    var callbackkKey = jQuery(track).attr("data-callback");
    if (callbackkKey && window[callbackkKey] instanceof Function)
      window[callbackkKey](slider);
    else activateMainImage(slider);

    jQuery(track).css({
      left: left + "px",
      width: getSliderTrackWidth(track),
    });

    var animationDuration =
      parseFloat(jQuery(track).attr("data-animation-duration")) * 1000 || 400;

    var changeSlidePreAnimation = jQuery(track).attr(
      "data-change-slide-pre-animation"
    );
    if (changeSlidePreAnimation) window[changeSlidePreAnimation](track);

    setTimeout(function () {
      if (direction === "next" || stepsCount > 0)
        jQuery(track).css({
          marginLeft: marginLeft + "px",
        });

      movable.remove();
      jQuery(track).css({
        width: getSliderTrackWidth(track),
      });

      jQuery(track).find(".gorizontal-slider-item").removeClass("movable");

      if (jQuery(track).hasClass("start-center"))
        jQuery(track)
          .find(".gorizontal-slider-item")
          .each(function (i) {
            jQuery(this).attr("data-pos", i);
          });

      allowGorizontalSliderChange = 1;
    }, animationDuration);

    var slider = jQuery(track).parents(".gorizontal-slider");
    slider.find(".arrow-left, .arrow-right").addClass("activated");
  }
}

function getSliderItemWidth(track) {
  var slider = jQuery(track).hasClass("orientation-on-slides")
    ? jQuery(track).parents(".gorizontal-slider-slides").first()
    : jQuery(track).parents(".gorizontal-slider").first();
  var flexWidth = parseFloat(
    jQuery(track).find(".gorizontal-slider-item").first().css("flex-basis")
  );

  return flexWidth && !slider.hasClass("width100")
    ? flexWidth
    : slider.width() / jQuery(track).data("items-count");
}

function getSliderTrackWidth(track, minus) {
  if (!minus) minus = 0;

  return (
    getSliderItemWidth(track) *
    (jQuery(track).find(".gorizontal-slider-item").length - minus)
  );
}

function changeProductTab(track) {
  var activeSlide = jQuery(track)
    .find(".gorizontal-slider-item.active")
    .first();
  var href = activeSlide.attr("data-href");

  jQuery(".product_tovar.active").removeClass("active");
  jQuery(href).addClass("active");
}

function activateMainImage() {}

function chooseSliderCallback(slider) {
  var activeItem = slider.find(".gorizontal-slider-item.active").first();
  var index = parseInt(activeItem.attr("data-pos")) + 1;

  jQuery("#choose-slider-index").html(index < 10 ? "0" + index : index);
}

function headerCarMove(slider) {
  var activeItem = slider.find(".gorizontal-slider-item.active").first();
  var index = parseInt(activeItem.attr("data-pos"));

  jQuery(".header_sl_img .header_sl_track .header_sl_block.active").removeClass(
    "active"
  );
  jQuery(
    '.header_sl_img .header_sl_track .header_sl_block[data-pos="' + index + '"]'
  ).addClass("active");

  jQuery(".header__main .header_opis.active").removeClass("active");
  jQuery('.header__main .header_opis[data-pos="' + index + '"]').addClass(
    "active"
  );
}

/* Slider end */

var youTubeAPILoaded = false;
var youtubePlayers = [];
function loadYouTubeAPI() {
  var tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = function () {
    jQuery(".music_video").each(function () {
      var currentVideoId = jQuery(this).attr("data-code");
      if (currentVideoId == "") return null;

      youtubePlayers[currentVideoId] = new YT.Player(jQuery(this).attr("id"), {
        width: jQuery(this).width(),
        height: Math.round((jQuery(this).width() / 16) * 9),
        videoId: currentVideoId,
        host: "https://www.youtube.com",
        playerVars: {
          autoplay: 0,
          controls: 1,
          showinfo: 0,
          disablekb: 0,
          modestbranding: 0,
          rel: 0,
          fs: 1,
          loop: 0,
          origin: "http://localhost:3000",
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    });
  };
}

jQuery(".music .play_stop").on("click", function () {
  var music = jQuery(this).parents(".music").first();

  var id = music.attr("data-code");

  for (var i in youtubePlayers)
    if (i != id && youtubePlayers[i] && youtubePlayers[i].pauseVideo)
      youtubePlayers[i].pauseVideo();

  if (!music.hasClass("active")) {
    jQuery(".music_video_cont").addClass("active");
    jQuery(".music").removeClass("active");
    music.addClass("active");

    if (youtubePlayers[id]) youtubePlayers[id].playVideo();
  } else {
    youtubePlayers[id].pauseVideo();

    jQuery(".music").removeClass("active");
    jQuery(".music_video_cont").removeClass("active");
  }
});
jQuery(".music_video_cont .exit").on("click", function () {
  var music = jQuery(this).parents(".music").first();

  jQuery(".music_video_cont").removeClass("active");

  for (var i in youtubePlayers)
    if (youtubePlayers[i] && youtubePlayers[i].pauseVideo)
      youtubePlayers[i].pauseVideo();
});

function onPlayerReady(event) {
  if (jQuery(".music_video_cont").hasClass("active")) event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data === 1) {
    document.getElementById("audiostream").pause();
    jQuery(".header_top_center .play_stop").addClass("active");
    // jQuery(event.target.i).parents('.music').find('.play_stop').removeClass('active');
  } else jQuery(".music").find(".play_stop").addClass("active");
}

function getCookie(name) {
  var matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();

  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
}

jQuery(function () {
  if (jQuery(window).width() >= 1200)
    jQuery(".add-custom-scrollbar-desktop").addClass("add-custom-scrollbar");

  jQuery(window).on("resize", function () {
    jQuery(".add-custom-scrollbar").each(function (ia, section) {
      jQuery(section).attr("data-top", 0);

      if (
        jQuery(section).find(".custom-scroll-content").outerHeight() ==
        jQuery(section).height()
      )
        jQuery(section).find(".custom-scrollbar").hide();
      else jQuery(section).find(".custom-scrollbar").show();

      jQuery(section).css({ height: jQuery(section).outerHeight() + "px" });
      jQuery(section)
        .find(".custom-scroll-content")
        .css({
          height:
            jQuery(section).find(".custom-scroll-content").outerHeight() + "px",
        });

      setScroll(section, 0, false);
    });

    jQuery(".add-custom-horizontal-scrollbar").each(function (ia, section) {
      jQuery(section).attr("data-left", 0);

      if (
        jQuery(section).find(".custom-horizontal-scroll-content").get(0)
          .scrollWidth == jQuery(section).width()
      )
        jQuery(section).find(".custom-horizontal-scrollbar").hide();
      else jQuery(section).find(".custom-horizontal-scrollbar").show();

      jQuery(section).css({ width: jQuery(section).width() + "px" });
      jQuery(section)
        .find(".custom-horizontal-scroll-content")
        .css({
          width:
            jQuery(section).find(".custom-horizontal-scroll-content").get(0)
              .scrollWidth + "px",
        });

      setScroll(section, 0, false);
    });
  });

  jQuery(".add-custom-scrollbar").each(function (ia, section) {
    jQuery(section).attr("data-top", 0);

    jQuery(section).wrapInner("<div class='custom-scroll-content'></div>");

    jQuery(section).append(`<div class="custom-scrollbar">
            <div class="custom-scrollbar-track">
                <div class="custom-scrollbar-thumb"></div>
            </div>
        </div>`);

    jQuery(section).css({ height: jQuery(section).outerHeight() + "px" });
    jQuery(section)
      .find(".custom-scroll-content")
      .css({
        height:
          jQuery(section).find(".custom-scroll-content").outerHeight() + "px",
      });

    if (
      jQuery(section).find(".custom-scroll-content").outerHeight() ==
      jQuery(section).outerHeight()
    )
      jQuery(section).find(".custom-scrollbar").hide();
    else jQuery(section).find(".custom-scrollbar").show();

    /**/ jQuery(section)
      .find(".custom-scroll-content")
      .css({
        height:
          jQuery(section).find(".custom-scroll-content").outerHeight() +
          4 +
          "px",
      });

    var scrollbarTrack = jQuery(section)
      .find(".custom-scrollbar-track")
      .first();

    jQuery(section)
      .find(".custom-scrollbar-track")
      .on("click", function (event) {
        event.preventDefault();

        var top =
          (event.pageY - scrollbarTrack.offset().top) /
          scrollbarTrack.outerHeight();

        setScroll(section, top, 1);
      });

    var clickStartX = null;
    var clickStartY = null;
    var clickEndX = null;
    var clickEndY = null;
    jQuery(section)
      .find(".custom-scroll-content")
      .first()
      .on("mousedown touchstart", function (event) {
        clickStartX = event.touches ? event.touches[0].pageX : event.pageX;
        clickStartY = event.touches ? event.touches[0].pageY : event.pageY;

        jQuery("body").addClass("mobile-noscroll");
        jQuery("body").addClass("overflow-hidden");
      });
    jQuery(section)
      .find(".custom-scrollbar-thumb")
      .on("mousedown touchstart", function () {
        jQuery(section).addClass("scrollbar-thumb-move");

        jQuery("body").addClass("mobile-noscroll");
        jQuery("body").addClass("overflow-hidden");
      });
    jQuery("body").on("mousemove touchmove", function (event) {
      event.preventDefault();

      clickEndX =
        event.touches && event.touches[0]
          ? event.touches[0].pageX
          : event.pageX;
      clickEndY =
        event.touches && event.touches[0]
          ? event.touches[0].pageY
          : event.pageY;

      if (jQuery(section).hasClass("scrollbar-thumb-move")) {
        var pageY = event.touches ? event.touches[0].pageY : event.pageY;
        var top =
          (pageY - scrollbarTrack.offset().top) / scrollbarTrack.outerHeight();

        setScroll(section, top, false);
      } else if (
        clickStartX !== null &&
        clickStartY !== null &&
        clickEndX !== null &&
        clickEndY !== null &&
        Math.abs(clickStartY - clickEndY) > 10 &&
        Math.abs(clickStartY - clickEndY) > Math.abs(clickStartX - clickEndX)
      ) {
        var wheel = (clickStartY - clickEndY) / jQuery(section).outerHeight();
        if (Math.abs(wheel) > 5) wheel = (5 / wheel) * Math.abs(wheel);

        var top = parseFloat(jQuery(section).attr("data-top")) + wheel;

        setScroll(section, top, false);
      }
    });
    jQuery("body").on("mouseup mouseleave touchend", function () {
      jQuery(section).removeClass("scrollbar-thumb-move");

      jQuery("body").removeClass("overflow-hidden");
      jQuery("body").removeClass("mobile-noscroll");

      clickStartX = null;
      clickStartY = null;
      clickEndX = null;
      clickEndY = null;
    });

    var wheelInterval = null;
    jQuery(section)
      .find(".custom-scroll-content")
      .first()
      .on("mousewheel wheel DOMMouseScroll", function (event) {
        if (
          Math.abs(event.originalEvent.deltaX) <
          Math.abs(event.originalEvent.deltaY)
        ) {
          event.preventDefault();
          event.returnValue = false;

          if (wheelInterval !== null) {
            clearInterval(wheelInterval);
            wheelInterval = null;
          }

          var wheel = event.originalEvent.deltaY;
          wheel = (4 / wheel) * Math.abs(wheel);

          var top =
            parseFloat(jQuery(section).attr("data-top")) +
            wheel / jQuery(section).outerHeight();

          setScroll(section, top, false);

          wheelInterval = setInterval(function () {
            var wheelP = wheel / 50;

            if (Math.abs(wheel) < 0.5) {
              clearInterval(wheelInterval);
              wheelInterval = null;
            } else {
              wheel -= wheelP;
              top =
                parseFloat(jQuery(section).attr("data-top")) +
                wheel / jQuery(section).outerHeight();

              setScroll(section, top, false);
            }
          }, 1);

          return false;
        }
      });
  });

  jQuery(".add-custom-horizontal-scrollbar").each(function (ia, section) {
    jQuery(section).attr("data-left", 0);

    jQuery(section).wrapInner(
      "<div class='custom-horizontal-scroll-content'></div>"
    );

    jQuery(section).append(`<div class="custom-horizontal-scrollbar">
            <div class="custom-horizontal-scrollbar-track">
                <div class="custom-horizontal-scrollbar-thumb"></div>
            </div>
        </div>`);

    jQuery(section).css({ width: jQuery(section).width() + "px" });
    jQuery(section)
      .find(".custom-horizontal-scroll-content")
      .css({
        width:
          jQuery(section).find(".custom-horizontal-scroll-content").get(0)
            .scrollWidth + "px",
      });

    if (
      jQuery(section).find(".custom-horizontal-scroll-content").get(0)
        .scrollWidth == jQuery(section).width()
    )
      jQuery(section).find(".custom-horizontal-scrollbar").hide();
    else jQuery(section).find(".custom-horizontal-scrollbar").show();

    var scrollbarTrack = jQuery(section)
      .find(".custom-horizontal-scrollbar-track")
      .first();

    jQuery(section)
      .find(".custom-horizontal-scrollbar-track")
      .on("click", function (event) {
        event.preventDefault();

        var left =
          (event.pageX - scrollbarTrack.offset().left) /
          scrollbarTrack.outerWidth();

        setHorizontalScroll(section, left, 1);
      });

    var clickStartX = null;
    var clickStartY = null;
    var clickEndX = null;
    var clickEndY = null;
    jQuery(section)
      .find(".custom-horizontal-scroll-content")
      .first()
      .on("mousedown touchstart", function (event) {
        clickStartX = event.touches ? event.touches[0].pageX : event.pageX;
        clickStartY = event.touches ? event.touches[0].pageY : event.pageY;

        jQuery("body").addClass("overflow-hidden");
      });
    jQuery(section)
      .find(".custom-horizontal-scrollbar-thumb")
      .on("mousedown touchstart", function () {
        jQuery(section).addClass("scrollbar-thumb-move");
      });
    jQuery("body").on("mousemove touchmove", function (event) {
      event.preventDefault();

      clickEndX =
        event.touches && event.touches[0]
          ? event.touches[0].pageX
          : event.pageX;
      clickEndY =
        event.touches && event.touches[0]
          ? event.touches[0].pageY
          : event.pageY;

      if (jQuery(section).hasClass("scrollbar-thumb-move")) {
        var pageX = event.touches ? event.touches[0].pageX : event.pageX;
        var left =
          (pageX - scrollbarTrack.offset().left) / scrollbarTrack.outerWidth();

        setHorizontalScroll(section, left, false);
      } else if (
        clickStartX !== null &&
        clickStartY !== null &&
        clickEndX !== null &&
        clickEndY !== null &&
        Math.abs(clickStartX - clickEndX) > 10 &&
        Math.abs(clickStartY - clickEndY) < Math.abs(clickStartX - clickEndX)
      ) {
        var wheel = (clickStartX - clickEndX) / jQuery(section).outerWidth();
        if (Math.abs(wheel) > 0.025) wheel = (0.025 / wheel) * Math.abs(wheel);

        var left = parseFloat(jQuery(section).attr("data-left")) + wheel;

        setHorizontalScroll(section, left, false);
      }
    });
    jQuery("body").on("mouseup mouseleave touchend", function () {
      jQuery(section).removeClass("scrollbar-thumb-move");

      jQuery("body").removeClass("overflow-hidden");

      clickStartX = null;
      clickStartY = null;
      clickEndX = null;
      clickEndY = null;
    });
  });
});

function setScroll(section, top, animate) {
  if (top < 0) top = 0;
  else if (top > 1) top = 1;

  jQuery(section).attr("data-top", top);

  top *= 100;

  if (animate === 1)
    jQuery(section)
      .find(".custom-scrollbar-thumb")
      .animate({ top: top + "%" }, 400);
  else
    jQuery(section)
      .find(".custom-scrollbar-thumb")
      .css({ top: top + "%" });

  var scrollContent = jQuery(section).find(".custom-scroll-content").first();

  var contentTop =
    ((jQuery(section).height() - scrollContent.outerHeight()) /
      scrollContent.outerHeight()) *
    top;
  if (animate === 1)
    scrollContent.animate({ marginTop: contentTop + "%" }, 400);
  else scrollContent.css({ marginTop: contentTop + "%" });
}

function setHorizontalScroll(section, left, animate) {
  if (left < 0) left = 0;
  else if (left > 1) left = 1;

  jQuery(section).attr("data-left", left);

  left *= 100;

  if (animate === 1)
    jQuery(section)
      .find(".custom-horizontal-scrollbar-thumb")
      .animate({ left: left + "%" }, 200);
  else
    jQuery(section)
      .find(".custom-horizontal-scrollbar-thumb")
      .css({ left: left + "%" });

  var scrollContent = jQuery(section)
    .find(".custom-horizontal-scroll-content")
    .first();

  var contentLeft =
    ((jQuery(section).width() - scrollContent.get(0).scrollWidth) /
      jQuery(section).width()) *
    left;
  if (animate === 1)
    scrollContent.animate({ marginLeft: contentLeft + "%" }, 200);
  else scrollContent.css({ marginLeft: contentLeft + "%" });
}
// Custom Scroll JS end

function initMap() {
  var latlng = new google.maps.LatLng(55.70875373527471, 37.36439551470298);
  var settings = {
    zoom: 11,
    center: latlng,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    },
    scrollwheel: false,
    disableDoubleClickZoom: true,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL,
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
          {
            saturation: 36,
          },
          {
            color: "#000000",
          },
          {
            lightness: 40,
          },
        ],
      },
      {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
          {
            visibility: "on",
          },
          {
            color: "#000000",
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 17,
          },
          {
            weight: 1.2,
          },
        ],
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#c4c4c4",
          },
        ],
      },
      {
        featureType: "administrative.neighborhood",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#707070",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 21,
          },
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "poi.business",
        elementType: "geometry",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#be2026",
          },
          {
            lightness: "0",
          },
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.stroke",
        stylers: [
          {
            visibility: "off",
          },
          {
            hue: "#ff000a",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 18,
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#575757",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#2c2c2c",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#999999",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.stroke",
        stylers: [
          {
            saturation: "-52",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 19,
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 17,
          },
        ],
      },
    ],
  };
  var map = new google.maps.Map(
    document.getElementById("google-map"),
    settings
  );
  var myLatlng = new google.maps.LatLng(55.70875373527471, 37.36439551470298);

  var myOptions = {
    zoom: 11,
    center: myLatlng,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  // var image = '/wp-content/themes/pushk/images/pointer.png';
  var beachMarker = new google.maps.Marker({
    position: { lat: 55.70875373527471, lng: 37.36439551470298 },
    map: map,
    // icon: image
  });
}
