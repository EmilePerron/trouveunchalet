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

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

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
    'fa-solid': 'solid',
    'fasr': 'regular',
    'fa-regular': 'regular',
    'fasl': 'light',
    'fa-light': 'light'
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
    'solid': 'fass',
    'regular': 'fasr',
    'light': 'fasl'
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
    'fass': 'fa-solid',
    'fasr': 'fa-regular',
    'fasl': 'fa-light'
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
    'fa-solid': 'fass',
    'fa-regular': 'fasr',
    'fa-light': 'fasl'
  }), _familyProxy4));
  var FONT_WEIGHT_TO_PREFIX = familyProxy((_familyProxy5 = {}, _defineProperty(_familyProxy5, FAMILY_CLASSIC, {
    '900': 'fas',
    '400': 'far',
    'normal': 'far',
    '300': 'fal',
    '100': 'fat'
  }), _defineProperty(_familyProxy5, FAMILY_SHARP, {
    '900': 'fass',
    '400': 'fasr',
    '300': 'fasl'
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
    
    "campfire": [512,512,[],"f6ba","M232.2 3.4c-2.5-2.3-5.6-3.4-8.8-3.4c-3.2 0-6.4 1.1-9 3.4c-29.9 27-55.3 57.7-73.2 87.1c-17.7 29-29.2 60.2-29.2 84.2C112 254.5 175.3 320 256 320c79.9 0 144-65.5 144-145.3c0-18.3-8.7-46.3-21.7-71.8C365 77 346.2 49.7 323.9 29.1c-5-4.7-12.9-4.7-18 0c-8.7 8-16.7 17.8-23.8 26.8C266.6 37 250 19.6 232.2 3.4zM301 248.2c-13.5 9.1-27.9 13.6-44.1 13.6c-40.5 0-72.9-26.4-72.9-70.9c0-21.8 13.5-40.9 40.5-74.5c3.6 4.5 55.8 71.8 55.8 71.8L312.7 150c2.7 3.6 4.5 7.3 6.3 10.9c16.2 30 9 68.2-18 87.3zM32.5 289.6c-12.4-4.7-26.3 1.5-31 13.9s1.5 26.2 13.9 31L188.3 400 15.5 465.6c-12.4 4.7-18.6 18.6-13.9 31s18.6 18.6 31 13.9L256 425.7l223.5 84.8c12.4 4.7 26.3-1.5 31-13.9s-1.5-26.2-13.9-31L323.7 400l172.8-65.6c12.4-4.7 18.6-18.6 13.9-31s-18.6-18.6-31-13.9L256 374.3 32.5 289.6z"],
    "campground": [576,512,["9978"],"f6bb","M375.4 5.6c10.2 8.5 11.5 23.6 3 33.8l-59.1 70.7L555 392.1c8.4 10.1 13 22.8 13 35.9v28c0 30.9-25.1 56-56 56H288 64c-30.9 0-56-25.1-56-56V428c0-13.1 4.6-25.8 13-35.9L256.7 110.1 197.6 39.4c-8.5-10.2-7.1-25.3 3-33.8s25.3-7.1 33.8 3L288 72.7 341.6 8.6c8.5-10.2 23.6-11.5 33.8-3zM57.9 422.8c-1.2 1.4-1.9 3.3-1.9 5.1v28c0 4.4 3.6 8 8 8h62L269.1 281.2c4.5-5.8 11.5-9.2 18.9-9.2s14.4 3.4 18.9 9.2L450 464h62c4.4 0 8-3.6 8-8V428c0-1.9-.7-3.7-1.9-5.1L288 147.5 57.9 422.8zM187 464H288 389L288 334.9 187 464z"],
    "dog": [576,512,["128021"],"f6d3","M318 342.2c11.4 9.1 18 22.9 18 37.4V448c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V274.3L300.5 223c-3.2 .7-6.5 1-9.9 1H144 112.1l-.1 .8V448c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V379.6c0-14.6 6.6-28.3 18-37.4s26.2-12.6 40.4-9.4c9.5 2.1 19.4 3.2 29.6 3.2s20.1-1.1 29.6-3.2c14.2-3.1 29.1 .3 40.4 9.4zM336.9 189l53.4 32.8c7.2-17.7 24.6-29.8 44.4-29.8H480c26.5 0 48-21.5 48-48V112H496c-12.7 0-24.9-5.1-33.9-14.1L444.1 80 368 80c-4.2 0-8.4-.6-12.4-1.6L338 183.9c-.3 1.7-.7 3.4-1.1 5.1zM64.2 220.2c-1.1-.3-2.2-.7-3.3-1.1c-27.4-9.6-49-32.4-56.4-61.8L.7 141.8c-3.2-12.9 4.6-25.9 17.5-29.1s25.9 4.6 29.1 17.5l0 0 3.9 15.5C55.6 163.5 71.6 176 90 176h54H290.7L313.5 39.3l.1-.4 .9-5.6 3.1-18.4C319 6.3 326.4 0 335.1 0c5.6 0 10.9 2.6 14.3 7.1l11.2 14.9 3.4 4.6 .2 .3L368 32h76.1c12.7 0 24.9 5.1 33.9 14.1L496 64h32c26.5 0 48 21.5 48 48v32c0 53-43 96-96 96H434.7L432 256V448c0 35.3-28.7 64-64 64H352c-35.3 0-64-28.7-64-64V428.6 379.6c-10.4 2.3-21.1 3.7-32 4.2c-2.7 .1-5.3 .2-8 .2s-5.3-.1-8-.2c-10.9-.5-21.6-1.9-32-4.2v48.9V448c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V224c0-1.3 .1-2.6 .2-3.8zM416 112a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"],
    "fireplace": [640,512,[],"f79a","M48 48H592V80H48V48zM32 0C14.3 0 0 14.3 0 32V96c0 17.7 14.3 32 32 32l0 360c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V368c0-88.4 71.6-160 160-160s160 71.6 160 160V488c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V128c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H32zM80 464V128H560V464H528V368c0-114.9-93.1-208-208-208s-208 93.1-208 208v96H80zM300.6 258.7c-2-1.8-4.6-2.7-7.1-2.7c-2.6 0-5.2 .9-7.3 2.7c-24.2 21.6-44.7 46.1-59.2 69.7c-14.3 23.2-23.6 48.2-23.6 67.4c0 63.8 51.1 116.3 116.4 116.3c64.5 0 116.4-52.4 116.4-116.3c0-14.7-7-37-17.6-57.4c-10.7-20.7-25.9-42.5-43.9-59c-4.1-3.7-10.4-3.8-14.5 0c-7 6.4-13.5 14.3-19.2 21.5c-12.6-15.1-26-29-40.4-42zm55.6 195.8c-10.9 7.3-22.5 10.9-35.6 10.9c-32.7 0-58.9-21.1-58.9-56.7c0-17.5 10.9-32.7 32.7-59.6c2.9 3.6 45.1 57.5 45.1 57.5L365.7 376c2.2 2.9 3.6 5.8 5.1 8.7c13.1 24 7.3 54.5-14.5 69.8z"],
    "gear": [512,512,["9881","cog"],"f013","M256 0c17 0 33.6 1.7 49.8 4.8c7.9 1.5 21.8 6.1 29.4 20.1c2 3.7 3.6 7.6 4.6 11.8l9.3 38.5C350.5 81 360.3 86.7 366 85l38-11.2c4-1.2 8.1-1.8 12.2-1.9c16.1-.5 27 9.4 32.3 15.4c22.1 25.1 39.1 54.6 49.9 86.3c2.6 7.6 5.6 21.8-2.7 35.4c-2.2 3.6-4.9 7-8 10L459 246.3c-4.2 4-4.2 15.5 0 19.5l28.7 27.3c3.1 3 5.8 6.4 8 10c8.2 13.6 5.2 27.8 2.7 35.4c-10.8 31.7-27.8 61.1-49.9 86.3c-5.3 6-16.3 15.9-32.3 15.4c-4.1-.1-8.2-.8-12.2-1.9L366 427c-5.7-1.7-15.5 4-16.9 9.8l-9.3 38.5c-1 4.2-2.6 8.2-4.6 11.8c-7.7 14-21.6 18.5-29.4 20.1C289.6 510.3 273 512 256 512s-33.6-1.7-49.8-4.8c-7.9-1.5-21.8-6.1-29.4-20.1c-2-3.7-3.6-7.6-4.6-11.8l-9.3-38.5c-1.4-5.8-11.2-11.5-16.9-9.8l-38 11.2c-4 1.2-8.1 1.8-12.2 1.9c-16.1 .5-27-9.4-32.3-15.4c-22-25.1-39.1-54.6-49.9-86.3c-2.6-7.6-5.6-21.8 2.7-35.4c2.2-3.6 4.9-7 8-10L53 265.7c4.2-4 4.2-15.5 0-19.5L24.2 218.9c-3.1-3-5.8-6.4-8-10C8 195.3 11 181.1 13.6 173.6c10.8-31.7 27.8-61.1 49.9-86.3c5.3-6 16.3-15.9 32.3-15.4c4.1 .1 8.2 .8 12.2 1.9L146 85c5.7 1.7 15.5-4 16.9-9.8l9.3-38.5c1-4.2 2.6-8.2 4.6-11.8c7.7-14 21.6-18.5 29.4-20.1C222.4 1.7 239 0 256 0zM218.1 51.4l-8.5 35.1c-7.8 32.3-45.3 53.9-77.2 44.6L97.9 120.9c-16.5 19.3-29.5 41.7-38 65.7l26.2 24.9c24 22.8 24 66.2 0 89L59.9 325.4c8.5 24 21.5 46.4 38 65.7l34.6-10.2c31.8-9.4 69.4 12.3 77.2 44.6l8.5 35.1c24.6 4.5 51.3 4.5 75.9 0l8.5-35.1c7.8-32.3 45.3-53.9 77.2-44.6l34.6 10.2c16.5-19.3 29.5-41.7 38-65.7l-26.2-24.9c-24-22.8-24-66.2 0-89l26.2-24.9c-8.5-24-21.5-46.4-38-65.7l-34.6 10.2c-31.8 9.4-69.4-12.3-77.2-44.6l-8.5-35.1c-24.6-4.5-51.3-4.5-75.9 0zM208 256a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm48 96a96 96 0 1 1 0-192 96 96 0 1 1 0 192z"],
    "gears": [640,512,["cogs"],"f085","M147.1 52.7l-6.5 23.5c-1.7 6.2-6.3 11.2-12.4 13.5c-10 3.7-19.1 9-27.2 15.7c-5 4.1-11.6 5.6-17.9 4l-23.6-6.2c-5 6.9-9.4 14.4-12.9 22.3l17.1 17.4c4.5 4.6 6.6 11.1 5.5 17.4c-.9 5.1-1.3 10.3-1.3 15.7s.5 10.6 1.3 15.7c1.1 6.4-.9 12.9-5.5 17.4L46.7 226.5c3.5 7.9 7.9 15.4 12.9 22.3l23.6-6.2c6.3-1.6 12.9-.1 17.9 4c8 6.7 17.2 12 27.2 15.7c6.1 2.2 10.7 7.2 12.4 13.5l6.5 23.5c4.2 .4 8.5 .7 12.9 .7s8.7-.2 12.9-.7l6.5-23.5c1.7-6.2 6.3-11.2 12.4-13.5c10-3.7 19.1-9 27.2-15.7c5-4.1 11.6-5.6 17.9-4l23.6 6.2c5-6.9 9.4-14.4 12.9-22.3l-17.1-17.4c-4.5-4.6-6.6-11.1-5.5-17.4c.9-5.1 1.3-10.3 1.3-15.7s-.5-10.6-1.3-15.7c-1.1-6.4 .9-12.9 5.5-17.4l17.1-17.4c-3.5-7.9-7.9-15.4-12.9-22.3l-23.6 6.2c-6.3 1.6-12.9 .1-17.9-4c-8-6.7-17.2-12-27.2-15.7c-6.1-2.2-10.7-7.2-12.4-13.5l-6.5-23.5c-4.2-.4-8.5-.7-12.9-.7s-8.7 .2-12.9 .7zM127.3 15.3C137.9 13.1 148.8 12 160 12s22.1 1.1 32.7 3.3c7.4 1.5 13.3 7 15.3 14.3l7.3 26.6c7.3 3.4 14.3 7.4 20.8 12l26.6-7c7.3-1.9 15 .4 20 6.1c14.4 16.3 25.7 35.5 32.8 56.7c2.4 7.1 .6 15-4.7 20.4L291.5 164c.4 4 .5 8 .5 12s-.2 8-.5 12l19.4 19.6c5.3 5.4 7.1 13.2 4.7 20.4c-7.1 21.2-18.3 40.4-32.8 56.7c-5 5.6-12.7 8-20 6.1l-26.6-7c-6.5 4.6-13.5 8.6-20.8 12L208 322.4c-2 7.3-7.9 12.8-15.3 14.3c-10.6 2.1-21.5 3.3-32.7 3.3s-22.1-1.1-32.7-3.3c-7.4-1.5-13.3-7-15.3-14.3l-7.3-26.6c-7.3-3.4-14.3-7.4-20.8-12l-26.6 7c-7.3 1.9-15-.4-20-6.1C22.8 268.4 11.5 249.2 4.4 228c-2.4-7.1-.6-15 4.7-20.4L28.5 188c-.4-4-.5-8-.5-12s.2-8 .5-12L9.2 144.4C3.9 139 2 131.1 4.4 124c7.1-21.2 18.3-40.4 32.8-56.7c5-5.6 12.7-8 20-6.1l26.6 7c6.5-4.6 13.5-8.6 20.8-12L112 29.6c2-7.3 7.9-12.8 15.3-14.3zM120 176a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM340.7 364.9l23.5 6.5c6.2 1.7 11.2 6.3 13.5 12.4c3.7 10 9 19.1 15.7 27.2c4.1 5 5.6 11.6 4 17.9l-6.2 23.6c6.9 5 14.4 9.4 22.3 12.9l17.4-17.1c4.6-4.5 11.1-6.6 17.4-5.5c5.1 .9 10.3 1.3 15.7 1.3s10.6-.5 15.7-1.3c6.4-1.1 12.9 .9 17.4 5.5l17.4 17.1c7.9-3.5 15.4-7.9 22.3-12.9l-6.2-23.6c-1.6-6.2-.1-12.9 4-17.9c6.7-8 12-17.2 15.7-27.2c2.2-6.1 7.2-10.7 13.5-12.4l23.5-6.5c.4-4.2 .7-8.5 .7-12.9s-.2-8.7-.7-12.9l-23.5-6.5c-6.2-1.7-11.2-6.3-13.5-12.4c-3.7-10-9-19.1-15.7-27.2c-4.1-5-5.6-11.6-4-17.9l6.2-23.6c-6.9-5-14.4-9.4-22.3-12.9l-17.4 17.1c-4.6 4.5-11.1 6.6-17.4 5.5c-5.1-.9-10.3-1.3-15.7-1.3s-10.6 .5-15.7 1.3c-6.4 1.1-12.9-.9-17.4-5.5l-17.4-17.1c-7.9 3.5-15.4 7.9-22.3 12.9l6.2 23.6c1.6 6.3 .1 12.9-4 17.9c-6.7 8-12 17.2-15.7 27.2c-2.2 6.1-7.2 10.7-13.5 12.4l-23.5 6.5c-.4 4.2-.7 8.5-.7 12.9s.2 8.7 .7 12.9zm-37.4 19.8c-2.1-10.6-3.3-21.5-3.3-32.7s1.1-22.1 3.3-32.7c1.5-7.4 7-13.3 14.3-15.3l26.6-7.3c3.4-7.3 7.4-14.3 12-20.8l-7-26.6c-1.9-7.3 .4-15 6.1-20c16.3-14.4 35.5-25.7 56.7-32.8c7.1-2.4 15-.6 20.4 4.7L452 220.5c4-.4 8-.5 12-.5s8 .2 12 .5l19.6-19.4c5.4-5.3 13.2-7.1 20.4-4.7c21.2 7.1 40.4 18.3 56.7 32.8c5.6 5 8 12.7 6.1 20l-7 26.6c4.6 6.5 8.6 13.5 12 20.8l26.6 7.3c7.3 2 12.8 7.9 14.3 15.3c2.1 10.6 3.3 21.5 3.3 32.7s-1.1 22.1-3.3 32.7c-1.5 7.4-7 13.3-14.3 15.3l-26.6 7.3c-3.4 7.3-7.4 14.3-12 20.8l7 26.6c1.9 7.3-.5 15-6.1 20c-16.3 14.4-35.5 25.7-56.7 32.8c-7.1 2.4-15 .6-20.4-4.7L476 483.5c-4 .4-8 .5-12 .5s-8-.2-12-.5l-19.6 19.4c-5.4 5.3-13.2 7.1-20.4 4.7c-21.2-7.1-40.4-18.3-56.7-32.8c-5.6-5-8-12.7-6.1-20l7-26.6c-4.6-6.5-8.6-13.5-12-20.8L317.6 400c-7.3-2-12.8-7.9-14.3-15.3zM464 392a40 40 0 1 1 0-80 40 40 0 1 1 0 80z"],
    "house-tree": [640,512,[],"e1b3","M417.4 7.5C412.9 2.7 406.6 0 400 0s-12.9 2.7-17.4 7.5l-103.5 109 35.4 32.4 85.5-90L496.1 160H448c-9.6 0-18.2 5.7-22 14.5s-2 19 4.6 26L528.3 304H480c-9.4 0-17.9 5.4-21.8 13.9s-2.6 18.5 3.5 25.6L564.1 464H416c0 18-6 34.6-16 48H616c9.4 0 17.9-5.4 21.8-13.9s2.6-18.5-3.5-25.6L531.9 352H584c9.6 0 18.2-5.7 22-14.5s2-19-4.6-26L503.7 208H552c9.6 0 18.3-5.7 22.1-14.5s2-19-4.7-26l-152-160zM20.8 237C7.5 249.1 0 266.2 0 284.2V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V284.2c0-17.9-7.5-35.1-20.8-47.2l-128-117.3c-24.5-22.4-62-22.4-86.5 0L20.8 237zM48 284.2c0-4.5 1.9-8.8 5.2-11.8L181.2 155c6.1-5.6 15.5-5.6 21.6 0l128 117.3c3.3 3 5.2 7.3 5.2 11.8V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V284.2zM144 296v48c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V296c0-13.3-10.7-24-24-24H168c-13.3 0-24 10.7-24 24z"],
    "house-water": [576,512,["house-flood"],"f74f","M303.5 5.7c-9-7.6-22.1-7.6-31.1 0l-264 224c-10.1 8.6-11.3 23.7-2.8 33.8s23.7 11.3 33.8 2.8L64 245.5V393c14.6-8.5 31.9-10.7 48-6.6V204.8L288 55.5 464 204.8V386.5c16.1-4.2 33.4-1.9 48 6.5V245.5l24.5 20.8c10.1 8.6 25.3 7.3 33.8-2.8s7.3-25.3-2.8-33.8l-264-224zM256 224h64v64H256V224zm-8-48c-22.1 0-40 17.9-40 40v80c0 22.1 17.9 40 40 40h80c22.1 0 40-17.9 40-40V216c0-22.1-17.9-40-40-40H248zM111.9 430.1c-9.1-8.1-22.8-8.1-31.9 0C62.8 445 41 456.8 18.8 461.8C5.9 464.7-2.3 477.5 .6 490.5s15.7 21.1 28.7 18.2C58 502.2 81.6 488.2 96 478.2c28.1 19.5 61.4 33.8 96 33.8s67.9-14.3 96-33.8c28.1 19.5 61.4 33.8 96 33.8s67.9-14.3 96-33.8c14.4 10 38 24 66.7 30.4c12.9 2.9 25.8-5.2 28.7-18.2s-5.2-25.8-18.2-28.7c-22-4.9-44.3-16.7-61.3-31.8c-9.1-8.1-22.8-8.1-31.9 0c-21.5 18.6-51.2 33.9-80 33.9s-58.5-15.3-80-33.9c-9.1-8.1-22.8-8.1-31.9 0c-21.5 18.6-51.2 33.9-80 33.9s-58.5-15.3-80-33.9z"],
    "mountain": [512,512,["127956"],"f6fc","M464 424.1c0 4.4-3.5 7.9-7.9 7.9H55.9c-4.4 0-7.9-3.5-7.9-7.9c0-1.5 .4-2.9 1.2-4.2L149.6 260l39.5 50.8c4.6 5.9 11.7 9.3 19.2 9.3s14.5-3.6 19-9.6L268 256h92L462.8 419.9c.8 1.3 1.2 2.7 1.2 4.2zM329.8 208H256c-7.6 0-14.7 3.6-19.2 9.6l-29.1 38.9-30.9-39.8L256 90.3 329.8 208zM55.9 480H456.1c30.9 0 55.9-25 55.9-55.9c0-10.5-3-20.8-8.6-29.7L286.8 49c-6.6-10.6-18.3-17-30.8-17s-24.1 6.4-30.8 17L8.6 394.4C3 403.3 0 413.6 0 424.1C0 455 25 480 55.9 480z"],
    "sliders": [512,512,["sliders-h"],"f1de","M0 416c0 13.3 10.7 24 24 24l59.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 440c13.3 0 24-10.7 24-24s-10.7-24-24-24l-251.7 0c-10.2-32.5-40.5-56-76.3-56s-66.1 23.5-76.3 56L24 392c-13.3 0-24 10.7-24 24zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-35.8 0-66.1 23.5-76.3 56L24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l251.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56l59.7 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-59.7 0c-10.2-32.5-40.5-56-76.3-56zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm76.3-56C258.1 39.5 227.8 16 192 16s-66.1 23.5-76.3 56L24 72C10.7 72 0 82.7 0 96s10.7 24 24 24l91.7 0c10.2 32.5 40.5 56 76.3 56s66.1-23.5 76.3-56L488 120c13.3 0 24-10.7 24-24s-10.7-24-24-24L268.3 72z"],
    "spinner": [512,512,[],"f110","M288 32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM448 256a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zM32 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM75 437a32 32 0 1 0 45.3-45.3A32 32 0 1 0 75 437zm316.8 0A32 32 0 1 0 437 391.8 32 32 0 1 0 391.8 437zM75 75a32 32 0 1 0 45.3 45.3A32 32 0 1 0 75 75z"],
    "star": [576,512,["61446","11088"],"f005","M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"],
    "sun-bright": [512,512,["sun-alt"],"e28f","M280 24V88c0 13.3-10.7 24-24 24s-24-10.7-24-24V24c0-13.3 10.7-24 24-24s24 10.7 24 24zm157 84.9l-45.3 45.3c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L403.1 75c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM108.9 75l45.3 45.3c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L75 108.9c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0zM24 232H88c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24zm400 0h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H424c-13.3 0-24-10.7-24-24s10.7-24 24-24zM154.2 391.8L108.9 437c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l45.3-45.3c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zm237.6-33.9L437 403.1c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-45.3-45.3c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0zM280 424v64c0 13.3-10.7 24-24 24s-24-10.7-24-24V424c0-13.3 10.7-24 24-24s24 10.7 24 24zm40-168a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-176 0a112 112 0 1 1 224 0 112 112 0 1 1 -224 0z"],
    "tree": [448,512,["127794"],"f1bb","M241.8 7.9C237.3 2.9 230.8 0 224 0s-13.3 2.9-17.8 7.9l-144 160c-6.3 7-7.9 17.2-4.1 25.8S70.5 208 80 208H91.8l-62 72.4c-6.1 7.1-7.5 17.1-3.6 25.6s12.4 14 21.8 14H72L4.8 409.6c-5.5 7.3-6.3 17-2.3 25.1S14.9 448 24 448H160h40v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h40H424c9.1 0 17.4-5.1 21.5-13.3s3.2-17.9-2.3-25.1L376 320h24c9.4 0 17.9-5.5 21.8-14s2.5-18.5-3.6-25.6l-62-72.4H368c9.5 0 18.1-5.6 21.9-14.2s2.3-18.8-4.1-25.8l-144-160zM248 400V216c0-13.3-10.7-24-24-24s-24 10.7-24 24V400H160 72l67.2-89.6c5.5-7.3 6.3-17 2.3-25.1s-12.4-13.3-21.5-13.3H100.2l62-72.4c6.1-7.1 7.5-17.1 3.6-25.6s-12.4-14-21.8-14H133.9L224 59.9 314.1 160H304c-9.4 0-17.9 5.5-21.8 14s-2.5 18.5 3.6 25.6l62 72.4H328c-9.1 0-17.4 5.1-21.5 13.3s-3.2 17.9 2.3 25.1L376 400H288 248z"],
    "water": [576,512,[],"f773","M80 78.1c9.1-8.1 22.8-8.1 31.9 0c21.5 18.6 51.2 33.9 80 33.9s58.5-15.3 80-33.9c9.1-8.1 22.8-8.1 31.9 0c21.6 18.6 51.2 33.9 80 33.9s58.5-15.3 80-33.9c9.1-8.1 22.8-8.1 31.9 0c16.9 15.1 39.3 26.8 61.3 31.8c12.9 2.9 21.1 15.7 18.2 28.7s-15.7 21.1-28.7 18.2c-28.7-6.4-52.3-20.5-66.7-30.4c-28.1 19.5-61.4 33.8-96 33.8s-67.9-14.3-96-33.8c-28.1 19.5-61.4 33.8-96 33.8s-67.9-14.3-96-33.8c-14.4 10-38 24-66.7 30.4c-12.9 2.9-25.8-5.2-28.7-18.2s5.2-25.8 18.2-28.7C41 104.8 62.8 93 80 78.1zm0 288c9.1-8.1 22.8-8.1 31.9 0c21.5 18.6 51.2 33.9 80 33.9s58.5-15.3 80-33.9c9.1-8.1 22.8-8.1 31.9 0c21.6 18.6 51.2 33.9 80 33.9s58.5-15.3 80-33.9c9.1-8.1 22.8-8.1 31.9 0c16.9 15.1 39.3 26.8 61.3 31.8c12.9 2.9 21.1 15.7 18.2 28.7s-15.7 21.1-28.7 18.2c-28.7-6.4-52.3-20.5-66.7-30.4c-28.1 19.5-61.4 33.8-96 33.8s-67.9-14.3-96-33.8c-28.1 19.5-61.4 33.8-96 33.8s-67.9-14.3-96-33.8c-14.4 10-38 24-66.7 30.4c-12.9 2.9-25.8-5.2-28.7-18.2s5.2-25.8 18.2-28.7c22.2-5 44-16.8 61.2-31.7zm31.9-144c21.5 18.6 51.2 33.9 80 33.9s58.5-15.3 80-33.9c9.1-8.1 22.8-8.1 31.9 0c21.6 18.6 51.2 33.9 80 33.9s58.5-15.3 80-33.9c9.1-8.1 22.8-8.1 31.9 0c16.9 15.1 39.3 26.8 61.3 31.8c12.9 2.9 21.1 15.7 18.2 28.7s-15.7 21.1-28.7 18.2c-28.7-6.4-52.3-20.5-66.7-30.4c-28.1 19.5-61.4 33.8-96 33.8s-67.9-14.3-96-33.8c-28.1 19.5-61.4 33.8-96 33.8s-67.9-14.3-96-33.8c-14.4 10-38 24-66.7 30.4c-12.9 2.9-25.8-5.2-28.7-18.2s5.2-25.8 18.2-28.7c22.2-5 44-16.8 61.2-31.7c9.1-8.1 22.8-8.1 31.9 0z"],
    "xmark": [384,512,["215","10060","10006","10005","128473","close","multiply","remove","times"],"f00d","M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"],
    "xmark-large": [448,512,[],"e59b","M41 39C31.6 29.7 16.4 29.7 7 39S-2.3 63.6 7 73l183 183L7 439c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l183-183L407 473c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-183-183L441 73c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-183 183L41 39z"]

  };
  var prefixes$1 = [null    ,'far',
    ,'fa-regular'

  ];
  bunker(function () {
    var _iterator = _createForOfIteratorHelper(prefixes$1),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var prefix = _step.value;
        if (!prefix) continue;
        defineIcons(prefix, icons);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });

}());
