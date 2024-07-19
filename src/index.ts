// import { carsData } from './seed/cars';
// import Inventory from './classes/Inventory';
// const inventory = new Inventory();
// inventory.loadCars(carsData);
import Folder from './classes/Folder';
// import CraigslistClient from './craigslist-client/CraigslistClient';
import path from 'path';
import { ROOT_PATH } from './settings';

// console.log(`./src:${path.resolve(__dirname)}from __dirname`);

// const username = 'ahmedbayram23@gmail.com';
// const password = '+2)4$@Bsv.DzGWG';

// const client = new CraigslistClient();
// async function run() {
//   await client.run();
//   await client.gotoPage('account');
//   await client.waitForPageLoad();
//   const isLoggedIn = await client.urlIncludes('/login/home');
//   console.log(`login-status: ${isLoggedIn}`);
//   if (!isLoggedIn) {
//     await client.typeInput('#inputEmailHandle', username);
//     console.log('email typed');
//     await client.typeInput('#inputPassword', password);
//     console.log('password typed');
//     await client.click('.accountform-btn');
//     await client.waitForPageLoad();
//     const cookies = await client.getCookieString();
//   }

//   await client.close(5000);
// } //
// run();

// const inventory = new Folder({

// })

const inventory = new Folder({
  name: 'inventory',
  route: ROOT_PATH,
});

const cars = inventory.newFolder({ name: 'x' }).newFile(
  {
    name: 'cars',
    format: 'json',
    data: [{ make: 'Toyota', model: 'Corolla' }],
  },
  {
    canCreateEmpty: true,
    canReplace: true,
  }
);
