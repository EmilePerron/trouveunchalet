/*!
 * Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license (Commercial License)
 * Copyright 2023 Fonticons, Inc.
 */
(function () {
  'use strict';

  var _WINDOW = {};
  var _DOCUMENT = {};

  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
  } catch (e) {}

  var _ref = _WINDOW.navigator || {},
      _ref$userAgent = _ref.userAgent,
      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var _familyProxy, _familyProxy2, _familyProxy3, _familyProxy4, _familyProxy5;

  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();
  var FAMILY_CLASSIC = 'classic';
  var FAMILY_SHARP = 'sharp';
  var FAMILIES = [FAMILY_CLASSIC, FAMILY_SHARP];

  function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
      get: function get(target, prop) {
        return prop in target ? target[prop] : target[FAMILY_CLASSIC];
      }
    });
  }
  var PREFIX_TO_STYLE = familyProxy((_familyProxy = {}, _defineProperty(_familyProxy, FAMILY_CLASSIC, {
    'fa': 'solid',
    'fas': 'solid',
    'fa-solid': 'solid',
    'far': 'regular',
    'fa-regular': 'regular',
    'fal': 'light',
    'fa-light': 'light',
    'fat': 'thin',
    'fa-thin': 'thin',
    'fad': 'duotone',
    'fa-duotone': 'duotone',
    'fab': 'brands',
    'fa-brands': 'brands',
    'fak': 'kit',
    'fa-kit': 'kit'
  }), _defineProperty(_familyProxy, FAMILY_SHARP, {
    'fa': 'solid',
    'fass': 'solid',
    'fa-solid': 'solid'
  }), _familyProxy));
  var STYLE_TO_PREFIX = familyProxy((_familyProxy2 = {}, _defineProperty(_familyProxy2, FAMILY_CLASSIC, {
    'solid': 'fas',
    'regular': 'far',
    'light': 'fal',
    'thin': 'fat',
    'duotone': 'fad',
    'brands': 'fab',
    'kit': 'fak'
  }), _defineProperty(_familyProxy2, FAMILY_SHARP, {
    'solid': 'fass'
  }), _familyProxy2));
  var PREFIX_TO_LONG_STYLE = familyProxy((_familyProxy3 = {}, _defineProperty(_familyProxy3, FAMILY_CLASSIC, {
    'fab': 'fa-brands',
    'fad': 'fa-duotone',
    'fak': 'fa-kit',
    'fal': 'fa-light',
    'far': 'fa-regular',
    'fas': 'fa-solid',
    'fat': 'fa-thin'
  }), _defineProperty(_familyProxy3, FAMILY_SHARP, {
    'fass': 'fa-solid'
  }), _familyProxy3));
  var LONG_STYLE_TO_PREFIX = familyProxy((_familyProxy4 = {}, _defineProperty(_familyProxy4, FAMILY_CLASSIC, {
    'fa-brands': 'fab',
    'fa-duotone': 'fad',
    'fa-kit': 'fak',
    'fa-light': 'fal',
    'fa-regular': 'far',
    'fa-solid': 'fas',
    'fa-thin': 'fat'
  }), _defineProperty(_familyProxy4, FAMILY_SHARP, {
    'fa-solid': 'fass'
  }), _familyProxy4));
  // TODO: do we need to handle font-weight for kit SVG pseudo-elements?

  var FONT_WEIGHT_TO_PREFIX = familyProxy((_familyProxy5 = {}, _defineProperty(_familyProxy5, FAMILY_CLASSIC, {
    '900': 'fas',
    '400': 'far',
    'normal': 'far',
    '300': 'fal',
    '100': 'fat'
  }), _defineProperty(_familyProxy5, FAMILY_SHARP, {
    '900': 'fass'
  }), _familyProxy5));
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var DUOTONE_CLASSES = {
    GROUP: 'duotone-group',
    SWAP_OPACITY: 'swap-opacity',
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
  };
  var prefixes = new Set();
  Object.keys(STYLE_TO_PREFIX[FAMILY_CLASSIC]).map(prefixes.add.bind(prefixes));
  Object.keys(STYLE_TO_PREFIX[FAMILY_SHARP]).map(prefixes.add.bind(prefixes));
  var RESERVED_CLASSES = [].concat(FAMILIES, _toConsumableArray(prefixes), ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', 'beat', 'border', 'fade', 'beat-fade', 'bounce', 'flip-both', 'flip-horizontal', 'flip-vertical', 'flip', 'fw', 'inverse', 'layers-counter', 'layers-text', 'layers', 'li', 'pull-left', 'pull-right', 'pulse', 'rotate-180', 'rotate-270', 'rotate-90', 'rotate-by', 'shake', 'spin-pulse', 'spin-reverse', 'spin', 'stack-1x', 'stack-2x', 'stack', 'ul', DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function (n) {
    return "".concat(n, "x");
  })).concat(oneToTwenty.map(function (n) {
    return "w-".concat(n);
  }));

  function bunker(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn.apply(void 0, args);
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }

  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});
  }

  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = normalizeIcons(icons);

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll ease the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var icons = {
    "trees": [640, 512, [], "f724", ["M298.4 288H329c9 0 17-5 20.88-13c3.75-8.125 2.5-17.38-3.375-24.12L268.4 160h28.88c9.127 0 17.38-5.375 20.88-13.62c3.625-8.125 1.875-17.62-4.25-24.12L203.6 4.875c-6-6.5-17.25-6.5-23.25 0L69.97 122.3c-6 6.5-7.75 16-4.125 24.12C69.34 154.6 77.59 160 86.72 160h28.88L37.46 250.9c-5.875 6.875-7.125 16-3.375 24.12C37.96 283 45.84 288 54.96 288h30.63l-79.88 90.5c-6 6.75-7.377 16.12-3.625 24.25C5.834 410.8 14.08 416 23.09 416H160V223.1C160 206.3 174.3 192 192 192s32 14.33 32 31.1V416h136.9c9 0 17.25-5.25 21-13.25c3.75-8.125 2.5-17.5-3.5-24.25L298.4 288zM634.3 378.5L554.4 288h30.63c9 0 17-5 20.88-13c3.75-8.125 2.5-17.38-3.375-24.12L524.4 160h28.88c9.125 0 17.38-5.375 20.88-13.62c3.625-8.125 1.875-17.62-4.25-24.12l-110.3-117.4c-6-6.5-17.25-6.5-23.25 0l-95.14 101.3c11.13 15.38 14 35.25 6.377 52.88c-4 9.375-10.38 17.12-18.25 22.75l41.5 48.25c14 16.25 17.13 39.25 8.002 58.62c-4.25 8.875-10.5 16.12-18.13 21.5l41.63 47.13c8.6 9.846 13.34 14.29 13.62 26.7L416 351.1C416 334.3 430.3 320 448 320s32 14.33 32 31.1V416h136.9c9.002 0 17.25-5.25 21-13.25C641.7 394.6 640.3 385.3 634.3 378.5z", "M192 192C174.3 192 160 206.3 160 223.1v256C160 497.7 174.3 512 192 512S224 497.7 224 480V223.1C224 206.3 209.7 192 192 192zM448 320c-17.67 0-32 14.33-32 31.1v128C416 497.7 430.3 512 448 512C465.7 512 480 497.7 480 480V351.1C480 334.3 465.7 320 448 320z"]],
    "bars": [448, 512, ["navicon"], "f0c9", ["M0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256z", "M416 128H32C14.33 128 0 113.7 0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"]],
    "list": [512, 512, ["list-squares"], "f03a", ["M160 96C160 78.33 174.3 64 192 64H480C497.7 64 512 78.33 512 96C512 113.7 497.7 128 480 128H192C174.3 128 160 113.7 160 96zM160 256C160 238.3 174.3 224 192 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H192C174.3 288 160 273.7 160 256zM480 384C497.7 384 512 398.3 512 416C512 433.7 497.7 448 480 448H192C174.3 448 160 433.7 160 416C160 398.3 174.3 384 192 384H480z", "M16 72C16 58.75 26.75 48 40 48H88C101.3 48 112 58.75 112 72V120C112 133.3 101.3 144 88 144H40C26.75 144 16 133.3 16 120V72zM16 232C16 218.7 26.75 208 40 208H88C101.3 208 112 218.7 112 232V280C112 293.3 101.3 304 88 304H40C26.75 304 16 293.3 16 280V232zM88 368C101.3 368 112 378.7 112 392V440C112 453.3 101.3 464 88 464H40C26.75 464 16 453.3 16 440V392C16 378.7 26.75 368 40 368H88z"]],
    "campground": [576, 512, [9978], "f6bb", ["M576 448V464C576 490.5 554.5 512 528 512H48C21.49 512 0 490.5 0 464V448H576z", "M371.1 7.013C385.8 18.05 388 38.19 376.1 51.99L328.1 112L563.7 405.4C571.7 415.4 576 427.7 576 440.4V448H407.5L288 291.7L168.5 448H0V440.4C0 427.7 4.328 415.4 12.27 405.4L247 112L199 51.99C187.1 38.19 190.2 18.05 204 7.013C217.8-4.027 237.9-1.789 248.1 12.01L288 60.78L327 12.01C338.1-1.789 358.2-4.027 371.1 7.013V7.013zM528.3 512C528.2 512 528.1 512 528 512H48C47.89 512 47.78 512 47.66 512H528.3z"]],
    "tree": [448, 512, [127794], "f1bb", ["M414.8 448L256 448l-.0103-79.93l31.14-52.39c2.66-5.315-1.207-11.57-7.154-11.57h-23.99V224.2c0-17.66-14.33-31.98-32-31.98s-32 14.32-32 31.98v15.99H168c-5.947 0-9.814 6.254-7.154 11.57l31.14 52.39l.0116 143.9l-158.9-.0099c-28.5 0-43.69-34.51-24.69-56.4l68.98-79.59H62.22c-25.59 0-39.5-29.18-23.19-48.48l60.92-71.51H89.21c-21.28 0-32.87-22.51-19.28-37.31l134.8-146.5c10.39-11.29 28.23-11.29 38.62-.0033l134.9 146.5c13.62 14.8 1.1 37.31-19.28 37.31h-10.77l60.86 71.51c16.31 19.3 2.406 48.48-23.19 48.48h-15.2l68.98 79.59C458.5 413.4 443.4 448 414.8 448z", "M168 240.2h23.99V224.2c0-17.66 14.33-31.98 32-31.98c17.67 0 32 14.32 32 31.98v79.95h23.99c5.947 0 9.814 6.254 7.154 11.57l-31.14 52.39l.0103 111.9C256 497.7 241.8 512 224.1 512c-17.67 0-32.1-14.33-32.1-31.99L192 304.1L160.9 251.7C158.2 246.4 162.1 240.2 168 240.2z"]],
    "users": [640, 512, [], "f0c0", ["M128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192zM185.5 200.1C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5c-20.38-23.79-33.16-54.29-33.16-88C183.9 210.6 184.9 205.4 185.5 200.1z", "M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352z"]],
    "angle-right": [256, 512, [8250], "f105", ["M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z", ""]],
    "user": [448, 512, [128100, 62144], "f007", ["M352 128c0 70.69-57.3 128-128 128C153.3 256 96 198.7 96 128s57.31-128 128-128C294.7 0 352 57.31 352 128z", "M274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"]],
    "star": [576, 512, [11088, 61446], "f005", ["M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z", ""]],
    "wifi": [640, 512, ["wifi-3", "wifi-strong"], "f1eb", ["", "M319.1 351.1c-35.35 0-64 28.66-64 64.01s28.66 64.01 64 64.01c35.34 0 64-28.66 64-64.01S355.3 351.1 319.1 351.1zM320 191.1c-70.25 0-137.9 25.6-190.5 72.03C116.3 275.7 115 295.9 126.7 309.2C138.5 322.4 158.7 323.7 171.9 312C212.8 275.9 265.4 256 320 256s107.3 19.88 148.1 56C474.2 317.4 481.8 320 489.3 320c8.844 0 17.66-3.656 24-10.81C525 295.9 523.8 275.7 510.5 264C457.9 217.6 390.3 191.1 320 191.1zM630.2 156.7C546.3 76.28 436.2 32 320 32S93.69 76.28 9.844 156.7c-12.75 12.25-13.16 32.5-.9375 45.25c12.22 12.78 32.47 13.12 45.25 .9375C125.1 133.1 220.4 96 320 96s193.1 37.97 265.8 106.9C592.1 208.8 600 211.8 608 211.8c8.406 0 16.81-3.281 23.09-9.844C643.3 189.2 642.9 168.1 630.2 156.7z"]],
    "map-location-dot": [576, 512, ["map-marked-alt"], "f5a0", ["M416 503V200.4C419.5 193.5 422.7 186.7 425.6 179.9C426.1 178.6 426.6 177.4 427.1 176.1L543.1 129.7C558.9 123.4 576 135 576 152V422.8C576 432.6 570 441.4 560.9 445.1L416 503zM15.09 187.3L137.6 138.3C140 152.5 144.9 166.6 150.4 179.9C153.3 186.7 156.5 193.5 160 200.4V451.8L32.91 502.7C17.15 508.1 0 497.4 0 480.4V209.6C0 199.8 5.975 190.1 15.09 187.3H15.09zM384 504.3L191.1 449.4V255C212.5 286.3 234.3 314.6 248.2 331.1C268.7 357.6 307.3 357.6 327.8 331.1C341.7 314.6 363.5 286.3 384 255L384 504.3z", "M273.2 311.1C241.1 271.9 168 174.6 168 120C168 53.73 221.7 0 288 0C354.3 0 408 53.73 408 120C408 174.6 334.9 271.9 302.8 311.1C295.1 321.6 280.9 321.6 273.2 311.1V311.1zM288 152C310.1 152 328 134.1 328 112C328 89.91 310.1 72 288 72C265.9 72 248 89.91 248 112C248 134.1 265.9 152 288 152z"]],
    "arrow-right": [448, 512, [8594], "f061", ["M338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l32 32L338.8 288z", "M256 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L370.8 256l-137.4-137.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C272.4 444.9 264.2 448 256 448z"]],
    "house-water": [576, 512, ["house-flood"], "f74f", ["M565.1 231.9l-255.1-223.1c-6.029-5.283-13.55-7.92-21.08-7.92c-6.199 0-14.15 1.85-21.08 7.92l-255.1 223.1C-11.25 251.3 2.604 287.1 32 287.1h32.02v100.9c8.527-7.877 19.54-12.51 31.35-12.51c40.88 0 34.45 39.62 97.04 39.62c64.52 0 53.23-39.66 95.32-40.02c42.2 .3652 31.4 40.02 95.9 40.02c62.63 0 55.89-39.62 97.04-39.62c11.79 0 22.8 4.617 31.32 12.47V287.1H544c17.73 0 31.1-14.4 31.1-32C575.1 246.9 572.2 238.1 565.1 231.9zM352 298.6c0 11.88-9.625 21.38-21.38 21.38H245.4c-11.75 0-21.38-9.625-21.38-21.38V213.4c0-11.88 9.625-21.38 21.38-21.38h85.25c11.75 0 21.38 9.5 21.38 21.38V298.6z", "M549.8 445.7c-31.23-5.719-46.84-20.06-47.13-20.31c-12.22-12.19-32.31-12.09-44.91-.375c-1.062 .9062-25.17 23-73.77 23s-72.73-22.06-73.38-22.62c-12.22-12.25-32.31-12.12-44.89-.375c-1.031 .9062-25.14 23-73.73 23s-72.73-22.06-73.38-22.62c-12.22-12.25-32.28-12.16-44.89-.3438c-.6562 .5938-16.28 14.94-47.5 20.66c-17.39 3.188-28.89 19.84-25.72 37.22c3.203 17.41 19.8 29.09 37.27 25.69c25.31-4.594 44.7-13.28 58.17-21.19C115.4 498.9 147.4 512 192 512c44.55 0 76.44-13.06 95.95-24.59c19.5 11.47 51.52 24.58 96.12 24.58s76.48-13.11 95.09-24.64c13.47 7.938 32.86 16.62 58.19 21.25c18.41 3.375 34.91-8.312 38.11-25.72S567.2 448.9 549.8 445.7z"]],
    "arrow-left": [448, 512, [8592], "f060", ["M447.1 256C447.1 273.7 433.7 288 416 288H109.3l-32-32l32-32H416C433.7 224 447.1 238.3 447.1 256z", "M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"]],
    "arrow-left-long": [512, 512, ["long-arrow-left"], "f177", ["M77.25 256l32-32H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3L77.25 256z", "M182.6 406.6c-12.5 12.5-32.75 12.5-45.25 0l-128-128c-12.5-12.5-12.5-32.75 0-45.25l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l105.4 105.4C188.9 367.6 192 375.8 192 384S188.9 400.4 182.6 406.6z"]],
    "gear": [512, 512, [9881, "cog"], "f013", ["M304 256C304 282.5 282.5 304 256 304C229.5 304 208 282.5 208 256C208 229.5 229.5 208 256 208C282.5 208 304 229.5 304 256z", "M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 255.1C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.7 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.11 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 255.1 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6L495.9 166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"]],
    "ellipsis-vertical": [128, 512, ["ellipsis-v"], "f142", ["M64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200z", "M64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z"]],
    "house": [576, 512, [127968, 63498, 63500, "home", "home-alt", "home-lg-alt"], "f015", ["M288 74.52L512.1 270.6L512.5 471.9C512.6 494 494.7 512 472.5 512H392C369.9 512 352 494.1 352 472V383.7C352 366 337.7 351.7 320 351.7H256C238.3 351.7 224 366 224 383.7V472C224 494.1 206.1 512 184 512H104.1C81.1 512 64.09 494.1 64.08 472L64.02 270.5L288 74.52z", "M266.9 7.918C278.1-2.639 297-2.639 309.1 7.918L565.1 231.9C578.4 243.6 579.7 263.8 568.1 277.1C556.4 290.4 536.2 291.7 522.9 280.1L288 74.52L53.07 280.1C39.77 291.7 19.56 290.4 7.918 277.1C-3.72 263.8-2.372 243.6 10.93 231.9L266.9 7.918z"]],
    "sun": [512, 512, [9728], "f185", ["M509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z", "M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1z"]],
    "house-tree": [640, 512, [], "e1b3", ["M566.6 137.4C575.8 146.5 578.5 160.3 573.6 172.2C568.6 184.2 556.9 192 544 192H514.6L600.1 300C608.7 309.6 610.2 322.8 604.8 333.9C599.5 344.1 588.3 352 576 352H546.6L632.1 460C640.7 469.6 642.2 482.8 636.8 493.9C631.5 504.1 620.3 512 608 512H400C410 498.6 416 482 416 464V277.1C416 254.7 406.6 233.3 390.1 218.1L282.9 119.9L393.4 9.372C405.9-3.124 426.1-3.124 438.6 9.372L566.6 137.4z", "M.0003 464V277.1C.0003 263.7 5.647 250.8 15.57 241.7L159.6 109.7C177.9 92.91 206.1 92.91 224.4 109.7L368.4 241.7C378.4 250.8 384 263.7 384 277.1V464C384 490.5 362.5 512 336 512H48C21.49 512 0 490.5 0 464H.0003zM168 272C154.7 272 144 282.7 144 296V344C144 357.3 154.7 368 168 368H216C229.3 368 240 357.3 240 344V296C240 282.7 229.3 272 216 272H168z"]],
    "arrow-right-long": [512, 512, ["long-arrow-right"], "f178", ["M402.8 288H32C14.31 288 0 273.7 0 255.1S14.31 224 32 224h370.8l32 32L402.8 288z", "M320 384c0-8.188 3.125-16.38 9.375-22.62L434.8 256l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l128 128c12.5 12.5 12.5 32.75 0 45.25l-128 128c-12.5 12.5-32.75 12.5-45.25 0C323.1 400.4 320 392.2 320 384z"]],
    "ellipsis": [448, 512, ["ellipsis-h"], "f141", ["M280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256z", "M8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z"]],
    "location-dot": [384, 512, ["map-marker-alt"], "f3c5", ["M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 272C236.2 272 272 236.2 272 192C272 147.8 236.2 112 192 112C147.8 112 112 147.8 112 192C112 236.2 147.8 272 192 272z", "M240 192C240 218.5 218.5 240 192 240C165.5 240 144 218.5 144 192C144 165.5 165.5 144 192 144C218.5 144 240 165.5 240 192z"]],
    "magnifying-glass": [512, 512, [128269, "search"], "f002", ["M207.1 0C93.12 0-.0002 93.13-.0002 208S93.12 416 207.1 416s208-93.13 208-208S322.9 0 207.1 0zM207.1 336c-70.58 0-128-57.42-128-128c0-70.58 57.42-128 128-128s128 57.42 128 128C335.1 278.6 278.6 336 207.1 336z", "M500.3 443.7l-119.7-119.7c-15.03 22.3-34.26 41.54-56.57 56.57l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7z"]],
    "plus": [448, 512, [10133, 61543, "add"], "2b", ["M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z", ""]],
    "spinner": [512, 512, [], "f110", ["M437 142.9C418.3 161.6 387.9 161.6 369.1 142.9C350.4 124.1 350.4 93.73 369.1 74.98C387.9 56.24 418.3 56.24 437 74.98C455.8 93.73 455.8 124.1 437 142.9V142.9zM512 256C512 282.5 490.5 304 464 304C437.5 304 416 282.5 416 256C416 229.5 437.5 208 464 208C490.5 208 512 229.5 512 256zM304 464C304 490.5 282.5 512 256 512C229.5 512 208 490.5 208 464C208 437.5 229.5 416 256 416C282.5 416 304 437.5 304 464zM74.98 437C56.24 418.3 56.24 387.9 74.98 369.1C93.73 350.4 124.1 350.4 142.9 369.1C161.6 387.9 161.6 418.3 142.9 437C124.1 455.8 93.73 455.8 74.98 437V437zM437 437C418.3 455.8 387.9 455.8 369.1 437C350.4 418.3 350.4 387.9 369.1 369.1C387.9 350.4 418.3 350.4 437 369.1C455.8 387.9 455.8 418.3 437 437V437z", "M304 48C304 74.51 282.5 96 256 96C229.5 96 208 74.51 208 48C208 21.49 229.5 0 256 0C282.5 0 304 21.49 304 48zM96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256zM74.98 74.98C93.73 56.23 124.1 56.23 142.9 74.98C161.6 93.73 161.6 124.1 142.9 142.9C124.1 161.6 93.73 161.6 74.98 142.9C56.24 124.1 56.24 93.73 74.98 74.98V74.98z"]],
    "gears": [640, 512, ["cogs"], "f085", ["M529.7 506.7C520.1 510.4 511 507.5 504.7 500.5L484.9 478.3C478.1 479.4 471.1 480 464 480C456.9 480 449.9 479.4 443.1 478.3L423.3 500.5C416.1 507.5 407 510.4 398.3 506.7C393 504.4 387.8 501.9 382.8 499.1L377.4 496C372.4 492.1 367.6 489.7 362.9 486.2C355.3 480.5 352.8 470.5 355.8 461.5L365.1 433.2C356.2 422.5 349.1 410.3 344.1 397L315.1 390.1C305.8 389 298.4 381.8 297.2 372.4C296.4 365.7 296 358.9 296 352C296 345.1 296.4 338.3 297.2 331.6C298.4 322.2 305.8 314.1 315.1 313L344.1 306.1C349.1 293.7 356.2 281.5 365.1 270.8L355.8 242.5C352.8 233.5 355.3 223.5 362.9 217.8C367.6 214.3 372.5 210.1 377.5 207.9L382.8 204.9C387.8 202.1 392.1 199.6 398.3 197.3C407 193.6 416.1 196.5 423.3 203.5L443.1 225.7C449.9 224.6 456.9 224 464 224C471.1 224 478.1 224.6 484.9 225.7L504.7 203.5C511 196.5 520.1 193.6 529.7 197.3C535 199.6 540.2 202.1 545.2 204.9L550.5 207.9C555.5 210.1 560.4 214.3 565.1 217.8C572.7 223.5 575.2 233.5 572.2 242.5L562.9 270.8C571.8 281.5 578.9 293.7 583.9 306.1L612.9 313C622.2 314.1 629.6 322.2 630.8 331.6C631.6 338.3 632 345.1 632 352C632 358.9 631.6 365.7 630.8 372.4C629.6 381.8 622.2 389 612.9 390.1L583.9 397C578.9 410.3 571.8 422.5 562.9 433.2L572.2 461.5C575.2 470.5 572.7 480.5 565.1 486.2C560.4 489.7 555.6 492.1 550.6 496L545.2 499.1C540.2 501.9 534.1 504.4 529.7 506.7H529.7zM416 352C416 378.5 437.5 400 464 400C490.5 400 512 378.5 512 352C512 325.5 490.5 304 464 304C437.5 304 416 325.5 416 352z", "M314.7 110.3C318.4 119 315.5 128.1 308.5 135.3L286.3 155.1C287.4 161.9 288 168.9 288 175.1C288 183.1 287.4 190.1 286.3 196.9L308.5 216.7C315.5 223 318.4 232.1 314.7 241.7C312.4 246.1 309.9 252.2 307.1 257.2L304 262.6C300.1 267.6 297.7 272.4 294.2 277.1C288.5 284.7 278.5 287.2 269.5 284.2L241.2 274.9C230.5 283.8 218.3 290.9 205 295.9L198.1 324.9C197 334.2 189.8 341.6 180.4 342.8C173.7 343.6 166.9 344 160 344C153.1 344 146.3 343.6 139.6 342.8C130.2 341.6 122.1 334.2 121 324.9L114.1 295.9C101.7 290.9 89.5 283.8 78.75 274.9L50.53 284.2C41.54 287.2 31.52 284.7 25.82 277.1C22.28 272.4 18.98 267.5 15.94 262.5L12.92 257.2C10.13 252.2 7.592 247 5.324 241.7C1.62 232.1 4.458 223 11.52 216.7L33.7 196.9C32.58 190.1 31.1 183.1 31.1 175.1C31.1 168.9 32.58 161.9 33.7 155.1L11.52 135.3C4.458 128.1 1.62 119 5.324 110.3C7.592 104.1 10.13 99.79 12.91 94.76L15.95 89.51C18.98 84.46 22.28 79.58 25.82 74.89C31.52 67.34 41.54 64.83 50.53 67.79L78.75 77.09C89.5 68.25 101.7 61.13 114.1 56.15L121 27.08C122.1 17.8 130.2 10.37 139.6 9.231C146.3 8.418 153.1 8 160 8C166.9 8 173.7 8.418 180.4 9.23C189.8 10.37 197 17.8 198.1 27.08L205 56.15C218.3 61.13 230.5 68.25 241.2 77.09L269.5 67.79C278.5 64.83 288.5 67.34 294.2 74.89C297.7 79.56 300.1 84.42 304 89.44L307.1 94.83C309.9 99.84 312.4 105 314.7 110.3L314.7 110.3zM160 223.1C186.5 223.1 208 202.5 208 175.1C208 149.5 186.5 127.1 160 127.1C133.5 127.1 112 149.5 112 175.1C112 202.5 133.5 223.1 160 223.1z"]],
    "sun-bright": [512, 512, ["sun-alt"], "e28f", ["M108.9 74.97c-9.344-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l45.25 45.28c4.672 4.688 10.83 7.031 16.97 7.031S149.5 158.9 154.2 154.2c9.375-9.375 9.375-24.56 0-33.93L108.9 74.97zM256 0C242.8 0 232 10.75 232 24v64C232 101.3 242.8 112 256 112s24-10.75 24-24v-64C280 10.75 269.3 0 256 0zM112 256c0-13.25-10.75-24-24-24h-64C10.75 232 0 242.8 0 256s10.75 24 24 24h64C101.3 280 112 269.3 112 256zM374.8 161.2c6.141 0 12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.94s-24.59-9.375-33.94 0l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.93C362.5 158.9 368.7 161.2 374.8 161.2zM256 400c-13.25 0-24 10.75-24 24v64C232 501.3 242.8 512 256 512s24-10.75 24-24v-64C280 410.8 269.3 400 256 400zM120.2 357.8l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.94c4.688 4.688 10.83 7.031 16.97 7.031s12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.93S129.6 348.4 120.2 357.8zM488 232h-64c-13.25 0-24 10.75-24 24s10.75 24 24 24h64C501.3 280 512 269.3 512 256S501.3 232 488 232zM391.8 357.8c-9.344-9.375-24.56-9.372-33.94 .0031s-9.375 24.56 0 33.93l45.25 45.28c4.672 4.688 10.83 7.031 16.97 7.031s12.28-2.344 16.97-7.031c9.375-9.375 9.375-24.56 0-33.94L391.8 357.8z", "M256 144C194.1 144 144 194.1 144 256c0 61.86 50.14 112 112 112s112-50.14 112-112C368 194.1 317.9 144 256 144z"]],
    "dog": [576, 512, [128021], "f6d3", ["M416 255.1V256.1L303.8 191.1H304L309.6 158.5L421.6 222.5L416 255.1z", "M332.7 19.85C334.6 8.395 344.5 0 356.1 0C363.6 0 370.6 3.52 375.1 9.502L392 32H444.1C456.8 32 469.1 37.06 478.1 46.06L496 64H552C565.3 64 576 74.75 576 88V112C576 156.2 540.2 192 496 192H426.7L421.6 222.5L309.6 158.5L332.7 19.85zM448 64C439.2 64 432 71.16 432 80C432 88.84 439.2 96 448 96C456.8 96 464 88.84 464 80C464 71.16 456.8 64 448 64zM416 256.1V480C416 497.7 401.7 512 384 512H352C334.3 512 320 497.7 320 480V364.8C295.1 377.1 268.8 384 240 384C211.2 384 184 377.1 160 364.8V480C160 497.7 145.7 512 128 512H96C78.33 512 64 497.7 64 480V249.8C35.23 238.9 12.64 214.5 4.836 183.3L.9558 167.8C-3.331 150.6 7.094 133.2 24.24 128.1C41.38 124.7 58.76 135.1 63.05 152.2L66.93 167.8C70.49 182 83.29 191.1 97.97 191.1H303.8L416 256.1z"]],
    "grid-2": [448, 512, [], "e196", ["M448 184C448 206.1 430.1 224 408 224H296C273.9 224 256 206.1 256 184V72C256 49.91 273.9 32 296 32H408C430.1 32 448 49.91 448 72V184zM192 440C192 462.1 174.1 480 152 480H40C17.91 480 0 462.1 0 440V328C0 305.9 17.91 288 40 288H152C174.1 288 192 305.9 192 328V440z", "M192 176C192 202.5 170.5 224 144 224H48C21.49 224 0 202.5 0 176V80C0 53.49 21.49 32 48 32H144C170.5 32 192 53.49 192 80V176zM448 432C448 458.5 426.5 480 400 480H304C277.5 480 256 458.5 256 432V336C256 309.5 277.5 288 304 288H400C426.5 288 448 309.5 448 336V432z"]],
    "notdef": [384, 512, [], "e1fe", ["M64 390.3L153.5 256L64 121.7V64h38.46L192 198.3L281.5 64H320v57.69L230.5 256L320 390.3V448h-38.46L192 313.7L102.5 448H64V390.3z", "M336 0h-288C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48v-416C384 21.49 362.5 0 336 0zM320 448H64V64h256V448z"]]
  };

  bunker(function () {
    defineIcons('fad', icons);
    defineIcons('fa-duotone', icons);
  });

}());
(function () {
  'use strict';

  var _WINDOW = {};
  var _DOCUMENT = {};

  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
  } catch (e) {}

  var _ref = _WINDOW.navigator || {},
      _ref$userAgent = _ref.userAgent,
      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var _familyProxy, _familyProxy2, _familyProxy3, _familyProxy4, _familyProxy5;

  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();
  var FAMILY_CLASSIC = 'classic';
  var FAMILY_SHARP = 'sharp';
  var FAMILIES = [FAMILY_CLASSIC, FAMILY_SHARP];

  function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
      get: function get(target, prop) {
        return prop in target ? target[prop] : target[FAMILY_CLASSIC];
      }
    });
  }
  var PREFIX_TO_STYLE = familyProxy((_familyProxy = {}, _defineProperty(_familyProxy, FAMILY_CLASSIC, {
    'fa': 'solid',
    'fas': 'solid',
    'fa-solid': 'solid',
    'far': 'regular',
    'fa-regular': 'regular',
    'fal': 'light',
    'fa-light': 'light',
    'fat': 'thin',
    'fa-thin': 'thin',
    'fad': 'duotone',
    'fa-duotone': 'duotone',
    'fab': 'brands',
    'fa-brands': 'brands',
    'fak': 'kit',
    'fa-kit': 'kit'
  }), _defineProperty(_familyProxy, FAMILY_SHARP, {
    'fa': 'solid',
    'fass': 'solid',
    'fa-solid': 'solid'
  }), _familyProxy));
  var STYLE_TO_PREFIX = familyProxy((_familyProxy2 = {}, _defineProperty(_familyProxy2, FAMILY_CLASSIC, {
    'solid': 'fas',
    'regular': 'far',
    'light': 'fal',
    'thin': 'fat',
    'duotone': 'fad',
    'brands': 'fab',
    'kit': 'fak'
  }), _defineProperty(_familyProxy2, FAMILY_SHARP, {
    'solid': 'fass'
  }), _familyProxy2));
  var PREFIX_TO_LONG_STYLE = familyProxy((_familyProxy3 = {}, _defineProperty(_familyProxy3, FAMILY_CLASSIC, {
    'fab': 'fa-brands',
    'fad': 'fa-duotone',
    'fak': 'fa-kit',
    'fal': 'fa-light',
    'far': 'fa-regular',
    'fas': 'fa-solid',
    'fat': 'fa-thin'
  }), _defineProperty(_familyProxy3, FAMILY_SHARP, {
    'fass': 'fa-solid'
  }), _familyProxy3));
  var LONG_STYLE_TO_PREFIX = familyProxy((_familyProxy4 = {}, _defineProperty(_familyProxy4, FAMILY_CLASSIC, {
    'fa-brands': 'fab',
    'fa-duotone': 'fad',
    'fa-kit': 'fak',
    'fa-light': 'fal',
    'fa-regular': 'far',
    'fa-solid': 'fas',
    'fa-thin': 'fat'
  }), _defineProperty(_familyProxy4, FAMILY_SHARP, {
    'fa-solid': 'fass'
  }), _familyProxy4));
  // TODO: do we need to handle font-weight for kit SVG pseudo-elements?

  var FONT_WEIGHT_TO_PREFIX = familyProxy((_familyProxy5 = {}, _defineProperty(_familyProxy5, FAMILY_CLASSIC, {
    '900': 'fas',
    '400': 'far',
    'normal': 'far',
    '300': 'fal',
    '100': 'fat'
  }), _defineProperty(_familyProxy5, FAMILY_SHARP, {
    '900': 'fass'
  }), _familyProxy5));
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var DUOTONE_CLASSES = {
    GROUP: 'duotone-group',
    SWAP_OPACITY: 'swap-opacity',
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
  };
  var prefixes = new Set();
  Object.keys(STYLE_TO_PREFIX[FAMILY_CLASSIC]).map(prefixes.add.bind(prefixes));
  Object.keys(STYLE_TO_PREFIX[FAMILY_SHARP]).map(prefixes.add.bind(prefixes));
  var RESERVED_CLASSES = [].concat(FAMILIES, _toConsumableArray(prefixes), ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', 'beat', 'border', 'fade', 'beat-fade', 'bounce', 'flip-both', 'flip-horizontal', 'flip-vertical', 'flip', 'fw', 'inverse', 'layers-counter', 'layers-text', 'layers', 'li', 'pull-left', 'pull-right', 'pulse', 'rotate-180', 'rotate-270', 'rotate-90', 'rotate-by', 'shake', 'spin-pulse', 'spin-reverse', 'spin', 'stack-1x', 'stack-2x', 'stack', 'ul', DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function (n) {
    return "".concat(n, "x");
  })).concat(oneToTwenty.map(function (n) {
    return "w-".concat(n);
  }));

  function bunker(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn.apply(void 0, args);
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }

  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});
  }

  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = normalizeIcons(icons);

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll ease the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var icons = {
    "trees": [640, 512, [], "f724", "M626.6 357.9l-35.73-41.22c6.686-4.938 12.17-11.53 15.84-19.47c8.295-17.88 5.514-38.34-7.295-53.53l-31.02-36.44c4.578-4.156 8.295-9.25 10.84-15.03c6.92-15.75 3.873-33.53-7.936-46.38l-120.4-130.8C442.1 5.469 429.4 0 416 0s-26.13 5.5-34.88 15.03l-39.35 42.78l32.34 35.14l41.48-45.42l114 123.9h-54.71l85.54 107.2h-66.11l95.99 110.8c2.422 2.781 1.625 5.75 .9375 7.25C590.2 398.8 588.6 400 586.3 400h-138.9c1.816-15.02-2.506-30.18-12.83-42.09l-35.73-41.22c6.686-4.938 12.17-11.53 15.84-19.47c8.295-17.88 5.514-38.34-7.295-53.53l-31.02-36.44c4.578-4.156 8.295-9.25 10.84-15.03c6.92-15.75 3.873-33.53-7.936-46.38L258.9 15.03C250.1 5.469 237.4 0 224 0S197.9 5.5 189.1 15.03L68.81 145.8C57.01 158.7 53.98 176.5 60.9 192.2C63.43 198 67.13 203.1 71.7 207.2L40.55 243.8C27.8 258.9 25.04 279.4 33.33 297.2c3.688 7.938 9.154 14.56 15.82 19.47l-35.69 41.22c-14.21 16.38-17.43 38.84-8.404 58.63C13.91 435.9 32.52 448 53.62 448h146.6l.0391 40.03C200.3 501.3 211.1 512 224.3 512c0 0-.0156 0 0 0c13.25 0 23.99-10.78 23.98-24.03L248.3 448h144l.0059 40.03C392.3 501.3 403.1 512 416.3 512c0 0-.0156 0 0 0c13.25 0 23.99-10.78 23.98-24.03L440.3 448h146.1c21.1 0 39.72-12.06 48.58-31.47C643.1 396.7 640.8 374.3 626.6 357.9zM248.2 400l-.0215-22.25l40.77-40.78c9.373-9.375 9.373-24.56 0-33.94c-9.371-9.375-24.55-9.375-33.93 0L248.1 309.9L247.1 183.1C247.1 170.7 237.2 160 223.1 160c0 0 .0156 0 0 0C210.7 160 199.1 170.8 200 184l.0449 46.08L192.1 223c-9.373-9.375-24.56-9.375-33.93 0s-9.373 24.56 0 33.94l41.07 41.08L200.1 400H53.62c-2.234 0-3.875-1.125-4.906-3.375c-.6855-1.5-1.467-4.438 1-7.281l95.99-110.8H79.58l85.63-107.2H110.5L223.6 47.53l114 123.9H282.9l85.54 107.2H302.3l95.99 110.8c2.422 2.781 1.625 5.75 .9375 7.25C398.2 398.8 396.6 400 394.3 400H248.2z"],
    "bars": [448, 512, ["navicon"], "f0c9", "M0 88C0 74.75 10.75 64 24 64H424C437.3 64 448 74.75 448 88C448 101.3 437.3 112 424 112H24C10.75 112 0 101.3 0 88zM0 248C0 234.7 10.75 224 24 224H424C437.3 224 448 234.7 448 248C448 261.3 437.3 272 424 272H24C10.75 272 0 261.3 0 248zM424 432H24C10.75 432 0 421.3 0 408C0 394.7 10.75 384 24 384H424C437.3 384 448 394.7 448 408C448 421.3 437.3 432 424 432z"],
    "list": [512, 512, ["list-squares"], "f03a", "M88 48C101.3 48 112 58.75 112 72V120C112 133.3 101.3 144 88 144H40C26.75 144 16 133.3 16 120V72C16 58.75 26.75 48 40 48H88zM488 72C501.3 72 512 82.75 512 96C512 109.3 501.3 120 488 120H184C170.7 120 160 109.3 160 96C160 82.75 170.7 72 184 72H488zM488 232C501.3 232 512 242.7 512 256C512 269.3 501.3 280 488 280H184C170.7 280 160 269.3 160 256C160 242.7 170.7 232 184 232H488zM488 392C501.3 392 512 402.7 512 416C512 429.3 501.3 440 488 440H184C170.7 440 160 429.3 160 416C160 402.7 170.7 392 184 392H488zM16 232C16 218.7 26.75 208 40 208H88C101.3 208 112 218.7 112 232V280C112 293.3 101.3 304 88 304H40C26.75 304 16 293.3 16 280V232zM88 368C101.3 368 112 378.7 112 392V440C112 453.3 101.3 464 88 464H40C26.75 464 16 453.3 16 440V392C16 378.7 26.75 368 40 368H88z"],
    "campground": [576, 512, [9978], "f6bb", "M375.4 5.587C385.6 14.09 386.9 29.22 378.4 39.39L319.3 110.1L554.1 392.1C563.4 402.1 568 414.8 568 427.1V456C568 486.9 542.9 512 512 512H64C33.07 512 8 486.9 8 456V427.1C8 414.8 12.61 402.1 21.04 392.1L256.7 110.1L197.6 39.39C189.1 29.22 190.4 14.09 200.6 5.587C210.8-2.914 225.9-1.562 234.4 8.608L288 72.71L341.6 8.608C350.1-1.562 365.2-2.914 375.4 5.587V5.587zM56 427.1V456C56 460.4 59.58 464 64 464H126L269.1 281.2C273.6 275.4 280.6 272 288 272C295.4 272 302.4 275.4 306.9 281.2L449.1 464H512C516.4 464 520 460.4 520 456V427.1C520 426.1 519.3 424.3 518.1 422.8L288 147.5L57.86 422.8C56.66 424.3 56 426.1 56 427.1V427.1zM186.1 464H389L288 334.9L186.1 464z"],
    "tree": [448, 512, [127794], "f1bb", "M434.7 357.9l-35.73-41.22c6.688-4.938 12.17-11.53 15.84-19.47c8.297-17.88 5.516-38.34-7.297-53.53l-31.03-36.44c4.578-4.156 8.297-9.25 10.84-15.03c6.922-15.75 3.875-33.53-7.938-46.38l-120.4-130.8C250.1 5.469 237.4 0 224 0S197.9 5.5 189.1 15.03L68.77 145.8C56.97 158.7 53.94 176.5 60.86 192.2C63.39 198 67.09 203.1 71.66 207.2L40.5 243.8C27.75 258.9 24.98 279.4 33.28 297.2C36.97 305.2 42.44 311.8 49.11 316.7l-35.7 41.22c-14.22 16.38-17.44 38.84-8.406 58.63C13.86 435.9 32.47 448 53.58 448h146.7l.0391 40.03C200.3 501.3 210.9 512 224.1 512c0 0-.0156 0 0 0c13.25 0 24.2-10.78 24.18-24.03L248.3 448h146.1c21.11 0 39.73-12.06 48.59-31.47C452 396.7 448.8 374.3 434.7 357.9zM399.3 396.6C398.3 398.8 396.6 400 394.4 400h-146.2l-.0215-22.25l40.78-40.78c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0l-6.908 6.908L248 183.1c-.0156-13.25-10.75-23.97-24-23.97c0 0 .0156 0 0 0c-13.25 0-24.01 10.79-23.1 24.04l.0449 46.08L192.1 223c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L200.1 298L200.2 400H53.58c-2.234 0-3.875-1.125-4.906-3.375c-.6875-1.5-1.469-4.438 1-7.281l96.02-110.8H79.55l85.66-107.2H110.4L223.6 47.53l114 123.9h-54.72l85.56 107.2h-66.13l96.02 110.8C400.8 392.1 400 395.1 399.3 396.6z"],
    "users": [640, 512, [], "f0c0", "M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM319.9 160c30.85 0 55.96 25.12 55.96 56S350.7 272 319.9 272S263.9 246.9 263.9 216S289 160 319.9 160zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM178.1 464c10.47-36.76 47.36-64 91.14-64H369.9c43.77 0 80.66 27.24 91.14 64H178.1zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160z"],
    "angle-right": [256, 512, [8250], "f105", "M89.45 87.5l143.1 152c4.375 4.625 6.562 10.56 6.562 16.5c0 5.937-2.188 11.87-6.562 16.5l-143.1 152C80.33 434.1 65.14 434.5 55.52 425.4c-9.688-9.125-10.03-24.38-.9375-33.94l128.4-135.5l-128.4-135.5C45.49 110.9 45.83 95.75 55.52 86.56C65.14 77.47 80.33 77.87 89.45 87.5z"],
    "user": [448, 512, [128100, 62144], "f007", "M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z"],
    "star": [576, 512, [11088, 61446], "f005", "M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"],
    "wifi": [640, 512, ["wifi-3", "wifi-strong"], "f1eb", "M319.1 367.1C289.1 367.1 264 393.1 264 424s25.07 56 55.1 56S376 454.9 376 424S350.9 367.1 319.1 367.1zM632.5 150.6C553.3 75.22 439.4 32 320 32S86.72 75.22 7.473 150.6c-9.625 9.125-10 24.31-.8438 33.91c9.062 9.594 24.31 10 33.91 .8438C110.1 118.4 212.8 80 320 80s209 38.41 279.5 105.4C604.1 189.8 610.1 192 615.1 192c6.344 0 12.69-2.5 17.38-7.469C642.5 174.9 642.2 159.8 632.5 150.6zM320 207.9c-76.63 0-147.9 28-200.6 78.75C109.8 295.9 109.5 311.1 118.7 320.6c9.219 9.625 24.41 9.844 33.94 .6875C196.4 279.2 255.8 256 320 256s123.6 23.19 167.4 65.31C492 325.8 497.1 328 503.1 328c6.281 0 12.59-2.469 17.31-7.375c9.188-9.531 8.875-24.72-.6875-33.94C467.9 235.9 396.6 207.9 320 207.9z"],
    "map-location-dot": [576, 512, ["map-marked-alt"], "f5a0", "M408 119.1C408 128.6 406.2 138.3 402.1 148.6C397.3 166.1 387.4 187.5 375.6 207.8L375.5 207.1C372.4 213.3 369.2 218.7 365.9 224C361.5 231 356.9 237.1 352.4 244.8L352 245.4C333.9 272.3 315.3 296.4 302.8 311.1C295.1 321.6 280.9 321.6 273.2 311.1C260.7 296.4 242.1 272.3 224 245.4C205.6 218.1 187.7 187.9 177.3 160.9C176.5 158.8 175.7 156.7 174.1 154.6C170.6 142 168 130.3 168 120C168 115.3 168.3 110.7 168.8 106.2C175.6 46.44 226.4 0 288 0C354.3 0 408 53.73 408 120V119.1zM288 151.1C310.1 151.1 328 134.1 328 111.1C328 89.91 310.1 71.1 288 71.1C265.9 71.1 248 89.91 248 111.1C248 134.1 265.9 151.1 288 151.1zM352 300.6C365.5 282.4 380.8 260.7 394.7 238.2C396.5 235.3 398.2 232.4 400 229.5V453.7L528 407.2V154.3L419.3 193.8C421.5 189.1 423.6 184.5 425.6 179.8C431.5 165.8 436.6 150.7 438.8 135.6L543.8 97.44C551.2 94.77 559.4 95.85 565.8 100.3C572.2 104.8 576 112.2 576 119.1V424C576 434.1 569.7 443.1 560.2 446.6L384.2 510.6C378.9 512.5 373.1 512.5 367.8 510.6L200 449.5L32.2 510.6C24.84 513.2 16.64 512.2 10.23 507.7C3.819 503.2 0 495.8 0 488V183.1C0 173.9 6.314 164.9 15.8 161.4L136 117.7C136 118.5 136 119.2 136 119.1C136 135.1 139.7 150.7 144.9 165.6L48 200.8V453.7L176 407.2V229.5C177.8 232.4 179.5 235.3 181.3 238.2C195.2 260.7 210.5 282.4 224 300.6V407.2L352 453.7V300.6z"],
    "arrow-right": [448, 512, [8594], "f061", "M264.6 70.63l176 168c4.75 4.531 7.438 10.81 7.438 17.38s-2.688 12.84-7.438 17.38l-176 168c-9.594 9.125-24.78 8.781-33.94-.8125c-9.156-9.5-8.812-24.75 .8125-33.94l132.7-126.6H24.01c-13.25 0-24.01-10.76-24.01-24.01s10.76-23.99 24.01-23.99h340.1l-132.7-126.6C221.8 96.23 221.5 80.98 230.6 71.45C239.8 61.85 254.1 61.51 264.6 70.63z"],
    "house-water": [576, 512, ["house-flood"], "f74f", "M24.02 271.1c5.492 0 11.01-1.871 15.52-5.684L64 245.5v106.5c0 13.25 10.75 24 24 24s24-10.75 24-24V207.1c0-.9629-.4375-1.783-.5488-2.717L288 55.46l175.1 149.4v147.2c0 13.25 10.75 24 24 24s24-10.75 24-24V245.5l24.47 20.77c4.531 3.812 10.03 5.688 15.53 5.688c10.13 0 23.1-7.988 23.1-23.98c0-6.809-2.877-13.57-8.467-18.33l-263.1-224c-4.469-3.781-9.999-5.67-15.53-5.67c-5.531 0-11.07 1.889-15.53 5.67L8.473 229.7c-5.592 4.76-8.469 11.52-8.469 18.33C.0039 264.1 13.87 271.1 24.02 271.1zM556.2 464.2c-47.49-8.484-53.88-40.21-76.2-40.21c-22.92 0-33.77 39.83-95.1 39.83c-62.23 0-73.08-39.83-96-39.83c-22.92 0-33.77 39.83-95.1 39.83c-69.59 0-81.1-39.83-103.1-39.83c-21.95 0-30.18 33.43-68.2 40.21c-11.62 2.066-19.8 12.22-19.8 23.67c0 12.26 9.656 24.12 23.94 24.12c7.637 0 35.43-4.889 65.27-31.81c28 19.74 66.33 31.69 103.1 31.69c34.89 0 68.48-11.41 95.67-32.06c27.19 20.65 61.6 30.98 96.01 30.98c34.32 0 68.63-10.27 95.78-30.82c30.6 24.3 63.21 32.03 72.23 32.03c11.94 0 23.97-9.596 23.97-24.12C575.1 476.4 567.8 466.3 556.2 464.2zM248 175.1c-22.06 0-39.1 17.94-39.1 40v80c0 22.06 17.94 40 39.1 40h80c22.06 0 40-17.94 40-40v-80c0-22.06-17.94-40-40-40H248zM320 287.1H256v-64h64V287.1z"],
    "arrow-left": [448, 512, [8592], "f060", "M447.1 256c0 13.25-10.76 24.01-24.01 24.01H83.9l132.7 126.6c9.625 9.156 9.969 24.41 .8125 33.94c-9.156 9.594-24.34 9.938-33.94 .8125l-176-168C2.695 268.9 .0078 262.6 .0078 256S2.695 243.2 7.445 238.6l176-168C193 61.51 208.2 61.85 217.4 71.45c9.156 9.5 8.812 24.75-.8125 33.94l-132.7 126.6h340.1C437.2 232 447.1 242.8 447.1 256z"],
    "arrow-left-long": [512, 512, ["long-arrow-left"], "f177", "M176.1 103C181.7 107.7 184 113.8 184 120S181.7 132.3 176.1 136.1L81.94 232H488C501.3 232 512 242.8 512 256s-10.75 24-24 24H81.94l95.03 95.03c9.375 9.375 9.375 24.56 0 33.94s-24.56 9.375-33.94 0l-136-136c-9.375-9.375-9.375-24.56 0-33.94l136-136C152.4 93.66 167.6 93.66 176.1 103z"],
    "gear": [512, 512, [9881, "cog"], "f013", "M160 256C160 202.1 202.1 160 256 160C309 160 352 202.1 352 256C352 309 309 352 256 352C202.1 352 160 309 160 256zM256 208C229.5 208 208 229.5 208 256C208 282.5 229.5 304 256 304C282.5 304 304 282.5 304 256C304 229.5 282.5 208 256 208zM293.1 .0003C315.3 .0003 334.6 15.19 339.8 36.74L347.6 69.21C356.1 73.36 364.2 78.07 371.9 83.28L404 73.83C425.3 67.56 448.1 76.67 459.2 95.87L496.3 160.1C507.3 179.3 503.8 203.6 487.8 218.9L463.5 241.1C463.8 246.6 464 251.3 464 256C464 260.7 463.8 265.4 463.5 270L487.8 293.1C503.8 308.4 507.3 332.7 496.3 351.9L459.2 416.1C448.1 435.3 425.3 444.4 404 438.2L371.9 428.7C364.2 433.9 356.1 438.6 347.6 442.8L339.8 475.3C334.6 496.8 315.3 512 293.1 512H218.9C196.7 512 177.4 496.8 172.2 475.3L164.4 442.8C155.9 438.6 147.8 433.9 140.1 428.7L107.1 438.2C86.73 444.4 63.94 435.3 52.85 416.1L15.75 351.9C4.66 332.7 8.168 308.4 24.23 293.1L48.47 270C48.16 265.4 48 260.7 48 255.1C48 251.3 48.16 246.6 48.47 241.1L24.23 218.9C8.167 203.6 4.66 179.3 15.75 160.1L52.85 95.87C63.94 76.67 86.73 67.56 107.1 73.83L140.1 83.28C147.8 78.07 155.9 73.36 164.4 69.21L172.2 36.74C177.4 15.18 196.7 0 218.9 0L293.1 .0003zM205.5 103.6L194.3 108.3C181.6 113.6 169.8 120.5 159.1 128.7L149.4 136.1L94.42 119.9L57.31 184.1L98.81 223.6L97.28 235.6C96.44 242.3 96 249.1 96 256C96 262.9 96.44 269.7 97.28 276.4L98.81 288.4L57.32 327.9L94.42 392.1L149.4 375.9L159.1 383.3C169.8 391.5 181.6 398.4 194.3 403.7L205.5 408.4L218.9 464H293.1L306.5 408.4L317.7 403.7C330.4 398.4 342.2 391.5 352.9 383.3L362.6 375.9L417.6 392.1L454.7 327.9L413.2 288.4L414.7 276.4C415.6 269.7 416 262.9 416 256C416 249.1 415.6 242.3 414.7 235.6L413.2 223.6L454.7 184.1L417.6 119.9L362.6 136.1L352.9 128.7C342.2 120.5 330.4 113.6 317.7 108.3L306.5 103.6L293.1 48H218.9L205.5 103.6z"],
    "ellipsis-vertical": [128, 512, ["ellipsis-v"], "f142", "M64 368C90.51 368 112 389.5 112 416C112 442.5 90.51 464 64 464C37.49 464 16 442.5 16 416C16 389.5 37.49 368 64 368zM64 208C90.51 208 112 229.5 112 256C112 282.5 90.51 304 64 304C37.49 304 16 282.5 16 256C16 229.5 37.49 208 64 208zM64 144C37.49 144 16 122.5 16 96C16 69.49 37.49 48 64 48C90.51 48 112 69.49 112 96C112 122.5 90.51 144 64 144z"],
    "house": [576, 512, [127968, 63498, 63500, "home", "home-alt", "home-lg-alt"], "f015", "M567.5 229.7C577.6 238.3 578.9 253.4 570.3 263.5C561.7 273.6 546.6 274.9 536.5 266.3L512 245.5V432C512 476.2 476.2 512 432 512H144C99.82 512 64 476.2 64 432V245.5L39.53 266.3C29.42 274.9 14.28 273.6 5.7 263.5C-2.875 253.4-1.634 238.3 8.473 229.7L272.5 5.7C281.4-1.9 294.6-1.9 303.5 5.7L567.5 229.7zM144 464H192V312C192 289.9 209.9 272 232 272H344C366.1 272 384 289.9 384 312V464H432C449.7 464 464 449.7 464 432V204.8L288 55.47L112 204.8V432C112 449.7 126.3 464 144 464V464zM240 464H336V320H240V464z"],
    "sun": [512, 512, [9728], "f185", "M505.2 324.8l-47.73-68.78l47.75-68.81c7.359-10.62 8.797-24.12 3.844-36.06c-4.969-11.94-15.52-20.44-28.22-22.72l-82.39-14.88l-14.89-82.41c-2.281-12.72-10.76-23.25-22.69-28.22c-11.97-4.936-25.42-3.498-36.12 3.844L256 54.49L187.2 6.709C176.5-.6016 163.1-2.039 151.1 2.896c-11.92 4.971-20.4 15.5-22.7 28.19l-14.89 82.44L31.15 128.4C18.42 130.7 7.854 139.2 2.9 151.2C-2.051 163.1-.5996 176.6 6.775 187.2l47.73 68.78l-47.75 68.81c-7.359 10.62-8.795 24.12-3.844 36.06c4.969 11.94 15.52 20.44 28.22 22.72l82.39 14.88l14.89 82.41c2.297 12.72 10.78 23.25 22.7 28.22c11.95 4.906 25.44 3.531 36.09-3.844L256 457.5l68.83 47.78C331.3 509.7 338.8 512 346.3 512c4.906 0 9.859-.9687 14.56-2.906c11.92-4.969 20.4-15.5 22.7-28.19l14.89-82.44l82.37-14.88c12.73-2.281 23.3-10.78 28.25-22.75C514.1 348.9 512.6 335.4 505.2 324.8zM456.8 339.2l-99.61 18l-18 99.63L256 399.1L172.8 456.8l-18-99.63l-99.61-18L112.9 255.1L55.23 172.8l99.61-18l18-99.63L256 112.9l83.15-57.75l18.02 99.66l99.61 18L399.1 255.1L456.8 339.2zM256 143.1c-61.85 0-111.1 50.14-111.1 111.1c0 61.85 50.15 111.1 111.1 111.1s111.1-50.14 111.1-111.1C367.1 194.1 317.8 143.1 256 143.1zM256 319.1c-35.28 0-63.99-28.71-63.99-63.99S220.7 192 256 192s63.99 28.71 63.99 63.1S291.3 319.1 256 319.1z"],
    "house-tree": [640, 512, [], "e1b3", "M569.4 167.5C576 174.4 577.8 184.7 574.1 193.5C570.3 202.3 561.6 208 552 208H503.7L601.4 311.5C608 318.5 609.8 328.7 606 337.5C602.2 346.3 593.6 352 584 352H531.9L634.3 472.5C640.3 479.6 641.7 489.6 637.8 498.1C633.9 506.6 625.4 512 616 512H400C410 498.6 416 482 416 464H564.1L461.7 343.5C455.7 336.4 454.3 326.4 458.2 317.9C462.1 309.4 470.6 304 480 304H528.3L430.6 200.5C423.1 193.5 422.2 183.3 425.1 174.5C429.8 165.7 438.4 160 448 160H496.1L400 58.85L314.5 148.9L279.1 116.4L382.6 7.47C387.1 2.7 393.4 0 400 0C406.6 0 412.9 2.7 417.4 7.47L569.4 167.5zM144 295.1C144 282.7 154.7 271.1 168 271.1H216C229.3 271.1 240 282.7 240 295.1V344C240 357.3 229.3 368 216 368H168C154.7 368 144 357.3 144 344V295.1zM148.8 119.6C173.2 97.21 210.8 97.21 235.2 119.6L363.2 236.1C376.5 249.1 384 266.2 384 284.2V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V284.2C0 266.2 7.529 249.1 20.75 236.1L148.8 119.6zM48 284.2V448C48 456.8 55.16 464 64 464H320C328.8 464 336 456.8 336 448V284.2C336 279.7 334.1 275.4 330.8 272.4L202.8 155C196.7 149.4 187.3 149.4 181.2 155L53.19 272.4C49.88 275.4 48 279.7 48 284.2V284.2z"],
    "arrow-right-long": [512, 512, ["long-arrow-right"], "f178", "M335 408.1C330.3 404.3 328 398.2 328 392s2.344-12.28 7.031-16.97L430.1 280H24C10.75 280 0 269.2 0 255.1C0 242.7 10.75 232 24 232h406.1l-95.03-95.03c-9.375-9.375-9.375-24.56 0-33.94s24.56-9.375 33.94 0l136 136c9.375 9.375 9.375 24.56 0 33.94l-136 136C359.6 418.3 344.4 418.3 335 408.1z"],
    "ellipsis": [448, 512, ["ellipsis-h"], "f141", "M336 256C336 229.5 357.5 208 384 208C410.5 208 432 229.5 432 256C432 282.5 410.5 304 384 304C357.5 304 336 282.5 336 256zM176 256C176 229.5 197.5 208 224 208C250.5 208 272 229.5 272 256C272 282.5 250.5 304 224 304C197.5 304 176 282.5 176 256zM112 256C112 282.5 90.51 304 64 304C37.49 304 16 282.5 16 256C16 229.5 37.49 208 64 208C90.51 208 112 229.5 112 256z"],
    "location-dot": [384, 512, ["map-marker-alt"], "f3c5", "M272 192C272 236.2 236.2 272 192 272C147.8 272 112 236.2 112 192C112 147.8 147.8 112 192 112C236.2 112 272 147.8 272 192zM192 160C174.3 160 160 174.3 160 192C160 209.7 174.3 224 192 224C209.7 224 224 209.7 224 192C224 174.3 209.7 160 192 160zM384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192H384zM192 48C112.5 48 48 112.5 48 192C48 204.4 52.49 223.6 63.3 249.2C73.78 274 88.66 301.4 105.8 329.1C134.2 375.3 167.2 419.1 192 451.7C216.8 419.1 249.8 375.3 278.2 329.1C295.3 301.4 310.2 274 320.7 249.2C331.5 223.6 336 204.4 336 192C336 112.5 271.5 48 192 48V48z"],
    "magnifying-glass": [512, 512, [128269, "search"], "f002", "M504.1 471l-134-134C399.1 301.5 415.1 256.8 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c48.79 0 93.55-16.91 129-45.04l134 134C475.7 509.7 481.9 512 488 512s12.28-2.344 16.97-7.031C514.3 495.6 514.3 480.4 504.1 471zM48 208c0-88.22 71.78-160 160-160s160 71.78 160 160s-71.78 160-160 160S48 296.2 48 208z"],
    "plus": [448, 512, [10133, 61543, "add"], "2b", "M432 256C432 269.3 421.3 280 408 280h-160v160c0 13.25-10.75 24.01-24 24.01S200 453.3 200 440v-160h-160c-13.25 0-24-10.74-24-23.99C16 242.8 26.75 232 40 232h160v-160c0-13.25 10.75-23.99 24-23.99S248 58.75 248 72v160h160C421.3 232 432 242.8 432 256z"],
    "spinner": [512, 512, [], "f110", "M288 32C288 49.67 273.7 64 256 64C238.3 64 224 49.67 224 32C224 14.33 238.3 0 256 0C273.7 0 288 14.33 288 32zM288 480C288 497.7 273.7 512 256 512C238.3 512 224 497.7 224 480C224 462.3 238.3 448 256 448C273.7 448 288 462.3 288 480zM480 224C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288C462.3 288 448 273.7 448 256C448 238.3 462.3 224 480 224zM32 288C14.33 288 0 273.7 0 256C0 238.3 14.33 224 32 224C49.67 224 64 238.3 64 256C64 273.7 49.67 288 32 288zM74.98 391.8C87.48 379.3 107.7 379.3 120.2 391.8C132.7 404.3 132.7 424.5 120.2 437C107.7 449.5 87.48 449.5 74.98 437C62.48 424.5 62.48 404.3 74.98 391.8zM391.8 437C379.3 424.5 379.3 404.3 391.8 391.8C404.3 379.3 424.5 379.3 437 391.8C449.5 404.3 449.5 424.5 437 437C424.5 449.5 404.3 449.5 391.8 437zM120.2 74.98C132.7 87.48 132.7 107.7 120.2 120.2C107.7 132.7 87.48 132.7 74.98 120.2C62.48 107.7 62.48 87.48 74.98 74.98C87.48 62.49 107.7 62.49 120.2 74.98z"],
    "gears": [640, 512, ["cogs"], "f085", "M119.1 176C119.1 153.9 137.9 136 159.1 136C182.1 136 199.1 153.9 199.1 176C199.1 198.1 182.1 216 159.1 216C137.9 216 119.1 198.1 119.1 176zM207.3 23.36L213.9 51.16C223.4 55.3 232.4 60.5 240.6 66.61L267.7 58.52C273.2 56.85 279.3 58.3 283.3 62.62C299.5 80.44 311.9 101.8 319.3 125.4C321.1 130.9 319.3 136.9 315.1 140.9L294.1 160C295.7 165.5 295.1 171.1 295.1 176.8C295.1 181.1 295.7 187.1 295.2 192.1L315.1 211.1C319.3 215.1 321.1 221.1 319.3 226.6C311.9 250.2 299.5 271.6 283.3 289.4C279.3 293.7 273.2 295.2 267.7 293.5L242.1 285.8C233.3 292.5 223.7 298.1 213.5 302.6L207.3 328.6C205.1 334.3 201.7 338.8 196 340.1C184.4 342.6 172.4 344 159.1 344C147.6 344 135.6 342.6 123.1 340.1C118.3 338.8 114 334.3 112.7 328.6L106.5 302.6C96.26 298.1 86.67 292.5 77.91 285.8L52.34 293.5C46.75 295.2 40.65 293.7 36.73 289.4C20.5 271.6 8.055 250.2 .6513 226.6C-1.078 221.1 .6929 215.1 4.879 211.1L24.85 192.1C24.29 187.1 24 181.1 24 176.8C24 171.1 24.34 165.5 25.01 160L4.879 140.9C.6936 136.9-1.077 130.9 .652 125.4C8.056 101.8 20.51 80.44 36.73 62.62C40.65 58.3 46.75 56.85 52.34 58.52L79.38 66.61C87.62 60.5 96.57 55.3 106.1 51.17L112.7 23.36C114 17.71 118.3 13.17 123.1 11.91C135.6 9.35 147.6 8 159.1 8C172.4 8 184.4 9.35 196 11.91C201.7 13.16 205.1 17.71 207.3 23.36L207.3 23.36zM63.1 176.8C63.1 180.5 64.21 184.1 64.6 187.7L66.79 207.4L44.25 228.9C47.68 236.5 51.84 243.7 56.63 250.4L85.96 241.7L102.2 254C108.4 258.7 115.1 262.7 122.3 265.8L140.8 273.8L147.8 303.4C151.8 303.8 155.9 304 159.1 304C164.1 304 168.2 303.8 172.2 303.4L179.2 273.8L197.7 265.8C204.9 262.7 211.6 258.7 217.8 254L234 241.7L263.4 250.4C268.2 243.7 272.3 236.5 275.7 228.9L253.2 207.4L255.4 187.7C255.8 184.1 255.1 180.5 255.1 176.8C255.1 172.7 255.8 168.7 255.3 164.8L252.9 144.9L275.7 123.1C272.3 115.5 268.2 108.3 263.4 101.6L232.9 110.7L216.8 98.74C210.1 94.42 204.7 90.76 197.1 87.85L179.6 79.87L172.2 48.58C168.2 48.2 164.1 48 159.1 48C155.9 48 151.8 48.2 147.8 48.58L140.4 79.87L122 87.85C115.3 90.76 109 94.42 103.2 98.74L87.1 110.7L56.63 101.6C51.84 108.3 47.68 115.5 44.25 123.1L67.14 144.9L64.72 164.8C64.25 168.7 63.1 172.7 63.1 176.8L63.1 176.8zM464 312C486.1 312 504 329.9 504 352C504 374.1 486.1 392 464 392C441.9 392 424 374.1 424 352C424 329.9 441.9 312 464 312zM581.5 244.3L573.4 271.4C579.5 279.6 584.7 288.6 588.8 298.1L616.6 304.7C622.3 306 626.8 310.3 628.1 315.1C630.6 327.6 632 339.6 632 352C632 364.4 630.6 376.4 628.1 388C626.8 393.7 622.3 397.1 616.6 399.3L588.8 405.9C584.7 415.4 579.5 424.4 573.4 432.6L581.5 459.7C583.2 465.3 581.7 471.4 577.4 475.3C559.6 491.5 538.2 503.9 514.6 511.4C509.1 513.1 503.1 511.3 499.1 507.1L479.1 486.1C474.5 487.7 468.9 488 463.2 488C458 488 452.9 487.7 447.9 487.2L428.9 507.1C424.9 511.3 418.9 513.1 413.4 511.4C389.8 503.9 368.4 491.5 350.6 475.3C346.3 471.4 344.8 465.3 346.5 459.7L354.2 434.1C347.5 425.3 341.9 415.7 337.4 405.5L311.4 399.3C305.7 397.1 301.2 393.7 299.9 388C297.3 376.4 295.1 364.4 295.1 352C295.1 339.6 297.4 327.6 299.9 315.1C301.2 310.3 305.7 306 311.4 304.7L337.4 298.5C341.9 288.3 347.5 278.7 354.2 269.9L346.5 244.3C344.8 238.8 346.3 232.7 350.6 228.7C368.4 212.5 389.8 200.1 413.4 192.7C418.9 190.9 424.9 192.7 428.9 196.9L447.9 216.9C452.9 216.3 458 216 463.2 216C468.9 216 474.5 216.4 479.1 217L499.1 196.9C503.1 192.7 509.1 190.9 514.6 192.7C538.2 200.1 559.6 212.5 577.4 228.7C581.7 232.7 583.2 238.8 581.5 244.3V244.3zM463.2 256C459.5 256 455.9 256.2 452.3 256.6L432.6 258.8L411.1 236.3C403.5 239.7 396.3 243.8 389.6 248.6L398.3 277.1L385.1 294.2C381.3 300.4 377.3 307.1 374.2 314.3L366.2 332.8L336.6 339.8C336.2 343.8 336 347.9 336 352C336 356.1 336.2 360.2 336.6 364.2L366.2 371.2L374.2 389.7C377.3 396.9 381.3 403.6 385.1 409.8L398.3 426L389.6 455.4C396.3 460.2 403.5 464.3 411.1 467.8L432.6 445.2L452.3 447.4C455.9 447.8 459.5 448 463.2 448C467.3 448 471.3 447.8 475.2 447.3L495.1 444.9L516.9 467.8C524.5 464.3 531.7 460.2 538.4 455.4L529.3 424.9L541.3 408.8C545.6 402.1 549.2 396.7 552.2 389.1L560.1 371.6L591.4 364.2C591.8 360.2 592 356.1 592 352C592 347.9 591.8 343.8 591.4 339.8L560.1 332.4L552.2 314C549.2 307.4 545.6 301 541.3 295.2L529.3 279.1L538.4 248.6C531.7 243.8 524.5 239.7 516.9 236.3L495.1 259.1L475.2 256.7C471.3 256.3 467.3 256 463.2 256V256z"],
    "sun-bright": [512, 512, ["sun-alt"], "e28f", "M256 144C194.1 144 144 194.1 144 256c0 61.86 50.14 112 112 112s112-50.14 112-112C368 194.1 317.9 144 256 144zM256 320c-35.29 0-64-28.71-64-64c0-35.29 28.71-64 64-64s64 28.71 64 64C320 291.3 291.3 320 256 320zM256 112c13.25 0 24-10.75 24-24v-64C280 10.75 269.3 0 256 0S232 10.75 232 24v64C232 101.3 242.8 112 256 112zM256 400c-13.25 0-24 10.75-24 24v64C232 501.3 242.8 512 256 512s24-10.75 24-24v-64C280 410.8 269.3 400 256 400zM488 232h-64c-13.25 0-24 10.75-24 24s10.75 24 24 24h64C501.3 280 512 269.3 512 256S501.3 232 488 232zM112 256c0-13.25-10.75-24-24-24h-64C10.75 232 0 242.8 0 256s10.75 24 24 24h64C101.3 280 112 269.3 112 256zM391.8 357.8c-9.344-9.375-24.56-9.372-33.94 .0031s-9.375 24.56 0 33.93l45.25 45.28c4.672 4.688 10.83 7.031 16.97 7.031s12.28-2.344 16.97-7.031c9.375-9.375 9.375-24.56 0-33.94L391.8 357.8zM120.2 154.2c4.672 4.688 10.83 7.031 16.97 7.031S149.5 158.9 154.2 154.2c9.375-9.375 9.375-24.56 0-33.93L108.9 74.97c-9.344-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L120.2 154.2zM374.8 161.2c6.141 0 12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.94s-24.59-9.375-33.94 0l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.93C362.5 158.9 368.7 161.2 374.8 161.2zM120.2 357.8l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.94c4.688 4.688 10.83 7.031 16.97 7.031s12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.93S129.6 348.4 120.2 357.8z"],
    "dog": [576, 512, [128021], "f6d3", "M448 112C448 120.8 440.8 128 432 128C423.2 128 416 120.8 416 112C416 103.2 423.2 96 432 96C440.8 96 448 103.2 448 112zM64.23 220.2C63.13 219.8 62.05 219.5 60.97 219.1C33.58 209.5 11.94 186.7 4.597 157.3L.7168 141.8C-2.498 128.1 5.32 115.9 18.18 112.7C31.04 109.5 44.07 117.3 47.28 130.2L51.16 145.7C55.62 163.5 71.62 176 89.97 176H290.7L317.5 14.89C318.1 6.296 326.4 0 335.1 0C340.7 0 345.1 2.64 349.3 7.126L368 32H444.1C456.8 32 469.1 37.06 478.1 46.06L496 64H528C554.5 64 576 85.49 576 112V144C576 197 533 240 480 240H434.7L432 255.1V448C432 483.3 403.3 512 368 512H352C316.7 512 288 483.3 288 448V379.6C277.6 381.9 266.9 383.4 256 383.8C253.3 383.9 250.7 384 248 384C245.3 384 242.7 383.9 240 383.8C229.1 383.4 218.4 381.9 208 379.6V448C208 483.3 179.3 512 144 512H128C92.65 512 64 483.3 64 448V224C64 222.7 64.08 221.4 64.23 220.2H64.23zM336 319.8V448C336 456.8 343.2 464 352 464H368C376.8 464 384 456.8 384 448V274.3L302.2 224H112.1L112 224.9V448C112 456.8 119.2 464 128 464H144C152.8 464 160 456.8 160 448V319.8L218.4 332.8C227.9 334.9 237.8 336 248 336C258.2 336 268.1 334.9 277.6 332.8L336 319.8zM337.1 189.1L389.1 221.1L394 192H480C506.5 192 528 170.5 528 144V112H476.1L444.1 80H355.3L337.1 189.1z"],
    "grid-2": [448, 512, [], "e196", "M0 80C0 53.49 21.49 32 48 32H144C170.5 32 192 53.49 192 80V176C192 202.5 170.5 224 144 224H48C21.49 224 0 202.5 0 176V80zM48 176H144V80H48V176zM0 336C0 309.5 21.49 288 48 288H144C170.5 288 192 309.5 192 336V432C192 458.5 170.5 480 144 480H48C21.49 480 0 458.5 0 432V336zM48 432H144V336H48V432zM400 32C426.5 32 448 53.49 448 80V176C448 202.5 426.5 224 400 224H304C277.5 224 256 202.5 256 176V80C256 53.49 277.5 32 304 32H400zM400 80H304V176H400V80zM256 336C256 309.5 277.5 288 304 288H400C426.5 288 448 309.5 448 336V432C448 458.5 426.5 480 400 480H304C277.5 480 256 458.5 256 432V336zM304 432H400V336H304V432z"],
    "notdef": [384, 512, [], "e1fe", "M336 0h-288C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48v-416C384 21.49 362.5 0 336 0zM336 90.16V421.8L221.2 256L336 90.16zM192 213.8L77.19 48h229.6L192 213.8zM162.8 256L48 421.8V90.16L162.8 256zM192 298.2L306.8 464H77.19L192 298.2z"]
  };

  bunker(function () {
    defineIcons('far', icons);
    defineIcons('fa-regular', icons);
  });

}());
(function () {
  'use strict';

  var _WINDOW = {};
  var _DOCUMENT = {};

  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
  } catch (e) {}

  var _ref = _WINDOW.navigator || {},
      _ref$userAgent = _ref.userAgent,
      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var _familyProxy, _familyProxy2, _familyProxy3, _familyProxy4, _familyProxy5;

  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();
  var FAMILY_CLASSIC = 'classic';
  var FAMILY_SHARP = 'sharp';
  var FAMILIES = [FAMILY_CLASSIC, FAMILY_SHARP];

  function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
      get: function get(target, prop) {
        return prop in target ? target[prop] : target[FAMILY_CLASSIC];
      }
    });
  }
  var PREFIX_TO_STYLE = familyProxy((_familyProxy = {}, _defineProperty(_familyProxy, FAMILY_CLASSIC, {
    'fa': 'solid',
    'fas': 'solid',
    'fa-solid': 'solid',
    'far': 'regular',
    'fa-regular': 'regular',
    'fal': 'light',
    'fa-light': 'light',
    'fat': 'thin',
    'fa-thin': 'thin',
    'fad': 'duotone',
    'fa-duotone': 'duotone',
    'fab': 'brands',
    'fa-brands': 'brands',
    'fak': 'kit',
    'fa-kit': 'kit'
  }), _defineProperty(_familyProxy, FAMILY_SHARP, {
    'fa': 'solid',
    'fass': 'solid',
    'fa-solid': 'solid'
  }), _familyProxy));
  var STYLE_TO_PREFIX = familyProxy((_familyProxy2 = {}, _defineProperty(_familyProxy2, FAMILY_CLASSIC, {
    'solid': 'fas',
    'regular': 'far',
    'light': 'fal',
    'thin': 'fat',
    'duotone': 'fad',
    'brands': 'fab',
    'kit': 'fak'
  }), _defineProperty(_familyProxy2, FAMILY_SHARP, {
    'solid': 'fass'
  }), _familyProxy2));
  var PREFIX_TO_LONG_STYLE = familyProxy((_familyProxy3 = {}, _defineProperty(_familyProxy3, FAMILY_CLASSIC, {
    'fab': 'fa-brands',
    'fad': 'fa-duotone',
    'fak': 'fa-kit',
    'fal': 'fa-light',
    'far': 'fa-regular',
    'fas': 'fa-solid',
    'fat': 'fa-thin'
  }), _defineProperty(_familyProxy3, FAMILY_SHARP, {
    'fass': 'fa-solid'
  }), _familyProxy3));
  var LONG_STYLE_TO_PREFIX = familyProxy((_familyProxy4 = {}, _defineProperty(_familyProxy4, FAMILY_CLASSIC, {
    'fa-brands': 'fab',
    'fa-duotone': 'fad',
    'fa-kit': 'fak',
    'fa-light': 'fal',
    'fa-regular': 'far',
    'fa-solid': 'fas',
    'fa-thin': 'fat'
  }), _defineProperty(_familyProxy4, FAMILY_SHARP, {
    'fa-solid': 'fass'
  }), _familyProxy4));
  // TODO: do we need to handle font-weight for kit SVG pseudo-elements?

  var FONT_WEIGHT_TO_PREFIX = familyProxy((_familyProxy5 = {}, _defineProperty(_familyProxy5, FAMILY_CLASSIC, {
    '900': 'fas',
    '400': 'far',
    'normal': 'far',
    '300': 'fal',
    '100': 'fat'
  }), _defineProperty(_familyProxy5, FAMILY_SHARP, {
    '900': 'fass'
  }), _familyProxy5));
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var DUOTONE_CLASSES = {
    GROUP: 'duotone-group',
    SWAP_OPACITY: 'swap-opacity',
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
  };
  var prefixes = new Set();
  Object.keys(STYLE_TO_PREFIX[FAMILY_CLASSIC]).map(prefixes.add.bind(prefixes));
  Object.keys(STYLE_TO_PREFIX[FAMILY_SHARP]).map(prefixes.add.bind(prefixes));
  var RESERVED_CLASSES = [].concat(FAMILIES, _toConsumableArray(prefixes), ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', 'beat', 'border', 'fade', 'beat-fade', 'bounce', 'flip-both', 'flip-horizontal', 'flip-vertical', 'flip', 'fw', 'inverse', 'layers-counter', 'layers-text', 'layers', 'li', 'pull-left', 'pull-right', 'pulse', 'rotate-180', 'rotate-270', 'rotate-90', 'rotate-by', 'shake', 'spin-pulse', 'spin-reverse', 'spin', 'stack-1x', 'stack-2x', 'stack', 'ul', DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function (n) {
    return "".concat(n, "x");
  })).concat(oneToTwenty.map(function (n) {
    return "w-".concat(n);
  }));

  function bunker(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn.apply(void 0, args);
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }

  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});
  }

  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = normalizeIcons(icons);

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll ease the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var icons = {
    "trees": [640, 512, [], "f724", "M70.2 121.4L178.5 5.8C182 2.1 186.9 0 192 0s10 2.1 13.5 5.8L313.8 121.4c4 4.3 6.2 9.9 6.2 15.7c0 12.7-10.3 22.9-22.9 22.9H272l74.6 89.5c3.5 4.2 5.4 9.5 5.4 15c0 13-10.5 23.5-23.5 23.5H304l74.6 89.5c3.5 4.2 5.4 9.5 5.4 15c0 13-10.5 23.5-23.5 23.5H224v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H23.5C10.5 416 0 405.5 0 392.5c0-5.5 1.9-10.8 5.4-15L80 288H55.5c-13 0-23.5-10.5-23.5-23.5c0-5.5 1.9-10.8 5.4-15L112 160H86.9C74.3 160 64 149.7 64 137.1c0-5.8 2.2-11.4 6.2-15.7zm271.4-16.4L434.5 5.8C438 2.1 442.9 0 448 0s10 2.1 13.5 5.8L569.8 121.4c4 4.3 6.2 9.9 6.2 15.7c0 12.7-10.3 22.9-22.9 22.9H528l74.6 89.5c3.5 4.2 5.4 9.5 5.4 15c0 13-10.5 23.5-23.5 23.5H560l74.6 89.5c3.5 4.2 5.4 9.5 5.4 15c0 13-10.5 23.5-23.5 23.5H480v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V416l0-23.4 0-.1 0-.1V392h0c-.1-12.8-4.7-25.2-12.9-35l-40.6-48.7c13-10.2 21.4-26 21.4-43.8c0-13-4.6-25.6-12.9-35.5l-40.4-48.5c12.9-10 21.3-25.8 21.3-43.4c0-11.6-3.7-22.8-10.4-32.1z"],
    "bars": [448, 512, ["navicon"], "f0c9", "M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"],
    "list": [512, 512, ["list-squares"], "f03a", "M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"],
    "campground": [576, 512, [9978], "f6bb", "M377 52c11-13.8 8.8-33.9-5-45s-33.9-8.8-45 5L288 60.8 249 12c-11-13.8-31.2-16-45-5s-16 31.2-5 45l48 60L12.3 405.4C4.3 415.4 0 427.7 0 440.4V464c0 26.5 21.5 48 48 48H288 528c26.5 0 48-21.5 48-48V440.4c0-12.7-4.3-25.1-12.3-35L329 112l48-60zM288 448H168.5L288 291.7 407.5 448H288z"],
    "tree": [448, 512, [127794], "f1bb", "M210.6 5.9L62 169.4c-3.9 4.2-6 9.8-6 15.5C56 197.7 66.3 208 79.1 208H104L30.6 281.4c-4.2 4.2-6.6 10-6.6 16C24 309.9 34.1 320 46.6 320H80L5.4 409.5C1.9 413.7 0 419 0 424.5c0 13 10.5 23.5 23.5 23.5H192v32c0 17.7 14.3 32 32 32s32-14.3 32-32V448H424.5c13 0 23.5-10.5 23.5-23.5c0-5.5-1.9-10.8-5.4-15L368 320h33.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L344 208h24.9c12.7 0 23.1-10.3 23.1-23.1c0-5.7-2.1-11.3-6-15.5L237.4 5.9C234 2.1 229.1 0 224 0s-10 2.1-13.4 5.9z"],
    "users": [640, 512, [], "f0c0", "M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80s-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM416 224c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"],
    "angle-right": [320, 512, [8250], "f105", "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"],
    "user": [448, 512, [128100, 62144], "f007", "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"],
    "star": [576, 512, [11088, 61446], "f005", "M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"],
    "wifi": [640, 512, ["wifi-3", "wifi-strong"], "f1eb", "M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160c0-35.3-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64z"],
    "map-location-dot": [576, 512, ["map-marked-alt"], "f5a0", "M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40z"],
    "arrow-right": [448, 512, [8594], "f061", "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"],
    "house-water": [576, 512, ["house-flood"], "f74f", "M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32V393c21.3-12.2 48.1-11.4 68.8 3.1c18 12.4 40.1 20.3 59.2 20.3c21.1 0 42-8.5 59.2-20.3c22.1-15.5 51.6-15.5 73.7 0c18.4 12.7 39.6 20.3 59.2 20.3c19 0 41.2-7.9 59.2-20.3c20.7-14.6 47.7-15.4 69.1-3l-.5-105.6h32zM224 216c0-13.3 10.7-24 24-24h80c13.3 0 24 10.7 24 24v80c0 13.3-10.7 24-24 24H248c-13.3 0-24-10.7-24-24V216zm82.5 205.9c-11.1-7.9-25.9-7.9-37 0C247 437.4 219.5 448 192 448c-26.9 0-55.3-10.8-77.4-26.1l0 0c-11.9-8.5-28.1-7.8-39.2 1.7c-14.4 11.9-32.5 21-50.6 25.2c-17.2 4-27.9 21.2-23.9 38.4s21.2 27.9 38.4 23.9c24.5-5.7 44.9-16.5 58.2-25C126.5 501.7 159 512 192 512c31.9 0 60.6-9.9 80.4-18.9c5.8-2.7 11.1-5.3 15.6-7.7c4.5 2.4 9.7 5.1 15.6 7.7c19.8 9 48.6 18.9 80.4 18.9c33 0 65.5-10.3 94.5-25.8c13.4 8.4 33.7 19.3 58.2 25c17.2 4 34.4-6.7 38.4-23.9s-6.7-34.4-23.9-38.4c-18.1-4.2-36.2-13.3-50.6-25.2c-11.1-9.4-27.3-10.1-39.2-1.7l0 0C439.4 437.2 410.9 448 384 448c-27.5 0-55-10.6-77.5-26.1z"],
    "arrow-left": [448, 512, [8592], "f060", "M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"],
    "arrow-left-long": [512, 512, ["long-arrow-left"], "f177", "M109.3 288L480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288z"],
    "gear": [512, 512, [9881, "cog"], "f013", "M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z"],
    "ellipsis-vertical": [128, 512, ["ellipsis-v"], "f142", "M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"],
    "house": [576, 512, [127968, 63498, 63500, "home", "home-alt", "home-lg-alt"], "f015", "M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"],
    "sun": [512, 512, [9728], "f185", "M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM352 256c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zm32 0c0-70.7-57.3-128-128-128s-128 57.3-128 128s57.3 128 128 128s128-57.3 128-128z"],
    "house-tree": [640, 512, [], "e1b3", "M393.4 9.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H514.6L601 300c7.7 9.6 9.2 22.8 3.9 33.9S588.3 352 576 352H546.6L633 460c7.7 9.6 9.2 22.8 3.9 33.9S620.3 512 608 512H400c10-13.4 16-30 16-48V277.1c0-22.4-9.4-43.8-25.9-59L282.9 119.9 393.4 9.4zM0 277.1c0-13.5 5.6-26.3 15.6-35.4l144-132c18.4-16.8 46.5-16.8 64.9 0l144 132c9.9 9.1 15.6 21.9 15.6 35.4V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V277.1zM144 296v48c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V296c0-13.3-10.7-24-24-24H168c-13.3 0-24 10.7-24 24z"],
    "arrow-right-long": [512, 512, ["long-arrow-right"], "f178", "M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"],
    "ellipsis": [448, 512, ["ellipsis-h"], "f141", "M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z"],
    "location-dot": [384, 512, ["map-marker-alt"], "f3c5", "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"],
    "magnifying-glass": [512, 512, [128269, "search"], "f002", "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"],
    "plus": [448, 512, [10133, 61543, "add"], "2b", "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"],
    "spinner": [512, 512, [], "f110", "M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"],
    "gears": [640, 512, ["cogs"], "f085", "M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.7 8.4 166.9 8 160 8s-13.7 .4-20.4 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM208 176c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 400c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48z"],
    "sun-bright": [512, 512, ["sun-alt"], "e28f", "M256 0c-13.3 0-24 10.7-24 24V88c0 13.3 10.7 24 24 24s24-10.7 24-24V24c0-13.3-10.7-24-24-24zm0 400c-13.3 0-24 10.7-24 24v64c0 13.3 10.7 24 24 24s24-10.7 24-24V424c0-13.3-10.7-24-24-24zM488 280c13.3 0 24-10.7 24-24s-10.7-24-24-24H424c-13.3 0-24 10.7-24 24s10.7 24 24 24h64zM112 256c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H88c13.3 0 24-10.7 24-24zM437 108.9c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-45.3 45.3c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L437 108.9zM154.2 357.8c-9.4-9.4-24.6-9.4-33.9 0L75 403.1c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l45.3-45.3c9.4-9.4 9.4-24.6 0-33.9zM403.1 437c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-45.3-45.3c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L403.1 437zM154.2 154.2c9.4-9.4 9.4-24.6 0-33.9L108.9 75c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l45.3 45.3c9.4 9.4 24.6 9.4 33.9 0zM256 368c61.9 0 112-50.1 112-112s-50.1-112-112-112s-112 50.1-112 112s50.1 112 112 112z"],
    "dog": [576, 512, [128021], "f6d3", "M309.6 158.5L332.7 19.8C334.6 8.4 344.5 0 356.1 0c7.5 0 14.5 3.5 19 9.5L392 32h52.1c12.7 0 24.9 5.1 33.9 14.1L496 64h56c13.3 0 24 10.7 24 24v24c0 44.2-35.8 80-80 80H464 448 426.7l-5.1 30.5-112-64zM416 256.1L416 480c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V364.8c-24 12.3-51.2 19.2-80 19.2s-56-6.9-80-19.2V480c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V249.8c-28.8-10.9-51.4-35.3-59.2-66.5L1 167.8c-4.3-17.1 6.1-34.5 23.3-38.8s34.5 6.1 38.8 23.3l3.9 15.5C70.5 182 83.3 192 98 192h30 16H303.8L416 256.1zM464 80c0-8.8-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16s16-7.2 16-16z"],
    "grid-2": [448, 512, [], "e196", "M192 80c0-26.5-21.5-48-48-48H48C21.5 32 0 53.5 0 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80zm0 256c0-26.5-21.5-48-48-48H48c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336zM256 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H304c-26.5 0-48 21.5-48 48zM448 336c0-26.5-21.5-48-48-48H304c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336z"],
    "notdef": [384, 512, [], "e1fe", "M64 390.3L153.5 256 64 121.7V390.3zM102.5 448H281.5L192 313.7 102.5 448zm128-192L320 390.3V121.7L230.5 256zM281.5 64H102.5L192 198.3 281.5 64zM0 48C0 21.5 21.5 0 48 0H336c26.5 0 48 21.5 48 48V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48z"]
  };

  bunker(function () {
    defineIcons('fas', icons);
    defineIcons('fa-solid', icons);
  });

}());
(function () {
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _wrapRegExp() {
    _wrapRegExp = function (re, groups) {
      return new BabelRegExp(re, void 0, groups);
    };

    var _super = RegExp.prototype,
        _groups = new WeakMap();

    function BabelRegExp(re, flags, groups) {
      var _this = new RegExp(re, flags);

      return _groups.set(_this, groups || _groups.get(re)), _setPrototypeOf(_this, BabelRegExp.prototype);
    }

    function buildGroups(result, re) {
      var g = _groups.get(re);

      return Object.keys(g).reduce(function (groups, name) {
        var i = g[name];
        if ("number" == typeof i) groups[name] = result[i];else {
          for (var k = 0; void 0 === result[i[k]] && k + 1 < i.length;) k++;

          groups[name] = result[i[k]];
        }
        return groups;
      }, Object.create(null));
    }

    return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (str) {
      var result = _super.exec.call(this, str);

      return result && (result.groups = buildGroups(result, this)), result;
    }, BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
      if ("string" == typeof substitution) {
        var groups = _groups.get(this);

        return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
          return "$" + groups[name];
        }));
      }

      if ("function" == typeof substitution) {
        var _this = this;

        return _super[Symbol.replace].call(this, str, function () {
          var args = arguments;
          return "object" != typeof args[args.length - 1] && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args);
        });
      }

      return _super[Symbol.replace].call(this, str, substitution);
    }, _wrapRegExp.apply(this, arguments);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var noop = function noop() {};

  var _WINDOW = {};
  var _DOCUMENT = {};
  var _MUTATION_OBSERVER = null;
  var _PERFORMANCE = {
    mark: noop,
    measure: noop
  };

  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
    if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
    if (typeof performance !== 'undefined') _PERFORMANCE = performance;
  } catch (e) {}

  var _ref = _WINDOW.navigator || {},
      _ref$userAgent = _ref.userAgent,
      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var MUTATION_OBSERVER = _MUTATION_OBSERVER;
  var PERFORMANCE = _PERFORMANCE;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  var _familyProxy, _familyProxy2, _familyProxy3, _familyProxy4, _familyProxy5;

  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var UNITS_IN_GRID = 16;
  var DEFAULT_CSS_PREFIX = 'fa';
  var DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
  var DATA_FA_I2SVG = 'data-fa-i2svg';
  var DATA_FA_PSEUDO_ELEMENT = 'data-fa-pseudo-element';
  var DATA_FA_PSEUDO_ELEMENT_PENDING = 'data-fa-pseudo-element-pending';
  var DATA_PREFIX = 'data-prefix';
  var DATA_ICON = 'data-icon';
  var HTML_CLASS_I2SVG_BASE_CLASS = 'fontawesome-i2svg';
  var MUTATION_APPROACH_ASYNC = 'async';
  var TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'];
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();
  var FAMILY_CLASSIC = 'classic';
  var FAMILY_SHARP = 'sharp';
  var FAMILIES = [FAMILY_CLASSIC, FAMILY_SHARP];

  function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
      get: function get(target, prop) {
        return prop in target ? target[prop] : target[FAMILY_CLASSIC];
      }
    });
  }
  var PREFIX_TO_STYLE = familyProxy((_familyProxy = {}, _defineProperty(_familyProxy, FAMILY_CLASSIC, {
    'fa': 'solid',
    'fas': 'solid',
    'fa-solid': 'solid',
    'far': 'regular',
    'fa-regular': 'regular',
    'fal': 'light',
    'fa-light': 'light',
    'fat': 'thin',
    'fa-thin': 'thin',
    'fad': 'duotone',
    'fa-duotone': 'duotone',
    'fab': 'brands',
    'fa-brands': 'brands',
    'fak': 'kit',
    'fa-kit': 'kit'
  }), _defineProperty(_familyProxy, FAMILY_SHARP, {
    'fa': 'solid',
    'fass': 'solid',
    'fa-solid': 'solid'
  }), _familyProxy));
  var STYLE_TO_PREFIX = familyProxy((_familyProxy2 = {}, _defineProperty(_familyProxy2, FAMILY_CLASSIC, {
    'solid': 'fas',
    'regular': 'far',
    'light': 'fal',
    'thin': 'fat',
    'duotone': 'fad',
    'brands': 'fab',
    'kit': 'fak'
  }), _defineProperty(_familyProxy2, FAMILY_SHARP, {
    'solid': 'fass'
  }), _familyProxy2));
  var PREFIX_TO_LONG_STYLE = familyProxy((_familyProxy3 = {}, _defineProperty(_familyProxy3, FAMILY_CLASSIC, {
    'fab': 'fa-brands',
    'fad': 'fa-duotone',
    'fak': 'fa-kit',
    'fal': 'fa-light',
    'far': 'fa-regular',
    'fas': 'fa-solid',
    'fat': 'fa-thin'
  }), _defineProperty(_familyProxy3, FAMILY_SHARP, {
    'fass': 'fa-solid'
  }), _familyProxy3));
  var LONG_STYLE_TO_PREFIX = familyProxy((_familyProxy4 = {}, _defineProperty(_familyProxy4, FAMILY_CLASSIC, {
    'fa-brands': 'fab',
    'fa-duotone': 'fad',
    'fa-kit': 'fak',
    'fa-light': 'fal',
    'fa-regular': 'far',
    'fa-solid': 'fas',
    'fa-thin': 'fat'
  }), _defineProperty(_familyProxy4, FAMILY_SHARP, {
    'fa-solid': 'fass'
  }), _familyProxy4));
  var ICON_SELECTION_SYNTAX_PATTERN = /fa(s|r|l|t|d|b|k|ss)?[\-\ ]/; // eslint-disable-line no-useless-escape

  var LAYERS_TEXT_CLASSNAME = 'fa-layers-text';
  var FONT_FAMILY_PATTERN = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i; // TODO: this needs to support fass
  // TODO: do we need to handle font-weight for kit SVG pseudo-elements?

  var FONT_WEIGHT_TO_PREFIX = familyProxy((_familyProxy5 = {}, _defineProperty(_familyProxy5, FAMILY_CLASSIC, {
    '900': 'fas',
    '400': 'far',
    'normal': 'far',
    '300': 'fal',
    '100': 'fat'
  }), _defineProperty(_familyProxy5, FAMILY_SHARP, {
    '900': 'fass'
  }), _familyProxy5));
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var ATTRIBUTES_WATCHED_FOR_MUTATION = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'];
  var DUOTONE_CLASSES = {
    GROUP: 'duotone-group',
    SWAP_OPACITY: 'swap-opacity',
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
  };
  var prefixes = new Set();
  Object.keys(STYLE_TO_PREFIX[FAMILY_CLASSIC]).map(prefixes.add.bind(prefixes));
  Object.keys(STYLE_TO_PREFIX[FAMILY_SHARP]).map(prefixes.add.bind(prefixes));
  var RESERVED_CLASSES = [].concat(FAMILIES, _toConsumableArray(prefixes), ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', 'beat', 'border', 'fade', 'beat-fade', 'bounce', 'flip-both', 'flip-horizontal', 'flip-vertical', 'flip', 'fw', 'inverse', 'layers-counter', 'layers-text', 'layers', 'li', 'pull-left', 'pull-right', 'pulse', 'rotate-180', 'rotate-270', 'rotate-90', 'rotate-by', 'shake', 'spin-pulse', 'spin-reverse', 'spin', 'stack-1x', 'stack-2x', 'stack', 'ul', DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function (n) {
    return "".concat(n, "x");
  })).concat(oneToTwenty.map(function (n) {
    return "w-".concat(n);
  }));

  var initial = WINDOW.FontAwesomeConfig || {};

  function getAttrConfig(attr) {
    var element = DOCUMENT.querySelector('script[' + attr + ']');

    if (element) {
      return element.getAttribute(attr);
    }
  }

  function coerce(val) {
    // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
    // We'll assume that this is an indication that it should be toggled to true
    if (val === '') return true;
    if (val === 'false') return false;
    if (val === 'true') return true;
    return val;
  }

  if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
    var attrs = [['data-family-prefix', 'familyPrefix'], ['data-css-prefix', 'cssPrefix'], ['data-family-default', 'familyDefault'], ['data-style-default', 'styleDefault'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-mutate-approach', 'mutateApproach'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];
    attrs.forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          attr = _ref2[0],
          key = _ref2[1];

      var val = coerce(getAttrConfig(attr));

      if (val !== undefined && val !== null) {
        initial[key] = val;
      }
    });
  }

  var _default = {
    styleDefault: 'solid',
    familyDefault: 'classic',
    cssPrefix: DEFAULT_CSS_PREFIX,
    replacementClass: DEFAULT_REPLACEMENT_CLASS,
    autoReplaceSvg: true,
    autoAddCss: true,
    autoA11y: true,
    searchPseudoElements: false,
    observeMutations: true,
    mutateApproach: 'async',
    keepOriginalSource: true,
    measurePerformance: false,
    showMissingIcons: true
  }; // familyPrefix is deprecated but we must still support it if present

  if (initial.familyPrefix) {
    initial.cssPrefix = initial.familyPrefix;
  }

  var _config = _objectSpread2(_objectSpread2({}, _default), initial);

  if (!_config.autoReplaceSvg) _config.observeMutations = false;
  var config = {};
  Object.keys(_default).forEach(function (key) {
    Object.defineProperty(config, key, {
      enumerable: true,
      set: function set(val) {
        _config[key] = val;

        _onChangeCb.forEach(function (cb) {
          return cb(config);
        });
      },
      get: function get() {
        return _config[key];
      }
    });
  }); // familyPrefix is deprecated as of 6.2.0 and should be removed in 7.0.0

  Object.defineProperty(config, 'familyPrefix', {
    enumerable: true,
    set: function set(val) {
      _config.cssPrefix = val;

      _onChangeCb.forEach(function (cb) {
        return cb(config);
      });
    },
    get: function get() {
      return _config.cssPrefix;
    }
  });
  WINDOW.FontAwesomeConfig = config;
  var _onChangeCb = [];
  function onChange(cb) {
    _onChangeCb.push(cb);

    return function () {
      _onChangeCb.splice(_onChangeCb.indexOf(cb), 1);
    };
  }

  var d = UNITS_IN_GRID;
  var meaninglessTransform = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: false,
    flipY: false
  };
  function bunker(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn.apply(void 0, args);
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }
  function insertCss(css) {
    if (!css || !IS_DOM) {
      return;
    }

    var style = DOCUMENT.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    var headChildren = DOCUMENT.head.childNodes;
    var beforeChild = null;

    for (var i = headChildren.length - 1; i > -1; i--) {
      var child = headChildren[i];
      var tagName = (child.tagName || '').toUpperCase();

      if (['STYLE', 'LINK'].indexOf(tagName) > -1) {
        beforeChild = child;
      }
    }

    DOCUMENT.head.insertBefore(style, beforeChild);
    return css;
  }
  var idPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  function nextUniqueId() {
    var size = 12;
    var id = '';

    while (size-- > 0) {
      id += idPool[Math.random() * 62 | 0];
    }

    return id;
  }
  function toArray(obj) {
    var array = [];

    for (var i = (obj || []).length >>> 0; i--;) {
      array[i] = obj[i];
    }

    return array;
  }
  function classArray(node) {
    if (node.classList) {
      return toArray(node.classList);
    } else {
      return (node.getAttribute('class') || '').split(' ').filter(function (i) {
        return i;
      });
    }
  }
  function htmlEscape(str) {
    return "".concat(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function joinAttributes(attributes) {
    return Object.keys(attributes || {}).reduce(function (acc, attributeName) {
      return acc + "".concat(attributeName, "=\"").concat(htmlEscape(attributes[attributeName]), "\" ");
    }, '').trim();
  }
  function joinStyles(styles) {
    return Object.keys(styles || {}).reduce(function (acc, styleName) {
      return acc + "".concat(styleName, ": ").concat(styles[styleName].trim(), ";");
    }, '');
  }
  function transformIsMeaningful(transform) {
    return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
  }
  function transformForSvg(_ref) {
    var transform = _ref.transform,
        containerWidth = _ref.containerWidth,
        iconWidth = _ref.iconWidth;
    var outer = {
      transform: "translate(".concat(containerWidth / 2, " 256)")
    };
    var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
    var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
    var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
    var inner = {
      transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
    };
    var path = {
      transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
    };
    return {
      outer: outer,
      inner: inner,
      path: path
    };
  }
  function transformForCss(_ref2) {
    var transform = _ref2.transform,
        _ref2$width = _ref2.width,
        width = _ref2$width === void 0 ? UNITS_IN_GRID : _ref2$width,
        _ref2$height = _ref2.height,
        height = _ref2$height === void 0 ? UNITS_IN_GRID : _ref2$height,
        _ref2$startCentered = _ref2.startCentered,
        startCentered = _ref2$startCentered === void 0 ? false : _ref2$startCentered;
    var val = '';

    if (startCentered && IS_IE) {
      val += "translate(".concat(transform.x / d - width / 2, "em, ").concat(transform.y / d - height / 2, "em) ");
    } else if (startCentered) {
      val += "translate(calc(-50% + ".concat(transform.x / d, "em), calc(-50% + ").concat(transform.y / d, "em)) ");
    } else {
      val += "translate(".concat(transform.x / d, "em, ").concat(transform.y / d, "em) ");
    }

    val += "scale(".concat(transform.size / d * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d * (transform.flipY ? -1 : 1), ") ");
    val += "rotate(".concat(transform.rotate, "deg) ");
    return val;
  }

  var baseStyles = ":host,:root{--fa-font-solid:normal 900 1em/1 \"Font Awesome 6 Solid\";--fa-font-regular:normal 400 1em/1 \"Font Awesome 6 Regular\";--fa-font-light:normal 300 1em/1 \"Font Awesome 6 Light\";--fa-font-thin:normal 100 1em/1 \"Font Awesome 6 Thin\";--fa-font-duotone:normal 900 1em/1 \"Font Awesome 6 Duotone\";--fa-font-sharp-solid:normal 900 1em/1 \"Font Awesome 6 Sharp\";--fa-font-brands:normal 400 1em/1 \"Font Awesome 6 Brands\"}svg:not(:host).svg-inline--fa,svg:not(:root).svg-inline--fa{overflow:visible;box-sizing:content-box}.svg-inline--fa{display:var(--fa-display,inline-block);height:1em;overflow:visible;vertical-align:-.125em}.svg-inline--fa.fa-2xs{vertical-align:.1em}.svg-inline--fa.fa-xs{vertical-align:0}.svg-inline--fa.fa-sm{vertical-align:-.0714285705em}.svg-inline--fa.fa-lg{vertical-align:-.2em}.svg-inline--fa.fa-xl{vertical-align:-.25em}.svg-inline--fa.fa-2xl{vertical-align:-.3125em}.svg-inline--fa.fa-pull-left{margin-right:var(--fa-pull-margin,.3em);width:auto}.svg-inline--fa.fa-pull-right{margin-left:var(--fa-pull-margin,.3em);width:auto}.svg-inline--fa.fa-li{width:var(--fa-li-width,2em);top:.25em}.svg-inline--fa.fa-fw{width:var(--fa-fw-width,1.25em)}.fa-layers svg.svg-inline--fa{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}.fa-layers-counter,.fa-layers-text{display:inline-block;position:absolute;text-align:center}.fa-layers{display:inline-block;height:1em;position:relative;text-align:center;vertical-align:-.125em;width:1em}.fa-layers svg.svg-inline--fa{-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-text{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-counter{background-color:var(--fa-counter-background-color,#ff253a);border-radius:var(--fa-counter-border-radius,1em);box-sizing:border-box;color:var(--fa-inverse,#fff);line-height:var(--fa-counter-line-height,1);max-width:var(--fa-counter-max-width,5em);min-width:var(--fa-counter-min-width,1.5em);overflow:hidden;padding:var(--fa-counter-padding,.25em .5em);right:var(--fa-right,0);text-overflow:ellipsis;top:var(--fa-top,0);-webkit-transform:scale(var(--fa-counter-scale,.25));transform:scale(var(--fa-counter-scale,.25));-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-bottom-right{bottom:var(--fa-bottom,0);right:var(--fa-right,0);top:auto;-webkit-transform:scale(var(--fa-layers-scale,.25));transform:scale(var(--fa-layers-scale,.25));-webkit-transform-origin:bottom right;transform-origin:bottom right}.fa-layers-bottom-left{bottom:var(--fa-bottom,0);left:var(--fa-left,0);right:auto;top:auto;-webkit-transform:scale(var(--fa-layers-scale,.25));transform:scale(var(--fa-layers-scale,.25));-webkit-transform-origin:bottom left;transform-origin:bottom left}.fa-layers-top-right{top:var(--fa-top,0);right:var(--fa-right,0);-webkit-transform:scale(var(--fa-layers-scale,.25));transform:scale(var(--fa-layers-scale,.25));-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-top-left{left:var(--fa-left,0);right:auto;top:var(--fa-top,0);-webkit-transform:scale(var(--fa-layers-scale,.25));transform:scale(var(--fa-layers-scale,.25));-webkit-transform-origin:top left;transform-origin:top left}.fa-1x{font-size:1em}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-6x{font-size:6em}.fa-7x{font-size:7em}.fa-8x{font-size:8em}.fa-9x{font-size:9em}.fa-10x{font-size:10em}.fa-2xs{font-size:.625em;line-height:.1em;vertical-align:.225em}.fa-xs{font-size:.75em;line-height:.0833333337em;vertical-align:.125em}.fa-sm{font-size:.875em;line-height:.0714285718em;vertical-align:.0535714295em}.fa-lg{font-size:1.25em;line-height:.05em;vertical-align:-.075em}.fa-xl{font-size:1.5em;line-height:.0416666682em;vertical-align:-.125em}.fa-2xl{font-size:2em;line-height:.03125em;vertical-align:-.1875em}.fa-fw{text-align:center;width:1.25em}.fa-ul{list-style-type:none;margin-left:var(--fa-li-margin,2.5em);padding-left:0}.fa-ul>li{position:relative}.fa-li{left:calc(var(--fa-li-width,2em) * -1);position:absolute;text-align:center;width:var(--fa-li-width,2em);line-height:inherit}.fa-border{border-color:var(--fa-border-color,#eee);border-radius:var(--fa-border-radius,.1em);border-style:var(--fa-border-style,solid);border-width:var(--fa-border-width,.08em);padding:var(--fa-border-padding,.2em .25em .15em)}.fa-pull-left{float:left;margin-right:var(--fa-pull-margin,.3em)}.fa-pull-right{float:right;margin-left:var(--fa-pull-margin,.3em)}.fa-beat{-webkit-animation-name:fa-beat;animation-name:fa-beat;-webkit-animation-delay:var(--fa-animation-delay,0s);animation-delay:var(--fa-animation-delay,0s);-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,1s);animation-duration:var(--fa-animation-duration,1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,ease-in-out);animation-timing-function:var(--fa-animation-timing,ease-in-out)}.fa-bounce{-webkit-animation-name:fa-bounce;animation-name:fa-bounce;-webkit-animation-delay:var(--fa-animation-delay,0s);animation-delay:var(--fa-animation-delay,0s);-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,1s);animation-duration:var(--fa-animation-duration,1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,cubic-bezier(.28,.84,.42,1));animation-timing-function:var(--fa-animation-timing,cubic-bezier(.28,.84,.42,1))}.fa-fade{-webkit-animation-name:fa-fade;animation-name:fa-fade;-webkit-animation-delay:var(--fa-animation-delay,0s);animation-delay:var(--fa-animation-delay,0s);-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,1s);animation-duration:var(--fa-animation-duration,1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,cubic-bezier(.4,0,.6,1));animation-timing-function:var(--fa-animation-timing,cubic-bezier(.4,0,.6,1))}.fa-beat-fade{-webkit-animation-name:fa-beat-fade;animation-name:fa-beat-fade;-webkit-animation-delay:var(--fa-animation-delay,0s);animation-delay:var(--fa-animation-delay,0s);-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,1s);animation-duration:var(--fa-animation-duration,1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,cubic-bezier(.4,0,.6,1));animation-timing-function:var(--fa-animation-timing,cubic-bezier(.4,0,.6,1))}.fa-flip{-webkit-animation-name:fa-flip;animation-name:fa-flip;-webkit-animation-delay:var(--fa-animation-delay,0s);animation-delay:var(--fa-animation-delay,0s);-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,1s);animation-duration:var(--fa-animation-duration,1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,ease-in-out);animation-timing-function:var(--fa-animation-timing,ease-in-out)}.fa-shake{-webkit-animation-name:fa-shake;animation-name:fa-shake;-webkit-animation-delay:var(--fa-animation-delay,0s);animation-delay:var(--fa-animation-delay,0s);-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,1s);animation-duration:var(--fa-animation-duration,1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,linear);animation-timing-function:var(--fa-animation-timing,linear)}.fa-spin{-webkit-animation-name:fa-spin;animation-name:fa-spin;-webkit-animation-delay:var(--fa-animation-delay,0s);animation-delay:var(--fa-animation-delay,0s);-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,2s);animation-duration:var(--fa-animation-duration,2s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,linear);animation-timing-function:var(--fa-animation-timing,linear)}.fa-spin-reverse{--fa-animation-direction:reverse}.fa-pulse,.fa-spin-pulse{-webkit-animation-name:fa-spin;animation-name:fa-spin;-webkit-animation-direction:var(--fa-animation-direction,normal);animation-direction:var(--fa-animation-direction,normal);-webkit-animation-duration:var(--fa-animation-duration,1s);animation-duration:var(--fa-animation-duration,1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count,infinite);animation-iteration-count:var(--fa-animation-iteration-count,infinite);-webkit-animation-timing-function:var(--fa-animation-timing,steps(8));animation-timing-function:var(--fa-animation-timing,steps(8))}@media (prefers-reduced-motion:reduce){.fa-beat,.fa-beat-fade,.fa-bounce,.fa-fade,.fa-flip,.fa-pulse,.fa-shake,.fa-spin,.fa-spin-pulse{-webkit-animation-delay:-1ms;animation-delay:-1ms;-webkit-animation-duration:1ms;animation-duration:1ms;-webkit-animation-iteration-count:1;animation-iteration-count:1;transition-delay:0s;transition-duration:0s}}@-webkit-keyframes fa-beat{0%,90%{-webkit-transform:scale(1);transform:scale(1)}45%{-webkit-transform:scale(var(--fa-beat-scale,1.25));transform:scale(var(--fa-beat-scale,1.25))}}@keyframes fa-beat{0%,90%{-webkit-transform:scale(1);transform:scale(1)}45%{-webkit-transform:scale(var(--fa-beat-scale,1.25));transform:scale(var(--fa-beat-scale,1.25))}}@-webkit-keyframes fa-bounce{0%{-webkit-transform:scale(1,1) translateY(0);transform:scale(1,1) translateY(0)}10%{-webkit-transform:scale(var(--fa-bounce-start-scale-x,1.1),var(--fa-bounce-start-scale-y,.9)) translateY(0);transform:scale(var(--fa-bounce-start-scale-x,1.1),var(--fa-bounce-start-scale-y,.9)) translateY(0)}30%{-webkit-transform:scale(var(--fa-bounce-jump-scale-x,.9),var(--fa-bounce-jump-scale-y,1.1)) translateY(var(--fa-bounce-height,-.5em));transform:scale(var(--fa-bounce-jump-scale-x,.9),var(--fa-bounce-jump-scale-y,1.1)) translateY(var(--fa-bounce-height,-.5em))}50%{-webkit-transform:scale(var(--fa-bounce-land-scale-x,1.05),var(--fa-bounce-land-scale-y,.95)) translateY(0);transform:scale(var(--fa-bounce-land-scale-x,1.05),var(--fa-bounce-land-scale-y,.95)) translateY(0)}57%{-webkit-transform:scale(1,1) translateY(var(--fa-bounce-rebound,-.125em));transform:scale(1,1) translateY(var(--fa-bounce-rebound,-.125em))}64%{-webkit-transform:scale(1,1) translateY(0);transform:scale(1,1) translateY(0)}100%{-webkit-transform:scale(1,1) translateY(0);transform:scale(1,1) translateY(0)}}@keyframes fa-bounce{0%{-webkit-transform:scale(1,1) translateY(0);transform:scale(1,1) translateY(0)}10%{-webkit-transform:scale(var(--fa-bounce-start-scale-x,1.1),var(--fa-bounce-start-scale-y,.9)) translateY(0);transform:scale(var(--fa-bounce-start-scale-x,1.1),var(--fa-bounce-start-scale-y,.9)) translateY(0)}30%{-webkit-transform:scale(var(--fa-bounce-jump-scale-x,.9),var(--fa-bounce-jump-scale-y,1.1)) translateY(var(--fa-bounce-height,-.5em));transform:scale(var(--fa-bounce-jump-scale-x,.9),var(--fa-bounce-jump-scale-y,1.1)) translateY(var(--fa-bounce-height,-.5em))}50%{-webkit-transform:scale(var(--fa-bounce-land-scale-x,1.05),var(--fa-bounce-land-scale-y,.95)) translateY(0);transform:scale(var(--fa-bounce-land-scale-x,1.05),var(--fa-bounce-land-scale-y,.95)) translateY(0)}57%{-webkit-transform:scale(1,1) translateY(var(--fa-bounce-rebound,-.125em));transform:scale(1,1) translateY(var(--fa-bounce-rebound,-.125em))}64%{-webkit-transform:scale(1,1) translateY(0);transform:scale(1,1) translateY(0)}100%{-webkit-transform:scale(1,1) translateY(0);transform:scale(1,1) translateY(0)}}@-webkit-keyframes fa-fade{50%{opacity:var(--fa-fade-opacity,.4)}}@keyframes fa-fade{50%{opacity:var(--fa-fade-opacity,.4)}}@-webkit-keyframes fa-beat-fade{0%,100%{opacity:var(--fa-beat-fade-opacity,.4);-webkit-transform:scale(1);transform:scale(1)}50%{opacity:1;-webkit-transform:scale(var(--fa-beat-fade-scale,1.125));transform:scale(var(--fa-beat-fade-scale,1.125))}}@keyframes fa-beat-fade{0%,100%{opacity:var(--fa-beat-fade-opacity,.4);-webkit-transform:scale(1);transform:scale(1)}50%{opacity:1;-webkit-transform:scale(var(--fa-beat-fade-scale,1.125));transform:scale(var(--fa-beat-fade-scale,1.125))}}@-webkit-keyframes fa-flip{50%{-webkit-transform:rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),var(--fa-flip-angle,-180deg));transform:rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),var(--fa-flip-angle,-180deg))}}@keyframes fa-flip{50%{-webkit-transform:rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),var(--fa-flip-angle,-180deg));transform:rotate3d(var(--fa-flip-x,0),var(--fa-flip-y,1),var(--fa-flip-z,0),var(--fa-flip-angle,-180deg))}}@-webkit-keyframes fa-shake{0%{-webkit-transform:rotate(-15deg);transform:rotate(-15deg)}4%{-webkit-transform:rotate(15deg);transform:rotate(15deg)}24%,8%{-webkit-transform:rotate(-18deg);transform:rotate(-18deg)}12%,28%{-webkit-transform:rotate(18deg);transform:rotate(18deg)}16%{-webkit-transform:rotate(-22deg);transform:rotate(-22deg)}20%{-webkit-transform:rotate(22deg);transform:rotate(22deg)}32%{-webkit-transform:rotate(-12deg);transform:rotate(-12deg)}36%{-webkit-transform:rotate(12deg);transform:rotate(12deg)}100%,40%{-webkit-transform:rotate(0);transform:rotate(0)}}@keyframes fa-shake{0%{-webkit-transform:rotate(-15deg);transform:rotate(-15deg)}4%{-webkit-transform:rotate(15deg);transform:rotate(15deg)}24%,8%{-webkit-transform:rotate(-18deg);transform:rotate(-18deg)}12%,28%{-webkit-transform:rotate(18deg);transform:rotate(18deg)}16%{-webkit-transform:rotate(-22deg);transform:rotate(-22deg)}20%{-webkit-transform:rotate(22deg);transform:rotate(22deg)}32%{-webkit-transform:rotate(-12deg);transform:rotate(-12deg)}36%{-webkit-transform:rotate(12deg);transform:rotate(12deg)}100%,40%{-webkit-transform:rotate(0);transform:rotate(0)}}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.fa-rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-webkit-transform:scale(-1,1);transform:scale(-1,1)}.fa-flip-vertical{-webkit-transform:scale(1,-1);transform:scale(1,-1)}.fa-flip-both,.fa-flip-horizontal.fa-flip-vertical{-webkit-transform:scale(-1,-1);transform:scale(-1,-1)}.fa-rotate-by{-webkit-transform:rotate(var(--fa-rotate-angle,none));transform:rotate(var(--fa-rotate-angle,none))}.fa-stack{display:inline-block;vertical-align:middle;height:2em;position:relative;width:2.5em}.fa-stack-1x,.fa-stack-2x{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;z-index:var(--fa-stack-z-index,auto)}.svg-inline--fa.fa-stack-1x{height:1em;width:1.25em}.svg-inline--fa.fa-stack-2x{height:2em;width:2.5em}.fa-inverse{color:var(--fa-inverse,#fff)}.fa-sr-only,.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.fa-sr-only-focusable:not(:focus),.sr-only-focusable:not(:focus){position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.svg-inline--fa .fa-primary{fill:var(--fa-primary-color,currentColor);opacity:var(--fa-primary-opacity,1)}.svg-inline--fa .fa-secondary{fill:var(--fa-secondary-color,currentColor);opacity:var(--fa-secondary-opacity,.4)}.svg-inline--fa.fa-swap-opacity .fa-primary{opacity:var(--fa-secondary-opacity,.4)}.svg-inline--fa.fa-swap-opacity .fa-secondary{opacity:var(--fa-primary-opacity,1)}.svg-inline--fa mask .fa-primary,.svg-inline--fa mask .fa-secondary{fill:#000}.fa-duotone.fa-inverse,.fad.fa-inverse{color:var(--fa-inverse,#fff)}";

  function css() {
    var dcp = DEFAULT_CSS_PREFIX;
    var drc = DEFAULT_REPLACEMENT_CLASS;
    var fp = config.cssPrefix;
    var rc = config.replacementClass;
    var s = baseStyles;

    if (fp !== dcp || rc !== drc) {
      var dPatt = new RegExp("\\.".concat(dcp, "\\-"), 'g');
      var customPropPatt = new RegExp("\\--".concat(dcp, "\\-"), 'g');
      var rPatt = new RegExp("\\.".concat(drc), 'g');
      s = s.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
    }

    return s;
  }

  var _cssInserted = false;

  function ensureCss() {
    if (config.autoAddCss && !_cssInserted) {
      insertCss(css());
      _cssInserted = true;
    }
  }

  var InjectCSS = {
    mixout: function mixout() {
      return {
        dom: {
          css: css,
          insertCss: ensureCss
        }
      };
    },
    hooks: function hooks() {
      return {
        beforeDOMElementCreation: function beforeDOMElementCreation() {
          ensureCss();
        },
        beforeI2svg: function beforeI2svg() {
          ensureCss();
        }
      };
    }
  };

  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  var functions = [];

  var listener = function listener() {
    DOCUMENT.removeEventListener('DOMContentLoaded', listener);
    loaded = 1;
    functions.map(function (fn) {
      return fn();
    });
  };

  var loaded = false;

  if (IS_DOM) {
    loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
    if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
  }

  function domready (fn) {
    if (!IS_DOM) return;
    loaded ? setTimeout(fn, 0) : functions.push(fn);
  }

  function toHtml(abstractNodes) {
    var tag = abstractNodes.tag,
        _abstractNodes$attrib = abstractNodes.attributes,
        attributes = _abstractNodes$attrib === void 0 ? {} : _abstractNodes$attrib,
        _abstractNodes$childr = abstractNodes.children,
        children = _abstractNodes$childr === void 0 ? [] : _abstractNodes$childr;

    if (typeof abstractNodes === 'string') {
      return htmlEscape(abstractNodes);
    } else {
      return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(''), "</").concat(tag, ">");
    }
  }

  function iconFromMapping(mapping, prefix, iconName) {
    if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
      return {
        prefix: prefix,
        iconName: iconName,
        icon: mapping[prefix][iconName]
      };
    }
  }

  /**
   * Internal helper to bind a function known to have 4 arguments
   * to a given context.
   */

  var bindInternal4 = function bindInternal4(func, thisContext) {
    return function (a, b, c, d) {
      return func.call(thisContext, a, b, c, d);
    };
  };

  /**
   * # Reduce
   *
   * A fast object `.reduce()` implementation.
   *
   * @param  {Object}   subject      The object to reduce over.
   * @param  {Function} fn           The reducer function.
   * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
   * @param  {Object}   thisContext  The context for the reducer.
   * @return {mixed}                 The final result.
   */


  var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
    var keys = Object.keys(subject),
        length = keys.length,
        iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
        i,
        key,
        result;

    if (initialValue === undefined) {
      i = 1;
      result = subject[keys[0]];
    } else {
      i = 0;
      result = initialValue;
    }

    for (; i < length; i++) {
      key = keys[i];
      result = iterator(result, subject[key], key, subject);
    }

    return result;
  };

  /**
   * ucs2decode() and codePointAt() are both works of Mathias Bynens and licensed under MIT
   *
   * Copyright Mathias Bynens <https://mathiasbynens.be/>

   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:

   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.

   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
   * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
   * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
   * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */
  function ucs2decode(string) {
    var output = [];
    var counter = 0;
    var length = string.length;

    while (counter < length) {
      var value = string.charCodeAt(counter++);

      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        var extra = string.charCodeAt(counter++);

        if ((extra & 0xFC00) == 0xDC00) {
          // eslint-disable-line eqeqeq
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }

    return output;
  }

  function toHex(unicode) {
    var decoded = ucs2decode(unicode);
    return decoded.length === 1 ? decoded[0].toString(16) : null;
  }
  function codePointAt(string, index) {
    var size = string.length;
    var first = string.charCodeAt(index);
    var second;

    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
      second = string.charCodeAt(index + 1);

      if (second >= 0xDC00 && second <= 0xDFFF) {
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }

    return first;
  }

  function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});
  }

  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = normalizeIcons(icons);

    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll ease the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var duotonePathRe = [/*#__PURE__*/_wrapRegExp(/path d="([^"]+)".*path d="([^"]+)"/, {
    d1: 1,
    d2: 2
  }), /*#__PURE__*/_wrapRegExp(/path class="([^"]+)".*d="([^"]+)".*path class="([^"]+)".*d="([^"]+)"/, {
    cls1: 1,
    d1: 2,
    cls2: 3,
    d2: 4
  }), /*#__PURE__*/_wrapRegExp(/path class="([^"]+)".*d="([^"]+)"/, {
    cls1: 1,
    d1: 2
  })];

  var _LONG_STYLE, _PREFIXES, _PREFIXES_FOR_FAMILY;
  var styles = namespace.styles,
      shims = namespace.shims;
  var LONG_STYLE = (_LONG_STYLE = {}, _defineProperty(_LONG_STYLE, FAMILY_CLASSIC, Object.values(PREFIX_TO_LONG_STYLE[FAMILY_CLASSIC])), _defineProperty(_LONG_STYLE, FAMILY_SHARP, Object.values(PREFIX_TO_LONG_STYLE[FAMILY_SHARP])), _LONG_STYLE);
  var _defaultUsablePrefix = null;
  var _byUnicode = {};
  var _byLigature = {};
  var _byOldName = {};
  var _byOldUnicode = {};
  var _byAlias = {};
  var PREFIXES = (_PREFIXES = {}, _defineProperty(_PREFIXES, FAMILY_CLASSIC, Object.keys(PREFIX_TO_STYLE[FAMILY_CLASSIC])), _defineProperty(_PREFIXES, FAMILY_SHARP, Object.keys(PREFIX_TO_STYLE[FAMILY_SHARP])), _PREFIXES);

  function isReserved(name) {
    return ~RESERVED_CLASSES.indexOf(name);
  }

  function getIconName(cssPrefix, cls) {
    var parts = cls.split('-');
    var prefix = parts[0];
    var iconName = parts.slice(1).join('-');

    if (prefix === cssPrefix && iconName !== '' && !isReserved(iconName)) {
      return iconName;
    } else {
      return null;
    }
  }
  var build = function build() {
    var lookup = function lookup(reducer) {
      return reduce(styles, function (o, style, prefix) {
        o[prefix] = reduce(style, reducer, {});
        return o;
      }, {});
    };

    _byUnicode = lookup(function (acc, icon, iconName) {
      if (icon[3]) {
        acc[icon[3]] = iconName;
      }

      if (icon[2]) {
        var aliases = icon[2].filter(function (a) {
          return typeof a === 'number';
        });
        aliases.forEach(function (alias) {
          acc[alias.toString(16)] = iconName;
        });
      }

      return acc;
    });
    _byLigature = lookup(function (acc, icon, iconName) {
      acc[iconName] = iconName;

      if (icon[2]) {
        var aliases = icon[2].filter(function (a) {
          return typeof a === 'string';
        });
        aliases.forEach(function (alias) {
          acc[alias] = iconName;
        });
      }

      return acc;
    });
    _byAlias = lookup(function (acc, icon, iconName) {
      var aliases = icon[2];
      acc[iconName] = iconName;
      aliases.forEach(function (alias) {
        acc[alias] = iconName;
      });
      return acc;
    }); // If we have a Kit, we can't determine if regular is available since we
    // could be auto-fetching it. We'll have to assume that it is available.

    var hasRegular = 'far' in styles || config.autoFetchSvg;
    var shimLookups = reduce(shims, function (acc, shim) {
      var maybeNameMaybeUnicode = shim[0];
      var prefix = shim[1];
      var iconName = shim[2];

      if (prefix === 'far' && !hasRegular) {
        prefix = 'fas';
      }

      if (typeof maybeNameMaybeUnicode === 'string') {
        acc.names[maybeNameMaybeUnicode] = {
          prefix: prefix,
          iconName: iconName
        };
      }

      if (typeof maybeNameMaybeUnicode === 'number') {
        acc.unicodes[maybeNameMaybeUnicode.toString(16)] = {
          prefix: prefix,
          iconName: iconName
        };
      }

      return acc;
    }, {
      names: {},
      unicodes: {}
    });
    _byOldName = shimLookups.names;
    _byOldUnicode = shimLookups.unicodes;
    _defaultUsablePrefix = getCanonicalPrefix(config.styleDefault, {
      family: config.familyDefault
    });
  };
  onChange(function (c) {
    _defaultUsablePrefix = getCanonicalPrefix(c.styleDefault, {
      family: config.familyDefault
    });
  });
  build();
  function byUnicode(prefix, unicode) {
    return (_byUnicode[prefix] || {})[unicode];
  }
  function byLigature(prefix, ligature) {
    return (_byLigature[prefix] || {})[ligature];
  }
  function byAlias(prefix, alias) {
    return (_byAlias[prefix] || {})[alias];
  }
  function byOldName(name) {
    return _byOldName[name] || {
      prefix: null,
      iconName: null
    };
  }
  function byOldUnicode(unicode) {
    var oldUnicode = _byOldUnicode[unicode];
    var newUnicode = byUnicode('fas', unicode);
    return oldUnicode || (newUnicode ? {
      prefix: 'fas',
      iconName: newUnicode
    } : null) || {
      prefix: null,
      iconName: null
    };
  }
  function getDefaultUsablePrefix() {
    return _defaultUsablePrefix;
  }
  var emptyCanonicalIcon = function emptyCanonicalIcon() {
    return {
      prefix: null,
      iconName: null,
      rest: []
    };
  };
  function getCanonicalPrefix(styleOrPrefix) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _params$family = params.family,
        family = _params$family === void 0 ? FAMILY_CLASSIC : _params$family;
    var style = PREFIX_TO_STYLE[family][styleOrPrefix];
    var prefix = STYLE_TO_PREFIX[family][styleOrPrefix] || STYLE_TO_PREFIX[family][style];
    var defined = styleOrPrefix in namespace.styles ? styleOrPrefix : null;
    return prefix || defined || null;
  }
  var PREFIXES_FOR_FAMILY = (_PREFIXES_FOR_FAMILY = {}, _defineProperty(_PREFIXES_FOR_FAMILY, FAMILY_CLASSIC, Object.keys(PREFIX_TO_LONG_STYLE[FAMILY_CLASSIC])), _defineProperty(_PREFIXES_FOR_FAMILY, FAMILY_SHARP, Object.keys(PREFIX_TO_LONG_STYLE[FAMILY_SHARP])), _PREFIXES_FOR_FAMILY);
  function getCanonicalIcon(values) {
    var _famProps;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _params$skipLookups = params.skipLookups,
        skipLookups = _params$skipLookups === void 0 ? false : _params$skipLookups;
    var famProps = (_famProps = {}, _defineProperty(_famProps, FAMILY_CLASSIC, "".concat(config.cssPrefix, "-").concat(FAMILY_CLASSIC)), _defineProperty(_famProps, FAMILY_SHARP, "".concat(config.cssPrefix, "-").concat(FAMILY_SHARP)), _famProps);
    var givenPrefix = null;
    var family = FAMILY_CLASSIC;

    if (values.includes(famProps[FAMILY_CLASSIC]) || values.some(function (v) {
      return PREFIXES_FOR_FAMILY[FAMILY_CLASSIC].includes(v);
    })) {
      family = FAMILY_CLASSIC;
    }

    if (values.includes(famProps[FAMILY_SHARP]) || values.some(function (v) {
      return PREFIXES_FOR_FAMILY[FAMILY_SHARP].includes(v);
    })) {
      family = FAMILY_SHARP;
    }

    var canonical = values.reduce(function (acc, cls) {
      var iconName = getIconName(config.cssPrefix, cls);

      if (styles[cls]) {
        cls = LONG_STYLE[family].includes(cls) ? LONG_STYLE_TO_PREFIX[family][cls] : cls;
        givenPrefix = cls;
        acc.prefix = cls;
      } else if (PREFIXES[family].indexOf(cls) > -1) {
        givenPrefix = cls;
        acc.prefix = getCanonicalPrefix(cls, {
          family: family
        });
      } else if (iconName) {
        acc.iconName = iconName;
      } else if (cls !== config.replacementClass && cls !== famProps[FAMILY_CLASSIC] && cls !== famProps[FAMILY_SHARP]) {
        acc.rest.push(cls);
      }

      if (!skipLookups && acc.prefix && acc.iconName) {
        var shim = givenPrefix === 'fa' ? byOldName(acc.iconName) : {};
        var aliasIconName = byAlias(acc.prefix, acc.iconName);

        if (shim.prefix) {
          givenPrefix = null;
        }

        acc.iconName = shim.iconName || aliasIconName || acc.iconName;
        acc.prefix = shim.prefix || acc.prefix;

        if (acc.prefix === 'far' && !styles['far'] && styles['fas'] && !config.autoFetchSvg) {
          // Allow a fallback from the regular style to solid if regular is not available
          // but only if we aren't auto-fetching SVGs
          acc.prefix = 'fas';
        }
      }

      return acc;
    }, emptyCanonicalIcon());

    if (values.includes('fa-brands') || values.includes('fab')) {
      canonical.prefix = 'fab';
    }

    if (values.includes('fa-duotone') || values.includes('fad')) {
      canonical.prefix = 'fad';
    }

    if (!canonical.prefix && family === FAMILY_SHARP && (styles['fass'] || config.autoFetchSvg)) {
      canonical.prefix = 'fass';
      canonical.iconName = byAlias(canonical.prefix, canonical.iconName) || canonical.iconName;
    }

    if (canonical.prefix === 'fa' || givenPrefix === 'fa') {
      // The fa prefix is not canonical. So if it has made it through until this point
      // we will shift it to the correct prefix.
      canonical.prefix = getDefaultUsablePrefix() || 'fas';
    }

    return canonical;
  }

  var Library = /*#__PURE__*/function () {
    function Library() {
      _classCallCheck(this, Library);

      this.definitions = {};
    }

    _createClass(Library, [{
      key: "add",
      value: function add() {
        var _this = this;

        for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
          definitions[_key] = arguments[_key];
        }

        var additions = definitions.reduce(this._pullDefinitions, {});
        Object.keys(additions).forEach(function (key) {
          _this.definitions[key] = _objectSpread2(_objectSpread2({}, _this.definitions[key] || {}), additions[key]);
          defineIcons(key, additions[key]); // TODO can we stop doing this? We can't get the icons by 'fa-solid' any longer so this probably needs to change

          var longPrefix = PREFIX_TO_LONG_STYLE[FAMILY_CLASSIC][key];
          if (longPrefix) defineIcons(longPrefix, additions[key]);
          build();
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        this.definitions = {};
      }
    }, {
      key: "_pullDefinitions",
      value: function _pullDefinitions(additions, definition) {
        var normalized = definition.prefix && definition.iconName && definition.icon ? {
          0: definition
        } : definition;
        Object.keys(normalized).map(function (key) {
          var _normalized$key = normalized[key],
              prefix = _normalized$key.prefix,
              iconName = _normalized$key.iconName,
              icon = _normalized$key.icon;
          var aliases = icon[2];
          if (!additions[prefix]) additions[prefix] = {};

          if (aliases.length > 0) {
            aliases.forEach(function (alias) {
              if (typeof alias === 'string') {
                additions[prefix][alias] = icon;
              }
            });
          }

          additions[prefix][iconName] = icon;
        });
        return additions;
      }
    }]);

    return Library;
  }();

  var _plugins = [];
  var _hooks = {};
  var providers = {};
  var defaultProviderKeys = Object.keys(providers);
  function registerPlugins(nextPlugins, _ref) {
    var obj = _ref.mixoutsTo;
    _plugins = nextPlugins;
    _hooks = {};
    Object.keys(providers).forEach(function (k) {
      if (defaultProviderKeys.indexOf(k) === -1) {
        delete providers[k];
      }
    });

    _plugins.forEach(function (plugin) {
      var mixout = plugin.mixout ? plugin.mixout() : {};
      Object.keys(mixout).forEach(function (tk) {
        if (typeof mixout[tk] === 'function') {
          obj[tk] = mixout[tk];
        }

        if (_typeof(mixout[tk]) === 'object') {
          Object.keys(mixout[tk]).forEach(function (sk) {
            if (!obj[tk]) {
              obj[tk] = {};
            }

            obj[tk][sk] = mixout[tk][sk];
          });
        }
      });

      if (plugin.hooks) {
        var hooks = plugin.hooks();
        Object.keys(hooks).forEach(function (hook) {
          if (!_hooks[hook]) {
            _hooks[hook] = [];
          }

          _hooks[hook].push(hooks[hook]);
        });
      }

      if (plugin.provides) {
        plugin.provides(providers);
      }
    });

    return obj;
  }
  function chainHooks(hook, accumulator) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var hookFns = _hooks[hook] || [];
    hookFns.forEach(function (hookFn) {
      accumulator = hookFn.apply(null, [accumulator].concat(args)); // eslint-disable-line no-useless-call
    });
    return accumulator;
  }
  function callHooks(hook) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var hookFns = _hooks[hook] || [];
    hookFns.forEach(function (hookFn) {
      hookFn.apply(null, args);
    });
    return undefined;
  }
  function callProvided() {
    var hook = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    return providers[hook] ? providers[hook].apply(null, args) : undefined;
  }

  function findIconDefinition(iconLookup) {
    if (iconLookup.prefix === 'fa') {
      iconLookup.prefix = 'fas';
    }

    var iconName = iconLookup.iconName;
    var prefix = iconLookup.prefix || getDefaultUsablePrefix();
    if (!iconName) return;
    iconName = byAlias(prefix, iconName) || iconName;
    return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
  }
  var library = new Library();
  var noAuto = function noAuto() {
    config.autoReplaceSvg = false;
    config.observeMutations = false;
    callHooks('noAuto');
  };
  var dom = {
    i2svg: function i2svg() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (IS_DOM) {
        callHooks('beforeI2svg', params);
        callProvided('pseudoElements2svg', params);
        return callProvided('i2svg', params);
      } else {
        return Promise.reject('Operation requires a DOM of some kind.');
      }
    },
    watch: function watch() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var autoReplaceSvgRoot = params.autoReplaceSvgRoot;

      if (config.autoReplaceSvg === false) {
        config.autoReplaceSvg = true;
      }

      config.observeMutations = true;
      domready(function () {
        autoReplace({
          autoReplaceSvgRoot: autoReplaceSvgRoot
        });
        callHooks('watch', params);
      });
    }
  };
  var parse = {
    icon: function icon(_icon) {
      if (_icon === null) {
        return null;
      }

      if (_typeof(_icon) === 'object' && _icon.prefix && _icon.iconName) {
        return {
          prefix: _icon.prefix,
          iconName: byAlias(_icon.prefix, _icon.iconName) || _icon.iconName
        };
      }

      if (Array.isArray(_icon) && _icon.length === 2) {
        var iconName = _icon[1].indexOf('fa-') === 0 ? _icon[1].slice(3) : _icon[1];
        var prefix = getCanonicalPrefix(_icon[0]);
        return {
          prefix: prefix,
          iconName: byAlias(prefix, iconName) || iconName
        };
      }

      if (typeof _icon === 'string' && (_icon.indexOf("".concat(config.cssPrefix, "-")) > -1 || _icon.match(ICON_SELECTION_SYNTAX_PATTERN))) {
        var canonicalIcon = getCanonicalIcon(_icon.split(' '), {
          skipLookups: true
        });
        return {
          prefix: canonicalIcon.prefix || getDefaultUsablePrefix(),
          iconName: byAlias(canonicalIcon.prefix, canonicalIcon.iconName) || canonicalIcon.iconName
        };
      }

      if (typeof _icon === 'string') {
        var _prefix = getDefaultUsablePrefix();

        return {
          prefix: _prefix,
          iconName: byAlias(_prefix, _icon) || _icon
        };
      }
    }
  };
  var api = {
    noAuto: noAuto,
    config: config,
    dom: dom,
    parse: parse,
    library: library,
    findIconDefinition: findIconDefinition,
    toHtml: toHtml
  };

  var autoReplace = function autoReplace() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _params$autoReplaceSv = params.autoReplaceSvgRoot,
        autoReplaceSvgRoot = _params$autoReplaceSv === void 0 ? DOCUMENT : _params$autoReplaceSv;
    if ((Object.keys(namespace.styles).length > 0 || config.autoFetchSvg) && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({
      node: autoReplaceSvgRoot
    });
  };

  function bootstrap(plugins) {
    if (IS_BROWSER) {
      if (!WINDOW.FontAwesome) {
        WINDOW.FontAwesome = api;
      }

      domready(function () {
        autoReplace();
        callHooks('bootstrap');
      });
    }

    namespace.hooks = _objectSpread2(_objectSpread2({}, namespace.hooks), {}, {
      addPack: function addPack(prefix, icons) {
        namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), icons);
        build();
        autoReplace();
      },
      addPacks: function addPacks(packs) {
        packs.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              prefix = _ref2[0],
              icons = _ref2[1];

          namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), icons);
        });
        build();
        autoReplace();
      },
      addShims: function addShims(shims) {
        var _namespace$shims;

        (_namespace$shims = namespace.shims).push.apply(_namespace$shims, _toConsumableArray(shims));

        build();
        autoReplace();
      }
    });
  }

  function domVariants(val, abstractCreator) {
    Object.defineProperty(val, 'abstract', {
      get: abstractCreator
    });
    Object.defineProperty(val, 'html', {
      get: function get() {
        return val.abstract.map(function (a) {
          return toHtml(a);
        });
      }
    });
    Object.defineProperty(val, 'node', {
      get: function get() {
        if (!IS_DOM) return;
        var container = DOCUMENT.createElement('div');
        container.innerHTML = val.html;
        return container.children;
      }
    });
    return val;
  }

  function asIcon (_ref) {
    var children = _ref.children,
        main = _ref.main,
        mask = _ref.mask,
        attributes = _ref.attributes,
        styles = _ref.styles,
        transform = _ref.transform;

    if (transformIsMeaningful(transform) && main.found && !mask.found) {
      var width = main.width,
          height = main.height;
      var offset = {
        x: width / height / 2,
        y: 0.5
      };
      attributes['style'] = joinStyles(_objectSpread2(_objectSpread2({}, styles), {}, {
        'transform-origin': "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
      }));
    }

    return [{
      tag: 'svg',
      attributes: attributes,
      children: children
    }];
  }

  function asSymbol (_ref) {
    var prefix = _ref.prefix,
        iconName = _ref.iconName,
        children = _ref.children,
        attributes = _ref.attributes,
        symbol = _ref.symbol;
    var id = symbol === true ? "".concat(prefix, "-").concat(config.cssPrefix, "-").concat(iconName) : symbol;
    return [{
      tag: 'svg',
      attributes: {
        style: 'display: none;'
      },
      children: [{
        tag: 'symbol',
        attributes: _objectSpread2(_objectSpread2({}, attributes), {}, {
          id: id
        }),
        children: children
      }]
    }];
  }

  function makeInlineSvgAbstract(params) {
    var _params$icons = params.icons,
        main = _params$icons.main,
        mask = _params$icons.mask,
        prefix = params.prefix,
        iconName = params.iconName,
        transform = params.transform,
        symbol = params.symbol,
        title = params.title,
        maskId = params.maskId,
        titleId = params.titleId,
        extra = params.extra,
        _params$watchable = params.watchable,
        watchable = _params$watchable === void 0 ? false : _params$watchable;

    var _ref = mask.found ? mask : main,
        width = _ref.width,
        height = _ref.height;

    var isUploadedIcon = prefix === 'fak';
    var attrClass = [config.replacementClass, iconName ? "".concat(config.cssPrefix, "-").concat(iconName) : ''].filter(function (c) {
      return extra.classes.indexOf(c) === -1;
    }).filter(function (c) {
      return c !== '' || !!c;
    }).concat(extra.classes).join(' ');
    var content = {
      children: [],
      attributes: _objectSpread2(_objectSpread2({}, extra.attributes), {}, {
        'data-prefix': prefix,
        'data-icon': iconName,
        'class': attrClass,
        'role': extra.attributes.role || 'img',
        'xmlns': 'http://www.w3.org/2000/svg',
        'viewBox': "0 0 ".concat(width, " ").concat(height)
      })
    };
    var uploadedIconWidthStyle = isUploadedIcon && !~extra.classes.indexOf('fa-fw') ? {
      width: "".concat(width / height * 16 * 0.0625, "em")
    } : {};

    if (watchable) {
      content.attributes[DATA_FA_I2SVG] = '';
    }

    if (title) {
      content.children.push({
        tag: 'title',
        attributes: {
          id: content.attributes['aria-labelledby'] || "title-".concat(titleId || nextUniqueId())
        },
        children: [title]
      });
      delete content.attributes.title;
    }

    var args = _objectSpread2(_objectSpread2({}, content), {}, {
      prefix: prefix,
      iconName: iconName,
      main: main,
      mask: mask,
      maskId: maskId,
      transform: transform,
      symbol: symbol,
      styles: _objectSpread2(_objectSpread2({}, uploadedIconWidthStyle), extra.styles)
    });

    var _ref2 = mask.found && main.found ? callProvided('generateAbstractMask', args) || {
      children: [],
      attributes: {}
    } : callProvided('generateAbstractIcon', args) || {
      children: [],
      attributes: {}
    },
        children = _ref2.children,
        attributes = _ref2.attributes;

    args.children = children;
    args.attributes = attributes;

    if (symbol) {
      return asSymbol(args);
    } else {
      return asIcon(args);
    }
  }
  function makeLayersTextAbstract(params) {
    var content = params.content,
        width = params.width,
        height = params.height,
        transform = params.transform,
        title = params.title,
        extra = params.extra,
        _params$watchable2 = params.watchable,
        watchable = _params$watchable2 === void 0 ? false : _params$watchable2;

    var attributes = _objectSpread2(_objectSpread2(_objectSpread2({}, extra.attributes), title ? {
      'title': title
    } : {}), {}, {
      'class': extra.classes.join(' ')
    });

    if (watchable) {
      attributes[DATA_FA_I2SVG] = '';
    }

    var styles = _objectSpread2({}, extra.styles);

    if (transformIsMeaningful(transform)) {
      styles['transform'] = transformForCss({
        transform: transform,
        startCentered: true,
        width: width,
        height: height
      });
      styles['-webkit-transform'] = styles['transform'];
    }

    var styleString = joinStyles(styles);

    if (styleString.length > 0) {
      attributes['style'] = styleString;
    }

    var val = [];
    val.push({
      tag: 'span',
      attributes: attributes,
      children: [content]
    });

    if (title) {
      val.push({
        tag: 'span',
        attributes: {
          class: 'sr-only'
        },
        children: [title]
      });
    }

    return val;
  }
  function makeLayersCounterAbstract(params) {
    var content = params.content,
        title = params.title,
        extra = params.extra;

    var attributes = _objectSpread2(_objectSpread2(_objectSpread2({}, extra.attributes), title ? {
      'title': title
    } : {}), {}, {
      'class': extra.classes.join(' ')
    });

    var styleString = joinStyles(extra.styles);

    if (styleString.length > 0) {
      attributes['style'] = styleString;
    }

    var val = [];
    val.push({
      tag: 'span',
      attributes: attributes,
      children: [content]
    });

    if (title) {
      val.push({
        tag: 'span',
        attributes: {
          class: 'sr-only'
        },
        children: [title]
      });
    }

    return val;
  }

  var styles$1 = namespace.styles;
  function asFoundIcon(icon) {
    var width = icon[0];
    var height = icon[1];

    var _icon$slice = icon.slice(4),
        _icon$slice2 = _slicedToArray(_icon$slice, 1),
        vectorData = _icon$slice2[0];

    var element = null;

    if (Array.isArray(vectorData)) {
      element = {
        tag: 'g',
        attributes: {
          class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.GROUP)
        },
        children: [{
          tag: 'path',
          attributes: {
            class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.SECONDARY),
            fill: 'currentColor',
            d: vectorData[0]
          }
        }, {
          tag: 'path',
          attributes: {
            class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.PRIMARY),
            fill: 'currentColor',
            d: vectorData[1]
          }
        }]
      };
    } else {
      element = {
        tag: 'path',
        attributes: {
          fill: 'currentColor',
          d: vectorData
        }
      };
    }

    return {
      found: true,
      width: width,
      height: height,
      icon: element
    };
  }
  var missingIconResolutionMixin = {
    found: false,
    width: 512,
    height: 512
  };

  function maybeNotifyMissing(iconName, prefix) {
    if (!PRODUCTION && !config.showMissingIcons && iconName) {
      console.error("Icon with name \"".concat(iconName, "\" and prefix \"").concat(prefix, "\" is missing."));
    }
  }

  function findIcon(iconName, prefix) {
    var givenPrefix = prefix;

    if (prefix === 'fa' && config.styleDefault !== null) {
      prefix = getDefaultUsablePrefix();
    }

    return new Promise(function (resolve, reject) {
      var val = {
        found: false,
        width: 512,
        height: 512,
        icon: callProvided('missingIconAbstract') || {}
      };

      if (givenPrefix === 'fa') {
        var shim = byOldName(iconName) || {};
        iconName = shim.iconName || iconName;
        prefix = shim.prefix || prefix;
      }

      if (iconName && prefix && styles$1[prefix] && styles$1[prefix][iconName]) {
        var icon = styles$1[prefix][iconName];
        return resolve(asFoundIcon(icon));
      }

      maybeNotifyMissing(iconName, prefix);
      resolve(_objectSpread2(_objectSpread2({}, missingIconResolutionMixin), {}, {
        icon: config.showMissingIcons && iconName ? callProvided('missingIconAbstract') || {} : {}
      }));
    });
  }

  var noop$1 = function noop() {};

  var p = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
    mark: noop$1,
    measure: noop$1
  };
  var preamble = "FA \"6.2.0\"";

  var begin = function begin(name) {
    p.mark("".concat(preamble, " ").concat(name, " begins"));
    return function () {
      return end(name);
    };
  };

  var end = function end(name) {
    p.mark("".concat(preamble, " ").concat(name, " ends"));
    p.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));
  };

  var perf = {
    begin: begin,
    end: end
  };

  var noop$2 = function noop() {};

  function isWatched(node) {
    var i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
    return typeof i2svg === 'string';
  }

  function hasPrefixAndIcon(node) {
    var prefix = node.getAttribute ? node.getAttribute(DATA_PREFIX) : null;
    var icon = node.getAttribute ? node.getAttribute(DATA_ICON) : null;
    return prefix && icon;
  }

  function hasBeenReplaced(node) {
    return node && node.classList && node.classList.contains && node.classList.contains(config.replacementClass);
  }

  function getMutator() {
    if (config.autoReplaceSvg === true) {
      return mutators.replace;
    }

    var mutator = mutators[config.autoReplaceSvg];
    return mutator || mutators.replace;
  }

  function createElementNS(tag) {
    return DOCUMENT.createElementNS('http://www.w3.org/2000/svg', tag);
  }

  function createElement(tag) {
    return DOCUMENT.createElement(tag);
  }

  function convertSVG(abstractObj) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _params$ceFn = params.ceFn,
        ceFn = _params$ceFn === void 0 ? abstractObj.tag === 'svg' ? createElementNS : createElement : _params$ceFn;

    if (typeof abstractObj === 'string') {
      return DOCUMENT.createTextNode(abstractObj);
    }

    var tag = ceFn(abstractObj.tag);
    Object.keys(abstractObj.attributes || []).forEach(function (key) {
      tag.setAttribute(key, abstractObj.attributes[key]);
    });
    var children = abstractObj.children || [];
    children.forEach(function (child) {
      tag.appendChild(convertSVG(child, {
        ceFn: ceFn
      }));
    });
    return tag;
  }

  function nodeAsComment(node) {
    var comment = " ".concat(node.outerHTML, " ");
    return comment;
  }

  var mutators = {
    replace: function replace(mutation) {
      var node = mutation[0];

      if (node.parentNode) {
        mutation[1].forEach(function (abstract) {
          node.parentNode.insertBefore(convertSVG(abstract), node);
        });

        if (node.getAttribute(DATA_FA_I2SVG) === null && config.keepOriginalSource) {
          var comment = DOCUMENT.createComment(nodeAsComment(node));
          node.parentNode.replaceChild(comment, node);
        } else {
          node.remove();
        }
      }
    },
    nest: function nest(mutation) {
      var node = mutation[0];
      var abstract = mutation[1]; // If we already have a replaced node we do not want to continue nesting within it.
      // Short-circuit to the standard replacement

      if (~classArray(node).indexOf(config.replacementClass)) {
        return mutators.replace(mutation);
      }

      var forSvg = new RegExp("".concat(config.cssPrefix, "-.*"));
      delete abstract[0].attributes.id;

      if (abstract[0].attributes.class) {
        var splitClasses = abstract[0].attributes.class.split(' ').reduce(function (acc, cls) {
          if (cls === config.replacementClass || cls.match(forSvg)) {
            acc.toSvg.push(cls);
          } else {
            acc.toNode.push(cls);
          }

          return acc;
        }, {
          toNode: [],
          toSvg: []
        });
        abstract[0].attributes.class = splitClasses.toSvg.join(' ');

        if (splitClasses.toNode.length === 0) {
          node.removeAttribute('class');
        } else {
          node.setAttribute('class', splitClasses.toNode.join(' '));
        }
      }

      var newInnerHTML = abstract.map(function (a) {
        return toHtml(a);
      }).join('\n');
      node.setAttribute(DATA_FA_I2SVG, '');
      node.innerHTML = newInnerHTML;
    }
  };

  function performOperationSync(op) {
    op();
  }

  function perform(mutations, callback) {
    var callbackFunction = typeof callback === 'function' ? callback : noop$2;

    if (mutations.length === 0) {
      callbackFunction();
    } else {
      var frame = performOperationSync;

      if (config.mutateApproach === MUTATION_APPROACH_ASYNC) {
        frame = WINDOW.requestAnimationFrame || performOperationSync;
      }

      frame(function () {
        var mutator = getMutator();
        var mark = perf.begin('mutate');
        mutations.map(mutator);
        mark();
        callbackFunction();
      });
    }
  }
  var disabled = false;
  function disableObservation() {
    disabled = true;
  }
  function enableObservation() {
    disabled = false;
  }
  var mo = null;
  function observe(options) {
    if (!MUTATION_OBSERVER) {
      return;
    }

    if (!config.observeMutations) {
      return;
    }

    var _options$treeCallback = options.treeCallback,
        treeCallback = _options$treeCallback === void 0 ? noop$2 : _options$treeCallback,
        _options$nodeCallback = options.nodeCallback,
        nodeCallback = _options$nodeCallback === void 0 ? noop$2 : _options$nodeCallback,
        _options$pseudoElemen = options.pseudoElementsCallback,
        pseudoElementsCallback = _options$pseudoElemen === void 0 ? noop$2 : _options$pseudoElemen,
        _options$observeMutat = options.observeMutationsRoot,
        observeMutationsRoot = _options$observeMutat === void 0 ? DOCUMENT : _options$observeMutat;
    mo = new MUTATION_OBSERVER(function (objects) {
      if (disabled) return;
      var defaultPrefix = getDefaultUsablePrefix();
      toArray(objects).forEach(function (mutationRecord) {
        if (mutationRecord.type === 'childList' && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
          if (config.searchPseudoElements) {
            pseudoElementsCallback(mutationRecord.target);
          }

          treeCallback(mutationRecord.target);
        }

        if (mutationRecord.type === 'attributes' && mutationRecord.target.parentNode && config.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target.parentNode);
        }

        if (mutationRecord.type === 'attributes' && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
          if (mutationRecord.attributeName === 'class' && hasPrefixAndIcon(mutationRecord.target)) {
            var _getCanonicalIcon = getCanonicalIcon(classArray(mutationRecord.target)),
                prefix = _getCanonicalIcon.prefix,
                iconName = _getCanonicalIcon.iconName;

            mutationRecord.target.setAttribute(DATA_PREFIX, prefix || defaultPrefix);
            if (iconName) mutationRecord.target.setAttribute(DATA_ICON, iconName);
          } else if (hasBeenReplaced(mutationRecord.target)) {
            nodeCallback(mutationRecord.target);
          }
        }
      });
    });
    if (!IS_DOM) return;
    mo.observe(observeMutationsRoot, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true
    });
  }
  function disconnect() {
    if (!mo) return;
    mo.disconnect();
  }

  function styleParser (node) {
    var style = node.getAttribute('style');
    var val = [];

    if (style) {
      val = style.split(';').reduce(function (acc, style) {
        var styles = style.split(':');
        var prop = styles[0];
        var value = styles.slice(1);

        if (prop && value.length > 0) {
          acc[prop] = value.join(':').trim();
        }

        return acc;
      }, {});
    }

    return val;
  }

  function classParser (node) {
    var existingPrefix = node.getAttribute('data-prefix');
    var existingIconName = node.getAttribute('data-icon');
    var innerText = node.innerText !== undefined ? node.innerText.trim() : '';
    var val = getCanonicalIcon(classArray(node));

    if (!val.prefix) {
      val.prefix = getDefaultUsablePrefix();
    }

    if (existingPrefix && existingIconName) {
      val.prefix = existingPrefix;
      val.iconName = existingIconName;
    }

    if (val.iconName && val.prefix) {
      return val;
    }

    if (val.prefix && innerText.length > 0) {
      val.iconName = byLigature(val.prefix, node.innerText) || byUnicode(val.prefix, toHex(node.innerText));
    }

    if (!val.iconName && config.autoFetchSvg && node.firstChild && node.firstChild.nodeType === Node.TEXT_NODE) {
      val.iconName = node.firstChild.data;
    }

    return val;
  }

  function attributesParser (node) {
    var extraAttributes = toArray(node.attributes).reduce(function (acc, attr) {
      if (acc.name !== 'class' && acc.name !== 'style') {
        acc[attr.name] = attr.value;
      }

      return acc;
    }, {});
    var title = node.getAttribute('title');
    var titleId = node.getAttribute('data-fa-title-id');

    if (config.autoA11y) {
      if (title) {
        extraAttributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
      } else {
        extraAttributes['aria-hidden'] = 'true';
        extraAttributes['focusable'] = 'false';
      }
    }

    return extraAttributes;
  }

  function blankMeta() {
    return {
      iconName: null,
      title: null,
      titleId: null,
      prefix: null,
      transform: meaninglessTransform,
      symbol: false,
      mask: {
        iconName: null,
        prefix: null,
        rest: []
      },
      maskId: null,
      extra: {
        classes: [],
        styles: {},
        attributes: {}
      }
    };
  }
  function parseMeta(node) {
    var parser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      styleParser: true
    };

    var _classParser = classParser(node),
        iconName = _classParser.iconName,
        prefix = _classParser.prefix,
        extraClasses = _classParser.rest;

    var extraAttributes = attributesParser(node);
    var pluginMeta = chainHooks('parseNodeAttributes', {}, node);
    var extraStyles = parser.styleParser ? styleParser(node) : [];
    return _objectSpread2({
      iconName: iconName,
      title: node.getAttribute('title'),
      titleId: node.getAttribute('data-fa-title-id'),
      prefix: prefix,
      transform: meaninglessTransform,
      mask: {
        iconName: null,
        prefix: null,
        rest: []
      },
      maskId: null,
      symbol: false,
      extra: {
        classes: extraClasses,
        styles: extraStyles,
        attributes: extraAttributes
      }
    }, pluginMeta);
  }

  var styles$2 = namespace.styles;

  function generateMutation(node) {
    var nodeMeta = config.autoReplaceSvg === 'nest' ? parseMeta(node, {
      styleParser: false
    }) : parseMeta(node);

    if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
      return callProvided('generateLayersText', node, nodeMeta);
    } else {
      return callProvided('generateSvgReplacementMutation', node, nodeMeta);
    }
  }

  var knownPrefixes = new Set();
  FAMILIES.map(function (family) {
    knownPrefixes.add("fa-".concat(family));
  });
  Object.keys(PREFIX_TO_STYLE[FAMILY_CLASSIC]).map(knownPrefixes.add.bind(knownPrefixes));
  Object.keys(PREFIX_TO_STYLE[FAMILY_SHARP]).map(knownPrefixes.add.bind(knownPrefixes));
  knownPrefixes = _toConsumableArray(knownPrefixes);

  function onTree(root) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (!IS_DOM) return Promise.resolve();
    var htmlClassList = DOCUMENT.documentElement.classList;

    var hclAdd = function hclAdd(suffix) {
      return htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    };

    var hclRemove = function hclRemove(suffix) {
      return htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    };

    var prefixes = config.autoFetchSvg ? knownPrefixes : FAMILIES.map(function (f) {
      return "fa-".concat(f);
    }).concat(Object.keys(styles$2));

    if (!prefixes.includes('fa')) {
      prefixes.push('fa');
    }

    var prefixesDomQuery = [".".concat(LAYERS_TEXT_CLASSNAME, ":not([").concat(DATA_FA_I2SVG, "])")].concat(prefixes.map(function (p) {
      return ".".concat(p, ":not([").concat(DATA_FA_I2SVG, "])");
    })).join(', ');

    if (prefixesDomQuery.length === 0) {
      return Promise.resolve();
    }

    var candidates = [];

    try {
      candidates = toArray(root.querySelectorAll(prefixesDomQuery));
    } catch (e) {// noop
    }

    if (candidates.length > 0) {
      hclAdd('pending');
      hclRemove('complete');
    } else {
      return Promise.resolve();
    }

    var mark = perf.begin('onTree');
    var mutations = candidates.reduce(function (acc, node) {
      try {
        var mutation = generateMutation(node);

        if (mutation) {
          acc.push(mutation);
        }
      } catch (e) {
        if (!PRODUCTION) {
          if (e.name === 'MissingIcon') {
            console.error(e);
          }
        }
      }

      return acc;
    }, []);
    return new Promise(function (resolve, reject) {
      Promise.all(mutations).then(function (resolvedMutations) {
        perform(resolvedMutations, function () {
          hclAdd('active');
          hclAdd('complete');
          hclRemove('pending');
          if (typeof callback === 'function') callback();
          mark();
          resolve();
        });
      }).catch(function (e) {
        mark();
        reject(e);
      });
    });
  }

  function onNode(node) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    generateMutation(node).then(function (mutation) {
      if (mutation) {
        perform([mutation], callback);
      }
    });
  }

  function resolveIcons(next) {
    return function (maybeIconDefinition) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
      var mask = params.mask;

      if (mask) {
        mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
      }

      return next(iconDefinition, _objectSpread2(_objectSpread2({}, params), {}, {
        mask: mask
      }));
    };
  }

  var render = function render(iconDefinition) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _params$transform = params.transform,
        transform = _params$transform === void 0 ? meaninglessTransform : _params$transform,
        _params$symbol = params.symbol,
        symbol = _params$symbol === void 0 ? false : _params$symbol,
        _params$mask = params.mask,
        mask = _params$mask === void 0 ? null : _params$mask,
        _params$maskId = params.maskId,
        maskId = _params$maskId === void 0 ? null : _params$maskId,
        _params$title = params.title,
        title = _params$title === void 0 ? null : _params$title,
        _params$titleId = params.titleId,
        titleId = _params$titleId === void 0 ? null : _params$titleId,
        _params$classes = params.classes,
        classes = _params$classes === void 0 ? [] : _params$classes,
        _params$attributes = params.attributes,
        attributes = _params$attributes === void 0 ? {} : _params$attributes,
        _params$styles = params.styles,
        styles = _params$styles === void 0 ? {} : _params$styles;
    if (!iconDefinition) return;
    var prefix = iconDefinition.prefix,
        iconName = iconDefinition.iconName,
        icon = iconDefinition.icon;
    return domVariants(_objectSpread2({
      type: 'icon'
    }, iconDefinition), function () {
      callHooks('beforeDOMElementCreation', {
        iconDefinition: iconDefinition,
        params: params
      });

      if (config.autoA11y) {
        if (title) {
          attributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
        } else {
          attributes['aria-hidden'] = 'true';
          attributes['focusable'] = 'false';
        }
      }

      return makeInlineSvgAbstract({
        icons: {
          main: asFoundIcon(icon),
          mask: mask ? asFoundIcon(mask.icon) : {
            found: false,
            width: null,
            height: null,
            icon: {}
          }
        },
        prefix: prefix,
        iconName: iconName,
        transform: _objectSpread2(_objectSpread2({}, meaninglessTransform), transform),
        symbol: symbol,
        title: title,
        maskId: maskId,
        titleId: titleId,
        extra: {
          attributes: attributes,
          styles: styles,
          classes: classes
        }
      });
    });
  };
  var ReplaceElements = {
    mixout: function mixout() {
      return {
        icon: resolveIcons(render)
      };
    },
    hooks: function hooks() {
      return {
        mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
          accumulator.treeCallback = onTree;
          accumulator.nodeCallback = onNode;
          return accumulator;
        }
      };
    },
    provides: function provides(providers$$1) {
      providers$$1.i2svg = function (params) {
        var _params$node = params.node,
            node = _params$node === void 0 ? DOCUMENT : _params$node,
            _params$callback = params.callback,
            callback = _params$callback === void 0 ? function () {} : _params$callback;
        return onTree(node, callback);
      };

      providers$$1.generateSvgReplacementMutation = function (node, nodeMeta) {
        var iconName = nodeMeta.iconName,
            title = nodeMeta.title,
            titleId = nodeMeta.titleId,
            prefix = nodeMeta.prefix,
            transform = nodeMeta.transform,
            symbol = nodeMeta.symbol,
            mask = nodeMeta.mask,
            maskId = nodeMeta.maskId,
            extra = nodeMeta.extra;
        return new Promise(function (resolve, reject) {
          Promise.all([findIcon(iconName, prefix), mask.iconName ? findIcon(mask.iconName, mask.prefix) : Promise.resolve({
            found: false,
            width: 512,
            height: 512,
            icon: {}
          })]).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                main = _ref2[0],
                mask = _ref2[1];

            resolve([node, makeInlineSvgAbstract({
              icons: {
                main: main,
                mask: mask
              },
              prefix: prefix,
              iconName: iconName,
              transform: transform,
              symbol: symbol,
              maskId: maskId,
              title: title,
              titleId: titleId,
              extra: extra,
              watchable: true
            })]);
          }).catch(reject);
        });
      };

      providers$$1.generateAbstractIcon = function (_ref3) {
        var children = _ref3.children,
            attributes = _ref3.attributes,
            main = _ref3.main,
            transform = _ref3.transform,
            styles = _ref3.styles;
        var styleString = joinStyles(styles);

        if (styleString.length > 0) {
          attributes['style'] = styleString;
        }

        var nextChild;

        if (transformIsMeaningful(transform)) {
          nextChild = callProvided('generateAbstractTransformGrouping', {
            main: main,
            transform: transform,
            containerWidth: main.width,
            iconWidth: main.width
          });
        }

        children.push(nextChild || main.icon);
        return {
          children: children,
          attributes: attributes
        };
      };
    }
  };

  var Layers = {
    mixout: function mixout() {
      return {
        layer: function layer(assembler) {
          var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var _params$classes = params.classes,
              classes = _params$classes === void 0 ? [] : _params$classes;
          return domVariants({
            type: 'layer'
          }, function () {
            callHooks('beforeDOMElementCreation', {
              assembler: assembler,
              params: params
            });
            var children = [];
            assembler(function (args) {
              Array.isArray(args) ? args.map(function (a) {
                children = children.concat(a.abstract);
              }) : children = children.concat(args.abstract);
            });
            return [{
              tag: 'span',
              attributes: {
                class: ["".concat(config.cssPrefix, "-layers")].concat(_toConsumableArray(classes)).join(' ')
              },
              children: children
            }];
          });
        }
      };
    }
  };

  var LayersCounter = {
    mixout: function mixout() {
      return {
        counter: function counter(content) {
          var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var _params$title = params.title,
              title = _params$title === void 0 ? null : _params$title,
              _params$classes = params.classes,
              classes = _params$classes === void 0 ? [] : _params$classes,
              _params$attributes = params.attributes,
              attributes = _params$attributes === void 0 ? {} : _params$attributes,
              _params$styles = params.styles,
              styles = _params$styles === void 0 ? {} : _params$styles;
          return domVariants({
            type: 'counter',
            content: content
          }, function () {
            callHooks('beforeDOMElementCreation', {
              content: content,
              params: params
            });
            return makeLayersCounterAbstract({
              content: content.toString(),
              title: title,
              extra: {
                attributes: attributes,
                styles: styles,
                classes: ["".concat(config.cssPrefix, "-layers-counter")].concat(_toConsumableArray(classes))
              }
            });
          });
        }
      };
    }
  };

  var LayersText = {
    mixout: function mixout() {
      return {
        text: function text(content) {
          var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var _params$transform = params.transform,
              transform = _params$transform === void 0 ? meaninglessTransform : _params$transform,
              _params$title = params.title,
              title = _params$title === void 0 ? null : _params$title,
              _params$classes = params.classes,
              classes = _params$classes === void 0 ? [] : _params$classes,
              _params$attributes = params.attributes,
              attributes = _params$attributes === void 0 ? {} : _params$attributes,
              _params$styles = params.styles,
              styles = _params$styles === void 0 ? {} : _params$styles;
          return domVariants({
            type: 'text',
            content: content
          }, function () {
            callHooks('beforeDOMElementCreation', {
              content: content,
              params: params
            });
            return makeLayersTextAbstract({
              content: content,
              transform: _objectSpread2(_objectSpread2({}, meaninglessTransform), transform),
              title: title,
              extra: {
                attributes: attributes,
                styles: styles,
                classes: ["".concat(config.cssPrefix, "-layers-text")].concat(_toConsumableArray(classes))
              }
            });
          });
        }
      };
    },
    provides: function provides(providers$$1) {
      providers$$1.generateLayersText = function (node, nodeMeta) {
        var title = nodeMeta.title,
            transform = nodeMeta.transform,
            extra = nodeMeta.extra;
        var width = null;
        var height = null;

        if (IS_IE) {
          var computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
          var boundingClientRect = node.getBoundingClientRect();
          width = boundingClientRect.width / computedFontSize;
          height = boundingClientRect.height / computedFontSize;
        }

        if (config.autoA11y && !title) {
          extra.attributes['aria-hidden'] = 'true';
        }

        return Promise.resolve([node, makeLayersTextAbstract({
          content: node.innerHTML,
          width: width,
          height: height,
          transform: transform,
          title: title,
          extra: extra,
          watchable: true
        })]);
      };
    }
  };

  var CLEAN_CONTENT_PATTERN = new RegExp("\"", 'ug');
  var SECONDARY_UNICODE_RANGE = [1105920, 1112319];
  function hexValueFromContent(content) {
    var cleaned = content.replace(CLEAN_CONTENT_PATTERN, '');
    var codePoint = codePointAt(cleaned, 0);
    var isPrependTen = codePoint >= SECONDARY_UNICODE_RANGE[0] && codePoint <= SECONDARY_UNICODE_RANGE[1];
    var isDoubled = cleaned.length === 2 ? cleaned[0] === cleaned[1] : false;
    return {
      value: isDoubled ? toHex(cleaned[0]) : toHex(cleaned),
      isSecondary: isPrependTen || isDoubled
    };
  }

  function replaceForPosition(node, position) {
    var pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(':', '-'));
    return new Promise(function (resolve, reject) {
      if (node.getAttribute(pendingAttribute) !== null) {
        // This node is already being processed
        return resolve();
      }

      var children = toArray(node.children);
      var alreadyProcessedPseudoElement = children.filter(function (c) {
        return c.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position;
      })[0];
      var styles = WINDOW.getComputedStyle(node, position);
      var fontFamily = styles.getPropertyValue('font-family').match(FONT_FAMILY_PATTERN);
      var fontWeight = styles.getPropertyValue('font-weight');
      var content = styles.getPropertyValue('content');

      if (alreadyProcessedPseudoElement && !fontFamily) {
        // If we've already processed it but the current computed style does not result in a font-family,
        // that probably means that a class name that was previously present to make the icon has been
        // removed. So we now should delete the icon.
        node.removeChild(alreadyProcessedPseudoElement);
        return resolve();
      } else if (fontFamily && content !== 'none' && content !== '') {
        var _content = styles.getPropertyValue('content');

        var family = ~['Sharp'].indexOf(fontFamily[2]) ? FAMILY_SHARP : FAMILY_CLASSIC;
        var prefix = ~['Solid', 'Regular', 'Light', 'Thin', 'Duotone', 'Brands', 'Kit'].indexOf(fontFamily[2]) ? STYLE_TO_PREFIX[family][fontFamily[2].toLowerCase()] : FONT_WEIGHT_TO_PREFIX[family][fontWeight];

        var _hexValueFromContent = hexValueFromContent(_content),
            hexValue = _hexValueFromContent.value,
            isSecondary = _hexValueFromContent.isSecondary;

        var isV4 = fontFamily[0].startsWith('FontAwesome');
        var iconName = byUnicode(prefix, hexValue);
        var iconIdentifier = iconName;

        if (isV4) {
          var iconName4 = byOldUnicode(hexValue);

          if (iconName4.iconName && iconName4.prefix) {
            iconName = iconName4.iconName;
            prefix = iconName4.prefix;
          }
        } // Only convert the pseudo element in this ::before/::after position into an icon if we haven't
        // already done so with the same prefix and iconName


        if (iconName && !isSecondary && (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconIdentifier)) {
          node.setAttribute(pendingAttribute, iconIdentifier);

          if (alreadyProcessedPseudoElement) {
            // Delete the old one, since we're replacing it with a new one
            node.removeChild(alreadyProcessedPseudoElement);
          }

          var meta = blankMeta();
          var extra = meta.extra;
          extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;
          findIcon(iconName, prefix).then(function (main) {
            var abstract = makeInlineSvgAbstract(_objectSpread2(_objectSpread2({}, meta), {}, {
              icons: {
                main: main,
                mask: emptyCanonicalIcon()
              },
              prefix: prefix,
              iconName: iconIdentifier,
              extra: extra,
              watchable: true
            }));
            var element = DOCUMENT.createElement('svg');

            if (position === '::before') {
              node.insertBefore(element, node.firstChild);
            } else {
              node.appendChild(element);
            }

            element.outerHTML = abstract.map(function (a) {
              return toHtml(a);
            }).join('\n');
            node.removeAttribute(pendingAttribute);
            resolve();
          }).catch(reject);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    });
  }

  function replace(node) {
    return Promise.all([replaceForPosition(node, '::before'), replaceForPosition(node, '::after')]);
  }

  function processable(node) {
    return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== 'svg');
  }

  function searchPseudoElements(root) {
    if (!IS_DOM) return;
    return new Promise(function (resolve, reject) {
      var operations = toArray(root.querySelectorAll('*')).filter(processable).map(replace);
      var end = perf.begin('searchPseudoElements');
      disableObservation();
      Promise.all(operations).then(function () {
        end();
        enableObservation();
        resolve();
      }).catch(function () {
        end();
        enableObservation();
        reject();
      });
    });
  }

  var PseudoElements = {
    hooks: function hooks() {
      return {
        mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
          accumulator.pseudoElementsCallback = searchPseudoElements;
          return accumulator;
        }
      };
    },
    provides: function provides(providers$$1) {
      providers$$1.pseudoElements2svg = function (params) {
        var _params$node = params.node,
            node = _params$node === void 0 ? DOCUMENT : _params$node;

        if (config.searchPseudoElements) {
          searchPseudoElements(node);
        }
      };
    }
  };

  var _unwatched = false;
  var MutationObserver$1 = {
    mixout: function mixout() {
      return {
        dom: {
          unwatch: function unwatch() {
            disableObservation();
            _unwatched = true;
          }
        }
      };
    },
    hooks: function hooks() {
      return {
        bootstrap: function bootstrap() {
          observe(chainHooks('mutationObserverCallbacks', {}));
        },
        noAuto: function noAuto() {
          disconnect();
        },
        watch: function watch(params) {
          var observeMutationsRoot = params.observeMutationsRoot;

          if (_unwatched) {
            enableObservation();
          } else {
            observe(chainHooks('mutationObserverCallbacks', {
              observeMutationsRoot: observeMutationsRoot
            }));
          }
        }
      };
    }
  };

  var parseTransformString = function parseTransformString(transformString) {
    var transform = {
      size: 16,
      x: 0,
      y: 0,
      flipX: false,
      flipY: false,
      rotate: 0
    };
    return transformString.toLowerCase().split(' ').reduce(function (acc, n) {
      var parts = n.toLowerCase().split('-');
      var first = parts[0];
      var rest = parts.slice(1).join('-');

      if (first && rest === 'h') {
        acc.flipX = true;
        return acc;
      }

      if (first && rest === 'v') {
        acc.flipY = true;
        return acc;
      }

      rest = parseFloat(rest);

      if (isNaN(rest)) {
        return acc;
      }

      switch (first) {
        case 'grow':
          acc.size = acc.size + rest;
          break;

        case 'shrink':
          acc.size = acc.size - rest;
          break;

        case 'left':
          acc.x = acc.x - rest;
          break;

        case 'right':
          acc.x = acc.x + rest;
          break;

        case 'up':
          acc.y = acc.y - rest;
          break;

        case 'down':
          acc.y = acc.y + rest;
          break;

        case 'rotate':
          acc.rotate = acc.rotate + rest;
          break;
      }

      return acc;
    }, transform);
  };
  var PowerTransforms = {
    mixout: function mixout() {
      return {
        parse: {
          transform: function transform(transformString) {
            return parseTransformString(transformString);
          }
        }
      };
    },
    hooks: function hooks() {
      return {
        parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
          var transformString = node.getAttribute('data-fa-transform');

          if (transformString) {
            accumulator.transform = parseTransformString(transformString);
          }

          return accumulator;
        }
      };
    },
    provides: function provides(providers) {
      providers.generateAbstractTransformGrouping = function (_ref) {
        var main = _ref.main,
            transform = _ref.transform,
            containerWidth = _ref.containerWidth,
            iconWidth = _ref.iconWidth;
        var outer = {
          transform: "translate(".concat(containerWidth / 2, " 256)")
        };
        var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
        var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
        var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
        var inner = {
          transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
        };
        var path = {
          transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
        };
        var operations = {
          outer: outer,
          inner: inner,
          path: path
        };
        return {
          tag: 'g',
          attributes: _objectSpread2({}, operations.outer),
          children: [{
            tag: 'g',
            attributes: _objectSpread2({}, operations.inner),
            children: [{
              tag: main.icon.tag,
              children: main.icon.children,
              attributes: _objectSpread2(_objectSpread2({}, main.icon.attributes), operations.path)
            }]
          }]
        };
      };
    }
  };

  var ALL_SPACE = {
    x: 0,
    y: 0,
    width: '100%',
    height: '100%'
  };

  function fillBlack(abstract) {
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (abstract.attributes && (abstract.attributes.fill || force)) {
      abstract.attributes.fill = 'black';
    }

    return abstract;
  }

  function deGroup(abstract) {
    if (abstract.tag === 'g') {
      return abstract.children;
    } else {
      return [abstract];
    }
  }

  var Masks = {
    hooks: function hooks() {
      return {
        parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
          var maskData = node.getAttribute('data-fa-mask');
          var mask = !maskData ? emptyCanonicalIcon() : getCanonicalIcon(maskData.split(' ').map(function (i) {
            return i.trim();
          }));

          if (!mask.prefix) {
            mask.prefix = getDefaultUsablePrefix();
          }

          accumulator.mask = mask;
          accumulator.maskId = node.getAttribute('data-fa-mask-id');
          return accumulator;
        }
      };
    },
    provides: function provides(providers) {
      providers.generateAbstractMask = function (_ref) {
        var children = _ref.children,
            attributes = _ref.attributes,
            main = _ref.main,
            mask = _ref.mask,
            explicitMaskId = _ref.maskId,
            transform = _ref.transform;
        var mainWidth = main.width,
            mainPath = main.icon;
        var maskWidth = mask.width,
            maskPath = mask.icon;
        var trans = transformForSvg({
          transform: transform,
          containerWidth: maskWidth,
          iconWidth: mainWidth
        });
        var maskRect = {
          tag: 'rect',
          attributes: _objectSpread2(_objectSpread2({}, ALL_SPACE), {}, {
            fill: 'white'
          })
        };
        var maskInnerGroupChildrenMixin = mainPath.children ? {
          children: mainPath.children.map(fillBlack)
        } : {};
        var maskInnerGroup = {
          tag: 'g',
          attributes: _objectSpread2({}, trans.inner),
          children: [fillBlack(_objectSpread2({
            tag: mainPath.tag,
            attributes: _objectSpread2(_objectSpread2({}, mainPath.attributes), trans.path)
          }, maskInnerGroupChildrenMixin))]
        };
        var maskOuterGroup = {
          tag: 'g',
          attributes: _objectSpread2({}, trans.outer),
          children: [maskInnerGroup]
        };
        var maskId = "mask-".concat(explicitMaskId || nextUniqueId());
        var clipId = "clip-".concat(explicitMaskId || nextUniqueId());
        var maskTag = {
          tag: 'mask',
          attributes: _objectSpread2(_objectSpread2({}, ALL_SPACE), {}, {
            id: maskId,
            maskUnits: 'userSpaceOnUse',
            maskContentUnits: 'userSpaceOnUse'
          }),
          children: [maskRect, maskOuterGroup]
        };
        var defs = {
          tag: 'defs',
          children: [{
            tag: 'clipPath',
            attributes: {
              id: clipId
            },
            children: deGroup(maskPath)
          }, maskTag]
        };
        children.push(defs, {
          tag: 'rect',
          attributes: _objectSpread2({
            fill: 'currentColor',
            'clip-path': "url(#".concat(clipId, ")"),
            mask: "url(#".concat(maskId, ")")
          }, ALL_SPACE)
        });
        return {
          children: children,
          attributes: attributes
        };
      };
    }
  };

  var MissingIconIndicator = {
    provides: function provides(providers) {
      var reduceMotion = false;

      if (WINDOW.matchMedia) {
        reduceMotion = WINDOW.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }

      providers.missingIconAbstract = function () {
        var gChildren = [];
        var FILL = {
          fill: 'currentColor'
        };
        var ANIMATION_BASE = {
          attributeType: 'XML',
          repeatCount: 'indefinite',
          dur: '2s'
        }; // Ring

        gChildren.push({
          tag: 'path',
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
          })
        });

        var OPACITY_ANIMATE = _objectSpread2(_objectSpread2({}, ANIMATION_BASE), {}, {
          attributeName: 'opacity'
        });

        var dot = {
          tag: 'circle',
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            cx: '256',
            cy: '364',
            r: '28'
          }),
          children: []
        };

        if (!reduceMotion) {
          dot.children.push({
            tag: 'animate',
            attributes: _objectSpread2(_objectSpread2({}, ANIMATION_BASE), {}, {
              attributeName: 'r',
              values: '28;14;28;28;14;28;'
            })
          }, {
            tag: 'animate',
            attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
              values: '1;0;1;1;0;1;'
            })
          });
        }

        gChildren.push(dot);
        gChildren.push({
          tag: 'path',
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            opacity: '1',
            d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
          }),
          children: reduceMotion ? [] : [{
            tag: 'animate',
            attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
              values: '1;0;0;0;0;1;'
            })
          }]
        });

        if (!reduceMotion) {
          // Exclamation
          gChildren.push({
            tag: 'path',
            attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
              opacity: '0',
              d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
            }),
            children: [{
              tag: 'animate',
              attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
                values: '0;0;1;1;0;0;'
              })
            }]
          });
        }

        return {
          tag: 'g',
          attributes: {
            'class': 'missing'
          },
          children: gChildren
        };
      };
    }
  };

  var SvgSymbols = {
    hooks: function hooks() {
      return {
        parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
          var symbolData = node.getAttribute('data-fa-symbol');
          var symbol = symbolData === null ? false : symbolData === '' ? true : symbolData;
          accumulator['symbol'] = symbol;
          return accumulator;
        }
      };
    }
  };

  var plugins = [InjectCSS, ReplaceElements, Layers, LayersCounter, LayersText, PseudoElements, MutationObserver$1, PowerTransforms, Masks, MissingIconIndicator, SvgSymbols];

  registerPlugins(plugins, {
    mixoutsTo: api
  });
  bunker(bootstrap);

}());
