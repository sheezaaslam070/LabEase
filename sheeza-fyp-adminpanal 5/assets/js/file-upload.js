(function($) {
  'use strict';
  $(function() {
    $('.file-upload-browse').on('click', function(event) {
      event.preventDefault();  // ✅ Stops the button's default behavior
      var file = $(this).parent().parent().parent().find('.file-upload-default');
      file.trigger('click');
    });

    $('.file-upload-default').on('change', function(event) {
      event.preventDefault();  // ✅ Prevents default action
      event.stopPropagation(); // ✅ Stops event from bubbling up (important)
      
      // Ensure form doesn't submit automatically
      if (event.target.form) {
        event.target.form.addEventListener('submit', function(e) {
          e.preventDefault();
        });
      }

      // Update the input field to show file name
      $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
    });
  });
})(jQuery);
