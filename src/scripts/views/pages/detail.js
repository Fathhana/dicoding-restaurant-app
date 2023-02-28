import RestaurantDbSource from '../../data/restaurantdb-source';
import LikeButtonInitiator from '../../utils/like-button-initiators';

const DetailPage = {
  async render() {
    return `
      <div id="detail-content"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    const detailRestaurant = await RestaurantDbSource.detailRestaurant(id);
    let foodList = '';
    let drinkList = '';
    let testimonialList = '';

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: detailRestaurant.restaurant.id,
        city: detailRestaurant.restaurant.city,
        name: detailRestaurant.restaurant.name,
        pictureId: detailRestaurant.restaurant.pictureId,
        rating: detailRestaurant.restaurant.rating,
        description: detailRestaurant.restaurant.description,
      },
    });

    const restaurantWrap = document.getElementById('detail-content');

    restaurantWrap.innerHTML += `
        <h1 class="content-heading">${detailRestaurant.restaurant.name}</h1>
        <div class="restaurant-menu-item">
          <div class="detail-grid">
            <div>
              <div class="menu-image">
                <img data-src="https://restaurant-api.dicoding.dev/images/medium/${detailRestaurant.restaurant.pictureId}" class="lazyload" alt="${detailRestaurant.restaurant.name}" width="421px" height="295px" />
              </div>
            </div>
            <div>
              <div><i class="fa fa-solid fa-star"></i> Rating: ${detailRestaurant.restaurant.rating}</div>
              <div><i class="fa fa-solid fa-map"></i> Location: ${detailRestaurant.restaurant.city}. ${detailRestaurant.restaurant.address}</div>
              <div><i class="fa fa-solid fa-book"></i> Description: ${detailRestaurant.restaurant.description}</div>
            </div>
          </div>
          <div class="detail-subtitle">Food List</div>
          <div id="food-list">
            ${foodList === undefined ? '' : foodList}
          </div>
          <div class="detail-subtitle">Drink List</div>
          <div id="drink-list">
            ${drinkList === undefined ? '' : drinkList}
          </div>
          <div id="testimonial-list">
            <div style="font-weight:600;">Customer Reviews</div>
            ${testimonialList === undefined ? '' : testimonialList}
          </div>
        </div>
    `;

    const foodListWrap = document.getElementById('food-list');
    const drinkListWrap = document.getElementById('drink-list');
    const testimonialListWrap = document.getElementById('testimonial-list');

    foodList = detailRestaurant.restaurant.menus.foods.forEach((data) => {
      foodListWrap.innerHTML += `<div class="food-naming">${data.name}</div>`;
    });

    drinkList = detailRestaurant.restaurant.menus.drinks.forEach((data) => {
      drinkListWrap.innerHTML += `<div class="drink-naming">${data.name}</div>`;
    });

    testimonialList = detailRestaurant.restaurant.customerReviews.forEach((data) => {
      testimonialListWrap.innerHTML += `<div class="testimonial-naming">
        <div class="testimonial-name">${data.name}</div>
        <div class="testimonial-date">${data.date}</div>
        <div class="testimonial-review">${data.review}</div>
      </div>`;
    });
  },
};

export default DetailPage;
