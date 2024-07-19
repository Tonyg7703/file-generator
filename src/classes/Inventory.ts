// import { dirnames } from '../settings';
// import Car, { CarProps } from './Car';
// import Path from './Paths';

// export type InventoryFolders = (typeof dirnames.inventory_folders)[number];

// export default class Inventory {
//   path: Path<InventoryFolders>;
//   cars: Car[] = [];

//   constructor() {
//     this.path = new Path<InventoryFolders>({
//       route: dirnames.inventory,
//       folders: dirnames.inventory_folders,
//     });
//   }

//   loadCars(data: CarProps[]): void {
//     data.forEach((carProps) => {
//       const car = new Car(carProps, this.path.route);
//       this.cars.push(car);
//     });
//   }

//   createDescriptions(): void {
//     // this.cars.forEach((car) => {
//     //   car.createDescription();
//     // });
//   }
// }
