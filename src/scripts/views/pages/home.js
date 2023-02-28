import RestaurantDbSource from '../../data/restaurantdb-source';

const HomePage = {
  async render() {
    return `
      <div class="hero-banner">
        <div class="hero-inner-wrapper">
          <h1>Restaurant Apps Starter Project</h1>
          <h2>Amazingly Delicious</h2>
        </div>
      </div>
      <div id="restaurants-from-api" class="restaurant-menu-list">
    
      </div>
      `;
  },

  async afterRender() {
    const restaurants = await RestaurantDbSource.listRestaurant();
    const restaurantWrap = document.getElementById('restaurants-from-api');

    restaurants.restaurants.forEach((data) => {
      restaurantWrap.innerHTML += `
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
  },
};

export default HomePage;
