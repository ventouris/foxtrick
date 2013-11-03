'use strict';
/**
* copy-match-id.js
* Foxtrick Copies post id to clipboard
* @author convinced
*/

Foxtrick.modules['CopyMatchID'] = {
	MODULE_CATEGORY: Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES: ['matches', 'matchesArchive', 'matchesHistory',
					'matchesLatest', 'arena', 'matchLineup'],
	//CSS: Foxtrick.InternalPath + 'resources/css/copy-match-id.css',

	run: function(doc) {
		var copyId = function(ev) {
			try {
				var matchid = ev.target.getAttribute('matchid');
				var insertBefore = doc.getElementById('testingNewHeader') ||
					doc.getElementsByTagName('h1')[1];
				Foxtrick.copyStringToClipboard(matchid);
				var note = Foxtrick.util.note.add(doc, insertBefore, 'ft-match-id-copy-note',
				                                  Foxtrick.L10n.getString('copy.matchid.copied'),
				                                  null, true, true);
			}
			catch (e) {
				Foxtrick.log(e);
			}
		};

		var count = 0;

		if (Foxtrick.isPage(doc, 'matchesArchive')
			|| Foxtrick.isPage(doc, 'matches')
			|| Foxtrick.isPage(doc, 'matchesHistory')
			|| Foxtrick.isPage(doc, 'matchesLatest')
			|| Foxtrick.isPage(doc, 'arena')) {
			var cells = doc.getElementById('mainBody').getElementsByTagName('td');
			for (var i = 0; i < cells.length; i++) {
				// nested table check
				var td = cells[i].getElementsByTagName('td').length;
				if (td != 0)
					continue;

				var images = cells[i].getElementsByTagName('img');
				for (var j = 0; j < images.length; j++) {
					if (images[j].className.search(new RegExp('matchLeague|matchFriendly' +
					    '|matchMasters|matchCup|matchQualification|matchTournament' +
						'|matchSingleMatch')) == -1)
						continue;

					var href = '';
					var links = cells[i + 1].getElementsByTagName('a');
					for (var j = 0; j < links.length; j++) {
						if (links[j].href.match(/Club\/Matches\/Match\.aspx/i)) {
							href = links[j].href;
							break;
						}
					}
					if (href == '')
						continue;
					var matchid = href.replace(/.+matchID=/i, '').match(/^\d+/)[0];

					images[j].setAttribute('title', images[j].title + ': ' +
					                       Foxtrick.L10n.getString('copy.matchid'));
					images[j] = Foxtrick.makeFeaturedElement(images[j], this);
					images[j].setAttribute('matchid', matchid);
					images[j].setAttribute('id', '_' + this.MODULE_NAME + count);
					Foxtrick.onClick(images[j], copyId);
					Foxtrick.addClass(images[j], 'ft-link');

					count++;
				}
			}
		}
		else if (Foxtrick.isPage(doc, 'matchLineup')) {
			var images = doc.getElementById('mainBody').getElementsByTagName('img');
			for (var i = 0; i < images.length; i++) {
				if (images[i].className.search(
				    /matchLeague|matchFriendly|matchMasters|matchCup|matchQualification/) == -1)
					continue;

				var href = '';
				var links = doc.getElementById('ctl00_ctl00_CPContent_divStartMain').getElementsByTagName('a');
				for (var j = 0; j < links.length; j++) {
					if (links[j].href.match(/Club\/Matches\/Match\.aspx/i)) {
						href = links[j].href;
						break;
					}
				}
				var matchid = href.replace(/.+matchID=/i, '').match(/^\d+/)[0];

				images[i].setAttribute('title', images[i].title + ': ' +
				                       Foxtrick.L10n.getString('copy.matchid'));
				images[i] = Foxtrick.makeFeaturedElement(images[i], this);
				images[i].setAttribute('matchid', matchid);
				images[i].setAttribute('id', '_' + this.MODULE_NAME + count);
				Foxtrick.onClick(images[i], copyId);

				count++;
				break;

			}
		}
	}
};
