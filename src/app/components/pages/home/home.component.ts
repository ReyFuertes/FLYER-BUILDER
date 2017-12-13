import { FlyerElement } from './../../../model/flyer';
import { FlyerService } from './../../../service/flyer/flyer.service';
import { DialogService } from './../../../service/dialog/dialog.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import {
  showElementProperty, getUICoordinate, uiDraggable, getUIDimensions,
  highlightUI, animateUI, animateUIDimension, STILL_HTML, TEXT_HTML,
  uiZindex
} from './../../../shared/utility';

declare var $: any;

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  public result: any;

  public element_array: any[] = [
    { 'name': 'Still', 'class': 'drp-flyer-element drp_stills ui-draggable ui-draggable-handle', 'icon': 'photo' },
    { 'name': 'Text', 'class': 'drp-flyer-element drp_text ui-draggable ui-draggable-handle', 'icon': 'text_fields' },
    { 'name': 'Static', 'class': 'drp-flyer-element ui-draggable ui-draggable-handle', 'icon': 'crop_square' },
    { 'name': 'Agent Picture', 'class': 'drp-flyer-element ui-draggable ui-draggable-handle', 'icon': 'tag_faces' },
    { 'name': 'Realtor', 'class': 'drp-flyer-element ui-draggable ui-draggable-handle', 'icon': 'card_travel' }
  ]
  sub: any;

  constructor(private dialogsService: DialogService, private flyerService: FlyerService) {

  }

  ngOnInit() {
    this.listFlyerElements();
  }

  ngAfterViewChecked() {
    uiDraggable($('.drp_stills'), STILL_HTML);

    uiDraggable($('.drp_text'), TEXT_HTML);
  }

  listFlyerElements() {

  }

  ngOnDestroy() {
    this.sub.destroy();
  }

  ngAfterViewInit() {
    $(function () {
      var sel_ui: any;

      $('#wrapper').ruler({ unit: 'px', showLabel: true, arrowStyle: 'arrow' });

      var draggableOption = {
        containment: $('.rsf-ruler'),
        scrollSpeed: 25,
        scrollSensitivity: 100,
        start: function () {
          if ($(this).hasClass('flyer-element-blank')) {
            $(this).css({ 'z-index': 1 });
          } else {
            $(this).css({ 'z-index': this.draggableZindex++ });
          }
          $(this).css({ 'cursor': 'move' });

          sel_ui = $(this);
        },
        stop: function () {


        },
        drag: function (e: any) {

        }
      }

      $(document).keydown(function (event: any) {
        if (!sel_ui) { return; }

        switch (event.which) {
          case 37: // left
            if (sel_ui.css('left').slice(0, -2) <= 0) {
              return;
            }
            var x = parseInt(sel_ui.css('left')) - 1;

            animateUI(sel_ui, x, null);
            break;

          case 38: // up
            if (sel_ui.css('top').slice(0, -2) <= 0) {
              return;
            }
            var y = parseInt(sel_ui.css('top')) - 1;

            animateUI(sel_ui, null, y);
            break;

          case 39: // right
            var x = parseInt(sel_ui.css('left')) + 1;

            animateUI(sel_ui, x, null);
            break;

          case 40: // down
            var y = parseInt(sel_ui.css('top')) + 1;

            animateUI(sel_ui, null, y);
            break;

          default: return;
        }

        $('#x-coord').val(getUICoordinate(sel_ui).top);
        $('#y-coord').val(getUICoordinate(sel_ui).left);

        return false;
      });

      var resizableOption = {
        containment: $('.rsf-ruler'), handles: { se: '.segrip' },
        resize: function () {
          $('#input-element-height').val(getUIDimensions($(this)).height);
          $('#input-element-width').val(getUIDimensions($(this)).width);

          $(this).find('.still-ordinal').css({ 'font-size': parseInt($(this).height()) - 20 })
        }
      }

      var droppableOption = {
        accept: ".drp-flyer-element",
        tolerance: 'pointer',
        drop: function (ev: any, ui: any) {

          $('.flyer-element').each(function () {
            $(this).removeClass('selected-element');
          })

          var x = ui.offset.left - $(this).offset().left;
          var y = ui.offset.top - $(this).offset().top;

          var drp_element = null;

          if ($(ui.helper).hasClass('flyer-element-stills')) {
            drp_element = $(STILL_HTML);
          } else if ($(ui.helper).hasClass('flyer-element-text')) {
            drp_element = $(TEXT_HTML);

            var input = $(drp_element).find('input')[0];
            $(input).css({
              'background': 'transparent',
              'border-radius': '2px',
              'border-style': 'solid',
              'border': 'thin #666 solid',
              'padding': '2px'
            });
            //$(input).focus();
          }

          sel_ui = $(drp_element).draggable(draggableOption)
            .resizable(resizableOption)
            .css({ left: x, top: y })
            .appendTo('.rsf-ruler .stage')
            .addClass('selected-element');
        }
      }

      $(document).on('dblclick', '.flyer-element', function () {
        sel_ui = $(this);
        highlightUI(sel_ui);

        $('#x-coord').val(getUICoordinate(sel_ui).top);
        $('#y-coord').val(getUICoordinate(sel_ui).left);

        $('#input-element-height').val(getUIDimensions($(this)).height);
        $('#input-element-width').val(getUIDimensions($(this)).width);
      })

      $('#drg-flyer').draggable(draggableOption).resizable(resizableOption); //note: do something

      $('#wrapper .rsf-ruler .stage').droppable(droppableOption);

      $(document).on('click', '.rsf-ruler', function () {
        if (!sel_ui) {
          $('.text-property, .still-property').css('display', 'none');
        }
      })

      $(document).on('blur', '#x-coord, #y-coord, #input-element-width, #input-element-height', function () {
        if (!sel_ui) { return; }

        var x = parseInt($('#x-coord').val());
        var y = parseInt($('#y-coord').val());

        animateUI(sel_ui, y, x);

        animateUIDimension(sel_ui, $('#input-element-width').val(), $('#input-element-height').val());

        return false;
      })

    })

  }
}

