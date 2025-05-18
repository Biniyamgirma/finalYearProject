const db= require("../database/createDataBase.js");
require("dotenv").config();

const createTables = db.transaction(() => {
    // Create tables in proper dependency order
    // 1. First create tables without foreign key dependencies
    db.prepare(`
        CREATE TABLE IF NOT EXISTS region (
            regionId INTEGER PRIMARY KEY,
            regionName TEXT NOT NULL
        );
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS root (
            rootId INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            role INTEGER NOT NULL,
            passwordText TEXT NOT NULL
        );
    `).run();

    // 2. Then create tables that depend on the above
    db.prepare(`
        CREATE TABLE IF NOT EXISTS zone (
            zoneId INTEGER PRIMARY KEY,
            zoneName TEXT NOT NULL,
            regionId INTEGER REFERENCES region(regionId) NOT NULL
        );
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS town (
            townId INTEGER PRIMARY KEY,
            zoneId INTEGER REFERENCES zone(zoneId) NOT NULL,
            regionId INTEGER REFERENCES region(regionId) NOT NULL,
            townName TEXT NOT NULL,
            zoneName TEXT NOT NULL,
            regionName TEXT NOT NULL
        );
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS subCity (
            subCityId INTEGER PRIMARY KEY,
            subCityName TEXT NOT NULL,
            townId INTEGER REFERENCES town(townId)
        );
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS policeStation (
            policeStationId TEXT PRIMARY KEY,
            nameOfPoliceStation TEXT NOT NULL,
            policeStationPhoneNumber TEXT NOT NULL,
            secPoliceStationPhoneNumber TEXT NOT NULL,
            policeStationLogo TEXT NOT NULL,
            townId INTEGER REFERENCES town(townId) NOT NULL,
            subCityId INTEGER REFERENCES subCity(subCityId),
            rootId INTEGER REFERENCES root(rootId) NOT NULL
        );
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS policeOfficer (
            policeOfficerId TEXT PRIMARY KEY,
            policeOfficerFname TEXT NOT NULL,
            policeOfficerMname TEXT NOT NULL,
            policeOfficerLname TEXT NOT NULL,
            policeOfficerRoleName TEXT NOT NULL,
            policeOfficerStatus INTEGER NOT NULL,
            policeOfficerPhoneNumber TEXT NOT NULL,
            policeOfficerGender TEXT NOT NULL,
            policeOfficerBirthdate TEXT NOT NULL,
            passwordText TEXT NOT NULL,
            role INTEGER NOT NULL,
            profilePicture TEXT,
            policeStationId TEXT REFERENCES policeStation(policeStationId) NOT NULL
        );
    `).run();

    // Now create tables that depend on policeOfficer and policeStation
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
            policeOfficerId TEXT REFERENCES policeOfficer(policeOfficerId) NOT NULL,
            policeStationId TEXT REFERENCES policeStation(policeStationId) NOT NULL,
            postStatus INTEGER NOT NULL,
            personStatus TEXT NOT NULL,
            imagePath TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `).run();

    // Junction tables
    db.prepare(`
        CREATE TABLE IF NOT EXISTS zonePost (
            postId INTEGER REFERENCES post(postId),
            zoneId INTEGER REFERENCES zone(zoneId),
            PRIMARY KEY (postId, zoneId)
        );
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS regionPost (
            postId INTEGER REFERENCES post(postId) NOT NULL,
            regionId INTEGER REFERENCES region(regionId) NOT NULL,
            PRIMARY KEY (postId, regionId)
        );
    `).run();

    // Other tables
    db.prepare(`
        CREATE TABLE IF NOT EXISTS normalUser (
            userId INTEGER PRIMARY KEY,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            phoneNumber TEXT NOT NULL,
            townId INTEGER REFERENCES town(townId) NOT NULL,
            subCityId TEXT REFERENCES subCity(subCityId),
            passwordText TEXT NOT NULL,
            role INTEGER NOT NULL,
            userStatus INTEGER NOT NULL
        );
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS report (
            reportId INTEGER PRIMARY KEY,
            postId INTEGER REFERENCES post(postId) NOT NULL,
            townId INTEGER REFERENCES town(townId) NOT NULL,
            subCityId INTEGER REFERENCES subCity(subCityId),
            reportDescription TEXT,
            userId INTEGER,
            policeStationId TEXT REFERENCES policeStation(policeStationId)
        );
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS family (
            userId INTEGER REFERENCES normalUser(userId),
            postId INTEGER REFERENCES post(postId),
            PRIMARY KEY (userId, postId)
        );
    `).run();

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
            policeStationId TEXT REFERENCES policeStation(policeStationId)
        );
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS message (
            messageId INTEGER PRIMARY KEY,
            sendersId TEXT REFERENCES policeStation(policeStationId),
            reciversId TEXT REFERENCES policeStation(policeStationId),
            message TEXT,
            sentAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            isRead INTEGER DEFAULT 0
        );
    `).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS alert (
            alertId INTEGER PRIMARY KEY,
            postId INTEGER REFERENCES post(postId),
            localPoliceStationId TEXT REFERENCES policeStation(policeStationId),
            postPoliceStationId TEXT REFERENCES policeStation(policeStationId),
            isRead INTEGER,
            priority INTEGER,
            reportId INTEGER REFERENCES report(reportId)
        );
    `).run();
    db.prepare(`
        CREATE TABLE IF NOT EXISTS role (
            roleId INTEGER PRIMARY KEY DEFAULT 1,
            roleName TEXT DEFAULT 'Town Officer'
        );
      `).run();
});

// Enable foreign key constraints
db.prepare("PRAGMA foreign_keys = ON").run();

module.exports = createTables;