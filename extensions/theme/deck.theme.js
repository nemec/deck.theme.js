(function($, deck, undefined) {
  var $deck = $[deck];
  var $d = $(document);
  
  $.extend(true, $deck.defaults, {
    slidetheme: {
      enabled: true,
      themeClassPrefix: "theme-",  // Used to separate theme classes from regular classes
			customThemeAttr: "data-theme"
    }
	});
	
	function startsWith(str, pattern){
		return str.substr(0, pattern.length) === pattern;
	}
	
	function getThemeDataAttr(slide){
		var opts = $deck('getOptions');
		return $(slide).attr(opts.slidetheme.customThemeAttr);
	}
	
	function setThemeDataAttr(slide, theme){
		var opts = $deck('getOptions');
		$(slide).attr(opts.slidetheme.customThemeAttr, theme);
	}
	
	function getElementThemes(slide){
		var opts = $deck('getOptions');
		var classes = $(slide).attr('class').split(/\s+/);
		var themes = $.grep($(classes), function(cls){
			return startsWith(cls, opts.slidetheme.themeClassPrefix);
		});
		return themes;
	}
	
	// Remove all existing themes and 
	function setElementTheme(slide, theme){
		$(slide)
			.removeClass(
				getElementThemes(slide).join(" "))
			.addClass(theme);
	}
  
  // Add canvases to slides
	$d.bind('deck.init', function(){
    var opts = $deck('getOptions');
		if(!opts.slidetheme.enabled){
			return;
		}
		
		var rootTheme = getElementThemes($deck('getContainer'));
		var currentTheme = rootTheme;
		
		// We need to manually set data- attributes for each slide that
		// doesn't have one so that we switch the theme *back* when
		// a user goes backwards in the deck.
		var slides = $deck('getSlides');
		for(var i = 0; i < slides.length; i++){			
			var customTheme = getThemeDataAttr(slides[i]);
			if(customTheme){
				currentTheme = customTheme;
			}
			// Set data attr to current theme
			else{
				setThemeDataAttr(slides[i], currentTheme);
			}
		}
		
		function onChange(to){
			var currentSlide = $deck('getSlide', to);
			var theme = getThemeDataAttr(currentSlide);
			if(!theme){
				theme = rootTheme;
			}
			
			if(theme){
				setElementTheme($deck('getContainer'), theme);
			}
		}
		
    // Initialize the 
    $d.bind('deck.change', function(event, from, to){
      onChange(to);
    });
		
		onChange();
  });  
})(jQuery, 'deck');