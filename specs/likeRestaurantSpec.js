import LikeButtonInitiator from '../src/scripts/utils/like-button-initiators';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 'rqdv5juczeskfw1e867',
      },
    });

    expect(document.querySelector('[aria-label="like this restaurant"]'))
      .toBeTruthy();
  });

  it('should not show the unlike button when the movie has not been liked before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 'rqdv5juczeskfw1e867',
      },
    });

    expect(document.querySelector('[aria-label="unlike this restaurant"]'))
      .toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 'rqdv5juczeskfw1e867',
      },
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant('rqdv5juczeskfw1e867');
    expect(restaurant).toEqual({ id: 'rqdv5juczeskfw1e867' });

    FavoriteRestaurantIdb.deleteRestaurant('rqdv5juczeskfw1e867');
  });

  it('should not add a movie again when its already liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 'rqdv5juczeskfw1e867',
      },
    });

    // Tambahkan restoran dengan ID rqdv5juczeskfw1e867 ke daftar restoran yang disukai
    await FavoriteRestaurantIdb.putRestaurant({ id: 'rqdv5juczeskfw1e867' });
    // Simulasikan pengguna menekan tombol suka restoran
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    // tidak ada restoran yang ganda
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 'rqdv5juczeskfw1e867' }]);
    FavoriteRestaurantIdb.deleteRestaurant('rqdv5juczeskfw1e867');
  });

  it('should not add a movie when it has no id', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {},
    });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
