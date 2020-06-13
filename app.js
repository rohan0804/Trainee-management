const express = require("express");
const app = express();
const sequelize = require("./utils/database");
const bodyParser = require("body-parser");
const authRouter = require("./Routes/auth");
const adminRouter = require("./Routes/admin");
const mentorRouter = require("./Routes/mentor");
const expressLayouts = require("express-ejs-layouts");
const multer = require("multer");
const ModelsRelation = require("./utils/modelsRelation");
const { fileStorage, fileFilter } = require("./utils/fileUploading");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(expressLayouts);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
    {
      name: "syllabuss",
    },
    {
      name: "testfile",
    },
  ])
);

app.use(bodyParser.json());

app.use("/", authRouter);

app.use("/", adminRouter);

app.use("/mentor", mentorRouter);
sequelize
  .sync()
  .then((result) => {
    // console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
let port = 4000;

app.listen(4000, (req, res) => {
  console.log(`server is listening at port ${port}`);
});
