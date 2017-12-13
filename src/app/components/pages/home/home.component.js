"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var flyer_service_1 = require("./../../../service/flyer/flyer.service");
var dialog_service_1 = require("./../../../service/dialog/dialog.service");
var core_1 = require("@angular/core");
var HomeComponent = (function () {
    function HomeComponent(dialogsService, flyerService) {
        this.dialogsService = dialogsService;
        this.flyerService = flyerService;
    }
    HomeComponent.prototype.openDialog = function () {
        var _this = this;
        this.dialogsService
            .open('Upload Background Image', 'Drag your image here..')
            .subscribe(function (res) { return _this.result = res; });
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.showFlyerElements();
    };
    HomeComponent.prototype.ngAfterViewChecked = function () {
        sidenavDraggables($('.drp_stills'), STILL_HTML);
        sidenavDraggables($('.drp_text'), TEXT_HTML);
    };
    HomeComponent.prototype.showFlyerElements = function () {
        var _this = this;
        this.sub = this.flyerService.getFlyerElements()
            .subscribe(function (res) {
            _this.flyerElementArr = res.elements;
        });
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.sub.destroy();
    };
    //jQuery code goes here
    HomeComponent.prototype.ngAfterViewInit = function () {
        $(function () {
            var selected_element;
            $('#wrapper').ruler({ unit: 'px', showLabel: true, arrowStyle: 'arrow' });
            /**
             * remove draggable element
             */
            $(document).on('click', '#remove-element', function () {
                removeDOMElement(selected_element);
            });
            /**
             * draggable option (inside the ruler)
             */
            var draggableOptions = {
                containment: $('.ef-ruler'),
                scrollSpeed: 25,
                scrollSensitivity: 100,
                start: function () {
                    selected_element = $(this);
                    if (selected_element.hasClass('flyer-element-blank')) {
                        selected_element.css({ 'z-index': 1 });
                    }
                    else {
                        selected_element.css({ 'z-index': draggableZindex++ });
                    }
                    selected_element.css({ 'cursor': 'move' });
                },
                stop: function () {
                    $('#x-coord').val(getChildElementCoordinate($(this)).top);
                    $('#y-coord').val(getChildElementCoordinate($(this)).left);
                },
                drag: function (e) {
                    selected_element = $(this);
                    $('#x-coord').val(getChildElementCoordinate($(this)).top);
                    $('#y-coord').val(getChildElementCoordinate($(this)).left);
                    $('#input-element-height').val(getElementDimensions($(this)).height);
                    $('#input-element-width').val(getElementDimensions($(this)).width);
                    if (selected_element) {
                        highlightFlyerElement(selected_element);
                    }
                }
            };
            /**
             * move selected element using keyboard arrow keys
             */
            $(document).keydown(function (event) {
                if (!selected_element) {
                    return;
                }
                switch (event.which) {
                    case 37:
                        if (selected_element.css('left').slice(0, -2) <= 0) {
                            return;
                        }
                        var x_coord = parseInt(selected_element.css('left')) - 1;
                        animateFlyerPos(selected_element, x_coord, null);
                        break;
                    case 38:
                        if (selected_element.css('top').slice(0, -2) <= 0) {
                            return;
                        }
                        var y_coord = parseInt(selected_element.css('top')) - 1;
                        animateFlyerPos(selected_element, null, y_coord);
                        break;
                    case 39:
                        var x_coord = parseInt(selected_element.css('left')) + 1;
                        animateFlyerPos(selected_element, x_coord, null);
                        break;
                    case 40:
                        var y_coord = parseInt(selected_element.css('top')) + 1;
                        animateFlyerPos(selected_element, null, y_coord);
                        break;
                    default: return;
                }
                $('#x-coord').val(getChildElementCoordinate(selected_element).top);
                $('#y-coord').val(getChildElementCoordinate(selected_element).left);
                return false;
            });
            /**
             * resizable inside the ruler
             */
            var resizableOptions = {
                containment: $('.ef-ruler'), handles: { se: '.segrip' },
                resize: function () {
                    $('#input-element-height').val(getElementDimensions($(this)).height);
                    $('#input-element-width').val(getElementDimensions($(this)).width);
                }
            };
            /**
             * droppable inside the ruler
             */
            var droppableOptions = {
                accept: ".drp-flyer-element",
                tolerance: 'pointer',
                drop: function (ev, ui) {
                    $('.flyer-element').each(function () {
                        $(this).removeClass('selected-element');
                    });
                    var newPosX = ui.offset.left - $(this).offset().left;
                    var newPosY = ui.offset.top - $(this).offset().top;
                    var drp_element = null;
                    if ($(ui.helper).hasClass('flyer-element-stills')) {
                        drp_element = $(STILL_HTML);
                    }
                    else if ($(ui.helper).hasClass('flyer-element-text')) {
                        drp_element = $(TEXT_HTML);
                    }
                    var droppableElement = $(drp_element)
                        .draggable(draggableOptions)
                        .resizable(resizableOptions)
                        .css({ left: newPosX, top: newPosY })
                        .appendTo('.ef-ruler .stage')
                        .addClass('selected-element');
                    selected_element = droppableElement;
                }
            };
            /**
             * highlight flyer when dblclicking
             */
            $(document).on('dblclick', '.flyer-element', function () {
                selected_element = $(this);
                highlightFlyerElement(selected_element);
                $('#x-coord').val(getChildElementCoordinate(selected_element).top);
                $('#y-coord').val(getChildElementCoordinate(selected_element).left);
                $('#input-element-height').val(getElementDimensions($(this)).height);
                $('#input-element-width').val(getElementDimensions($(this)).width);
            });
            $('#drg-flyer').draggable(draggableOptions).resizable(resizableOptions);
            $('#wrapper .ef-ruler .stage').droppable(droppableOptions);
            /**
             * hide selected flyer element property by click inside the ruler
             */
            $(document).on('click', '.ef-ruler', function () {
                if (!selected_element) {
                    return;
                }
                var str_elements = '';
                for (var i = 0; i < propertyArrayElements.length; i++) {
                    var el = '#' + propertyArrayElements[i];
                    if (i !== propertyArrayElements.length - 1) {
                        el += ', ';
                    }
                    str_elements += el;
                }
                $(str_elements).css({ 'display': 'none' });
                selected_element.removeClass('selected-element');
                selected_element = null;
            });
            /**
             * set flyer element coordinates
             */
            $(document).on('click', '#set-coord', function (e) {
                if (!selected_element) {
                    return;
                }
                var x_coord = parseInt($('#x-coord').val());
                var y_coord = parseInt($('#y-coord').val());
                animateFlyerPos(selected_element, y_coord, x_coord);
                animateElementDimension(selected_element, $('#input-element-width').val(), $('#input-element-height').val());
            });
            /**
             * catch keypress and set coordinates
             */
            $(document).on('keypress', '#x-coord, #y-coord, #input-element-width, #input-element-height', function (e) {
                if (!selected_element) {
                    return;
                }
                if (e.which == 13) {
                    $('#set-coord').trigger('click');
                }
            });
        });
    };
    return HomeComponent;
}());
__decorate([
    core_1.ViewChild('wrapper'),
    __metadata("design:type", core_1.ElementRef)
], HomeComponent.prototype, "_wrappper", void 0);
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'home.component.html',
        styleUrls: ['home.component.css'],
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [dialog_service_1.DialogService, flyer_service_1.FlyerService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map