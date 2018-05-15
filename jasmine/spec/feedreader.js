/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // the first test suite
    describe('RSS Feeds', function() {
         // checks if the allFeeds variable is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         // checks if the allFeeds variable has an URL and it's not empty
        it("have an URL and it's not empty", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        // checks if allFeeds has a name and it's not empty
        it("have a name", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    // the second test suite
    describe("The menu", function() {
        var menu,
            clickMenu;

        // asigning values to the variables
        beforeEach(function() {
            menu = $("body");
            clickMenu = $(".menu-icon-link");
        });

        // checks if the menu is hidden by default
        it("is hidden by default", function() {
            expect(menu.hasClass("menu-hidden")).toBe(true);
        });

        // checks if the menu becomes visible/invisible when clicked
        it("becomes visible when clicked", function() {
            // checks if menu becomes visible when clicked
            clickMenu.click();
            expect(menu.hasClass("menu-hidden")).toBe(false);
            // checks if menu becomes invisible when clicked again
            clickMenu.click();
            expect(menu.hasClass("menu-hidden")).toBe(true);
        });
    });

    // third test suite
    describe("Initial Entries", function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

         // checks if there is at least one .entry element inside .feed container
        it("there is at least a single entry element within the feed container", function(done) {
            var entries = $(".feed .entry");
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
    });

    // fourth test suite
    describe("New Feed Selection", function() {
        var firstFeed,
            secondFeed;

        // checks if the feeds are loaded correctly
        // and if the first feed is loaded before the second one
        beforeEach(function(done) {
            var feed = $(".feed");
            loadFeed(0, function() {
                firstFeed = feed.text();
                loadFeed(1, function() {
                    secondFeed = feed.text();
                    done();
                });
            });
        });

         // checks if the content of the second feed is different than the previous one
        it("the content changes when a new feed is loaded", function(done) {
            expect(firstFeed).not.toBe(secondFeed);
            done();
        });
    });
}());
