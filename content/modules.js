/*
* modules.js
* This file lists all modules of FoxTrick.
*
* Modules that need to be initialized and register their page handlers
* in the beginning.
* Each should implement an init() method, which will be called only once.
* And there should also be run(page, doc) and change(page, doc) functions,
* which are called when the page is loaded or changed, respectively.
*/

if (!Foxtrick) var Foxtrick={};

Foxtrick.modules = [
	Foxtrick.XMLData,
	FoxtrickReadHtPrefs,
	FoxtrickFirstRun,
	FoxtrickPrefsDialogHTML,
	FoxtrickOnPagePrefs,
	Foxtrick.Matches,
	FoxtrickForumStripHattrickLinks,
	FoxtrickForumChangePosts,
	FoxtrickShowForumPrefButton,
	FoxtrickMovePlayerSelectbox,  // keep before others on playerdetails page
	FoxtrickManagerButtons,   // keep before FoxtrickAddDefaultFaceCard
	FoxtrickMovePlayerStatement,
	FoxtrickFixcssProblems,
	FoxtrickSimplePresentation,
	FoxtrickForumPresentation,
	FoxtrickForumTemplates,
	FoxtrickForumPreview,
	FoxtrickForumYouthIcons,
	Foxtrick.BookmarkAdjust,
	FoxtrickAddDefaultFaceCard,
	FoxtrickMoveLinks,   // keep before FoxtrickHideManagerAvatarUserInfo
	//FoxtrickAlltidFlags,  // keep before FoxtrickHideManagerAvatarUserInfo
	FoxtrickForumAlterHeaderLine,
	FoxtrickTeamPopupLinks,
	FoxtrickTeamPopupLinksMore,
	FoxtrickHideManagerAvatarUserInfo,
	FoxtrickGoToPostBox,
	FoxtrickContextMenuCopy,
	FoxtrickHeadercopyicons,
	FoxtrickCopyTrainingReport,
	FoxtrickCopyScoutReport,
	FoxtrickCopyPlayerSource,
	FoxtrickFormatPostingText,
	FoxtrickCopyPostID,
	FoxtrickStaffMarker,
	FoxtrickHTThreadMarker,
	FoxtrickMedianTransferPrice,
	FoxtrickYouthSkillNotes,
	FoxtrickAddLeaveConfButton,
	FoxtrickStarsCounter,
	FoxtrickFlagCollectionToMap,
	FoxtrickTransferSearchFilters,
	FoxtrickTransferDeadline,
	FoxtrickExtendedPlayerDetails,
	FoxtrickLastLogin,
	FoxtrickExtendedPlayerDetailsWage,
	FoxtrickHTDateFormat,
	FoxtrickMatchReportFormat,
	FoxtrickMatchPlayerColouring,
	Foxtrick.AttVsDef, // AttVsDef should be placed before Ratings
	Foxtrick.Ratings,
	Foxtrick.htmsStatistics, // htmsStatistics should be placed after Ratings
	FoxtrickSkillTable,
	Foxtrick.TeamStats,  // before FoxtrickLinksPlayers
	FoxtrickAlert,
	FoxtrickAlertCustomOff,
	FoxtrickAlertCustomSounds,
	FoxtrickOriginalFace,
	FoxtrickBackgroundFixed,
	FoxtrickCopyPlayerAd,
	FoxtrickCopyRatings,
	FoxtrickLinksCustom,
	FoxtrickLinksLeague,
	FoxtrickLinksCountry,
	FoxtrickLinksTeam,
	FoxtrickLinksChallenges,
	FoxtrickLinksEconomy,
	FoxtrickLinksYouthOverview,
	FoxtrickLinksYouthTraining,
	FoxtrickLinksYouthPlayerDetail,
	FoxtrickLinksYouthMatchList,
	FoxtrickLinksYouthPlayerList,
	FoxtrickLinksArena,
	FoxtrickLinksCoach,
	FoxtrickLinksPlayerDetail,
	FoxtrickLinksMatch,
	FoxtrickLinksTraining,
	FoxtrickLinksAlliances,
	FoxtrickLinksNational,
	FoxtrickLinksManager,
	FoxtrickLinksAchievements,
	FoxtrickLinksPlayers,
	FoxtrickLinksFans,
	FoxtrickLinksStaff,
	FoxtrickLinksTracker,
	FoxtrickLinksClubTransfers,
	FoxtrickConfirmActions,
	FoxtrickHideSignatures,
	FoxtrickMarkUnread,
	FoxtrickForumNextAndPrevious,
	FoxtrickForumLastPost,
	FoxtrickPersonalityImages,
	FoxtrickSkillColoring,
	FoxtrickSkinPlugin,
	FoxtrickMatchIncome,
	FoxtrickHelper,
	FoxtrickLargeFlags,
	FoxtrickTeamSelectBox,
	FoxtrickSeniorTeamShortCuts,
	FoxtrickExtraShortcuts,
	FoxtrickCustomMedals,
	FoxtrickForumRedirManagerToTeam,
	FoxtrickRedirections,
	FoxtrickCurrencyConverter,
	FoxtrickTickerColoring,
	FoxtrickSeasonStats,   // keep before FoxtrickCopyMatchID
	FoxtrickHistoryStats,   // keep before FoxtrickCopyMatchID
	FoxtrickCopyMatchID,
	FoxtrickHeaderFix,
	FoxtrickHeaderFixLeft,
	FoxtrickNewMail,
	FoxtrickPlayerBirthday,
	FoxtrickLeagueNewsFilter,
	FoxtrickShortPAs,
	FoxtrickCopyPosting,
	FoxtrickMoveManagerOnline,
	// FoxtrickForumSearch,  // new not finished
	FoxtrickTables,
	FoxtrickMatchTables,
	FoxtrickCrossTable,
	FoxtrickYouthSkillHideUnknown,
	FoxtrickHighlightCupwins,
	FoxtrickElectionTable,
	FoxtrickSkillTranslation,
	FoxtrickLineupShortcut,
	//FoxtrickSingleline2,
	FoxtrickYouthPromotes,
	FoxtrickCountyList,
	FoxtrickSmallerPages, // new not finished //after FoxtrickTransferDeadline and probably also after all other player detail adjustment, so keep it in the end
	FoxtrickHighlightBotTeams,
	FoxtrickLeagueAndMatchChat,
	FoxtrickRapidId,
	FoxtrickForumStage,
	FoxtrickExtraPlayerInfo,
	FoxtrickPlayerFilters,
	FoxtrickYouthSeriesEstimation,
	FoxtrickTransferSearchResultFilters,
	FoxtrickForumThreadAutoIgnore,
	FoxtrickTableSort
	//FoxtrickLocalTime
];
