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
    "trees": [640, 512, [], "f724", "M626.6 357.9l-35.73-41.22c6.686-4.938 12.17-11.53 15.84-19.47c8.295-17.88 5.514-38.34-7.295-53.53l-31.02-36.44c4.578-4.156 8.295-9.25 10.84-15.03c6.92-15.75 3.873-33.53-7.936-46.38l-120.4-130.8C442.1 5.469 429.4 0 416 0s-26.13 5.5-34.88 15.03l-39.35 42.78l32.34 35.14l41.48-45.42l114 123.9h-54.71l85.54 107.2h-66.11l95.99 110.8c2.422 2.781 1.625 5.75 .9375 7.25C590.2 398.8 588.6 400 586.3 400h-138.9c1.816-15.02-2.506-30.18-12.83-42.09l-35.73-41.22c6.686-4.938 12.17-11.53 15.84-19.47c8.295-17.88 5.514-38.34-7.295-53.53l-31.02-36.44c4.578-4.156 8.295-9.25 10.84-15.03c6.92-15.75 3.873-33.53-7.936-46.38L258.9 15.03C250.1 5.469 237.4 0 224 0S197.9 5.5 189.1 15.03L68.81 145.8C57.01 158.7 53.98 176.5 60.9 192.2C63.43 198 67.13 203.1 71.7 207.2L40.55 243.8C27.8 258.9 25.04 279.4 33.33 297.2c3.688 7.938 9.154 14.56 15.82 19.47l-35.69 41.22c-14.21 16.38-17.43 38.84-8.404 58.63C13.91 435.9 32.52 448 53.62 448h146.6l.0391 40.03C200.3 501.3 211.1 512 224.3 512c0 0-.0156 0 0 0c13.25 0 23.99-10.78 23.98-24.03L248.3 448h144l.0059 40.03C392.3 501.3 403.1 512 416.3 512c0 0-.0156 0 0 0c13.25 0 23.99-10.78 23.98-24.03L440.3 448h146.1c21.1 0 39.72-12.06 48.58-31.47C643.1 396.7 640.8 374.3 626.6 357.9zM248.2 400l-.0215-22.25l40.77-40.78c9.373-9.375 9.373-24.56 0-33.94c-9.371-9.375-24.55-9.375-33.93 0L248.1 309.9L247.1 183.1C247.1 170.7 237.2 160 223.1 160c0 0 .0156 0 0 0C210.7 160 199.1 170.8 200 184l.0449 46.08L192.1 223c-9.373-9.375-24.56-9.375-33.93 0s-9.373 24.56 0 33.94l41.07 41.08L200.1 400H53.62c-2.234 0-3.875-1.125-4.906-3.375c-.6855-1.5-1.467-4.438 1-7.281l95.99-110.8H79.58l85.63-107.2H110.5L223.6 47.53l114 123.9H282.9l85.54 107.2H302.3l95.99 110.8c2.422 2.781 1.625 5.75 .9375 7.25C398.2 398.8 396.6 400 394.3 400H248.2z"],
    "bars": [448, 512, ["navicon"], "f0c9", "M0 88C0 74.75 10.75 64 24 64H424C437.3 64 448 74.75 448 88C448 101.3 437.3 112 424 112H24C10.75 112 0 101.3 0 88zM0 248C0 234.7 10.75 224 24 224H424C437.3 224 448 234.7 448 248C448 261.3 437.3 272 424 272H24C10.75 272 0 261.3 0 248zM424 432H24C10.75 432 0 421.3 0 408C0 394.7 10.75 384 24 384H424C437.3 384 448 394.7 448 408C448 421.3 437.3 432 424 432z"],
    "campground": [576, 512, [9978], "f6bb", "M375.4 5.587C385.6 14.09 386.9 29.22 378.4 39.39L319.3 110.1L554.1 392.1C563.4 402.1 568 414.8 568 427.1V456C568 486.9 542.9 512 512 512H64C33.07 512 8 486.9 8 456V427.1C8 414.8 12.61 402.1 21.04 392.1L256.7 110.1L197.6 39.39C189.1 29.22 190.4 14.09 200.6 5.587C210.8-2.914 225.9-1.562 234.4 8.608L288 72.71L341.6 8.608C350.1-1.562 365.2-2.914 375.4 5.587V5.587zM56 427.1V456C56 460.4 59.58 464 64 464H126L269.1 281.2C273.6 275.4 280.6 272 288 272C295.4 272 302.4 275.4 306.9 281.2L449.1 464H512C516.4 464 520 460.4 520 456V427.1C520 426.1 519.3 424.3 518.1 422.8L288 147.5L57.86 422.8C56.66 424.3 56 426.1 56 427.1V427.1zM186.1 464H389L288 334.9L186.1 464z"],
    "tree": [448, 512, [127794], "f1bb", "M434.7 357.9l-35.73-41.22c6.688-4.938 12.17-11.53 15.84-19.47c8.297-17.88 5.516-38.34-7.297-53.53l-31.03-36.44c4.578-4.156 8.297-9.25 10.84-15.03c6.922-15.75 3.875-33.53-7.938-46.38l-120.4-130.8C250.1 5.469 237.4 0 224 0S197.9 5.5 189.1 15.03L68.77 145.8C56.97 158.7 53.94 176.5 60.86 192.2C63.39 198 67.09 203.1 71.66 207.2L40.5 243.8C27.75 258.9 24.98 279.4 33.28 297.2C36.97 305.2 42.44 311.8 49.11 316.7l-35.7 41.22c-14.22 16.38-17.44 38.84-8.406 58.63C13.86 435.9 32.47 448 53.58 448h146.7l.0391 40.03C200.3 501.3 210.9 512 224.1 512c0 0-.0156 0 0 0c13.25 0 24.2-10.78 24.18-24.03L248.3 448h146.1c21.11 0 39.73-12.06 48.59-31.47C452 396.7 448.8 374.3 434.7 357.9zM399.3 396.6C398.3 398.8 396.6 400 394.4 400h-146.2l-.0215-22.25l40.78-40.78c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0l-6.908 6.908L248 183.1c-.0156-13.25-10.75-23.97-24-23.97c0 0 .0156 0 0 0c-13.25 0-24.01 10.79-23.1 24.04l.0449 46.08L192.1 223c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L200.1 298L200.2 400H53.58c-2.234 0-3.875-1.125-4.906-3.375c-.6875-1.5-1.469-4.438 1-7.281l96.02-110.8H79.55l85.66-107.2H110.4L223.6 47.53l114 123.9h-54.72l85.56 107.2h-66.13l96.02 110.8C400.8 392.1 400 395.1 399.3 396.6z"],
    "users": [640, 512, [], "f0c0", "M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM319.9 160c30.85 0 55.96 25.12 55.96 56S350.7 272 319.9 272S263.9 246.9 263.9 216S289 160 319.9 160zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM178.1 464c10.47-36.76 47.36-64 91.14-64H369.9c43.77 0 80.66 27.24 91.14 64H178.1zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160z"],
    "angle-right": [256, 512, [8250], "f105", "M89.45 87.5l143.1 152c4.375 4.625 6.562 10.56 6.562 16.5c0 5.937-2.188 11.87-6.562 16.5l-143.1 152C80.33 434.1 65.14 434.5 55.52 425.4c-9.688-9.125-10.03-24.38-.9375-33.94l128.4-135.5l-128.4-135.5C45.49 110.9 45.83 95.75 55.52 86.56C65.14 77.47 80.33 77.87 89.45 87.5z"],
    "user": [448, 512, [128100, 62144], "f007", "M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z"],
    "star": [576, 512, [11088, 61446], "f005", "M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z"],
    "wifi": [640, 512, ["wifi-3", "wifi-strong"], "f1eb", "M319.1 367.1C289.1 367.1 264 393.1 264 424s25.07 56 55.1 56S376 454.9 376 424S350.9 367.1 319.1 367.1zM632.5 150.6C553.3 75.22 439.4 32 320 32S86.72 75.22 7.473 150.6c-9.625 9.125-10 24.31-.8438 33.91c9.062 9.594 24.31 10 33.91 .8438C110.1 118.4 212.8 80 320 80s209 38.41 279.5 105.4C604.1 189.8 610.1 192 615.1 192c6.344 0 12.69-2.5 17.38-7.469C642.5 174.9 642.2 159.8 632.5 150.6zM320 207.9c-76.63 0-147.9 28-200.6 78.75C109.8 295.9 109.5 311.1 118.7 320.6c9.219 9.625 24.41 9.844 33.94 .6875C196.4 279.2 255.8 256 320 256s123.6 23.19 167.4 65.31C492 325.8 497.1 328 503.1 328c6.281 0 12.59-2.469 17.31-7.375c9.188-9.531 8.875-24.72-.6875-33.94C467.9 235.9 396.6 207.9 320 207.9z"],
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
    "magnifying-glass": [512, 512, [128269, "search"], "f002", "M504.1 471l-134-134C399.1 301.5 415.1 256.8 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c48.79 0 93.55-16.91 129-45.04l134 134C475.7 509.7 481.9 512 488 512s12.28-2.344 16.97-7.031C514.3 495.6 514.3 480.4 504.1 471zM48 208c0-88.22 71.78-160 160-160s160 71.78 160 160s-71.78 160-160 160S48 296.2 48 208z"],
    "plus": [448, 512, [10133, 61543, "add"], "2b", "M432 256C432 269.3 421.3 280 408 280h-160v160c0 13.25-10.75 24.01-24 24.01S200 453.3 200 440v-160h-160c-13.25 0-24-10.74-24-23.99C16 242.8 26.75 232 40 232h160v-160c0-13.25 10.75-23.99 24-23.99S248 58.75 248 72v160h160C421.3 232 432 242.8 432 256z"],
    "spinner": [512, 512, [], "f110", "M288 32C288 49.67 273.7 64 256 64C238.3 64 224 49.67 224 32C224 14.33 238.3 0 256 0C273.7 0 288 14.33 288 32zM288 480C288 497.7 273.7 512 256 512C238.3 512 224 497.7 224 480C224 462.3 238.3 448 256 448C273.7 448 288 462.3 288 480zM480 224C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288C462.3 288 448 273.7 448 256C448 238.3 462.3 224 480 224zM32 288C14.33 288 0 273.7 0 256C0 238.3 14.33 224 32 224C49.67 224 64 238.3 64 256C64 273.7 49.67 288 32 288zM74.98 391.8C87.48 379.3 107.7 379.3 120.2 391.8C132.7 404.3 132.7 424.5 120.2 437C107.7 449.5 87.48 449.5 74.98 437C62.48 424.5 62.48 404.3 74.98 391.8zM391.8 437C379.3 424.5 379.3 404.3 391.8 391.8C404.3 379.3 424.5 379.3 437 391.8C449.5 404.3 449.5 424.5 437 437C424.5 449.5 404.3 449.5 391.8 437zM120.2 74.98C132.7 87.48 132.7 107.7 120.2 120.2C107.7 132.7 87.48 132.7 74.98 120.2C62.48 107.7 62.48 87.48 74.98 74.98C87.48 62.49 107.7 62.49 120.2 74.98z"],
    "gears": [640, 512, ["cogs"], "f085", "M119.1 176C119.1 153.9 137.9 136 159.1 136C182.1 136 199.1 153.9 199.1 176C199.1 198.1 182.1 216 159.1 216C137.9 216 119.1 198.1 119.1 176zM207.3 23.36L213.9 51.16C223.4 55.3 232.4 60.5 240.6 66.61L267.7 58.52C273.2 56.85 279.3 58.3 283.3 62.62C299.5 80.44 311.9 101.8 319.3 125.4C321.1 130.9 319.3 136.9 315.1 140.9L294.1 160C295.7 165.5 295.1 171.1 295.1 176.8C295.1 181.1 295.7 187.1 295.2 192.1L315.1 211.1C319.3 215.1 321.1 221.1 319.3 226.6C311.9 250.2 299.5 271.6 283.3 289.4C279.3 293.7 273.2 295.2 267.7 293.5L242.1 285.8C233.3 292.5 223.7 298.1 213.5 302.6L207.3 328.6C205.1 334.3 201.7 338.8 196 340.1C184.4 342.6 172.4 344 159.1 344C147.6 344 135.6 342.6 123.1 340.1C118.3 338.8 114 334.3 112.7 328.6L106.5 302.6C96.26 298.1 86.67 292.5 77.91 285.8L52.34 293.5C46.75 295.2 40.65 293.7 36.73 289.4C20.5 271.6 8.055 250.2 .6513 226.6C-1.078 221.1 .6929 215.1 4.879 211.1L24.85 192.1C24.29 187.1 24 181.1 24 176.8C24 171.1 24.34 165.5 25.01 160L4.879 140.9C.6936 136.9-1.077 130.9 .652 125.4C8.056 101.8 20.51 80.44 36.73 62.62C40.65 58.3 46.75 56.85 52.34 58.52L79.38 66.61C87.62 60.5 96.57 55.3 106.1 51.17L112.7 23.36C114 17.71 118.3 13.17 123.1 11.91C135.6 9.35 147.6 8 159.1 8C172.4 8 184.4 9.35 196 11.91C201.7 13.16 205.1 17.71 207.3 23.36L207.3 23.36zM63.1 176.8C63.1 180.5 64.21 184.1 64.6 187.7L66.79 207.4L44.25 228.9C47.68 236.5 51.84 243.7 56.63 250.4L85.96 241.7L102.2 254C108.4 258.7 115.1 262.7 122.3 265.8L140.8 273.8L147.8 303.4C151.8 303.8 155.9 304 159.1 304C164.1 304 168.2 303.8 172.2 303.4L179.2 273.8L197.7 265.8C204.9 262.7 211.6 258.7 217.8 254L234 241.7L263.4 250.4C268.2 243.7 272.3 236.5 275.7 228.9L253.2 207.4L255.4 187.7C255.8 184.1 255.1 180.5 255.1 176.8C255.1 172.7 255.8 168.7 255.3 164.8L252.9 144.9L275.7 123.1C272.3 115.5 268.2 108.3 263.4 101.6L232.9 110.7L216.8 98.74C210.1 94.42 204.7 90.76 197.1 87.85L179.6 79.87L172.2 48.58C168.2 48.2 164.1 48 159.1 48C155.9 48 151.8 48.2 147.8 48.58L140.4 79.87L122 87.85C115.3 90.76 109 94.42 103.2 98.74L87.1 110.7L56.63 101.6C51.84 108.3 47.68 115.5 44.25 123.1L67.14 144.9L64.72 164.8C64.25 168.7 63.1 172.7 63.1 176.8L63.1 176.8zM464 312C486.1 312 504 329.9 504 352C504 374.1 486.1 392 464 392C441.9 392 424 374.1 424 352C424 329.9 441.9 312 464 312zM581.5 244.3L573.4 271.4C579.5 279.6 584.7 288.6 588.8 298.1L616.6 304.7C622.3 306 626.8 310.3 628.1 315.1C630.6 327.6 632 339.6 632 352C632 364.4 630.6 376.4 628.1 388C626.8 393.7 622.3 397.1 616.6 399.3L588.8 405.9C584.7 415.4 579.5 424.4 573.4 432.6L581.5 459.7C583.2 465.3 581.7 471.4 577.4 475.3C559.6 491.5 538.2 503.9 514.6 511.4C509.1 513.1 503.1 511.3 499.1 507.1L479.1 486.1C474.5 487.7 468.9 488 463.2 488C458 488 452.9 487.7 447.9 487.2L428.9 507.1C424.9 511.3 418.9 513.1 413.4 511.4C389.8 503.9 368.4 491.5 350.6 475.3C346.3 471.4 344.8 465.3 346.5 459.7L354.2 434.1C347.5 425.3 341.9 415.7 337.4 405.5L311.4 399.3C305.7 397.1 301.2 393.7 299.9 388C297.3 376.4 295.1 364.4 295.1 352C295.1 339.6 297.4 327.6 299.9 315.1C301.2 310.3 305.7 306 311.4 304.7L337.4 298.5C341.9 288.3 347.5 278.7 354.2 269.9L346.5 244.3C344.8 238.8 346.3 232.7 350.6 228.7C368.4 212.5 389.8 200.1 413.4 192.7C418.9 190.9 424.9 192.7 428.9 196.9L447.9 216.9C452.9 216.3 458 216 463.2 216C468.9 216 474.5 216.4 479.1 217L499.1 196.9C503.1 192.7 509.1 190.9 514.6 192.7C538.2 200.1 559.6 212.5 577.4 228.7C581.7 232.7 583.2 238.8 581.5 244.3V244.3zM463.2 256C459.5 256 455.9 256.2 452.3 256.6L432.6 258.8L411.1 236.3C403.5 239.7 396.3 243.8 389.6 248.6L398.3 277.1L385.1 294.2C381.3 300.4 377.3 307.1 374.2 314.3L366.2 332.8L336.6 339.8C336.2 343.8 336 347.9 336 352C336 356.1 336.2 360.2 336.6 364.2L366.2 371.2L374.2 389.7C377.3 396.9 381.3 403.6 385.1 409.8L398.3 426L389.6 455.4C396.3 460.2 403.5 464.3 411.1 467.8L432.6 445.2L452.3 447.4C455.9 447.8 459.5 448 463.2 448C467.3 448 471.3 447.8 475.2 447.3L495.1 444.9L516.9 467.8C524.5 464.3 531.7 460.2 538.4 455.4L529.3 424.9L541.3 408.8C545.6 402.1 549.2 396.7 552.2 389.1L560.1 371.6L591.4 364.2C591.8 360.2 592 356.1 592 352C592 347.9 591.8 343.8 591.4 339.8L560.1 332.4L552.2 314C549.2 307.4 545.6 301 541.3 295.2L529.3 279.1L538.4 248.6C531.7 243.8 524.5 239.7 516.9 236.3L495.1 259.1L475.2 256.7C471.3 256.3 467.3 256 463.2 256V256z"],
    "sun-bright": [512, 512, ["sun-alt"], "e28f", "M256 144C194.1 144 144 194.1 144 256c0 61.86 50.14 112 112 112s112-50.14 112-112C368 194.1 317.9 144 256 144zM256 320c-35.29 0-64-28.71-64-64c0-35.29 28.71-64 64-64s64 28.71 64 64C320 291.3 291.3 320 256 320zM256 112c13.25 0 24-10.75 24-24v-64C280 10.75 269.3 0 256 0S232 10.75 232 24v64C232 101.3 242.8 112 256 112zM256 400c-13.25 0-24 10.75-24 24v64C232 501.3 242.8 512 256 512s24-10.75 24-24v-64C280 410.8 269.3 400 256 400zM488 232h-64c-13.25 0-24 10.75-24 24s10.75 24 24 24h64C501.3 280 512 269.3 512 256S501.3 232 488 232zM112 256c0-13.25-10.75-24-24-24h-64C10.75 232 0 242.8 0 256s10.75 24 24 24h64C101.3 280 112 269.3 112 256zM391.8 357.8c-9.344-9.375-24.56-9.372-33.94 .0031s-9.375 24.56 0 33.93l45.25 45.28c4.672 4.688 10.83 7.031 16.97 7.031s12.28-2.344 16.97-7.031c9.375-9.375 9.375-24.56 0-33.94L391.8 357.8zM120.2 154.2c4.672 4.688 10.83 7.031 16.97 7.031S149.5 158.9 154.2 154.2c9.375-9.375 9.375-24.56 0-33.93L108.9 74.97c-9.344-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L120.2 154.2zM374.8 161.2c6.141 0 12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.94s-24.59-9.375-33.94 0l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.93C362.5 158.9 368.7 161.2 374.8 161.2zM120.2 357.8l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.94c4.688 4.688 10.83 7.031 16.97 7.031s12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.93S129.6 348.4 120.2 357.8z"],
    "dog": [576, 512, [128021], "f6d3", "M448 112C448 120.8 440.8 128 432 128C423.2 128 416 120.8 416 112C416 103.2 423.2 96 432 96C440.8 96 448 103.2 448 112zM64.23 220.2C63.13 219.8 62.05 219.5 60.97 219.1C33.58 209.5 11.94 186.7 4.597 157.3L.7168 141.8C-2.498 128.1 5.32 115.9 18.18 112.7C31.04 109.5 44.07 117.3 47.28 130.2L51.16 145.7C55.62 163.5 71.62 176 89.97 176H290.7L317.5 14.89C318.1 6.296 326.4 0 335.1 0C340.7 0 345.1 2.64 349.3 7.126L368 32H444.1C456.8 32 469.1 37.06 478.1 46.06L496 64H528C554.5 64 576 85.49 576 112V144C576 197 533 240 480 240H434.7L432 255.1V448C432 483.3 403.3 512 368 512H352C316.7 512 288 483.3 288 448V379.6C277.6 381.9 266.9 383.4 256 383.8C253.3 383.9 250.7 384 248 384C245.3 384 242.7 383.9 240 383.8C229.1 383.4 218.4 381.9 208 379.6V448C208 483.3 179.3 512 144 512H128C92.65 512 64 483.3 64 448V224C64 222.7 64.08 221.4 64.23 220.2H64.23zM336 319.8V448C336 456.8 343.2 464 352 464H368C376.8 464 384 456.8 384 448V274.3L302.2 224H112.1L112 224.9V448C112 456.8 119.2 464 128 464H144C152.8 464 160 456.8 160 448V319.8L218.4 332.8C227.9 334.9 237.8 336 248 336C258.2 336 268.1 334.9 277.6 332.8L336 319.8zM337.1 189.1L389.1 221.1L394 192H480C506.5 192 528 170.5 528 144V112H476.1L444.1 80H355.3L337.1 189.1z"],
    "notdef": [384, 512, [], "e1fe", "M336 0h-288C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48v-416C384 21.49 362.5 0 336 0zM336 90.16V421.8L221.2 256L336 90.16zM192 213.8L77.19 48h229.6L192 213.8zM162.8 256L48 421.8V90.16L162.8 256zM192 298.2L306.8 464H77.19L192 298.2z"]
  };

  bunker(function () {
    defineIcons('far', icons);
    defineIcons('fa-regular', icons);
  });

}());
