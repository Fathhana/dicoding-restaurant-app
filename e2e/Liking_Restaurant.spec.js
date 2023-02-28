const assert = require('assert');

Feature('Liking Restaurant');

Before(({I}) => {
  I.amOnPage('/#/favorite');
});

Scenario('Showing empty message if I do not have any favorite restaurant', ({I}) => {
  I.amOnPage('/#/favorite');
  I.see('You currently have no favorite restaurant', '#restaurants-from-api')
});
  
Scenario('Add favorite restaurant', async ({I}) => {
  I.see('You currently have no favorite restaurant', '#restaurants-from-api')
  I.amOnPage('/');
  I.seeElement('.menu-cta a');

  const firstRestaurantLink = locate('.menu-cta a').first();
  const getFirstRestaurantTitle = locate('.menu-name').first();
  const firstRestaurantTitle = await I.grabTextFrom(getFirstRestaurantTitle);
  I.click(firstRestaurantLink);

  I.seeElement('#likeButton');
  I.click('#likeButton');
 
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-menu-item');
  const likedRestaurantTitle = await I.grabTextFrom('.menu-name');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('Remove favorite restaurant', async ({I}) => {
  I.see('You currently have no favorite restaurant', '#restaurants-from-api')
  I.amOnPage('/');
  I.seeElement('.menu-cta a');

  const firstRestaurantLink = locate('.menu-cta a').first();
  const getFirstRestaurantTitle = locate('.menu-name').first();
  const firstRestaurantTitle = await I.grabTextFrom(getFirstRestaurantTitle);
  I.click(firstRestaurantLink);

  I.seeElement('#likeButton');
  I.click('#likeButton');
 
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-menu-item');
  const likedRestaurantTitle = await I.grabTextFrom('.menu-name');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.seeElement('.menu-cta a');

  const firstRestaurantLink2 = locate('.menu-cta a').first();
  pause();

  I.click(firstRestaurantLink2);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  pause();
  I.dontSeeElement('button[aria-label="unlike this restaurant"]');

});