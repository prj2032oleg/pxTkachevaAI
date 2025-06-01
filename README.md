# pxTkachevaAI

## Лицензирование и разрешения на коммерческое использование

### Tailwind CSS
- **Лицензия:** MIT License
- **Разрешено:** Бесплатно для коммерческого использования, модификации и распространения.
- **Источник:** https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE

### Alpine.js
- **Лицензия:** MIT License
- **Разрешено:** Бесплатно для коммерческого использования, модификации и распространения.
- **Источник:** https://github.com/alpinejs/alpine/blob/main/LICENSE.md

### Font Awesome (иконки)
- **Лицензия:** Free иконки — CC BY 4.0
- **Разрешено:** Бесплатно для коммерческого использования, требуется указание авторства (обычно достаточно ссылки на сайт Font Awesome).
- **Источник:** https://fontawesome.com/license/free

### Google Fonts (если используются)
- **Лицензия:** Open Font License (OFL)
- **Разрешено:** Бесплатно для коммерческого использования, модификации и распространения.
- **Источник:** https://fonts.google.com/attribution

### Изображения (Unsplash, Team, логотип)
- **Unsplash:**
  - **Лицензия:** Unsplash License
  - **Разрешено:** Бесплатно для коммерческого использования, без необходимости указывать авторство.
  - **Источник:** https://unsplash.com/license
- **Team/логотип:**
  - **Проверьте, что у вас есть права на использование и распространение этих изображений (например, ваши собственные фото или купленные/разрешённые для коммерции).**

### Собственные компоненты и шаблоны
- Всё, что написано вами или сгенерировано на основе Tailwind/Alpine, может использоваться в коммерческих целях без ограничений.

---

**Все используемые библиотеки, иконки и стили разрешены для коммерческого использования.**

**Рекомендуется оставить ссылку на [Font Awesome](https://fontawesome.com) при использовании Font Awesome.**

## Cookie-Banner

### Русский
- **Лицензия:** MIT License
- **Функциональность:** Управление согласием на использование файлов cookie в соответствии с GDPR/DSGVO
- **Технологии:** Vanilla JavaScript, Tailwind CSS
- **Возможности:**
  - Управление различными категориями cookie (необходимые, статистика, маркетинг, внешние медиа)
  - Локализация на нескольких языках (немецкий, русский)
  - Блокировка внешних медиа (YouTube, Google Maps) до получения согласия
  - Сохранение настроек пользователя на 180 дней

### Deutsch
- **Lizenz:** MIT License
- **Funktionalität:** Cookie-Consent-Management in Übereinstimmung mit GDPR/DSGVO
- **Technologien:** Vanilla JavaScript, Tailwind CSS
- **Funktionen:**
  - Verwaltung verschiedener Cookie-Kategorien (notwendig, Statistik, Marketing, externe Medien)
  - Mehrsprachigkeit (Deutsch, Russisch)
  - Blockierung externer Medien (YouTube, Google Maps) bis zur Einwilligung
  - Speicherung der Benutzereinstellungen für 180 Tage

### English
- **License:** MIT License
- **Functionality:** Cookie consent management in compliance with GDPR/DSGVO
- **Technologies:** Vanilla JavaScript, Tailwind CSS
- **Features:**
  - Management of different cookie categories (necessary, statistics, marketing, external media)
  - Multi-language support (German, Russian)
  - Blocking external media (YouTube, Google Maps) until consent is given
  - Saving user preferences for 180 days

## Установка и использование / Installation und Verwendung / Installation and Usage

### Русский
1. Добавьте скрипт `cookie-banner.js` на вашу страницу перед закрывающим тегом `</body>`:
   ```html
   <script src="assets/js/cookie-banner.js"></script>
   ```
2. Для YouTube и Google Maps плейсхолдеров, используйте класс `.external-media-placeholder` 
   для контейнеров с соответствующими data-атрибутами.

### Deutsch
1. Fügen Sie das Script `cookie-banner.js` vor dem schließenden `</body>`-Tag ein:
   ```html
   <script src="assets/js/cookie-banner.js"></script>
   ```
2. Für YouTube und Google Maps Platzhalter verwenden Sie die Klasse `.external-media-placeholder` 
   für Container mit entsprechenden data-Attributen.

### English
1. Add the `cookie-banner.js` script to your page before the closing `</body>` tag:
   ```html
   <script src="assets/js/cookie-banner.js"></script>
   ```
2. For YouTube and Google Maps placeholders, use the `.external-media-placeholder` class 
   for containers with appropriate data attributes.