const db = require("../database/createDataBase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    const { policeOfficerId, password } = req.body;

    if (!policeOfficerId || !password) {
        return res.status(400).json({ message: "police Officer Id and password are required" });
    }

    try {
        const userStatement = db.prepare("SELECT * FROM users WHERE policeOfficer = ?");
        const user = userStatement.get(policeOfficerId);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordText);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user.policeOfficerId, role: user.role, policeStationId: user.policeStationId },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { loginUser };