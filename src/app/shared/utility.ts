'use strict';

    declare var $: any;

    export var uiZindex = 3;
    export var sel_ui: any;

    export var STILL_HTML = '<div class="ui-widget-content flyer-element flyer-element-stills selected-element" title="Double Click To Select"><span class="still-ordinal"></span><div class="ui-resizable-handle ui-resizable-se segrip"></div></div>';
    export var TEXT_HTML = '<div class="ui-widget-content flyer-element flyer-element-text" title="Double Click To Select"><i class="material-icons drg-input-icon">more_vert</i><input id="" name="" type="text" style="width:100%; height:100%"><div class="ui-resizable-handle ui-resizable-se segrip"></div></div>';

    var wrapper = $('#wrapper');
    var ruler_padding_num  = 20
    var element_arr: any = [];


    /**
     * sidenav draggables
     * @param {*jquery element} element 
     * @param {* html} htmlElement 
     */
    export function uiDraggable(element: any, htmlElement: any) {
        if(!element && !htmlElement) { return; }
        
        return element.draggable({
            start: function (event: any, ui: any) {
                var html = $(ui)[0].helper[0];

                $('.text-property, .still-property, flyer-property').css('display', 'none');
                $('.ruler.left, .ruler.top, .corner').css("z-index", -1);
                wrapper.addClass('highlight-wrapper');

                $('.flyer-element').each(function() {
                    $(this).css({ 'z-index': -1 });
                })

                $(html).addClass('tilt-draggables').css({ 'z-index': '99' }); 

                sel_ui = $(this);

            },
            stop: function(event: any, ui: any) {
                var drg_ui = $(ui)[0].helper[0];

                wrapper.removeClass('highlight-wrapper');

                $('.flyer-element-blank').css({ 'z-index': 1 });
                $('.flyer-element-stills, .flyer-element-text').each(function() {
                    $(this).css({ 'z-index': 2 });
                })

                showElementProperty($(drg_ui));

            },
            helper: function () {
                return $(htmlElement);
            },
            drag: function() {
                highlightUI($(this));
            }
        });
    }

    /**
     * show and hide selected property of an element
     * @param {*jquery element} element 
     */
    export function showElementProperty(element: any) {
        if(!element) { return; }

        $('.text-property, .still-property, .flyer-property').css('display', 'none');

        if(element.hasClass('flyer-element-text')) {
            $('.text-property').css('display', 'block');
        } else if(element.hasClass('flyer-element-stills')) {
            $('.still-property').css('display', 'block');
        } else if(element.hasClass('flyer-element-blank')) {
            $('.flyer-property').css('display', 'block');
        } 
    }

    /**
     * get draggable element coordinate position
     * @param selected element 
     */
    export function getUICoordinate (element: any) {
        if(!element) { return; }

        var childPos = element.offset();
        var parentPos = element.parent().offset();
        var childOffset = {
            top: parseInt(childPos.top) - parseInt(parentPos.top),
            left: parseInt(childPos.left) - parseInt(parentPos.left)
        }
        if(childOffset.top == 1) {
            childOffset.top = 0;
        }
        if(childOffset.left == 1) {
            childOffset.left = 0;
        }

        if(element.hasClass('flyer-element-stills')) {
            if(childOffset.top == ruler_padding_num) {
                childOffset.top = 0;
            }
            if(childOffset.left == ruler_padding_num) {
                childOffset.left = 0;
            }
        }
        return childOffset;
    }

    export function getUIDimensions(element: any) {
        if(!element) { return; }

        var dimension = {
            height: element.height(),
            width: element.width()
        }
        return dimension;
    }

    /**
     * highlight clicked or dragged element
     * @param {jquery element}  
     */
    export function highlightUI(element: any) {
        if(!element) { return; }
        
        $('.flyer-element').removeClass('selected-element');

        element.addClass('selected-element');
    }

    /**
     * set flyer animation
     * @param selected element 
     * @param x coodinate
     * @param y coodinate
     */
    export function animateUI (element: any, x: any = null, y: any = null) {
        if(!element) { return; }

        if(x == 0)  x = 1;

        if(y === 0)  y = 1;

        if(x != null) {
            element.css({ 'transition' : 'all 0.5s ease', left: x + 'px' })
        }
        if(y != null) {
            element.css({ 'transition' : 'all 0.5s ease', top: y + 'px' })
        }
        
        setTimeout(function(){ 
            element.css({ 'transition' : 'none' })    
        }, 600);
    }

    /**
     * set and animate element dimensions
     * @param element 
     * @param w 
     * @param h 
     */
    export function animateUIDimension(element: any, w: any = null, h: any = null) {
        if(!element) { return; }

        if(w != null) {
            element.css({ 'transition' : 'all 0.5s ease', width: w + 'px' })
        }
        if(h != null) {
            element.css({ 'transition' : 'all 0.5s ease', height: h + 'px' })
        }

        setTimeout(function(){ 
            element.css({ 'transition' : 'none' })    
        }, 600);
    }
