add_cross_to_required_forms();
$('.form-horizontal').on('keyup', this, check_panel_valid);
$('.form-horizontal').on('change', this, check_panel_valid);
$( '.form-horizontal .container' ).parsley( 'validate');
$('.selectpicker').selectpicker({ size: 5 });
$('#bookmark-nav').on('click', 'a', check_form_location);
$('.referral-icon').on('click', toggle_referral);

change_selectpicker_values()

$('.insert-time-picker').datetimepicker({
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