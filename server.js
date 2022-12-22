// imports
const express = require("express");
const rootRouter = require("./routes/rootRouter");
const path = require("path");
const { loggerMiddleware } = require("./middlewares/logger");
const server = express();
const PORT = process.env.PORT || 3500;

// middlewares
server.use(loggerMiddleware);
server.use("/", express.static(path.join(__dirname, "/public")));

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

// LISTENING TO SERVER
server.listen(PORT, () => console.log("server started listening at " + PORT));
