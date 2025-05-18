const db= require("../../database/createDataBase.js");

function generateId(prefix, tableName, idColumn) {
    // 1. Get the highest existing ID from the database
    const result = db.prepare(`
        SELECT ${idColumn} 
        FROM ${tableName} 
        WHERE ${idColumn} LIKE '${prefix}%'
        ORDER BY CAST(SUBSTR(${idColumn}, 3) AS INTEGER) DESC
        LIMIT 1
    `).get();

    let nextNumber = 1; // Default if no records exist

    // 2. If records exist, extract the number and increment
    if (result && result[idColumn]) {
        const lastId = result[idColumn];
        const lastNumber = parseInt(lastId.replace(prefix, ''), 10);
        nextNumber = lastNumber + 1;
    }

    // 3. Format with 5-digit padding (e.g., PS00001)
    const paddedNumber = String(nextNumber).padStart(5, '0');
    return `${prefix}${paddedNumber}`;
}

// Specific functions for each entity type
function generatePoliceStationId() {
    return generateId('PS', 'policeStation', 'policeStationId');
}

module.exports = generatePoliceStationId;

