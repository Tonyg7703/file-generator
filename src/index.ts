// import { carsData } from './seed/cars';
// import Inventory from './classes/Inventory';
// const inventory = new Inventory();
// inventory.loadCars(carsData);

import CraigslistClient from './craigslist-client/CraigslistClient';
import { ROOT_PATH } from './settings';
import File from './classes/File';
import Car, { CarProps } from './classes/Car';
import { dealer } from './seed/dealer';

const username = 'ahmedbayram23@gmail.com';
const password = '+2)4$@Bsv.DzGWG';

const carData = new File({ route: `${ROOT_PATH}/src/seed`, name: 'cars' })
  .data[0] as CarProps;

const car = new Car(carData);

const client = new CraigslistClient();
async function run(car: Car) {
  await client.run();
  await client.gotoPage('account');
  await client.waitForPageLoad();
  const isLoggedIn = await client.urlIncludes('/login/home');
  console.log(`login-status: ${isLoggedIn}`);
  if (!isLoggedIn) {
    await client.typeInput('#inputEmailHandle', username);
    console.log('email typed');
    await client.typeInput('#inputPassword', password);
    console.log('password typed');
    await client.click('.accountform-btn');
    await client.waitForPageLoad();
    await client.setCookies();
  } else {
    await client.waitForPageLoad();
  }

  await client.select('select[name="areaabb"]', 'sea');
  await client.click('button[value="go"]');
  await client.waitForPageLoad();

  await client.click('input[value="1"]');
  await client.submitForm('form.picker');
  await client.waitForPageLoad();

  await client.click('input[value="fsd"]');
  await client.submitForm('form.picker');
  await client.waitForPageLoad();

  await client.click('input[value="146"]');
  // await client.submitForm('form.picker');
  await client.waitForPageLoad();

  await client.typeInput('#PostingTitle', car.postTitle);
  await client.typeInput('input[name="price"]', car.postPrice);
  await client.typeInput(
    'input[name="geographic_area"]',
    `${dealer.address.city}, ${dealer.address.state}`
  );

  // await client.typeInput('input[name="postal"]', dealer.address.zipCode);
  // await client.selectDetailOption('auto_paint', 'black');
  // await client.selectDetailOption('condition', 'like-new');
  // await client.selectDetailOption('auto_cylinders', 4);
  // await client.selectDetailOption('auto_drivetrain', 'fwd');

  // await client.selectDetailOption('auto_fuel_type', 'diesel');
  // await client.selectDetailOption('auto_title_status', 'clean');
  // await client.typeInput('#PostingBody', car.craigslistDescription());
  // await client.typeInput('input[name="auto_vin"]', car.vin);

  // await client.typeInput('input[name="auto_miles"]', car.odometer.amount);

  // await client.selectDetailOption('auto_transmission', 'automatic');

  // await client.typeInput(
  //   'input[name="auto_make_model"]',
  //   `${car.make} ${car.model}`
  // );
  // await client.selectDetailOption('auto_bodytype', 'sedan');
  // await client.selectDetailOption('year', 2025);

  await client.close(15000);

  // replace value
  // const options = {
  //   13: 'new',
  //   14: 'like new',
  //   15: 'excellent',
  //   16: 'good',
  //   17: 'fair',
  //   18: 'salvage',
  // };

  // write a const that return this year + 1. ex: 2025 as number
}
run(car);
