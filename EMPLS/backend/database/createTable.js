const db=require("./createDataBase");
require("dotenv").config();
 // database setup here
 const createTable = db.transaction(
    ()=>{
        db.prepare(`
            CREATE TABLE IF NOT EXISTS post (
    postId INTEGER PRIMARY KEY,
    townId INTEGER REFERENCES town(townId) NOT NULL,
    subCityId INTEGER REFERENCES subCity(subCityId),
    postDescription TEXT,
    firstName TEXT NOT NULL,
    middleName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    age TEXT NOT NULL,
    lastLocation TEXT,
    gender TEXT NOT NULL,
    policeOfficerId INTEGER REFERENCES policeOfficer(policeOfficerId) NOT NULL,
    policeStationId INTEGER REFERENCES localpoliceStation(policeStationId) NOT NULL,
    postStatus INTEGER NOT NULL,
    personStatus TEXT NOT NULL,
    imagePath TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
            `
        ).run()

        db.prepare(`
            CREATE TABLE IF NOT EXISTS zonePost (
    postId INTEGER REFERENCES post(postId),
    zoneId INTEGER REFERENCES zone(zoneId)
)
            `).run()
            db.prepare(`
               CREATE TABLE IF NOT EXISTS regionPost (
    postId INTEGER REFERENCES post(postId) NOT NULL,
    regionId INTEGER REFERENCES region(regionId) NOT NULL
)
                `).run() 
     //tabel 4
     
     db.prepare(`
        CREATE TABLE IF NOT EXISTS ethiopiaPost (
    postId INTEGER REFERENCES post(postId) NOT NULL,
    countryId INTEGER REFERENCES country(countryId) NOT NULL
)
         `).run() 

    // tabel 5

    db.prepare(`
        CREATE TABLE IF NOT EXISTS policeOfficer (
    policeOfficerId INTEGER PRIMARY KEY,
    policeOfficerFname TEXT NOT NULL,
    policeOfficerMname TEXT NOT NULL,
    policeOfficerLname TEXT NOT NULL,
    profilePicture TEXT NOT NULL,
    policeOfficerRoleName TEXT NOT NULL,
    policeOfficerStatus INTEGER NOT NULL,
    policeOfficerPhoneNumber TEXT NOT NULL,
    policeOfficerGender TEXT NOT NULL,
    policeOfficerBirthdate TEXT NOT NULL,
    passwordText TEXT NOT NULL,
    policeStationId INTEGER REFERENCES policeStation(policeStationId) NOT NULL
)

         `).run() //police officer status 0 for inactive and 1 for active\

    // table 6

    db.prepare(`
       CREATE TABLE IF NOT EXISTS policeStation (
    policeStationId INTEGER PRIMARY KEY,
    nameOfPoliceStation TEXT NOT NULL,
    policeStationPhoneNumber TEXT NOT NULL,
    secPoliceStationPhoneNumber TEXT NOT NULL,
    policeStationLogo TEXT NOT NULL,
    townId INTEGER REFERENCES town(townId) NOT NULL,
    subCityId INTEGER REFERENCES subCity(subCityId) NOT NULL,
    rootId INTEGER REFERENCES root(rootId) NOT NULL,
    adminId INTEGER REFERENCES policeOfficer(policeOfficerId) NOT NULL 
)
         `).run() 

    // tabel 7
    db.prepare(`
    CREATE TABLE IF NOT EXISTS region (
    regionId INTEGER PRIMARY KEY,
    regionName TEXT NOT NULL,
    countryId INTEGER REFERENCES country(countryId) NOT NULL
)
         `).run() 
    
    //table 8
    db.prepare(`
    CREATE TABLE IF NOT EXISTS town (
    townId INTEGER PRIMARY KEY,
    townName TEXT NOT NULL,
    zoneId INTEGER REFERENCES zone(zoneId) NOT NULL
)
         `).run() 
    // tabel 9
    db.prepare(`
    CREATE TABLE IF NOT EXISTS subCity (
    subCityId INTEGER PRIMARY KEY,
    subCityName TEXT NOT NULL,
    townId INTEGER REFERENCES town(townId)
)
         `).run() 
    
    // table 10
    db.prepare(`
    CREATE TABLE IF NOT EXISTS zone (
    zoneId INTEGER PRIMARY KEY,
    zoneName TEXT NOT NULL,
    regionId INTEGER REFERENCES region(regionId) NOT NULL
)
         `).run() 
    
    // table 11
    db.prepare(`
    CREATE TABLE IF NOT EXISTS country (
    countryId INTEGER PRIMARY KEY,
    countryName TEXT NOT NULL
)
         `).run() 
    // table 12
    db.prepare(`
    CREATE TABLE IF NOT EXISTS report (
    reportId INTEGER PRIMARY KEY,
    postId INTEGER REFERENCES post(postId) NOT NULL,
    townId INTEGER REFERENCES town(townId) NOT NULL,
    subCityId INTEGER REFERENCES subCity(subCityId),
    reportDescription TEXT,
    userId INTEGER,
    policeStationId INTEGER REFERENCES policeStation(policeStationId)
)
         `).run() 
    // table 13
    db.prepare(`
    CREATE TABLE IF NOT EXISTS root (
    rootId INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    passwordText TEXT NOT NULL
)
         `).run() 
    // table 14
    db.prepare(`
    CREATE TABLE IF NOT EXISTS family (
    userId INTEGER REFERENCES normalUser(userId),
    postId INTEGER REFERENCES post(postId),
)
         `).run() 
    // table 15
    db.prepare(`
    CREATE TABLE IF NOT EXISTS normalUser (
    userId INTEGER PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    townId INTEGER REFERENCES town(townId) NOT NULL,
    subCityId TEXT REFERENCES subCity(subCityId),
    passwordText TEXT NOT NULL,
    userStatus INTEGER NOT NULL
)
         `).run() 
    // table 16
    db.prepare(`
    CREATE TABLE IF NOT EXISTS criminal (
    criminalId INTEGER PRIMARY KEY,
    photo TEXT,
    firstName TEXT,
    middleName TEXT,
    lastName TEXT,
    faceColor TEXT,
    hairColor TEXT,
    height TEXT,
    bodyType TEXT,
    age INTEGER,
    gender TEXT,
    fileNumber TEXT,
    policeStationId INTEGER REFERENCES policeStation(policeStationId),
)
         `).run() 
    // table 17
    db.prepare(`
    CREATE TABLE message(
    messageId INTEGER PRIMARY KEY,
    sendersId INTEGER REFERENCES policeStation(policeStationId),
    reciversId INTEGER REFERENCES policeStation(policeStationId),
    message TEXT,
    sentAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    isRead INTEGER
)
             `).run() 
    // table 18
    db.prepare(`
    CREATE TABLE IF NOT EXISTS alert(
    alertId INTEGER PRIMARY KEY,
    postId INTEGER REFERENCES post(postId),
    localPoliceStationId INTEGER REFERENCES policeStation(policeStationId),
    postPoliceStationId INTEGER REFERENCES policeStation(policeStationId),
    isRead INTEGER,
    priority INTEGER,
    reportId INTEGER REFERENCES report(reportId)
)
        `).run()
  
    
    }
)

module.exports = createTable;