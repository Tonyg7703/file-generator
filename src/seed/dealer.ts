export const dealer = {
  name: 'Royal Auto Sales LLC',
  phone: '253-333-1122',
  address: {
    street: '36104 W Valley Hwy S',
    city: 'Algona',
    state: 'WA',
    zipCode: 98001,
  },
  openingHours: 'Mon-Fri 11am-6pm, Sat 12am-5pm, Sun By Appointment Only',
  website: 'https://www.royalautosalesllc.com/',

  get fullAddress(): string {
    return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}`;
  },
};
