// ==UserScript==
// @name         Tags verstecken
// @version      0.1.4
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
        style.innerHTML = '.tags .spoiler{content:" ";bottom:1.4em;width:100%;display:block;background-color:rgba(22,22,24,0.96);z-index:11;position:absolute;top:0;left:0;}div.tags{position:relative;}.tag-toggle{padding-left:4px;white-space:nowrap;}';
        document.head.appendChild(style);
        $tagContainer.append('<div class="spoiler"> </div><a class="tag-toggle action">Tags anzeigen</a>');
        $tagContainer.on('click', '.tag-toggle', function(spoiler) {
            let $spoiler = $('.spoiler');
            let $tagToggle = $('.tag-toggle');
            if('block' === $spoiler.css('display')) {
                $spoiler.css('display', 'none');
                $tagToggle.text('Tags verbergen');
            } else {
                $spoiler.css('display', 'block');
                $tagToggle.text('Tags anzeigen');
            }
        });
    }

})();
