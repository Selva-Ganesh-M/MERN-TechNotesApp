// imports
const express = require("express");
const rootRouter = require("./routes/rootRouter");
const path = require("path");
const { loggerMiddleware } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const server = express();
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");

// middlewares
server.use(cors(corsOptions));
server.use(express.json());
server.use(loggerMiddleware);
server.use("/", express.static(path.join(__dirname, "/public")));
server.use(cookieParser());

// Routes
server.use("/", rootRouter);

// Final Route Handler
server.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({
      status: 404,
      message: "The requested resource not found.",
    });
  } else {
    res.type("txt").send("The requested resource not found.");
  }
});

// CUSTOM ERROR HANDLER
server.use(errorHandler);

// LISTENING TO SERVER
server.listen(PORT, () => console.log("server started listening at " + PORT));
