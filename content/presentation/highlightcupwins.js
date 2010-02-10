/**
 * highlightcupwins.js
 * Script which makes the new mails more visible
 * @author convincedd
 */

var FoxtrickHighlightCupwins = {

    MODULE_NAME : "HighlightCupwins",
    MODULE_CATEGORY : Foxtrick.moduleCategories.PRESENTATION,
	PAGES : new Array('cupmatches'),
	DEFAULT_ENABLED : true,
	NEW_AFTER_VERSION: "0.5.0.2",
	LATEST_CHANGE : "Fixed for draws and for new cup match display method. Highlighting for masters refined.",
	LATEST_CHANGE_CATEGORY: Foxtrick.latestChangeCategories.FIX,
	OPTIONS : new Array("HighlightCupsets"),

    init : function() {
    },

    run : function( page, doc ) {
		try {
			var highlightCupsets = Foxtrick.isModuleFeatureEnabled(this, "HighlightCupsets");
			// matches of Hattrick Masters aren't arranged by cup ranks
			var isMasters = (doc.location.search.search(/\bCupId=183\b/i) !== -1);
			var highlightHomeWin = !isMasters && highlightCupsets;

			var mainBody=doc.getElementById('mainBody');
			var table= mainBody.getElementsByTagName('table')[0];
			for (var i=1;i<table.rows.length;++i) {
				var goals = table.rows[i].cells[3].innerHTML.match(/\d+/g);
				if (!goals) {
					// perhaps some results aren't shown
					continue;
				}
				var goalsHome=parseInt(goals[0]);
				var goalsAway=parseInt(goals[1]);

				// win, draw, lose from the aspect of home team
				var win = (goalsHome > goalsAway);
				var draw = (goalsHome === goalsAway); // 0 - 0 if match isn't played yet
				var lose = (goalsHome < goalsAway);
				var matchlink = table.rows[i].cells[2].getElementsByTagName('a')[0];
				var firstsep=matchlink.innerHTML.indexOf(' - ' );
				var hometeam = matchlink.innerHTML.substring(0,firstsep);
				// if there are names with ' - ' take the last part for away only
				var lastsep=matchlink.innerHTML.lastIndexOf(' - ' )+3;
				var awayteam = matchlink.innerHTML.substring(lastsep);
				if (win) {
					if (highlightCupsets) {
						table.rows[i].cells[3].innerHTML = '<strong>'+table.rows[i].cells[3].innerHTML+'</strong>';
					}
					matchlink.innerHTML = '<strong>'+hometeam+'</strong> - '+awayteam;
				}
				else if (lose) {
					matchlink.innerHTML = hometeam+' - <strong>'+awayteam+'</strong>';
				}
			}
		}
		catch(e){Foxtrick.dump(e);}
 	},

	change : function( page, doc ) {
	}
};