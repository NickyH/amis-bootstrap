var owlLayersHtml;

$(function(){

  // is_jqm_loaded();

  insert_map();
  $('#details-link').on('click', show_first_form);
  $('#refresh-map').on('click', refresh_map);
  create_layers_carousel();
  $("#layers-button").on('click', layers_qtip);
  $("#search-by-category-button").on('click', search_by_category_qtip);
  $("#search-by-address-button").on('click', searchByAddress_qtip);
  $("#map").on('click', showAssets_qtip);
  $(".arrow-history-tree").on('click', showHistoryTree_qtip);

  $(window).hashchange(check_form_location);

  $("#show-tab").on('click', show_active_tab);
  $("#show-tab").trigger('click'); //triggers click to show content on first tab on page load

  $("#select-layer-fake").on('click', show_fake_map);
});


function show_fake_map()
{
  $('#mapstatic').attr('src', "images/OsmMap_Feature.png")
  $('.qtip-layers-panel').qtip('api').hide();
}

function is_jqm_loaded()
{
    if ( $.mobile ) {
     alert('loaded');
  } else {
    alert('not loaded');
  }
}

function check_form_location()
{
  if (document.location.hash === '#details_bookmark') {
    $('html, body').animate({ scrollTop: 50});
    $('.tab img').removeClass('current');
    $('#tab1').addClass('current');
  }
  else if (document.location.hash === '#location_bookmark') {
    $('html, body').animate({ scrollTop: 400});
    $('.tab img').removeClass('current');
    $('#tab2').addClass('current');
  }
  else if (document.location.hash === '#notes_bookmark') {
    $('html, body').animate({ scrollTop: 1200});
    $('.tab img').removeClass('current');
    $('#tab3').addClass('current');
  }
}


function create_layers_carousel()
{
  owlLayersHtml = $("#owl-example").owlCarousel({

    // Most important owl features
    items : 5,
    // itemsDesktop : [1199,4],
    // itemsDesktopSmall : [980,3],
    // itemsTablet: [768,2],
    // itemsTabletSmall: false,
    // itemsMobile : [479,1],
    // singleItem : false,

    //Basic Speeds
    slideSpeed : 200,

    //Autoplay
    autoPlay : false,

    // Navigation
    navigation : false,
    rewindNav : true,
    scrollPerPage : false,

    //Pagination
    pagination : true,
    paginationNumbers: false,

    // Responsive
    responsive: true,
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window,

    // CSS Styles
    baseClass : "owl-carousel",
    theme : "owl-theme",

    //Transitions
    transitionStyle : false,
    })
}


function layers_qtip()
{
  $(this).qtip({
      content: {
        text: $('.layers-owl-wrapper'),
        button: 'Close'
      },
      show: {
          modal: {
              on: true,
              solo: true
          },

          ready: true,
          event: 'click',
          effect: function (offset) {
              $(this).slideDown(300);
          }
      },
      events: {
        show: function(event, api) {
        }
      },
      style: {
          classes: 'qtip-layers-panel qtip-rounded qtip-shadow qtip-light',
          tip: {
            corner: 'center left',
            width: 100,
            height: 100,
            offset: 100
        }
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
          }
      },
      overwrite: false,
      position: {
          my: 'center left',
          at: 'top right',
          target: $(this),
          adjust: {
            scroll: true // Can be ommited (e.g. default behaviour)
        }
      },
      api: {
          onContentLoaded: $('.item').each(function () {
              $(this).attr('style', 'width: 250px; height: 250px;');
          })
      }
  });
}

function searchByAddress_qtip()
{
  $(this).qtip({
      content: {
        text: '<div data-role="fieldcontain" style="margin-top: 40px;">' +
              '<input type="search" name="search-2" id="search-2" value="" style="width: 200px; margin-left:30px;" /></div>' +
              '<input type="submit" value="Search Address" class="form-button save-button"' +
              'data-role="button" style="background-color: #2584cd; border-radius: 20px;' +
              'width: 200px; height: 25px; font: 16px arial, sans serif; margin-top: 20px;' +
              'margin-right: auto; margin-left: 30px;" />',
        button: 'Close'
      },
      render: function (event, api) {
          // Grab the content
          var content = api.elements.content;
          // Now it's is rendered, we can...
          content.otherPlugin(); // ...Call our other plugins to act on its contents
          $(this, content).otherPlugin(); // ...or a subset of it's contents!
      },
      show: {
          modal: {
              on: true,
              solo: true
          },

          ready: true,
          event: 'click',
          effect: function (offset) {
              $(this).slideDown(300);
          }
      },
      events: {
        show: function(event, api) {
        }
      },
      style: {
          classes: 'qtip-address-panel qtip-rounded qtip-shadow qtip-light',
          tip: {
            corner: 'center left',
            width: 100,
            height: 100,
            offset: 100,
            x: 100,
            y: 200
        }
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
          }
      },
      overwrite: false,
      position: {
          my: 'top right',
          at: 'bottom left',
          target: $('#search-by-address-button'),
          adjust: {
            scroll: true, // Can be ommited (e.g. default behaviour)
            x: 20,
            y: 20
        }
      }
  });
  $('#address-search-panel').removeClass('invisible');
}

function showAssets_qtip()
{
  $(this).qtip({
      content: {
        text: '<div id="featureInfoGridPopup">' +
              '<a href="#" data-rel="back" data-role="button" data-icon="delete" data-iconpos="notext" class="ui-btn-right"></a>' +
              '<div id="featureInfoGrid">' +
              '<table id="infoPopupTable" data-role="table" data-mode="reflow" class="ui-responsive table-stroke" style="border-style: none;">' +
              '<tr>' +
              '<th></th>' +
              '<th>Feature Type</th>' +
              '<th>Feature Label</th>' +
              '<th>Latitude</th>' +
              '<th>Longitude</th>' +
              '</tr>' +
              '<tr onclick="openActionRow(this)">' +
              '<td>' +
              '<input type="checkbox" data-role="none" /></td>' +
              '<td>Emergency Phone</td>' +
              '<td>00120</td>' +
              '<td>-3755756.95841561</td>' +
              '<td>12895866.7461108</td>' +
              '</tr>' +
              '<tr style="display:none;">' +
              '<td colspan="5">' +
              '<div data-role="controlgroup" data-type="horizontal" class="button-row">' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-settings" src="images/icons/icon_settings_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-tasks" src="images/icons/icon_task_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-defects" src="images/icons/icon_defect_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-request" src="images/icons/icon_request_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-assets" src="images/icons/icon-search-by-number.png"></a>' +
              '</div>' +
              '</td>' +
              '</tr>' +
              '<tr onclick="openActionRow(this)">' +
              '<td>' +
              '<input type="checkbox" data-role="none" /></td>' +
              '<td>Emergency Phone</td>' +
              '<td>00120</td>' +
              '<td>-3755756.95841561</td>' +
              '<td>12895866.7461108</td>' +
              '</tr>' +
              '<tr style="display:none;">' +
              '<td colspan="5">' +
              '<div data-role="controlgroup" data-type="horizontal" class="button-row">' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-settings" src="images/icons/icon_settings_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-tasks" src="images/icons/icon_task_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-defects" src="images/icons/icon_defect_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-request" src="images/icons/icon_request_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-assets" src="images/icons/icon-search-by-number.png"></a>' +
              '</div>' +
              '</td>' +
              '</tr>' +
              '<tr onclick="openActionRow(this)">' +
              '<td>' +
              '<input type="checkbox" data-role="none" /></td>' +
              '<td>Emergency Phone</td>' +
              '<td>00120</td>' +
              '<td>-3755756.95841561</td>' +
              '<td>12895866.7461108</td>' +
              '</tr>' +
              '<tr style="display:none;">' +
              '<td colspan="5">' +
              '<div data-role="controlgroup" data-type="horizontal" class="button-row">' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-settings" src="images/icons/icon_settings_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-tasks" src="images/icons/icon_task_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-defects" src="images/icons/icon_defect_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-request" src="images/icons/icon_request_black.png"></a>' +
              '<a data-role="button" href="#" onclick="open_form_from_asset()"><img class="top-bar-icons icon-small icon-assets" src="images/icons/icon-search-by-number.png"></a>' +
              '</div>' +
              '</td>' +
              '</tr>' +
              '</table>' +
              '</div>' +
              '</div>',
        button: 'Close'
      },
      render: function (event, api) {
          // Grab the content
          var content = api.elements.content;
          // Now it's is rendered, we can...
          content.otherPlugin(); // ...Call our other plugins to act on its contents
          $(this, content).otherPlugin(); // ...or a subset of it's contents!
      },
      show: {
          modal: {
              on: true,
              solo: true
          },

          ready: true,
          event: 'click',
          effect: function (offset) {
              $(this).slideDown(300);
          }
      },
      events: {
        show: function(event, api) {
        }
      },
      style: {
          classes: 'qtip-assets-select qtip-rounded qtip-shadow qtip-light',
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
          }
      },
      overwrite: false,
      position: {
          my: 'center center',
          at: 'center center',
          adjust: {
            scroll: true, // Can be ommited (e.g. default behaviour)
            x: 20,
            y: 20
        }
      }
  });
}

function showHistoryTree_qtip()
{
  toggle_arrow();
  $(this).qtip({
    content: {
      text: '<div id="processTreePanel">' +
              '<div id="processTreeContainer">' +
              '<div class="css-treeview">' +
              '<li class="no-list">' +
              '<div class="tree-header"><input type="checkbox" checked="checked"><label for="2c20eb11-0495-e211-9759-00a0d5ffffae"><a href="#">EmergencyPhone (00108)</a></label><ul></div>' +
              '<li class="no-list">' +
              '<div class="tree-header"><input type="checkbox" checked="checked"><label for="f8bb31c4-3564-4c0d-b814-b05b51e2035e"><a href="#">Customer Request (IDENTIFIED)</a></label><ul></div>' +
              '<li class="no-list"><img src="images/expanded-arrow.png" class="expanded-arrow"><a href="#" class="isClosed">Inspection (2.919, 04/09/2013)</a></li>' +
              '<li class="no-list"><img src="images/expanded-arrow.png" class="expanded-arrow"><a href="#">Defect (IDENTIFIED)</a></li>' +
              '<li class="no-list"><img src="images/expanded-arrow.png" class="expanded-arrow"><a href="#">Defect (IDENTIFIED)</a></li>' +
              '</ul>' +
              '</li>' +
              '<li class="no-list"><img src="images/expanded-arrow.png" class="expanded-arrow"><a href="#" class="isClosed">Inspection (1.919, 04/09/2013)</a></li>' +
              '<li class="no-list"><img src="images/expanded-arrow.png" class="expanded-arrow"><a href="#" class="isClosed">Inspection (14.555, 01/07/2013)</a></li>' +
              '<li class="no-list"><img src="images/expanded-arrow.png" class="expanded-arrow"><a href="#" class="isClosed">Task (COMPLETED)</a></li>' +
              '</ul>' +
              '</li>' +
              '</div>' +
              '</div>' +
              '<div id="showClosedContainer">' +
              '<div class="ui-checkbox">' +
              '<label data-corners="true" data-shadow="false" data-iconshadow="true" data-wrapperels="span" data-icon="checkbox-on" data-theme="b" data-mini="false" class="ui-checkbox-on ui-btn ui-btn-up-b ui-btn-corner-all ui-fullsize ui-btn-icon-left">' +
              '<span class="ui-btn-inner"><span class="ui-btn-text">Show Closed' +
              '</span><span class="ui-icon ui-icon-checkbox-on ui-icon-shadow">&nbsp;</span></span></label><input type="checkbox" data-corners="false" data-theme="b" id="chkShowClosed">' +
              '</div>' +
              '</div>' +
              '</div>',
    button: 'Close'
    },
    show: {
        modal: {
            on: true,
            solo: true
        },

        ready: true,
        event: 'click',
        effect: function (offset) {
            $(this).slideDown(300);
        }
    },
    events: {
      show: function(event, api) {
      }
    },
    style: {
        classes: 'qtip-history-tree qtip-rounded qtip-shadow qtip-light',
        tip: {
          corner: 'center left',
          width: 100,
          height: 100,
          offset: 100
      }
    },
    hide: {
        event: 'click',
        effect: function () {
            $(this).slideUp(300);
        }
    },
    events:{
            hide: function(event, api){
              toggle_arrow();
            }
          },
    overwrite: false,
    position: {
        my: 'top left',
        at: 'bottom right',
        target: $(this),
        adjust: {
          scroll: true // Can be ommited (e.g. default behaviour)
      }
    },
    api: {
        onContentLoaded: $('.item').each(function () {
            $(this).attr('style', 'width: 250px; height: 250px;');
        })
    }
  });
}

function toggle_arrow()
{
  $(".arrow-history-tree").toggleClass('active');
}


function search_by_category_qtip()
{
  $(this).qtip({
      content: {
        text: '<div class="panel-item category-panel">' +
              '<ul><li class="lyr ctgry"><div class="layer-text-category">Category 1 <i class="icon-long-arrow-down"></i></div></li>' +
              '<li class="lyr ctgry"><div class="layer-text-category">Category 2 <i class="icon-long-arrow-down"></i></div></li>' +
              '<li class="lyr ctgry"><div class="layer-text-category">Category 3 <i class="icon-long-arrow-down"></i></div></li>' +
              '<li class="lyr ctgry"><div class="layer-text-category">Category 4 <i class="icon-long-arrow-down"></i></div></li>' +
              '<li class="lyr ctgry"><div class="layer-text-category">Category 5 <i class="icon-long-arrow-down"></i></div></li>' +
              '<li class="lyr ctgry"><div class="layer-text-category">Category 6 <i class="icon-long-arrow-down"></i></div></li>' +
              '<li class="lyr ctgry"><div class="layer-text-category">Category 7 <i class="icon-long-arrow-down"></i></div></li>' +
              '<li class="lyr ctgry"><div class="layer-text-category">Category 8 <i class="icon-long-arrow-down"></i></div></li>' +
              '<li class="lyr ctgry"><div class="layer-text-category">Category 9 <i class="icon-long-arrow-down"></i></div></li>' +
              '</ul></div>',
        button: 'Close'
      },
      show: {
          modal: {
              on: true,
              solo: true
          },

          ready: true,
          event: 'click',
          effect: function (offset) {
              $(this).slideDown(300);
          }
      },
      events: {
        show: function(event, api) {
        }
      },
      style: {
          classes: 'qtip-search-category qtip-rounded qtip-shadow qtip-light',
          tip: {
            corner: 'center left',
            width: 100,
            height: 100,
            offset: 100
        }
      },
      hide: {
          event: 'click',
          effect: function () {
              $(this).slideUp(300);
          }
      },
      overwrite: false,
      position: {
          my: 'center left',
          at: 'top right',
          target: $(this),
          adjust: {
            scroll: true // Can be ommited (e.g. default behaviour)
        }
      },
      api: {
          onContentLoaded: $('.item').each(function () {
              $(this).attr('style', 'width: 250px; height: 250px;');
          })
      }
  });
}



$(function(){
  $("#map-link").on('click', refresh_map);
});

// add current class to image pages-icons class on click
function show_active_tab()
{
  $(this).children('img').addClass("current");
  event.stopPropagation();
  show_form();
}

// change content on tab click
function change_tab_content()
{
  $('.pages-icons').removeClass("current");
  $(this).addClass('current');
}

function insert_map()
{
  $.get('MapLayer.html', function(data) {
    $('#insert-map').html(data);
    });
  $('#insert-map').trigger('create');
}

// inserts the first form into the form page on initial load of details page
function show_first_form()
{
  $.get('forms/form_asset.html', function(data) {
    $('#insert-form').html(data);
    });
  $('#insert-form').trigger('create');
  window.location = ('form.html'); //initial refresh
}

// inserts the form into the form page on initial load of details page
function show_form()
{
  $.get('forms/form_asset.html', function(data) {
    $('#insert-form').html(data);
    });
  $('#insert-form').trigger('create');
}

function refresh_map()
{
  window.location = ('index.html');
}

function openActionRow(row) {
            $('#infoPopupTable tbody tr').each(function () {
                $(this).removeClass('actionRow');

                // Collapse all previous rows
                if ($(this).attr('onclick') != null) {
                    if ($(this).next('tr').is(':visible')) {
                        $(this).next('tr').slideRow('up');
                    }
                }
            });

            // Highlight current selected row
            $(row).addClass('actionRow');

            var nextRow = $(row).next('tr');

            if ($(nextRow).is(':visible')) {
                $(nextRow).slideRow('up');
            } else {
                $(nextRow).slideRow('down');
            }
        }

/* Custom animation for a table row to slide up or down */
(function ($) {
    var sR = {
        defaults: {
            slideSpeed: 400,
            easing: false,
            callback: false
        },
        thisCallArgs: {
            slideSpeed: 400,
            easing: false,
            callback: false
        },
        methods: {
            up: function (arg1, arg2, arg3) {
                if (typeof arg1 == 'object') {
                    for (p in arg1) {
                        sR.thisCallArgs.eval(p) = arg1[p];
                    }
                } else if (typeof arg1 != 'undefined' && (typeof arg1 == 'number' || arg1 == 'slow' || arg1 == 'fast')) {
                    sR.thisCallArgs.slideSpeed = arg1;
                } else {
                    sR.thisCallArgs.slideSpeed = sR.defaults.slideSpeed;
                }
                if (typeof arg2 == 'string') {
                    sR.thisCallArgs.easing = arg2;
                } else if (typeof arg2 == 'function') {
                    sR.thisCallArgs.callback = arg2;
                } else if (typeof arg2 == 'undefined') {
                    sR.thisCallArgs.easing = sR.defaults.easing;
                }
                if (typeof arg3 == 'function') {
                    sR.thisCallArgs.callback = arg3;
                } else if (typeof arg3 == 'undefined' && typeof arg2 != 'function') {
                    sR.thisCallArgs.callback = sR.defaults.callback;
                }
                var $cells = $(this).find('td');
                $cells.wrapInner('<div class="slideRowUp" />');
                var currentPadding = $cells.css('padding');
                $cellContentWrappers = $(this).find('.slideRowUp');
                $cellContentWrappers.slideUp(sR.thisCallArgs.slideSpeed, sR.thisCallArgs.easing).parent().animate({
                    paddingTop: '0px',
                    paddingBottom: '0px'
                }, {
                    complete: function () {
                        $(this).children('.slideRowUp').replaceWith($(this).children('.slideRowUp').contents());
                        $(this).parent().css({ 'display': 'none' });
                        $(this).css({ 'padding': currentPadding });
                    }
                });
                var wait = setInterval(function () {
                    if ($cellContentWrappers.is(':animated') === false) {
                        clearInterval(wait);
                        if (typeof sR.thisCallArgs.callback == 'function') {
                            sR.thisCallArgs.callback.call(this);
                        }
                    }
                }, 100);
                return $(this);
            },
            down: function (arg1, arg2, arg3) {
                if (typeof arg1 == 'object') {
                    for (p in arg1) {
                        sR.thisCallArgs.eval(p) = arg1[p];
                    }
                } else if (typeof arg1 != 'undefined' && (typeof arg1 == 'number' || arg1 == 'slow' || arg1 == 'fast')) {
                    sR.thisCallArgs.slideSpeed = arg1;
                } else {
                    sR.thisCallArgs.slideSpeed = sR.defaults.slideSpeed;
                }
                if (typeof arg2 == 'string') {
                    sR.thisCallArgs.easing = arg2;
                } else if (typeof arg2 == 'function') {
                    sR.thisCallArgs.callback = arg2;
                } else if (typeof arg2 == 'undefined') {
                    sR.thisCallArgs.easing = sR.defaults.easing;
                }
                if (typeof arg3 == 'function') {
                    sR.thisCallArgs.callback = arg3;
                } else if (typeof arg3 == 'undefined' && typeof arg2 != 'function') {
                    sR.thisCallArgs.callback = sR.defaults.callback;
                }
                var $cells = $(this).find('td');
                $cells.wrapInner('<div class="slideRowDown" style="display:none;" />');
                $cellContentWrappers = $cells.find('.slideRowDown');
                $(this).show();
                $cellContentWrappers.slideDown(sR.thisCallArgs.slideSpeed, sR.thisCallArgs.easing, function () { $(this).replaceWith($(this).contents()); });
                var wait = setInterval(function () {
                    if ($cellContentWrappers.is(':animated') === false) {
                        clearInterval(wait);
                        if (typeof sR.thisCallArgs.callback == 'function') {
                            sR.thisCallArgs.callback.call(this);
                        }
                    }
                }, 100);
                return $(this);
            }
        }
    };
    $.fn.slideRow = function (method, arg1, arg2, arg3) {
        if (typeof method != 'undefined') {
            if (sR.methods[method]) {
                return sR.methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }
    };
})(jQuery);



function open_form_from_asset()
{
  show_first_form();
}