/*jshint esversion:6 */
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import $ from "jquery";
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';
var mobileMenu      = new MobileMenu();
new RevealOnScroll($(".page-section"), "65%");
new RevealOnScroll($(".site-header"), "95%");
var stickyHeader = new StickyHeader();
var modal = new Modal();
// new RevealOnScroll();
