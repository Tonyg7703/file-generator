// import Dealer from './dealer';
// import Inventory from './inventory';
// import { VehicleProps } from './types/VehicleProps';
// import capitalize from './utils/capitalize';
// import { createFolder, createFile } from './utils/fileSystem';
// import currency from 'currency.js';

// const transmissionTypes = ['Automatic', 'Manual'];
// const drivetrainTypes = ['FWD', 'RWD', 'AWD', '4X4', '4WD'];
// const bodyTypes = [
//   'Sedan',
//   'SUV',
//   'Hatchback',
//   'Truck',
//   'Minivan',
//   'Wagon',
//   'Van',
//   'Coupe',
//   'Convertiable',
// ];
// const fuelTypes = [
//   'Gasoline',
//   'Diesel',
//   'Electric',
//   'Hybrid',
//   'Flex Fuel',
//   'Plugin-Hybrid',
// ];
// const odometerStatusTypes = ['Actual', 'Excempt', 'Not Actual'];
// const titleTypes = ['Clean', 'Rebuilt', 'Salvage'];

// export default class Vehicle {
//   private stock: string;
//   private vin: string;
//   private year: number;
//   private make: string;
//   private model: string;
//   private trim: string;
//   private drivetrain: string;
//   private drivetrain_desc: string;
//   private body: string;
//   private engine_liters: number;
//   private engine_cylinders: number;
//   private engine_desc: string;
//   private fuel: string;
//   private transmission: string;
//   private mpg_city: number;
//   private mpg_hwy: number;
//   private odometer_amount: number;
//   private odometer_status: string;
//   private exterior_color: string;
//   private interior_color: string;
//   private title: string;
//   private doors: number;
//   private seats: number;
//   private unique_features: string;
//   private warranty?: string;
//   private sale_price: number;
//   private cargurus_value: number;
//   private carfax_value: number;
//   private inventoryPath: string;
//   private dealer: Dealer;
//   constructor(data: VehicleProps, inventory: Inventory) {
//     this.checkEmpty(data.stock, 'stock');
//     this.stock = data.stock;

//     this.checkEmpty(data.vin, 'vin');
//     this.checkLength(data.vin, 17, 'vin');
//     this.vin = data.vin.toUpperCase();

//     this.checkEmpty(data.year, 'year');
//     this.checkLength(data.year, 4, 'year');
//     this.checkNumber(data.year, 'year');
//     this.year = +data.year;

//     this.checkEmpty(data.make, 'make');
//     this.make = capitalize(data.make);

//     this.checkEmpty(data.model, 'model');
//     this.model = data.model;

//     this.checkEmpty(data.trim, 'trim');
//     this.trim = data.trim;

//     this.checkEmpty(data.drivetrain, 'drivetrain');
//     let cleanDrivetrain = data.drivetrain.toUpperCase();
//     this.checkValid(cleanDrivetrain, drivetrainTypes, 'drivetrain');
//     this.drivetrain = data.drivetrain;

//     this.checkEmpty(data.drivetrain_desc, 'drivetrain_desc');
//     this.drivetrain_desc = data.drivetrain_desc;

//     this.checkEmpty(data.body, 'body');
//     this.checkValid(data.body, bodyTypes, 'body');
//     this.body = data.body;

//     this.checkEmpty(data.engine_liters, 'engine_liters');
//     this.checkNumber(data.engine_liters, 'engine_liters');
//     this.engine_liters = +data.engine_liters;

//     this.checkEmpty(data.engine_cylinders, 'engine_cylinders');
//     this.checkNumber(data.engine_cylinders, 'engine_cylinders');
//     this.engine_cylinders = +data.engine_cylinders;

//     this.checkEmpty(data.engine_desc, 'engine_desc');
//     this.engine_desc = data.engine_desc;

//     this.checkEmpty(data.fuel, 'fuel');
//     let cleanFuel = capitalize(data.fuel);
//     this.checkValid(cleanFuel, fuelTypes, 'body');
//     this.fuel = data.fuel;

//     this.checkEmpty(data.transmission, 'transmission');
//     let cleanTransmission = capitalize(data.transmission);
//     this.checkValid(cleanTransmission, transmissionTypes, 'body');
//     this.transmission = data.transmission;

//     this.checkEmpty(data.mpg_city, 'mpg_city');
//     this.checkMinLength(data.mpg_city, 1, 'mpg_city');
//     this.checkNumber(data.mpg_city, 'mpg_city');
//     this.mpg_city = +data.mpg_city;

//     this.checkEmpty(data.mpg_hwy, 'mpg_hwy');
//     this.checkMinLength(data.mpg_hwy, 1, 'mpg_hwy');
//     this.checkNumber(data.mpg_hwy, 'mpg_hwy');
//     this.mpg_hwy = +data.mpg_hwy;

//     this.checkEmpty(data.odometer_amount, 'odometer_amount');
//     this.checkMinLength(data.odometer_amount, 1, 'odometer_amount');
//     this.checkMaxLength(data.odometer_amount, 999999, 'odometer_amount');
//     this.checkNumber(data.odometer_amount, 'mpg_hwy');
//     this.odometer_amount = +data.odometer_amount.replace(',', '');

//     this.checkEmpty(data.odometer_status, 'odometer_status');
//     let cleanOdometerStatus = capitalize(data.odometer_status);
//     this.checkValid(
//       cleanOdometerStatus,
//       odometerStatusTypes,
//       'odometer_status'
//     );
//     this.odometer_status = data.odometer_status;

//     this.checkEmpty(data.exterior_color, 'exterior_color');
//     this.exterior_color = data.exterior_color;

//     this.checkEmpty(data.interior_color, 'interior_color');
//     this.interior_color = data.interior_color;

//     this.checkEmpty(data.title, 'title');
//     let cleanTitle = capitalize(data.title);
//     this.checkValid(cleanTitle, titleTypes, 'title');
//     this.title = data.title;

//     this.checkEmpty(data.doors, 'doors');
//     this.checkMaxLength(data.doors, 9, 'doors');
//     this.doors = +data.doors;

//     this.checkEmpty(data.seats, 'seats');
//     this.checkMaxLength(data.seats, 9, 'seats');
//     this.seats = +data.seats;

//     this.checkEmpty(data.unique_features, 'unique_features');
//     this.unique_features = data.unique_features;

//     this.checkEmpty(data.warranty, 'warranty');
//     if (data.warranty !== 'FALSE') this.warranty = data.warranty;

//     this.checkEmpty(data.sale_price, 'sale_price');
//     this.checkCurrency(data.sale_price, 'sale_price');
//     this.sale_price = +currency(data.sale_price);

//     this.checkEmpty(data.cargurus_value, 'cargurus_value');
//     this.checkCurrency(data.cargurus_value, 'cargurus_value');
//     this.cargurus_value = +currency(data.cargurus_value);

//     this.checkEmpty(data.carfax_value, 'carfax_value');
//     this.checkCurrency(data.carfax_value, 'carfax_value');
//     this.carfax_value = +currency(data.carfax_value);

//     this.inventoryPath = inventory.path;
//     this.dealer = inventory.dealer;
//     this.generateFolder();
//   }

//   get name(): string {
//     return `${this.year} ${this.make} ${this.model} ${this.trim}`;
//   }

//   get milesInThousands(): string {
//     return `${Math.floor(+this.odometer_amount / 1000)}K`;
//   }

//   get path(): string {
//     return `${this.inventoryPath}/${this.dirname}`;
//   }

//   private checkEmpty(value: string, propName: string) {
//     if (!value || value === '') throw new Error(`missing ${propName} property`);
//   }

//   private checkNumber(value: string, propName: string) {
//     if (
//       typeof +value.replace(',', '') !== 'number' ||
//       Number.isNaN(+value.replace(',', ''))
//     )
//       throw new Error(`${value} is not a valid ${propName}`);
//   }

//   private checkCurrency(value: string, propName: string) {
//     if (typeof currency(value).value !== 'number')
//       throw new Error(`${value} is not a valid ${propName}`);
//   }

//   private checkLength(value: string, length: number, propName: string) {
//     if (value.length !== length)
//       throw new Error(
//         `${propName} must be ${length} characters long; got ${value}`
//       );
//   }

//   private checkMinLength(value: string, length: number, propName: string) {
//     if (value.length < length)
//       throw new Error(
//         `${propName} must be ${length} characters long; got ${value}`
//       );
//   }

//   private checkMaxLength(value: string, length: number, propName: string) {
//     if (value.length > length)
//       throw new Error(
//         `${propName} must be ${length} characters long; got ${value}`
//       );
//   }

//   private checkValid(value: string, array: string[], propName: string) {
//     if (!array.find((el) => value === el))
//       throw new Error(`${value} ${propName} is invalid`);
//   }

//   get dirname() {
//     const stock = this.stock;
//     const year = this.year;
//     const make = this.make?.split(' ').join('_').toLowerCase();
//     const model = this.model?.split(' ').join('_').toLowerCase();
//     const trim = this.trim?.split(' ').join('_').toLowerCase();
//     return [stock, year, make, model, trim].join('-');
//   }

//   generateFolder() {
//     createFolder(this.inventoryPath, this.dirname);
//     createFolder(this.path, '_extra');
//     createFolder(this.path, 'imgs');
//     createFolder(this.path, 'files');
//     createFile(
//       `${this.path}/files`,
//       'description-carsForSale',
//       this.carsForSaleDescription()
//     );
//     createFile(
//       `${this.path}/files`,
//       'description-craigslist',
//       this.craigslistDescription()
//     );
//   }

//   craigslistDescription() {
//     return `<h1>${this.name} | ${this.milesInThousands} miles</h1>
//       <hr />
//       <h2>📱 Call or Text ${this.dealer.phone}</h2>
//       <hr />${
//         this.warranty
//           ? '\n' +
//             '<h3>👍 FREE 3 Month WARRANTY - Engine &amp; Trasmission</h3>'
//           : ''
//       }
//       <h3>📈Good/📉Bad Credit - We can Finance!</h3>
//       <h3>👮 We Support our <strong>TROOPS!</strong> Special Discount!</h3>
//       <hr />
//       h2>🚙 ${this.name} | ${this.milesInThousands} miles</h2>
//       <h3>${this.unique_features}</h3>
//       <hr />
//       <ul>
//         <li>VIN: <strong>${this.vin}</strong></li>
//         <li>YEAR: <strong>${this.year}</strong></li>
//         <li>MAKE: <strong>${this.make}</strong></li>
//         <li>MODEL: <strong>${this.model}</strong></li>
//         <li>TRIM: <strong>${this.trim}</strong></li>
//         <li>BODY: <strong>${this.body}</strong></li>
//         <li>MILES: <strong>${this.odometer_amount}</strong></li>
//         <li>ENGINE: <strong>${this.engine_desc}</strong></li>
//         <li>engineFuel: <strong>${this.fuel}</strong></li>
//         <li>TRANSMISSION: <strong>${this.transmission}</strong></li>
//         <li>EX-COLOR: <strong>${this.exterior_color}</strong></li>
//         <li>IN-COLOR: <strong>${this.interior_color}</strong></li>
//         <li>DRIVETRAIN: <strong>${this.drivetrain}</strong></li>
//         <li>MPG: <strong>${this.mpg_city} City - ${
//       this.mpg_hwy
//     } Hwy</strong></li>
//         <li>TITLE: <strong>${this.title}</strong> | for more info call/text</li>
//       </ul>
//       <hr />
//       <h2>🏪 ${this.dealer.name}</h2>
//       <ul>
//         <li>📍 <strong>${this.dealer.fullAddress}</strong></li>
//         <li>🔗 <strong>${this.dealer.website}</strong></li>
//         <li>⏰ <strong>${this.dealer.openingHours}</strong></li>
//       </ul>
//       <hr />
//       <h2>📱 Call or Text ${this.dealer.phone}</h2>
//       <hr />
//       <p>*${this.make} ${this.model}* *${this.make}* *${this.model}* *${
//       this.trim
//     }* *${this.make} ${this.model} ${this.trim}* *${this.body}* *${
//       this.engine_desc
//     }* *${this.transmission}* *${this.exterior_color}* *${
//       this.interior_color
//     }* 2023 2022 2021 2020 2019 2018 2017 2016 2015 2014 2013 2012 2011 2010 2009 2008 2007 2006 2005 2004 2003 2002 2001 2000 23 22 21 19 18 17 16 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00</p>
//       <hr />`;
//   }

//   carsForSaleDescription() {
//     return `${this.name} | ${this.milesInThousands} miles
// --------------------------
// Setup an appointment today! Call or Text ${this.dealer.phone}${
//       this.warranty ? '\n' + this.warranty : ''
//     }
// Good Credit📈, Bad Credit📉, we FINANCE!
// We Support Our TROOPS! Special Discount!👨‍✈️
// --------------------------
// Key Features:
// ${this.unique_features}
// --------------------------
// VIN: ${this.vin}
// YEAR: ${this.year}
// MAKE: ${this.make}
// MODEL: ${this.model}
// TRIM: ${this.trim}
// BODY: ${this.body}
// MILES: ${this.odometer_amount}
// ENGINE: ${this.engine_desc}
// engineFuel: ${this.fuel}
// TRANSMISSION: ${this.transmission}
// EX-COLOR: ${this.exterior_color}
// IN-COLOR: ${this.interior_color}
// DRIVETRAIN: ${this.drivetrain}
// MPG: ${this.mpg_city} City - ${this.mpg_hwy} Hwy
// TITLE: ${this.title === 'clean'} | call or text for more details
// --------------------------
// Setup an appointment today! Call or Text ${this.dealer.phone}
// --------------------------
// ${this.dealer.name}
// ${this.dealer.address.street}
// ${this.dealer.address.city}, ${this.dealer.address.state} ${
//       this.dealer.address.zipCode
//     }
// ${this.dealer.phone}
// ${this.dealer.website}
//   `;
//   }
// }
