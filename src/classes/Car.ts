import { dealer } from '../seed/dealer';
import { dirnames } from '../settings';
import { capitalize } from '../utils/capitalize';
// import Path from './Paths';

export type CarProps = {
  stock: number;
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  odometer_amount: string;
  odometer_status: string;
  body: string;
  drivetrain: string;
  drivetrain_desc: string;
  engine_cylinders: number;
  engine_liters: number;
  engine_desc: string;
  fuel: string;
  mpg_city: number;
  mpg_hwy: number;
  transmission: string;
  exterior_color: string;
  interior_color: string;
  doors: number;
  seats: number;
  title: string;
  unique_features: string;
  list_price: string;
};

// type CarFolders = (typeof dirnames.car_folders)[number];
// type CarPath = Path<any, CarFolders>;

export default class Car {
  // path: CarPath;

  constructor(private props: CarProps /* , route: string */) {
    const { stock, year, make, model, trim } = props;
    const nameObj = { stock, year, make, model, trim };
    Object.entries(nameObj).forEach(([key, value]) => {
      if (!value || (typeof value === 'string' && value.length === 0)) {
        throw new Error(`Car ${key} is required`);
      }
    });
    // {stock, year, make, model, trim}.forEach((prop) => {
    //   if (typeof prop === 'string' && prop.length === 0) {
    //     throw new Error('Car stock number is required');
    //   }
    // });
    if (!props.stock) throw new Error('Car stock number is required');
    // this.path = new Path({
    //   route: `${route}/${this.dirname}`,
    //   folders: dirnames.car_folders,
    // });
    // this.createDescriptions();
  }

  // createDescriptions() {
  //   const dirPath = this.path.getDirPath('info');
  //   this.path.createFile({
  //     route: dirPath,
  //     data: this.craigslistDescription(),
  //     name: `description-craigslist`,
  //     extension: 'txt',
  //   });

  //   this.path.createFile({
  //     route: dirPath,
  //     data: this.carsForSaleDescription(),
  //     name: `description`,
  //     extension: 'txt',
  //   });
  // }

  get postTitle(): string {
    console.log('first');
    const { year, make, model, trim } = this.props;
    const vehicleName = [year, make, model, trim].join(' ');
    return `${vehicleName} | ${this.milesInThousands} miles`;
  }

  get stock(): string | undefined {
    return this.props.stock ? `${this.props.stock}`.trim() : undefined;
  }

  get vin(): string | undefined {
    return this.props.vin ? this.props.vin.trim() : undefined;
  }

  get year(): number | undefined {
    if (this.props.year) return +this.props.year;
  }

  get make(): string | undefined {
    return this.props.make ? this.props.make.trim() : undefined;
  }

  get model(): string | undefined {
    return this.props.model ? this.props.model.trim() : undefined;
  }

  get trim(): string | undefined {
    return this.props.trim ? this.props.trim : undefined;
  }

  get odometer(): { amount?: number; status?: string } {
    const { odometer_amount, odometer_status } = this.props;
    const amount = odometer_amount
      ? +odometer_amount.replace(',', '')
      : undefined;
    const status = odometer_status ? odometer_status.trim() : undefined;
    return { amount, status };
  }

  get engine(): { cylinders?: number; liters?: number; desc?: string } {
    const { engine_cylinders, engine_liters, engine_desc } = this.props;
    const cylinders = engine_cylinders ? engine_cylinders : undefined;
    const liters = engine_liters ? +engine_liters.toFixed(1) : undefined;
    const desc = engine_desc ? engine_desc.trim() : undefined;
    return { cylinders, liters, desc };
  }

  get transmission(): { type?: string } {
    const { transmission } = this.props;
    const type = transmission ? transmission.trim() : undefined;
    return { type };
  }

  get fuel(): { type?: string } {
    const { fuel } = this.props;
    const type = fuel ? fuel.trim() : undefined;
    return { type };
  }

  get drivetrain(): { type?: string; desc?: string } {
    const { drivetrain, drivetrain_desc } = this.props;
    const type = drivetrain ? drivetrain.trim() : undefined;
    const desc = drivetrain_desc ? drivetrain_desc.trim() : undefined;
    return { type, desc };
  }

  get mpg(): { city?: number; hwy?: number } {
    const { mpg_city, mpg_hwy } = this.props;
    const city = mpg_city ? mpg_city : undefined;
    const hwy = mpg_hwy ? mpg_hwy : undefined;
    return { city, hwy };
  }

  get fullMPG(): string | undefined {
    return this.mpg.city && this.mpg.hwy
      ? `${this.mpg.city} City - ${this.mpg.hwy} Hwy`
      : undefined;
  }

  get body(): string | undefined {
    return this.props.body ? this.props.body.trim() : undefined;
  }

  get doors(): number | undefined {
    return this.props.doors ? this.props.doors : undefined;
  }

  get seats(): number | undefined {
    return this.props.seats ? this.props.seats : undefined;
  }

  get color(): { exterior?: string; interior?: string } {
    const { exterior_color, interior_color } = this.props;
    const exterior = exterior_color ? exterior_color.trim() : undefined;
    const interior = interior_color ? interior_color.trim() : undefined;
    return { exterior, interior };
  }

  get title(): string | undefined {
    return this.props.title ? this.props.title.trim() : undefined;
  }

  get uniqueFeatures(): string | undefined {
    return this.props.unique_features
      ? this.props.unique_features.trim()
      : undefined;
  }

  get postPrice(): number {
    return this.props.list_price
      ? +this.props.list_price.replace(/[^0-9.]/g, '')
      : 0;
  }

  get filename(): string {
    return [
      this.props.stock,
      this.props.year,
      this.props.make,
      this.props.model,
      this.props.trim,
    ]
      .map((prop) => {
        if (typeof prop === 'string' && prop.length > 0) {
          return prop.toLowerCase().replace(/ /g, '-');
        }

        if (typeof prop === 'number') {
          return prop.toString();
        }
      })
      .filter((prop) => prop !== undefined)
      .join('-');
  }

  get milesInThousands(): string {
    const { amount } = this.odometer;
    if (amount) return `${(amount / 1000).toFixed(0)}K`;
    return '';
  }

  get miles(): string {
    const { amount } = this.odometer;
    return amount ? amount.toLocaleString('en-US') : '';
  }

  craigslistDescription() {
    const {
      milesInThousands,
      miles,
      uniqueFeatures,
      vin,
      year,
      make,
      model,
      trim,
      body,
      engine,
      fuel,
      transmission,
      color,
      drivetrain,
      fullMPG,
      title,
    } = this;

    function getListItem(label: string, value?: string | number) {
      return value ? `<li>${label}: <strong>${value}</strong></li>` : '';
    }

    const name = `${year} ${make} ${model} ${trim}`;

    return `<h1>${name} | ${milesInThousands} miles</h1>
<hr />
<h2>📱 Call or Text ${dealer.phone}</h2>
<hr />
<h3>📈Good/📉Bad Credit - We can Finance!</h3>
<h3>👮 We Support our <strong>TROOPS!</strong> Special Discount!</h3>
<hr />
h2>🚙 ${name} | ${milesInThousands} miles</h2>
<h3>${uniqueFeatures}</h3>
<hr />
<ul>
${getListItem('VIN', vin)}
${getListItem('YEAR', year)}
${getListItem('MAKE', make)}
${getListItem('MODEL', model)}
${getListItem('TRIM', trim)}
${getListItem('BODY', body)}
${getListItem('ODOMETER', miles)}
${getListItem('ENGINE', engine.desc)}
${getListItem('FUEL', fuel.type)}
${getListItem('TRANSMISSION', transmission.type)}
${getListItem('EX-COLOR', color.exterior)}
${getListItem('IN-COLOR', color.interior)}
${getListItem('DRIVETRAIN', drivetrain.type)}
${getListItem('MPG', fullMPG)}
${getListItem('TITLE', title)}
</ul>
<hr />
<h2>🏪 ${dealer.name}</h2>
<ul>
<li>📍 <strong>${dealer.fullAddress}</strong></li>
<li>🔗 <strong>${dealer.website}</strong></li>
<li>⏰ <strong>${dealer.openingHours}</strong></li>
</ul>
<hr />
<h2>📱 Call or Text ${dealer.phone}</h2>
<hr />
<p>*${make} ${model}* *${make}* *${model}* *${trim}* *${make} ${model} ${trim}* *${body}* *${
      engine.desc
    }* *${transmission}* *${color.exterior}* *${
      color.interior
    }* 2023 2022 2021 2020 2019 2018 2017 2016 2015 2014 2013 2012 2011 2010 2009 2008 2007 2006 2005 2004 2003 2002 2001 2000 23 22 21 19 18 17 16 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00</p>
<hr />`;
  }

  carsForSaleDescription() {
    const name = `${this.year} ${this.make} ${this.model} ${this.trim}`;

    function getListItem(label: string, value?: string | number) {
      return value ? `${label}: ${value}` : '';
    }

    function getSpecs(array: [string, string | number | undefined][]) {
      return array
        .map(([label, value]) => getListItem(label, value))
        .join('\n');
    }

    return [
      `${name} | ${this.milesInThousands} miles`,
      `Good Credit📈, Bad Credit📉, we FINANCE!\nWe Support Our TROOPS! Special Discount!👨‍✈️`,
      `Key Features:\n${this.uniqueFeatures}`,
      getSpecs([
        ['VIN', this.vin],
        ['YEAR', this.year],
        ['MAKE', capitalize(this.make)],
        ['MODEL', this.model],
        ['TRIM', this.trim],
        ['BODY', this.body],
        ['ODOMETER', this.odometer.amount],
        ['ENGINE', this.engine.desc],
        ['FUEL', capitalize(this.fuel.type)],
        ['TRANSMISSION', capitalize(this.transmission.type)],
        ['EX-COLOR', capitalize(this.color.exterior)],
        ['IN-COLOR', capitalize(this.color.interior)],
        ['DRIVETRAIN', this.drivetrain.type],
        ['MPG', this.fullMPG],
        ['TITLE', this.title],
      ]),
      `Setup an appointment today! Call or Text ${dealer.phone}`,
      `🏪 ${dealer.name}
📱 ${dealer.phone}
⏰ ${dealer.openingHours}
🔗 ${dealer.website}
📍 ${dealer.address.street}
${dealer.address.city}, ${dealer.address.state} ${dealer.address.zipCode}`,
    ].join('\n--------------------------\n');
  }
}
