require("dotenv").config();
const db = require('better-sqlite3')("emplsDataBase.db");
module.exports= db;

// //const fs = require('fs');
// const path = require('path');

// function exportDatabase(sourcePath, destinationPath) {
//     try {
//         fs.copyFileSync(sourcePath, destinationPath);
//         console.log(`Database successfully exported to ${destinationPath}`);
//     } catch (err) {
//         console.error('Error exporting database:', err);
//     }
// }

// // Usage
// const dbPath = './your-database.db';
// const exportPath = './backups/exported-database-' + new Date().toISOString().replace(/[:.]/g, '-') + '.db';
// exportDatabase(dbPath, exportPath);