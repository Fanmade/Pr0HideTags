// ==UserScript==
// @name         Tags verstecken
// @version      0.2.1
// @description  Versteckt die Tags um Spoiler zu vermeiden
// @author       Selektion
// @namespace    selektion
// @license      GPL-3.0; http://www.gnu.org/licenses/gpl-3.0.txt
// @include      http://pr0gramm.com/*
// @include      https://pr0gramm.com/*
// @match        https://pr0gramm.com/*
// @icon         http://pr0gramm.com/media/pr0gramm-favicon.png
// @updateURL    https://raw.githubusercontent.com/Fanmade/Pr0HideTags/master/hide_tags.js
// @downloadURL  https://raw.githubusercontent.com/Fanmade/Pr0HideTags/master/hide_tags.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    waitForKeyElements (".tags", sel_tags_init);
    function sel_tags_init($tagContainer) {
        const style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = 'span.tag{opacity:0.1;}a.tag-link{color:#f5f7f609;}.tags.show a.tag-link{color:#f5f7f6;}.tags.show span.tag{opacity:1;}.tag-toggle{white-space:nowrap;}';
        document.head.appendChild(style);
        $tagContainer.append('<a class="tag-toggle action">Tags anzeigen</a>');
        let $tagToggle = $('.tag-toggle');
        let $tags = $('.tags');
        $tagContainer.on('click', '.tag-toggle', function(spoiler) {
            if($tags.hasClass('show')) {
                $tags.removeClass('show');
                $tagToggle.text('Tags anzeigen');
            } else {
                $tags.addClass('show');
                $tagToggle.text('Tags verbergen');
            }
        });
    }
})();
