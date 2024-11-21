const cors = require("cors");

const corsOptions = {

  // have to replace this with the actual frontend domains once I host them

  origin: ["https://frontend1.com", "https://frontend2.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
