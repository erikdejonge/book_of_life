// mobile sidebar menu functionality
	$('.mobile-nav.secondary-content > div > a.categories').click(function(e){
		if($(this).parent().prop('class').indexOf('active') == -1){
			$(this).parent().siblings().removeClass('active');
			$(this).parent().addClass('active');
			console.log("dsg");
		}if($('.subcat-posts.mobile-nav').hasClass('active')){
			$('.secondary-content.mobile-nav').removeClass('active-second');
		}else {
			$(this).parent().siblings().removeClass('active');
		}
		$(this).siblings('ul').children('li').removeClass('active');
		e.preventDefault();
	});

	// sidebar submenu functionality
	$('.mobile-nav.secondary-content li > a').click(function(e){
		if($(this).parent().prop('class').indexOf('active') == -1){
			$(this).parent().siblings().removeClass('active');
			$(this).parent().addClass('active');
			$('.mobile-display .subcat-posts').addClass('active');
			$('.mobile-display .secondary-content').addClass('active-second');
		}else {
			$(this).parent().siblings().removeClass('active');
		}

		var link = $(this).prop('href');
		if(link.length > 0 && link.indexOf('#') > -1){
			var link = link.substr(link.indexOf('#')+1);
			$('.subcat-posts > ul').removeClass('show');
			$('#posts-'+link).addClass('show');
		}

		e.preventDefault();
	});

	// Toggle Mobile Nav
	$('#mobile-burger').click(function(e){
		$('.mobile-display .subcat-posts').removeClass('active');
		$('.mobile-display .secondary-content').removeClass('active-second');
		$('.mobile-nav.secondary-content > div > a').parent().removeClass('active');
		$('.mobile-display .secondary-content').toggleClass('active');
		$('.home-nav-wrapper , .primary-content , .related-posts').toggleClass('none');

	});
    $('.mobile-nav-icon').on('click', function() {
        $(this).toggleClass('active');
        $('.mobile-header-close').toggleClass('active');
    });
    $('.mobile-header-close').on('click', function() {
		$(this).toggleClass('active');
        $('.mobile-nav-icon').toggleClass('active');
    });