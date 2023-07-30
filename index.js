
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const i18next = require('i18next');
const Backend = require('i18next-node-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');
const path = require('path');

// Херь шоб монгус не ругався
mongoose.set('strictQuery', true);

const app = express();

app.use(express.json({ extended: true }))


const PORT = config.get('port') || 5000;

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector) // Set up language detection middleware
  .init({
    // debug: true,
    backend: {
      loadPath: path.join(__dirname, 'locales', '{{lng}}', '{{ns}}.json'),
      addPath: path.join(__dirname, 'locales', '{{lng}}', '{{ns}}.missing.json')
    },
    detection: {
      order: ['header', 'querystring'], // Adjust the order if necessary
      lookupHeader: 'accept-language', // Use 'accept-language' header for language detection
      caches: ['cookie'],
    },
    fallbackLng: 'cs',
    preload: ['cs', 'en', 'uk', 'ru'],
    saveMissing: true
  });

// app.use(i18nextMiddleware.handle(i18next));

const determineUserLanguage = (req, res, next) => {
  const language = req.headers['accept-language'];
  // Тут ви можете додатково обробити значення `language`, якщо потрібно
  // Наприклад, розібрати рядок, якщо він містить декілька мов або інші маніпуляції з мовою
  req.language = language;
  i18nextMiddleware.handle(i18next)(req, res, next);
};

// Додайте middleware до вашого Express додатку перед роутами
app.use(determineUserLanguage);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/form', require('./routes/requestRoutes'));

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'));
    app.listen(PORT, () => console.log(`Application has been started on port ${PORT}`));
  } catch (e) {
    process.exit(1);
  }
}

start();
