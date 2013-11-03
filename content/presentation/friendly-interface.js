'use strict';
/**
 * friendly-interface
 * More friendly interface tweaks
 * @author ryanli, convincedd
 */

Foxtrick.modules['FriendlyInterface'] = {
	MODULE_CATEGORY: Foxtrick.moduleCategories.PRESENTATION,
	PAGES: ['matchLineup', 'playerDetails', 'guestbook', 'dashboard'],
	CSS: Foxtrick.InternalPath + 'resources/css/friendly-interface.css',
	OPTIONS: [
		'FullPlayerNameInLineUp',
		'NtLinkForNtPlayer',
		'HideAnswerTo',
		'HideSpeechlessSecretary'
	],

	run: function(doc) {
		if (Foxtrick.isPage(doc, 'matchLineup')
			&& Foxtrick.Prefs.isModuleOptionEnabled('FriendlyInterface', 'FullPlayerNameInLineUp')) {
			// show full player names while hiding overflew characters
			var field = doc.getElementsByClassName('field')[0];
			var names = field.getElementsByClassName('name');
			for (var i = 0; i < names.length; ++i) {
				var name = names[i];
				Foxtrick.addClass(name, 'ft-fullPlayerName');
				var link = name.getElementsByTagName('a')[0];
				// link may not be present for youth matches
				// (when a team walks over)
				if (!link) {
					return;
				}
				var setName = function(s) {
					link.textContent = s;
				};
				var original = link.textContent; // original name shown in link
				var full = link.title; // full name shown in link title
				if (original.substr(1, 3) == '.  ') { // in form like 'J.  Doe'
					var initial = original[0]; // first character of first name
					var lastNameShown = original.substr(4);
					// ellipsis as the last two characters, remove it
					if (lastNameShown.substr(lastNameShown.length - 2) == '..') {
						lastNameShown = lastNameShown.substr(0, lastNameShown.length - 2);
						var firstNameLength = full.match(RegExp('^(' + initial +
						                                 '\\S*)\\s'))[1].length;
						var remaining = full.substr(firstNameLength + 1);
						// remove space after first name
						var lastNamePos = remaining.indexOf(lastNameShown);
						var lastName = remaining.substr(lastNamePos);
						setName(initial + '. ' + lastName);
					}
					else {
						setName(original);
					}
				}
				else { // in form like 'Jesus'
					setName(full);
				}
			}
		}
		else if (Foxtrick.isPage(doc, 'playerDetails')
			&& Foxtrick.Prefs.isModuleOptionEnabled('FriendlyInterface', 'NtLinkForNtPlayer')) {
			// show national team names as links in national players' page
			var playerInfo = doc.getElementsByClassName('playerInfo')[0];
			if (!playerInfo)
				return;
			// a player has highlight <=> he is a national player
			var highlight = playerInfo.getElementsByClassName('highlight')[0];
			if (highlight) {
				var text = highlight.textContent;
				var leagueId = Foxtrick.Pages.Player.getNationalityId(doc);
				var league = Foxtrick.XMLData.League[leagueId];
				var ntName = league.LeagueName;
				var ntId = league.NationalTeamId;
				var u20Name = 'U-20 ' + ntName;
				var u20Id = league.U20TeamId;
				var replace = function(team, id) {
					highlight.textContent = text.substr(0, text.indexOf(team));
					var link = Foxtrick.createFeaturedElement(doc, Foxtrick.modules.FriendlyInterface,
					                                          'a');
					link.textContent = team;
					link.href = '/Club/NationalTeam/NationalTeam.aspx?teamId=' + id;
					highlight.appendChild(link);
					highlight.appendChild(doc.createTextNode(text.substr(text.indexOf(team) +
					                                                     team.length)));
				};
				// find U20 first because generally NT name is a substring of U20 name
				if (text.indexOf(u20Name) > -1) // u20 player
					replace(u20Name, u20Id);
				else if (text.indexOf(ntName) > -1) // nt player
					replace(ntName, ntId);
			}
		}
		else if (Foxtrick.isPage(doc, 'guestbook')
			&& Foxtrick.Prefs.isModuleOptionEnabled('FriendlyInterface', 'HideAnswerTo')) {
			var links = doc.getElementById('mainBody').getElementsByTagName('a');
			var answerToLinks = Foxtrick.filter(function(n) {
				return (n.href.search(/Guestbook\.aspx/i) >= 0);
			}, links);
			Foxtrick.map(function(n) {
				Foxtrick.addClass(n, 'hidden');
				Foxtrick.addClass(n.parentNode, 'ft-hiddenGBLinkContainer');
			}, answerToLinks);
		}
		else if (Foxtrick.isPage(doc, 'dashboard')
			&& Foxtrick.Prefs.isModuleOptionEnabled('FriendlyInterface',
			                                       'HideSpeechlessSecretary')) {
			if (doc.getElementsByClassName('pmNextMessageCounter').length)
				return; // there are unread messages
			// nothing new, container should be marked as hidden
			var container = doc.getElementsByClassName('pmContainer')[0];
			Foxtrick.addClass(container, 'hidden');
		}
	}
};
