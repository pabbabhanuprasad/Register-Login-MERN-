const express=require("express");
const mysql=require('mysql');
const cors =require('cors');
const PORT=4004;

const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Bhanu@123",
    database:"register"
})

app.post('/register', (req, res) => {
    const email = req.body.email;
    const sql = "SELECT * FROM login WHERE email = ?";
    
    db.query(sql, [email], (err, rows) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (rows.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const sqlInsert = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
        const values = [
            req.body.name,
            req.body.email,
            req.body.password
        ];

        db.query(sqlInsert, values, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Internal server error" });
            } else {
                res.status(200).json({ message: "Registration successful" });
            }
        });
    });
});


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email`=? AND `password`=?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            const registeredUser = data[0];
            if (registeredUser.email === req.body.email && registeredUser.password === req.body.password) {
                return res.status(200).json({ success: true, message: "Login successful" }); 
            } else {
                return res.status(401).json({ fail: false, error: "Invalid email or password" });
            }
        } else {
            return res.status(401).json({ fail: false, error: "Invalid email or password" });
        }
    });
});

app.listen(PORT,()=>{
    console.log(`Server is runnign on ${PORT}`);
});











