var owlLayersHtml;
var topOffset = 170;

//dom ready functions
$(function(){
  insert_map();
  insert_left();
  insert_top();
  create_layers_carousel();
  $('.layer').on('click', checkbox_when_clicked);
  $('.make-active').on('click', layer_active_clicked);
  $('ul[id^="accordion-"]').dcAccordion();
  $("#insert-left").on('click', '#layers-button', layers_qtip);
  $("#insert-left").on('click', '#search-by-category-button', search_by_category_qtip);
  $("#insert-top").on('click', '#search-by-address-button', searchByAddress_qtip);
  $("#insert-top").on('click', '.arrow-history-tree', showHistoryTree_qtip);
  $("#map").on('click', showAssets_qtip);
  $('#details-link').on('click', toggle_navbar);
  $('li.dcjq-parent-li').on('click', mimic_anchor_click);
});

function change_selectpicker_values() {
    $('.selectpicker').each(function() {
    var selectValue = $(this).attr('value');
    $(this).next().children('.btn').children('.filter-option').html(selectValue);
  });
}

function mimic_anchor_click(event) {
  if( event.target !== this ) return; //prevents trigger on other targets ie bubbling
  $(this).children('a').trigger('click');
}

function select_all() {
  $(this).parent().children('.selectpicker').selectpicker('selectAll');
}

function select_none() {
  $(this).parent().children('.selectpicker').selectpicker('deselectAll');
}

function oval_border_highlight(tab_id) {
  $('.oval').removeClass('current');
  $(tab_id).addClass('current');
}

function get_page_position() {
  var details = $('#bookmark_details').offset().top;
  var contact = $('#bookmark_contact').offset().top;
  var notes = $('#bookmark_notes').offset().top;
  var location = $('#bookmark_location').offset().top;

  if ($(window).scrollTop() >= (details - topOffset -50 ) ) {
    oval_border_highlight('#tab1');
  }
  if ($(window).scrollTop() >= (contact - topOffset -50) ) {
    oval_border_highlight('#tab2');
  }
  if ($(window).scrollTop() >= (notes - topOffset -50) ) {
    oval_border_highlight('#tab3');
  }
  if ($(window).scrollTop() >= (location - topOffset -50) ) {
    oval_border_highlight('#tab4');
  }
}

function toggle_referral() {
  $('.row').toggleClass('hidden');
  $('html body').animate({ scrollTop: 0 });
  $('#bookmark_referral').toggleClass('hidden');
  oval_border_highlight('#tab1');
  $('.referral-icon').toggleClass('current');
}

function add_cross_to_required_forms() {
  var required;
  var ovalName;
  var change_oval_colour;
  var allPanels = $('.form-horizontal');
  $(allPanels).each(function() {
    required = false
      $(this).find('.form-control').each(function() {
        if ($(this).attr('data-required')) {
          required = true
        }
      });
    if (required) {
      $(this).find('.insert-cross-icon').addClass('glyphicon-remove panel-cross');
      toggle_oval_colour( $(this), 'incomplete' );
      toggle_panel_num_colour( $(this), 'incomplete' );
    }
  });
}

function toggle_oval_colour( thisObj, className) {
  $(thisObj).parent().find('.text-circle').removeClass('incomplete complete').addClass(className);
  ovalName = '#' + $(thisObj).parents("div[id^='bookmark_']" ).attr('id');
      change_oval_colour = $("[data-href=" + ovalName + "]");
      if ($(change_oval_colour).attr('data-href') === ovalName ) {
        $(change_oval_colour).children('div').removeClass('incomplete complete').addClass(className);
      }
}

function toggle_panel_num_colour( thisObj, className) {
  console.log($(thisObj).parent().find('.text-circle'));
  $(thisObj).parent().find('.text-circle').removeClass('incomplete complete').addClass(className);
}

function check_panel_valid() {
  var icon = $(this).children().last();
  var rowValid = false;
  var panelValid = $(this).parsley( 'isValid' );
  var required = check_this_panel_required( $(this) );
  console.log("required = " + required);
  if (panelValid && required ) {
    $(icon).removeClass('glyphicon-remove panel-remove glyphicon-ok panel-ok').addClass('glyphicon-ok panel-ok');
    toggle_panel_num_colour( (this), 'complete' );
    $(this).parent().parent().parent().find('.form-panel').each(function() {
      if (!$(this).children('form').parsley('isValid')) {
        rowValid = false;
        return rowValid
      }
      else {
        rowValid = true;
      }
    });

    if (rowValid) {
      toggle_oval_colour( (this), 'complete' );
    }
  }

  if (panelValid === false) {
    $(icon).removeClass('glyphicon-remove panel-remove glyphicon-ok panel-ok').addClass('glyphicon-remove panel-remove');
    toggle_panel_num_colour( $(this), 'incomplete' );
  }

}

function check_this_panel_required(thisObj) {
  console.log(thisObj);
  var thisPanel = $(thisObj);
  var required = false
  $(thisPanel).each(function() {
    $(this).find('.form-control').each(function() {
      if ($(this).attr('data-required')) {
        required = true
        }
      });
    });
  return required;
}

function checkbox_when_clicked() {
  var checkbox = $(this).children().first().children().first();
  if ($(checkbox).parent().hasClass('no-deselect')) {
    return false;
  }
  $(checkbox).prop('checked', !checkbox.prop("checked"));
}

function layer_active_clicked() {
  var activate = $(this);
  if ($(activate).hasClass('active')) {
    return false;
  }
  else {
    $('.make-active').removeClass('active');
    $('.input-group').removeClass('no-deselect');
    $(activate).toggleClass('active');
    $(this).parent().children().first().addClass('no-deselect');
    var checkbox = $(this).parent().children().first().children().first();
    $(checkbox).prop('checked', true);
  }
}

function goto_forms()
{
  toggle_navbar();
  $('#insert-map').empty();
  $.get('forms/form_cr.html', function(data) {
    $('#insert-form').html(data);
    });
  $('#insert-form').trigger('create');
}

function insert_inspection_form()
{
  $('#insert-form').empty();
  $.get('forms/form_inspect.html', function(data) {
    $('#insert-form').html(data);
    });
}

function insert_defect_form()
{
  $('#insert-form').empty();
  $.get('forms/form_defect.html', function(data) {
    $('#insert-form').html(data);
    });
}

function goto_map()
{
  toggle_navbar();
  $('#insert-form').empty();
  $.get('MapLayer.html', function(data) {
    $('#insert-map').html(data);
    });
  $('#insert-map').trigger('create');
}

function toggle_navbar()
{
  $('.icon-map').toggleClass('hidden');
  $('.icon-form').toggleClass('hidden');
  $('.tab-shape').toggleClass('hidden');
  $('.left-bar-icons').toggleClass('hidden');
  $('.oval-text').toggleClass('hidden');
}


function show_fake_map()
{
  $('#mapstatic').attr('src', "images/OsmMap_Feature.png")
  $('.qtip-layers-panel').qtip('api').hide();
}

function check_form_location()
{
  if (!$('#bookmark-nav ul').hasClass('disabled')) {
    var href = $(this).attr('data-href');
    if (href === '#bookmark_details') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({scrollTop: scrollAmount }, 1500);
      oval_border_highlight('#tab1');
    }
    if (href === '#bookmark_contact') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab2');
    }
    if (href === '#bookmark_notes') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab3');
    }
    if (href === '#bookmark_location') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab4');
    }
  }
}


function create_layers_carousel()
{
  owlLayersHtml = $("#owl-example").owlCarousel({

    // Most important owl features
    items : 3,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [980,3],
    itemsTablet: [768,2],
    itemsTabletSmall: false,
    itemsMobile : [479,1],
    singleItem : false,
    itemsScaleUp : false,

    //Basic Speeds
    slideSpeed : 200,
    paginationSpeed : 800,
    rewindSpeed : 1000,

    //Autoplay
    autoPlay : false,
    stopOnHover : false,

    // Navigation
    navigation : true,
    navigationText : false,
    rewindNav : true,
    scrollPerPage : false,

    //Pagination
    pagination : true,
    paginationNumbers: true,

    // Responsive
    responsive: true,
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window,

    // CSS Styles
    baseClass : "owl-carousel",

    //Auto height
    autoHeight : false,

    //Transitions
    transitionStyle : false,
    })
  $('.owl-prev').addClass('arrow-left');
  $('.owl-next').addClass('arrow-right');
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
  $(".arrow-history-tree").toggleClass('myactive');
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

function insert_left()
{
  $.get('left_bar.html', function(data) {
    $('#insert-left').html(data);
    });
}

function insert_top()
{
  $.get('top_bar.html', function(data) {
    $('#insert-top').html(data);
    });
  $('#insert-top').trigger('create');
}

// inserts the first form into the form page on initial load of details page
function show_first_form()
{
  $.get('forms/form_cr.html', function(data) {
    $('#insert-form').html(data);
    });
  $('#insert-form').trigger('create');
  window.location = ('form.html'); //initial refresh
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
  goto_forms();
}