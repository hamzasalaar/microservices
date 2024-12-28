const validator = require("validator");
const shortid = require("shortid");
const URL = require("../models/url");

// async function handleGenerateNewShortURL(req, res) {
//   const { nanoid } = await import("nanoid"); // Dynamic import for ES Module
//   const body = req.body;

//   if (!body.url) {
//     return res.status(400).json({ error: "URL is required!" });
//   }

//   if (!validator.isURL(body.url, { require_protocol: true })) {
//     return res.status(400).json({ error: "Invalid URL!" });
//   }

//   let shortID;
//   try {
//     do {
//       shortID = nanoid(8);
//       const existingUrl = await URL.findOne({ shortId: shortID });
//       if (!existingUrl) break;
//     } while (true);

//     const newURL = await URL.create({
//       shortId: shortID,
//       redirectURL: body.url,
//       visitHistory: [],
//       createdBy: req.user._id,
//     });

//     return res.render("home", { id: shortID });
//   } catch (error) {
//     console.error("Error creating URL:", error);

//     // Handle MongoDB duplicate key error
//     if (error.code === 11000 && error.keyPattern?.shortId) {
//       return res
//         .status(500)
//         .json({ error: "Duplicate shortID generated. Please try again." });
//     }

//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url required!" });

  const shortID = shortid.generate();

  if (!shortID) {
    return res.status(500).json({ error: "Failed to generate short ID" });
  }

  try {
    const newURL = await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });
    return res.render("home", { id: shortID });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
};
