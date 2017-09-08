/*jshint esversion:6*/
import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
  constructor() {
    this.siteHeader = $(".site-header");
    this.headerTriggerElement = $(".large-hero__title");
    this.createHeaderWaypoint();
    this.pageSections = $('.page-section');
    this.headerLinks = $(".primary-nav a");
    this.createPageSectionWayPoints();
    this.addSmoothScrolling();
  }

  addSmoothScrolling() {
    this.headerLinks.smoothScroll();
  }

  createHeaderWaypoint() {
    var that = this;
    new Waypoint({
// waypoints expects a js dom element so we appoint it a [0]
      element: this.headerTriggerElement[0],
// pass in direction, so as we scroll up it goes back to normal
      handler: function(direction) {
        if( direction == 'down') {
            that.siteHeader.addClass("site-header--dark");
        } else {
            that.siteHeader.removeClass("site-header--dark");
        }
      }
    });
  }

  createPageSectionWayPoints(){
    var that = this;
    this.pageSections.each(function() {
      var currentPageSection = this;
      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if (direction === "down") {
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            that.headerLinks.removeClass("is-current-link");
            $(matchingHeaderLink).addClass("is-current-link");
          }
        },
        offset: "15%"
      });
      new Waypoint({
        element: currentPageSection,
        handler: function(direction) {
          if (direction === "up") {
            var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
            that.headerLinks.removeClass("is-current-link");
            $(matchingHeaderLink).addClass("is-current-link");
          }
        },
        offset: "-30%"
      });
    });
  }
}

export default StickyHeader;
