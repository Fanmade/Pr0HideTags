// ==UserScript==
// @name         Tags verstecken
// @version      0.8.10
// @description  Versteckt die Tags um Spoiler zu vermeiden
// @author       Selektion
// @namespace    selektion
// @license      GPL-3.0; http://www.gnu.org/licenses/gpl-3.0.txt
// @include      http://pr0gramm.com/*
// @include      https://pr0gramm.com/*
// @match        https://pr0gramm.com/*
// @icon         http://pr0gramm.com/media/pr0gramm-favicon.png
// @downloadURL  https://raw.githubusercontent.com/Fanmade/Pr0HideTags/master/hide_tags.user.js
// @updateURL    https://raw.githubusercontent.com/Fanmade/Pr0HideTags/master/hide_tags.user.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    const selDefaultSetting = 1;
    const selTagSettings = ["Nie","Immer","Nur bei Videos","Nur bei \"gegen Spoiler\" oder \"unerwartet\" in den Tags"];
    waitForKeyElements (".tags", selTagsInit);
    function selBuildMenu(selectedSetting, returnHtml) {
        let tagMenu = '<div class="sel-tag-menu"><a class="sel-close">x</a><h4>Tags verbergen:</h4>';
        for(var i = 0;i < selTagSettings.length;i++) {
            let checked = (i === selectedSetting);
            tagMenu += '<li' + (checked ? ' class="active"' : '') + '><label>' + selTagSettings[i] + '<input type="radio" name="sel-tag-setting" value="' + i + '"' + (checked ? ' checked="checked"' : '') + '></label></li>';
        }
        tagMenu += '</ul></div>';
        if (true === returnHtml) {
            return tagMenu;
        } else {
            let $oldContainer = $('.sel-tag-menu');
            $oldContainer.html($(tagMenu).html());
        }
    };
    function getSetting(){
        let cookieVal = $.cookie('sel-tags');
        if (undefined == cookieVal) {
            setSetting(selDefaultSetting);
            return selDefaultSetting;
        } else {
            return parseInt(cookieVal);
        }
    }
    function setSetting(val){
        $.cookie("sel-tags", val,{path:'/'});
    }
    function showTags(){
        let $tags = $('.tags');
        let $tagToggle = $('.sel-tag-toggle');
        $tags.addClass('show');
        $tagToggle.text('Tags verbergen');
    };
    function hideTags(){
        let $tags = $('.tags');
        let $tagToggle = $('.sel-tag-toggle');
        $tags.removeClass('show');
        $tagToggle.text('Tags anzeigen');
    };
    function hasTag(searchTags, callback) {
        let id = window.location.href.match(/[new/|top/]([0-9]{3,})/);
        let result = false;
        if(0 < id.length) {
            id = parseInt(id[1]);
            $.get(location.protocol + "//pr0gramm.com/api/items/info?itemId=" + id, function( data ) {
                if (undefined != data.tags) {
                    $.each(data.tags, function(key,item) {
                        if (undefined != item.tag && undefined != item.confidence) {
                            searchTags.forEach(function(searchTag) {
                                let lowerCaseTag = item.tag.toLowerCase();
                                if (lowerCaseTag.indexOf(searchTag) >= 0 && item.confidence >= 0.2 && '"' + searchTag + '"' != lowerCaseTag) {
                                    result = true;
                                    return true;
                                }
                            });
                        }
                    });
                    if (!result) {
                        callback.call();
                    }
                    return result;
                }
            });
        } else {
            callback.call();
            return false;
        }
    }
    function selTagsInit($tagContainer) {
        const style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = '.sel-nobreak{white-space:nowrap;position:relative;}span.tag{opacity:0.1;}a.tag-link{color:#f5f7f609;}.tags.show a.tag-link{color:#f5f7f6;}.tags.show span.tag{opacity:1;}a.sel-tag-settings.pict{font-size:10px;color:#ee4d2e;color:var(--theme-main-color);margin-left:4px;}a.sel-tag-settings.pict:hover{color:#f5f7f6;}.sel-tag-menu{opacity:.75;position:absolute;left:0;top:2em;z-index:100;border:3px solid #2a2e31;background-color:#161618;box-shadow:2px 0 10px #000;min-width:300px;max-height:50vh;}.sel-tag-menu h4{padding-bottom:3px;border-bottom:2px solid #252525;margin:0.3em;}.sel-tag-menu ul{list-style:none;pading-left:.3em;}.sel-tag-menu li{list-style:none;color:#666;}.sel-tag-menu li:hover{color:#ee4d2e;color:var(--theme-main-color);}.sel-tag-menu li.active{color:inherit;}.sel-tag-menu label{border-bottom:1px solid #252525;padding:2px 0 4px 4px;}.sel-tag-menu input[type="radio"]{display:none;}.sel-tag-menu{display:none;}.sel-tag-menu.visible{display:block;}.sel-close{position:absolute;right:0;top:0;padding:.3em;}';
        document.head.appendChild(style);
        let selSelectedSetting = getSetting();
        $tagContainer.append('<span class="sel-nobreak"><a class="sel-tag-toggle action">Tags anzeigen</a><a class="sel-tag-settings pict" type="button">#</a>' + selBuildMenu(selSelectedSetting, true) + '</span>');
        switch(selSelectedSetting){
            case 0: //never
                showTags();
                break;
            case 1: // always
                hideTags();
                break;
            case 2: // only videos
                hideTags();
                hasTag(['webm'], showTags);
                break;
            case 3: // only spoilers
                hideTags();
                hasTag(['gegen spoiler', 'unerwartet'], showTags);
                break;
        }
        const $menu = $('.sel-tag-menu');
        let $tags = $('.tags');
        $tagContainer.on('click', '.sel-tag-toggle', function() {
            if($tags.hasClass('show')) {
                hideTags();
            } else {
                showTags();
            }
        });
        $tagContainer.on('change', 'input[type=radio]', function() {
            selSelectedSetting = parseInt(this.value);
            selBuildMenu(selSelectedSetting);
            setSetting(selSelectedSetting);
        });
        $tagContainer.on('click', '.sel-close', function() {
            $menu.removeClass('visible');
        });
        $tagContainer.on('click', '.sel-tag-settings', function() {
            if ($menu.hasClass('visible')) {
                $menu.removeClass('visible');
            } else {
                $menu.addClass('visible');
            }
        });

    }
})();
