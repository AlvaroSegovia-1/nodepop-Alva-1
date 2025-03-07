'use strict';

const i18n = require('i18n')
const path = require('path')

i18n.configure({
  locales: ['en', 'es', 'fr'],
  directory: path.join(__dirname, '..', 'locales'),
  defaultLocale: 'en',
  autoReload: true, // recargar ficheros de idioma, si cambian
  syncFiles: true, // crear literales en todos los idiomas a la vez
  cookie: 'nodepop-locale'  // puesto en change-locale
})

// si usamos i18n en script
i18n.setLocale('en')

module.exports = i18n