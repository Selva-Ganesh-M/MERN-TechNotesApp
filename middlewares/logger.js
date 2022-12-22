const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const fileLogger = async (message, fileName) => {
  const time = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
  const data = `${time}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      data
    );
  } catch (e) {
    console.log(e);
  }
};

const loggerMiddleware = (req, res, next) => {
  const message = `${req.method}\t${req.path}\t${req.headers.origin}`;
  fileLogger(message, "reqLog.log");
  console.log(message);
  next();
};

module.exports = {
  loggerMiddleware,
  fileLogger,
};
