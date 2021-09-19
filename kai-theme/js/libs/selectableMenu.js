(function ($) {
  "use strict";

  $.fn.selectableMenu = function (options) {

    var $this = $(this),
        defaults = {
          maxScreenWidth: 600,
          appendTo: null,
          selected: null
        },
        options = $.extend(defaults, options);

    return this.each(function () {
          var menu_holder = $('<div class="selectable_menu"></div>'),
              menu = $('<select></select>'),
              li_items = $this.children('li'),
              resizeTimeout;


          init();

          function init() {
            createMenu();
            //checkWidth();
            //transformMenu();
          }


          function createMenu() {
            createLevels(li_items);
            menu_holder.append(menu);

            if (options.appendTo) {
              $(options.appendTo).append(menu_holder);

            } else {
              $this.after(menu_holder)
            }

            menu.change(function () {
              if ($(this).val() != '') {
                window.location.href = $(this).val();
              }
            });
          }

          function createLevels(items, level) {
            $(items).each(function (i, li) {
              createLevel(li, level);
            });
          }

          function createLevel(li, level) {
            var link = $(li).children('a:first'),
                nested_menu = $(li).children('ul:first'),
                level = typeof level !== 'undefined' ? level : 0,
                text = link.text(),
                selected = '',
                prefix = '';

            for (var i = 0; i < level; i++){
              prefix+='&nbsp; &nbsp; &nbsp;';
            }


            if (text.length > 40){
              text = text.substring(0,60) + '...'
            }

            if (options.selected && ($(options.selected).get(0) === $(link).get(0) || $(options.selected).get(0) === $(li).get(0))) {
              selected = 'selected'
            }

            menu.append('<option value="' + link.attr('href') + '" ' + selected + '>' + prefix + text + '</option>');
            if (nested_menu.length) {
              createLevels(nested_menu.children('li'), ++level)
            }
          }


          function checkWidth() {
            var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

            if (width < options.maxScreenWidth) {
              $this.css("display", "none");
              $(menu).css("display", "block");
            } else {
              $this.css("display", "block");
              $(menu).css("display", "none");
            }
          }

          function transformMenu() {
            $(window)
                .on('resize', function () {
                  clearTimeout(resizeTimeout);
                  resizeTimeout = setTimeout(onresize, 100);
                });

            function onresize(){
              checkWidth();
            }
          }

        }
    )
        ;
  };
})
(jQuery);
