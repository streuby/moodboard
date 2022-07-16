const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
const dotenv = require('dotenv')
const ConnectDB = require('./models/DBConnect')
const verifyJWT = require('./middleware/verifyJWT')
dotenv.config({ path: './config/.env' })


ConnectDB();

app.use(cookieParser())
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/register', require('./routes/register'))
app.use(verifyJWT)

app.use('/users', require('./routes/users'))

// app.use('/login', require('./routes/login'))
app.use('/auth', require('./routes/auth'))


app.listen(process.env.PORT, () => {
    console.log(`server is up on port ${process.env.PORT}`);
})