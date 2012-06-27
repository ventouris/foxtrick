"use strict";
/**
 * mobile-enhancements.js
 * Collection of enhancements using mobile device/fennec
 * @author convinced
 */


//if (Foxtrick.platform == "Mobile" || Foxtrick.platform == "Android")
  Foxtrick.modules["MobileEnhancements"]={
	MODULE_CATEGORY : Foxtrick.moduleCategories.PRESENTATION,
	PAGES : ["all"],
	CSS : Foxtrick.InternalPath + "resources/css/mobile-enhancements.css",


	run : function(doc) { 
		var select = function(area) {
			if (area=="left" && lb) {
				if (lb)
					Foxtrick.removeClass(lb,'out');
				if (rb)
					Foxtrick.addClass(rb,'out');
				if (header)
					Foxtrick.addClass(page,'out');
			} 
			else if (area=="right" && rb) {
				if (rb)
					Foxtrick.removeClass(rb,'out');
				if (lb)
					Foxtrick.addClass(lb,'out');
				if (header)
					Foxtrick.addClass(page,'out');
			}
			else if ((area=="center" || (area=="right" &&!rb)) && cb ) {
				if (lb)
					Foxtrick.addClass(lb,'out');
				if (rb)
					Foxtrick.addClass(rb,'out');
				if (header)
					Foxtrick.addClass(page,'out');
			}
			else if (area=="header") {
				if (header)
					Foxtrick.removeClass(page,'out');
				if (lb)
					Foxtrick.addClass(lb,'out');
				if (rb)
					Foxtrick.addClass(rb,'out');
			}
			Foxtrick.modules["MobileEnhancements"].setMetaViewport(doc, "440");
		};

		var lb = doc.getElementsByClassName("subMenu")[0] || doc.getElementsByClassName("subMenuConf")[0];
		var cb = doc.getElementsByClassName("main")[0];
		var rb = doc.getElementById("sidebar");
		var header = doc.getElementById("header"); 
		var page = doc.getElementById("page"); 

		var header = doc.getElementById("header");
		var menu = doc.getElementById("menu");
		var mobile_header = doc.createElement('div');
		mobile_header.id = 'mobile_header';
		header.parentNode.insertBefore(mobile_header, header.nextSibling);
		
		var mobile_header_center = doc.createElement('div');
		mobile_header_center.id = 'mobile_header_center';
		mobile_header_center.classNme = 'mobile_header_center out';
		Foxtrick.onClick(mobile_header_center, function(ev){
			Foxtrick.toggleClass(mobile_header_center,"out");
		});
		mobile_header.appendChild(mobile_header_center);
		
		mobile_header_center.appendChild(menu);
		
		var mobile_header_center_tab = doc.createElement('div');
		mobile_header_center_tab.id = 'mobile_header_center_tab';
		var a = doc.createElement('a');
		a.href="#";
		a.textContent = "Menu";
		mobile_header_center_tab.appendChild(a);
		mobile_header_center.appendChild(mobile_header_center_tab);

		// attach a handler to the element's swipe event		
		Foxtrick.jester(cb,{swipeDistance:40})
				.swipe(function(touches,swipeDirection){
			Foxtrick.log("swipe",{swipeDirection:swipeDirection});
			if (swipeDirection.left)
				select("right")
			else if (swipeDirection.right)
				select("left")
		});
		Foxtrick.jester(mobile_header,{swipeDistance:5})
				.swipe(function(touches,swipeDirection){
			Foxtrick.log("swipe",{swipeDirection:swipeDirection});
			if (swipeDirection.down)
				select("header")
		});
		Foxtrick.jester(lb,{swipeDistance:10, preventDefault:true})
				.swipe(function(touches,swipeDirection){
			Foxtrick.log("swipe",{swipeDirection:swipeDirection});
			if (swipeDirection.left)
				select("center")
		});
		Foxtrick.jester(rb,{swipeDistance:10, preventDefault:true})
				.swipe(function(touches,swipeDirection){
			Foxtrick.log("swipe",{swipeDirection:swipeDirection});
			if (swipeDirection.right)
				select("center")
		});
		Foxtrick.jester(header,{swipeDistance:10, preventDefault:true})
				.swipe(function(touches,swipeDirection){
			Foxtrick.log("swipe",{swipeDirection:swipeDirection});
			if (swipeDirection.up)
				select("center")
		});
		/*Foxtrick.jester(mobile_header)
				.tab(function(touches){
			Foxtrick.log("tab");
			select("center")
		});*/
	
		if (lb)
			Foxtrick.addClass(lb,'out');
		if (rb)
			Foxtrick.addClass(rb,'out');
		if (header)
			Foxtrick.addClass(page,'out');
		Foxtrick.onClick(cb, function(ev){
			select("center");
		});
		
		if (!Foxtrick.isLoginPage(doc))
			select("center");

		this.setMetaViewport(doc, "440");
	},

	setMetaViewport : function (doc, width) {
		Foxtrick.log('setMetaViewport size: ',width)
		var html = doc.getElementsByTagName('html')[0];
		var old_viewport = doc.getElementById('foxtrick-viewport');
		if (old_viewport !== null) 
			html.removeChild(old_viewport);

		var meta = doc.createElement('meta');
		meta.id = "foxtrick-viewport";
		meta.setAttribute('name',"viewport" );
		meta.setAttribute('content', "width = "+width );
		html.insertBefore(meta, doc.getElementsByTagName('html')[0].firstChild);
	},

	setStyle : function(doc, id, css, size) {
		for (var i in Foxtrick.modules["MobileEnhancements"].pageActions) {
			Foxtrick.unload_css_permanent(Foxtrick.InternalPath + "resources/css/" + Foxtrick.modules["MobileEnhancements"].pageActions[i].css);
			Foxtrick.log('unload: ',Foxtrick.InternalPath + "resources/css/" + Foxtrick.modules["MobileEnhancements"].pageActions[i].css);
		}
		Foxtrick.load_css_permanent(Foxtrick.InternalPath + "resources/css/" + css);
		Foxtrick.log('load: ',Foxtrick.InternalPath + "resources/css/" + Foxtrick.modules["MobileEnhancements"].pageActions[i].css);
		var size = Foxtrick.util.layout.isRtl(doc) ? size.standard : size.simple;
		Foxtrick.modules["MobileEnhancements"].setMetaViewport(doc, size+'px');
	},
};
