
(function($) {
	
	// This flag will be set to true if backspace cancellation is enabled.
	var backspace_cancel_enabled = false;
	
	// This is the list of HTML elements that have a legitimate need for the backspace key.
	var backspace_cancel_selector = "input:not([readonly]):not([type=radio]):not([type=checkbox]), textarea, [contentEditable], [contentEditable=true]";
	
	// This is the function that actually disables the backspace key. It will only run once.
	var backspace_cancel_callback = function() {
		if (backspace_cancel_enabled) {
			return;
		}
		backspace_cancel_enabled = true;
		$(document).on("keydown", function(e) {
			if ((e.which == 8 || e.which == 46) && !$(e.target).is(backspace_cancel_selector)) {
				e.preventDefault();
			}
		});
	};
	
	// Disable the backspace key if the user focuses on any input element.
	$(document).on("focusin", backspace_cancel_selector, function() {
		backspace_cancel_callback();
	});
	
	// Disable the backspace key if the user focuses on a CKEditor instance.
	if (window.CKEDITOR) {
		CKEDITOR.on("instanceReady", function(e) {
			e.editor.on("focus", function(e) {
				backspace_cancel_callback();
			});
		});
	}
	
	// Disable the backspace key if there is any instance of XpressEditor on the page.
	if (window.xe && window.xe.XpressCore) {
		backspace_cancel_callback();
	}
	
})(jQuery);	
