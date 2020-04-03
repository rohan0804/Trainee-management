const express = require("express");
const app = express();
const sequelize = require("./utils/database");
const bodyParser = require("body-parser");
const authRouter = require("./Routes/auth");
const adminRouter = require("./Routes/admin");
const mentorRouter = require("./Routes/mentor");
const expressLayouts = require("express-ejs-layouts");
const {auth} = require('./middleware/auth');
var http = require('http').createServer(app);
const io = require('./socket').init(http);
const cookieParser = require('cookie-parser');
app.set("view engine", "ejs");
app.set("views", "views");
app.use(expressLayouts);
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", authRouter);
app.use(auth);



app.use("/", adminRouter);

app.use("/mentor", mentorRouter);

const Department = require("./Models/department");
const Announcement=require('./Models/announcement');
const Event=require('./Models/event');
const Trainee = require("./Models/trainee.js");
const Mentor = require("./Models/mentor");
const Performance = require("./Models/performance");
const Role = require("./Models/role");
const Leave = require("./Models/leave");
const Timelog = require("./Models/timelog");
const Category = require("./Models/category");
const subCategory = require("./Models/sub_category");
const Test = require("./Models/test");
const Auth = require("./Models/auth");

Department.hasMany(Trainee, { foreignKey: "department_id" });
Mentor.hasMany(Trainee, { foreignKey: "mentor_id" });
Auth.belongsTo(Role, { foreignKey: "role_id" });
Trainee.hasMany(Leave, { foreignKey: "trainee_id" });
Department.hasMany(Mentor, { foreignKey: "department_id" });
Test.hasMany(Performance, { foreignKey: "test_id" });
Performance.belongsTo(Trainee, { foreignKey: "trainee_id" });
Trainee.belongsTo(Auth, { foreignKey: "auth_id" });
Mentor.belongsTo(Auth, { foreignKey: "auth_id" });
Trainee.hasMany(Timelog, { foreignKey: "trainee_id" });
Category.hasMany(Timelog, { foreignKey: "category_id" });
subCategory.hasMany(Category, { foreignKey: "subcategory_id" });
sequelize
  .sync()
  .then(result => {
    let count=0;
    io.on('connection',socket=>{
    count+=1;
    console.log("Active sockets",count);
    socket.on('disconnect',result=>{
      count-=1;
      console.log("Active sockets",count);
    });
    });
    http.listen(4000, (req, res) => {
      console.log(`server is listening at my port`);
    });
  })
  .catch(err => {
    console.log(err);
  });
  

  
 
  
