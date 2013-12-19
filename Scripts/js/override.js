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
  $("#insert-left").on('click', '.search-icon', search_by_number_qtip);
  $("#insert-top").on('click', '#search-by-address-button', searchByAddress_qtip);
  $("#map").on('click', showAssets_qtip);
  $('#details-link').on('click', form_navbar);
  $('li.dcjq-parent-li').on('click', mimic_anchor_click);
  $('.category-checkbox').on('click', uncheck_all_others);
});

function refresh_history_accordion() {
  event.preventDefault();
  $('.history-tree-wrapper').removeClass('invisible');
}

function uncheck_all_others() {
  $('.category-checkbox input[type="checkbox"]').removeAttr('checked');
  $(this).attr('checked', 'checked');
}

function show_member_timesheet() {
  event.preventDefault();
  $('.member-timesheet-panel').toggleClass('hidden');
}

function show_task_map() {
  bootbox.confirm('<img class="temp-task-map" src="../../Content/images/OsmMap_Feature.PNG">', function (response) {});
}

function highlight_current_break() {
  event.preventDefault();
  $('.breaks-row.current-break').removeClass('current-break');
  console.log($(this).parents());
  $(this).parents('.breaks-row').addClass('current-break');
}

function highlight_current_task() {
  event.preventDefault();
  $('.task-row.current-task').removeClass('current-task');
  console.log($(this).parents());
  $(this).parents('.task-row').addClass('current-task');
}

function open_address_book() {
  bootbox.dialog({
    message: "Search for contacts...",
    title: "Contact Address Book",
    buttons: {
      success: {
        label: "Search",
        className: "btn-success",
        callback: function() {
          Example.show("great success");
        }
      },
      danger: {
        label: "Cancel",
        className: "btn-danger",
        callback: function() {
          Example.show("uh oh, look out!");
        }
      },
      main: {
        label: "Done",
        className: "btn-primary",
        callback: function() {
          Example.show("Primary button");
        }
      }
    }
  });
}

function open_current_contact_row() {
  if ($(this).hasClass('row-open')) {
    $(this).removeClass('row-open');
    $(this).next('tr').remove();
  } else if (!$(this).hasClass('row-open')) {
    $(this).addClass('row-open');
    $(this).after("<tr class='reference-details'><td colspan='8'><span>Vivamus ut arcu" +
      "posuere, molestie quam et, rhoncus diam. Nunc suscipit porta urna, tincidunt" +
      "vehicula libero elementum sed. Aliquam vestibulum blandit tortor. Curabitur" +
      "dolor eget odio ultricies adipiscing et vel ante.</span></td></tr>");
  }
}

function skip_to_details() {
  var details = $('#bookmark_details').offset().top;
  $(window).scrollTop((details - 200));
}

function warn_cancel_form() {
  bootbox.confirm('Are you sure you want to cancel all changes made to this form?', function (response) {
    if(response) {
      window.location = '/';
    }
  });
}

function warn_close_form() {
  bootbox.confirm('This will permanently close off this issue', function (response) {
    if(response) {
      window.location = '/';
    }
  });
}

function disable_datepickers() {
  $('.input-group-addon').each( function() {
    var disabled = $(this).parents('.input-group').children('.hasDatepicker').attr('disabled');
    if (disabled === 'disabled') {
      $(this).parents('.input-group').children('.hasDatepicker').datepicker('disable');
    }
  });
}

function table_search(thisObj, tableID) {
  var $rows = $("#"+tableID+" tr");
  var val = '^(?=.*\\b' + $.trim($(thisObj).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
      reg = RegExp(val, 'i'),
      text;

  $rows.show().filter(function() {
      text = $(this).text().replace(/\s+/g, ' ');
      return !reg.test(text);
  }).hide();
  $('thead tr').show();
}

function calendar_icon_click() {
  $(this).parent().children('.form-control').datetimepicker('show');
}

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

function get_CR_page_position() {
  var location = $('#bookmark_location').offset().top;
  var details = $('#bookmark_details').offset().top;
  var contact = $('#bookmark_contact').offset().top;
  var notes = $('#bookmark_notes').offset().top;
  var closeout = $('#bookmark_closeout').offset().top;

  if ($(window).scrollTop() >= (location - topOffset -50) ) {
    oval_border_highlight('#tab1');
  }
  if ($(window).scrollTop() >= (details - topOffset -50 ) ) {
    oval_border_highlight('#tab2');
  }
  if ($(window).scrollTop() >= (contact - topOffset -50) ) {
    oval_border_highlight('#tab3');
  }
  if ($(window).scrollTop() >= (notes - topOffset -50) ) {
    oval_border_highlight('#tab4');
  }
  if ($(window).scrollTop() >= (closeout - topOffset -50) ) {
    oval_border_highlight('#tab5');
  }
}

function get_defect_page_position() {
  var details = $('#bookmark_details').offset().top;
  var condition = $('#bookmark_condition').offset().top;
  var notes = $('#bookmark_notes').offset().top;
  var location = $('#bookmark_location').offset().top;

  if ($(window).scrollTop() >= (details - topOffset -50 ) ) {
    oval_border_highlight('#tab1');
  }
  if ($(window).scrollTop() >= (condition - topOffset -50) ) {
    oval_border_highlight('#tab3');
  }
  if ($(window).scrollTop() >= (notes - topOffset -50) ) {
    oval_border_highlight('#tab4');
  }
  if ($(window).scrollTop() >= (location - topOffset -50) ) {
    oval_border_highlight('#tab5');
  }
}

function get_inspection_page_position() {
  var location = $('#bookmark_location').offset().top;
  var details = $('#bookmark_details').offset().top;
  var contact = $('#bookmark_contact').offset().top;
  var notes = $('#bookmark_notes').offset().top;
  var closeout = $('#bookmark_closeout').offset().top;

  if ($(window).scrollTop() >= (location - topOffset -50) ) {
    oval_border_highlight('#tab1');
  }
  if ($(window).scrollTop() >= (details - topOffset -50 ) ) {
    oval_border_highlight('#tab2');
  }
  if ($(window).scrollTop() >= (contact - topOffset -50) ) {
    oval_border_highlight('#tab3');
  }
  if ($(window).scrollTop() >= (notes - topOffset -50) ) {
    oval_border_highlight('#tab4');
  }
  if ($(window).scrollTop() >= (closeout - topOffset -50) ) {
    oval_border_highlight('#tab5');
  }
}

function get_task_page_position() {
  var taskdetails = $('#bookmark_taskdetails').offset().top;
  var extdetails = $('#bookmark_extdetails').offset().top;
  var loe = $('#bookmark_loe').offset().top;
  var wip = $('#bookmark_wip').offset().top;
  var traffic = $('#bookmark_traffic').offset().top;
  var tasknotes = $('#bookmark_tasknotes').offset().top;

  if ($(window).scrollTop() >= (taskdetails - topOffset -50) ) {
    oval_border_highlight('#tab10');
  }
  if ($(window).scrollTop() >= (extdetails - topOffset -50 ) ) {
    oval_border_highlight('#tab11');
  }
  if ($(window).scrollTop() >= (loe - topOffset -50) ) {
    oval_border_highlight('#tab12');
  }
  if ($(window).scrollTop() >= (wip - topOffset -50) ) {
    oval_border_highlight('#tab13');
  }
  if ($(window).scrollTop() >= (traffic - topOffset -50) ) {
    oval_border_highlight('#tab14');
  }
  if ($(window).scrollTop() >= (tasknotes - topOffset -50) ) {
    oval_border_highlight('#tab15');
  }
}

function get_timesheet_page_position() {
  var start = $('#bookmark_start').offset().top;
  var work = $('#bookmark_work').offset().top;
  var breaks = $('#bookmark_breaks').offset().top;
  var end = $('#bookmark_end').offset().top;
  var review = $('#bookmark_review').offset().top;

  if ($(window).scrollTop() >= (start - topOffset -50 ) ) {
    oval_border_highlight('#tab20');
  }
  if ($(window).scrollTop() >= (work - topOffset -50) ) {
    oval_border_highlight('#tab21');
  }
  if ($(window).scrollTop() >= (breaks - topOffset -50) ) {
    oval_border_highlight('#tab22');
  }
  if ($(window).scrollTop() >= (end - topOffset -50) ) {
    oval_border_highlight('#tab23');
  }
  if ($(window).scrollTop() >= (review - topOffset -50) ) {
    oval_border_highlight('#tab24');
  }
}

function toggle_referral() {
  $('.row').toggleClass('hidden');
  $('html body').animate({ scrollTop: 0 });
  $('#bookmark_closeout').toggleClass('hidden');
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
  $(thisObj).parent().find('.text-circle').removeClass('incomplete complete').addClass(className);
}

function check_panel_valid() {
  if ($(this).children('.form-group').find('.search')) {
    var tableID = $(this).children('.form-group').find('.search').parents('.form-horizontal').children('table').attr('id');
    var thisObj = $(this).children('.form-group').find('.search');
    table_search(thisObj, tableID);
  }
  var icon = $(this).children().last();
  var rowValid = false;
  var panelValid = $(this).parsley( 'isValid' );
  var required = check_this_panel_required( $(this) );
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

function goto_forms() {
  form_navbar();
  $('#insert-map').empty();
  $.get('forms/form_cr.html', function(data) {
    $('#insert-form').html(data);
    });
  $('#insert-form').trigger('create');
  var formName = 'request'
  show_correct_ovals(formName);
}

function insert_inspection_form() {
  $('#insert-form').empty();
  $.get('forms/form_inspect.html', function(data) {
    $('#insert-form').html(data);
    });
  var formName = 'inspection'
  show_correct_ovals(formName);
  // $('html body').animate({ scrollTop: 0 });
  $('#insert-form').on('change', skip_to_details);
}

function insert_CR_form() {
  $('#insert-form').empty();
  $.get('forms/form_cr.html', function(data) {
    $('#insert-form').html(data);
  });
  var formName = 'request'
  show_correct_ovals(formName);
  // $('html body').animate({ scrollTop: 0 });
  $('#insert-form').on('change', skip_to_details);
}

function insert_defect_form() {
  $('#insert-form').empty();
  $.get('forms/form_defect.html', function(data) {
    $('#insert-form').html(data);
  });
  var formName = 'defect'
  show_correct_ovals(formName);
  $('html body').animate({ scrollTop: 0 });
}

function insert_task_form() {
  $('#insert-form').empty();
  $.get('forms/form_task.html', function(data) {
    $('#insert-form').html(data);
  });
  var formName = 'task'
  show_correct_ovals(formName);
  $('html body').animate({ scrollTop: 0 });
}

function insert_timesheet_form() {
  $('#insert-form').empty();
  $.get('forms/form_timesheet.html', function(data) {
    $('#insert-form').html(data);
  });
  var formName = 'timesheet'
  show_correct_ovals(formName);
  $('html body').animate({ scrollTop: 0 });
}

function goto_map() {
  map_navbar();
  $('#insert-form').empty();
  $.get('MapLayer.html', function(data) {
    $('#insert-map').html(data);
    });
  $('#insert-map').trigger('create');
  insert_left();
}

function map_navbar() {
  $('.icon-map').removeClass('hidden');
  $('.icon-form').addClass('hidden');
  $('#bookmark_nav li a').addClass('hidden');
  $('.oval-text').addClass('hidden');
  $('.detail-icon').removeClass('hidden');
  $('.map-icon').addClass('hidden');
}

function form_navbar() {
  $('.icon-map').addClass('hidden');
  $('.icon-form').removeClass('hidden');
  $('.left-bar-icons').addClass('hidden');
  $('#bookmark_nav li a').removeClass('hidden');
  $('.oval-text').removeClass('hidden');
  $('.map-icon').removeClass('hidden');
  $('.detail-icon').addClass('hidden');
}

function show_correct_ovals(formName) {
  if (formName === 'request') {
    $('a[data-href="#bookmark_condition"]').parent('li').hide();

    $('a[data-href="#bookmark_contact"]').parent('li').show();
    $('a[data-href="#bookmark_details"]').parent('li').show();
    $('a[data-href="#bookmark_location"]').parent('li').show();
    $('a[data-href="#bookmark_notes"]').parent('li').show();
    $('a[data-href="#bookmark_closeout"]').parent('li').show();

    $('a[data-href="#bookmark_start"]').parent('li').hide();
    $('a[data-href="#bookmark_work"]').parent('li').hide();
    $('a[data-href="#bookmark_breaks"]').parent('li').hide();
    $('a[data-href="#bookmark_end"]').parent('li').hide();
    $('a[data-href="#bookmark_review"]').parent('li').hide();
    hide_timesheet_ovals();
    hide_task_ovals();
  }
  if (formName === 'defect') {
    $('a[data-href="#bookmark_contact"]').parent('li').hide();

    $('a[data-href="#bookmark_condition"]').parent('li').show();
    $('a[data-href="#bookmark_details"]').parent('li').show();
    $('a[data-href="#bookmark_location"]').parent('li').show();
    $('a[data-href="#bookmark_notes"]').parent('li').show();
    $('a[data-href="#bookmark_closeout"]').parent('li').show();

    $('a[data-href="#bookmark_start"]').parent('li').hide();
    $('a[data-href="#bookmark_work"]').parent('li').hide();
    $('a[data-href="#bookmark_breaks"]').parent('li').hide();
    $('a[data-href="#bookmark_end"]').parent('li').hide();
    $('a[data-href="#bookmark_review"]').parent('li').hide();
    hide_timesheet_ovals();
    hide_task_ovals();
  }
  if (formName === 'inspection') {
    $('a[data-href="#bookmark_condition"]').parent('li').hide();
    $('a[data-href="#bookmark_contact"]').parent('li').show();

    $('a[data-href="#bookmark_details"]').parent('li').show();
    $('a[data-href="#bookmark_location"]').parent('li').show();
    $('a[data-href="#bookmark_notes"]').parent('li').show();
    $('a[data-href="#bookmark_closeout"]').parent('li').show();

    $('a[data-href="#bookmark_start"]').parent('li').hide();
    $('a[data-href="#bookmark_work"]').parent('li').hide();
    $('a[data-href="#bookmark_breaks"]').parent('li').hide();
    $('a[data-href="#bookmark_end"]').parent('li').hide();
    $('a[data-href="#bookmark_review"]').parent('li').hide();
    hide_timesheet_ovals();
    hide_task_ovals();
  }
  if (formName === 'task') {
    $('a[data-href="#bookmark_condition"]').parent('li').hide();
    $('a[data-href="#bookmark_contact"]').parent('li').hide();
    $('a[data-href="#bookmark_location"]').parent('li').hide();
    $('a[data-href="#bookmark_details"]').parent('li').hide();
    $('a[data-href="#bookmark_notes"]').parent('li').hide();
    $('a[data-href="#bookmark_closeout"]').parent('li').hide();
    hide_timesheet_ovals();
    show_task_ovals();
  }
  if (formName === 'timesheet') {
    $('a[data-href="#bookmark_condition"]').parent('li').hide();
    $('a[data-href="#bookmark_contact"]').parent('li').hide();
    $('a[data-href="#bookmark_location"]').parent('li').hide();
    $('a[data-href="#bookmark_details"]').parent('li').hide();
    $('a[data-href="#bookmark_notes"]').parent('li').hide();
    $('a[data-href="#bookmark_closeout"]').parent('li').hide();
    show_timesheet_ovals();
    hide_task_ovals();
  }
}

function hide_task_ovals() {
  $('a[data-href="#bookmark_taskdetails"]').parent('li').hide();
  $('a[data-href="#bookmark_extdetails"]').parent('li').hide();
  $('a[data-href="#bookmark_loe"]').parent('li').hide();
  $('a[data-href="#bookmark_wip"]').parent('li').hide();
  $('a[data-href="#bookmark_traffic"]').parent('li').hide();
  $('a[data-href="#bookmark_tasknotes"]').parent('li').hide();
}

function show_task_ovals() {
  $('a[data-href="#bookmark_taskdetails"]').parent('li').show();
  $('a[data-href="#bookmark_extdetails"]').parent('li').show();
  $('a[data-href="#bookmark_loe"]').parent('li').show();
  $('a[data-href="#bookmark_wip"]').parent('li').show();
  $('a[data-href="#bookmark_traffic"]').parent('li').show();
  $('a[data-href="#bookmark_tasknotes"]').parent('li').show();
}

function show_timesheet_ovals() {
  $('a[data-href="#bookmark_start"]').parent('li').show();
  $('a[data-href="#bookmark_work"]').parent('li').show();
  $('a[data-href="#bookmark_breaks"]').parent('li').show();
  $('a[data-href="#bookmark_end"]').parent('li').show();
  $('a[data-href="#bookmark_review"]').parent('li').show();
}

function hide_timesheet_ovals() {
  $('a[data-href="#bookmark_start"]').parent('li').hide();
  $('a[data-href="#bookmark_work"]').parent('li').hide();
  $('a[data-href="#bookmark_breaks"]').parent('li').hide();
  $('a[data-href="#bookmark_end"]').parent('li').hide();
  $('a[data-href="#bookmark_review"]').parent('li').hide();
}

function show_fake_map() {
  $('#mapstatic').attr('src', "Content/images/OsmMap_Feature.png")
  $('.qtip-layers-panel').qtip('api').hide();
}

function check_form_location() {
  if (!$('#bookmark-nav ul').hasClass('disabled')) {
    var href = $(this).attr('data-href');
    if (href === '#bookmark_location') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab1');
    }
    if (href === '#bookmark_details') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({scrollTop: scrollAmount }, 1500);
      oval_border_highlight('#tab2');
    }
    if (href === '#bookmark_contact') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab3');
    }
    if (href === '#bookmark_condition') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab3');
    }
    if (href === '#bookmark_notes') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab4');
    }
    if (href === '#bookmark_closeout') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab5');
    }
    //timesheet form
    if (href === '#bookmark_start') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab20');
    }
    if (href === '#bookmark_work') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab21');
    }
    if (href === '#bookmark_breaks') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab22');
    }
    if (href === '#bookmark_end') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab23');
    }
    if (href === '#bookmark_review') {
      var scrollAmount = ($(href).offset().top) - topOffset;
      $('html, body').animate({ scrollTop: scrollAmount }, 1000);
      oval_border_highlight('#tab24');
    }
  }
}


function create_layers_carousel() {
  owlLayersHtml = $("#owl-example").owlCarousel({

    // Most important owl features
    items : 3,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [980,3],
    itemsTablet: [800,3],
    itemsTabletSmall: [400,2],
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
    responsiveRefreshRate : 100,
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


function layers_qtip() {
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
            width: 50,
            height: 30
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
          at: 'center right',
          target: $(this),
          adjust: {
            scroll: true // Can be ommited (e.g. default behaviour)
        }
      },
      api: {
          onContentLoaded: $('.item').each(function () {
              $(this).attr('style', 'width: 200px; height: 300px;');
          })
      }
  });
}

function searchByAddress_qtip() {
  $(this).qtip({
      content: {
        text: $('#search-address'),
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
            corner: 'top center',
            width: 50,
            height: 30
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
          my: 'top center',
          at: 'bottom center',
          target: $('#search-by-address-button')
      }
  });
  $('#address-search').removeClass('invisible');
}

function showAssets_qtip() {
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
          my: 'center left',
          at: 'center right'
      }
  });
}

function search_by_category_qtip() {
  $(this).qtip({
      content: {
        text: $('#search-by-category'),
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
            width: 50,
            height: 30,
            target: $('#search-by-category-button')
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
          at: 'center right',
          target: $(this)
      },
      api: {
          onContentLoaded: $('.item').each(function () {
              $(this).attr('style', 'width: 250px; height: 250px;');
          })
      }
  });
  $('#address-search-panel').removeClass('invisible');
}

function search_by_number_qtip() {
  $(this).qtip({
      content: {
        text: $('#search-by-number'),
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
          classes: 'qtip-search-number qtip-rounded qtip-shadow qtip-light',
          tip: {
            corner: 'center left',
            width: 50,
            height: 30,
            target: $('.search-icon')
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
          at: 'center right',
          target: $(this)
      },
      api: {
          onContentLoaded: $('.item').each(function () {
              $(this).attr('style', 'width: 250px; height: 150px;');
          })
      }
  });
  $('#search-by-number').removeClass('invisible');
}

$(function() {
  $("#map-link").on('click', refresh_map);
});

// add current class to image pages-icons class on click
function show_active_tab() {
  $(this).children('img').addClass("current");
  event.stopPropagation();
  show_form();
}

// change content on tab click
function change_tab_content() {
  $('.pages-icons').removeClass("current");
  $(this).addClass('current');
}

function insert_map() {
  $.get('MapLayer.html', function(data) {
    $('#insert-map').html(data);
    });
  $('#insert-map').trigger('create');
}

function insert_left() {
  $('#insert-left').empty();
  $.get('left_bar.html', function(data) {
    $('#insert-left').html(data);
  });
}

function insert_top() {
  $.get('top_bar.html', function(data) {
    $('#insert-top').html(data);
  });
  $('#insert-top').trigger('create');
}

// inserts the first form into the form page on initial load of details page
function show_first_form() {
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