var MobileDevice = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    MobileDevice = true;
}

$(function () {
    if (Liferay.Browser.isIe() && Liferay.Browser.getMajorVersion() >= 11.0) {
        FastClick.attach(document.body);
    }

    restyleForCecutient();

    var $body = $('body');

    if (MobileDevice) {
        $body.addClass('mobile');
        //$('table').stacktable();
    }
    else {
        $body.addClass('desktop')
    }

    // меню личного кабинета
    $('.portlet-boundary_71_ .nav-menu > ul').selectableMenu({
        appendTo: '.portlet-boundary_71_ .portlet-body',
        selected: $('.portlet-boundary_71_ .nav-menu a.selected')
    });

    categories_menu();

    $(document)
        .ready(function() {
            var pageError = $('h3.alert-error');
            if(pageError.length) {
                if(pageError.parent().hasClass('portlet-content')) {
                    pageError.parent().addClass('section')
                }
            }
        })
        .on('click', '.tab_items .nav a', function (e) {
            e.preventDefault();
            var $holder = $(this).closest('.tab_items'),
                i = $(this).index();
            if ($(this).hasClass('active')) {
            } else {
                $(this).addClass('active').siblings().removeClass('active');
                $holder.find('.tabs .item').eq(i).addClass('active').siblings().removeClass('active');
            }
        })
        .on('click', '#menu_btn', function (e) {
            e.preventDefault();
            var $menu = $('#menu'),
                header = $('header');
            var lb = $('header .logo_box');
            $menu.css('top', lb.offset().top + lb.height() - header.offset().top);
            $menu.slideToggle(function () {
                if (!$menu.is(':visible')) {
                    $menu.attr('style', '');
                }
            });
        })
        .on('mouseup', function (e) {
            var container = $('#menu .menu-list > li');
            if (!container.is(e.target)
                && container.has(e.target).length === 0) {
                container.find('.sub').slideUp();
                container.removeClass('open');
                $('#blur').hide();
            }
        })
        .on('click', '#menu .menu-list > li > a, #menu .menu-list > li > span', function (e) {
            var $this = $(this),
                $menu = $('#menu'),
                $li = $this.closest('li'),
                $sub = $this.siblings('.sub');
            if ($sub.length) {
                e.preventDefault();

                if ($li.hasClass('open')) {
                    $sub.slideUp();
                    $li.removeClass('open');
                    $('#blur').hide();
                } else {
                    //console.log($menu.find('.sub').not($sub))
                    $menu.find('.sub').not($sub).each(function (i, item) {
                        $(item).slideUp(function () {
                            $(item).closest('li').removeClass('open');
                        });
                    });

                    $.when($menu).done(function () {
                        $('#blur').show();
                        $sub.slideDown(function () {
                            $li.addClass('open');
                        });
                    });
                }
            }
        })
        .on('click', '#login_btn', function (e) {
            show_popup('#login_popup');
            e.preventDefault();
            //var poURL = "/group/guest/privateoffice";
            //$.ajax(poURL)
            //    .done(function(responseText) {
            //        if (responseText != null && responseText.indexOf("portlet_58") == -1) {
            //            window.location = poURL;
            //        } else {
            //            show_popup('#login_popup');
            //        }
            //});
        })
        // popups
        .on('click', '#popup_wrapper .over', function () {
            $(this).siblings('.popup_box').hide();
            $('#popup_wrapper').hide();
        })
        .on('click', '.popup_box .close', function (e) {
            e.preventDefault();
            $(this).closest('.popup_box').hide();
            $('#popup_wrapper').hide();
        })
        // search field
        .on('click', '.search_box .search_btn', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $(this).closest('.search_box').find('.search_form').fadeIn();
        })
        .on('submit', '.aui header .search_box .search_form', function (e) {
            var input = $(this).find('.search_text');
            if (input.val().length == 0) {
                $('header .search_box .search_form').fadeOut(function () {
                    $(this).attr('style', '');
                });
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
        })
        .on('click', function (e) {
            if ($('.search_box .search_btn').is(':visible') && $('header .search_box .search_form').is(':visible')
                && $(e.target).closest('.search_box').length == 0) {
                $('header .search_box .search_form').fadeOut(function () {
                    $(this).attr('style', '');
                });
            }
        });


    function show_popup(query) {
        var $pw = $('#popup_wrapper'),
            $popup = $pw.find(query);

        if ($popup.length) {
            $popup.show();
            $pw.show();
        }

    }

    $(window).scroll(function () {
        if ($(this).scrollTop() != 0)
            $('#toTop').fadeIn();
        else
            $('#toTop').fadeOut();
    });
    $('#toTop').click(function () {
        $('body,html').animate({scrollTop: 0}, 50);
    });

    $('#lang-btn .current').click(function (e) {
        $('#lang-btn').toggleClass('open');
    });
    $(document).on('click', function (e) {
        if ($(e.target).closest('.lang-btn').length == 0) {
            $('#lang-btn').removeClass('open');
        }
    });

    $('#langRu').click(function (e) {
        e.preventDefault();
        langURL = "/?p_p_id=82&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_pos=1&p_p_col_count=2&_82_struts_action=%2Flanguage%2Fview&_82_redirect=%2Fweb%2Fguest%2Fmain&_82_languageId=ru_RU";
        $.ajax(langURL).done(function (responseText) {
            window.location.reload();
        });
    });

    $('#langEn').click(function (e) {
        e.preventDefault();
        langURL = "/?p_p_id=82&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_pos=1&p_p_col_count=2&_82_struts_action=%2Flanguage%2Fview&_82_redirect=%2Fweb%2Fguest%2Fmain&_82_languageId=en_US";
        $.ajax(langURL).done(function (responseText) {
            window.location.reload();
        });
    });

    $('#btnHidePOMenu').click(function(e) {
        e.preventDefault();
        $(this).hide("slow");
        $('#btnShowPOMenu').show("slow");
        $('#column-1').animate(
            {"width": "43px"},
            {
                duration:'slow',
                done: function() {
                    $(this).find('.nav-menu').addClass('nav-menu-hidden')
                }
            }
        ).find('li.selected').first().animate({"height": "43px"}, 'slow');
        $('#column-2').animate(
            {"width": "91%"},
            {
                duration:'slow'
            }
        );
    });

    $('#btnShowPOMenu').click(function(e) {
        e.preventDefault();
        $('#btnHidePOMenu').show("slow");
        $(this).hide("slow");
        var col1 = $('#column-1').animate(
            {"width": "30%"},
            {
                duration:'slow',
                done : function() {
                    $(this).removeAttr('style');
                }
            }
        );
        col1.find('.nav-menu').removeClass('nav-menu-hidden');
        col1.find('li.selected').first().animate(
            {"height": "200px"},
            {
                duration:'slow',
                done : function() {
                    $(this).removeAttr('style')
                }
            }
        );
        $('#column-2').animate(
            {"width": "65%"},
            {
                duration:'slow',
                done : function() {
                    $(this).removeAttr('style')
                }
            }
        );

    });

    var onOver = function (node) {
        node.on('mouseover', function () {

            var nav = $(this).parent().parent();

            if (nav.hasClass('nav-menu-hidden')) {
                node.off();

                var div = $('<div class="nav-menu pop-up" style="z-index: 10000;height:0;"/>');
                var ul = $('<ul class="layouts all-levels" />');
                div.append(ul);
                var copy = node.clone();
                ul.append(copy);
                $('body').append(div);
                div.position(
                    {
                        my: "left top",
                        at: "right-78 top",
                        of: $(this),
                        collision: 'none none'
                    }
                );
                div.show( "fold", 1000);
                div.on('mouseleave', function () {
                    $(this).remove();
                    onOver(node);
                })
            }
        })
    };

    $('.nav-menu > .layouts > li.open').each(function (node) {
        onOver($(this));
    });

    $(window).resize(function () {
        if (typeof loadInstagramImages === "function") {
            var iw = $('body').innerWidth();
            lineQty = Math.round(iw / 186 + 1);
            $('#instagramListWrapper').css('width', lineQty * 186);
            loadInstagramImages(String(lineQty * 2));
        }
    });

    YUI().use(
        'aui-tooltip',
        function (Y) {
            new Y.TooltipDelegate(
                {
                    trigger: 'a.tooltip-link',
                    position: 'bottom'
                }
            );
        }
    );

    function categories_menu() {
        var trigger = $('#menu_btn'),
            enabled = false;

        define_dropdown();

        $(window).on('resize', function () {
            define_dropdown();
        });

        $(document)
            .on('change', '.items_categories_dropdown select', function () {
                var $this = $(this);
                window.location = $this.val();
                $this.closest('.items_categories_dropdown').attr('data-value', $this.find('option:selected').text())
            });

        function define_dropdown() {
            if (trigger.is(':visible')) {
                if (enabled) return;

                $('.items_categories').each(function (i, item) {
                    var $this = $(item),
                        $dropdown = $this.next('.items_categories_dropdown'),
                        $select, $option;
                    if ($dropdown.length) {
                        $dropdown.show();
                        $this.hide();
                        return;
                    }
                    $dropdown = $('<div class="items_categories_dropdown"/>');
                    $select = $('<select></select>');
                    $(item).find('a').each(function (n, link) {
                        $option = $('<option value="' + $(link).attr('href') + '">' + $.trim($(link).text()) + '</option>');
                        if ($(link).hasClass('active'))  $option.attr('selected', 'selected');
                        $select.append($option);
                    });
                    $dropdown.append($select);
                    $dropdown.attr('data-value', $select.find('option:selected').text());
                    $this.after($dropdown);
                    $this.hide();
                });
                enabled = true;
            } else {

                if (!enabled) return;

                $('.items_categories_dropdown').hide();
                $('.items_categories').show();
                enabled = false;
            }
        }
    }

    $('#large_view_btn').click(function (e) {
        e.preventDefault();
        if (getCookie("largeView") == "true") {
            setCookie("largeView", false);
            $body.removeClass('large_view color1 color2 color3 color4 color5 fontsize-small fontsize-normal fontsize-big images-no images-yes').addClass('normal_view');
            window.location.reload();
        } else {
            setCookie("largeView", true);
            $body.removeClass('normal_view').addClass('large_view');
            if (getCookie('blind-font-size') == "" || getCookie('blind-colors') == "" || getCookie('blind-images') == "") {
                setCookie('blind-font-size', 'fontsize-normal');
                setCookie('blind-colors', 'color1');
                setCookie('blind-images', 'images-no');
            }
            restyleForCecutient();
            set_font_size();
            set_images();
            set_colors();

        }
    });

    $(document)
        .on('click', '.a-fontsize a', function (e) {
            e.preventDefault();
            var fontsize = $(this).attr('rel');
            setCookie('blind-font-size', fontsize);
            set_font_size();
        })
        .on('click', '.a-images a', function (e) {
            e.preventDefault();
            var images = $(this).attr('rel');
            setCookie('blind-images', images);
            set_images();
        })
        .on('click', '.a-colors a', function (e) {
            e.preventDefault();
            var clr = $(this).attr('rel');
            setCookie('blind-colors', clr);
            set_colors();
            restyleForCecutient();
        });

    function set_font_size() {
        $body.removeClass('fontsize-small fontsize-normal fontsize-big').addClass(getCookie('blind-font-size'));
    }

    function set_colors() {
        $('body').removeClass('color1 color2 color3 color4 color5').addClass(getCookie('blind-colors'));
    }

    function set_images() {
        $('body').removeClass('images-no images-yes').addClass(getCookie('blind-images'));
    }
    function setCookie(cname, cvalue) {
        document.cookie = cname + "=" + cvalue + "; path=/";
    }
    function restyleForCecutient() {
        if (getCookie("largeView") == "true") {
             var color = getCookie('blind-colors');
             var textcolor = '#000';
             var bgcolor = '#fff';
             switch (color) {
               case 'color1':
                  textcolor = '#000';
                  bgcolor = '#fff';
                 break
               case 'color2':
                  textcolor = '#063462';
                  bgcolor = '#9dd1ff';
                 break
               case 'color3':
                  textcolor = '#59422e';
                  bgcolor = '#f7f3d6';
                 break
                case 'color4':
                  textcolor = '#fff';
                  bgcolor = '#000';
                  break
                case 'color5':
                  textcolor = '#ade338';
                  bgcolor = '#3b2716';
                   break
             }
             var  elems = document.getElementsByTagName( '*' );
             for( var i =0, elem; elem = elems[ i++ ]; ) {
                 if (elem.getAttribute('bgcolor') ){
                   elem.bgColor = bgcolor;
                   }
                   if ( elem.getAttribute('style') ) {
                       if (elem.style.color != '' ){
                         elem.style.color = textcolor;
                           }

                       if (elem.style.backgroundColor != ''){
                         elem.style.backgroundColor = bgcolor;
                       }

                       if (elem.style.borderColor != ''){
                         elem.style.borderColor = textcolor;
                       }
                   }
                 }
        }
     }
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

});