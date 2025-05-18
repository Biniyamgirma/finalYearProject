const {generateToken} = require('./jwtUtils');

const data = {
    policeOfficerId: "PO00002",
    role: 2,
    policeStationId: "PS00001",
    townId: 1
}

const token = generateToken(data);
console.log(token);

