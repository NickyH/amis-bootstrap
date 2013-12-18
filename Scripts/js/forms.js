add_cross_to_required_forms();

$('.form-horizontal').on('keyup', this, check_panel_valid);
$('.form-horizontal').on('change', this, check_panel_valid);
$( '.form-horizontal .container' ).parsley( 'validate');
$('.selectpicker').selectpicker({ size: 5 });
$('#bookmark-nav').on('click', 'a', check_form_location);
$('.referral-icon').on('click', toggle_referral);

change_selectpicker_values()

$('.insert-time-picker').datetimepicker({
  controlType: 'select',
  timeOnly: true,
  timeFormat: 'HH:mm',
  stepMinute: 5
});

$('.insert-date-picker').datepicker({
  controlType: 'select'
});

$('.insert-picker').datetimepicker({
  controlType: 'select',
  timeFormat: 'HH:mm',
  stepMinute: 5
});

$('.input-group-addon').on('click', calendar_icon_click); //activate calendar on icon click

$('.select-all').on('click', function() {
  $(this).parent('.col-sm-8').children('.selectpicker').selectpicker('selectAll');
});

$('.select-none').on('click', function() {
  $(this).parent('.col-sm-8').children('.selectpicker').selectpicker('deselectAll');
});

$("input[type='text']").on("click", function () {
  $(this).select();
});

disable_datepickers();

$('.close-form').on('click', warn_close_form);
$('.cancel-button').on('click', warn_cancel_form);

$('span.lookup').on('click', open_address_book);

$(".checkbox label input").change(function() {
    var boxes = $(".action-checkbox").click(function(){
      boxes.not(this).attr('checked', false);
    });
    if(this.checked) {
      $('#referralNotesCR').parent('div').parent('div').removeClass('hidden');
      $('#referral-to').parent('.form-group').removeClass('hidden');
      $(this).attr('checked', 'checked');
    }
    else if($(this).prop('checked', 'false')) {
      $('#referralNotesCR').parent('div').parent('div').addClass('hidden');
      $('#referral-to').parent('.form-group').addClass('hidden');
      $(this).removeAttr('checked');
    }
});

$('.reference-history tr').on('click', open_current_contact_row);

$('.icon-history').on('click', refresh_history_accordion);

//task form functions

$('td a span.glyphicon-play').on('click', highlight_current_task);
$('td a span.glyphicon-play.breaks').on('click', highlight_current_break);
$('.glyphicon-picture').on('click', show_task_map);
$('.member-timesheet-row').on('click', show_member_timesheet);
