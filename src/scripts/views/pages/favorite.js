import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const FavoritePage = {
  async render() {
    return `
      <div class="content">
        <h1 class="content-heading">Your Liked Restaurant</h2>
        <div id="restaurants-from-api" class="restaurant-menu-list">
  
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants-from-api');

    if (restaurants.length > 0) {
      restaurants.forEach((data) => {
        restaurantsContainer.innerHTML += `
          <div class="restaurant-menu-item">
            <div class="menu-list-top">
              <div class="menu-place">${data.city}</div>
              <div class="menu-image">
                <img data-src="https://restaurant-api.dicoding.dev/images/medium/${data.pictureId}" class="lazyload" alt="${data.name}" width="421px" height="295px" />
              </div>
            </div>
            <div class="menu-list-bottom">
              <div class="menu-rate">Rating: 
              ${data.rating}   
              </div>
              <div class="menu-name">${data.name}</div>
              <div class="menu-description">
                ${data.description}
              </div>
              <div class="menu-cta">
                <a href='#/detail/${data.id}'>MORE</a>
              </div>
            </div>
          </div>
          `;
      });
    } else {
      restaurantsContainer.innerHTML += 'You currently have no favorite restaurant';
    }
  },
};

export default FavoritePage;
