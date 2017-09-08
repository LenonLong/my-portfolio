/*jshint esversion:6*/
import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
  constructor(els, offset) {
    this.itemsToReveal = els;
    this.hideInitially();
    this.offsetPercentage = offset;
    this.createWaypoints();

  }
  hideInitially() {
    this.itemsToReveal.addClass('reveal-section');
  }

  createWaypoints(){
    var that = this;
    this.itemsToReveal.each(function() {
      var currentItem = this;
      new Waypoint({
    // dom element we want to watch for
        element:currentItem,
    // what we want to happen when scrolled to
        handler: function() {
          $(currentItem).addClass("reveal-section--is-visible");
        },
        offset: that.offsetPercentage
      });
    });
  }
}

export default RevealOnScroll;
