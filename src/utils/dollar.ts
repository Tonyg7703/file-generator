export function dollar(price: number): string {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

// create a function that takes in a number and returns it a string with thousands separators
// use the toLocaleString method to format the number\
// the method takes in two arguments, the locale and the options object
// the locale is 'en-US' and the options object has two properties
// style is 'currency' and currency is 'USD'
// return the formatted number
// the function is exported as dollar
// the function is used in the Inventory class to format the list price of a car
// the function is also used in the index file to format the list price of a car
