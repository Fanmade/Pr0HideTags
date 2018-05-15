// ==UserScript==
// @name         Tags verstecken
// @author       Selektion
// @namespace    selektion
// @include		 http://pr0gramm.com/*
// @include		 https://pr0gramm.com/*
// @version      0.1.1
// @description  Versteckt die Tags um Spoiler zu vermeiden
// @match        https://pr0gramm.com/*
// @icon		 http://pr0gramm.com/media/pr0gramm-favicon.png
// @updateURL    https://gist.githubusercontent.com/Fanmade/00c8c5907a16986e5dee8db600ccb2f8/raw/71db6bedee717a5f90ef2dd10ac4ce9e2e85c15a/hide_tags.js
// @downloadURL  https://gist.githubusercontent.com/Fanmade/00c8c5907a16986e5dee8db600ccb2f8/raw/71db6bedee717a5f90ef2dd10ac4ce9e2e85c15a/hide_tags.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    waitForKeyElements (".tags", sel_tags_init);
    function sel_tags_init($tagContainer) {
        const style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = '.tags .spoiler{content:" ";height:2em;width:100%;display:block;background-color:rgba(22,22,24,0.96);z-index:11;position:absolute;top:0;left:0;}div.tags{position:relative;}.toggle-action{padding-left:4px;}';
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
