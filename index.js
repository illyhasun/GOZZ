
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


i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    // debug: true,
    backend: {
      loadPath: path.join(__dirname, 'locales', '{{lng}}', '{{ns}}.json'),
      addPath: path.join(__dirname, 'locales', '{{lng}}', '{{ns}}.missing.json')
    },
    detection: {
      order: ['querystring', 'header'],
      lookupQuerystring: 'lang',
      lookupHeader: 'accept-language',
      caches: ['cookie'],
    },
    fallbackLng: 'cs',
    preload: ['cs', 'en', 'uk', 'ru'],
    saveMissing: true
  });


const determineUserLanguage = (req, res, next) => {
  if (req.query.lang) {
    req.language = req.query.lang;
    return i18nextMiddleware.handle(i18next)(req, res, next);
  }
  const language = req.headers['accept-language'];
  req.language = language;
  i18nextMiddleware.handle(i18next)(req, res, next);
};

app.use(determineUserLanguage);

app.use('/uploads', express.static('uploads'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/form', require('./routes/requestRoutes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'));
    app.listen(PORT, () => console.log(`Application has been started on port ${PORT}`));
  } catch (e) {
    console.log(e)
    process.exit(1);
  }
}

start();
