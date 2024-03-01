'use strict';

const readline = require('node:readline');
const connection = require('./lib/connectMongoose.js');
const Products = require('./models/Products.js');

main().catch(err => console.error('An error has occurred', err))

async function main() {

  await new Promise((resolve) => connection.once('open', resolve));

  const erase = await question('Are you sure you want to DELETE all PRODUCTS FROM THIS DATABASE? (NO): ');
  console.log("Don't Worry. All products are still intact.");


  if (!erase) {
    process.exit();
  }

  await initProducts();

  connection.close();

};

async function initProducts() {

  // erase existing
  const deleted = await Products.deleteMany();
  console.log(`Successfully deleted ${deleted.deletedCount} products`);

  // create initial products
  const inserted = await Products.insertMany([
    { name: 'Airpods', sale: false, price: 80, photo: 'airpods.jpg', tags: ['work', 'lifestyle'] },
    { name: 'Alexa', sale: true, price: 125.75, photo: 'alexa.jpg', tags: ['lifestyle', 'mobile'] },
    { name: 'Camara Canon', sale: true, price: 535, photo: 'canon.jpg', tags: ['work', 'lifestyle'] },
    { name: 'Toyota CH-R', sale: false, price: 35700, photo: 'chr.jpg', tags: ['work', 'motor'] },
    { name: 'MacBook Pro', sale: false, price: 850, photo: 'macbook_pro.jpg', tags: ['work', 'lifestyle'] },
    { name: 'iPhone 13 Pro', sale: false, price: 435, photo: 'iphone13pro.jpg', tags: ['work', 'lifestyle', 'mobile'] },
    { name: 'JBL headphones', sale: true, price: 197, photo: 'jbl.jpg', tags: ['lifestyle', 'mobile'] }
  ]);
  console.log(`Created ${inserted.insertedCount} products successfully`);

};

// security question 
function question(texto) {
  return new Promise((resolve, reject) => {
    // conectar readline con la consola
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    ifc.question(texto, answer => {
      ifc.close();
      resolve(answer.toLowerCase() === 'yes');
    })
  })
}