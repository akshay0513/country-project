const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const app = express();
const PORT = 8081;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 4 * 1024 * 1024 }, // 4 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only .png and .jpg files are allowed"));
    }
  },
});

// Use CORS to allow cross-origin requests
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// Read and write data from data.json
const dataFilePath = path.join(__dirname, "data.json");
const getCountriesData = () =>
  JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
const saveCountriesData = (data) =>
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

// GET /countries API
app.get("/countries", (req, res) => {
  const countriesData = getCountriesData();
  const countriesList = countriesData.countries.map((country) => ({
    id: country.id,
    name: country.name,
  }));
  res.json(countriesList);
});

// GET /country/:id API
app.get("/country/:id", (req, res) => {
  const countryId = parseInt(req.params.id);
  const countriesData = getCountriesData();
  const country = countriesData.countries.find(
    (country) => country.id === countryId
  );
  if (country) {
    country.image = `http://localhost:8081/${country.flag}`; // Add full path to image
    res.json(country);
  } else {
    res.status(404).json({ error: "Country not found" });
  }
});

// POST /country API
app.post("/country", upload.single("image"), (req, res) => {
  const { name, continent, rank } = req.body;
  const flag = req.file ? `images/${req.file.filename}` : "";

  if (!name || name.length < 3 || name.length > 20) {
    return res
      .status(400)
      .json({ error: "Country name must be between 3 and 20 characters" });
  }

  if (!rank || isNaN(rank)) {
    return res.status(400).json({ error: "Rank must be a numeric value" });
  }

  const countriesData = getCountriesData();
  const existingCountry = countriesData.countries.find(
    (country) => country.name === name || country.rank == rank
  );

  if (existingCountry) {
    return res
      .status(400)
      .json({ error: "Country name and rank must be unique" });
  }

  const newCountry = {
    id: countriesData.countries.length + 1,
    name,
    continent,
    flag,
    rank: parseInt(rank),
  };

  countriesData.countries.push(newCountry);
  saveCountriesData(countriesData);

  res.json(newCountry);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
