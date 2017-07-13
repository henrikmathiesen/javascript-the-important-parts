var obAccordian = {

    config: {
        container: $('.js-ob-accordian')
    },
    initialized: false,
    init: function (config) {
        if (config && typeof config === 'object') {
            $.extend(obAccordian.config, config);
        }

        obAccordian.$container = obAccordian.config.container;
        obAccordian.$sections = obAccordian.$container.find('ul.js-ob-accordian-sections > li');
        obAccordian.$sectionNav = $('<ul>').addClass('js-ob-accordian-section-nav').prependTo(obAccordian.$container);
        obAccordian.$itemNav = $('<ul>').addClass('js-ob-accordian-section-item-nav').insertAfter(obAccordian.$sectionNav);
        obAccordian.$content = $('<p/>').addClass('js-ob-accordian-content').insertAfter(obAccordian.$itemNav);

        obAccordian.buildSectionNav(obAccordian.$sections);
        obAccordian.$sectionNav.find('li').eq(0).trigger('click');
        obAccordian.$container.find('ul.js-ob-accordian-sections').hide();

        obAccordian.initialized = true;

        obAccordian.$container.removeClass('ob-hide');
    },
    buildSectionNav: function ($sections) {
        $sections.each(function () {
            var $section = $(this);

            $('<li/>')
                .text($section.find('h2:first').text())
                .appendTo(obAccordian.$sectionNav)
                .data('section', $section)
                .on('click', obAccordian.showSection);
        });
    },
    buildItemNav: function ($items) {
        $items.each(function () {
            var $item = $(this);
            $('<li>')
                .text($item.find('h3:first').text())
                .appendTo(obAccordian.$itemNav)
                .data('item', $item)
                .on('click', obAccordian.showContentItem);
        });
    },
    showSection: function () {
        var $li = $(this);

        obAccordian.$itemNav.empty();
        obAccordian.$content.empty();


        var $section = $li.data('section');

        $li.addClass('current').siblings().removeClass('current');

        var $items = $section.find('ul li');
        obAccordian.buildItemNav($items);

        obAccordian.$itemNav.find('li').eq(0).trigger('click');
    },
    showContentItem: function () {
        var $li = $(this);
        $li.addClass('current').siblings().removeClass('current');
        var $item = $li.data('item');
        obAccordian.$content.html($item.html());
    }
};

$(document).ready(obAccordian.init);
