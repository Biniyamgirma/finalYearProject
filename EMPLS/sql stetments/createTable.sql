-- crating post table
-- table for cityPost
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
);

-- table for zonePost

CREATE TABLE IF NOT EXISTS zonePost (
    postId INTEGER REFERENCES post(postId),
    zoneId INTEGER REFERENCES zone(zoneId)
);

-- table for regionPost
CREATE TABLE IF NOT EXISTS regionPost (
    postId INTEGER REFERENCES post(postId),
    regionId INTEGER REFERENCES region(regionId) NOT NULL
   
)

--table for ethiopianPost
CREATE TABLE IF NOT EXISTS ethiopiaPost (
    postId INTEGER REFERENCES post(postId),
    countryId INTEGER REFERENCES country(countryId) NOT NULL
   
)

-- table for policeOfficer
CREATE TABLE IF NOT EXISTS policeOfficer (
    policeOfficerId INTEGER PRIMARY KEY,
    policeOfficerFname TEXT NOT NULL,
    policeOfficerLname TEXT NOT NULL,
    profilePicture TEXT NOT NULL,
    policeOfficerRoleName TEXT NOT NULL,
    policeOfficerStutas int NOT NULL,
    policeStationId INTEGER REFERENCES policeStation(policeStationId) NOT NULL
)

-- table for localpoliceStation

CREATE TABLE IF NOT EXISTS policeStation (
    policeStationId INTEGER PRIMARY KEY,
    nameOfPoliceStation TEXT NOT NULL,
    policeStationPhoneNumber TEXT NOT NULL,
    secPoliceStationPhoneNumber TEXT NOT NULL,
    policeStationLogo TEXT NOT NULL,
    townId INTEGER REFERENCES town(townId) NOT NULL,
    subCityId INTEGER REFERENCES subCity(subCityId) NOT NULL,
    rootId INTEGER REFERENCES root(rootId) NOT NULL,
    adminId INTEGER REFERENCES policeOfficer(policeOfficerId) NOT NULL -- what if i converted the admin id to a string of text that are hard to guess

)
-- table for region
CREATE TABLE IF NOT EXISTS region (
    regionId INTEGER PRIMARY KEY,
    regionName TEXT NOT NULL,
    countryId INTEGER REFERENCES country(countryId) NOT NULL
)

CREATE TABLE IF NOT EXISTS town (
    townId INTEGER PRIMARY KEY,
    townName TEXT NOT NULL,
    zoneId INTEGER REFERENCES zone(zoneId) NOT NULL
)

CREATE TABLE IF NOT EXISTS subCity (
    subCityId INTEGER PRIMARY KEY,
    subCityName TEXT NOT NULL,
    townId INTEGER REFERENCES town(townId)
)

CREATE TABLE IF NOT EXISTS zone (
    zoneId INTEGER PRIMARY KEY,
    zoneName TEXT NOT NULL,
    regionId INTEGER REFERENCES region(regionId) NOT NULL
)

CREATE TABLE IF NOT EXISTS country (
    countryId INTEGER PRIMARY KEY,
    countryName TEXT NOT NULL
)

-- table for report from user
CREATE TABLE IF NOT EXISTS report (
    reportId INTEGER PRIMARY KEY,
    postId INTEGER REFERENCES cityPost(postId) NOT NULL,
    townId INTEGER  NOT NULL,
    subCityId INTEGER,
    reportDescription TEXT,
    userId INTEGER,
    policeStationId INTEGER REFERENCES policeStation(policeStationId)
)


CREATE TABLE IF NOT EXISTS root (
    rootId INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    passwordText TEXT NOT NULL
)

CREATE TABLE IF NOT EXISTS family (
    userId INTEGER REFERENCES normalUser(userId),
    postId INTEGER REFERENCES cityPost(postId),
)

CREATE TABLE IF NOT EXISTS normalUser (
    userId INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    userPhoneNumber TEXT NOT NULL,
    townId INTEGER REFERENCES town(townId) NOT NULL,
    subCityId TEXT REFERENCES subCity(subCityId),
    passwordText TEXT NOT NULL,
    userStatus INTEGER NOT NULL
)

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
    fileNumber TEXT,
    policeStationId INTEGER

)

-- creating message table
CREATE TABLE message(
    messageId INTEGER PRIMARY KEY,
    sendersId INTEGER REFERENCES policeStation(policeStationId),
    reciversId INTEGER REFERENCES policeStation(policeStationId),
    message TEXT,
    sentAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    isRead INTEGER
);
CREATE TABLE IF NOT EXISTS alert(
    postId INTEGER REFERENCES post(postId),
    townId INTEGER REFERENCES town(townId),
    subCityId INTEGER,
    localPoliceStationId INTEGER REFERENCES policeStation(policeStationId),
    postPoliceStationId INTEGER REFERENCES policeStation(policeStationId),
    isRead INTEGER,
    reportId INTEGER REFERENCES report(reportId)
)
-- i think i need to add somthing called tagged case
-- need to add notification table in the database and our database name is emplsDataBase