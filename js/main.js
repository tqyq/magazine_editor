var hideKeyboard = function() {
    document.activeElement.blur();
    $("input").blur();
};

function showDialog(url, txt, width, height, marginTop, callback) {
	var dlg = $("#dlg");
	if (dlg.length < 1) {
		dlg = $("<div id='dlg'></div>");
		$("body").append(dlg);
	}
	var ww = Math.min($(window).width(), screen.width);
	var ratio = ww / 640;
	var left = (ww/ratio - width) / 2;
	marginTop = marginTop ? marginTop/ratio : 100/ratio;
	dlg.css({position:'fixed', top:marginTop, left:left, width: width, height: height});
	dlg.load(url, function() {
		showMask();
		dlg.find('a').click(function(){
			if (callback) {
				callback();
			}
		});
		dlg.find('.alert_info').text(txt);
		hideKeyboard();
		dlg.show();
	});
}

function showConfirm(url, txt, width, height, marginTop, callback,leftxt,rightxt) {
	var dlg = $("#dlg");
	if (dlg.length < 1) {
		dlg = $("<div id='dlg'></div>");
		$("body").append(dlg);
	}
	var ww = Math.min($(window).width(), screen.width);
	var ratio = ww / 640;
	var left = (ww/ratio - width) / 2;
	marginTop = marginTop ? marginTop/ratio : 100/ratio;
	dlg.css({position:'fixed', top:marginTop, left:left, width: width, height: height});
	dlg.load(url, function() {
		showMask();
		dlg.find('.alert_info').text(txt);
		if(leftxt){
			dlg.find('#now_login').text(leftxt);
		}
		if(rightxt){
			dlg.find('#after_login').text(rightxt);
		}
		dlg.find('#now_login').click(function(){
			callback();
		});
		dlg.show();
	});
}

function selDlg(url, callback) {
	showDialog(url, 400, null, null, function() {
		$('.sel_item').on('click', function() {
			if (callback) {
				callback({id:$(this).attr('id'), text:$(this).text()});
			}
			closeDialog();
		});
	});
}

function closeDialog() {
	hideMask();
	$("#dlg").remove();
	if (typeof dialogClosed != 'undefined') {
		dialogClosed();
	}
}

function toastUrl(url, width) {
	var toast = $("#toast");
	toast.remove();
	$("body").append("<div id='toast' class='toast'></div>");
	toast = $("#toast");
	toast.load(url);
	$("#toast").dialog({
		width : width,
		closeText : ""
	});
}

function showMask() {
	var mask = $("#mask");
	if (mask.length == 0) {
		$("body").append("<div id='mask' class='mask'></div>");
		mask = $("#mask");
		mask.click(function() {
			closeDialog();
		});
	}
	$(document).on('touchmove',function(e) {
	    e.preventDefault();
	});
	mask.show();
	return mask;
}

function hideMask() {
	var mask = $("#mask");
	if (mask.length > 0) {
		mask.hide();
	}
	$(document).off('touchmove');
}

