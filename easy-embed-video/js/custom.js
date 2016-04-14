$( document ).ready(function() {
		updateView();
});

	$( "input, select" ).change(function() {
		//alert("It's Working!");
		updateView();
	});

	$('#video_url').on('input', function() {
		//alert("It's Working!");
		updateView();
	});

	function updateView(){
		out_iframe = generate_youtube_iframe();
		if(out_iframe){
			$("#demoDiv").html("<label>Video Preview:</label>" + out_iframe);
			$("#outputDiv").text(out_iframe);
		}
	}

	function generate_youtube_iframe(){

		para_youtube_videoid = get_para_youtube_videoid();
		// iframe source attribute
		if( para_youtube_videoid ){

			out_src =  'http://www.youtube.com/v/' + get_para_youtube_videoid() + '?';
			out_src += add_para('start', get_para_youtube_start() );
			out_src += add_para('end', get_para_youtube_end() );
			out_src += add_para('autoplay' , get_para_youtube_autoplay() );
			out_src += add_para('autohide' , get_para_youtube_autohide() );
			out_src += add_para('controls' , get_para_youtube_controls());
			out_src += add_para('loop' , get_para_youtube_loop());
			out_src += add_para('rel', get_para_youtube_related_videos());
			out_src += add_para('showinfo', get_para_youtube_showinfo() );
			out_src += add_para('cc_load_policy', get_para_youtube_cc_load_policy() );
			out_src += add_para('fs', get_para_youtube_fullscreen() );

			para_dimensions = para_set_dimensions();

			para_width = para_dimensions[0];
			para_height = para_dimensions[1];

			if( !get_para_responsive() ){
				return '<iframe type="text/html" width="' + para_width + '" height="' + para_height + '" frameborder="0" src="' +  out_src + '"/>';
			} else{
				return '<div style="position: relative; padding-bottom: ' + para_height * 100 / para_width + '%; padding-top: 25px; height: 0;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" type="text/html" width="' + para_width + '" height="' + para_width + '" frameborder="0" src="' +  out_src + '"/></div>';
			}
		}

	}

	// Set iFrame Dimensions
	function para_set_dimensions(){
			var width = get_para_youtube_width();
			var height = get_para_youtube_height();

			if (width && height){
				return [ width , height ];
			} else {
				return [ '640', '385' ];
			}
	}

	// Add Parameter to YouTube iframe src parameter
	function add_para(para_name, para_value){
		if (para_value){
			return para_name + "=" + para_value + "&" ;
		} else {
			return "";
		}
	}

	// Extract Video ID from URL
	function get_youtube_id_from_url(url){
		url = url.trim();
	    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	    var match = url.match(regExp);
	    if (match&&match[7].length==11){
	        return match[7];
	    }
	}

	// Texbox - Video URL
	function get_para_youtube_url(){
		return $('#video_url').val();
	}

	// Textbox - Height
	function get_para_youtube_height(){
		return $('#video_height').val();
	}

	// Textbox - Width
	function get_para_youtube_width(){
		return $('#video_width').val();
	}

	// Get YouTube Video ID
	function get_para_youtube_videoid(){
		return get_youtube_id_from_url( get_para_youtube_url() );
	}

	// Get YouTube Video Start Time
	function get_para_youtube_start(){

		var video_start_time = 0;
		var input_hours = $('#video_start_time_hours');
		var input_minutes = $('#video_start_time_minutes');
		var input_seconds = $('#video_start_time_seconds');

		if(input_hours){
			video_start_hours = Number ( input_hours.val() );
			video_start_time += video_start_hours * 3600;
		}

		if(input_minutes){
			video_start_minutes = Number ( input_minutes.val() );
			video_start_time += video_start_minutes * 60;
		}

		if(input_seconds){
			video_start_seconds = Number (input_seconds.val());
			video_start_time += video_start_seconds;
		}

		return video_start_time;

	}

	// Get YouTube Video End Time
	function get_para_youtube_end(){

		var video_end_time = 0;
		var input_hours = $('#video_end_time_hours');
		var input_minutes = $('#video_end_time_minutes');
		var input_seconds = $('#video_end_time_seconds');

		if(input_hours){
			video_end_hours = Number ( input_hours.val() );
			video_end_time += video_end_hours * 3600;
		}

		if(input_minutes){
			video_end_minutes = Number ( input_minutes.val() );
			video_end_time += video_end_minutes * 60;
		}

		if(input_seconds){
			video_end_seconds = Number (input_seconds.val());
			video_end_time += video_end_seconds;
		}

		return video_end_time;

	}

	// Dropdown - Show/Hide Controls
	function get_para_youtube_controls(){

		var para_value = $('#video_controls').find(":selected").attr('data-controls');

		// Value Validation //
		if( para_value== '0' || para_value == '1' ){
			return para_value;
		} else {
			// Default Value //
			return '1';
		}

	}

	// Dropdown - AutoHide Controls
	function get_para_youtube_autohide(){

		var para_value = $('#video_controls').find(":selected").attr('data-autohide');

		// Value Validation //
		if( para_value== '0' || para_value == '1' ){
			return para_value;
		} else {
			// Default Value //
			return '1';
		}

	}

	// Dropdown - Related Videos
	function get_para_youtube_related_videos(){

		var para_value = $('#video_end_action').find(":selected").attr('data-rel');

		// Value Validation //
		if( para_value== '0' || para_value == '1' ){
			return para_value;
		} else {
			// Default Value //
			return '1';
		}

	}

	// Dropdown - Related Videos
	function get_para_youtube_loop(){

		var para_value = $('#video_end_action').find(":selected").attr('data-loop');

		// Value Validation //
		if( para_value== '0' ){
			return para_value;
		} else if (para_value == '1') {
			return para_value + '&playlist=' + get_para_youtube_videoid();
		} else {
			// Default Value //
			return '0';
		}

	}

	// Checkbox - Autoplay
	function get_para_youtube_autoplay(){

		var isChecked = document.getElementById('video_autoplay').checked ;

		if( isChecked ){
			// Set Autoplay Parameter to 1, and enable Autoplay;
			return "1";
		} else {
			// Set Autoplay Parameter to 0, and disable Autoplay;
			return "0";
		}

	}

	// Checkbox - Close Caption On By Default
	function get_para_youtube_cc_load_policy(){

		var isChecked = document.getElementById('video_cc_load_policy').checked ;

		if( isChecked ){
			return "1";
		} else {
			return "0";
		}

	}


	// Checkbox - Disable Full Screen
	function get_para_youtube_fullscreen(){

		var isChecked = document.getElementById('video_fullscreen').checked ;

		if( isChecked ){
			return "0";
		} else {
			return "1";
		}

	}

	// Checkbox - Title & Uploader
	function get_para_youtube_showinfo(){

		if( document.getElementById('video_showinfo') ){

			var isChecked = document.getElementById('video_showinfo').checked ;

			if( isChecked ){
				// Show Related Videos if Checked
				return "1";
			} else {
				// Hide Related if otherwise
				return "0";
			}

		}

	}

	// Checkbox - Responsive Design
	function get_para_responsive(){

		if( document.getElementById('video_responsive') ) {

			var isChecked = document.getElementById('video_responsive').checked ;

			if( isChecked ){
				return true;
			} else {
				return false;
			}

		}

	}
