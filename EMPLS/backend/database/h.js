// const addOgColumn = `
//   ALTER TABLE roles ADD COLUMN og TEXT;
// `;
const db= require("../database/createDataBase.js");
// db.prepare(`
//   CREATE TABLE IF NOT EXISTS role (
//       roleId INTEGER PRIMARY KEY DEFAULT 1,
//       roleName TEXT DEFAULT 'Regular User'
//   );
// `).run();
// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//     return;
//   }
//   console.log('Closed the database connection.');
// });
db.exec("ALTER TABLE policeOfficer ADD COLUMN profilePicture TEXT;")
// db.prepare(`
//   CREATE TABLE IF NOT EXISTS policeOfficer (
//       policeOfficerId TEXT PRIMARY KEY,
//       policeOfficerFname TEXT NOT NULL,
//       policeOfficerMname TEXT NOT NULL,
//       policeOfficerLname TEXT NOT NULL,
//       policeOfficerRoleName TEXT NOT NULL,
//       policeOfficerStatus INTEGER NOT NULL,
//       policeOfficerPhoneNumber TEXT NOT NULL,
//       policeOfficerGender TEXT NOT NULL,
//       policeOfficerBirthdate TEXT NOT NULL,
//       passwordText TEXT NOT NULL,
//       role INTEGER NOT NULL,
//       profilePicture TEXT,
//       policeStationId TEXT REFERENCES policeStation(policeStationId) NOT NULL
//   );
// `).run();