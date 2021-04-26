const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

async function setUpDb() {

    try {
        // First, try to open the database
        const db = await sqlite.open({
            filename: 'laptops.sqlite',
            driver: sqlite3.Database
        })
        // Update db schema to the latest version using SQL-based migrations
        await db.migrate({ force: 'last' });
        /*
        The { force: ‘last’ } option tells this module to rollback and re-apply the latest migration,
        which is very handy feature to use in development environment. You can easily make it work, 
        so that as soon as you edit and save the latest migration file, your Node.js app is restarted 
        and db schema is automatically updated to the most recent version.
         */

        const faqs = await db.all("SELECT * FROM FAQ ORDER BY createDate DESC;")
        console.log('All FAQs ', JSON.stringify(faqs, null, 2));

        const laptops = await db.all(
            "SELECT Laptop.id, Brand.brandName, name, display, processor, memory, memory_type, graphics, storage, storage_unit, imgUrl, price FROM Laptop " +
            "INNER JOIN Brand WHERE Laptop.brand = Brand.id;");
        console.log('All laptops ', JSON.stringify(laptops, null, 2));
    } catch (error) {
        console.log('DB-Errors: ', error)
    }

}

setUpDb();