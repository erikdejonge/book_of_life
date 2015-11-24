$( document ).ready(function() {
    $('.type-post img').one("load", function() {
        var width = $(this).width();
        $(this).css({"max-width":width,"width":"100%","margin":"0 auto"});
    }).each(function() {
        //fire the load event if the image was cached.
        if(this.complete) $(this).load();
    });
    console.log('in image');
});

$(function(){


	// trim post content to excerpt length, extract featured image substitutes, append readmore link
	var maxLength = 490; // characters
	$('.home .slide').each(function(){
		var text = $('.full',this).text();
		if(text.length > maxLength){
			trim = text.substr(0, maxLength);
			trim = trim.substr(0, Math.min(trim.length, trim.lastIndexOf(" ")));
		}else{
			trim = text;
		}
		$('.excerpt',this).text(trim);
		$('.readmore', this).appendTo($('.excerpt',this));

		// if no featured image set, get the first image from content - thumbs abandoned
		//var thumb = $('.thumb', this).html();
		//if(thumb.trim().length<4){
			//$('.thumb', this).html($('.full img:eq(0)',this));
		//}
	});


	// sidebar menu functionality
    $('.secondary-content > div > a.categories').click(function(e){
        if($(this).parent().prop('class').indexOf('active') == -1){
            $(this).parent().siblings().removeClass('active');
            $(this).parent().addClass('active');
        }else {
            $(this).parent().siblings().removeClass('active');
        }
        $(this).siblings('ul').children('li').removeClass('active');
        $('body > .subcat-posts').removeClass('show');
        e.preventDefault();
    });

	// sidebar submenu functionality
    $('.secondary-content li > a').click(function(e){
        var link = $(this).prop('href');
        if(link.length > 0 && link.indexOf('#') > -1){
            var link = link.substr(link.indexOf('#')+1);
            $('body > .subcat-posts > ul').removeClass('show');
            $('body > .subcat-posts #posts-'+link).addClass('show');
        }

        if($(this).parent().prop('class').indexOf('active') == -1){
            $(this).parent().siblings().removeClass('active');
            $(this).parent().addClass('active');
            $('body > .subcat-posts').addClass('show');
        }else {
            $(this).parent().siblings().removeClass('active');
            $('body > .subcat-posts').toggleClass('show');
        }

        sidebarDectector();
        e.preventDefault();
        e.stopPropagation();
    });

	// close the subcategory sidebar on body click
	$('body > .subcat-posts').click(function(e){
		e.stopPropagation();
	});
	$('body').click(function(e){
		$('body > .subcat-posts').removeClass('show');
	});

    // sidebar icon height detecter
    function sidebarDectector(){
        $('.subcat-posts .more-below').removeClass('more');
        var sidebarHeight = $('.subcat-posts ul.show')[0].scrollHeight;
        var windowHeight = $( window ).height();
        if (sidebarHeight > windowHeight){
            console.log('in window sidebar');
            $('.subcat-posts .more-below').addClass('more');
        }
    }

	// newsletter subscribe form
	/* Ported to jquery from prototype by Joel Lisenby (joel.lisenby@gmail.com)
    http://joellisenby.com || original prototype code by Aarron Walter (aarron@buildingfindablewebsites.com)
    http://buildingfindablewebsites.com
    Distrbuted under Creative Commons license
    http://creativecommons.org/licenses/by-sa/3.0/us/ */

    $('#mc-embedded-subscribe-form').submit(function() {
        $('#response').html('Adding email address...');
        $.ajax({
            url: 'http://www.thebookoflife.org/wp-content/themes/bookoflife/inc/store-address.php',
            data: 'ajax=true&email=' + escape($('#email').val()),
            success: function(msg) {
                $('#response').html(msg);
            }
        });
        return false;
    });
    $('#mc-embedded-subscribe-form2').submit(function() {
        $('#response2').removeClass('hidden').html('Adding email address...');
        $.ajax({
            url: 'http://www.thebookoflife.org/wp-content/themes/bookoflife/inc/store-address.php',
            data: 'ajax=true&email=' + escape($('#email2').val()),
            success: function(msg) {
        		$('#response2').addClass('hidden');
            	if(msg.indexOf('Sorry') > -1 || msg.indexOf('No email') > -1 ){
            		$('#mc-embedded-subscribe-form2 p').html(msg);
            		$('#mc-embedded-subscribe-form2 .mc-field-group').removeClass('hidden');
            	}else {
            		$('#mc-embedded-subscribe-form2 p').html(msg);
            		$('#mc-embedded-subscribe-form2 .mc-field-group').addClass('hidden');
            	}
            	if(msg.indexOf('Thank you') > -1){
            		setTimeout(function(){
            			$('#popup').animate({'opacity': 0}, 500, function(){
            				$(this).addClass('hidden');
            			});
            		},5000);
            	}
	                // $('#response2').removeClass('hidden').html(msg);
            }
        });
        return false;
    });

	// desktop popup
    var popupShown = $.cookie('newsletterShown');
    var firstPage = $.cookie('firstPage');
    if(typeof firstPage == 'undefined'){
        $.cookie('firstPage', 'true', { expires: 7, path: '/' });
    }else if(firstPage == 'true'){
        $.cookie('firstPage', 'false', { expires: 7, path: '/' });
        firstPage = 'false';
    }
    if(popupShown != 'true' && firstPage == 'false'){
    	$('#popup').removeClass('hidden');
    	$.cookie('newsletterShown', 'true', { expires: 7, path: '/' });
    }
    $('#popup .close').click(function(){
    	$('#popup').addClass('hidden');
    });

    // footer & header newsletter link
    $('a.join').click(function(e){
    	var href = $(this).attr('href');
    	// if($(''+href).length == 0){
    		e.preventDefault();
    		if($('#popup').removeClass('hidden').css('display') == 'none'){ // mobile
    			$('#popup').addClass('hidden');  
	    		var gotolink = $('.logo').attr('href') + $(this).attr('href');
	    		window.location = gotolink; 
    		}else { // desktop

    		}
    	// }
    });

    // open post sidebar on proper category
    if($('#post-category-name')){
        var name = $('#post-category-name').text();
        $('section.secondary-content.mobile-none > div').each(function(){
            var div = $(this);
            if(name == $('> a > span', div).text()){
                div.addClass('active');
                return false; // works as a break
            };
            $('> ul > li > a', div).each(function(){
                if(name == $(this).text()){
                    div.addClass('active');
                    $(this).parent().addClass('active');
                    return false; // works as a break
                }
            });
        });
    }

    // remove empty paragraphs messing up post content spacing
    if($('.type-post').length){
        $('.type-post .wrapper p').each(function(){
            if($('img', this).length == 0 && $(this).text().trim().length == 0){
                // console.log('removed! '+$(this).text());
                $(this).remove();
            }
        });
    }

    if($('.type-page.about').length){
        $('.wrapper', this).prepend('<i class="image1" />');
        $('.wrapper', this).prepend('<i class="image2" />');
        $('.wrapper', this).prepend('<i class="image3" />');
        $('.wrapper', this).prepend('<i class="image4" />');
        $('.wrapper', this).prepend('<i class="image5" />');
        $('.wrapper', this).prepend('<i class="image6" />');
    }



});

// image responsive adaptable styling
/*
$('.type-post img').each(function( index ){
	var width = $(this).width();
	$(this).css({"max-width":width,"width":"100%","margin":"0 auto"});
});
*/


$('.type-post .addtoany_share_save_container a img').each(function( index ){
    $(this).css({"width":"auto","height":"auto"});
});


// iframe responsive adaptable centered styling
$('.type-post .iframe-container iframe').each(function( index ){
	var width = $(this).width();
    $(this).css({"max-width":width,"width":"100%"});
});




$(window).load(function(){
  var mySwiper1 = $('.category-slider:eq(0) .flexslider').flexslider({
    controlNav: false,
    slideshow: false,
    smoothHeight: false,
    animation: 'slide',
    prevText: '',
    nextText: '',
    startAt: 0
  });
  var mySwiper2 = $('.category-slider:eq(1) .flexslider').flexslider({
    controlNav: false,
    slideshow: false,
    smoothHeight: false,
    animation: 'slide',
    prevText: '',
    nextText: '',
    startAt: 0
  });
  var mySwiper3 = $('.category-slider:eq(2) .flexslider').flexslider({
    controlNav: false,
    slideshow: false,
    smoothHeight: false,
    animation: 'slide',
    prevText: '',
    nextText: '',
    startAt: 0
  });
  var mySwiper4 = $('.category-slider:eq(3) .flexslider').flexslider({
    controlNav: false,
    slideshow: false,
    smoothHeight: false,
    animation: 'slide',
    prevText: '',
    nextText: '',
    startAt: 0
  });
  var mySwiper5 = $('.category-slider:eq(4) .flexslider').flexslider({
    controlNav: false,
    slideshow: false,
    smoothHeight: false,
    animation: 'slide',
    prevText: '',
    nextText: '',
    startAt: 0
  });
  var mySwiper6 = $('.category-slider:eq(5) .flexslider').flexslider({
    controlNav: false,
    slideshow: false,
    smoothHeight: false,
    animation: 'slide',
    prevText: '',
    nextText: '',
    startAt: 0
  });
});
