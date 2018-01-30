import Facade from '../../lib/facade';
import mockData from '../../config/init_data/restaurants.json';
import schema from './schema';

class RestaurantFacade extends Facade {}

const restaurantFacade = new RestaurantFacade(schema);

// Mock data if not exists
restaurantFacade
  .createIfEmpty(mockData)
  .catch(console.error);

export default restaurantFacade;
