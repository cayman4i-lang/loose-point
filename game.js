(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };
  (function legacyCanvasAndRuntimeFallbacks() {
    var g = typeof window !== "undefined" ? window : this;
    if (typeof g.globalThis === "undefined") g.globalThis = g;
    if (g.Math && !g.Math.hypot) g.Math.hypot = function() {
      var sum = 0, i;
      for (i = 0; i < arguments.length; i++) {
        var n = Number(arguments[i]) || 0;
        sum += n * n;
      }
      return Math.sqrt(sum);
    };
    if (g.Number && !g.Number.isFinite) g.Number.isFinite = function(v) {
      return typeof v === "number" && isFinite(v);
    };
    if (g.Object && !g.Object.fromEntries) g.Object.fromEntries = function(entries) {
      var out = {}, i, item;
      for (i = 0; i < entries.length; i++) {
        item = entries[i];
        if (item && item.length > 1) out[item[0]] = item[1];
      }
      return out;
    };
    if (g.Array && !g.Array.from) g.Array.from = function(value) {
      var out = [], i;
      for (i = 0; i < value.length; i++) out.push(value[i]);
      return out;
    };
    if (g.String && !g.String.prototype.includes) g.String.prototype.includes = function(search, start) {
      return this.indexOf(search, start || 0) !== -1;
    };
    if (g.Array && !g.Array.prototype.includes) g.Array.prototype.includes = function(search, start) {
      var i = start || 0;
      if (i < 0) i = Math.max(0, this.length + i);
      for (; i < this.length; i++) if (this[i] === search) return true;
      return false;
    };
    if (!g.requestAnimationFrame) g.requestAnimationFrame = function(fn) {
      return g.setTimeout(function() {
        fn(Date.now());
      }, 16);
    };
    if (!g.cancelAnimationFrame) g.cancelAnimationFrame = function(id) {
      g.clearTimeout(id);
    };
    if (!g.ResizeObserver) g.ResizeObserver = function() {
      this.observe = function() {
      };
      this.disconnect = function() {
      };
    };
    var p = g.CanvasRenderingContext2D && g.CanvasRenderingContext2D.prototype;
    if (!p) return;
    if (!p.ellipse) p.ellipse = function(x, y, rx, ry, rotation, start, end, anticlockwise) {
      if (!this.save || !this.arc) return;
      this.save();
      this.translate(x, y);
      this.rotate(rotation || 0);
      this.scale(rx, ry);
      this.arc(0, 0, 1, start || 0, end === void 0 ? Math.PI * 2 : end, anticlockwise);
      this.restore();
    };
    if (!p.roundRect) p.roundRect = function(x, y, w, h, r) {
      var rr;
      if (typeof r === "number") rr = [r, r, r, r];
      else if (r && r.length) {
        rr = [r[0] || 0, r[1] === void 0 ? r[0] || 0 : r[1], r[2] === void 0 ? r[0] || 0 : r[2], r[3] === void 0 ? r[1] === void 0 ? r[0] || 0 : r[1] : r[3]];
      } else rr = [0, 0, 0, 0];
      var max = Math.min(Math.abs(w) / 2, Math.abs(h) / 2);
      rr[0] = Math.min(Math.max(0, rr[0]), max);
      rr[1] = Math.min(Math.max(0, rr[1]), max);
      rr[2] = Math.min(Math.max(0, rr[2]), max);
      rr[3] = Math.min(Math.max(0, rr[3]), max);
      this.moveTo(x + rr[0], y);
      this.lineTo(x + w - rr[1], y);
      this.quadraticCurveTo(x + w, y, x + w, y + rr[1]);
      this.lineTo(x + w, y + h - rr[2]);
      this.quadraticCurveTo(x + w, y + h, x + w - rr[2], y + h);
      this.lineTo(x + rr[3], y + h);
      this.quadraticCurveTo(x, y + h, x, y + h - rr[3]);
      this.lineTo(x, y + rr[0]);
      this.quadraticCurveTo(x, y, x + rr[0], y);
      return this;
    };
    if (!p.setLineDash) p.setLineDash = function() {
    };
    if (!p.getLineDash) p.getLineDash = function() {
      return [];
    };
    if (!p.setTransform) p.setTransform = function(a, b, c, d, e, f) {
      if (this.resetTransform) this.resetTransform();
      if (this.transform) this.transform(a, b, c, d, e, f);
    };
  })();
  (() => {
    var _a, _b, _c, _d;
    const canvas = document.querySelector("#game");
    let ctx = canvas.getContext("2d");
    const arena = document.querySelector("#arena"), throwBtn = document.querySelector("#throwButton"), vanishBtn = document.querySelector("#vanishButton");
    const startCard = document.querySelector("#startCard"), resultCard = document.querySelector("#resultCard");
    const PScore = document.querySelector("#playerScore"), BScore = document.querySelector("#botScore");
    const LOGICAL_W = 1200, LOGICAL_H = 570;
    let W = 0, H = 0, dpr = 1, running = false, last = 0, roundWait = false, playerScore = 0, botScore = 0, soundOn = true, borderSize = 14, soundHoldTimer = null, soundHoldFired = false;
    let netMode = "local", peer = null, conn = null, lastNetSend = 0, netTarget = null, netFirst = true, localIndex = 0, atHome = false, matchEnded = false, roundTimer = null, leavingRoom = false, netSeq = 0, lastNetSeq = -1, netReceivedAt = 0, multiplayerPaused = false, hostAway = false, roomDirectoryTimer = null, hostedRoomId = "", joinBusy = false;
    const MAX_ONLINE_FIGHTERS = 7, MAX_ONLINE_GUESTS = MAX_ONLINE_FIGHTERS - 1;
    let clients = [], extraFighters = [];
    let wins = {}, roundCoinStart = {};
    let ground = 0, particles = [], spears = [], platforms = [], caveSpikes = [], portals = [], doors = [], moonAsteroids = [], moonAsteroidTimer = 0, swipe = null, shake = 0, audio = null;
    const colors = { ink: "#171713", paper: "#e8e2d4", acid: "#e5ff3f", red: "#ff4e32", blue: "#4d69ff" };
    const colorShop = [["BLUE", "#4d69ff"], ["RED", "#ff4e32"], ["GREEN", "#28b66f"], ["YELLOW", "#f1dc32"], ["ORANGE", "#ff8a2b"], ["PURPLE", "#a75bff"], ["SILVER", "#b9c1c8"], ["BLACK", "#171713"]];
    const skinShop = [{ id: "classic", name: "CLASSIC", cost: 0, desc: "THE ORIGINAL" }, { id: "ninja", name: "NINJA", cost: 100, desc: "TWO BOUNCING NINJA STARS" }, { id: "samurai", name: "SAMURAI", cost: 60, desc: "TWO SPINNING KATANAS" }, { id: "santa", name: "SANTA", cost: 20, desc: "RED SUIT, HAT, AND BEARD" }, { id: "snowman", name: "SNOWMAN", cost: 25, desc: "SNOWBALLS + STICK LIMBS" }, { id: "web", name: "SPIDER-MAN", cost: 50, desc: "UPGRADED WEB CRAWLER" }, { id: "iron", name: "IRON HERO", cost: 75, desc: "HOLD FOR A 2-SECOND BEAM" }, { id: "gladiator", name: "THOR", cost: 65, desc: "SPINNING HAMMER + CURVING LIGHTNING" }, { id: "phantom", name: "MR. INVISIBLE", cost: 700, desc: "10-SECOND STILL INVISIBILITY" }, { id: "spaceman", name: "SPACEMAN", cost: 0, desc: "ZERO-GRAVITY DRIFT" }, { id: "sheep", name: "SHEEP", cost: 150, desc: "PULLING SHOCKWAVE + BITE" }, { id: "trojan", name: "TROJAN", cost: 400, desc: "AIMED SHIELD DEFLECTS SPEARS" }, { id: "acid", name: "ACID", cost: 500, desc: "TOUCH DAMAGE \u2014 NO SPEAR" }, { id: "captain", name: "CAPTAIN AMERICA", cost: 300, desc: "RETURNING THREE-BOUNCE SHIELD" }, { id: "army", name: "ARMY", cost: 400, desc: "BULLETS, KNIVES, AND HIDDEN MINES" }, { id: "flubber", name: "FLUBBER", cost: 300, desc: "BOUNCY TWO-ARM SLAM" }];
    skinShop.push({ id: "spider", name: "SPIDER", cost: 0, desc: "SECRET SIX-ARM PULL" }, { id: "tank", name: "TANK", cost: 900, desc: "SLOW SHELLS, 3 DAMAGE, SPLASH BLAST" }, { id: "porcupine", name: "PORCUPINE", cost: 450, desc: "FIVE SPIKES + CURL SHIELD" });
    let selectedColor = "#4d69ff", ownedColors = /* @__PURE__ */ new Set(["#4d69ff"]), playerCoins = 0, lifeLevel = 0;
    const LIFE_MAX_LEVEL = 7, LIFE_COSTS = [10, 10, 20, 30, 60, 120, 200];
    const playerLives = () => Math.min(10, 3 + lifeLevel);
    const renderLifeIcons = (count) => Array.from({ length: Math.min(10, Math.max(0, count)) }, () => "<i>\u2665</i>").join("");
    function applyLifeTier(f) {
      if (!f) return;
      const lives = Math.min(10, Math.max(0, Number(f.maxHp) || 0));
      f.lifeTier = lives;
      f.hasLifeSplit = lives >= 6;
      f.hasSplitAbility = f.hasSplitAbility || lives >= 6;
      f.tripleShot = lives >= 9;
      f.lifeShield = lives >= 10;
    }
    let playerName = "PLAYER", friendCode = "", friendProfiles = [], presencePeer = null, friendRefreshTimer = null;
    let selectedSkin = "classic", ownedSkins = /* @__PURE__ */ new Set(["classic"]);
    let rankXP = 0, flawlessMatch = true, tutorialReturns = 0, airChallengeTime = 0, spacemanNew = false;
    const netSafeSkin = () => selectedSkin;
    const rankTiers = ["WOOD", "STONE", "IRON", "BRONZE", "SILVER", "GOLD", "DIAMOND"], rankRoman = ["I", "II", "III"], rankXpSteps = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1e3, 1100, 1250, 1425, 1600, 1800, 2025, 2250, 2500, 2775, 3075], MAX_RANK_XP = 3400;
    const rankSymbols = ["\u25C6", "\u2B22", "\u2726", "\u25C8", "\u2727", "\u2605", "\u25C7"];
    const rankDivisionFor = (xp) => {
      const value = Math.max(0, xp || 0);
      for (let i = rankXpSteps.length - 1; i >= 0; i--) if (value >= rankXpSteps[i]) return i;
      return 0;
    };
    const rankNameFromXp = (xp) => {
      const division = rankDivisionFor(xp);
      return rankTiers[Math.floor(division / 3)] + " " + rankRoman[division % 3];
    };
    const rankDivision = () => rankDivisionFor(rankXP), rankTier = () => Math.floor(rankDivision() / 3);
    function updateRankUI() {
      const division = rankDivision(), tier = Math.floor(division / 3), start = rankXpSteps[division], next = rankXpSteps[division + 1] || MAX_RANK_XP, within = rankXP - start, needed = Math.max(1, next - start), maxed = division === 20 && rankXP >= MAX_RANK_XP;
      document.querySelector("#rankName").textContent = rankTiers[tier] + " " + rankRoman[division % 3];
      document.querySelector("#rankXp").textContent = maxed ? "MAX RANK" : within + " / " + needed + " XP";
      document.querySelector("#rankProgress").style.width = (maxed ? 100 : Math.min(100, within / needed * 100)) + "%";
      const emblem = document.querySelector("#rankEmblem");
      if (emblem) {
        emblem.className = "rank-" + rankTiers[tier].toLowerCase();
        emblem.dataset.symbol = rankSymbols[tier];
        emblem.querySelector("span").textContent = rankSymbols[tier];
      }
    }
    function addRankXP(amount, fullDivision = false) {
      if (fullDivision) {
        const next = rankXpSteps[Math.min(20, rankDivision() + 1)] || MAX_RANK_XP;
        rankXP = Math.max(rankXP, next);
      } else rankXP = Math.min(MAX_RANK_XP, rankXP + amount);
      saveUpgrades();
      updateRankUI();
    }
    function pitBotProfile(division) {
      const d = Math.max(0, Math.min(20, division || 0)), lives = d < 3 ? d + 1 : d < 9 ? 3 : d < 13 ? 4 : d < 17 ? 5 : 6, skills = [0.01, 0.06, 0.11, 0.16, 0.23, 0.31, 0.4, 0.52, 0.66, 0.82, 1, 1.22, 1.46, 1.72, 2, 2.35, 2.75, 3.2, 3.75, 4.35, 5];
      return { lives, skill: skills[d] };
    }
    function botMoveDelay(skill) {
      return Math.max(0.16, 0.82 - skill * 0.13);
    }
    function botMoveJitter(skill) {
      return 0.1 + Math.min(0.2, skill * 0.035);
    }
    function noteLifeLost(f) {
      if (netMode === "local" && f === player) flawlessMatch = false;
    }
    const ARENAS = [
      { name: "FROSTBITE", key: "snow", sky: "#cfe8ef", land: "#f8ffff", accent: "#69bce2", gravity: 1, layout: "steps" },
      { name: "VINE TEMPLE", key: "jungle", sky: "#315847", land: "#78a94d", accent: "#d6ef62", gravity: 1, layout: "vines" },
      { name: "DEEP CAVE", key: "cave", sky: "#25242c", land: "#64606f", accent: "#ffb84c", gravity: 1, layout: "cave" },
      { name: "GREEN DRIFT", key: "grass", sky: "#9fd7ce", land: "#6d994e", accent: "#e5ff3f", gravity: 1, layout: "float" },
      { name: "ORBITAL TWO", key: "space", sky: "#101329", land: "#6874d8", accent: "#e0eeff", gravity: 0.28, layout: "space" },
      { name: "ORBITAL THREE", key: "orbital3", sky: "#070914", land: "#22294b", accent: "#a9d8ff", gravity: 0, layout: "orbital3" },
      { name: "TUNNEL RUN", key: "road", sky: "#7c9ac2", land: "#363942", accent: "#f0ca4c", gravity: 1.55, layout: "road" },
      { name: "MOONFALL", key: "moon", sky: "#10182f", land: "#2c75b6", accent: "#b8e4ff", gravity: 1.08, layout: "moon" },
      { name: "SHIFT DOORS", key: "doors", sky: "#171833", land: "#30355d", accent: "#bafffb", gravity: 1, layout: "doors" },
      { name: "SLIDEWORKS", key: "factory", sky: "#d5b277", land: "#6b5546", accent: "#ff6a38", gravity: 1, layout: "moving" },
      { name: "GLASS TIDE", key: "glass", sky: "#7ccbd0", land: "#d7ffff", accent: "#ffffff", gravity: 0.85, layout: "thin" },
      { name: "LAVA VAULT", key: "lava", sky: "#2b1010", land: "#b93218", accent: "#ffd34d", gravity: 1.05, layout: "vault" },
      { name: "WIND RUINS", key: "ruins", sky: "#d7c89e", land: "#817660", accent: "#fff2b0", gravity: 0.92, layout: "ruins" },
      { name: "NIGHT SIGNAL", key: "neon", sky: "#16152b", land: "#46406c", accent: "#ef49ff", gravity: 0.72, layout: "moving" },
      { name: "ACID ASCENT", key: "acid", sky: "#17251e", land: "#63c92f", accent: "#dcff4f", gravity: 0.94, layout: "rise" },
      { name: "CRUSH COURSE", key: "crush", sky: "#80766b", land: "#4d4842", accent: "#f0b44c", gravity: 1, layout: "crush" },
      { name: "CRUSHER", key: "crusher", sky: "#26252c", land: "#625b5b", accent: "#ff8052", gravity: 1, layout: "crusher" },
      { name: "HALVES", key: "halves", sky: "#171827", land: "#434c68", accent: "#ff4769", gravity: 1, layout: "halves" }
    ];
    let selectedArena = ARENAS[3];
    const fighter = (side) => ({ side, x: 0, y: 0, vx: 0, vy: 0, angle: side === "player" ? -0.1 : Math.PI + 0.1, av: 0, hp: 3, maxHp: 3, coins: 0, color: null, skin: "classic", maxThrows: 1, throwsLeft: 1, wallStuck: false, beamActive: false, beamTime: 0, beamContact: 0, beamTarget: null, meleeCooldown: 0, maceAngle: Math.random() * 6.28, acidContact: null, onGround: false, hasSpear: true, cooldown: 0, stun: 0, blink: 0, ai: 0, difficulty: 0, splitTimer: 0, splitDone: false, splitRemaining: 0, isClone: false, splitParent: null, lavaTime: 0, hazardStarted: false, shieldTime: 0, shieldUsed: false, invisibleTime: 0, dead: false, hideCorpse: false, away: false, wobble: Math.random() * 6.28, shieldOut: false, armyShotIndex: 0, armyCooldown: 0, mineVision: 0 });
    let player = fighter("player"), bot = fighter("bot");
    const allFighters = () => [player, bot, ...extraFighters];
    const localFighter = () => allFighters()[netMode === "guest" ? localIndex : 0] || player;
    function resize() {
      const first = !W, crusherWorld = selectedArena.key === "crusher", orbitalWorld2 = selectedArena.key === "orbital3", moonWorld = selectedArena.key === "moon", wideWorld = ["orbital3", "road", "moon", "doors"].includes(selectedArena.key);
      dpr = crusherWorld ? 1 : Math.min(devicePixelRatio || 1, 2);
      W = crusherWorld ? LOGICAL_W * 2 : orbitalWorld2 ? Math.round(LOGICAL_W * 1.5) : moonWorld ? Math.round(LOGICAL_W * 1.28) : wideWorld ? Math.round(LOGICAL_W * 1.16) : LOGICAL_W;
      H = crusherWorld ? LOGICAL_H * 2 : orbitalWorld2 ? Math.round(LOGICAL_H * 1.18) : moonWorld ? Math.round(LOGICAL_H * 1.15) : wideWorld ? Math.round(LOGICAL_H * 1.08) : LOGICAL_H;
      ground = selectedArena.key === "crush" ? H + 60 : crusherWorld ? H - 52 : orbitalWorld2 ? H + 100 : H * 0.82;
      borderSize = 14;
      const bw = Math.round(W * dpr), bh = Math.round(H * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const stage = document.querySelector("#gameViewport"), box = arena.getBoundingClientRect(), fit = Math.min(box.width / LOGICAL_W, box.height / LOGICAL_H), fill = Math.max(box.width / LOGICAL_W, box.height / LOGICAL_H), smallDevice = box.width < LOGICAL_W || box.height < LOGICAL_H;
      const scale = smallDevice ? fit : fill;
      stage.style.transform = `translate(-50%,-50%) scale(${scale})`;
      if (first || !running) resetPositions();
    }
    function resetPositions() {
      const fs = allFighters();
      fs.forEach((f, i) => {
        f.x = W * (0.12 + 0.76 * (fs.length === 1 ? 0.5 : i / (fs.length - 1)));
        f.y = ground - 48 - i % 2 * 28;
        f.angle = i % 2 ? Math.PI + 0.12 : -0.12;
      });
    }
    function makePlatforms() {
      ground = selectedArena.key === "crush" ? H + 60 : selectedArena.key === "crusher" ? H - 52 : selectedArena.key === "orbital3" ? H + 100 : H * 0.82;
      platforms = [];
      caveSpikes = [];
      portals = [];
      doors = [];
      const add = (x, y, w, h = 18, type = "thick", move = null) => platforms.push({ x: W * x, y: ground - H * y, w: Math.min(w, W * 0.28), h, type, move, t: Math.random() * 6, baseX: W * x, baseY: ground - H * y, dx: 0, dy: 0 });
      const L = selectedArena.layout;
      if (L === "steps") {
        add(0.12, 0.18, 130, 28);
        add(0.42, 0.31, 100, 16, "thin");
        add(0.67, 0.2, 155, 30);
        add(0.79, 0.43, 90, 22);
      }
      if (L === "vines") {
      }
      if (L === "cave") {
        add(0.08, 0.25, 180, 34);
        add(0.4, 0.16, 95, 12, "thin");
        add(0.59, 0.38, 190, 32);
        add(0.78, 0.58, 80, 15, "thin");
        for (let i = 0; i < 5; i++) caveSpikes.push({ x: W * (0.18 + i * 0.16) + (Math.random() - 0.5) * 42, y: 0, w: 34 + i % 2 * 12, h: 70 + i % 3 * 22, state: "ready", timer: 2 + Math.random() * 4, vy: 0, groundY: ground - 2, rest: 0, hit: /* @__PURE__ */ new Set() });
      }
      if (L === "float") {
        add(0.13, 0.24, 125, 28);
        add(0.4, 0.39, 105, 13, "thin");
        add(0.64, 0.24, 150, 28);
      }
      if (L === "space") {
        add(0.18, 0.35, 175, 34);
        add(0.65, 0.42, 175, 34);
        const left = platforms[0], right = platforms[1];
        portals = [{ x: left.x + left.w * 0.52, y: left.y - 2, nx: 0, ny: -1, link: 1 }, { x: right.x + right.w * 0.52, y: right.y + right.h + 2, nx: 0, ny: 1, link: 0 }, { x: W * 0.34, y: ground - 2, nx: 0, ny: -1, link: 3 }, { x: W * 0.76, y: borderSize + 44, nx: 0, ny: 1, link: 2 }];
      }
      if (L === "orbital3") {
      }
      if (L === "road") {
        add(-0.14, 0.06, 235, 38, "car", { axis: "x", speed: 1.22, wrap: true, dir: 1 });
        add(0.26, 0.15, 210, 38, "car", { axis: "x", speed: 0.9, wrap: true, dir: -1 });
        add(0.67, 0.075, 245, 38, "car", { axis: "x", speed: 1.06, wrap: true, dir: 1 });
      }
      if (L === "moon") {
      }
      if (L === "doors") {
        add(0.08, 0.18, 145, 13, "thin");
        add(0.27, 0.44, 120, 13, "thin");
        add(0.53, 0.24, 155, 13, "thin");
        add(0.73, 0.52, 120, 13, "thin");
        const types = ["boost", "heavy", "fast", "triple", "drain", "fast", "boost"];
        const spots = [[0.17, 0.54], [0.39, 0.2], [0.51, 0.61], [0.66, 0.38], [0.84, 0.22], [0.1, 0.33], [0.86, 0.67]];
        doors = spots.map((spot, i) => ({ x: W * spot[0], y: ground - H * spot[1], w: 28, h: 104, type: types[i % types.length] }));
      }
      if (L === "moving") {
        add(-0.08, 0.22, 145, 28, "moving", { axis: "x", speed: 1.05, wrap: true, dir: 1 });
        add(0.38, 0.4, 115, 24, "moving", { axis: "x", speed: 0.78, wrap: true, dir: -1 });
        add(0.76, 0.25, 155, 30, "moving", { axis: "x", speed: 1.28, wrap: true, dir: 1 });
      }
      if (L === "thin") {
        add(0.1, 0.18, 150, 12, "thin");
        add(0.34, 0.34, 120, 10, "thin");
        add(0.59, 0.5, 120, 10, "thin");
        add(0.76, 0.23, 150, 12, "thin");
      }
      if (L === "vault") {
        add(0.08, 0.23, 150, 32);
        add(0.34, 0.43, 110, 13, "thin");
        add(0.58, 0.24, 180, 34);
        add(0.77, 0.49, 95, 24, "moving", { axis: "y", range: H * 0.12, speed: 1.4 });
      }
      if (L === "ruins") {
        add(0.08, 0.17, 110, 30);
        add(0.27, 0.35, 75, 12, "thin");
        add(0.43, 0.52, 115, 30);
        add(0.66, 0.31, 80, 12, "thin");
        add(0.78, 0.5, 120, 30);
      }
      if (L === "neon") {
        add(0.1, 0.24, 130, 22, "moving", { axis: "y", range: H * 0.12, speed: 1.5 });
        add(0.4, 0.4, 100, 11, "thin");
        add(0.66, 0.3, 150, 24, "moving", { axis: "x", range: W * 0.15, speed: 1.15 });
      }
      if (L === "rise") {
        add(0.06, 0.11, 145, 25);
        add(0.28, 0.25, 110, 14, "thin");
        add(0.5, 0.39, 140, 24);
        add(0.73, 0.54, 105, 14, "thin");
        add(0.17, 0.68, 125, 23);
        add(0.58, 0.8, 120, 22);
      }
      if (L === "crush") {
        platforms.push({ x: 0, y: 0, w: W, h: 72, type: "ceiling", move: null, t: 0, baseX: 0, baseY: 0, dx: 0, dy: 0 });
        add(0.06, 0.12, 145, 25);
        add(0.3, 0.28, 115, 14, "thin");
        add(0.55, 0.42, 145, 24);
        add(0.76, 0.59, 105, 14, "thin");
        add(0.17, 0.74, 135, 23);
        add(0.59, 0.88, 120, 20);
      }
      if (L === "crusher") {
        add(0.1, 0.18, 160, 28);
        add(0.37, 0.38, 120, 14, "thin");
        add(0.64, 0.22, 160, 28);
        add(0.77, 0.55, 110, 22);
      }
      if (L === "halves") {
        add(0.08, 0.2, 155, 24);
        add(0.31, 0.43, 105, 14, "thin");
        add(0.58, 0.25, 155, 24);
        add(0.76, 0.58, 105, 14, "thin");
      }
    }
    function placeRisingFighters() {
      if (["lava", "acid", "crush"].includes(selectedArena.key)) {
        const safe = platforms.filter((p) => p.type !== "ceiling").sort((a, b) => a.y - b.y);
        allFighters().forEach((f, i) => {
          const p = safe[i % safe.length];
          f.x = p.x + p.w / 2;
          f.y = p.y - 43;
          f.vx = f.vy = 0;
        });
      }
      if (netMode === "host") {
        if (hostAway) setFighterAway(player, true);
        clients.forEach((c) => {
          if (c == null ? void 0 : c.away) setFighterAway(allFighters()[c.fighterIndex], true);
        });
        recomputeMultiplayerPause();
      }
    }
    function updateActionButtons() {
      const me = localFighter();
      vanishBtn.hidden = me.skin !== "phantom";
      vanishBtn.disabled = me.invisibleTime > 0 || !running || roundWait;
    }
    function applySkin(f, id) {
      f.skin = id || "classic";
      f.maxThrows = ["ninja", "samurai", "phantom", "spaceman", "flubber"].includes(f.skin) ? 2 : 1;
      f.throwsLeft = f.maxThrows;
      f.hasSpear = !["gladiator", "acid"].includes(f.skin);
      f.shieldOut = false;
      f.armyShotIndex = 0;
      f.mineVision = 0;
      f.beamActive = false;
      f.beamTime = 0;
      f.beamContact = 0;
    }
    const baseThrowSpear = throwSpear;
    throwSpear = (f) => {
      const before = spears.length;
      baseThrowSpear(f);
      if (f.skin === "trojan" && spears.length > before) {
        const s = spears[spears.length - 1];
        s.vx *= 1.08;
        s.vy *= 1.08;
      }
    };
    function resetRound() {
      resize();
      const activeClients = clients.filter((c) => c && !c._lpClosed);
      const highestSlot = activeClients.reduce((max, c) => Math.max(max, c.fighterIndex || 0), 0);
      const count = netMode === "host" ? Math.max(2, highestSlot + 1) : netMode === "guest" ? Math.max(2, localIndex + 1) : 2;
      player = fighter("player");
      bot = fighter("bot");
      extraFighters = [];
      for (let i = 2; i < count; i++) extraFighters.push(fighter("p" + i));
      player.color = selectedColor;
      player.maxHp = player.hp = playerLives();
      player.coins = playerCoins;
      applySkin(player, netSafeSkin());
      applyLifeTier(player);
      bot.color = colors.red;
      applyLifeTier(bot);
      if (netMode === "local") {
        const division = rankDivision(), profile = pitBotProfile(division);
        bot.maxHp = bot.hp = profile.lives;
        bot.difficulty = profile.skill;
        bot.splitTimer = profile.lives >= 6 ? 10 : 0;
      }
      if (netMode === "host") {
        const activeSlots = new Set(activeClients.map((c) => c.fighterIndex));
        for (const c of activeClients) {
          const f = allFighters()[c.fighterIndex];
          if (f) {
            f.color = c.fighterColor || f.color;
            f.maxHp = f.hp = c.maxHp || 3;
            f.coins = c.coins || 0;
            applySkin(f, c.skin);
          }
        }
        allFighters().forEach((f, index) => {
          if (index > 0 && !activeSlots.has(index)) {
            f.dead = true;
            f.away = true;
          }
        });
      }
      resetPositions();
      spears = [];
      particles = [];
      makePlatforms();
      placeRisingFighters();
      airChallengeTime = 0;
      document.querySelector("#airChallenge").hidden = true;
      roundWait = false;
      resultCard.hidden = true;
      throwBtn.classList.remove("cooldown");
      document.querySelector("#ammoLabel").textContent = player.skin === "gladiator" ? "LIGHTNING READY" : player.skin === "iron" ? "HOLD FOR BEAM" : player.maxThrows === 2 ? "2 SHOTS READY" : "SHOT READY";
    }
    function beep(freq = 180, dur = 0.06, type = "square", gain = 0.035) {
      if (!soundOn) return;
      audio || (audio = new (window.AudioContext || window.webkitAudioContext)());
      const o = audio.createOscillator(), g = audio.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(gain, audio.currentTime);
      g.gain.exponentialRampToValueAtTime(1e-3, audio.currentTime + dur);
      o.connect(g).connect(audio.destination);
      o.start();
      o.stop(audio.currentTime + dur);
    }
    function fling(f, dx, dy, power = 1) {
      if (f.dead || f.stun > 0 || f.invisibleTime > 0) return;
      f.wallStuck = false;
      const mag = Math.hypot(dx, dy) || 1, cap = Math.min(mag * 1.18, 175);
      f.vx += dx / mag * cap * 5.15 * power;
      f.vy += dy / mag * cap * 5.5 * power;
      f.av += dx * 0.014 * power;
      f.angle += dx * 24e-4;
      f.onGround = false;
      beep(110, 0.05, "triangle", 0.025);
    }
    function faceAngle(f) {
      if (f.freezeTime > 0 && Number.isFinite(f.frozenFace)) return f.frozenFace;
      const rivals = netMode === "local" ? f === player ? [bot, ...extraFighters].filter((o) => !o.dead) : [player].filter((o) => !o.dead) : allFighters().filter((o) => o !== f && !o.dead);
      const target = rivals.sort((a, b) => Math.hypot(a.x - f.x, a.y - f.y) - Math.hypot(b.x - f.x, b.y - f.y))[0] || f;
      const desired = Math.atan2(target.y - 12 - (f.y - 26), target.x - f.x);
      let lean = Math.max(-0.55, Math.min(0.55, f.vx / 500));
      return desired + lean * 0.32;
    }
    function throwSpear(f) {
      if (!running || roundWait || !f.hasSpear || f.dead || f.invisibleTime > 0 || ["iron", "gladiator", "acid"].includes(f.skin)) return;
      const a = faceAngle(f), speed = Math.min(W, H) * 1.25 + 280, weapon = f.skin === "ninja" ? "star" : f.skin === "samurai" ? "katana" : f.skin === "snowman" ? "snowball" : f.skin === "web" ? "web" : f.skin === "phantom" ? "phantom" : f.skin === "spaceman" ? "asteroid" : "spear", sounds = { star: [410, "square"], katana: [270, "triangle"], snowball: [105, "sine"], web: [620, "sine"], phantom: [230, "sine"], asteroid: [150, "sine"], spear: [230, "sawtooth"] }, snd = f.skin === "santa" ? [880, "sine"] : sounds[weapon];
      f.throwsLeft = Math.max(0, f.throwsLeft - 1);
      f.hasSpear = f.throwsLeft > 0;
      f.cooldown = f.hasSpear ? 0 : 2.25;
      spears.push({ owner: f, weapon, x: f.x + Math.cos(a) * 36, y: f.y - 12 + Math.sin(a) * 36, vx: Math.cos(a) * speed + f.vx * 0.35, vy: Math.sin(a) * speed + f.vy * 0.2, a, spinA: a, bouncesLeft: weapon === "star" ? 2 : 0, stuck: false, life: 6 });
      f.vx -= Math.cos(a) * 55;
      f.vy -= Math.sin(a) * 30;
      beep(snd[0], 0.12, snd[1], 0.045);
      if (f === player) {
        throwBtn.classList.toggle("cooldown", !f.hasSpear);
        document.querySelector("#ammoLabel").textContent = f.hasSpear ? "1 SHOT LEFT" : "COMING BACK";
      }
    }
    function startBeam(f) {
      if (!running || roundWait || f.dead || f.skin !== "iron" || !f.hasSpear || f.beamActive) return;
      f.beamActive = true;
      f.beamTime = f.beamContact = 0;
      f.beamTarget = null;
      beep(520, 0.18, "sine", 0.045);
      if (f === player) document.querySelector("#ammoLabel").textContent = "BEAM CHARGING";
    }
    function stopBeam(f) {
      if (!f.beamActive) return;
      f.beamActive = false;
      f.beamTarget = null;
      f.beamContact = 0;
      f.hasSpear = false;
      f.cooldown = 2.25;
      beep(150, 0.12, "sawtooth", 0.025);
      if (f === player) {
        throwBtn.classList.add("cooldown");
        document.querySelector("#ammoLabel").textContent = "RECHARGING";
      }
    }
    function shieldBurst(f) {
      for (let i = 0; i < 18; i++) {
        const a = Math.random() * Math.PI * 2, s = 80 + Math.random() * 190;
        particles.push({ x: f.x + Math.cos(a) * 22, y: f.y - 20 + Math.sin(a) * 32, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0.3 + Math.random() * 0.3, c: i % 2 ? "#57ddff" : "#d9fbff", r: 2 + Math.random() * 3 });
      }
      shake = Math.max(shake, 8);
    }
    function activateShield(f) {
      if (netMode === "local" || !f || f.dead || f.shieldUsed || f.shieldTime > 0 || roundWait) return;
      f.shieldUsed = true;
      f.shieldTime = 15;
      shieldBurst(f);
    }
    function activateVanish(f) {
      if (!f || f.skin !== "phantom" || f.dead || f.invisibleTime > 0 || roundWait) return;
      f.invisibleTime = 6;
      f.vx = f.vy = f.av = 0;
      for (const s of spears) if (s.stuckTo === f) s.life = 0;
      stopBeam(f);
      updateActionButtons();
    }
    function deflectProjectile(f, s) {
      const speed = Math.hypot(s.vx, s.vy) || 360, dx = s.x - f.x, dy = s.y - (f.y - 15), d = Math.hypot(dx, dy) || 1;
      s.x = f.x + dx / d * 38;
      s.y = f.y - 15 + dy / d * 38;
      s.vx = dx / d * speed * 1.1;
      s.vy = dy / d * speed * 1.1;
      s.a = Math.atan2(s.vy, s.vx);
      s.stuck = false;
      s.stuckTo = null;
      s.life = Math.max(s.life, 2.2);
      shieldBurst(f);
    }
    const fighterFxColor = (f) => f.skin === "snowman" ? "#eef7fa" : f.skin === "web" ? "#e73b35" : f.skin === "santa" ? "#d9362b" : f.skin === "ninja" ? "#17171a" : f.skin === "samurai" ? "#762d28" : f.skin === "iron" ? "#b82324" : f.skin === "gladiator" ? "#a56b2a" : f.skin === "spaceman" ? "#8ee9ff" : f.skin === "trojan" ? "#d6a34b" : f.skin === "acid" ? "#73e642" : f.color || (f.side === "player" ? colors.blue : colors.red);
    function markDefeated(f) {
      f.dead = true;
      f.hideCorpse = false;
      if (f.isClone) {
        const otherBotParts = [bot, ...extraFighters].filter((o) => o !== f && !o.dead);
        f.hideCorpse = otherBotParts.length > 0;
        if (!otherBotParts.length) {
          for (const clone of extraFighters) if (clone.isClone && clone.dead) clone.hideCorpse = true;
          f.hideCorpse = false;
        }
      }
    }
    function checkVictory() {
      const alive = allFighters().filter((o) => !o.dead && !o.away);
      if (netMode === "local") {
        const enemies = alive.filter((o) => o !== player);
        if (player.dead && enemies.length) endRound("bot");
        else if (!player.dead && !enemies.length) endRound("player");
      } else if (alive.length === 1) endRound(alive[0].side);
    }
    function directDamage(attacker, target, ix, iy, knock, spin, color = "#67dfff") {
      if (target.dead || target.invisibleTime > 0) return;
      if (target.shieldTime > 0) {
        attacker.vx -= ix * 980;
        attacker.vy -= iy * 520 + 260;
        attacker.av -= spin * 2 + Math.sign(ix || 1) * 10;
        attacker.stun = 0.25;
        shieldBurst(target);
        return;
      }
      attacker.coins = (attacker.coins || 0) + 1;
      target.hp -= attacker.damageOverride != null ? attacker.damageOverride : attacker.skin === "gladiator" ? 1.5 : 1;
      target.stun = 0.45;
      target.blink = 0.28;
      target.vx += ix * knock;
      target.vy += iy * knock * 0.45 - 110;
      target.av += spin;
      shake = Math.max(shake, 15);
      const hitFx = fighterFxColor(target);
      for (let i = 0; i < 22; i++) particles.push({ x: target.x, y: target.y - 15, vx: (Math.random() - 0.5) * 430, vy: (Math.random() - 0.7) * 360, life: 0.35 + Math.random() * 0.5, c: hitFx, r: 2 + Math.random() * 3 });
      beep(color === "#ffe45c" ? 78 : 310, 0.18, color === "#ffe45c" ? "square" : "sine", 0.065);
      if (target.hp <= 0) {
        attacker.coins += 3;
        markDefeated(target);
        target.vx += ix * 160;
        target.vy -= 100;
        setTimeout(checkVictory, 450);
      }
    }
    function macePosition(f) {
      const a = f.maceAngle || 0;
      return { x: f.x + Math.cos(a) * 46, y: f.y - 12 + Math.sin(a) * 46, a };
    }
    function updateSpecial(f, dt) {
      var _a2, _b2;
      f.meleeCooldown = Math.max(0, f.meleeCooldown - dt);
      if (f.skin === "gladiator") f.maceAngle = (f.maceAngle + dt * 8) % (Math.PI * 2);
      if (f.skin === "acid" && !f.dead) {
        const target = ((_a2 = allFighters().filter((o) => o !== f && !o.dead && !o.away).map((o) => {
          const dx = o.x - f.x, dy = o.y - f.y;
          return { o, dx, dy, d: Math.hypot(dx, dy) };
        }).filter((v) => v.d < 46).sort((a, b) => a.d - b.d)[0]) == null ? void 0 : _a2.o) || null;
        if (target !== f.acidContact) {
          f.acidContact = target;
          if (target) {
            const dx = target.x - f.x, dy = target.y - f.y, d = Math.hypot(dx, dy) || 1;
            directDamage(f, target, dx / d, dy / d, 360, Math.sign(dx || 1) * 5, "#73e642");
            for (let i = 0; i < 16; i++) particles.push({ x: target.x, y: target.y - 15, vx: (Math.random() - 0.5) * 260, vy: -80 - Math.random() * 240, life: 0.35 + Math.random() * 0.45, c: i % 2 ? "#8eff53" : "#d8ff63", r: 2 + Math.random() * 3 });
          }
        }
      }
      if (f.beamActive) {
        f.beamTime += dt;
        const a = faceAngle(f), ix = Math.cos(a), iy = Math.sin(a), targets = allFighters().filter((o) => o !== f && !o.dead).map((o) => {
          const dx = o.x - f.x, dy = o.y - 18 - (f.y - 12), along = dx * ix + dy * iy, perp = Math.abs(dx * iy - dy * ix);
          return { o, along, perp };
        }).filter((v) => v.along > 0 && v.perp < 22).sort((a2, b) => a2.along - b.along), target = ((_b2 = targets[0]) == null ? void 0 : _b2.o) || null;
        if (target === f.beamTarget) f.beamContact += dt;
        else {
          f.beamTarget = target;
          f.beamContact = target ? dt : 0;
        }
        while (target && f.beamContact >= 1) {
          f.beamContact -= 1;
          directDamage(f, target, ix, iy, 240, 0, "#67dfff");
        }
        if (f.beamTime >= 2) stopBeam(f);
      }
      if (f.skin === "gladiator" && !f.dead && f.meleeCooldown <= 0) {
        const m = macePosition(f);
        for (const o of allFighters()) {
          if (o === f || o.dead) continue;
          if (Math.hypot(o.x - m.x, o.y - 15 - m.y) < 28) {
            const dx = o.x - f.x, dy = o.y - f.y, d = Math.hypot(dx, dy) || 1;
            directDamage(f, o, dx / d, dy / d, 1550, Math.sign(dx || 1) * 19, "#ffe45c");
            f.meleeCooldown = 0.9;
            break;
          }
        }
      }
    }
    function updateLava(f, dt) {
      if (roundWait && netMode === "local") return;
      if (selectedArena.key === "acid" && f.skin === "acid") {
        f.lavaTime = 0;
        f.hazardStarted = false;
        return;
      }
      const hazard = ["lava", "acid"].includes(selectedArena.key), touching = hazard && f.y >= ground - 44;
      if (!touching) {
        f.lavaTime = 0;
        f.hazardStarted = false;
        return;
      }
      f.lavaTime += dt;
      const delay = f.hazardStarted ? 2 : 0;
      if (f.lavaTime < delay) return;
      f.lavaTime = Math.max(0, f.lavaTime - delay);
      f.hazardStarted = true;
      f.hp--;
      f.blink = 0.65;
      f.stun = 0.3;
      f.vy = -620;
      f.vx += (Math.random() - 0.5) * 150;
      f.onGround = false;
      f.av += (Math.random() - 0.5) * 8;
      shake = 18;
      const acid = selectedArena.key === "acid";
      for (let i = 0; i < 30; i++) particles.push({ x: f.x + (Math.random() - 0.5) * 35, y: ground - 4, vx: (Math.random() - 0.5) * 260, vy: -120 - Math.random() * 360, life: 0.45 + Math.random() * 0.5, c: acid ? i % 2 ? "#75ed35" : "#dcff4f" : i % 2 ? "#ff6b28" : "#ffd34d", r: 3 + Math.random() * 4 });
      beep(acid ? 92 : 62, 0.32, "sawtooth", 0.08);
      if (f.hp <= 0) {
        markDefeated(f);
        setTimeout(checkVictory, 450);
      }
    }
    function updateVoid(f) {
      if (roundWait && netMode === "local") return false;
      if (selectedArena.key !== "crush" || f.y < H + 28) return false;
      f.hp--;
      f.blink = 0.7;
      f.stun = 0.25;
      shake = 18;
      for (let i = 0; i < 28; i++) particles.push({ x: f.x, y: H - 5, vx: (Math.random() - 0.5) * 360, vy: -100 - Math.random() * 300, life: 0.4 + Math.random() * 0.45, c: fighterFxColor(f), r: 2 + Math.random() * 4 });
      beep(74, 0.3, "square", 0.075);
      if (f.hp <= 0) {
        markDefeated(f);
        setTimeout(checkVictory, 450);
        return true;
      }
      f.x = 70 + Math.random() * (W - 140);
      f.y = H + 8;
      f.vy = -790;
      f.vx += (Math.random() - 0.5) * 180;
      f.av += (Math.random() - 0.5) * 9;
      f.onGround = false;
      return true;
    }
    function updateFighter(f, dt) {
      if (f.dead) return;
      if (f.skin === "acid") {
        f.hasSpear = false;
        f.throwsLeft = 0;
      }
      f.cooldown = Math.max(0, f.cooldown - dt);
      f.stun = Math.max(0, f.stun - dt);
      f.blink = Math.max(0, f.blink - dt);
      f.shieldTime = Math.max(0, f.shieldTime - dt);
      if (f.skin === "trojan") {
        const target = faceAngle(f), current = Number.isFinite(f.shieldAim) ? f.shieldAim : target, delta = Math.atan2(Math.sin(target - current), Math.cos(target - current));
        f.shieldAim = current + delta * Math.min(1, dt * 5);
      }
      if (f.invisibleTime > 0) {
        f.invisibleTime = Math.max(0, f.invisibleTime - dt);
        f.vx = f.vy = f.av = 0;
        if (f === localFighter()) updateActionButtons();
        return;
      }
      f.wobble += dt * (4 + Math.min(5, Math.abs(f.vx) / 90));
      if (!f.hasSpear && f.cooldown <= 0 && f.skin !== "acid") {
        f.throwsLeft = f.maxThrows;
        f.hasSpear = true;
        if (f === player) {
          throwBtn.classList.remove("cooldown");
          document.querySelector("#ammoLabel").textContent = f.maxThrows === 2 ? "2 SHOTS READY" : "SHOT READY";
        }
      }
      const oldY = f.y;
      if (f.wallStuck) {
        f.vx = f.vy = 0;
        if (selectedArena.key === "acid") f.y += 31 * dt;
      } else f.vy += 1250 * selectedArena.gravity * dt;
      f.vx *= Math.pow(selectedArena.key === "space" ? 0.997 : 0.992, dt * 60);
      f.angle += f.av * dt;
      f.av *= Math.pow(0.96, dt * 60);
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      let landed = false;
      if (f.vy >= 0) {
        for (const p of platforms) {
          const oldFeet = oldY + 43, newFeet = f.y + 43;
          if (f.x > p.x - 13 && f.x < p.x + p.w + 13 && oldFeet <= p.y + 5 && newFeet >= p.y) {
            f.y = p.y - 43;
            f.vy = p.type === "sticky" ? -330 * selectedArena.gravity : f.vy > 150 ? -f.vy * 0.16 : 0;
            f.vx *= 0.86;
            f.onGround = true;
            landed = true;
            f.av += f.vx * 15e-4;
            if (p.type === "sticky") beep(145, 0.09, "triangle", 0.025);
            break;
          }
        }
      }
      if (selectedArena.key !== "crush" && f.y > ground - 43) {
        f.wallStuck = false;
        f.y = ground - 43;
        if (f.vy > 130) {
          f.vy *= -0.22;
          f.av += f.vx * 25e-4;
        } else f.vy = 0;
        f.vx *= Math.pow(0.78, dt * 60);
        f.onGround = true;
        landed = true;
      } else if (!landed) f.onGround = false;
      if (landed) {
        const rest = f.side === "player" ? -0.08 : Math.PI + 0.08;
        f.angle += (rest - f.angle) * Math.min(1, dt * 4);
      }
      if (updateVoid(f)) return;
      const crusherRoom = selectedArena.key === "crusher", wall = crusherRoom ? crusherInset + 52 : borderSize + 14, rightWall = crusherRoom ? W - crusherInset - 52 : W - wall, ceiling = selectedArena.key === "crush" ? 72 + 44 : crusherRoom ? crusherInsetY + 66 : borderSize + 44;
      if (f.x < wall) {
        const impact = Math.abs(f.vx);
        f.x = wall;
        if (f.skin === "web") {
          f.wallStuck = true;
          f.vx = f.vy = f.av = 0;
        } else {
          f.vx = impact * 0.32;
          f.av += 0.9 + impact * 0.012;
          f.vy -= Math.min(170, impact * 0.22);
          f.angle -= 0.3;
        }
      }
      if (f.x > rightWall) {
        const impact = Math.abs(f.vx);
        f.x = rightWall;
        if (f.skin === "web") {
          f.wallStuck = true;
          f.vx = f.vy = f.av = 0;
        } else {
          f.vx = -impact * 0.32;
          f.av -= 0.9 + impact * 0.012;
          f.vy -= Math.min(170, impact * 0.22);
          f.angle += 0.3;
        }
      }
      if (f.y < ceiling) {
        const impact = Math.abs(f.vy);
        f.y = ceiling;
        if (f.skin === "web" && !["acid", "crush"].includes(selectedArena.key)) {
          f.wallStuck = true;
          f.vx = f.vy = f.av = 0;
          f.angle = f.side === "player" ? Math.PI : 0;
        } else {
          f.wallStuck = false;
          f.vy = impact * 0.4;
          f.av += (Math.random() - 0.5) * 3;
          f.angle += (Math.random() - 0.5) * 0.45;
        }
      }
      updateLava(f, dt);
    }
    function pointSegment(px, py, a, b) {
      const dx = b[0] - a[0], dy = b[1] - a[1], l = dx * dx + dy * dy, t = l ? Math.max(0, Math.min(1, ((px - a[0]) * dx + (py - a[1]) * dy) / l)) : 0;
      return Math.hypot(px - (a[0] + dx * t), py - (a[1] + dy * t));
    }
    function bodyHit(f, x1, y1, x2, y2) {
      const rot = f.angle - (f.side === "player" ? 0 : Math.PI), cs = Math.cos(-rot), sn = Math.sin(-rot), flop = Math.max(-1, Math.min(1, f.vx / 260)), air = Math.max(-1, Math.min(1, f.vy / 400)), s = Math.sin(f.wobble), aim = faceAngle(f) - rot, toLocal = (x, y) => {
        const dx = x - f.x, dy = y - f.y;
        return [dx * cs - dy * sn, dx * sn + dy * cs];
      }, segments = [[[-5, 7], [-13 + s * 8, 24 - air * 5]], [[-13 + s * 8, 24 - air * 5], [-25 + s * 13, 40 - air * 9]], [[5, 7], [14 - s * 7, 23 + air * 4]], [[14 - s * 7, 23 + air * 4], [25 - s * 12, 40 + air * 7]], [[-3, -12], [-19 - flop * 9, -2 + s * 8]], [[-19 - flop * 9, -2 + s * 8], [-29 - flop * 16, 13 + s * 12]], [[4, -12], [Math.cos(aim) * 16, -12 + Math.sin(aim) * 16]], [[Math.cos(aim) * 16, -12 + Math.sin(aim) * 16], [Math.cos(aim) * 32, -12 + Math.sin(aim) * 32]], [[0, -19], [0, 10]]];
      for (let i = 0; i <= 5; i++) {
        const p = toLocal(x1 + (x2 - x1) * i / 5, y1 + (y2 - y1) * i / 5);
        if (Math.hypot(p[0] + flop * 2, p[1] + 34) <= 19) return true;
        for (const seg of segments) if (pointSegment(p[0], p[1], seg[0], seg[1]) <= (f.skin === "snowman" ? 13 : 8)) return true;
      }
      return false;
    }
    const shieldAngleOf = (f) => f.skin === "trojan" && Number.isFinite(f.shieldAim) ? f.shieldAim : faceAngle(f);
    const trojanShieldHit = (f, s) => {
      if (f.skin !== "trojan") return false;
      const shieldAngle = shieldAngleOf(f), cs = Math.cos(shieldAngle), sn = Math.sin(shieldAngle), dx = s.x - f.x, dy = s.y - (f.y - 15), along = dx * cs + dy * sn, side = -dx * sn + dy * cs;
      return along > 30 && along < 62 && Math.abs(side) < 44;
    };
    function stickToFighter(f, s) {
      s.stuck = true;
      s.stuckTo = f;
      s.embedAngle = s.a - f.angle;
      s.embedX = (s.x - f.x) * 0.45;
      s.embedY = (s.y - f.y) * 0.45;
      s.life = 99;
    }
    function hit(f, s) {
      const sameBotTeam = netMode === "local" && s.owner !== player && f !== player;
      if (f.dead || f.invisibleTime > 0 || s.owner === f || sameBotTeam || s.stuck) return;
      if (f.shieldTime > 0) {
        deflectProjectile(f, s);
        return;
      }
      if (trojanShieldHit(f, s)) {
        const speed2 = Math.hypot(s.vx, s.vy) || 360, dx = s.x - f.x, dy = s.y - (f.y - 15), d = Math.hypot(dx, dy) || 1;
        s.x = f.x + dx / d * 48;
        s.y = f.y - 15 + dy / d * 48;
        s.vx = -dx / d * speed2 * 1.2;
        s.vy = -dy / d * speed2 * 1.2;
        s.a = Math.atan2(s.vy, s.vx);
        s.stuck = false;
        s.stuckTo = null;
        s.life = 6;
        beep(190, 0.12, "triangle", 0.06);
        return;
      }
      s.owner.coins = (s.owner.coins || 0) + 1;
      f.hp--;
      f.stun = 0.52;
      f.blink = 0.3;
      const rx = s.x - f.x, ry = s.y - (f.y - 15), speed = Math.hypot(s.vx, s.vy) || 1, ix = s.vx / speed, iy = s.vy / speed, lever = rx * iy - ry * ix, torque = Math.hypot(rx, ry) < 12 ? 0 : Math.max(-16, Math.min(16, lever * 0.38)), blast = Math.min(720, speed * 0.58), hitFx = fighterFxColor(f);
      f.vx += ix * blast;
      f.vy += iy * blast * 0.62 - 250;
      f.av += torque;
      s.stuck = true;
      s.stuckTo = f;
      s.embedAngle = s.a - f.angle;
      s.embedX = (s.x - f.x) * 0.45;
      s.embedY = (s.y - f.y) * 0.45;
      s.life = 99;
      shake = 17;
      for (let i = 0; i < 31; i++) particles.push({ x: s.x, y: s.y, vx: (Math.random() - 0.5) * 520, vy: (Math.random() - 0.78) * 430, life: 0.42 + Math.random() * 0.65, c: hitFx, r: 2 + Math.random() * 4 });
      beep(52, 0.24, "square", 0.075);
      if (f.hp <= 0) {
        s.owner.coins += 3;
        markDefeated(f);
        f.vx += ix * 180;
        f.vy -= 110;
        f.av += torque * 0.35;
        for (const spear of spears) {
          if (spear.stuckTo === f) {
            spear.stuckTo = null;
            spear.stuck = false;
            spear.life = 1.2;
            spear.vx = f.vx * 0.3;
            spear.vy = f.vy * 0.3;
          }
        }
        setTimeout(checkVictory, 500);
      }
    }
    function refreshScores() {
      const me = localFighter().side, my = wins[me] || 0, rival = Math.max(0, ...Object.entries(wins).filter(([s]) => s !== me).map(([, v]) => v));
      PScore.textContent = my;
      BScore.textContent = rival;
    }
    function showRoundResult(winner) {
      refreshScores();
      const match = (wins[winner] || 0) >= 3, localWon = winner === localFighter().side;
      document.querySelector("#resultEyebrow").textContent = match ? "MATCH COMPLETE" : "LAST FIGHTER";
      document.querySelector("#resultTitle").textContent = localWon ? match ? "YOU WIN THE PIT!" : "YOU SURVIVED!" : match ? "RIVAL WINS THE PIT" : "RIVAL SURVIVES";
      document.querySelector("#resultText").textContent = match ? "Returning to the home screen..." : "Preparing the next round...";
      const btn = document.querySelector("#againButton");
      btn.innerHTML = (netMode === "local" ? "PLEASE WAIT" : "RETURN HOME") + " <span>\u2192</span>";
      btn.disabled = netMode === "local";
      resultCard.hidden = false;
    }
    function captureEconomy() {
      var _a2;
      const fs = allFighters(), me = localFighter();
      playerCoins = (_a2 = me.coins) != null ? _a2 : playerCoins;
      if (netMode === "host") clients.forEach((c, i) => {
        const f = fs[i + 1];
        if (f) c.coins = f.coins || 0;
      });
      saveUpgrades();
      updateUpgradeUI();
    }
    function setFighterAway(f, away) {
      if (!f || f.away === away) return;
      if (away) {
        f.away = true;
        f.awayWasDead = f.dead;
        f.dead = true;
        f.vx = f.vy = 0;
        f.x = -9999;
        f.y = -9999;
        for (const s of spears) {
          if (s.stuckTo === f) {
            s.stuckTo = null;
            s.stuck = false;
            s.life = Math.min(s.life, 1);
          }
        }
      } else {
        f.away = false;
        f.dead = !!f.awayWasDead;
        if (!f.dead) {
          f.x = 80 + Math.random() * (W - 160);
          f.y = ground - 105;
          f.vy = -130;
          f.blink = 0.9;
        }
      }
    }
    function recomputeMultiplayerPause() {
      if (netMode !== "host") return;
      const open = clients.filter((c) => c == null ? void 0 : c.open), someoneAway = hostAway || open.some((c) => c.away);
      multiplayerPaused = open.length + 1 === 2 && someoneAway;
      document.querySelector("#roundLabel").textContent = multiplayerPaused ? "PAUSED \u2014 FIGHTER CUSTOMIZING" : selectedArena.name;
    }
    function announcePresence(away) {
      if (netMode === "guest" && (conn == null ? void 0 : conn.open)) conn.send({ type: "presence", away });
      if (netMode === "host") {
        hostAway = away;
        setFighterAway(player, away);
        recomputeMultiplayerPause();
      }
    }
    function connectedHome(ended = false) {
      captureEconomy();
      if (ended && !matchEnded) recordTutorialReturn();
      if (netMode !== "local" && !atHome) announcePresence(true);
      atHome = true;
      matchEnded = ended;
      resultCard.hidden = true;
      document.querySelector("#arenaRoulette").hidden = true;
      document.querySelector("#upgradesCard").hidden = true;
      startCard.hidden = false;
      document.querySelector("#homeButton").hidden = true;
      document.querySelector("#roundLabel").textContent = ended ? "MATCH COMPLETE" : "CONNECTED";
      const start = document.querySelector("#startButton"), online = document.querySelector("#onlineButton"), upgrades = document.querySelector("#upgradesButton");
      start.innerHTML = "CONTINUE <span>\u2192</span>";
      start.disabled = false;
      online.innerHTML = "LEAVE ROOM <span>\xD7</span>";
      online.hidden = false;
      upgrades.hidden = false;
    }
    function returnToMenu(completed = false) {
      captureEconomy();
      if (completed) recordTutorialReturn();
      if (netMode !== "local") {
        connectedHome(true);
        return;
      }
      running = false;
      roundWait = true;
      atHome = false;
      matchEnded = false;
      resultCard.hidden = true;
      document.querySelector("#arenaRoulette").hidden = true;
      startCard.hidden = false;
      document.querySelector("#homeButton").hidden = true;
      document.querySelector("#roundLabel").textContent = "FIRST TO 3";
      const start = document.querySelector("#startButton"), online = document.querySelector("#onlineButton"), upgrades = document.querySelector("#upgradesButton");
      start.innerHTML = "ENTER THE PIT <span>\u2192</span>";
      start.disabled = false;
      online.innerHTML = "PLAY ONLINE <span>\u2301</span>";
      online.hidden = false;
      upgrades.hidden = false;
    }
    function startPvpCountdown(match) {
      clearInterval(roundTimer);
      if (match) {
        setTimeout(() => connectedHome(true), 2100);
        return;
      }
      let seconds = 10;
      const paint = () => {
        document.querySelector("#resultText").textContent = "NEXT ROUND STARTING IN " + seconds + " SECOND" + (seconds === 1 ? "" : "S");
        document.querySelector("#roundLabel").textContent = "NEXT ROUND: " + seconds;
      };
      paint();
      roundTimer = setInterval(() => {
        seconds--;
        paint();
        if (seconds <= 0) {
          clearInterval(roundTimer);
          roundTimer = null;
          if (netMode === "host") spinArena();
        }
      }, 1e3);
    }
    function endRound(winner) {
      if (roundWait || multiplayerPaused) return;
      if (netMode === "local" && player.hp < player.maxHp) flawlessMatch = false;
      roundWait = true;
      captureEconomy();
      wins[winner] = (wins[winner] || 0) + 1;
      playerScore = wins.player || 0;
      botScore = Math.max(0, ...Object.entries(wins).filter(([s]) => s !== "player").map(([, v]) => v));
      const match = wins[winner] >= 3;
      if (netMode === "local" && winner === "player") {
        if (match) addRankXP(flawlessMatch ? 0 : 20, flawlessMatch);
        else addRankXP(10);
      }
      showRoundResult(winner);
      if (netMode === "host") {
        for (const c of clients) if (c == null ? void 0 : c.open) c.send({ type: "round", winner, wins, match });
      }
      if (netMode === "local") setTimeout(() => match ? returnToMenu(true) : spinArena(), 2100);
      else if (netMode === "host") startPvpCountdown(match);
    }
    function updatePlatforms(dt) {
      for (const p of platforms) {
        p.dx = p.dy = 0;
        if (p.type === "ceiling") continue;
        const ox = p.x, oy = p.y;
        let wrapped = false;
        if (selectedArena.key === "acid") {
          const scroll = 31 * dt;
          p.y += scroll;
          p.baseY += scroll;
          p.dy = scroll;
          if (p.y > ground - 8) {
            const top = Math.min(...platforms.map((q) => q.y));
            p.y = top - 82 - Math.random() * 35;
            p.baseY = p.y;
            p.x = 45 + Math.random() * (W - p.w - 90);
            p.w = 90 + Math.random() * 75;
            p.type = Math.random() < 0.35 ? "thin" : "thick";
            p.dy = 0;
            wrapped = true;
          }
        } else if (selectedArena.key === "crush") {
          const scroll = -31 * dt;
          p.y += scroll;
          p.baseY += scroll;
          p.dy = scroll;
          if (p.y + p.h < 72) {
            const bottom = Math.max(...platforms.filter((q) => q.type !== "ceiling").map((q) => q.y));
            p.y = Math.max(H + 25, bottom + 78 + Math.random() * 30);
            p.baseY = p.y;
            p.x = 45 + Math.random() * (W - p.w - 90);
            p.w = 90 + Math.random() * 75;
            p.type = Math.random() < 0.35 ? "thin" : "thick";
            p.dy = 0;
            wrapped = true;
          }
        }
        if (!p.move) {
          if (!wrapped && p.dy) for (const f of allFighters()) {
            if (!f.dead && Math.abs(f.y + 43 - oy) < 8 && f.x > ox - 12 && f.x < ox + p.w + 12) f.y += p.dy;
          }
          continue;
        }
        if (p.move.wrap) {
          p.x += p.move.dir * p.move.speed * 115 * dt;
          if (p.move.dir > 0 && p.x > W + 45) {
            p.x = -p.w - 45;
            wrapped = true;
          }
          if (p.move.dir < 0 && p.x + p.w < -45) {
            p.x = W + 45;
            wrapped = true;
          }
        } else {
          p.t += dt * p.move.speed;
          const offset = Math.sin(p.t) * p.move.range;
          if (p.move.axis === "x") p.x = p.baseX + offset;
          else p.y = p.baseY + offset;
        }
        p.dx = wrapped ? 0 : p.x - ox;
        p.dy = wrapped ? 0 : p.y - oy;
        for (const f of allFighters()) {
          if (!wrapped && !f.dead && Math.abs(f.y + 43 - oy) < 7 && f.x > ox - 12 && f.x < ox + p.w + 12) {
            f.x += p.dx;
            f.y += p.dy;
          }
        }
      }
    }
    function splitBoss(boss) {
      if (boss.dead || boss.splitDone || boss.hp < 2) return;
      const count = boss.hp;
      boss.hp = 1;
      boss.splitDone = true;
      boss.splitRemaining = 10;
      for (let i = 1; i < count; i++) {
        const clone = fighter("clone" + i);
        clone.hp = clone.maxHp = 1;
        clone.color = colors.red;
        clone.isClone = true;
        clone.splitParent = boss;
        clone.difficulty = 3;
        clone.x = Math.max(55, Math.min(W - 55, boss.x + (i - (count - 1) / 2) * 42));
        clone.y = Math.max(65, boss.y - 18 - Math.abs(i - count / 2) * 7);
        clone.vx = (i - (count - 1) / 2) * 105;
        clone.vy = -190 - Math.random() * 90;
        clone.ai = 0.1 + Math.random() * 0.3;
        extraFighters.push(clone);
      }
      for (let i = 0; i < 35; i++) particles.push({ x: boss.x, y: boss.y - 15, vx: (Math.random() - 0.5) * 520, vy: (Math.random() - 0.6) * 430, life: 0.7, c: "#ff4b35", r: 3 });
      shake = 19;
      beep(70, 0.35, "sawtooth", 0.08);
    }
    function recombineBoss(boss) {
      const clones = extraFighters.filter((f) => f.isClone && f.splitParent === boss), living = [boss, ...clones].filter((f) => !f.dead && f.hp > 0);
      if (!living.length) return;
      const lives = living.reduce((n, f) => n + Math.max(0, f.hp), 0), x = living.reduce((n, f) => n + f.x, 0) / living.length, y = living.reduce((n, f) => n + f.y, 0) / living.length, vx = living.reduce((n, f) => n + f.vx, 0) / living.length, vy = living.reduce((n, f) => n + f.vy, 0) / living.length;
      boss.dead = false;
      boss.hp = Math.max(1, lives);
      boss.x = x;
      boss.y = y;
      boss.vx = vx;
      boss.vy = vy - 120;
      boss.hasSpear = true;
      boss.throwsLeft = 1;
      boss.cooldown = 0;
      boss.splitRemaining = 0;
      boss.splitDone = false;
      boss.splitTimer = 10;
      for (const s of spears) {
        if (clones.includes(s.owner)) s.owner = boss;
        if (clones.includes(s.stuckTo)) {
          s.stuckTo = null;
          s.stuck = false;
          s.life = Math.min(s.life, 1);
        }
      }
      extraFighters = extraFighters.filter((f) => !clones.includes(f));
      for (let i = 0; i < 42; i++) particles.push({ x, y: y - 15, vx: (Math.random() - 0.5) * 420, vy: (Math.random() - 0.5) * 350, life: 0.55, c: "#ff4b35", r: 3 });
      shake = 14;
      beep(115, 0.3, "triangle", 0.07);
    }
    function update(dt) {
      if (roundWait && netMode === "local") return;
      updatePlatforms(dt);
      for (const f of allFighters()) updateFighter(f, dt);
      for (const f of allFighters()) updateSpecial(f, dt);
      if (!roundWait && netMode === "local") {
        if (bot.splitTimer > 0 && !bot.splitDone) {
          bot.splitTimer -= dt;
          if (bot.splitTimer <= 0) splitBoss(bot);
        }
        if (bot.splitRemaining > 0) {
          bot.splitRemaining -= dt;
          if (bot.splitRemaining <= 0) recombineBoss(bot);
        }
        for (const enemy of [bot, ...extraFighters]) {
          if (enemy.dead) continue;
          enemy.ai -= dt;
          if (enemy.ai <= 0) {
            const level = enemy.difficulty || 0.01;
            enemy.ai = botMoveDelay(level) + Math.random() * botMoveJitter(level);
            const dx = player.x - enemy.x, hop = -85 - Math.random() * (95 + level * 18), power = Math.min(1.35, 0.88 + level * 0.07);
            fling(enemy, Math.sign(dx) * (75 + level * 16 + Math.random() * 110) + (Math.random() - 0.5) * 65, hop, power);
            if (enemy.hasSpear && Math.abs(dx) < W * 0.9 && Math.random() < Math.min(0.92, 0.28 + level * 0.13)) setTimeout(() => throwSpear(enemy), 45 + Math.random() * Math.max(55, 175 - level * 30));
          }
        }
      }
      for (const s of spears) {
        s.life -= dt;
        if (s.stuckTo) {
          s.x = s.stuckTo.x + s.embedX;
          s.y = s.stuckTo.y + s.embedY;
          s.a = s.stuckTo.angle + s.embedAngle;
        } else if (!s.stuck) {
          const ox = s.x, oy = s.y, bouncy = s.weapon === "star" || s.weapon === "shield" || s.ricochet;
          s.vy += 720 * selectedArena.gravity * dt;
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          s.a = Math.atan2(s.vy, s.vx);
          if (s.weapon === "star") s.spinA = (s.spinA || 0) + dt * 18;
          if (s.weapon === "katana") s.spinA = (s.spinA || 0) + dt * 11;
          for (const f of allFighters()) {
            if (bodyHit(f, ox, oy, s.x, s.y)) {
              hit(f, s);
              if (s.stuck) break;
            }
          }
          for (const p of platforms) {
            const crosses = Math.max(ox, s.x) >= p.x && Math.min(ox, s.x) <= p.x + p.w && Math.max(oy, s.y) >= p.y && Math.min(oy, s.y) <= p.y + p.h;
            if (p.type !== "thin" && p.type !== "sticky" && crosses) {
              s.x = ox;
              s.y = oy;
              if (bouncy && s.bouncesLeft > 0) {
                s.vx = -s.vx * 0.78;
                s.vy = -s.vy * 0.78;
                s.bouncesLeft--;
                beep(150, 0.04, "triangle", 0.025);
              } else {
                s.stuck = true;
                s.life = 12;
                beep(90, 0.05, "square", 0.02);
              }
              break;
            }
          }
          const spearTop = selectedArena.key === "crusher" ? crusherInsetY + 38 : borderSize, spearLeft = selectedArena.key === "crusher" ? crusherInset + 38 : borderSize, spearRight = selectedArena.key === "crusher" ? W - crusherInset - 38 : W - borderSize;
          if (!s.stuck && s.y >= ground) {
            s.y = ground;
            if (bouncy && s.bouncesLeft > 0) {
              s.vy = -Math.abs(s.vy) * 0.78;
              s.bouncesLeft--;
              beep(150, 0.04, "triangle", 0.025);
            } else {
              s.stuck = true;
              s.life = 12;
              beep(75, 0.05, "square", 0.02);
            }
          }
          if (!s.stuck && s.y <= spearTop) {
            s.y = spearTop;
            if (bouncy && s.bouncesLeft > 0) {
              s.vy = Math.abs(s.vy) * 0.78;
              s.bouncesLeft--;
              beep(150, 0.04, "triangle", 0.025);
            } else {
              s.stuck = true;
              s.life = 12;
              beep(75, 0.05, "square", 0.02);
            }
          }
          if (!s.stuck && s.x <= spearLeft) {
            s.x = spearLeft;
            if (bouncy && s.bouncesLeft > 0) {
              s.vx = Math.abs(s.vx) * 0.78;
              s.bouncesLeft--;
              beep(150, 0.04, "triangle", 0.025);
            } else {
              s.stuck = true;
              s.life = 12;
              beep(75, 0.05, "square", 0.02);
            }
          }
          if (!s.stuck && s.x >= spearRight) {
            s.x = spearRight;
            if (bouncy && s.bouncesLeft > 0) {
              s.vx = -Math.abs(s.vx) * 0.78;
              s.bouncesLeft--;
              beep(150, 0.04, "triangle", 0.025);
            } else {
              s.stuck = true;
              s.life = 12;
              beep(75, 0.05, "square", 0.02);
            }
          }
        }
      }
      spears = spears.filter((s) => s.life > 0);
      for (const p of particles) {
        p.life -= dt;
        p.vy += 500 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
      }
      particles = particles.filter((p) => p.life > 0);
      shake *= Math.pow(0.75, dt * 60);
    }
    function line(x1, y1, x2, y2, w = 4, c = colors.ink) {
      ctx.strokeStyle = c;
      ctx.lineWidth = w;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    function drawFighter(f) {
      if (f.dead && f.hideCorpse) return;
      const flash = f.blink > 0 && Math.floor(f.blink * 40) % 2 === 0, normal = f.color || (f.side === "player" ? colors.blue : f.side === "bot" ? colors.red : ["#b34cff", "#ff9c2f", "#24b883", "#f0c530"][Math.max(0, parseInt(f.side.slice(1)) || 0) % 4]), base = f.skin === "snowman" ? "#eef7fa" : f.skin === "web" ? "#e73b35" : f.skin === "santa" ? "#d9362b" : f.skin === "ninja" ? normal : f.skin === "samurai" ? "#762d28" : f.skin === "iron" ? "#b82324" : f.skin === "gladiator" ? "#a56b2a" : f.skin === "spaceman" ? "#edf6ff" : normal;
      ctx.save();
      ctx.translate(f.x, f.y);
      const bodyRot = f.angle - (f.side === "player" ? 0 : Math.PI);
      ctx.rotate(bodyRot);
      const flop = Math.max(-1, Math.min(1, f.vx / 260)), air = Math.max(-1, Math.min(1, f.vy / 400)), s = Math.sin(f.wobble), body = flash ? "#fff" : base, aim = faceAngle(f) - bodyRot;
      const limb = (a, b, c1, c = body, w = 7) => {
        ctx.strokeStyle = c;
        ctx.lineWidth = w;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.quadraticCurveTo(b[0], b[1], c1[0], c1[1]);
        ctx.stroke();
      };
      ctx.fillStyle = "rgba(23,23,19,.12)";
      ctx.beginPath();
      ctx.ellipse(0, 43, 28, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      if (f.skin === "samurai") {
        line(-18, 15, 18, -40, 5, "#c7d0d6");
        line(18, 15, -18, -40, 5, "#c7d0d6");
      }
      const stick = "#704521";
      limb([-5, 7], [-13 + s * 8, 24 - air * 5], [-25 + s * 13, 40 - air * 9], f.skin === "snowman" ? stick : body, f.skin === "snowman" ? 5 : 7);
      limb([5, 7], [14 - s * 7, 23 + air * 4], [25 - s * 12, 40 + air * 7], f.skin === "snowman" ? stick : body, f.skin === "snowman" ? 5 : 7);
      if (f.skin === "snowman") {
        limb([-3, -12], [-18, -5 + s * 4], [-31, 5 + s * 7], stick, 4);
        limb([4, -12], [18, -6 - s * 4], [31, 3 - s * 7], stick, 4);
      } else {
        limb([-3, -12], [-19 - flop * 9, -2 + s * 8], [-29 - flop * 16, 13 + s * 12]);
        limb([4, -12], [Math.cos(aim) * 16, -12 + Math.sin(aim) * 16], [Math.cos(aim) * 32, -12 + Math.sin(aim) * 32]);
      }
      ctx.strokeStyle = body;
      ctx.lineWidth = f.skin === "snowman" ? 25 : f.skin === "iron" ? 16 : 11;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, -19);
      ctx.quadraticCurveTo(-flop * 5, -3 + s * 2, 0, 10);
      ctx.stroke();
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(-flop * 2, -34, 16, 0, Math.PI * 2);
      ctx.fill();
      if (f.skin === "ninja") {
        ctx.fillStyle = "#111";
        ctx.fillRect(-17, -40, 31, 10);
        ctx.fillStyle = "#fff";
        ctx.fillRect(-10, -37, 6, 2);
        ctx.fillRect(4, -37, 6, 2);
      }
      if (f.skin === "samurai") {
        ctx.fillStyle = "#222";
        ctx.fillRect(-16, -45, 32, 7);
        ctx.fillStyle = "#a62525";
        ctx.fillRect(-12, -42, 24, 4);
      }
      if (f.skin === "santa") {
        ctx.fillStyle = "#d9362b";
        ctx.beginPath();
        ctx.moveTo(-15, -44);
        ctx.lineTo(1, -67);
        ctx.lineTo(14, -44);
        ctx.fill();
        line(-15, -44, 14, -44, 6, "#fff");
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(1, -67, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(0, -25, 15, 13, 0, 0, Math.PI);
        ctx.fill();
        line(-8, 5, 8, 5, 4, "#111");
      }
      if (f.skin === "snowman") {
        ctx.fillStyle = "#222";
        for (const y of [-10, 0, 10]) {
          ctx.beginPath();
          ctx.arc(0, y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "#ef8b2d";
        ctx.beginPath();
        ctx.moveTo(0, -32);
        ctx.lineTo(14, -29);
        ctx.lineTo(0, -27);
        ctx.fill();
      }
      if (f.skin === "web") {
        ctx.fillStyle = "#315bd6";
        ctx.fillRect(-6, -18, 12, 28);
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.ellipse(-7, -36, 4, 7, -0.35, 0, Math.PI * 2);
        ctx.ellipse(7, -36, 4, 7, 0.35, 0, Math.PI * 2);
        ctx.fill();
      }
      if (f.skin === "iron") {
        ctx.fillStyle = "#e7b63e";
        ctx.fillRect(-10, -43, 20, 9);
        ctx.fillRect(-9, -17, 18, 7);
        ctx.fillStyle = "#79e9ff";
        ctx.beginPath();
        ctx.arc(0, -5, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      if (f.skin === "gladiator") {
        ctx.fillStyle = "#d5a13c";
        ctx.beginPath();
        ctx.moveTo(-16, -43);
        ctx.lineTo(0, -58);
        ctx.lineTo(16, -43);
        ctx.lineTo(12, -27);
        ctx.lineTo(-12, -27);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#8f2c24";
        ctx.fillRect(-3, -60, 6, 18);
        ctx.fillStyle = "#d5a13c";
        ctx.beginPath();
        ctx.arc(-16, -11, 10, 0, Math.PI * 2);
        ctx.fill();
      }
      if (f.skin === "spaceman") {
        ctx.fillStyle = "#7c91a8";
        ctx.fillRect(-14, -19, 7, 25);
        ctx.fillStyle = "#eaf4fa";
        ctx.fillRect(-10, -18, 20, 27);
        ctx.fillStyle = "#58d8ff";
        ctx.fillRect(-7, -10, 14, 8);
        ctx.strokeStyle = "#879aab";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(-flop * 2, -34, 21, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#17384f";
        ctx.beginPath();
        ctx.ellipse(-flop * 2, -35, 13, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#bdf4ff";
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.ellipse(-flop * 5, -38, 5, 3, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      if (f.hasSpear) {
        ctx.save();
        ctx.translate(0, -12);
        ctx.rotate(aim);
        if (f.skin === "iron") {
          ctx.fillStyle = f.beamActive ? "#fff" : "#79e9ff";
          ctx.beginPath();
          ctx.arc(31, 0, f.beamActive ? 8 : 5, 0, Math.PI * 2);
          ctx.fill();
        } else if (f.skin === "ninja") {
          ctx.fillStyle = "#222";
          ctx.beginPath();
          for (let i = 0; i < 8; i++) {
            const a = i * Math.PI / 4, r = i % 2 ? 5 : 13;
            i ? ctx.lineTo(36 + Math.cos(a) * r, Math.sin(a) * r) : ctx.moveTo(36 + Math.cos(a) * r, Math.sin(a) * r);
          }
          ctx.closePath();
          ctx.fill();
        } else if (f.skin === "snowman") {
          ctx.fillStyle = "#fff";
          ctx.strokeStyle = "#9ecbd6";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(36, 0, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else if (f.skin === "web") {
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(25, 0);
          for (let x = 25; x < 72; x += 5) ctx.lineTo(x, Math.sin(x * 0.45) * 5);
          ctx.stroke();
        } else if (f.skin === "samurai") {
          ctx.strokeStyle = "#dce4e8";
          ctx.lineWidth = 6;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(32, 0);
          ctx.quadraticCurveTo(58, -5, 82, 0);
          ctx.stroke();
          line(31, -8, 31, 8, 3, "#111");
          line(20, 0, 30, 0, 6, "#4a2417");
        } else {
          const weaponInk = f.side === "player" || !isDarkArena() ? colors.ink : "#fff";
          line(28, 0, 78, 0, 4, weaponInk);
          ctx.fillStyle = weaponInk;
          ctx.beginPath();
          ctx.moveTo(88, 0);
          ctx.lineTo(72, -7);
          ctx.lineTo(74, 7);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();
      }
      ctx.restore();
      for (let i = 0; i < f.hp; i++) {
        ctx.fillStyle = base;
        ctx.fillRect(f.x - (f.maxHp * 14 - 4) / 2 + i * 14, f.y - 78, 10, 4);
      }
    }
    function drawPhantom(f) {
      const ink = isDarkArena() ? "#fff" : colors.ink, a = faceAngle(f), rot = f.angle - (f.side === "player" ? 0 : Math.PI);
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(rot);
      ctx.strokeStyle = ink;
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      const curve = (x1, y1, x2, y2, x3, y3) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(x2, y2, x3, y3);
        ctx.stroke();
      };
      curve(-3, 8, -17, 22, -27, 39);
      curve(4, 8, 17, 22, 28, 39);
      curve(-2, -11, -18, -3, -29, 10);
      curve(3, -11, Math.cos(a - rot) * 16, -12 + Math.sin(a - rot) * 16, Math.cos(a - rot) * 31, -12 + Math.sin(a - rot) * 31);
      curve(0, -18, -3, -4, 0, 9);
      ctx.beginPath();
      ctx.arc(0, -34, 11, 0, Math.PI * 2);
      ctx.stroke();
      if (f.hasSpear) {
        ctx.save();
        ctx.translate(0, -12);
        ctx.rotate(a - rot);
        for (const offset of f.maxThrows === 2 ? [-4, 4] : [0]) {
          ctx.save();
          ctx.translate(0, offset);
          ctx.strokeStyle = ink;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(26, 0);
          ctx.lineTo(78, 0);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(88, 0);
          ctx.lineTo(73, -7);
          ctx.lineTo(73, 7);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
        ctx.restore();
      }
      ctx.restore();
      for (let i = 0; i < f.hp; i++) {
        ctx.fillStyle = ink;
        ctx.fillRect(f.x - (f.maxHp * 14 - 4) / 2 + i * 14, f.y - 78, 10, 4);
      }
    }
    const baseDrawFighter = drawFighter;
    drawFighter = (f) => {
      if (f.invisibleTime > 0) return;
      if (f.skin === "phantom") {
        drawPhantom(f);
        return;
      }
      baseDrawFighter(f);
    };
    const acidVisualFighter = drawFighter;
    drawFighter = (f) => {
      if (f.skin !== "acid") {
        acidVisualFighter(f);
        return;
      }
      const old = f.color;
      f.color = "#73e642";
      acidVisualFighter(f);
      f.color = old;
      ctx.save();
      ctx.strokeStyle = "rgba(142,255,83,.55)";
      ctx.shadowColor = "#73e642";
      ctx.shadowBlur = 16;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(f.x, f.y - 21, 31, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };
    const decoratedDrawFighter = drawFighter;
    drawFighter = (f) => {
      decoratedDrawFighter(f);
      if (f.dead && f.hideCorpse) return;
      if (f.skin !== "trojan") return;
      const a = faceAngle(f), shieldA = shieldAngleOf(f), rot = f.angle - (f.side === "player" ? 0 : Math.PI);
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(rot);
      ctx.fillStyle = "#d5a13c";
      ctx.beginPath();
      ctx.moveTo(-17, -43);
      ctx.lineTo(-12, -57);
      ctx.lineTo(0, -64);
      ctx.lineTo(12, -57);
      ctx.lineTo(17, -43);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#9d2226";
      ctx.fillRect(-3, -67, 6, 20);
      ctx.fillRect(-11, -61, 22, 5);
      ctx.strokeStyle = "#a66a1f";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-16, -39);
      ctx.lineTo(16, -39);
      ctx.stroke();
      const sa = shieldA - rot, sx = Math.cos(sa) * 46, sy = -4 + Math.sin(sa) * 46;
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(sa);
      ctx.fillStyle = "#b8862f";
      ctx.strokeStyle = "#f0d17b";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-13, -43);
      ctx.quadraticCurveTo(0, -49, 13, -43);
      ctx.lineTo(15, 32);
      ctx.quadraticCurveTo(0, 43, -15, 32);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.restore();
    };
    const bigTrojanShieldDraw = drawFighter;
    drawFighter = (f) => bigTrojanShieldDraw(f);
    const spaceVisualFighter = drawFighter;
    drawFighter = (f) => {
      if (f.skin !== "spaceman") {
        spaceVisualFighter(f);
        return;
      }
      const held = f.hasSpear;
      f.hasSpear = false;
      spaceVisualFighter(f);
      f.hasSpear = held;
      if (f.dead || !held) return;
      const a = faceAngle(f), rot = f.angle - (f.side === "player" ? 0 : Math.PI);
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(rot);
      ctx.translate(36, -12);
      ctx.rotate(a - rot);
      ctx.fillStyle = "#56606a";
      ctx.strokeStyle = "#d9f5ff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#28343d";
      ctx.beginPath();
      ctx.arc(-3, -3, 2.5, 0, Math.PI * 2);
      ctx.arc(4, 4, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    function drawAcidBlob(f) {
      if (f.dead && f.hideCorpse) return;
      const flash = f.blink > 0 && Math.floor(f.blink * 40) % 2 === 0, rot = f.angle - (f.side === "player" ? 0 : Math.PI), wave = Math.sin(f.wobble) * 3, body = flash ? "#f6ffd9" : "#73e642";
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(rot);
      if (f.dead) {
        ctx.translate(0, 23);
        ctx.scale(1.25, 0.55);
      }
      ctx.shadowColor = "#73e642";
      ctx.shadowBlur = 15;
      ctx.fillStyle = body;
      ctx.strokeStyle = "#b9ff72";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-31, 25);
      ctx.bezierCurveTo(-39, 7, -30, -8, -20, -16);
      ctx.bezierCurveTo(-24, -38, -12, -53, 2, -51);
      ctx.bezierCurveTo(18, -50, 28, -34, 24, -17);
      ctx.bezierCurveTo(39, -6, 40, 13, 29, 27);
      ctx.quadraticCurveTo(18, 38 + wave, 8, 29);
      ctx.quadraticCurveTo(-3, 43 - wave, -13, 29);
      ctx.quadraticCurveTo(-23, 37, -31, 25);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "#d8ff63";
      for (const drop of [[-21, 18, 6], [8, -31, 5], [22, 12, 4], [-5, 28, 5]]) {
        ctx.beginPath();
        ctx.arc(drop[0], drop[1] + wave * 0.25, drop[2], 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
      for (let i = 0; i < f.hp; i++) {
        ctx.fillStyle = "#73e642";
        ctx.fillRect(f.x - (f.maxHp * 14 - 4) / 2 + i * 14, f.y - 78, 10, 4);
      }
    }
    const blobDrawFighter = drawFighter;
    drawFighter = (f) => {
      if (f.skin === "acid") {
        drawAcidBlob(f);
        return;
      }
      blobDrawFighter(f);
    };
    const baseBodyHit = bodyHit;
    bodyHit = (f, x1, y1, x2, y2) => {
      if (baseBodyHit(f, x1, y1, x2, y2)) return true;
      if (f.skin !== "trojan") return false;
      const a = shieldAngleOf(f), cs = Math.cos(a), sn = Math.sin(a), mx = (x1 + x2) / 2 - f.x, my = (y1 + y2) / 2 - (f.y - 15), along = mx * cs + my * sn, side = -mx * sn + my * cs;
      return along > 30 && along < 62 && Math.abs(side) < 44;
    };
    function drawSpecial(f) {
      if (f.beamActive && !f.dead) {
        const a = faceAngle(f), x = f.x + Math.cos(a) * 30, y = f.y - 12 + Math.sin(a) * 30;
        ctx.save();
        ctx.globalAlpha = 0.35 + 0.25 * Math.sin(last * 0.03);
        line(x, y, x + Math.cos(a) * Math.max(W, H) * 1.5, y + Math.sin(a) * Math.max(W, H) * 1.5, 15, "#43cfff");
        line(x, y, x + Math.cos(a) * Math.max(W, H) * 1.5, y + Math.sin(a) * Math.max(W, H) * 1.5, 5, "#fff");
        ctx.restore();
      }
      if (f.skin === "gladiator" && !f.dead) {
        const m = macePosition(f);
        line(f.x, f.y - 12, m.x, m.y, 3, "#4c3927");
        ctx.fillStyle = "#3b332d";
        ctx.beginPath();
        ctx.arc(m.x, m.y, 12, 0, Math.PI * 2);
        ctx.fill();
        for (let i = 0; i < 8; i++) {
          const a = i * Math.PI / 4;
          line(m.x + Math.cos(a) * 10, m.y + Math.sin(a) * 10, m.x + Math.cos(a) * 18, m.y + Math.sin(a) * 18, 3, "#6b5a4b");
        }
        ctx.save();
        ctx.shadowColor = "#2fdcff";
        ctx.shadowBlur = 13;
        ctx.strokeStyle = "#58ddff";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i <= 12; i++) {
          const a = i * Math.PI / 6 + last * 0.012, r = 15 + (i % 2 ? 4 : -2), x = m.x + Math.cos(a) * r, y = m.y + Math.sin(a) * r;
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.stroke();
        ctx.strokeStyle = "#d9fbff";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(m.x - 18, m.y + 2);
        ctx.lineTo(m.x - 8, m.y - 10);
        ctx.lineTo(m.x, m.y + 9);
        ctx.lineTo(m.x + 9, m.y - 11);
        ctx.lineTo(m.x + 18, m.y);
        ctx.stroke();
        ctx.restore();
      }
    }
    const baseDrawSpecial = drawSpecial;
    drawSpecial = (f) => {
      if (f.shieldTime > 0) {
        ctx.save();
        ctx.strokeStyle = "#58ddff";
        ctx.shadowColor = "#2fdcff";
        ctx.shadowBlur = 18;
        ctx.globalAlpha = 0.75 + 0.25 * Math.sin(last * 0.022);
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.ellipse(f.x, f.y - 19, 36, 53, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      baseDrawSpecial(f);
    };
    const isDarkArena = () => ["jungle", "cave", "space", "orbital3", "lava", "neon", "acid", "crusher", "halves", "doors", "moon"].includes(selectedArena.key);
    function drawArc() {
      const me = localFighter();
      if (!me.hasSpear || me.dead || roundWait) return;
      const a = faceAngle(me), straight = me.skin === "spaceman" || selectedArena.key === "orbital3", speed = Math.min(W, H) * 1.25 + 280, dark = isDarkArena(), aimColor = dark ? "rgba(255,255,255,.82)" : "rgba(23,23,19,.42)";
      let x = me.x + Math.cos(a) * 36, y = me.y - 12 + Math.sin(a) * 36, vx = Math.cos(a) * speed + me.vx * 0.35, vy = Math.sin(a) * speed + me.vy * 0.2;
      ctx.save();
      ctx.setLineDash([5, 8]);
      ctx.strokeStyle = aimColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      for (let t = 0; t < 1.25; t += 0.055) {
        x += vx * 0.055;
        y += vy * 0.055;
        if (!straight) vy += 720 * selectedArena.gravity * 0.055;
        ctx.lineTo(x, y);
        if (!straight && y > ground) break;
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = dark ? "#fff" : colors.ink;
      ctx.beginPath();
      ctx.arc(x, straight ? y : Math.min(y, ground), 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    function drawSpear(s) {
      var _a2, _b2;
      ctx.save();
      ctx.translate(s.x, s.y);
      if (s.weapon === "star") {
        ctx.rotate(s.spinA || s.a);
        ctx.fillStyle = "#252525";
        ctx.strokeStyle = "#aaa";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const a = i * Math.PI / 4, r = i % 2 ? 6 : 16;
          i ? ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r) : ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#bbb";
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (s.weapon === "snowball") {
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#9dcbd7";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (s.weapon === "web") {
        ctx.rotate(s.a);
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-30, 0);
        for (let x = -30; x <= 30; x += 5) ctx.lineTo(x, Math.sin(x * 0.45) * 7);
        ctx.stroke();
      } else if (s.weapon === "katana") {
        ctx.rotate(s.spinA || s.a);
        ctx.strokeStyle = "#dce4e8";
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-22, 0);
        ctx.quadraticCurveTo(5, -7, 29, 0);
        ctx.stroke();
        line(-23, -9, -23, 9, 3, "#111");
        line(-37, 0, -25, 0, 7, "#4a2417");
      } else if (s.weapon === "phantom") {
        ctx.rotate(s.a);
        const outline = ((_a2 = s.owner) == null ? void 0 : _a2.side) === "player" || !isDarkArena() ? colors.ink : "#fff";
        ctx.strokeStyle = outline;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-35, 0);
        ctx.lineTo(22, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(32, 0);
        ctx.lineTo(18, -7);
        ctx.lineTo(20, 7);
        ctx.closePath();
        ctx.stroke();
      } else {
        ctx.rotate(s.a);
        const weaponInk = ((_b2 = s.owner) == null ? void 0 : _b2.side) === "player" || !isDarkArena() ? colors.ink : "#fff";
        line(-35, 0, 22, 0, 4, weaponInk);
        ctx.fillStyle = weaponInk;
        ctx.strokeStyle = weaponInk;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(32, 0);
        ctx.lineTo(18, -7);
        ctx.lineTo(20, 7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
    }
    function drawWorld() {
      ctx.fillStyle = selectedArena.sky;
      ctx.fillRect(0, 0, W, H);
      if (selectedArena.key === "snow") {
        ctx.fillStyle = "rgba(255,255,255,.8)";
        for (let i = 0; i < 45; i++) {
          const x = i * 83 % W, y = (i * 47 + last * 0.025) % ground;
          ctx.fillRect(x, y, 3, 3);
        }
      }
      if (selectedArena.key === "space" || selectedArena.key === "neon") {
        ctx.fillStyle = "#fff";
        for (let i = 0; i < 55; i++) ctx.fillRect(i * 97 % W, i * 53 % ground, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1);
      }
      if (selectedArena.key === "jungle") {
        ctx.strokeStyle = "rgba(18,50,28,.65)";
        ctx.lineWidth = 8;
        for (let x = 30; x < W; x += 120) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.bezierCurveTo(x + 40, 80, x - 35, 150, x + 10, 240);
          ctx.stroke();
        }
      }
      if (selectedArena.key === "cave") {
        ctx.fillStyle = "#111116";
        for (let x = 0; x < W; x += 70) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x + 35, 35 + x % 90);
          ctx.lineTo(x + 70, 0);
          ctx.fill();
        }
      }
      if (selectedArena.key === "lava") {
        const glow = ctx.createLinearGradient(0, ground - 130, 0, ground + 20);
        glow.addColorStop(0, "rgba(255,65,20,0)");
        glow.addColorStop(1, "rgba(255,91,20,.55)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, ground - 130, W, 150);
        for (let i = 0; i < 34; i++) {
          const x = (i * 89 + last * 0.018 * (i % 3 + 1)) % W, y = ground - 18 - (i * 43 + last * 0.04) % 155, r = 1 + i % 4;
          ctx.fillStyle = i % 3 ? "#ff6b28" : "#ffd34d";
          ctx.globalAlpha = 0.25 + i % 5 * 0.12;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      for (let x = 0; x < W; x += 38) line(x, 0, x, H, 1, "rgba(23,23,19,.035)");
      for (let y = 0; y < H; y += 38) line(0, y, W, y, 1, "rgba(23,23,19,.035)");
    }
    function drawPlatform(p) {
      if (p.type === "thin") {
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "#eaffff";
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.strokeStyle = "rgba(255,255,255,.9)";
        ctx.lineWidth = 2;
        ctx.strokeRect(p.x, p.y, p.w, p.h);
        ctx.restore();
        return;
      }
      if (p.type === "sticky") {
        ctx.fillStyle = "#294c2f";
        ctx.fillRect(p.x - 3, p.y - 3, p.w + 6, p.h + 6);
        ctx.fillStyle = "#91d55c";
        ctx.fillRect(p.x, p.y, p.w, p.h);
        for (let x = p.x + 8; x < p.x + p.w; x += 15) {
          ctx.beginPath();
          ctx.arc(x, p.y, 5, Math.PI, 0);
          ctx.fill();
        }
        return;
      }
      ctx.fillStyle = colors.ink;
      ctx.fillRect(p.x - 3, p.y - 3, p.w + 6, p.h + 8);
      ctx.fillStyle = selectedArena.land;
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = selectedArena.accent;
      ctx.fillRect(p.x, p.y, p.w, 5);
      for (let x = p.x + 10; x < p.x + p.w; x += 18) line(x, p.y + 8, x + 7, p.y + Math.min(p.h - 3, 16), 2, "rgba(23,23,19,.35)");
      if (p.move) {
        ctx.fillStyle = colors.ink;
        ctx.font = "bold 9px DM Mono";
        ctx.fillText(p.move.axis === "x" ? "\u2194" : "\u2195", p.x + p.w / 2, p.y + p.h - 4);
      }
    }
    function drawHangings(p) {
      if (p.type === "thin") return;
      const bottom = p.y + p.h;
      if (selectedArena.key === "snow") {
        ctx.fillStyle = "#eaffff";
        for (let x = p.x + 8; x < p.x + p.w - 4; x += 17) {
          ctx.beginPath();
          ctx.moveTo(x, bottom);
          ctx.lineTo(x + 7, bottom);
          ctx.lineTo(x + 3, bottom + 10 + x % 19);
          ctx.fill();
        }
      } else if (selectedArena.key === "jungle" || selectedArena.key === "grass") {
        ctx.strokeStyle = selectedArena.key === "jungle" ? "#284b2d" : "#486835";
        ctx.lineWidth = 4;
        for (let x = p.x + 12; x < p.x + p.w; x += 28) {
          ctx.beginPath();
          ctx.moveTo(x, bottom);
          ctx.bezierCurveTo(x + 10, bottom + 15, x - 8, bottom + 25, x + 4, bottom + 35 + x % 20);
          ctx.stroke();
        }
      } else if (selectedArena.key === "space" || selectedArena.key === "neon") {
        ctx.fillStyle = selectedArena.accent;
        for (let x = p.x + 12; x < p.x + p.w; x += 30) {
          ctx.fillRect(x, bottom, 5, 8);
          ctx.beginPath();
          ctx.arc(x + 2, bottom + 12, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (selectedArena.key === "cave" || selectedArena.key === "ruins") {
        ctx.fillStyle = "rgba(20,18,24,.65)";
        for (let x = p.x + 10; x < p.x + p.w; x += 25) {
          ctx.beginPath();
          ctx.moveTo(x, bottom);
          ctx.lineTo(x + 9, bottom);
          ctx.lineTo(x + 4, bottom + 18 + x % 14);
          ctx.fill();
        }
      } else if (selectedArena.key === "lava") {
        ctx.fillStyle = "#ff5b25";
        for (let x = p.x + 9; x < p.x + p.w; x += 24) {
          ctx.beginPath();
          ctx.arc(x, bottom + 7 + x % 11, 5, 0, Math.PI * 2);
          ctx.fill();
          line(x, bottom, x, bottom + 8, 4, "#ff5b25");
        }
      }
    }
    function drawBounds() {
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
      drawWorld();
      drawBounds();
      for (const p of platforms) {
        drawPlatform(p);
        drawHangings(p);
      }
      ctx.fillStyle = selectedArena.land;
      ctx.fillRect(0, ground, W, H - ground);
      ctx.fillStyle = selectedArena.accent;
      ctx.fillRect(0, ground, W, 5);
      ctx.font = "10px DM Mono";
      ctx.fillStyle = selectedArena.key === "space" ? "#dfe5ff" : "rgba(23,23,19,.55)";
      ctx.textAlign = "center";
      ctx.fillText(selectedArena.name + "  /  LAST FIGHTER STANDING", W / 2, ground + 27);
      drawArc();
      for (const s of spears) drawSpear(s);
      for (const f of allFighters()) drawSpecial(f);
      for (const f of allFighters()) drawFighter(f);
      for (const p of particles) {
        ctx.globalAlpha = Math.max(0, p.life * 2);
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r || 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }
    function sendState(t) {
      const targets = clients.filter((c) => {
        var _a2;
        return (c == null ? void 0 : c.open) && (((_a2 = c.dataChannel) == null ? void 0 : _a2.bufferedAmount) || 0) < 12e3;
      });
      if (netMode !== "host" || !targets.length || t - lastNetSend < 50) return;
      lastNetSend = t;
      const clean = (f) => {
        const o = { side: f.side };
        for (const k of ["x", "y", "vx", "vy", "angle", "av", "hp", "maxHp", "coins", "color", "skin", "maxThrows", "throwsLeft", "wallStuck", "beamActive", "beamTime", "meleeCooldown", "maceAngle", "onGround", "hasSpear", "cooldown", "stun", "blink", "ai", "dead", "wobble", "freezeTime", "frozenFace", "freezeOwnerSide", "hasFreezeAbility", "freezeLevel", "freezeCharge", "freezeArmed"]) o[k] = f[k];
        return o;
      };
      const state = { type: "state", seq: ++netSeq, vw: W, vh: H, fighters: allFighters().map(clean), spears: spears.map((s) => {
        var _a2, _b2;
        return { x: s.x, y: s.y, vx: s.vx, vy: s.vy, a: s.a, spinA: s.spinA, bouncesLeft: s.bouncesLeft, weapon: s.weapon, stuck: s.stuck, life: s.life, owner: (_a2 = s.owner) == null ? void 0 : _a2.side, stuckTo: (_b2 = s.stuckTo) == null ? void 0 : _b2.side };
      }), platforms: platforms.map((p) => ({ x: p.x, y: p.y, type: p.type })), shake };
      for (const c of targets) c.send(state);
    }
    function smoothGuest(dt) {
      var _a2;
      if (!netTarget) return;
      const d = netTarget, sx = W / (d.vw || W), sy = H / (d.vh || H), age = Math.min(0.18, Math.max(0, (performance.now() - netReceivedAt) / 1e3)), blend = 1 - Math.pow(2e-6, dt), lerp = (a, b) => a + (b - a) * blend, bounded = (a, b) => {
        const step = (b - a) * blend, limit = Math.max(9, 1050 * dt);
        return a + Math.max(-limit, Math.min(limit, step));
      }, angle = (a, b) => a + Math.atan2(Math.sin(b - a), Math.cos(b - a)) * blend;
      if (d.fighters) {
        while (extraFighters.length < Math.max(0, d.fighters.length - 2)) extraFighters.push(fighter("p" + (extraFighters.length + 2)));
        if (extraFighters.length > d.fighters.length - 2) extraFighters.length = Math.max(0, d.fighters.length - 2);
        const fs = allFighters();
        d.fighters.forEach((t, i) => {
          const f = fs[i], tx = (t.x + (t.dead || t.wallStuck ? 0 : t.vx * age)) * sx, ty = (t.y + (t.dead || t.wallStuck ? 0 : t.vy * age)) * sy, tvx = t.vx * sx, tvy = t.vy * sy;
          if (netFirst) {
            Object.assign(f, t, { x: tx, y: ty, vx: tvx, vy: tvy });
            return;
          }
          f.x = bounded(f.x, tx);
          f.y = bounded(f.y, ty);
          f.vx = lerp(f.vx, tvx);
          f.vy = lerp(f.vy, tvy);
          for (const k of ["av", "wobble"]) f[k] = lerp(f[k] || 0, t[k] || 0);
          f.angle = angle(f.angle || 0, t.angle || 0);
          f.maceAngle = angle(f.maceAngle || 0, t.maceAngle || 0);
          for (const k of ["side", "hp", "maxHp", "coins", "color", "skin", "maxThrows", "throwsLeft", "wallStuck", "beamActive", "beamTime", "meleeCooldown", "onGround", "hasSpear", "cooldown", "stun", "blink", "dead", "freezeTime", "frozenFace", "freezeOwnerSide", "hasFreezeAbility", "freezeLevel", "freezeCharge", "freezeArmed"]) f[k] = t[k];
        });
      }
      const bySide = (side) => allFighters().find((f) => f.side === side) || player;
      (_a2 = d.platforms) == null ? void 0 : _a2.forEach((p, i) => {
        if (platforms[i]) {
          const x = p.x * sx, y = p.y * sy;
          platforms[i].x = netFirst ? x : bounded(platforms[i].x, x);
          platforms[i].y = netFirst ? y : bounded(platforms[i].y, y);
        }
      });
      const scaled = (s) => __spreadProps(__spreadValues({}, s), { x: (s.x + (s.stuck ? 0 : s.vx * age)) * sx, y: (s.y + (s.stuck ? 0 : s.vy * age)) * sy, vx: s.vx * sx, vy: s.vy * sy });
      if (netFirst || spears.length !== d.spears.length) spears = d.spears.map((raw) => {
        const s = scaled(raw);
        return __spreadProps(__spreadValues({}, s), { owner: bySide(s.owner), stuckTo: s.stuckTo ? bySide(s.stuckTo) : null });
      });
      else d.spears.forEach((raw, i) => {
        const t = scaled(raw), s = spears[i];
        s.x = bounded(s.x, t.x);
        s.y = bounded(s.y, t.y);
        s.a = angle(s.a, t.a);
        Object.assign(s, { vx: t.vx, vy: t.vy, spinA: t.spinA, bouncesLeft: t.bouncesLeft, weapon: t.weapon, stuck: t.stuck, life: t.life, owner: bySide(t.owner), stuckTo: t.stuckTo ? bySide(t.stuckTo) : null });
      });
      shake = Math.max(shake * 0.8, d.shake || 0);
      netFirst = false;
      const me = localFighter();
      document.querySelector("#ammoLabel").textContent = me.skin === "gladiator" ? "LIGHTNING READY" : me.skin === "iron" ? me.beamActive ? "BEAM FIRING" : me.hasSpear ? "HOLD FOR BEAM" : "RECHARGING" : me.maxThrows === 2 ? me.hasSpear ? me.throwsLeft + " SHOT" + (me.throwsLeft === 1 ? "" : "S") + " READY" : "COMING BACK" : me.hasSpear ? "SHOT READY" : "COMING BACK";
      throwBtn.classList.toggle("cooldown", !me.hasSpear && me.skin !== "gladiator");
    }
    function loop(t) {
      const dt = Math.min(0.032, (t - last) / 1e3 || 0);
      last = t;
      if (running && netMode !== "guest") {
        if (!multiplayerPaused) update(dt);
        sendState(t);
      } else if (running) smoothGuest(dt);
      draw();
      requestAnimationFrame(loop);
    }
    function pos(e) {
      var _a2, _b2;
      const r = canvas.getBoundingClientRect(), p = ((_a2 = e.touches) == null ? void 0 : _a2[0]) || ((_b2 = e.changedTouches) == null ? void 0 : _b2[0]) || e;
      return { x: (p.clientX - r.left) * W / r.width, y: (p.clientY - r.top) * H / r.height };
    }
    function localInput(kind, a, b) {
      if (atHome) return;
      const me = localFighter();
      if (netMode === "guest") {
        if (kind === "fling") fling(me, a, b);
        if (kind === "beamStart") startBeam(me);
        if (kind === "beamStop") stopBeam(me);
        if (conn == null ? void 0 : conn.open) conn.send({ type: "input", kind, a, b });
        return;
      }
      if (kind === "fling") fling(player, a, b);
      else if (kind === "beamStart") startBeam(player);
      else if (kind === "beamStop") stopBeam(player);
      else throwSpear(player);
    }
    canvas.addEventListener("pointerdown", (e) => {
      var _a2;
      if (!running || roundWait || atHome) return;
      swipe = pos(e);
      (_a2 = canvas.setPointerCapture) == null ? void 0 : _a2.call(canvas, e.pointerId);
    });
    canvas.addEventListener("pointerup", (e) => {
      if (!swipe) return;
      const p = pos(e);
      localInput("fling", p.x - swipe.x, p.y - swipe.y);
      swipe = null;
    });
    window.addEventListener("keydown", (e) => {
      if (!running || atHome) return;
      const m = { ArrowLeft: [-90, -10], a: [-90, -10], ArrowRight: [90, -10], d: [90, -10], ArrowUp: [0, -100], w: [0, -100], ArrowDown: [0, 60], s: [0, 60] };
      if (m[e.key]) {
        e.preventDefault();
        localInput("fling", ...m[e.key]);
      }
      if (e.code === "Space") {
        e.preventDefault();
        localInput("throw");
      }
    });
    function spinArena(forced = null, remote = false) {
      const panel = document.querySelector("#arenaRoulette"), track = document.querySelector("#rouletteTrack"), status = document.querySelector("#rouletteStatus");
      if (!atHome) startCard.hidden = true;
      document.querySelector("#onlineLobby").hidden = true;
      resultCard.hidden = true;
      panel.hidden = atHome;
      running = false;
      netFirst = true;
      netTarget = null;
      lastNetSeq = -1;
      const copies = [...ARENAS, ...ARENAS, ...ARENAS, ...ARENAS];
      track.innerHTML = copies.map((a) => `<div class="arenaCard"><b>${a.name}</b><div class="arenaPic" style="--sky:${a.sky};--land:${a.land}"></div></div>`).join("");
      track.style.transition = "none";
      track.style.transform = "translateX(-75px)";
      track.offsetWidth;
      const chosen = forced != null ? forced : Math.floor(Math.random() * ARENAS.length), landing = ARENAS.length * 2 + chosen;
      if (netMode === "host" && !remote) {
        for (const c of clients) if (c == null ? void 0 : c.open) c.send({ type: "spin", chosen, wins });
      }
      track.style.transition = "transform 2.3s cubic-bezier(.12,.72,.16,1)";
      track.style.transform = `translateX(-${landing * 160 + 75}px)`;
      let ticks = 0;
      const ticker = setInterval(() => {
        if (!atHome) beep(90 + ticks * 3, 0.025, "square", 0.018);
        ticks++;
        if (ticks > 22) clearInterval(ticker);
      }, 90);
      setTimeout(() => {
        selectedArena = ARENAS[chosen];
        status.textContent = "LOCKED: " + selectedArena.name;
        document.querySelector("#roundLabel").textContent = atHome ? "CONNECTED" : selectedArena.name;
        if (!atHome) beep(390, 0.16, "square", 0.04);
      }, 2300);
      setTimeout(() => {
        panel.hidden = true;
        running = true;
        resetRound();
        refreshScores();
        document.querySelector("#homeButton").hidden = atHome;
        if (netMode === "host") clients.forEach((c, i) => {
          if (!(c == null ? void 0 : c.open)) {
            const f = allFighters()[i + 1];
            if (f) f.dead = true;
          }
        });
      }, 2900);
    }
    function applyState(d) {
      if (Number.isFinite(d.seq) && d.seq <= lastNetSeq) return;
      if (Number.isFinite(d.seq)) lastNetSeq = d.seq;
      netTarget = d;
      netReceivedAt = performance.now();
    }
    function handleNetData(d, c) {
      if (d.type === "full" && netMode === "guest") {
        running = false;
        document.querySelector("#onlineLobby").hidden = false;
        document.querySelector("#lobbyStatus").textContent = "THAT ROOM IS FULL \u2014 " + MAX_ONLINE_FIGHTERS + " FIGHTERS MAX.";
      }
      if (d.type === "welcome" && netMode === "guest") {
        localIndex = d.index;
        document.querySelector("#lobbyStatus").textContent = "CONNECTED AS FIGHTER " + (localIndex + 1);
      }
      if (d.type === "prefs" && netMode === "host") {
        c.fighterColor = d.color;
        c.maxHp = Math.max(3, Math.min(6, d.maxHp || 3));
        c.skin = d.skin || "classic";
        if (Number.isFinite(d.coins)) c.coins = Math.max(0, d.coins);
        const f = allFighters()[c.fighterIndex];
        if (f) {
          f.color = c.fighterColor;
          f.maxHp = f.hp = c.maxHp;
          applySkin(f, c.skin);
          if (Number.isFinite(d.coins)) f.coins = c.coins;
        }
      }
      if (d.type === "input" && netMode === "host") {
        const f = allFighters()[c == null ? void 0 : c.fighterIndex];
        if (f) {
          if (d.kind === "fling") fling(f, d.a, d.b);
          else if (d.kind === "beamStart") startBeam(f);
          else if (d.kind === "beamStop") stopBeam(f);
          else throwSpear(f);
        }
      }
      if (d.type === "state" && netMode === "guest") applyState(d);
      if (d.type === "round" && netMode === "guest") {
        roundWait = true;
        wins = d.wins || wins;
        showRoundResult(d.winner);
        startPvpCountdown(d.match);
      }
      if (d.type === "spin" && netMode === "guest") {
        wins = d.wins || wins;
        refreshScores();
        spinArena(d.chosen, true);
      }
    }
    function bindConnection(c) {
      if (netMode === "host") {
        if (clients.length >= MAX_ONLINE_GUESTS) {
          c.on("open", () => {
            c.send({ type: "full" });
            c.close();
          });
          return;
        }
        c.fighterIndex = clients.length + 1;
        clients.push(c);
      } else conn = c;
      c.on("data", (d) => handleNetData(d, c));
      c.on("open", () => {
        if (netMode === "host") {
          c.send({ type: "welcome", index: c.fighterIndex });
          document.querySelector("#lobbyStatus").textContent = clients.filter((x) => x == null ? void 0 : x.open).length + " FIGHTER(S) JOINED";
          if (c.fighterIndex === 1) spinArena();
          else if (running) {
            const f = fighter("p" + c.fighterIndex);
            f.x = W * (0.15 + Math.random() * 0.7);
            f.y = ground - 80;
            f.vy = -120;
            if (c.fighterIndex === 1) bot = f;
            else extraFighters[c.fighterIndex - 2] = f;
            c.send({ type: "spin", chosen: ARENAS.indexOf(selectedArena), wins });
          }
        } else {
          c.send({ type: "prefs", color: selectedColor, maxHp: 3 + lifeLevel, coins: playerCoins, skin: netSafeSkin() });
          document.querySelector("#lobbyStatus").textContent = "CONNECTED \u2014 HOST IS CHOOSING THE WORLD";
        }
      });
      c.on("close", () => {
        if (leavingRoom) return;
        if (netMode === "host") {
          const f = allFighters()[c.fighterIndex];
          if (f) f.dead = true;
        } else {
          running = false;
          document.querySelector("#onlineLobby").hidden = false;
          document.querySelector("#lobbyStatus").textContent = "CONNECTION LOST. RETURN AND TRY A NEW ROOM.";
        }
      });
    }
    const baseHandleNetData = handleNetData;
    handleNetData = (d, c) => {
      if (d.type === "presence" && netMode === "host") {
        c.away = !!d.away;
        setFighterAway(allFighters()[c.fighterIndex], c.away);
        recomputeMultiplayerPause();
        return;
      }
      if (d.type === "input" && netMode === "host" && multiplayerPaused) return;
      baseHandleNetData(d, c);
    };
    function openLobby() {
      startCard.hidden = true;
      document.querySelector("#onlineLobby").hidden = false;
      document.querySelector(".lobbyActions").hidden = false;
      document.querySelector("#roomCode").hidden = true;
      document.querySelector("#lobbyStatus").textContent = "Host a room, type a friend\u2019s code, or choose the closest open room.";
      loadNearbyRooms();
    }
    function hostRoom() {
      if (!window.Peer) {
        document.querySelector("#lobbyStatus").textContent = "NETWORK LIBRARY DID NOT LOAD. CHECK YOUR INTERNET.";
        return;
      }
      netMode = "host";
      localIndex = 0;
      clients = [];
      wins = {};
      const code = "loose-" + Math.random().toString(36).slice(2, 8);
      peer = new Peer(code);
      peer.on("open", (id) => {
        hostedRoomId = id;
        document.querySelector("#roomCode").hidden = false;
        document.querySelector("#roomCodeText").textContent = id;
        document.querySelector("#lobbyStatus").textContent = "SEND THIS CODE TO UP TO " + MAX_ONLINE_GUESTS + " FRIENDS. WAITING...";
        keepRoomListed();
      });
      peer.on("connection", bindConnection);
      peer.on("error", () => document.querySelector("#lobbyStatus").textContent = "ROOM ERROR. TRY HOSTING AGAIN.");
    }
    function joinRoom() {
      if (joinBusy || netMode !== "local" || peer || conn) return;
      if (!window.Peer) {
        document.querySelector("#lobbyStatus").textContent = "NETWORK LIBRARY DID NOT LOAD. CHECK YOUR INTERNET.";
        return;
      }
      const code = document.querySelector("#roomInput").value.trim().toLowerCase();
      if (!code) return;
      joinBusy = true;
      document.querySelector("#joinButton").disabled = true;
      document.querySelector("#lobbyStatus").textContent = "CONNECTING...";
      netMode = "guest";
      peer = new Peer();
      peer.on("open", () => {
        if (!joinBusy) return;
        bindConnection(peer.connect(code, { reliable: true, serialization: "json" }));
      });
      peer.on("error", () => {
        joinBusy = false;
        document.querySelector("#joinButton").disabled = false;
        document.querySelector("#lobbyStatus").textContent = "COULD NOT FIND THAT ROOM. CHECK THE CODE.";
        peer == null ? void 0 : peer.destroy();
        peer = null;
        conn = null;
        netMode = "local";
      });
    }
    function publishRoom(roomId, action = "host") {
      return __async(this, null, function* () {
        if (!roomId) return;
        try {
          yield fetch("/api/rooms", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ roomId, action }) });
        } catch (e) {
        }
      });
    }
    function loadNearbyRooms() {
      return __async(this, null, function* () {
        const box = document.querySelector("#nearbyRooms");
        if (!box) return;
        box.innerHTML = "<small>CHECKING NEARBY ROOMS...</small>";
        try {
          const response = yield fetch("/api/rooms", { cache: "no-store" }), data = yield response.json(), rooms = data.rooms || [];
          box.innerHTML = rooms.length ? "<b>CLOSEST OPEN ROOMS</b>" : "<small>NO OPEN ROOMS NEARBY YET</small>";
          for (const room of rooms) {
            const button = document.createElement("button"), distance = Number.isFinite(room.distance) ? room.distance < 1 ? "LESS THAN 1 MILE" : Math.round(room.distance) + " MILES AWAY" : "RECENTLY OPENED";
            button.innerHTML = "<span>" + room.roomId.toUpperCase() + "</span><small>" + distance + " \u2014 TAP TO JOIN</small>";
            button.onclick = () => {
              document.querySelector("#roomInput").value = room.roomId;
              joinRoom();
            };
            box.appendChild(button);
          }
        } catch (e) {
          box.innerHTML = "<small>NEARBY ROOMS ARE UNAVAILABLE \u2014 YOU CAN STILL TYPE A CODE</small>";
        }
      });
    }
    function keepRoomListed() {
      clearTimeout(roomDirectoryTimer);
      if (netMode !== "host" || !hostedRoomId) return;
      publishRoom(hostedRoomId);
      roomDirectoryTimer = setTimeout(keepRoomListed, 15e3);
    }
    function saveUpgrades() {
      try {
        localStorage.setItem("loosePointUpgrades", JSON.stringify({ coins: playerCoins, color: selectedColor, owned: [...ownedColors], lifeLevel, skin: selectedSkin, ownedSkins: [...ownedSkins], rankXP, tutorialReturns, spacemanNew }));
      } catch (e) {
      }
    }
    function updateTutorialHints() {
      document.body.classList.add("hintsDone");
    }
    function recordTutorialReturn() {
      tutorialReturns = Math.min(3, tutorialReturns + 1);
      saveUpgrades();
      updateTutorialHints();
    }
    function loadUpgrades() {
      try {
        const d = JSON.parse(localStorage.getItem("loosePointUpgrades") || "null");
        if (d) {
          playerCoins = Math.max(0, d.coins || 0);
          selectedColor = d.color || selectedColor;
          ownedColors = new Set(d.owned || [selectedColor]);
          lifeLevel = Math.max(0, Math.min(LIFE_MAX_LEVEL, d.lifeLevel || 0));
          selectedSkin = d.skin || "classic";
          ownedSkins = new Set(d.ownedSkins || ["classic"]);
          rankXP = Math.max(0, Math.min(MAX_RANK_XP, d.rankXP || 0));
          tutorialReturns = Math.max(0, Math.min(3, d.tutorialReturns || 0));
          spacemanNew = !!d.spacemanNew;
          if (selectedSkin === "spaceman" && !ownedSkins.has("spaceman")) selectedSkin = "classic";
        }
      } catch (e) {
      }
      updateUpgradeUI();
      updateRankUI();
      updateTutorialHints();
    }
    function sendLoadout() {
      const me = localFighter(), safeSkin = netSafeSkin();
      me.coins = playerCoins;
      me.color = selectedColor;
      me.maxHp = playerLives();
      applyLifeTier(me);
      applySkin(me, safeSkin);
      if (netMode === "guest" && (conn == null ? void 0 : conn.open)) conn.send({ type: "prefs", color: selectedColor, maxHp: playerLives(), coins: playerCoins, skin: safeSkin });
      if (netMode === "host") {
        player.color = selectedColor;
        player.coins = playerCoins;
        player.maxHp = Math.max(player.hp, playerLives());
        applyLifeTier(player);
      }
    }
    function updateUpgradeUI() {
      document.querySelector("#coinCount").textContent = "\u25C9 " + playerCoins;
      document.querySelector("#homeCoins").textContent = "\u25C9 " + playerCoins;
      document.querySelector("#lifeCount").textContent = "\u2665 ".repeat(3 + lifeLevel).trim();
      const lifeBtn = document.querySelector("#buyLifeButton");
      lifeBtn.textContent = lifeLevel >= 3 ? "MAXIMUM \u2014 6 LIVES" : "ADD ONE LIFE \u2014 \u25C9 10";
      lifeBtn.disabled = lifeLevel >= 3 || playerCoins < 10;
      const box = document.querySelector("#colorChoices");
      box.innerHTML = "";
      for (const [name, value] of colorShop) {
        const b = document.createElement("button");
        b.className = "colorChoice" + (ownedColors.has(value) ? " owned" : "") + (selectedColor === value ? " equipped" : "");
        b.style.setProperty("--swatch", value);
        b.title = name;
        b.setAttribute("aria-label", name + (ownedColors.has(value) ? " owned" : " costs 5 coins"));
        b.onclick = () => {
          if (!ownedColors.has(value)) {
            if (playerCoins < 5) return;
            playerCoins -= 5;
            ownedColors.add(value);
          }
          selectedColor = value;
          saveUpgrades();
          sendLoadout();
          updateUpgradeUI();
        };
        box.appendChild(b);
      }
      const skins = document.querySelector("#skinChoices");
      skins.innerHTML = "";
      for (const item of skinShop) {
        const owned = ownedSkins.has(item.id), b = document.createElement("button");
        b.className = "skinChoice " + (owned ? "owned" : "locked") + (selectedSkin === item.id ? " equipped" : "");
        b.innerHTML = `<b data-cost="${item.cost}">${item.name}</b><small>${item.desc}</small>`;
        b.onclick = () => {
          if (!ownedSkins.has(item.id)) {
            if (playerCoins < item.cost) return;
            playerCoins -= item.cost;
            ownedSkins.add(item.id);
          }
          selectedSkin = item.id;
          saveUpgrades();
          sendLoadout();
          updateUpgradeUI();
        };
        skins.appendChild(b);
      }
    }
    let shopSelectedSkin = "classic";
    const skinStats = { classic: ["#4d69ff", "\u27B6", "1 THROW", "1 DAMAGE"], ninja: ["#17171a", "\u2726", "2 THROWS", "1 DAMAGE"], samurai: ["#762d28", "\u2694", "2 THROWS", "1 DAMAGE"], santa: ["#d9362b", "\u27B6", "1 THROW", "1 DAMAGE"], snowman: ["#eef7fa", "\u25CF", "1 THROW", "1 DAMAGE"], web: ["#e73b35", "\u3030", "1 THROW", "1 DAMAGE"], iron: ["#b82324", "\u2501", "2 SEC BEAM", "1 / SECOND"], gladiator: ["#a56b2a", "\u2739", "MELEE", "1 DAMAGE"], phantom: ["#ffffff", "\u25CC", "VANISH 10 SEC", "NO MOVE / THROW"] };
    function updateUpgradeUI() {
      document.querySelector("#coinCount").textContent = "\u25C9 " + playerCoins;
      document.querySelector("#homeCoins").textContent = "\u25C9 " + playerCoins;
      document.querySelector("#lifeCount").textContent = "\u2665 ".repeat(3 + lifeLevel).trim();
      const lifeBtn = document.querySelector("#buyLifeButton");
      lifeBtn.textContent = lifeLevel >= 3 ? "MAXIMUM \u2014 6 LIVES" : "ADD ONE LIFE \u2014 \u25C9 10";
      lifeBtn.disabled = lifeLevel >= 3 || playerCoins < 10;
      const box = document.querySelector("#colorChoices");
      box.innerHTML = "";
      for (const [name, value] of colorShop) {
        const b = document.createElement("button");
        b.className = "colorChoice" + (ownedColors.has(value) ? " owned" : "") + (selectedColor === value ? " equipped" : "");
        b.style.setProperty("--swatch", value);
        b.title = name;
        b.onclick = () => {
          if (!ownedColors.has(value)) {
            if (playerCoins < 5) return;
            playerCoins -= 5;
            ownedColors.add(value);
          }
          selectedColor = value;
          saveUpgrades();
          sendLoadout();
          updateUpgradeUI();
        };
        box.appendChild(b);
      }
      const skins = document.querySelector("#skinChoices");
      skins.innerHTML = "";
      for (const item2 of skinShop) {
        const owned2 = ownedSkins.has(item2.id), stat2 = skinStats[item2.id] || skinStats.classic, b = document.createElement("button");
        b.className = "skinChoice " + (owned2 ? "owned" : "locked") + (selectedSkin === item2.id ? " equipped" : "") + (shopSelectedSkin === item2.id ? " selected" : "");
        b.innerHTML = `<div class="skinPortrait"><div class="skinBust" style="--skin-color:${stat2[0]}" data-weapon="${stat2[1]}"></div>${owned2 ? "" : '<div class="skinLock">\u{1F512}</div>'}</div><div class="skinInfo"><b>${item2.name}</b><small>${stat2[2]}<br>${stat2[3]}<br>1 COIN / HIT<br>3 COINS / KILL</small><em>${owned2 ? "OWNED" : "\u25C9 " + item2.cost}</em></div>`;
        b.onclick = () => {
          shopSelectedSkin = item2.id;
          updateUpgradeUI();
        };
        skins.appendChild(b);
      }
      const item = skinShop.find((s) => s.id === shopSelectedSkin) || skinShop[0], stat = skinStats[item.id] || skinStats.classic, owned = ownedSkins.has(item.id), action = document.querySelector("#skinActionButton");
      document.querySelector("#skinDetailName").textContent = item.name;
      document.querySelector("#skinDetailStats").textContent = stat[2] + " \xB7 " + stat[3] + " \xB7 1 COIN/HIT \xB7 3 COINS/KILL";
      action.disabled = selectedSkin === item.id || !owned && playerCoins < item.cost;
      action.textContent = selectedSkin === item.id ? "EQUIPPED" : owned ? "EQUIP" : "BUY \u2014 \u25C9 " + item.cost;
      action.onclick = () => {
        if (!ownedSkins.has(item.id)) {
          if (playerCoins < item.cost) return;
          playerCoins -= item.cost;
          ownedSkins.add(item.id);
        }
        selectedSkin = item.id;
        saveUpgrades();
        sendLoadout();
        updateUpgradeUI();
      };
    }
    skinStats.spaceman = ["#edf6ff", "\u2726", "ZERO GRAVITY", "2 ASTEROIDS"];
    skinStats.trojan = ["#d6a34b", "\u{1F6E1}", "AIMED SHIELD", "1 THROW"];
    skinStats.acid = ["#73e642", "\u2623", "ACID IMMUNE", "NO SPEAR \xB7 TOUCH DAMAGE"];
    skinStats.captain = ["#2c62c9", "\u2605", "RETURNING SHIELD", "3 BOUNCES"];
    skinStats.army = ["#68784e", "\u25A3", "4 BULLETS \xB7 2 KNIVES", "HIDDEN MINE"];
    skinStats.flubber = ["#65df58", "\u25CF", "2 GRABBING ARMS", "BOUNCY SLAM"];
    function paintSkinPreview(canvasEl, id, color) {
      const oldCtx = ctx, oldPlayer = player, oldBot = bot, oldExtras = extraFighters;
      ctx = canvasEl.getContext("2d");
      canvasEl.width = 180;
      canvasEl.height = 145;
      ctx.clearRect(0, 0, 180, 145);
      const f = fighter("player"), target = fighter("bot");
      f.x = 90;
      f.y = 90;
      f.angle = -0.08;
      f.wobble = 1.2;
      f.color = color;
      f.hp = f.maxHp = 0;
      applySkin(f, id);
      target.x = 155;
      target.y = 92;
      target.dead = false;
      player = f;
      bot = target;
      extraFighters = [];
      ctx.save();
      ctx.scale(1.05, 1.05);
      ctx.translate(-4, -3);
      drawFighter(f);
      drawSpecial(f);
      ctx.restore();
      player = oldPlayer;
      bot = oldBot;
      extraFighters = oldExtras;
      ctx = oldCtx;
    }
    const updateUpgradeCards = updateUpgradeUI;
    updateUpgradeUI = function() {
      updateUpgradeCards();
      document.querySelector("#secretUnlockNotice").hidden = !(spacemanNew && ownedSkins.has("spaceman"));
      document.querySelectorAll("#skinChoices .skinChoice").forEach((card, i) => {
        var _a2;
        const item = skinShop[i];
        if ((item == null ? void 0 : item.id) === "spaceman" && !ownedSkins.has("spaceman")) {
          card.hidden = true;
          return;
        }
        const holder = card.querySelector(".skinBust");
        if (!item || !holder) return;
        const preview = document.createElement("canvas");
        preview.className = "skinGamePreview";
        holder.replaceWith(preview);
        paintSkinPreview(preview, item.id, ((_a2 = skinStats[item.id]) == null ? void 0 : _a2[0]) || selectedColor);
        if (item.id === "spaceman") card.addEventListener("click", () => {
          spacemanNew = false;
          saveUpgrades();
          document.querySelector("#secretUnlockNotice").hidden = true;
        }, { once: true });
      });
    };
    const ensureTrojanCard = () => {
    };
    const updateWithTrojan = updateUpgradeUI;
    updateUpgradeUI = () => {
      updateWithTrojan();
      ensureTrojanCard();
    };
    function openUpgrades() {
      if (netMode !== "local" && !atHome) return;
      shopSelectedSkin = selectedSkin;
      startCard.hidden = true;
      document.querySelector("#upgradesCard").hidden = false;
      updateUpgradeUI();
    }
    function closeUpgrades() {
      document.querySelector("#upgradesCard").hidden = true;
      startCard.hidden = false;
      updateUpgradeUI();
    }
    function leaveRoom() {
      var _a2;
      const earned = (_a2 = localFighter().coins) != null ? _a2 : playerCoins;
      leavingRoom = true;
      clearInterval(roundTimer);
      clearTimeout(roomDirectoryTimer);
      roundTimer = roomDirectoryTimer = null;
      if (hostedRoomId) publishRoom(hostedRoomId, "leave");
      hostedRoomId = "";
      peer == null ? void 0 : peer.destroy();
      peer = conn = null;
      clients = [];
      netMode = "local";
      playerCoins = earned;
      player.coins = earned;
      atHome = false;
      matchEnded = false;
      running = false;
      document.querySelector("#onlineLobby").hidden = true;
      document.querySelector("#onlineButton").innerHTML = "PLAY ONLINE <span>\u2301</span>";
      document.querySelector("#upgradesButton").hidden = false;
      returnToMenu();
      setTimeout(() => leavingRoom = false, 200);
    }
    function continueFromHome() {
      if (!atHome) return;
      const ended = matchEnded;
      atHome = false;
      announcePresence(false);
      startCard.hidden = true;
      document.querySelector("#upgradesCard").hidden = true;
      document.querySelector("#homeButton").hidden = false;
      document.querySelector("#roundLabel").textContent = multiplayerPaused ? "PAUSED \u2014 FIGHTER CUSTOMIZING" : selectedArena.name;
      if (ended && netMode === "host") {
        wins = {};
        matchEnded = false;
        spinArena();
      } else if (ended && netMode === "guest") {
        matchEnded = false;
      }
    }
    document.querySelectorAll(".upgradeTabs button").forEach((btn) => btn.onclick = () => {
      document.querySelectorAll(".upgradeTabs button").forEach((b) => b.classList.toggle("active", b === btn));
      for (const id of ["colors", "clothes", "lives"]) document.querySelector("#" + id + "Panel").hidden = btn.dataset.tab !== id;
    });
    document.querySelector("#buyLifeButton").onclick = () => {
      if (lifeLevel >= 3 || playerCoins < 10) return;
      playerCoins -= 10;
      lifeLevel++;
      saveUpgrades();
      sendLoadout();
      updateUpgradeUI();
    };
    throwBtn.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      const me = localFighter();
      if (me.skin === "iron") localInput("beamStart");
      else localInput("throw");
    });
    window.addEventListener("pointerup", () => {
      if (localFighter().skin === "iron") localInput("beamStop");
    });
    window.addEventListener("pointercancel", () => {
      if (localFighter().skin === "iron") localInput("beamStop");
    });
    document.querySelector("#startButton").onclick = () => {
      if (atHome && netMode !== "local") {
        continueFromHome();
        return;
      }
      wins = {};
      flawlessMatch = true;
      playerScore = botScore = 0;
      refreshScores();
      if (netMode !== "host") netMode = "local";
      atHome = false;
      matchEnded = false;
      spinArena();
    };
    document.querySelector("#onlineButton").onclick = () => atHome && netMode !== "local" ? leaveRoom() : openLobby();
    document.querySelector("#upgradesButton").onclick = openUpgrades;
    document.querySelector("#closeUpgrades").onclick = closeUpgrades;
    document.querySelector("#hostButton").onclick = hostRoom;
    document.querySelector("#joinButton").onclick = joinRoom;
    document.querySelector("#copyRoomButton").onclick = () => {
      var _a2;
      return (_a2 = navigator.clipboard) == null ? void 0 : _a2.writeText(document.querySelector("#roomCodeText").textContent);
    };
    document.querySelector("#backButton").onclick = leaveRoom;
    document.querySelector("#againButton").onclick = () => connectedHome(false);
    document.querySelector("#homeButton").onclick = () => netMode === "local" ? returnToMenu() : connectedHome(false);
    document.querySelector("#soundButton").onclick = (e) => {
      soundOn = !soundOn;
      e.currentTarget.textContent = soundOn ? "SOUND ON" : "SOUND OFF";
    };
    const baseDrawSpear = drawSpear;
    drawSpear = (s) => {
      var _a2;
      if (((_a2 = s.owner) == null ? void 0 : _a2.skin) !== "phantom") {
        baseDrawSpear(s);
        return;
      }
      const ink = isDarkArena() ? "#fff" : colors.ink;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.a);
      ctx.strokeStyle = ink;
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-35, 0);
      ctx.lineTo(22, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(32, 0);
      ctx.lineTo(18, -7);
      ctx.lineTo(20, 7);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };
    const outlinedDrawSpear = drawSpear;
    drawSpear = (s) => {
      if (s.weapon !== "asteroid") {
        outlinedDrawSpear(s);
        return;
      }
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.spinA || s.a);
      ctx.fillStyle = "#56606a";
      ctx.strokeStyle = isDarkArena() ? "#fff" : "#cbd8df";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const p = [[0, -13], [9, -9], [14, 0], [8, 11], [-4, 14], [-13, 6], [-15, -5], [-7, -12]];
      p.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#303840";
      ctx.beginPath();
      ctx.arc(-4, -3, 3, 0, Math.PI * 2);
      ctx.arc(5, 5, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    const tailDrawSpear = drawSpear;
    drawSpear = (s) => {
      var _a2;
      if (((_a2 = s.owner) == null ? void 0 : _a2.invisibleTime) > 0) return;
      if (s.weapon === "asteroid" && !s.stuck) {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.a + Math.PI);
        const g = ctx.createLinearGradient(0, 0, 42, 0);
        g.addColorStop(0, "rgba(255,244,180,.9)");
        g.addColorStop(0.45, "rgba(255,125,35,.7)");
        g.addColorStop(1, "rgba(255,40,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.lineTo(48, 0);
        ctx.lineTo(0, 5);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      tailDrawSpear(s);
    };
    const finalHandleNetData = handleNetData;
    handleNetData = (d, c) => {
      if (d.type === "input" && netMode === "host" && ["shield", "vanish"].includes(d.kind)) {
        const f = allFighters()[c == null ? void 0 : c.fighterIndex];
        if (d.kind === "shield") activateShield(f);
        else activateVanish(f);
        return;
      }
      finalHandleNetData(d, c);
    };
    const baseLocalInput = localInput;
    localInput = (kind, a, b) => {
      const me = localFighter();
      if (kind === "shield") {
        activateShield(me);
        if (netMode === "guest" && (conn == null ? void 0 : conn.open)) conn.send({ type: "input", kind });
        return;
      }
      if (kind === "vanish") {
        activateVanish(me);
        if (netMode === "guest" && (conn == null ? void 0 : conn.open)) conn.send({ type: "input", kind });
        return;
      }
      baseLocalInput(kind, a, b);
    };
    const baseResetRound = resetRound;
    resetRound = () => {
      baseResetRound();
      updateActionButtons();
    };
    const baseSendLoadout = sendLoadout;
    sendLoadout = () => {
      baseSendLoadout();
      updateActionButtons();
    };
    const soundBtn = document.querySelector("#soundButton"), clearSoundHold = () => {
      if (soundHoldTimer) clearTimeout(soundHoldTimer);
      soundHoldTimer = null;
    };
    soundBtn.addEventListener("pointerdown", () => {
      if (soundOn || !running || roundWait || netMode === "local") return;
      soundHoldFired = false;
      soundHoldTimer = setTimeout(() => {
        soundHoldTimer = null;
        soundHoldFired = true;
        localInput("shield");
      }, 1e4);
    });
    soundBtn.addEventListener("pointerup", clearSoundHold);
    soundBtn.addEventListener("pointercancel", clearSoundHold);
    soundBtn.onclick = (e) => {
      if (soundHoldFired) {
        soundHoldFired = false;
        return;
      }
      soundOn = !soundOn;
      e.currentTarget.textContent = soundOn ? "SOUND ON" : "SOUND OFF";
    };
    vanishBtn.onclick = () => localInput("vanish");
    sendState = (t) => {
      const targets = clients.filter((c) => {
        var _a2;
        return (c == null ? void 0 : c.open) && (((_a2 = c.dataChannel) == null ? void 0 : _a2.bufferedAmount) || 0) < 12e3;
      });
      if (netMode !== "host" || !targets.length || t - lastNetSend < 50) return;
      lastNetSend = t;
      const keys = ["x", "y", "vx", "vy", "angle", "av", "hp", "maxHp", "coins", "color", "skin", "maxThrows", "throwsLeft", "wallStuck", "beamActive", "beamTime", "meleeCooldown", "maceAngle", "onGround", "hasSpear", "cooldown", "stun", "blink", "ai", "dead", "wobble", "shieldTime", "shieldAim", "invisibleTime", "freezeTime", "frozenFace", "freezeOwnerSide", "hasFreezeAbility", "freezeLevel", "freezeCharge", "freezeArmed", "hasRicochetAbility", "ricochetLevel", "ricochetCharge", "ricochetArmedShots", "hasSplitAbility", "splitLevel", "splitCharge", "splitArmed", "shieldOut", "armyShotIndex", "thorCharges", "thorReload", "thorZap", "porcupineSpikesLoaded", "porcupineReload", "porcupineCurl"];
      const clean = (f) => {
        const o = { side: f.side };
        for (const k of keys) o[k] = f[k];
        return o;
      };
      const state = { type: "state", seq: ++netSeq, vw: W, vh: H, fighters: allFighters().map(clean), spears: spears.map((s) => {
        var _a2, _b2;
        return { x: s.x, y: s.y, vx: s.vx, vy: s.vy, a: s.a, spinA: s.spinA, bouncesLeft: s.bouncesLeft, weapon: s.weapon, ricochet: !!s.ricochet, small: s.small, splitShot: !!s.splitShot, mineHidden: !!s.mineHidden, mineAge: s.mineAge || 0, stuck: s.stuck, life: s.life, owner: (_a2 = s.owner) == null ? void 0 : _a2.side, stuckTo: (_b2 = s.stuckTo) == null ? void 0 : _b2.side };
      }), platforms: platforms.map((p) => ({ x: p.x, y: p.y, type: p.type })), shake };
      for (const c of targets) c.send(state);
    };
    const baseSmoothGuest = smoothGuest;
    smoothGuest = (dt) => {
      baseSmoothGuest(dt);
      if (netTarget == null ? void 0 : netTarget.fighters) {
        const fs = allFighters();
        netTarget.fighters.forEach((t, i) => {
          if (fs[i]) {
            fs[i].shieldTime = t.shieldTime || 0;
            fs[i].invisibleTime = t.invisibleTime || 0;
          }
        });
      }
      updateActionButtons();
    };
    const ironLives = (skin) => 3 + lifeLevel + (skin === "iron" ? 2 : 0);
    const ironResetRound = resetRound;
    resetRound = () => {
      ironResetRound();
      player.maxHp = player.hp = ironLives(player.skin);
      roundCoinStart = Object.fromEntries(allFighters().filter((f) => !f.away).map((f) => [f.side, f.coins || 0]));
    };
    const ironSendLoadout = sendLoadout;
    sendLoadout = () => {
      ironSendLoadout();
      const me = localFighter(), lives = ironLives(selectedSkin);
      me.maxHp = lives;
      me.hp = Math.max(me.hp, lives);
      if (netMode === "host") {
        player.maxHp = lives;
        player.hp = Math.max(player.hp, lives);
      }
    };
    const ironHandleNetData = handleNetData;
    handleNetData = (d, c) => {
      if (d.type === "prefs" && netMode === "host") d = __spreadProps(__spreadValues({}, d), { maxHp: Math.min(8, Math.max(3, d.maxHp || 3) + (d.skin === "iron" ? 2 : 0)) });
      ironHandleNetData(d, c);
    };
    const tieBaseCheckVictory = checkVictory;
    checkVictory = () => {
      const alive = allFighters().filter((o) => !o.dead && !o.away);
      if (!alive.length) {
        endRound("tie");
        return;
      }
      tieBaseCheckVictory();
    };
    const tieBaseShowRoundResult = showRoundResult;
    showRoundResult = (winner) => {
      if (winner !== "tie") {
        tieBaseShowRoundResult(winner);
        return;
      }
      refreshScores();
      document.querySelector("#resultEyebrow").textContent = "DOUBLE KNOCKOUT";
      document.querySelector("#resultTitle").textContent = "TIE!";
      document.querySelector("#resultText").textContent = "BOTH FIGHTERS GET THE SAME COINS. NO ROUND POINT.";
      const btn = document.querySelector("#againButton");
      btn.innerHTML = (netMode === "local" ? "PLEASE WAIT" : "RETURN HOME") + " <span>\u2192</span>";
      btn.disabled = netMode === "local";
      resultCard.hidden = false;
    };
    const tieBaseEndRound = endRound;
    endRound = (winner) => {
      if (winner !== "tie") {
        tieBaseEndRound(winner);
        return;
      }
      if (roundWait || multiplayerPaused) return;
      roundWait = true;
      const tied = allFighters().filter((f) => !f.away), gain = Math.max(1, ...tied.map((f) => (f.coins || 0) - (roundCoinStart[f.side] || 0)));
      for (const f of tied) f.coins = (roundCoinStart[f.side] || 0) + gain;
      captureEconomy();
      playerScore = wins.player || 0;
      botScore = Math.max(0, ...Object.entries(wins).filter(([s]) => s !== "player").map(([, v]) => v));
      showRoundResult("tie");
      if (netMode === "host") {
        for (const c of clients) if (c == null ? void 0 : c.open) c.send({ type: "round", winner: "tie", wins, match: false });
      }
      if (netMode === "local") setTimeout(() => spinArena(), 2100);
      else if (netMode === "host") startPvpCountdown(false);
    };
    const ironUpgradeUi = updateUpgradeUI;
    updateUpgradeUI = () => {
      ironUpgradeUi();
      if (selectedSkin === "iron") document.querySelector("#lifeCount").textContent = "\u2665 ".repeat(ironLives("iron")).trim();
    };
    function showRankRoster(ranks) {
      const symbolFor = (rank) => {
        const tier = Math.max(0, rankTiers.findIndex((name) => String(rank).startsWith(name)));
        return rankSymbols[tier] || rankSymbols[0];
      }, text = "FIGHTER RANKS \u2014 " + ranks.map((r) => symbolFor(r.rank) + " " + r.name + ": " + r.rank).join("  \xB7  ");
      document.querySelector("#lobbyStatus").textContent = text;
      const roulette = document.querySelector("#arenaRoulette");
      if (!roulette.hidden) document.querySelector("#rouletteStatus").textContent = text;
    }
    function broadcastRanks() {
      if (netMode !== "host") return;
      const ranks = [{ name: "HOST", rank: rankNameFromXp(rankXP) }, ...clients.filter((c) => c == null ? void 0 : c.open).map((c) => ({ name: "FIGHTER " + (c.fighterIndex + 1), rank: rankNameFromXp(c.rankXP || 0) }))];
      showRankRoster(ranks);
      for (const c of clients) if (c == null ? void 0 : c.open) c.send({ type: "ranks", ranks });
    }
    const rankHandleNetData = handleNetData;
    handleNetData = (d, c) => {
      if (d.type === "ranks" && netMode === "guest") {
        showRankRoster(d.ranks || []);
        return;
      }
      if (d.type === "prefs" && netMode === "host") c.rankXP = Math.max(0, Math.min(MAX_RANK_XP, d.rankXP || 0));
      rankHandleNetData(d, c);
      if (d.type === "prefs" && netMode === "host") broadcastRanks();
      if (d.type === "welcome" && netMode === "guest" && (conn == null ? void 0 : conn.open)) conn.send({ type: "prefs", color: selectedColor, maxHp: 3 + lifeLevel, coins: playerCoins, skin: netSafeSkin(), rankXP });
      if (d.type === "round" && netMode === "guest" && d.winner === localFighter().side) {
        addRankXP(d.match ? 20 : 10);
        if (conn == null ? void 0 : conn.open) conn.send({ type: "prefs", color: selectedColor, maxHp: 3 + lifeLevel, coins: playerCoins, skin: netSafeSkin(), rankXP });
      }
    };
    const rankSendLoadout = sendLoadout;
    sendLoadout = () => {
      rankSendLoadout();
      if (netMode === "guest" && (conn == null ? void 0 : conn.open)) conn.send({ type: "prefs", color: selectedColor, maxHp: 3 + lifeLevel, coins: playerCoins, skin: netSafeSkin(), rankXP });
      if (netMode === "host") broadcastRanks();
    };
    const rankEndRound = endRound;
    endRound = (winner) => {
      const before = wins[winner] || 0;
      rankEndRound(winner);
      const after = wins[winner] || 0;
      if (netMode === "host" && winner === player.side && after > before) {
        addRankXP(after >= 3 ? 20 : 10);
        broadcastRanks();
      }
    };
    const surfaceTouching = (f) => {
      const wall = borderSize + 16;
      if (f.onGround || f.wallStuck || f.x <= wall + 1 || f.x >= W - wall - 1) return true;
      if (selectedArena.key !== "crush" && f.y >= ground - 44) return true;
      return platforms.some((p) => f.x > p.x - 14 && f.x < p.x + p.w + 14 && Math.abs(f.y + 43 - p.y) < 7);
    };
    function unlockSpaceman() {
      if (ownedSkins.has("spaceman")) return;
      ownedSkins.add("spaceman");
      spacemanNew = true;
      saveUpgrades();
      const meter = document.querySelector("#airChallenge");
      meter.hidden = false;
      meter.classList.add("unlocked");
      meter.querySelector("b").textContent = "SECRET UNLOCKED";
      meter.querySelector("span").textContent = "CHECK YOUR CLOTHES";
      beep(760, 0.2, "sine", 0.06);
      setTimeout(() => {
        meter.classList.remove("unlocked");
        meter.hidden = true;
        meter.querySelector("b").textContent = "AIRBORNE";
      }, 2600);
    }
    const secretUpdateFighter = updateFighter;
    updateFighter = (f, dt) => {
      const spaceman = f.skin === "spaceman" && netMode === "local", oldGravity = selectedArena.gravity;
      if (spaceman) selectedArena.gravity = 0;
      secretUpdateFighter(f, dt);
      selectedArena.gravity = oldGravity;
      if (spaceman && !f.dead) {
        const drift = Math.pow(0.975, dt * 60);
        f.vx *= drift;
        f.vy *= drift;
        if (Math.abs(f.vx) < 2) f.vx = 0;
        if (Math.abs(f.vy) < 2) f.vy = 0;
      }
      if (f !== player || netMode !== "local" || ownedSkins.has("spaceman")) return;
      const meter = document.querySelector("#airChallenge");
      if (!running || roundWait || f.dead || surfaceTouching(f)) {
        airChallengeTime = 0;
        meter.hidden = true;
        return;
      }
      airChallengeTime = Math.min(7, airChallengeTime + dt);
      meter.hidden = true;
      if (airChallengeTime >= 7) unlockSpaceman();
    };
    const spacePvpUpdate = updateFighter;
    updateFighter = (f, dt) => {
      const oldGravity = selectedArena.gravity;
      if (f.skin === "spaceman") selectedArena.gravity = 0;
      spacePvpUpdate(f, dt);
      selectedArena.gravity = oldGravity;
      if (f.skin === "spaceman" && !f.dead) {
        f.vx *= Math.pow(0.975, dt * 60);
        f.vy *= Math.pow(0.975, dt * 60);
      }
    };
    const baseGameUpdate = update;
    update = (dt) => {
      for (const s of spears) if (s.weapon === "asteroid" && !s.stuck && s.straightVy === void 0) s.straightVy = s.vy;
      baseGameUpdate(dt);
      for (const s of spears) if (s.weapon === "asteroid" && !s.stuck) s.vy = s.straightVy;
    };
    let arenaHazardClock = 0, crusherInset = 0, crusherInsetY = 0;
    const arenaHazardReset = resetRound;
    resetRound = () => {
      arenaHazardReset();
      arenaHazardClock = 0;
      crusherInset = crusherInsetY = 0;
    };
    const arenaHazardUpdate = update;
    update = (dt) => {
      let crusherProgress = 0;
      if (!roundWait && selectedArena.key === "crusher") {
        arenaHazardClock += dt;
        crusherProgress = Math.min(1, arenaHazardClock / 90);
        crusherInset = crusherProgress * Math.max(0, W / 2 - 92);
        crusherInsetY = crusherProgress * Math.max(0, H / 2 - 78);
        ground = H - crusherInsetY - 52;
      }
      arenaHazardUpdate(dt);
      if (roundWait) return;
      if (selectedArena.key === "crusher") {
        const left = crusherInset + 52, right = W - crusherInset - 52, top = crusherInsetY + 66, bottom = ground - 1;
        for (const f of allFighters()) {
          if (f.dead || f.away) continue;
          if (f.x < left) {
            f.x = left;
            f.vx = Math.abs(f.vx) * 0.35;
            f.av += 1;
          }
          if (f.x > right) {
            f.x = right;
            f.vx = -Math.abs(f.vx) * 0.35;
            f.av -= 1;
          }
          if (f.y < top) {
            f.y = top;
            f.vy = Math.abs(f.vy) * 0.35;
          }
          if (f.y > bottom - 43) {
            f.y = bottom - 43;
            f.vy = -Math.abs(f.vy) * 0.25;
            f.av += (Math.random() - 0.5) * 2;
          }
        }
        if (crusherProgress >= 1) endRound("tie");
        return;
      }
      if (selectedArena.key !== "halves") return;
      arenaHazardClock += dt;
      const phase = Math.floor(arenaHazardClock / 10) % 4, vertical = phase === 1, horizontal = phase === 3;
      if (!vertical && !horizontal) return;
      for (const f of allFighters()) {
        if (f.dead || f.away) continue;
        const touching = vertical ? Math.abs(f.x - W / 2) < 38 : Math.abs(f.y - 15 - H / 2) < 48;
        if (!touching) {
          if (vertical) f.laserSideV = f.x < W / 2 ? -1 : 1;
          else f.laserSideH = f.y - 15 < H / 2 ? -1 : 1;
          f.laserTime = 0;
          continue;
        }
        if (vertical) {
          const side = f.laserSideV || (f.x < W / 2 ? -1 : 1);
          f.x = W / 2 + side * 40;
          f.vx = side * Math.max(220, Math.abs(f.vx) * 0.4);
          f.av += side * 2;
        } else {
          const side = f.laserSideH || (f.y - 15 < H / 2 ? -1 : 1);
          f.y = H / 2 + 15 + side * 50;
          f.vy = side * Math.max(260, Math.abs(f.vy) * 0.35);
          f.av += side * 2;
        }
        if (f.laserTime) continue;
        f.laserTime = 1;
        f.hp--;
        noteLifeLost(f);
        f.blink = 0.7;
        f.stun = 0.25;
        f.av += (Math.random() - 0.5) * 7;
        shake = Math.max(shake, 13);
        for (let i = 0; i < 18; i++) particles.push({ x: f.x, y: f.y - 14, vx: (Math.random() - 0.5) * 300, vy: (Math.random() - 0.5) * 300, life: 0.35 + Math.random() * 0.35, c: "#ff4769", r: 2 + Math.random() * 3 });
        beep(170, 0.14, "sawtooth", 0.05);
        if (f.hp <= 0) {
          markDefeated(f);
          setTimeout(checkVictory, 300);
        }
      }
      for (const s of spears) {
        if (s.stuck || s.stuckTo) continue;
        const blocked = vertical ? Math.abs(s.x - W / 2) < 15 : Math.abs(s.y - H / 2) < 15;
        if (blocked) {
          s.stuck = true;
          s.life = 12;
          beep(105, 0.05, "square", 0.02);
        }
      }
    };
    const arenaHazardDraw = draw;
    draw = () => {
      arenaHazardDraw();
      if (selectedArena.key === "crusher") {
        ctx.save();
        ctx.strokeStyle = "rgba(255,128,82,.95)";
        ctx.shadowColor = "#ff8052";
        ctx.shadowBlur = 18;
        ctx.lineWidth = 10;
        ctx.strokeRect(crusherInset + 4, crusherInsetY + 4, W - crusherInset * 2 - 8, H - crusherInsetY * 2 - 8);
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffe3d6";
        ctx.font = "bold 24px DM Mono";
        ctx.textAlign = "center";
        ctx.fillText("CRUSHER  /  " + Math.max(0, Math.ceil(90 - arenaHazardClock)) + " SEC", W / 2, 54);
        ctx.restore();
        return;
      }
      if (selectedArena.key !== "halves") return;
      const phase = Math.floor(arenaHazardClock / 10) % 4, vertical = phase === 1, horizontal = phase === 3;
      if (!vertical && !horizontal) return;
      ctx.save();
      ctx.strokeStyle = "#ff4769";
      ctx.shadowColor = "#ff174f";
      ctx.shadowBlur = 20;
      ctx.lineWidth = 14;
      ctx.beginPath();
      if (vertical) {
        ctx.moveTo(W / 2, 0);
        ctx.lineTo(W / 2, H);
      } else {
        ctx.moveTo(0, H / 2);
        ctx.lineTo(W, H / 2);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "#fff5fa";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();
    };
    let reliableShieldHoldStart = 0, reliableShieldTimer = null, reliableShieldTriggered = false;
    const triggerReliableShield = () => {
      if (reliableShieldTriggered || soundOn || !running || roundWait || netMode === "local") return;
      reliableShieldTriggered = true;
      soundHoldFired = true;
      localInput("shield");
    };
    const beginReliableShield = (e) => {
      var _a2;
      if (soundOn || !running || roundWait || netMode === "local") return;
      if (soundHoldTimer) clearTimeout(soundHoldTimer);
      soundHoldTimer = null;
      reliableShieldHoldStart = Date.now();
      reliableShieldTriggered = false;
      try {
        (_a2 = soundBtn.setPointerCapture) == null ? void 0 : _a2.call(soundBtn, e.pointerId);
      } catch (_) {
      }
      reliableShieldTimer = setTimeout(triggerReliableShield, 1e4);
    };
    const finishReliableShield = () => {
      if (reliableShieldHoldStart && Date.now() - reliableShieldHoldStart >= 9800) triggerReliableShield();
      if (reliableShieldTimer) clearTimeout(reliableShieldTimer);
      reliableShieldTimer = null;
      reliableShieldHoldStart = 0;
    };
    soundBtn.addEventListener("pointerdown", beginReliableShield);
    soundBtn.addEventListener("pointerup", finishReliableShield);
    soundBtn.addEventListener("pointercancel", finishReliableShield);
    soundBtn.addEventListener("lostpointercapture", finishReliableShield);
    soundBtn.addEventListener("contextmenu", (e) => e.preventDefault());
    const SOCIAL_KEY = "loosePointSocialV1", friendStates = /* @__PURE__ */ new Map(), friendChecks = /* @__PURE__ */ new Map();
    function makeFriendCode() {
      var _a2;
      const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", bytes = new Uint8Array(8);
      if ((_a2 = globalThis.crypto) == null ? void 0 : _a2.getRandomValues) globalThis.crypto.getRandomValues(bytes);
      else for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
      return Array.from(bytes, (n) => alphabet[n % alphabet.length]).join("");
    }
    function cleanFriendCode(value) {
      return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
    }
    function cleanPlayerName(value) {
      return String(value || "").replace(/[^a-zA-Z0-9 _-]/g, "").trim().slice(0, 16) || "PLAYER";
    }
    function saveSocial() {
      try {
        localStorage.setItem(SOCIAL_KEY, JSON.stringify({ playerName, friendCode, friends: friendProfiles }));
      } catch (_) {
      }
    }
    function loadSocial() {
      try {
        const saved = JSON.parse(localStorage.getItem(SOCIAL_KEY) || "null");
        if (saved) {
          playerName = cleanPlayerName(saved.playerName);
          friendCode = cleanFriendCode(saved.friendCode);
          friendProfiles = Array.isArray(saved.friends) ? saved.friends.map((f) => ({ code: cleanFriendCode(f.code), name: cleanPlayerName(f.name || "FRIEND") })).filter((f) => f.code) : [];
        }
      } catch (_) {
      }
      if (friendCode.length < 6) friendCode = makeFriendCode();
      friendProfiles = [...new Map(friendProfiles.filter((f) => f.code !== friendCode).map((f) => [f.code, f])).values()];
      saveSocial();
    }
    function presenceSnapshot() {
      const openGuests = clients.filter((c) => (c == null ? void 0 : c.open) && !c._lpClosed).length;
      return { type: "presence-info", code: friendCode, name: playerName, online: true, roomId: netMode === "host" ? hostedRoomId : "", players: netMode === "host" && hostedRoomId ? openGuests + 1 : 0, maxPlayers: MAX_ONLINE_FIGHTERS };
    }
    function bindPresenceConnection(friendConn) {
      const send = () => {
        if (friendConn.open) friendConn.send(presenceSnapshot());
      };
      friendConn.on("open", send);
      friendConn.on("data", (data) => {
        if ((data == null ? void 0 : data.type) === "presence-query") send();
      });
      friendConn.on("error", () => {
      });
    }
    function initPresence() {
      if (!window.Peer || presencePeer) return;
      presencePeer = new Peer("lp-user-" + friendCode.toLowerCase());
      presencePeer.on("connection", bindPresenceConnection);
      presencePeer.on("open", () => refreshFriends());
      presencePeer.on("disconnected", () => setTimeout(() => {
        try {
          if (presencePeer && !presencePeer.destroyed && presencePeer.disconnected) presencePeer.reconnect();
        } catch (_) {
        }
      }, 1500));
      presencePeer.on("error", (error) => {
        if ((error == null ? void 0 : error.type) !== "peer-unavailable" && (error == null ? void 0 : error.type) !== "unavailable-id") setTimeout(refreshFriends, 1800);
      });
    }
    function updateFriendState(code, state) {
      friendStates.set(code, __spreadProps(__spreadValues(__spreadValues({}, friendStates.get(code) || {}), state), { checkedAt: Date.now() }));
      renderFriends();
    }
    function checkFriend(code) {
      if (!(presencePeer == null ? void 0 : presencePeer.open) || friendChecks.has(code)) return;
      updateFriendState(code, { checking: true });
      let finished = false, friendConn, timer;
      const finish = (online, data = {}) => {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        friendChecks.delete(code);
        if (online) {
          const profile = friendProfiles.find((f) => f.code === code);
          if (profile && data.name) {
            profile.name = cleanPlayerName(data.name);
            saveSocial();
          }
        }
        updateFriendState(code, __spreadValues({ checking: false, online }, data));
        try {
          friendConn == null ? void 0 : friendConn.close();
        } catch (_) {
        }
      };
      try {
        friendConn = presencePeer.connect("lp-user-" + code.toLowerCase(), { reliable: true, serialization: "json", metadata: { type: "presence-query", from: friendCode } });
        friendChecks.set(code, friendConn);
        friendConn.on("open", () => friendConn.send({ type: "presence-query" }));
        friendConn.on("data", (data) => {
          if ((data == null ? void 0 : data.type) === "presence-info") finish(true, { name: cleanPlayerName(data.name), roomId: String(data.roomId || "").slice(0, 32), players: Number(data.players) || 0, maxPlayers: Number(data.maxPlayers) || MAX_ONLINE_FIGHTERS });
        });
        friendConn.on("error", () => finish(false, { roomId: "" }));
        friendConn.on("close", () => finish(false, { roomId: "" }));
        timer = setTimeout(() => finish(false, { roomId: "" }), 4800);
      } catch (_) {
        finish(false, { roomId: "" });
      }
    }
    function refreshFriends() {
      renderFriends();
      if (!(presencePeer == null ? void 0 : presencePeer.open)) return;
      for (const friend of friendProfiles) checkFriend(friend.code);
    }
    function joinFriendRoom(roomId) {
      if (netMode !== "local" || joinBusy || peer || conn) return;
      document.querySelector("#roomInput").value = roomId;
      joinRoom();
    }
    function renderFriends() {
      const list = document.querySelector("#friendsList");
      if (!list) return;
      const nameInput = document.querySelector("#playerNameInput");
      if (document.activeElement !== nameInput) nameInput.value = playerName;
      document.querySelector("#friendCodeText").textContent = playerName;
      if (!friendProfiles.length) {
        list.innerHTML = "<small>ADD A FRIEND TO SEE THEM HERE.</small>";
        return;
      }
      list.innerHTML = "";
      for (const friend of friendProfiles) {
        const state = friendStates.get(friend.code) || {}, row = document.createElement("div");
        row.className = "friendRow" + (state.online ? " online" : "");
        const light = document.createElement("i");
        light.className = "friendLight";
        const identity = document.createElement("div");
        identity.className = "friendIdentity";
        const name = document.createElement("b");
        name.textContent = state.name || friend.name || "FRIEND";
        const detail = document.createElement("small");
        detail.textContent = state.checking ? "CHECKING..." : state.online ? state.roomId ? state.players + "/" + state.maxPlayers + " IN ROOM" : "ONLINE \u2014 NOT HOSTING" : "OFFLINE";
        identity.append(name, detail);
        const join = document.createElement("button");
        join.className = "friendJoin";
        join.textContent = state.roomId ? "JOIN ROOM" : state.online ? "ONLINE" : "OFFLINE";
        join.disabled = !state.roomId || state.players >= state.maxPlayers || netMode !== "local" || joinBusy;
        join.onclick = () => joinFriendRoom(state.roomId);
        const remove = document.createElement("button");
        remove.className = "friendRemove";
        remove.textContent = "\xD7";
        remove.title = "Remove friend";
        remove.onclick = () => {
          friendProfiles = friendProfiles.filter((f) => f.code !== friend.code);
          friendStates.delete(friend.code);
          saveSocial();
          renderFriends();
        };
        row.append(light, identity, join, remove);
        list.appendChild(row);
      }
    }
    function addFriend() {
      const input = document.querySelector("#friendCodeInput"), raw = input.value.trim(), code = cleanFriendCode(raw);
      if (code.length < 3) {
        document.querySelector("#lobbyStatus").textContent = "ENTER YOUR FRIEND\u2019S NAME.";
        return;
      }
      if (code === friendCode) {
        document.querySelector("#lobbyStatus").textContent = "THAT IS YOUR OWN NAME.";
        return;
      }
      if (!friendProfiles.some((f) => f.code === code)) friendProfiles.push({ code, name: cleanPlayerName(raw) });
      input.value = "";
      saveSocial();
      renderFriends();
      checkFriend(code);
    }
    function resetFailedJoin(message) {
      leavingRoom = true;
      joinBusy = false;
      document.querySelector("#joinButton").disabled = false;
      running = false;
      try {
        conn == null ? void 0 : conn.close();
      } catch (_) {
      }
      try {
        peer == null ? void 0 : peer.destroy();
      } catch (_) {
      }
      peer = conn = null;
      netMode = "local";
      document.querySelector("#onlineLobby").hidden = false;
      document.querySelector("#lobbyStatus").textContent = message;
      setTimeout(() => leavingRoom = false, 220);
      renderFriends();
    }
    captureEconomy = function() {
      var _a2;
      const fs = allFighters(), me = localFighter();
      playerCoins = (_a2 = me.coins) != null ? _a2 : playerCoins;
      if (netMode === "host") for (const c of clients) {
        const f = fs[c.fighterIndex];
        if (f) c.coins = f.coins || 0;
      }
      saveUpgrades();
      updateUpgradeUI();
    };
    bindConnection = function(friendConn) {
      var _a2, _b2;
      if (netMode === "host") {
        const playerId = cleanFriendCode(((_a2 = friendConn.metadata) == null ? void 0 : _a2.playerId) || friendConn.peer), active = clients.filter((c) => c && !c._lpClosed), duplicate = playerId && active.some((c) => c.playerId === playerId);
        if (duplicate || active.length >= MAX_ONLINE_GUESTS) {
          friendConn.on("open", () => {
            friendConn.send({ type: duplicate ? "duplicate" : "full" });
            setTimeout(() => friendConn.close(), 100);
          });
          return;
        }
        const used = new Set(active.map((c) => c.fighterIndex));
        let slot = 1;
        while (used.has(slot) && slot <= MAX_ONLINE_GUESTS) slot++;
        friendConn.fighterIndex = slot;
        friendConn.playerId = playerId;
        friendConn.displayName = cleanPlayerName(((_b2 = friendConn.metadata) == null ? void 0 : _b2.playerName) || "FRIEND");
        friendConn._lpClosed = false;
        clients.push(friendConn);
      } else conn = friendConn;
      friendConn.on("data", (data) => handleNetData(data, friendConn));
      friendConn.on("open", () => {
        if (netMode === "host") {
          friendConn.send({ type: "welcome", index: friendConn.fighterIndex });
          const joined = clients.filter((c) => (c == null ? void 0 : c.open) && !c._lpClosed).length;
          document.querySelector("#lobbyStatus").textContent = joined + " OF " + MAX_ONLINE_GUESTS + " FRIENDS JOINED";
          if (joined === 1 && !running && !atHome) spinArena();
          else if (running) {
            const f = fighter("p" + friendConn.fighterIndex);
            f.x = W * (0.15 + Math.random() * 0.7);
            f.y = ground - 80;
            f.vy = -120;
            if (friendConn.fighterIndex === 1) bot = f;
            else extraFighters[friendConn.fighterIndex - 2] = f;
            friendConn.send({ type: "spin", chosen: ARENAS.indexOf(selectedArena), wins });
          }
        } else {
          joinBusy = false;
          document.querySelector("#joinButton").disabled = false;
          friendConn.send({ type: "prefs", color: selectedColor, maxHp: 3 + lifeLevel, coins: playerCoins, skin: netSafeSkin(), rankXP });
          document.querySelector("#lobbyStatus").textContent = "CONNECTED \u2014 HOST IS CHOOSING THE WORLD";
          renderFriends();
        }
      });
      friendConn.on("close", () => {
        friendConn._lpClosed = true;
        if (leavingRoom) return;
        if (netMode === "host") {
          const f = allFighters()[friendConn.fighterIndex];
          if (f) {
            f.dead = true;
            f.away = true;
          }
          clients = clients.filter((c) => c !== friendConn);
          document.querySelector("#lobbyStatus").textContent = clients.filter((c) => (c == null ? void 0 : c.open) && !c._lpClosed).length + " OF " + MAX_ONLINE_GUESTS + " FRIENDS JOINED";
          setTimeout(checkVictory, 80);
        } else {
          joinBusy = false;
          document.querySelector("#joinButton").disabled = false;
          running = false;
          document.querySelector("#onlineLobby").hidden = false;
          document.querySelector("#lobbyStatus").textContent = "CONNECTION LOST. RETURN AND TRY A NEW ROOM.";
          renderFriends();
        }
      });
      friendConn.on("error", () => {
        if (netMode === "guest") {
          joinBusy = false;
          document.querySelector("#joinButton").disabled = false;
        }
      });
    };
    joinRoom = function() {
      if (joinBusy || netMode !== "local" || peer || conn) return;
      if (!window.Peer) {
        document.querySelector("#lobbyStatus").textContent = "NETWORK LIBRARY DID NOT LOAD. CHECK YOUR INTERNET.";
        return;
      }
      const code = document.querySelector("#roomInput").value.trim().toLowerCase();
      if (!code) return;
      joinBusy = true;
      document.querySelector("#joinButton").disabled = true;
      document.querySelector("#lobbyStatus").textContent = "CONNECTING...";
      renderFriends();
      netMode = "guest";
      peer = new Peer();
      peer.on("open", () => {
        if (joinBusy) bindConnection(peer.connect(code, { reliable: true, serialization: "json", metadata: { playerId: friendCode, playerName } }));
      });
      peer.on("error", () => resetFailedJoin("COULD NOT FIND THAT ROOM. CHECK THE CODE."));
    };
    const socialHandleNetData = handleNetData;
    handleNetData = (data, friendConn) => {
      if ((data == null ? void 0 : data.type) === "full") {
        resetFailedJoin("THAT ROOM IS FULL \u2014 SEVEN FIGHTERS MAX.");
        return;
      }
      if ((data == null ? void 0 : data.type) === "duplicate") {
        resetFailedJoin("YOU ARE ALREADY IN THAT ROOM \u2014 DUPLICATE JOIN BLOCKED.");
        return;
      }
      socialHandleNetData(data, friendConn);
    };
    broadcastRanks = () => {
      if (netMode !== "host") return;
      const ranks = [{ name: playerName, rank: rankNameFromXp(rankXP) }, ...clients.filter((c) => (c == null ? void 0 : c.open) && !c._lpClosed).map((c) => ({ name: c.displayName || "FIGHTER " + (c.fighterIndex + 1), rank: rankNameFromXp(c.rankXP || 0) }))];
      showRankRoster(ranks);
      for (const c of clients) if ((c == null ? void 0 : c.open) && !c._lpClosed) c.send({ type: "ranks", ranks });
    };
    const socialOpenLobby = openLobby;
    openLobby = () => {
      socialOpenLobby();
      renderFriends();
      refreshFriends();
    };
    function savePlayerName() {
      return __async(this, null, function* () {
        const input = document.querySelector("#playerNameInput"), next = cleanPlayerName(input.value), nextCode = cleanFriendCode(next), oldName = playerName, oldCode = friendCode;
        if (nextCode.length < 3) {
          input.value = oldName;
          document.querySelector("#lobbyStatus").textContent = "CHOOSE A NAME WITH AT LEAST 3 LETTERS.";
          return;
        }
        if (nextCode === oldCode) {
          playerName = next;
          saveSocial();
          renderFriends();
          refreshFriends();
          return;
        }
        if (netMode !== "local") {
          input.value = oldName;
          document.querySelector("#lobbyStatus").textContent = "RETURN HOME BEFORE CHANGING YOUR NAME.";
          return;
        }
        let probe;
        try {
          probe = new Peer("lp-user-" + nextCode.toLowerCase());
          yield new Promise((resolve, reject) => {
            let done = false;
            const finish = (fn) => {
              if (done) return;
              done = true;
              fn();
            };
            probe.on("open", () => finish(resolve));
            probe.on("error", () => finish(() => reject(new Error("name-taken"))));
            setTimeout(() => finish(() => reject(new Error("name-check-timeout"))), 4500);
          });
          probe.destroy();
          presencePeer == null ? void 0 : presencePeer.destroy();
          presencePeer = null;
          playerName = next;
          friendCode = nextCode;
          saveSocial();
          renderFriends();
          initPresence();
          refreshFriends();
          document.querySelector("#lobbyStatus").textContent = "NAME SAVED.";
        } catch (_) {
          try {
            probe == null ? void 0 : probe.destroy();
          } catch (_2) {
          }
          playerName = oldName;
          friendCode = oldCode;
          input.value = oldName;
          renderFriends();
          document.querySelector("#lobbyStatus").textContent = "THAT NAME IS ALREADY IN USE \u2014 YOUR OLD NAME WAS RESTORED.";
        }
      });
    }
    document.querySelector("#hostButton").onclick = () => {
      if (netMode === "local" && !peer && !joinBusy) hostRoom();
    };
    document.querySelector("#joinButton").onclick = () => joinRoom();
    document.querySelector("#saveNameButton").onclick = savePlayerName;
    document.querySelector("#playerNameInput").addEventListener("keydown", (event) => {
      if (event.key === "Enter") document.querySelector("#saveNameButton").click();
    });
    document.querySelector("#addFriendButton").onclick = addFriend;
    document.querySelector("#friendCodeInput").addEventListener("keydown", (event) => {
      if (event.key === "Enter") addFriend();
    });
    (_a = document.querySelector("#copyFriendCodeButton")) == null ? void 0 : _a.addEventListener("click", () => {
      var _a2;
      return (_a2 = navigator.clipboard) == null ? void 0 : _a2.writeText(playerName);
    });
    loadSocial();
    renderFriends();
    initPresence();
    friendRefreshTimer = setInterval(refreshFriends, 1e4);
    let freezeUnlocked = false, freezeLevel = 0, stillTime = 0, stillAnchor = null;
    const freezeDurations = [0, 1.5, 2.4, 3.6, 5], freezeCosts = [0, 30, 60, 100];
    const freezeBtn = document.querySelector("#freezeButton"), abilityTab = document.querySelector('.upgradeTabs button[data-tab="abilities"]');
    function freezeMe() {
      return localFighter();
    }
    function updateFreezeButton() {
      const me = freezeMe();
      if (!freezeBtn || !me) return;
      const available = !!freezeUnlocked && !!me.hasFreezeAbility && running && !roundWait && !me.dead;
      freezeBtn.hidden = !available;
      const charge = Math.max(0, Math.min(1, me.freezeCharge == null ? 1 : me.freezeCharge));
      freezeBtn.style.setProperty("--charge", Math.round(charge * 360) + "deg");
      freezeBtn.disabled = !available || !me.freezeArmed && charge < 0.999;
      freezeBtn.querySelector("b").textContent = me.freezeArmed ? "NEXT SHOT" : charge >= 0.999 ? "FREEZE" : "CHARGING";
      freezeBtn.querySelector("small").textContent = me.freezeArmed ? "ARMED" : Math.round(charge * 100) + "%";
    }
    function showFreezeUnlock() {
      const meter = document.querySelector("#airChallenge");
      if (!meter) return;
      meter.hidden = false;
      meter.classList.add("unlocked");
      meter.querySelector("b").textContent = "SECRET UNLOCKED";
      meter.querySelector("span").textContent = "FREEZE ARROW \u2014 OPEN CUSTOMIZE";
      setTimeout(() => {
        meter.hidden = true;
        meter.classList.remove("unlocked");
      }, 3200);
    }
    function renderFreezeAbility() {
      if (abilityTab) abilityTab.hidden = !freezeUnlocked;
      const text = document.querySelector("#freezeAbilityText"), button = document.querySelector("#freezeUpgradeButton");
      if (!text || !button) return;
      if (!freezeUnlocked) {
        text.textContent = "Keep exploring the pit to discover this ability.";
        button.hidden = true;
        return;
      }
      const seconds = freezeDurations[freezeLevel] || freezeDurations[1];
      text.textContent = "Your charged next shot freezes one fighter for " + seconds + " seconds." + (freezeLevel >= 4 ? " Missed shots also become freeze traps." : "");
      const maxed = freezeLevel >= 4, cost = freezeCosts[freezeLevel] || 0;
      button.hidden = false;
      button.disabled = maxed || playerCoins < cost;
      button.textContent = maxed ? "MAXIMUM FREEZE" : "UPGRADE \u2014 \u25C9 " + cost;
    }
    function unlockFreeze() {
      if (freezeUnlocked) return;
      freezeUnlocked = true;
      freezeLevel = 1;
      const me = freezeMe();
      if (me) {
        me.hasFreezeAbility = true;
        me.freezeLevel = freezeLevel;
        me.freezeCharge = 1;
      }
      saveUpgrades();
      sendLoadout();
      updateUpgradeUI();
      showFreezeUnlock();
    }
    function freezeFighter(target, owner, spear) {
      const level = Math.max(1, Math.min(4, (owner == null ? void 0 : owner.freezeLevel) || 1)), duration = freezeDurations[level];
      target.freezeTime = duration;
      target.frozenFace = faceAngle(target);
      target.freezeOwnerSide = (owner == null ? void 0 : owner.side) || "";
      target.vx = 0;
      target.vy = 0;
      target.av = 0;
      target.stun = Math.max(target.stun || 0, duration);
      spear.stuck = true;
      spear.stuckTo = target;
      spear.embedAngle = spear.a - target.angle;
      spear.embedX = (spear.x - target.x) * 0.45;
      spear.embedY = (spear.y - target.y) * 0.45;
      spear.life = duration + 0.25;
      spear.freezeTarget = true;
      for (let i = 0; i < 22; i++) particles.push({ x: spear.x, y: spear.y, vx: (Math.random() - 0.5) * 260, vy: (Math.random() - 0.5) * 260, life: 0.35 + Math.random() * 0.35, c: i % 2 ? "#b9f6ff" : "#4ecfff", r: 2 + Math.random() * 3 });
      beep(540, 0.18, "sine", 0.05);
    }
    const freezeSaveUpgrades = saveUpgrades;
    saveUpgrades = () => {
      freezeSaveUpgrades();
      try {
        const d = JSON.parse(localStorage.getItem("loosePointUpgrades") || "{}");
        d.freezeUnlocked = freezeUnlocked;
        d.freezeLevel = freezeLevel;
        localStorage.setItem("loosePointUpgrades", JSON.stringify(d));
      } catch (_) {
      }
    };
    const freezeLoadUpgrades = loadUpgrades;
    loadUpgrades = () => {
      try {
        const d = JSON.parse(localStorage.getItem("loosePointUpgrades") || "{}");
        freezeUnlocked = !!d.freezeUnlocked;
        freezeLevel = freezeUnlocked ? Math.max(1, Math.min(4, d.freezeLevel || 1)) : 0;
      } catch (_) {
      }
      freezeLoadUpgrades();
      renderFreezeAbility();
    };
    const freezeUpgradeUI = updateUpgradeUI;
    updateUpgradeUI = () => {
      freezeUpgradeUI();
      renderFreezeAbility();
    };
    const freezeSendLoadout = sendLoadout;
    sendLoadout = () => {
      freezeSendLoadout();
      const me = freezeMe();
      if (me) {
        me.hasFreezeAbility = freezeUnlocked;
        me.freezeLevel = freezeUnlocked ? freezeLevel : 0;
        me.freezeCharge = me.freezeCharge == null ? 1 : me.freezeCharge;
      }
      if (netMode === "guest" && (conn == null ? void 0 : conn.open)) conn.send({ type: "prefs", freezeUnlocked, freezeLevel });
    };
    const freezeResetRound = resetRound;
    resetRound = () => {
      freezeResetRound();
      for (const f of allFighters()) {
        f.freezeTime = 0;
        f.frozenFace = null;
        f.freezeArmed = false;
        f.freezeCharge = 1;
      }
      const me = freezeMe();
      if (me) {
        me.hasFreezeAbility = freezeUnlocked;
        me.freezeLevel = freezeUnlocked ? freezeLevel : 0;
      }
      if (netMode === "host") for (const c of clients) {
        const f = allFighters()[c == null ? void 0 : c.fighterIndex];
        if (f) {
          f.hasFreezeAbility = !!c.freezeUnlocked;
          f.freezeLevel = c.freezeLevel || 0;
        }
      }
      updateFreezeButton();
    };
    const freezeThrowSpear = throwSpear;
    throwSpear = (f) => {
      var _a2;
      const before = spears.length, use = !!(f.freezeArmed && f.hasFreezeAbility && ((_a2 = f.freezeCharge) != null ? _a2 : 1) >= 0.999);
      freezeThrowSpear(f);
      if (use && spears.length > before) {
        const s = spears[spears.length - 1];
        if ((s == null ? void 0 : s.owner) === f) {
          s.weapon = "freeze";
          s.freeze = true;
          f.freezeArmed = false;
          f.freezeCharge = 0;
        }
      }
      updateFreezeButton();
    };
    const freezeHit = hit;
    hit = (f, s) => {
      const sameBotTeam = netMode === "local" && s.owner !== player && f !== player;
      if (f.freezeTime > 0) {
        deflectProjectile(f, s);
        return;
      }
      if (s.weapon === "freeze") {
        if (f.dead || f.invisibleTime > 0 || s.owner === f || sameBotTeam || s.stuck) return;
        if (f.shieldTime > 0 || trojanShieldHit(f, s)) {
          deflectProjectile(f, s);
          return;
        }
        freezeFighter(f, s.owner, s);
        return;
      }
      freezeHit(f, s);
    };
    const freezeUpdateFighter = updateFighter;
    updateFighter = (f, dt) => {
      if (f.freezeTime > 0) {
        f.freezeTime = Math.max(0, f.freezeTime - dt);
        f.vx = 0;
        f.vy = 0;
        f.av = 0;
        f.stun = Math.max(f.stun || 0, f.freezeTime);
        if (f.freezeTime <= 0) {
          f.frozenFace = null;
          f.freezeOwnerSide = "";
          for (const s of spears) if (s.stuckTo === f && s.freezeTarget) {
            s.stuckTo = null;
            s.stuck = false;
            s.freezeTarget = false;
            s.freeze = false;
            s.weapon = "spear";
            s.life = Math.max(1.2, s.life);
            s.vx = 0;
            s.vy = 55;
          }
        }
        return;
      }
      freezeUpdateFighter(f, dt);
    };
    const freezeUpdateSpecial = updateSpecial;
    updateSpecial = (f, dt) => {
      if (f.freezeTime > 0) return;
      freezeUpdateSpecial(f, dt);
    };
    const freezeDrawSpear = drawSpear;
    drawSpear = (s) => {
      if (s.weapon !== "freeze") return freezeDrawSpear(s);
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.a);
      ctx.strokeStyle = "#d9fbff";
      ctx.fillStyle = "#5ddcff";
      ctx.shadowColor = "#48cfff";
      ctx.shadowBlur = 14;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-30, 0);
      ctx.lineTo(24, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(33, 0);
      ctx.lineTo(18, -8);
      ctx.lineTo(20, 8);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };
    const freezeUpdate = update;
    update = (dt) => {
      var _a2;
      freezeUpdate(dt);
      for (const f of allFighters()) if (f.hasFreezeAbility && !f.dead) f.freezeCharge = Math.min(1, (f.freezeCharge == null ? 1 : f.freezeCharge) + dt / 12);
      for (const s of spears) {
        if (s.weapon === "freeze" && s.stuck && !s.stuckTo && !s.freezeTrap) {
          if ((((_a2 = s.owner) == null ? void 0 : _a2.freezeLevel) || 0) >= 4) {
            s.freezeTrap = true;
            s.life = Math.max(s.life, 12);
          } else {
            s.weapon = "spear";
            s.freeze = false;
          }
        }
        if (s.freezeTrap) {
          for (const f of allFighters()) {
            if (f === s.owner || f.dead || f.away || f.freezeTime > 0) continue;
            if (bodyHit(f, s.x - 3, s.y - 3, s.x + 3, s.y + 3)) {
              freezeFighter(f, s.owner, s);
              s.freezeTrap = false;
              s.weapon = "spear";
              s.freeze = false;
              break;
            }
          }
        }
      }
      const me = freezeMe(), activeBattle = document.visibilityState === "visible" && !document.hidden && !atHome && document.querySelector("#arenaRoulette").hidden;
      if (!freezeUnlocked && running && !roundWait && activeBattle && me && !me.dead && !me.away) {
        const moving = !stillAnchor || Math.hypot(me.x - stillAnchor.x, me.y - stillAnchor.y) > 2 || Math.hypot(me.vx, me.vy) > 12 || Math.abs(me.av || 0) > 0.05 || (me.stun || 0) > 0.02;
        if (moving) {
          stillAnchor = { x: me.x, y: me.y };
          stillTime = 0;
        } else if ((stillTime += dt) >= 15) unlockFreeze();
      } else {
        stillTime = 0;
        stillAnchor = me ? { x: me.x, y: me.y } : null;
      }
      updateFreezeButton();
    };
    const freezeLocalInput = localInput;
    localInput = (kind, a, b) => {
      var _a2;
      if (kind === "freezeArm") {
        const me = freezeMe();
        if (!me || !me.hasFreezeAbility || me.freezeArmed || ((_a2 = me.freezeCharge) != null ? _a2 : 1) < 0.999) return;
        me.freezeArmed = true;
        if (netMode === "guest" && (conn == null ? void 0 : conn.open)) conn.send({ type: "input", kind });
        updateFreezeButton();
        return;
      }
      freezeLocalInput(kind, a, b);
    };
    const freezeNetData = handleNetData;
    handleNetData = (d, c) => {
      var _a2;
      if ((d == null ? void 0 : d.type) === "input" && d.kind === "freezeArm" && netMode === "host") {
        const f = allFighters()[c == null ? void 0 : c.fighterIndex];
        if (f && f.hasFreezeAbility && ((_a2 = f.freezeCharge) != null ? _a2 : 1) >= 0.999) f.freezeArmed = true;
        return;
      }
      freezeNetData(d, c);
      if ((d == null ? void 0 : d.type) === "prefs" && netMode === "host") {
        c.freezeUnlocked = !!d.freezeUnlocked;
        c.freezeLevel = c.freezeUnlocked ? Math.max(1, Math.min(4, d.freezeLevel || 1)) : 0;
        const f = allFighters()[c == null ? void 0 : c.fighterIndex];
        if (f) {
          f.hasFreezeAbility = c.freezeUnlocked;
          f.freezeLevel = c.freezeLevel;
          f.freezeCharge = f.freezeCharge == null ? 1 : f.freezeCharge;
        }
      }
    };
    document.querySelectorAll(".upgradeTabs button").forEach((btn) => btn.onclick = () => {
      if (btn.hidden) return;
      document.querySelectorAll(".upgradeTabs button").forEach((b) => b.classList.toggle("active", b === btn));
      for (const id of ["colors", "clothes", "lives", "abilities"]) document.querySelector("#" + id + "Panel").hidden = btn.dataset.tab !== id;
    });
    document.querySelector("#freezeUpgradeButton").onclick = () => {
      if (!freezeUnlocked || freezeLevel >= 4) return;
      const cost = freezeCosts[freezeLevel];
      if (playerCoins < cost) return;
      playerCoins -= cost;
      freezeLevel++;
      saveUpgrades();
      sendLoadout();
      updateUpgradeUI();
    };
    freezeBtn.onclick = (event) => {
      event.stopPropagation();
      localInput("freezeArm");
    };
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stillTime = 0;
        stillAnchor = null;
      }
    });
    let presenceRestartTimer = null;
    const schedulePresenceRestart = () => {
      clearTimeout(presenceRestartTimer);
      presenceRestartTimer = setTimeout(() => {
        if (presencePeer == null ? void 0 : presencePeer.open) return;
        try {
          presencePeer == null ? void 0 : presencePeer.destroy();
        } catch (_) {
        }
        presencePeer = null;
        initPresence();
        refreshFriends();
      }, 1600);
    };
    initPresence = () => {
      if (!window.Peer || (presencePeer == null ? void 0 : presencePeer.open)) return;
      try {
        presencePeer == null ? void 0 : presencePeer.destroy();
      } catch (_) {
      }
      const p = presencePeer = new Peer("lp-user-" + friendCode.toLowerCase());
      p.on("connection", bindPresenceConnection);
      p.on("open", () => {
        refreshFriends();
      });
      p.on("disconnected", schedulePresenceRestart);
      p.on("close", schedulePresenceRestart);
      p.on("error", schedulePresenceRestart);
    };
    const directHostRoom = hostRoom;
    hostRoom = () => {
      directHostRoom();
      let tries = 0;
      const announce = setInterval(() => {
        tries++;
        if (netMode !== "host" || tries > 12) {
          clearInterval(announce);
          return;
        }
        if (hostedRoomId) {
          refreshFriends();
          clearInterval(announce);
        }
      }, 250);
    };
    loadNearbyRooms = () => {
      const box = document.querySelector("#nearbyRooms");
      if (box) box.innerHTML = "<small>FRIEND ROOMS SHOW ABOVE WHEN A FRIEND HAS THE GAME OPEN.</small>";
    };
    const roomPresenceSnapshot = presenceSnapshot;
    presenceSnapshot = () => {
      const snapshot = roomPresenceSnapshot();
      if (netMode === "guest" && hostedRoomId) {
        snapshot.roomId = hostedRoomId;
        snapshot.players = 0;
      }
      return snapshot;
    };
    publishRoom = () => __async(null, null, function* () {
    });
    keepRoomListed = () => {
    };
    function showRoomNotice(message) {
      var _a2;
      const old = document.querySelector(".roomNotice");
      old == null ? void 0 : old.remove();
      const notice = document.createElement("div");
      notice.className = "roomNotice";
      notice.textContent = message;
      (_a2 = document.querySelector("#onlineLobby")) == null ? void 0 : _a2.appendChild(notice);
      setTimeout(() => notice.remove(), 2600);
    }
    function joinFirstAvailableRoom() {
      return __async(this, null, function* () {
        if (netMode !== "local" || joinBusy || peer || conn) return;
        const status = document.querySelector("#lobbyStatus");
        if (status) status.textContent = "LOOKING FOR A FRIEND'S ROOM...";
        const rooms = friendProfiles.map((friend) => friendStates.get(friend.code)).filter((state) => (state == null ? void 0 : state.online) && state.roomId).map((state) => ({ roomId: state.roomId }));
        const room = rooms.find((item) => item == null ? void 0 : item.roomId);
        if (!room) {
          showRoomNotice("NO ROOM AVAILABLE");
          if (status) status.textContent = "NO ROOM AVAILABLE.";
          return;
        }
        const roomId = String(room.roomId).trim().toLowerCase();
        document.querySelector("#roomInput").value = roomId;
        joinRoom();
      });
    }
    (_b = document.querySelector("#joinFirstRoomButton")) == null ? void 0 : _b.addEventListener("click", joinFirstAvailableRoom);
    const stableBindConnection = bindConnection;
    bindConnection = function(friendConn) {
      stableBindConnection(friendConn);
      if (netMode === "guest") {
        friendConn.on("error", () => {
          if (!leavingRoom) resetFailedJoin("COULD NOT CONNECT TO THAT ROOM. CHECK THE CODE AND TRY AGAIN.");
        });
      }
    };
    clearInterval(friendRefreshTimer);
    friendRefreshTimer = setInterval(refreshFriends, 3e3);
    if (!(presencePeer == null ? void 0 : presencePeer.open)) schedulePresenceRestart();
    let ricochetOwned = false, ricochetLevel = 0;
    const ricochetShots = [0, 1, 2, 3, 3, 3, 999], ricochetBounces = [0, 1, 1, 1, 2, 3, 1], ricochetUpgradeCosts = [0, 100, 150, 250, 350, 500];
    const ricochetBtn = document.querySelector("#ricochetButton"), ricochetText = document.querySelector("#ricochetAbilityText"), ricochetBuy = document.querySelector("#ricochetAbilityButton");
    const ricochetStats = () => ({ shots: ricochetShots[ricochetLevel] || 1, bounces: ricochetBounces[ricochetLevel] || 1, all: ricochetLevel >= 6 });
    function renderRicochetAbility() {
      if (!ricochetText || !ricochetBuy) return;
      if (!freezeUnlocked) {
        ricochetText.textContent = "Unlock Freeze Arrow first to reveal Ricochet.";
        ricochetBuy.textContent = "LOCKED";
        ricochetBuy.disabled = true;
        return;
      }
      if (!ricochetOwned) {
        ricochetText.textContent = "Yellow-tan outlined shots bounce off walls and blocks.";
        ricochetBuy.textContent = "BUY \u2014 \u25C9 700";
        ricochetBuy.disabled = playerCoins < 700;
        return;
      }
      const r = ricochetStats();
      ricochetText.textContent = r.all ? "Every shot ricochets once." : r.shots + " charged shot" + (r.shots === 1 ? "" : "s") + " ricochet " + r.bounces + " time" + (r.bounces === 1 ? "" : "s") + ".";
      const maxed = ricochetLevel >= 6, cost = ricochetUpgradeCosts[ricochetLevel] || 0;
      ricochetBuy.textContent = maxed ? "MAXIMUM RICOCHET" : "UPGRADE \u2014 \u25C9 " + cost;
      ricochetBuy.disabled = maxed || playerCoins < cost;
    }
    function updateRicochetButton() {
      const me = freezeMe();
      if (!ricochetBtn || !me) return;
      const available = ricochetOwned && me.hasRicochetAbility && running && !roundWait && !me.dead;
      ricochetBtn.hidden = !available;
      const charge = Math.max(0, Math.min(1, me.ricochetCharge == null ? 1 : me.ricochetCharge));
      const r = ricochetStats();
      ricochetBtn.style.setProperty("--charge", Math.round(charge * 360) + "deg");
      ricochetBtn.disabled = !available || !r.all && !me.ricochetArmedShots && charge < 0.999;
      ricochetBtn.querySelector("b").textContent = r.all ? "ALL BOUNCE" : me.ricochetArmedShots ? "BOUNCING" : charge >= 0.999 ? "RICOCHET" : "CHARGING";
      ricochetBtn.querySelector("small").textContent = r.all ? "ON" : me.ricochetArmedShots ? me.ricochetArmedShots + " SHOT" + (me.ricochetArmedShots === 1 ? "" : "S") : Math.round(charge * 100) + "%";
    }
    const ricoSaveUpgrades = saveUpgrades;
    saveUpgrades = () => {
      ricoSaveUpgrades();
      try {
        const d = JSON.parse(localStorage.getItem("loosePointUpgrades") || "{}");
        d.ricochetOwned = ricochetOwned;
        d.ricochetLevel = ricochetLevel;
        localStorage.setItem("loosePointUpgrades", JSON.stringify(d));
      } catch (_) {
      }
    };
    const ricoLoadUpgrades = loadUpgrades;
    loadUpgrades = () => {
      try {
        const d = JSON.parse(localStorage.getItem("loosePointUpgrades") || "{}");
        ricochetOwned = !!d.ricochetOwned;
        ricochetLevel = ricochetOwned ? Math.max(1, Math.min(6, d.ricochetLevel || 1)) : 0;
      } catch (_) {
      }
      ricoLoadUpgrades();
      renderRicochetAbility();
    };
    const ricoUpgradeUI = updateUpgradeUI;
    updateUpgradeUI = () => {
      ricoUpgradeUI();
      renderRicochetAbility();
    };
    const ricoSendLoadout = sendLoadout;
    sendLoadout = () => {
      ricoSendLoadout();
      const me = freezeMe();
      if (me) {
        me.hasRicochetAbility = ricochetOwned;
        me.ricochetLevel = ricochetLevel;
        me.ricochetCharge = me.ricochetCharge == null ? 1 : me.ricochetCharge;
      }
      if (netMode === "guest" && (conn == null ? void 0 : conn.open)) conn.send({ type: "prefs", ricochetOwned, ricochetLevel });
    };
    const ricoResetRound = resetRound;
    resetRound = () => {
      ricoResetRound();
      for (const f of allFighters()) {
        f.ricochetCharge = 1;
        f.ricochetArmedShots = 0;
      }
      const me = freezeMe();
      if (me) {
        me.hasRicochetAbility = ricochetOwned;
        me.ricochetLevel = ricochetLevel;
      }
      if (netMode === "host") for (const c of clients) {
        const f = allFighters()[c == null ? void 0 : c.fighterIndex];
        if (f) {
          f.hasRicochetAbility = !!c.ricochetOwned;
          f.ricochetLevel = c.ricochetLevel || 0;
        }
      }
      updateRicochetButton();
    };
    const ricoThrow = throwSpear;
    throwSpear = (f) => {
      const before = spears.length, r = f.ricochetLevel >= 6 ? { shots: 999, bounces: 1, all: true } : { shots: f.ricochetArmedShots || 0, bounces: ricochetBounces[f.ricochetLevel] || 1 };
      ricoThrow(f);
      if (spears.length > before && r.shots > 0) {
        const s = spears[spears.length - 1];
        if ((s == null ? void 0 : s.owner) === f) {
          s.ricochet = true;
          s.bouncesLeft = Math.max(s.bouncesLeft || 0, r.bounces);
          if (!r.all) f.ricochetArmedShots = Math.max(0, f.ricochetArmedShots - 1);
        }
      }
      updateRicochetButton();
    };
    const ricoUpdate = update;
    update = (dt) => {
      ricoUpdate(dt);
      for (const f of allFighters()) if (f.hasRicochetAbility && !f.dead) f.ricochetCharge = Math.min(1, (f.ricochetCharge == null ? 1 : f.ricochetCharge) + dt / 12);
      updateRicochetButton();
    };
    const ricoDrawSpear = drawSpear;
    drawSpear = (s) => {
      ricoDrawSpear(s);
      if (!s.ricochet) return;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.a);
      ctx.strokeStyle = "#e5c978";
      ctx.shadowColor = "#e4c35f";
      ctx.shadowBlur = 8;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-38, 0);
      ctx.lineTo(29, 0);
      ctx.stroke();
      ctx.restore();
    };
    const ricoLocalInput = localInput;
    localInput = (kind, a, b) => {
      var _a2;
      if (kind === "ricochetArm") {
        const me = freezeMe(), r = ricochetStats();
        if (!(me == null ? void 0 : me.hasRicochetAbility) || r.all || me.ricochetArmedShots || ((_a2 = me.ricochetCharge) != null ? _a2 : 1) < 0.999) return;
        me.ricochetArmedShots = r.shots;
        me.ricochetCharge = 0;
        if (netMode === "guest" && (conn == null ? void 0 : conn.open)) conn.send({ type: "input", kind });
        updateRicochetButton();
        return;
      }
      ricoLocalInput(kind, a, b);
    };
    const ricoNetData = handleNetData;
    handleNetData = (d, c) => {
      var _a2;
      if ((d == null ? void 0 : d.type) === "input" && d.kind === "ricochetArm" && netMode === "host") {
        const f = allFighters()[c == null ? void 0 : c.fighterIndex], level = (f == null ? void 0 : f.ricochetLevel) || 0;
        if ((f == null ? void 0 : f.hasRicochetAbility) && level < 6 && ((_a2 = f.ricochetCharge) != null ? _a2 : 1) >= 0.999) {
          f.ricochetArmedShots = ricochetShots[level] || 1;
          f.ricochetCharge = 0;
        }
        return;
      }
      ricoNetData(d, c);
      if ((d == null ? void 0 : d.type) === "prefs" && netMode === "host") {
        c.ricochetOwned = !!d.ricochetOwned;
        c.ricochetLevel = c.ricochetOwned ? Math.max(1, Math.min(6, d.ricochetLevel || 1)) : 0;
        const f = allFighters()[c == null ? void 0 : c.fighterIndex];
        if (f) {
          f.hasRicochetAbility = c.ricochetOwned;
          f.ricochetLevel = c.ricochetLevel;
          f.ricochetCharge = f.ricochetCharge == null ? 1 : f.ricochetCharge;
        }
      }
    };
    const ricoSmoothGuest = smoothGuest;
    smoothGuest = (dt) => {
      ricoSmoothGuest(dt);
      if (netTarget == null ? void 0 : netTarget.fighters) {
        const fs = allFighters();
        netTarget.fighters.forEach((t, i) => {
          if (fs[i]) {
            for (const k of ["hasRicochetAbility", "ricochetLevel", "ricochetCharge", "ricochetArmedShots", "freezeTime", "frozenFace", "freezeOwnerSide"]) if (k in t) fs[i][k] = t[k];
          }
        });
      }
      if (netTarget == null ? void 0 : netTarget.spears) spears.forEach((s, i) => {
        if (netTarget.spears[i]) s.ricochet = !!netTarget.spears[i].ricochet;
      });
      updateRicochetButton();
    };
    ricochetBuy.onclick = () => {
      if (!freezeUnlocked) return;
      if (!ricochetOwned) {
        if (playerCoins < 700) return;
        playerCoins -= 700;
        ricochetOwned = true;
        ricochetLevel = 1;
      } else if (ricochetLevel < 6) {
        const cost = ricochetUpgradeCosts[ricochetLevel];
        if (playerCoins < cost) return;
        playerCoins -= cost;
        ricochetLevel++;
      }
      saveUpgrades();
      sendLoadout();
      updateUpgradeUI();
    };
    ricochetBtn.onclick = (event) => {
      event.stopPropagation();
      localInput("ricochetArm");
    };
    let selectedAbility = "freeze";
    const abilityAction = document.querySelector("#abilityActionButton"), unlockRicochet = document.querySelector("#unlockRicochetButton");
    function renderAbilityPicker() {
      const freezePick = document.querySelector('.abilityPick[data-ability="freeze"]'), ricoPick = document.querySelector('.abilityPick[data-ability="ricochet"]');
      if (!freezePick || !ricoPick) return;
      if (selectedAbility === "ricochet" && !ricochetOwned) selectedAbility = "freeze";
      ricoPick.disabled = !ricochetOwned;
      ricoPick.classList.toggle("locked", !ricochetOwned);
      ricoPick.querySelector("em").hidden = ricochetOwned;
      freezePick.classList.toggle("selected", selectedAbility === "freeze");
      ricoPick.classList.toggle("selected", selectedAbility === "ricochet");
      const freeze = selectedAbility === "freeze", sourceText = document.querySelector(freeze ? "#freezeAbilityText" : "#ricochetAbilityText"), sourceButton = document.querySelector(freeze ? "#freezeUpgradeButton" : "#ricochetAbilityButton");
      document.querySelector("#abilityEyebrow").textContent = freeze ? "SECRET ABILITY" : "SECOND ABILITY";
      document.querySelector("#abilityName").textContent = freeze ? "FREEZE ARROW" : "RICOCHET";
      document.querySelector("#abilityDescription").textContent = sourceText.textContent;
      abilityAction.textContent = sourceButton.textContent;
      abilityAction.disabled = sourceButton.disabled;
      unlockRicochet.hidden = ricochetOwned;
      unlockRicochet.disabled = ricochetBuy.disabled;
    }
    const pickerUpgradeUi = updateUpgradeUI;
    updateUpgradeUI = () => {
      pickerUpgradeUi();
      renderAbilityPicker();
    };
    document.querySelectorAll(".abilityPick").forEach((button) => button.onclick = () => {
      if (button.disabled) return;
      selectedAbility = button.dataset.ability;
      renderAbilityPicker();
    });
    abilityAction.onclick = () => document.querySelector(selectedAbility === "freeze" ? "#freezeUpgradeButton" : "#ricochetAbilityButton").click();
    unlockRicochet.onclick = () => ricochetBuy.click();
    function caveSpikeShape(spike) {
      return { x: spike.x, y: spike.y, w: spike.w, h: spike.h, tipX: spike.x, tipY: spike.y + spike.h };
    }
    function caveSpikeHitFighter(f, spike) {
      if (f.dead || f.away) return false;
      const sh = caveSpikeShape(spike), dx = Math.abs(f.x - sh.x), head = f.y - 55, feet = f.y + 43;
      if (dx > Math.max(18, sh.w * 0.58) || feet < sh.y + 8 || head > sh.tipY) return false;
      const slope = Math.max(0, 1 - dx / (sh.w * 0.58)), solidBottom = sh.y + 8 + sh.h * slope;
      return head < solidBottom && feet > sh.y + 8;
    }
    function hurtByCaveSpike(f, spike) {
      var _a2;
      if (f.dead || f.away || ((_a2 = spike.hit) == null ? void 0 : _a2.has(f.side))) return;
      spike.hit || (spike.hit = /* @__PURE__ */ new Set());
      spike.hit.add(f.side);
      f.hp--;
      noteLifeLost(f);
      f.blink = 0.55;
      f.stun = 0.25;
      f.vx += (f.x - spike.x) * 9;
      f.vy = -360;
      f.av += (f.x < spike.x ? -1 : 1) * 6;
      shake = Math.max(shake, 14);
      for (let i = 0; i < 18; i++) particles.push({ x: f.x, y: f.y - 22, vx: (Math.random() - 0.5) * 260, vy: -80 - Math.random() * 260, life: 0.35 + Math.random() * 0.4, c: fighterFxColor(f), r: 2 + Math.random() * 3 });
      beep(95, 0.14, "square", 0.045);
      if (f.hp <= 0) {
        markDefeated(f);
        setTimeout(checkVictory, 300);
      }
    }
    function updateCaveSpikes(dt) {
      if (selectedArena.key !== "cave" || roundWait) return;
      for (const spike of caveSpikes) {
        spike.timer -= dt;
        if (spike.state === "ready" && spike.timer <= 0) {
          spike.state = "falling";
          spike.vy = 0;
          spike.hit = /* @__PURE__ */ new Set();
        }
        if (spike.state === "falling") {
          spike.vy += 2100 * dt;
          spike.y += spike.vy * dt;
          for (const f of allFighters()) if (caveSpikeHitFighter(f, spike)) hurtByCaveSpike(f, spike);
          if (spike.y + spike.h >= spike.groundY) {
            spike.y = spike.groundY - spike.h;
            spike.state = "stuck";
            spike.timer = 5;
            spike.vy = 0;
            beep(70, 0.07, "square", 0.03);
          }
        } else if (spike.state === "stuck") {
          if (spike.timer <= 0) {
            spike.state = "hidden";
            spike.y = 0;
            spike.timer = 0.9 + Math.random() * 1.4;
            spike.hit = /* @__PURE__ */ new Set();
          }
        } else if (spike.state === "hidden" && spike.timer <= 0) {
          spike.state = "ready";
          spike.y = 0;
          spike.timer = 3 + Math.random() * 4;
        }
      }
    }
    function solveCaveCeilingSpikes() {
      if (selectedArena.key !== "cave") return;
      for (let x = 0; x < W; x += 70) {
        const tip = x + 35, bottom = 35 + x % 90, half = 35;
        for (const f of allFighters()) {
          if (f.dead || f.away) continue;
          const dx = Math.abs(f.x - tip);
          if (dx > half + 15) continue;
          const slope = Math.max(0, 1 - dx / (half + 15)), solidBottom = bottom * slope;
          if (f.y - 55 < solidBottom && f.y + 20 > 0) {
            f.y = solidBottom + 55;
            f.vy = Math.max(90, Math.abs(f.vy) * 0.25);
            f.av += (f.x < tip ? -1 : 1) * 1.5;
          }
        }
      }
    }
    function drawCaveSpikes() {
      if (selectedArena.key !== "cave") return;
      ctx.save();
      for (const spike of caveSpikes) {
        if (spike.state === "hidden") continue;
        const sh = caveSpikeShape(spike);
        ctx.fillStyle = spike.state === "falling" ? "#322d38" : spike.state === "stuck" ? "#26232b" : "#17151c";
        ctx.strokeStyle = selectedArena.accent;
        ctx.globalAlpha = spike.state === "ready" ? 0.78 : 1;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sh.x - sh.w / 2, sh.y);
        ctx.lineTo(sh.x + sh.w / 2, sh.y);
        ctx.lineTo(sh.tipX, sh.tipY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }
    const caveSpikeUpdate = update;
    update = (dt) => {
      caveSpikeUpdate(dt);
      solveCaveCeilingSpikes();
      updateCaveSpikes(dt);
    };
    const caveSpikeDraw = draw;
    draw = () => {
      caveSpikeDraw();
      drawCaveSpikes();
    };
    const caveSpikeSendState = sendState;
    sendState = (t) => {
      var _a2;
      caveSpikeSendState(t);
      if (netMode !== "host" || !clients.some((c) => c == null ? void 0 : c.open)) return;
      const snapshot = { type: "cave-spikes", spikes: caveSpikes.map((s) => ({ x: s.x, y: s.y, w: s.w, h: s.h, state: s.state, timer: s.timer, vy: s.vy, groundY: s.groundY })) };
      for (const c of clients) if ((c == null ? void 0 : c.open) && (((_a2 = c.dataChannel) == null ? void 0 : _a2.bufferedAmount) || 0) < 12e3) c.send(snapshot);
    };
    const caveSpikeNetData = handleNetData;
    handleNetData = (d, c) => {
      if ((d == null ? void 0 : d.type) === "cave-spikes" && netMode === "guest") {
        caveSpikes = (d.spikes || []).map((s) => __spreadProps(__spreadValues({}, s), { hit: /* @__PURE__ */ new Set() }));
        return;
      }
      caveSpikeNetData(d, c);
    };
    let nameEditDirty = false, lastGoodName = playerName, lastGoodCode = friendCode, presenceNameChanging = false;
    const profileInput = document.querySelector("#playerNameInput");
    if (profileInput) {
      profileInput.addEventListener("focus", () => nameEditDirty = true);
      profileInput.addEventListener("input", () => nameEditDirty = true);
      profileInput.addEventListener("blur", () => {
        setTimeout(() => {
          if (document.activeElement !== profileInput) nameEditDirty = false;
          renderFriends();
        }, 80);
      });
    }
    const stableRenderFriends = renderFriends;
    renderFriends = function() {
      const input = document.querySelector("#playerNameInput"), typed = input == null ? void 0 : input.value;
      stableRenderFriends();
      if (input && nameEditDirty) input.value = typed;
      const label = document.querySelector("#friendCodeText");
      if (label) label.textContent = playerName;
      const empty = document.querySelector("#friendsList>small");
      if (empty) empty.textContent = "ADD FRIEND TO SEE THEM HERE.";
    };
    const restartPresenceNow = () => {
      try {
        presencePeer == null ? void 0 : presencePeer.destroy();
      } catch (_) {
      }
      presencePeer = null;
      schedulePresenceRestart == null ? void 0 : schedulePresenceRestart();
      setTimeout(() => {
        initPresence();
        refreshFriends();
      }, 250);
    };
    savePlayerName = function() {
      return __async(this, null, function* () {
        const input = document.querySelector("#playerNameInput"), status = document.querySelector("#lobbyStatus");
        const next = cleanPlayerName((input == null ? void 0 : input.value) || playerName), nextCode = cleanFriendCode(next);
        if (nextCode.length < 3) {
          if (input) input.value = playerName;
          if (status) status.textContent = "CHOOSE A NAME WITH AT LEAST 3 LETTERS.";
          return;
        }
        if (netMode !== "local") {
          if (input) input.value = playerName;
          if (status) status.textContent = "RETURN HOME BEFORE CHANGING YOUR NAME.";
          return;
        }
        lastGoodName = playerName;
        lastGoodCode = friendCode;
        presenceNameChanging = true;
        playerName = next;
        friendCode = nextCode;
        friendProfiles = friendProfiles.filter((f) => f.code !== friendCode);
        nameEditDirty = false;
        saveSocial();
        renderFriends();
        restartPresenceNow();
        if (status) status.textContent = "NAME SAVED.";
        setTimeout(() => presenceNameChanging = false, 6e3);
      });
    };
    const saveNameButton = document.querySelector("#saveNameButton");
    if (saveNameButton) saveNameButton.onclick = savePlayerName;
    const friendPresenceInit = initPresence;
    initPresence = function() {
      if (!window.Peer || (presencePeer == null ? void 0 : presencePeer.open)) return;
      try {
        presencePeer == null ? void 0 : presencePeer.destroy();
      } catch (_) {
      }
      const wanted = "lp-user-" + friendCode.toLowerCase(), p = presencePeer = new Peer(wanted);
      p.on("connection", bindPresenceConnection);
      p.on("open", () => {
        presenceNameChanging = false;
        refreshFriends();
      });
      p.on("disconnected", schedulePresenceRestart);
      p.on("close", schedulePresenceRestart);
      p.on("error", (error) => {
        if ((error == null ? void 0 : error.type) === "unavailable-id" && presenceNameChanging) {
          playerName = lastGoodName || "PLAYER";
          friendCode = lastGoodCode || makeFriendCode();
          presenceNameChanging = false;
          saveSocial();
          renderFriends();
          const status = document.querySelector("#lobbyStatus");
          if (status) status.textContent = "THAT NAME IS ALREADY IN USE \u2014 YOUR OLD NAME WAS RESTORED.";
        }
        schedulePresenceRestart();
      });
    };
    checkFriend = function(code) {
      if (!(presencePeer == null ? void 0 : presencePeer.open) || friendChecks.has(code)) return;
      updateFriendState(code, { checking: true });
      let finished = false, friendConn, timer;
      const finish = (online, data = {}) => {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        friendChecks.delete(code);
        if (online) {
          const profile = friendProfiles.find((f) => f.code === code);
          if (profile && data.name) {
            profile.name = cleanPlayerName(data.name);
            saveSocial();
          }
        }
        updateFriendState(code, __spreadValues({ checking: false, online }, data));
        try {
          friendConn == null ? void 0 : friendConn.close();
        } catch (_) {
        }
      };
      try {
        friendConn = presencePeer.connect("lp-user-" + code.toLowerCase(), { reliable: true, serialization: "json", metadata: { type: "presence-query", from: friendCode } });
        friendChecks.set(code, friendConn);
        friendConn.on("open", () => {
          friendConn.send({ type: "presence-query" });
          setTimeout(() => friendConn.open && friendConn.send({ type: "presence-query" }), 450);
        });
        friendConn.on("data", (data) => {
          if ((data == null ? void 0 : data.type) === "presence-info") finish(true, { name: cleanPlayerName(data.name), roomId: String(data.roomId || "").slice(0, 32), players: Number(data.players) || 0, maxPlayers: Number(data.maxPlayers) || MAX_ONLINE_FIGHTERS });
        });
        friendConn.on("error", () => finish(false, { roomId: "" }));
        friendConn.on("close", () => {
          setTimeout(() => finish(false, { roomId: "" }), 160);
        });
        timer = setTimeout(() => finish(false, { roomId: "" }), 6500);
      } catch (_) {
        finish(false, { roomId: "" });
      }
    };
    refreshFriends = function() {
      renderFriends();
      if (!(presencePeer == null ? void 0 : presencePeer.open)) {
        schedulePresenceRestart == null ? void 0 : schedulePresenceRestart();
        return;
      }
      for (const friend of friendProfiles) checkFriend(friend.code);
    };
    if (profileInput) profileInput.value = playerName;
    let liveNameTyped = (profileInput == null ? void 0 : profileInput.value) || playerName;
    if (profileInput) {
      profileInput.addEventListener("pointerdown", () => {
        nameEditDirty = true;
        liveNameTyped = profileInput.value;
      }, true);
      profileInput.addEventListener("keydown", () => {
        nameEditDirty = true;
        setTimeout(() => liveNameTyped = profileInput.value, 0);
      }, true);
      profileInput.addEventListener("input", () => {
        nameEditDirty = true;
        liveNameTyped = profileInput.value;
      }, true);
    }
    const noSnapRenderFriends = renderFriends;
    renderFriends = function() {
      const input = document.querySelector("#playerNameInput"), typed = nameEditDirty ? (input == null ? void 0 : input.value) || liveNameTyped : null;
      noSnapRenderFriends();
      if (input && nameEditDirty) input.value = typed;
      const label = document.querySelector("#friendCodeText");
      if (label) label.textContent = playerName;
    };
    savePlayerName = function() {
      const input = document.querySelector("#playerNameInput"), status = document.querySelector("#lobbyStatus");
      const next = cleanPlayerName((input == null ? void 0 : input.value) || liveNameTyped || playerName), nextCode = cleanFriendCode(next);
      if (nextCode.length < 3) {
        if (status) status.textContent = "CHOOSE A NAME WITH AT LEAST 3 LETTERS.";
        return;
      }
      if (netMode !== "local") {
        if (status) status.textContent = "RETURN HOME BEFORE CHANGING YOUR NAME.";
        return;
      }
      playerName = next;
      friendCode = nextCode;
      liveNameTyped = next;
      nameEditDirty = false;
      friendProfiles = friendProfiles.filter((f) => f.code !== friendCode);
      saveSocial();
      renderFriends();
      try {
        presencePeer == null ? void 0 : presencePeer.destroy();
      } catch (_) {
      }
      presencePeer = null;
      setTimeout(() => {
        initPresence();
        refreshFriends();
      }, 350);
      if (status) status.textContent = "NAME SAVED.";
    };
    if (saveNameButton) saveNameButton.onclick = savePlayerName;
    const oldHardenedPresenceInit = initPresence;
    initPresence = function() {
      if (!window.Peer || (presencePeer == null ? void 0 : presencePeer.open)) return;
      try {
        presencePeer == null ? void 0 : presencePeer.destroy();
      } catch (_) {
      }
      const p = presencePeer = new Peer("lp-user-" + friendCode.toLowerCase());
      p.on("connection", bindPresenceConnection);
      p.on("open", () => refreshFriends());
      p.on("disconnected", schedulePresenceRestart);
      p.on("close", schedulePresenceRestart);
      p.on("error", () => {
        presencePeer = null;
        schedulePresenceRestart();
      });
    };
    const hardHostRoom = hostRoom;
    hostRoom = function() {
      if (netMode !== "local") leaveRoom();
      try {
        peer == null ? void 0 : peer.destroy();
      } catch (_) {
      }
      peer = conn = null;
      joinBusy = false;
      hostedRoomId = "";
      clients = [];
      hardHostRoom();
      setTimeout(() => {
        if (peer && netMode === "host") peer.on("connection", (roomConnection) => roomConnection.on("open", () => {
          try {
            roomConnection.send({ type: "room-info", roomId: hostedRoomId });
          } catch (_) {
          }
        }));
      }, 500);
      setTimeout(refreshFriends, 900);
    };
    const hardJoinRoom = joinRoom;
    joinRoom = function() {
      if (joinBusy) return;
      if (netMode !== "local" || peer || conn) {
        try {
          peer == null ? void 0 : peer.destroy();
        } catch (_) {
        }
        try {
          conn == null ? void 0 : conn.close();
        } catch (_) {
        }
        peer = conn = null;
        netMode = "local";
      }
      const field = document.querySelector("#roomInput"), typed = String((field == null ? void 0 : field.value) || "").trim().toLowerCase();
      if (!typed) {
        document.querySelector("#lobbyStatus").textContent = "ENTER A ROOM CODE FIRST.";
        return;
      }
      if (field) field.value = typed.startsWith("loose-") ? typed : "loose-" + typed;
      hardJoinRoom();
      setTimeout(() => {
        if (joinBusy && netMode === "guest") resetFailedJoin("CONNECTION TIMED OUT. CHECK THE ROOM CODE AND TRY AGAIN.");
      }, 12e3);
    };
    function rememberFriend(code, name) {
      code = cleanFriendCode(code);
      name = cleanPlayerName(name || code);
      if (!code || code === friendCode) return false;
      const existing = friendProfiles.find((f) => f.code === code);
      if (existing) {
        existing.name = name || existing.name;
        saveSocial();
        renderFriends();
        return false;
      }
      friendProfiles.push({ code, name });
      saveSocial();
      renderFriends();
      checkFriend(code);
      return true;
    }
    function friendRequestPopup(fromCode, fromName, replyConn) {
      var _a2, _b2;
      (_a2 = document.querySelector(".friendRequestPop")) == null ? void 0 : _a2.remove();
      const pop = document.createElement("div");
      pop.className = "friendRequestPop";
      const copy = document.createElement("div");
      const title = document.createElement("b");
      title.textContent = "FRIEND THIS PERSON?";
      const sub = document.createElement("small");
      sub.textContent = cleanPlayerName(fromName || fromCode);
      copy.append(title, sub);
      const accept = document.createElement("button");
      accept.className = "accept";
      accept.textContent = "\u2713";
      accept.title = "Accept friend request";
      const deny = document.createElement("button");
      deny.textContent = "X";
      deny.title = "Deny friend request";
      accept.onclick = () => {
        rememberFriend(fromCode, fromName);
        try {
          replyConn == null ? void 0 : replyConn.send({ type: "friend-accept", code: friendCode, name: playerName });
        } catch (_) {
        }
        pop.remove();
        document.querySelector("#lobbyStatus").textContent = "FRIEND ADDED.";
      };
      deny.onclick = () => {
        try {
          replyConn == null ? void 0 : replyConn.send({ type: "friend-deny", code: friendCode, name: playerName });
        } catch (_) {
        }
        pop.remove();
      };
      pop.append(copy, accept, deny);
      (_b2 = document.querySelector("#arena")) == null ? void 0 : _b2.appendChild(pop);
      setTimeout(() => {
        if (pop.isConnected) {
          try {
            replyConn == null ? void 0 : replyConn.send({ type: "friend-deny", code: friendCode, name: playerName });
          } catch (_) {
          }
          pop.remove();
        }
      }, 2e4);
    }
    const requestPresenceBinding = bindPresenceConnection;
    bindPresenceConnection = function(friendConn) {
      requestPresenceBinding(friendConn);
      friendConn.on("data", (data) => {
        if ((data == null ? void 0 : data.type) === "friend-request") {
          const fromCode = cleanFriendCode(data.code), fromName = cleanPlayerName(data.name || fromCode);
          if (!fromCode || fromCode === friendCode) return;
          if (friendProfiles.some((f) => f.code === fromCode)) {
            friendConn.send({ type: "friend-accept", code: friendCode, name: playerName });
            return;
          }
          friendRequestPopup(fromCode, fromName, friendConn);
        } else if ((data == null ? void 0 : data.type) === "friend-accept") {
          rememberFriend(data.code, data.name);
          document.querySelector("#lobbyStatus").textContent = "FRIEND ADDED.";
        } else if ((data == null ? void 0 : data.type) === "friend-deny") {
          const denied = cleanPlayerName(data.name || data.code || "FRIEND");
          document.querySelector("#lobbyStatus").textContent = denied + " DENIED.";
        }
      });
    };
    addFriend = function() {
      const input = document.querySelector("#friendCodeInput"), status = document.querySelector("#lobbyStatus"), raw = input.value.trim(), code = cleanFriendCode(raw), name = cleanPlayerName(raw);
      if (code.length < 3) {
        status.textContent = "ENTER YOUR FRIENDS NAME.";
        return;
      }
      if (code === friendCode) {
        status.textContent = "THAT IS YOUR OWN NAME.";
        return;
      }
      if (friendProfiles.some((f) => f.code === code)) {
        status.textContent = "YOU ARE ALREADY FRIENDS.";
        return;
      }
      if (!(presencePeer == null ? void 0 : presencePeer.open)) {
        status.textContent = "FRIEND SYSTEM IS STARTING. TRY AGAIN IN A SECOND.";
        initPresence();
        return;
      }
      status.textContent = "SENDING FRIEND REQUEST...";
      let done = false, requestConn, timer;
      const finish = (message) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        try {
          requestConn == null ? void 0 : requestConn.close();
        } catch (_) {
        }
        status.textContent = message;
      };
      try {
        requestConn = presencePeer.connect("lp-user-" + code.toLowerCase(), { reliable: true, serialization: "json", metadata: { type: "friend-request", from: friendCode } });
        requestConn.on("open", () => requestConn.send({ type: "friend-request", code: friendCode, name: playerName }));
        requestConn.on("data", (data) => {
          if ((data == null ? void 0 : data.type) === "friend-accept") {
            rememberFriend(data.code || code, data.name || name);
            input.value = "";
            finish("FRIEND ADDED.");
          } else if ((data == null ? void 0 : data.type) === "friend-deny") {
            finish("DENIED.");
          }
        });
        requestConn.on("error", () => finish("COULD NOT FIND THAT FRIEND ONLINE."));
        requestConn.on("close", () => setTimeout(() => finish("NO ANSWER YET."), 220));
        timer = setTimeout(() => finish("NO ANSWER YET."), 22e3);
      } catch (_) {
        finish("COULD NOT SEND FRIEND REQUEST.");
      }
    };
    document.querySelector("#addFriendButton").onclick = addFriend;
    document.querySelector("#friendCodeInput").onkeydown = (event) => {
      if (event.key === "Enter") addFriend();
    };
    setTimeout(() => {
      try {
        presencePeer == null ? void 0 : presencePeer.destroy();
      } catch (_) {
      }
      presencePeer = null;
      initPresence();
      refreshFriends();
    }, 650);
    function syncAcidControls() {
      const me = localFighter();
      if (!throwBtn || !me) return;
      const acid = me.skin === "acid";
      throwBtn.hidden = acid;
      if (acid) document.querySelector("#ammoLabel").textContent = "TOUCH DAMAGE";
    }
    const acidFreezeUpdateButtons = updateActionButtons;
    updateActionButtons = () => {
      acidFreezeUpdateButtons();
      syncAcidControls();
    };
    const acidFreezeResetRound = resetRound;
    resetRound = () => {
      acidFreezeResetRound();
      syncAcidControls();
    };
    const acidFreezeSendLoadout = sendLoadout;
    sendLoadout = () => {
      acidFreezeSendLoadout();
      syncAcidControls();
    };
    const acidFreezeDrawArc = drawArc;
    drawArc = () => {
      var _a2;
      if (((_a2 = localFighter()) == null ? void 0 : _a2.skin) === "acid") return;
      acidFreezeDrawArc();
    };
    const acidFreezeUpdateSpecial = updateSpecial;
    updateSpecial = (f, dt) => {
      var _a2, _b2;
      if (f.skin !== "acid" || f.dead || f.freezeTime > 0) {
        acidFreezeUpdateSpecial(f, dt);
        return;
      }
      f.meleeCooldown = Math.max(0, f.meleeCooldown - dt);
      const target = ((_a2 = allFighters().filter((o) => o !== f && !o.dead && !o.away).map((o) => {
        const dx = o.x - f.x, dy = o.y - f.y;
        return { o, dx, dy, d: Math.hypot(dx, dy) };
      }).filter((v) => v.d < 46).sort((a, b) => a.d - b.d)[0]) == null ? void 0 : _a2.o) || null;
      if (target !== f.acidContact) {
        f.acidContact = target;
        if (target) {
          const dx = target.x - f.x, dy = target.y - f.y, d = Math.hypot(dx, dy) || 1;
          if (f.freezeArmed && f.hasFreezeAbility && ((_b2 = f.freezeCharge) != null ? _b2 : 1) >= 0.999) {
            const ghost = { owner: f, stuck: false, stuckTo: null, x: target.x, y: target.y - 20, a: faceAngle(f), life: 2, weapon: "freeze" };
            freezeFighter(target, f, ghost);
            spears.push(ghost);
            f.freezeArmed = false;
            f.freezeCharge = 0;
            for (let i = 0; i < 22; i++) particles.push({ x: f.x, y: f.y - 20, vx: (Math.random() - 0.5) * 240, vy: (Math.random() - 0.5) * 240, life: 0.35 + Math.random() * 0.4, c: i % 2 ? "#b9f6ff" : "#4ecfff", r: 2 + Math.random() * 3 });
          } else {
            directDamage(f, target, dx / d, dy / d, 360, Math.sign(dx || 1) * 5, "#73e642");
            for (let i = 0; i < 16; i++) particles.push({ x: target.x, y: target.y - 15, vx: (Math.random() - 0.5) * 260, vy: -80 - Math.random() * 240, life: 0.35 + Math.random() * 0.45, c: i % 2 ? "#8eff53" : "#d8ff63", r: 2 + Math.random() * 3 });
          }
        }
      }
      if (f.beamActive) {
        stopBeam(f);
      }
    };
    const acidFreezeDrawFighter = drawFighter;
    drawFighter = (f) => {
      acidFreezeDrawFighter(f);
      if (f.skin === "acid" && f.freezeArmed && f.hasFreezeAbility) {
        ctx.save();
        ctx.strokeStyle = "rgba(107,222,255,.9)";
        ctx.shadowColor = "#4ecfff";
        ctx.shadowBlur = 18;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(f.x, f.y - 22, 40 + Math.sin(performance.now() / 120) * 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    };
    const acidFreezeButtonText = updateFreezeButton;
    updateFreezeButton = () => {
      var _a2, _b2;
      acidFreezeButtonText();
      const me = localFighter();
      if ((me == null ? void 0 : me.skin) === "acid" && me.hasFreezeAbility && !document.querySelector("#freezeButton").hidden) {
        document.querySelector("#freezeButton b").textContent = me.freezeArmed ? "NEXT TOUCH" : ((_a2 = me.freezeCharge) != null ? _a2 : 1) >= 0.999 ? "FREEZE" : "CHARGING";
        document.querySelector("#freezeButton small").textContent = me.freezeArmed ? "ARMED" : Math.round(Math.max(0, Math.min(1, (_b2 = me.freezeCharge) != null ? _b2 : 1)) * 100) + "%";
      }
    };
    let splitOwned = false, splitLevel = 0;
    const splitBtn = document.querySelector("#splitButton"), splitText = document.querySelector("#splitAbilityText"), splitBuy = document.querySelector("#splitAbilityButton");
    const splitCosts = [0, 80, 140, 230, 360], splitCooldowns = [0, 12, 10, 10, 8, 7];
    const splitStats = (level) => ({ count: level >= 5 ? 4 : level >= 3 ? 3 : 2, cooldown: splitCooldowns[level] || 12 });
    function renderSplitAbility() {
      if (!splitText || !splitBuy) return;
      if (!freezeUnlocked) {
        splitText.textContent = "Unlock Freeze Arrow first to reveal Split.";
        splitBuy.textContent = "LOCKED";
        splitBuy.disabled = true;
        return;
      }
      if (!splitOwned) {
        splitOwned = true;
        splitLevel = 1;
        saveUpgrades();
      }
      const s = splitStats(splitLevel), maxed = splitLevel >= 5, cost = splitCosts[splitLevel] || 0;
      splitText.textContent = "Your charged next shot splits into " + s.count + " smaller shots. Reload: " + s.cooldown + " seconds.";
      splitBuy.textContent = maxed ? "MAXIMUM SPLIT" : "UPGRADE \u2014 \u25C9 " + cost;
      splitBuy.disabled = maxed || playerCoins < cost;
    }
    function updateSplitButton() {
      const me = localFighter();
      if (!splitBtn || !me) return;
      const available = splitOwned && me.hasSplitAbility && running && !roundWait && !me.dead && me.skin !== "acid";
      splitBtn.hidden = !available;
      const charge = Math.max(0, Math.min(1, me.splitCharge == null ? 1 : me.splitCharge));
      splitBtn.style.setProperty("--charge", Math.round(charge * 360) + "deg");
      splitBtn.disabled = !available || !me.splitArmed && charge < 0.999;
      splitBtn.querySelector("b").textContent = me.splitArmed ? "NEXT SHOT" : charge >= 0.999 ? "SPLIT" : "CHARGING";
      splitBtn.querySelector("small").textContent = me.splitArmed ? "ARMED" : Math.round(charge * 100) + "%";
    }
    function makeSplitCopies(source) {
      if (!(source == null ? void 0 : source.owner)) return;
      const owner = source.owner, level = Math.max(1, owner.splitLevel || 1), stats = splitStats(level), total = stats.count, spread = 0.13 + Math.min(0.08, level * 0.01), baseAngle = source.a;
      if (total < 2) return;
      source.small = 0.72;
      source.splitShot = true;
      const center = (total - 1) / 2;
      for (let i = 0; i < total; i++) {
        if (i === Math.floor(center)) continue;
        const offset = (i - center) * spread, a = baseAngle + offset, speed = Math.hypot(source.vx, source.vy) || 720;
        spears.push(__spreadProps(__spreadValues({}, source), { x: source.x + Math.cos(a) * 6, y: source.y + Math.sin(a) * 6, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, a, spinA: a, small: 0.72, splitShot: true, stuck: false, stuckTo: null, life: source.life }));
      }
      for (let i = 0; i < 16; i++) particles.push({ x: source.x, y: source.y, vx: (Math.random() - 0.5) * 260, vy: (Math.random() - 0.5) * 260, life: 0.25 + Math.random() * 0.25, c: i % 2 ? "#d9edff" : "#8dbdff", r: 2 + Math.random() * 2 });
      beep(660, 0.11, "triangle", 0.045);
    }
    const splitSaveUpgrades = saveUpgrades;
    saveUpgrades = () => {
      splitSaveUpgrades();
      try {
        const d = JSON.parse(localStorage.getItem("loosePointUpgrades") || "{}");
        d.splitOwned = splitOwned;
        d.splitLevel = splitLevel;
        localStorage.setItem("loosePointUpgrades", JSON.stringify(d));
      } catch (_) {
      }
    };
    const splitLoadUpgrades = loadUpgrades;
    loadUpgrades = () => {
      try {
        const d = JSON.parse(localStorage.getItem("loosePointUpgrades") || "{}");
        splitOwned = !!d.splitOwned;
        splitLevel = splitOwned ? Math.max(1, Math.min(5, d.splitLevel || 1)) : 0;
      } catch (_) {
      }
      splitLoadUpgrades();
      renderSplitAbility();
    };
    const splitUpgradeUI = updateUpgradeUI;
    updateUpgradeUI = () => {
      splitUpgradeUI();
      renderSplitAbility();
      const splitPick = document.querySelector('.abilityPick[data-ability="split"]');
      if (splitPick) {
        splitPick.disabled = !freezeUnlocked;
        splitPick.classList.toggle("locked", !freezeUnlocked);
      }
    };
    const splitSendLoadout = sendLoadout;
    sendLoadout = () => {
      splitSendLoadout();
      const me = localFighter();
      if (me) {
        me.hasFreezeAbility = freezeUnlocked;
        me.freezeLevel = freezeUnlocked ? freezeLevel : 0;
        me.hasRicochetAbility = ricochetOwned;
        me.ricochetLevel = ricochetLevel;
        me.hasSplitAbility = splitOwned;
        me.splitLevel = splitLevel;
        me.splitCharge = me.splitCharge == null ? 1 : me.splitCharge;
      }
      if (netMode === "guest" && (conn == null ? void 0 : conn.open)) conn.send({ type: "prefs", freezeUnlocked, freezeLevel, ricochetOwned, ricochetLevel, splitOwned, splitLevel });
    };
    const splitResetRound = resetRound;
    resetRound = () => {
      splitResetRound();
      for (const f of allFighters()) {
        f.splitCharge = 1;
        f.splitArmed = false;
      }
      const me = localFighter();
      if (me) {
        me.hasSplitAbility = splitOwned;
        me.splitLevel = splitLevel;
      }
      if (netMode === "host") for (const c of clients) {
        const f = allFighters()[c == null ? void 0 : c.fighterIndex];
        if (f) {
          f.hasFreezeAbility = !!c.freezeUnlocked;
          f.freezeLevel = c.freezeLevel || 0;
          f.hasRicochetAbility = !!c.ricochetOwned;
          f.ricochetLevel = c.ricochetLevel || 0;
          f.hasSplitAbility = !!c.splitOwned;
          f.splitLevel = c.splitLevel || 0;
        }
      }
      updateSplitButton();
      updateFreezeButton();
      updateRicochetButton();
    };
    const splitThrowSpear = throwSpear;
    throwSpear = (f) => {
      var _a2;
      const before = spears.length, use = !!(f.splitArmed && f.hasSplitAbility && ((_a2 = f.splitCharge) != null ? _a2 : 1) >= 0.999);
      splitThrowSpear(f);
      if (use && spears.length > before) {
        const s = spears[spears.length - 1];
        if ((s == null ? void 0 : s.owner) === f) {
          makeSplitCopies(s);
          f.splitArmed = false;
          f.splitCharge = 0;
        }
      }
      updateSplitButton();
    };
    const splitUpdate = update;
    update = (dt) => {
      splitUpdate(dt);
      for (const f of allFighters()) if (f.hasSplitAbility && !f.dead) {
        const cooldown = splitStats(f.splitLevel || 1).cooldown;
        f.splitCharge = Math.min(1, (f.splitCharge == null ? 1 : f.splitCharge) + dt / cooldown);
      }
      updateSplitButton();
    };
    const splitDrawSpear = drawSpear;
    drawSpear = (s) => {
      if (!s.small) {
        splitDrawSpear(s);
        return;
      }
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.scale(s.small, s.small);
      ctx.translate(-s.x, -s.y);
      splitDrawSpear(s);
      ctx.restore();
    };
    const splitLocalInput = localInput;
    localInput = (kind, a, b) => {
      var _a2;
      if (kind === "splitArm") {
        const me = localFighter();
        if (!(me == null ? void 0 : me.hasSplitAbility) || me.splitArmed || ((_a2 = me.splitCharge) != null ? _a2 : 1) < 0.999 || me.skin === "acid") return;
        me.splitArmed = true;
        if (netMode === "guest" && (conn == null ? void 0 : conn.open)) conn.send({ type: "input", kind });
        updateSplitButton();
        return;
      }
      splitLocalInput(kind, a, b);
    };
    const splitNetData = handleNetData;
    handleNetData = (d, c) => {
      var _a2;
      if ((d == null ? void 0 : d.type) === "input" && d.kind === "splitArm" && netMode === "host") {
        const f = allFighters()[c == null ? void 0 : c.fighterIndex];
        if ((f == null ? void 0 : f.hasSplitAbility) && ((_a2 = f.splitCharge) != null ? _a2 : 1) >= 0.999) {
          f.splitArmed = true;
        }
        return;
      }
      splitNetData(d, c);
      if ((d == null ? void 0 : d.type) === "prefs" && netMode === "host") {
        c.freezeUnlocked = !!d.freezeUnlocked;
        c.freezeLevel = c.freezeUnlocked ? Math.max(1, Math.min(4, d.freezeLevel || 1)) : 0;
        c.ricochetOwned = !!d.ricochetOwned;
        c.ricochetLevel = c.ricochetOwned ? Math.max(1, Math.min(6, d.ricochetLevel || 1)) : 0;
        c.splitOwned = !!d.splitOwned;
        c.splitLevel = c.splitOwned ? Math.max(1, Math.min(5, d.splitLevel || 1)) : 0;
        const f = allFighters()[c == null ? void 0 : c.fighterIndex];
        if (f) {
          f.hasFreezeAbility = c.freezeUnlocked;
          f.freezeLevel = c.freezeLevel;
          f.hasRicochetAbility = c.ricochetOwned;
          f.ricochetLevel = c.ricochetLevel;
          f.hasSplitAbility = c.splitOwned;
          f.splitLevel = c.splitLevel;
          f.freezeCharge = f.freezeCharge == null ? 1 : f.freezeCharge;
          f.ricochetCharge = f.ricochetCharge == null ? 1 : f.ricochetCharge;
          f.splitCharge = f.splitCharge == null ? 1 : f.splitCharge;
        }
      }
      if ((d == null ? void 0 : d.type) === "welcome" && netMode === "guest" && (conn == null ? void 0 : conn.open)) conn.send({ type: "prefs", color: selectedColor, maxHp: 3 + lifeLevel, coins: playerCoins, skin: netSafeSkin(), rankXP, freezeUnlocked, freezeLevel, ricochetOwned, ricochetLevel, splitOwned, splitLevel });
    };
    const splitSmoothGuest = smoothGuest;
    smoothGuest = (dt) => {
      splitSmoothGuest(dt);
      if (netTarget == null ? void 0 : netTarget.fighters) {
        const fs = allFighters();
        netTarget.fighters.forEach((t, i) => {
          if (fs[i]) {
            for (const k of ["hasSplitAbility", "splitLevel", "splitCharge", "splitArmed"]) if (k in t) fs[i][k] = t[k];
          }
        });
      }
      updateSplitButton();
    };
    const splitSizeSmoothGuest = smoothGuest;
    smoothGuest = (dt) => {
      splitSizeSmoothGuest(dt);
      if (netTarget == null ? void 0 : netTarget.spears) spears.forEach((s, i) => {
        const t = netTarget.spears[i];
        if (t) {
          s.small = t.small;
          s.splitShot = !!t.splitShot;
        }
      });
    };
    const splitSendState = sendState;
    sendState = (t) => {
      splitSendState(t);
    };
    if (splitBuy) splitBuy.onclick = () => {
      if (!freezeUnlocked) return;
      if (!splitOwned) {
        splitOwned = true;
        splitLevel = 1;
      } else if (splitLevel < 5) {
        const cost = splitCosts[splitLevel] || 0;
        if (playerCoins < cost) return;
        playerCoins -= cost;
        splitLevel++;
      }
      saveUpgrades();
      sendLoadout();
      updateUpgradeUI();
    };
    if (splitBtn) splitBtn.onclick = (event) => {
      event.stopPropagation();
      localInput("splitArm");
    };
    const splitPickerRender = renderAbilityPicker;
    renderAbilityPicker = function() {
      splitPickerRender();
      const splitPick = document.querySelector('.abilityPick[data-ability="split"]');
      if (!splitPick || selectedAbility !== "split") return;
      const text = document.querySelector("#splitAbilityText"), button = document.querySelector("#splitAbilityButton");
      document.querySelector("#abilityEyebrow").textContent = "THIRD ABILITY";
      document.querySelector("#abilityName").textContent = "SPLIT";
      document.querySelector("#abilityDescription").textContent = (text == null ? void 0 : text.textContent) || "Your charged next shot splits into smaller shots.";
      abilityAction.textContent = (button == null ? void 0 : button.textContent) || "UPGRADE";
      abilityAction.disabled = !!(button == null ? void 0 : button.disabled);
      unlockRicochet.hidden = true;
    };
    const splitPickerClicks = document.querySelector('.abilityPick[data-ability="split"]');
    if (splitPickerClicks) splitPickerClicks.onclick = () => {
      if (splitPickerClicks.disabled) return;
      selectedAbility = "split";
      renderAbilityPicker();
    };
    const splitAbilityAction = abilityAction.onclick;
    abilityAction.onclick = () => {
      var _a2;
      if (selectedAbility === "split") (_a2 = document.querySelector("#splitAbilityButton")) == null ? void 0 : _a2.click();
      else splitAbilityAction();
    };
    const splitUpdateButtons = updateActionButtons;
    updateActionButtons = () => {
      splitUpdateButtons();
      updateSplitButton();
    };
    const orbitalResetRound = resetRound;
    resetRound = () => {
      orbitalResetRound();
      for (const f of allFighters()) f.portalCooldown = f.blackHoleCooldown = 0;
    };
    function portalBurst(x, y, c = "#8ee9ff") {
      for (let i = 0; i < 15; i++) {
        const a = Math.random() * Math.PI * 2, s = 55 + Math.random() * 160;
        particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0.24 + Math.random() * 0.32, c: i % 2 ? c : "#eef8ff", r: 1 + Math.random() * 3 });
      }
      beep(510, 0.07, "sine", 0.032);
    }
    function useOrbitalPortal(item, isFighter = false) {
      if (selectedArena.key !== "space" || item.portalCooldown > 0 || !portals.length) return false;
      const px = item.x, py = isFighter ? item.y + 20 : item.y;
      const source = portals.find((p) => Math.hypot(px - p.x, py - p.y) < (isFighter ? 42 : 34));
      if (!source) return false;
      const dest = portals[source.link];
      if (!dest) return false;
      item.x = dest.x + dest.nx * (isFighter ? 48 : 34);
      item.y = dest.y + dest.ny * (isFighter ? 48 : 34) - (isFighter ? 20 : 0);
      item.portalCooldown = 0.22;
      if (!isFighter) {
        item.stuck = false;
        item.stuckTo = null;
        item.life = Math.max(item.life, 2.5);
      }
      portalBurst(source.x, source.y);
      portalBurst(dest.x, dest.y);
      return true;
    }
    function drawGate(p) {
      const pulse = 1 + Math.sin(last * 9e-3 + p.x * 0.01) * 0.04;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.scale(2.2 * pulse, 0.42 * pulse);
      ctx.shadowColor = "#79d8ff";
      ctx.shadowBlur = 22;
      const glow = ctx.createRadialGradient(0, 0, 2, 0, 0, 31);
      glow.addColorStop(0, "rgba(11,15,46,.9)");
      glow.addColorStop(0.54, "rgba(60,94,198,.5)");
      glow.addColorStop(0.72, "rgba(133,225,255,.95)");
      glow.addColorStop(1, "rgba(141,219,255,.08)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, 31, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#e8fbff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "#6a7dff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 16, last * 0.01, last * 0.01 + Math.PI * 1.45);
      ctx.stroke();
      ctx.restore();
    }
    function drawBlackHole() {
      const x = W / 2, y = H / 2, spin = last * 18e-4;
      ctx.save();
      for (let ring = 5; ring > 0; ring--) {
        ctx.strokeStyle = `rgba(${110 + ring * 16},${164 + ring * 12},255,${0.06 + ring * 0.035})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, 38 + ring * 27, spin * ring, spin * ring + Math.PI * 1.45);
        ctx.stroke();
      }
      ctx.shadowColor = "#5b75ff";
      ctx.shadowBlur = 34;
      const g = ctx.createRadialGradient(x - 5, y - 5, 2, x, y, 39);
      g.addColorStop(0, "#000");
      g.addColorStop(0.35, "#02030a");
      g.addColorStop(0.57, "#43378e");
      g.addColorStop(0.75, "#8ab8ff");
      g.addColorStop(1, "rgba(88,130,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, 39, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#05050c";
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    function drawOrbitalRim() {
      ctx.save();
      ctx.strokeStyle = "rgba(128,208,255,.8)";
      ctx.shadowColor = "#69baff";
      ctx.shadowBlur = 18;
      ctx.lineWidth = 7;
      ctx.strokeRect(5, 5, W - 10, H - 10);
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(232,249,255,.75)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(10, 10, W - 20, H - 20);
      ctx.restore();
    }
    const orbitalWorld = drawWorld;
    drawWorld = () => {
      orbitalWorld();
      if (selectedArena.key === "orbital3") drawBlackHole();
    };
    const orbitalDraw = draw;
    draw = () => {
      orbitalDraw();
      if (selectedArena.key === "space") {
        ctx.save();
        for (const p of portals) drawGate(p);
        ctx.restore();
      }
      if (selectedArena.key === "orbital3") drawOrbitalRim();
    };
    const orbitalThrow = throwSpear;
    throwSpear = (f) => {
      const before = spears.length;
      orbitalThrow(f);
      if (selectedArena.key === "orbital3" && spears.length > before) {
        for (let i = before; i < spears.length; i++) {
          spears[i].life = 1e9;
          spears[i].orbitalShot = true;
        }
      }
    };
    const orbitalFighterUpdate = updateFighter;
    updateFighter = (f, dt) => {
      const inOrbit = selectedArena.key === "orbital3", before = inOrbit ? { x: f.x, y: f.y, vx: f.vx, vy: f.vy } : null;
      orbitalFighterUpdate(f, dt);
      f.portalCooldown = Math.max(0, (f.portalCooldown || 0) - dt);
      f.blackHoleCooldown = Math.max(0, (f.blackHoleCooldown || 0) - dt);
      if (selectedArena.key === "space") useOrbitalPortal(f, true);
      if (!inOrbit || f.dead) return;
      const left = borderSize + 14, right = W - left, top = borderSize + 44, bottom = H - 20;
      if (before.vx < 0 && f.x <= left + 1 || before.x < left && f.x <= left + 4) {
        f.x = right - 8;
        f.vx = before.vx;
      } else if (before.vx > 0 && f.x >= right - 1 || before.x > right && f.x >= right - 4) {
        f.x = left + 8;
        f.vx = before.vx;
      }
      if (before.vy < 0 && f.y <= top + 1 || before.y < top && f.y <= top + 4) {
        f.y = bottom - 8;
        f.vy = before.vy;
      } else if (before.vy > 0 && f.y >= bottom - 1 || before.y > bottom && f.y >= bottom - 4) {
        f.y = top + 8;
        f.vy = before.vy;
      }
      const dx = W / 2 - f.x, dy = H / 2 - (f.y - 20), d = Math.hypot(dx, dy) || 1, pull = Math.min(330, 3e4 / (d + 70));
      f.vx += dx / d * pull * dt;
      f.vy += dy / d * pull * dt;
      if (d < 31 && f.blackHoleCooldown <= 0) {
        f.blackHoleCooldown = 0.75;
        f.hp--;
        noteLifeLost(f);
        f.blink = 0.8;
        f.stun = 0.2;
        f.vx -= dx / d * 860;
        f.vy -= dy / d * 860;
        f.av += (Math.random() - 0.5) * 10;
        shake = Math.max(shake, 18);
        portalBurst(W / 2, H / 2, "#ad8cff");
        beep(62, 0.2, "sawtooth", 0.065);
        if (f.hp <= 0) {
          markDefeated(f);
          setTimeout(checkVictory, 350);
        }
      }
    };
    const orbitalUpdate = update;
    update = (dt) => {
      const before = new Map(spears.map((s) => [s, { x: s.x, y: s.y, vx: s.vx, vy: s.vy }]));
      orbitalUpdate(dt);
      for (const s of spears) {
        s.portalCooldown = Math.max(0, (s.portalCooldown || 0) - dt);
        if (selectedArena.key === "space" && !s.stuckTo) useOrbitalPortal(s, false);
        if (selectedArena.key !== "orbital3" || s.stuckTo) continue;
        const old = before.get(s);
        if (!old) continue;
        const edge = borderSize + 2;
        if (old.vx < 0 && s.x <= edge + 2 || old.vx > 0 && s.x >= W - edge - 2) {
          s.x = old.vx < 0 ? W - edge - 6 : edge + 6;
          s.vx = old.vx;
          s.vy = old.vy;
          s.stuck = false;
        }
        if (old.vy < 0 && s.y <= edge + 2 || old.vy > 0 && s.y >= H - edge - 2) {
          s.y = old.vy < 0 ? H - edge - 6 : edge + 6;
          s.vx = old.vx;
          s.vy = old.vy;
          s.stuck = false;
        }
        if (!s.stuck) {
          const dx = W / 2 - s.x, dy = H / 2 - s.y, d = Math.hypot(dx, dy) || 1;
          if (d < 24) {
            s.life = 0;
            portalBurst(s.x, s.y, "#ad8cff");
            continue;
          }
          const pull = Math.min(410, 36e3 / (d + 48));
          s.vx += dx / d * pull * dt;
          s.vy += dy / d * pull * dt;
          s.a = Math.atan2(s.vy, s.vx);
        }
      }
    };
    const militaryThrow = throwSpear;
    throwSpear = (f) => {
      if ((f == null ? void 0 : f.skin) === "captain") {
        if (!running || roundWait || f.dead || f.invisibleTime > 0 || !f.hasSpear || f.shieldOut) return;
        const a = faceAngle(f), speed = Math.min(W, H) * 1.25 + 300;
        f.hasSpear = false;
        f.shieldOut = true;
        f.cooldown = 0;
        spears.push({ owner: f, weapon: "shield", x: f.x + Math.cos(a) * 37, y: f.y - 12 + Math.sin(a) * 37, vx: Math.cos(a) * speed + f.vx * 0.35, vy: Math.sin(a) * speed + f.vy * 0.2, a, spinA: a, bouncesLeft: 3, stuck: false, life: 20, returning: false });
        f.vx -= Math.cos(a) * 45;
        f.vy -= Math.sin(a) * 25;
        beep(320, 0.12, "triangle", 0.05);
        return;
      }
      if ((f == null ? void 0 : f.skin) === "army") {
        if (!running || roundWait || f.dead || f.invisibleTime > 0 || f.armyCooldown > 0) return;
        const roll = Math.random(), a = faceAngle(f), speed = Math.min(W, H) * 1.25 + 320;
        let weapon, damage;
        if (roll < 0.45) {
          weapon = "bullet";
          damage = 0.5;
        } else if (roll < 0.7) {
          weapon = "knife";
          damage = 1;
        } else {
          weapon = "mine";
          damage = 1;
        }
        f.armyShotIndex = weapon === "bullet" ? 1 : weapon === "knife" ? 2 : 3;
        f.armyCooldown = 0.28;
        spears.push({ owner: f, weapon, damage, x: f.x + Math.cos(a) * 36, y: f.y - 12 + Math.sin(a) * 36, vx: Math.cos(a) * speed + f.vx * 0.3, vy: Math.sin(a) * speed + f.vy * 0.2, a, spinA: a, bouncesLeft: 0, stuck: false, life: weapon === "mine" ? 16 : 6, mineAge: 0, mineHidden: false });
        beep(weapon === "bullet" ? 640 : weapon === "knife" ? 290 : 95, 0.09, weapon === "mine" ? "square" : "triangle", 0.04);
        return;
      }
      militaryThrow(f);
    };
    const militaryHit = hit;
    hit = (f, s) => {
      if (s.weapon === "mine") return;
      if (f.skin === "captain" && f.shieldOut) {
        const a = faceAngle(f), cx = f.x + Math.cos(a) * 33, cy = f.y - 12 + Math.sin(a) * 33;
        if (Math.hypot(s.x - cx, s.y - cy) < 28) {
          s.stuck = true;
          s.stuckTo = null;
          s.life = 8;
          beep(180, 0.08, "triangle", 0.035);
          return;
        }
      }
      if (s.weapon === "shield") {
        if (f.dead || f.invisibleTime > 0 || s.owner === f) return;
        const hp = f.hp;
        militaryHit(f, s);
        if (s.stuck || s.stuckTo) {
          s.returning = true;
          s.stuck = false;
          s.stuckTo = null;
          s.life = 20;
        }
        if (f.hp === hp) return;
      } else if (s.weapon === "bullet") {
        const hp = f.hp;
        f.hp += 0.5;
        militaryHit(f, s);
        if (f.hp > hp) f.hp = hp;
      } else militaryHit(f, s);
    };
    const militaryUpdateFighter = updateFighter;
    updateFighter = (f, dt) => {
      militaryUpdateFighter(f, dt);
      f.armyCooldown = Math.max(0, (f.armyCooldown || 0) - dt);
      if (f.skin === "captain" && f.shieldOut) {
        f.hasSpear = false;
        f.throwsLeft = 0;
      }
      if (f.skin === "army") {
        f.hasSpear = true;
        f.throwsLeft = 1;
      }
    };
    const militaryUpdate = update;
    update = (dt) => {
      militaryUpdate(dt);
      for (const s of spears) {
        if (s.weapon === "shield" && !s.returning && s.stuck && !s.stuckTo) {
          s.returning = true;
          s.stuck = false;
          s.life = 20;
        }
        if (s.weapon === "shield" && s.returning) {
          const owner = s.owner;
          if (!owner || owner.dead) {
            s.life = 0;
            continue;
          }
          const dx = owner.x - s.x, dy = owner.y - 12 - s.y, d = Math.hypot(dx, dy) || 1;
          s.stuck = false;
          s.stuckTo = null;
          s.vx = dx / d * 930;
          s.vy = dy / d * 930;
          s.a = Math.atan2(s.vy, s.vx);
          if (d < 34) {
            s.life = 0;
            owner.shieldOut = false;
            owner.hasSpear = false;
            owner.throwsLeft = 0;
            owner.cooldown = 0.62;
            beep(420, 0.08, "triangle", 0.04);
          }
        }
        if (s.weapon === "mine" && s.stuck && !s.stuckTo) {
          s.mineAge = (s.mineAge || 0) + dt;
          if (s.mineAge >= 0.5) s.mineHidden = true;
          const owner = s.owner;
          for (const target of allFighters()) {
            if (!target || target === owner || target.dead || target.away) continue;
            if (Math.hypot(target.x - s.x, target.y - 15 - s.y) < 62) {
              const dx = target.x - s.x, dy = target.y - s.y, d = Math.hypot(dx, dy) || 1;
              directDamage(owner, target, dx / d, dy / d, 520, Math.sign(dx || 1) * 8, "#ffd34d");
              for (let i = 0; i < 28; i++) particles.push({ x: s.x, y: s.y, vx: (Math.random() - 0.5) * 360, vy: -80 - Math.random() * 340, life: 0.4 + Math.random() * 0.45, c: i % 2 ? "#ffd34d" : "#fff0a3", r: 2 + Math.random() * 4 });
              s.life = 0;
              beep(78, 0.2, "square", 0.07);
              break;
            }
          }
        }
      }
    };
    const militaryDrawSpear = drawSpear;
    drawSpear = (s) => {
      if (s.weapon === "shield") {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.a);
        ctx.shadowColor = "#78baff";
        ctx.shadowBlur = 12;
        ctx.fillStyle = "#2e65cb";
        ctx.strokeStyle = "#e6f3ff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 23, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#e53f3f";
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return;
      }
      if (s.weapon === "bullet") {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.a);
        ctx.fillStyle = "#ffe07a";
        ctx.shadowColor = "#ffcc4a";
        ctx.shadowBlur = 8;
        ctx.fillRect(-8, -3, 16, 6);
        ctx.restore();
        return;
      }
      if (s.weapon === "knife") {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.a);
        ctx.fillStyle = "#cbd5dc";
        ctx.strokeStyle = "#27313a";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-18, 0);
        ctx.lineTo(14, -6);
        ctx.lineTo(22, 0);
        ctx.lineTo(14, 6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        return;
      }
      if (s.weapon === "mine" && s.mineHidden && s.owner !== localFighter()) return;
      if (s.weapon === "mine") {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.fillStyle = "#303638";
        ctx.strokeStyle = "#ffd34d";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        for (let i = 0; i < 8; i++) {
          const a = i * Math.PI / 4;
          line(Math.cos(a) * 9, Math.sin(a) * 9, Math.cos(a) * 15, Math.sin(a) * 15, 2, "#ffd34d");
        }
        ctx.restore();
        return;
      }
      militaryDrawSpear(s);
    };
    const militaryDrawFighter = drawFighter;
    drawFighter = (f) => {
      if (f.skin !== "captain" && f.skin !== "army") {
        militaryDrawFighter(f);
        return;
      }
      const held = f.hasSpear;
      f.hasSpear = false;
      militaryDrawFighter(f);
      f.hasSpear = held;
      const rot = f.angle - (f.side === "player" ? 0 : Math.PI), aim = faceAngle(f) - rot;
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(rot);
      if (f.skin === "captain") {
        ctx.strokeStyle = "#eaf4ff";
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.lineTo(0, 10);
        ctx.stroke();
        ctx.fillStyle = "#2e65cb";
        ctx.strokeStyle = "#eaf4ff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(Math.cos(aim) * 33, -12 + Math.sin(aim) * 33, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(Math.cos(aim) * 33, -12 + Math.sin(aim) * 33, 16, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#e53f3f";
        ctx.beginPath();
        ctx.arc(Math.cos(aim) * 33, -12 + Math.sin(aim) * 33, 8, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = "#657a4e";
        ctx.fillRect(-12, -45, 24, 15);
        ctx.fillStyle = "#273326";
        ctx.fillRect(-14, -19, 28, 29);
        ctx.fillStyle = "#d6b27a";
        ctx.fillRect(-8, -53, 16, 5);
        line(-18, -43, 18, -43, 4, "#273326");
        const ga = aim;
        ctx.save();
        ctx.translate(Math.cos(ga) * 18, -12 + Math.sin(ga) * 18);
        ctx.rotate(ga);
        ctx.fillStyle = "#273326";
        ctx.fillRect(-2, -4, 20, 8);
        ctx.fillStyle = "#bdc9cf";
        ctx.fillRect(15, -3, 8, 6);
        ctx.restore();
        ctx.save();
        ctx.translate(-25, 1);
        ctx.rotate(-0.35);
        ctx.fillStyle = "#cbd5dc";
        ctx.strokeStyle = "#27313a";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-3, 0);
        ctx.lineTo(26, -5);
        ctx.lineTo(32, 0);
        ctx.lineTo(26, 5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();
    };
    const militarySmoothGuest = smoothGuest;
    smoothGuest = (dt) => {
      militarySmoothGuest(dt);
      if (netTarget == null ? void 0 : netTarget.spears) spears.forEach((s, i) => {
        const t = netTarget.spears[i];
        if (t) {
          s.mineHidden = !!t.mineHidden;
          s.mineAge = t.mineAge || s.mineAge || 0;
        }
      });
    };
    const moonRoundReset = resetRound;
    resetRound = () => {
      moonRoundReset();
      moonAsteroids = [];
      moonAsteroidTimer = selectedArena.key === "moon" ? 2.5 + Math.random() * 2 : 0;
    };
    function moonDamage(f, x, y, pushX = 0, pushY = -420) {
      if (f.dead || f.away) return;
      f.hp--;
      noteLifeLost(f);
      f.blink = 0.75;
      f.stun = 0.28;
      f.vx += pushX;
      f.vy += pushY;
      f.av += (Math.random() - 0.5) * 8;
      shake = Math.max(shake, 15);
      for (let i = 0; i < 24; i++) particles.push({ x, y, vx: (Math.random() - 0.5) * 340, vy: (Math.random() - 0.5) * 310, life: 0.35 + Math.random() * 0.45, c: i % 2 ? "#d8e9ef" : "#98abbc", r: 2 + Math.random() * 4 });
      beep(82, 0.18, "square", 0.06);
      if (f.hp <= 0) {
        markDefeated(f);
        setTimeout(checkVictory, 350);
      }
    }
    const moonFighterUpdate = updateFighter;
    updateFighter = (f, dt) => {
      const wasMoon = selectedArena.key === "moon", oldGravity = selectedArena.gravity;
      if (wasMoon) selectedArena.gravity = f.y < H * 0.5 ? -0.64 : 1.08;
      moonFighterUpdate(f, dt);
      selectedArena.gravity = oldGravity;
    };
    const moonWorldDraw = drawWorld;
    drawWorld = () => {
      moonWorldDraw();
      if (selectedArena.key === "road") {
        ctx.save();
        ctx.fillStyle = "#283039";
        ctx.fillRect(0, ground - 11, W, H - ground + 11);
        ctx.strokeStyle = "rgba(255,222,117,.78)";
        ctx.lineWidth = 4;
        ctx.setLineDash([32, 26]);
        ctx.beginPath();
        ctx.moveTo(0, ground + 34);
        ctx.lineTo(W, ground + 34);
        ctx.stroke();
        ctx.setLineDash([]);
        for (const side of [0, W - 142]) {
          ctx.fillStyle = "#272b35";
          ctx.fillRect(side, 0, 142, ground + 8);
          ctx.fillStyle = "#10131a";
          ctx.beginPath();
          ctx.arc(side + (side ? 0 : 142), ground - 4, 104, side ? Math.PI / 2 : Math.PI * 1.5, side ? Math.PI * 1.5 : Math.PI / 2);
          ctx.fill();
          ctx.strokeStyle = "#8994a1";
          ctx.lineWidth = 8;
          ctx.beginPath();
          ctx.arc(side + (side ? 0 : 142), ground - 4, 104, side ? Math.PI / 2 : Math.PI * 1.5, side ? Math.PI * 1.5 : Math.PI / 2);
          ctx.stroke();
        }
        ctx.restore();
      }
      if (selectedArena.key === "moon") {
        const earth = ctx.createRadialGradient(W * 0.5, ground + H * 0.38, H * 0.08, W * 0.5, ground + H * 0.38, H * 0.9);
        earth.addColorStop(0, "#59b5db");
        earth.addColorStop(0.48, "#237bb9");
        earth.addColorStop(0.7, "#1f8b5a");
        earth.addColorStop(1, "#0d3e74");
        selectedArena.land = earth;
        ctx.save();
        ctx.fillStyle = "#cbd0d5";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(W, 0);
        ctx.lineTo(W, 55);
        for (let x = W; x >= 0; x -= 36) ctx.lineTo(x, 54 + Math.sin(x * 0.035) * 8);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgba(89,96,110,.42)";
        for (let i = 0; i < 17; i++) {
          const x = i * 107 % W, y = 19 + i % 4 * 9;
          ctx.beginPath();
          ctx.ellipse(x, y, 11 + i % 3 * 5, 4 + i % 2 * 3, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    };
    const moonPlatformDraw = drawPlatform;
    drawPlatform = (p) => {
      var _a2, _b2;
      if (p.type !== "car") return moonPlatformDraw(p);
      ctx.save();
      ctx.fillStyle = "#17191e";
      ctx.fillRect(p.x - 4, p.y - 5, p.w + 8, p.h + 10);
      ctx.fillStyle = ((_a2 = p.move) == null ? void 0 : _a2.dir) > 0 ? "#e7553d" : "#4a86d9";
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = "#a9d9ef";
      ctx.fillRect(p.x + p.w * 0.28, p.y + 7, p.w * 0.42, 12);
      ctx.fillStyle = "#1b1d21";
      for (const x of [p.x + 24, p.x + p.w - 24]) {
        ctx.beginPath();
        ctx.arc(x, p.y + p.h + 4, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#d3d8da";
        ctx.beginPath();
        ctx.arc(x, p.y + p.h + 4, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#1b1d21";
      }
      ctx.fillStyle = "#fff1a2";
      ctx.fillRect(((_b2 = p.move) == null ? void 0 : _b2.dir) > 0 ? p.x + p.w - 7 : p.x, p.y + 12, 7, 9);
      ctx.restore();
    };
    const moonHazardUpdate = update;
    update = (dt) => {
      moonHazardUpdate(dt);
      if (selectedArena.key !== "moon" || roundWait || !running || netMode === "guest") return;
      moonAsteroidTimer -= dt;
      if (moonAsteroidTimer <= 0) {
        const impact = Math.random() < 0.34;
        if (impact) moonAsteroids.push({ impact: true, x: W * (0.16 + Math.random() * 0.68), y: -35, vx: (Math.random() - 0.5) * 55, vy: 470 + Math.random() * 150, r: 18 + Math.random() * 13, life: 4 });
        else {
          const right = Math.random() < 0.5;
          moonAsteroids.push({ impact: false, x: right ? W + 45 : -45, y: 105 + Math.random() * (H * 0.58), vx: right ? -(380 + Math.random() * 160) : 380 + Math.random() * 160, vy: -35 + Math.random() * 70, r: 16 + Math.random() * 12, life: 5 });
        }
        moonAsteroidTimer = 2.55 + Math.random() * 3.45;
      }
      for (const a of moonAsteroids) {
        const ox = a.x, oy = a.y;
        a.x += a.vx * dt;
        a.y += a.vy * dt;
        a.life -= dt;
        if (a.impact && a.y >= 58) {
          a.life = 0;
          for (let i = 0; i < 38; i++) particles.push({ x: a.x, y: 58, vx: (Math.random() - 0.5) * 360, vy: Math.random() * 260, life: 0.45 + Math.random() * 0.55, c: i % 2 ? "#d8d5c9" : "#898d96", r: 2 + Math.random() * 5 });
          for (const f of allFighters()) if (!f.dead && !f.away && f.y < 155) moonDamage(f, a.x, 58, (f.x - a.x) * 2, 260);
          beep(58, 0.25, "sawtooth", 0.075);
          continue;
        }
        if (!a.impact) {
          for (const f of allFighters()) if (!f.dead && !f.away && bodyHit(f, ox, oy, a.x, a.y)) {
            moonDamage(f, a.x, a.y, Math.sign(a.vx) * 280, -150);
            a.life = 0;
            break;
          }
        }
      }
      moonAsteroids = moonAsteroids.filter((a) => a.life > 0 && a.x > -90 && a.x < W + 90 && a.y < H + 90);
    };
    const moonFinalDraw = draw;
    draw = () => {
      moonFinalDraw();
      if (selectedArena.key === "road") {
        ctx.save();
        ctx.strokeStyle = "rgba(255,222,117,.8)";
        ctx.lineWidth = 4;
        ctx.setLineDash([32, 26]);
        ctx.beginPath();
        ctx.moveTo(0, ground + 34);
        ctx.lineTo(W, ground + 34);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }
      if (selectedArena.key === "moon") {
        ctx.save();
        for (const a of moonAsteroids) {
          ctx.translate(a.x, a.y);
          ctx.rotate(Math.atan2(a.vy, a.vx));
          ctx.fillStyle = "#777d88";
          ctx.strokeStyle = "#d9e1e8";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, a.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#4c515a";
          ctx.beginPath();
          ctx.arc(-a.r * 0.25, -a.r * 0.2, a.r * 0.23, 0, Math.PI * 2);
          ctx.arc(a.r * 0.27, a.r * 0.2, a.r * 0.16, 0, Math.PI * 2);
          ctx.fill();
          ctx.rotate(-Math.atan2(a.vy, a.vx));
          ctx.translate(-a.x, -a.y);
        }
        ctx.restore();
      }
    };
    let earthGlanceTimer = 5;
    const glanceResetRound = resetRound;
    resetRound = () => {
      glanceResetRound();
      earthGlanceTimer = 4 + Math.random() * 3;
    };
    const glanceUpdate = update;
    update = (dt) => {
      glanceUpdate(dt);
      if (selectedArena.key !== "moon" || roundWait || !running || netMode === "guest") return;
      earthGlanceTimer -= dt;
      if (earthGlanceTimer <= 0) {
        const fromRight = Math.random() < 0.5;
        moonAsteroids.push({ impact: false, glance: true, glanced: false, x: fromRight ? W + 45 : -45, y: -28, vx: fromRight ? -(270 + Math.random() * 90) : 270 + Math.random() * 90, vy: 190 + Math.random() * 80, r: 17 + Math.random() * 9, life: 8 });
        earthGlanceTimer = 6 + Math.random() * 5;
      }
      for (const a of moonAsteroids) if (a.glance && !a.glanced && a.y > ground - 125) {
        a.glanced = true;
        a.vy = -Math.abs(a.vy) * 0.72;
        a.vx *= 1.12;
        for (let i = 0; i < 15; i++) particles.push({ x: a.x, y: a.y, vx: (Math.random() - 0.5) * 180, vy: -Math.random() * 180, life: 0.25 + Math.random() * 0.25, c: "#a8c8ef", r: 1 + Math.random() * 3 });
      }
    };
    function doorTriples(source) {
      if (!source || source.doorTripled) return;
      source.doorTripled = true;
      const base = source.a, speed = Math.hypot(source.vx, source.vy) || 620;
      for (const offset of [-0.18, 0.18]) {
        const a = base + offset;
        spears.push(__spreadProps(__spreadValues({}, source), { x: source.x + Math.cos(a) * 8, y: source.y + Math.sin(a) * 8, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, a, spinA: a, stuck: false, stuckTo: null, life: Math.max(1.5, source.life), doorTripled: true }));
      }
      beep(730, 0.08, "triangle", 0.04);
    }
    function applyDoorToFighter(f, d) {
      const dir = Math.sign(f.vx) || Math.cos(faceAngle(f)) || 1;
      if (d.type === "boost" || d.type === "fast") {
        f.doorBoost = 1;
        f.vx += dir * 260;
        f.vy -= 70;
      } else if (d.type === "heavy") {
        f.doorHeavy = 1;
        f.vx *= 0.42;
        f.vy *= 0.45;
      } else if (d.type === "triple") f.doorTriple = 1;
      else if (d.type === "drain") {
        f.hasSpear = false;
        f.throwsLeft = 0;
        f.cooldown = Math.max(f.cooldown, 1.05);
      }
      f.doorCooldown = 0.45;
      portalBurst(d.x + d.w / 2, d.y + 52, d.type === "heavy" ? "#bd9cff" : "#bafffb");
    }
    const doorsFighterUpdate = updateFighter;
    updateFighter = (f, dt) => {
      doorsFighterUpdate(f, dt);
      f.doorCooldown = Math.max(0, (f.doorCooldown || 0) - dt);
      f.doorBoost = Math.max(0, (f.doorBoost || 0) - dt);
      f.doorHeavy = Math.max(0, (f.doorHeavy || 0) - dt);
      if (f.doorBoost > 0) f.vx += (Math.sign(f.vx) || 1) * 110 * dt;
      if (f.doorHeavy > 0) {
        f.vx *= Math.pow(0.89, dt * 60);
        f.vy += 100 * dt;
      }
      if (selectedArena.key === "doors" && !f.dead && !f.away && f.doorCooldown <= 0) {
        const d = doors.find((q) => f.x > q.x - 16 && f.x < q.x + q.w + 16 && f.y + 20 > q.y && f.y - 44 < q.y + q.h);
        if (d) applyDoorToFighter(f, d);
      }
    };
    const flubberThrow = throwSpear;
    throwSpear = (f) => {
      if ((f == null ? void 0 : f.skin) !== "flubber") return flubberThrow(f);
      if (!running || roundWait || f.dead || f.invisibleTime > 0 || !f.hasSpear) return;
      const a = faceAngle(f), speed = Math.min(W, H) * 1.45 + 360;
      f.throwsLeft = Math.max(0, f.throwsLeft - 1);
      f.hasSpear = f.throwsLeft > 0;
      f.cooldown = f.hasSpear ? 0 : 1.25;
      spears.push({ owner: f, weapon: "flubberArm", x: f.x + Math.cos(a) * 25, y: f.y - 14 + Math.sin(a) * 25, vx: Math.cos(a) * speed + f.vx * 0.25, vy: Math.sin(a) * speed + f.vy * 0.1, straightVy: Math.sin(a) * speed + f.vy * 0.1, a, spinA: a, stuck: false, life: 0.9 });
      beep(250, 0.1, "sine", 0.05);
    };
    const flubberHit = hit;
    hit = (f, s) => {
      var _a2;
      if (s.weapon !== "flubberArm") return flubberHit(f, s);
      if (f.dead || f.invisibleTime > 0 || s.owner === f || s.stuck) return;
      const hp = f.hp;
      f.hp += 0.5;
      flubberHit(f, s);
      if (f.hp > hp) f.hp = hp;
      if (!s.stuckTo) return;
      s.grabTime = 0.55;
      s.life = 0.65;
      f.vy = Math.max(f.vy, 780);
      f.av += (Math.random() - 0.5) * 4;
      const owner = s.owner;
      if ((owner == null ? void 0 : owner.freezeArmed) && owner.hasFreezeAbility && ((_a2 = owner.freezeCharge) != null ? _a2 : 1) >= 0.999) {
        freezeFighter(f, owner, s);
        owner.freezeArmed = false;
        owner.freezeCharge = 0;
      }
      const other = spears.find((q) => q !== s && q.weapon === "flubberArm" && q.owner === owner && q.stuckTo === f);
      if (other && !s.doubleSlam) {
        s.doubleSlam = true;
        f.hp -= 1.5;
        f.vy = Math.max(f.vy, 1180);
        f.stun = 0.6;
        shake = Math.max(shake, 19);
        for (let i = 0; i < 25; i++) particles.push({ x: f.x, y: f.y - 8, vx: (Math.random() - 0.5) * 400, vy: 80 + Math.random() * 340, life: 0.35 + Math.random() * 0.4, c: owner.color || "#65df58", r: 2 + Math.random() * 3 });
        if (f.hp <= 0) {
          markDefeated(f);
          setTimeout(checkVictory, 350);
        }
      }
    };
    const flubberFighterUpdate = updateFighter;
    updateFighter = (f, dt) => {
      flubberFighterUpdate(f, dt);
      f.flubberBounceLock = Math.max(0, (f.flubberBounceLock || 0) - dt);
      if (f.skin === "flubber" && f.onGround && f.vy >= -5 && f.flubberBounceLock <= 0) {
        f.vy = -430;
        f.onGround = false;
        f.flubberBounceLock = 0.12;
        f.av += (Math.random() - 0.5) * 3;
      }
    };
    const flubberUpdate = update;
    update = (dt) => {
      flubberUpdate(dt);
      for (const s of spears) if (s.weapon === "flubberArm" && !s.stuck && !s.stuckTo) s.vy = s.straightVy;
      for (const s of spears) if (selectedArena.key === "doors" && !s.stuck && !s.stuckTo) {
        s.doorCooldown = Math.max(0, (s.doorCooldown || 0) - dt);
        if (s.doorCooldown > 0) continue;
        const d = doors.find((q) => s.x > q.x - 5 && s.x < q.x + q.w + 5 && s.y > q.y && s.y < q.y + q.h);
        if (!d) continue;
        if (d.type === "drain") s.life = 0;
        else if (d.type === "triple") doorTriples(s);
        else {
          const mult = d.type === "heavy" ? 0.52 : 1.75;
          s.vx *= mult;
          s.vy *= mult;
        }
        s.doorCooldown = 0.3;
      }
    };
    const doorsThrow = throwSpear;
    throwSpear = (f) => {
      const before = spears.length, armed = !!(f == null ? void 0 : f.doorTriple);
      doorsThrow(f);
      if (armed && spears.length > before) {
        doorTriples(spears[before]);
        f.doorTriple = 0;
      }
    };
    const flubberDrawSpear = drawSpear;
    drawSpear = (s) => {
      var _a2, _b2;
      if (s.weapon !== "flubberArm") return flubberDrawSpear(s);
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.a);
      ctx.strokeStyle = ((_a2 = s.owner) == null ? void 0 : _a2.color) || "#65df58";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-25, 0);
      ctx.lineTo(8, 0);
      ctx.stroke();
      ctx.fillStyle = ((_b2 = s.owner) == null ? void 0 : _b2.color) || "#65df58";
      ctx.beginPath();
      ctx.arc(13, 0, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    const flubberDrawFighter = drawFighter;
    drawFighter = (f) => {
      if (f.skin !== "flubber") return flubberDrawFighter(f);
      const c = f.color || "#65df58", a = faceAngle(f), bob = Math.sin(f.wobble) * 3;
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.scale(0.72, 0.72);
      ctx.fillStyle = "rgba(18,26,18,.15)";
      ctx.beginPath();
      ctx.ellipse(0, 35, 31, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = c;
      ctx.shadowBlur = 13;
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.moveTo(-29, 22);
      ctx.bezierCurveTo(-38, 2, -23, -22, 0, -27);
      ctx.bezierCurveTo(25, -25, 38, -2, 29, 23);
      ctx.quadraticCurveTo(15, 34 + bob, -1, 27);
      ctx.quadraticCurveTo(-18, 35 - bob, -29, 22);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = c;
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(side * 13, -5);
        ctx.lineTo(Math.cos(a) * 35 + side * 4, Math.sin(a) * 35 - 7);
        ctx.stroke();
      }
      ctx.fillStyle = "#263a22";
      ctx.beginPath();
      ctx.arc(-7, -8, 3, 0, Math.PI * 2);
      ctx.arc(7, -8, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      for (let i = 0; i < f.hp; i++) {
        ctx.fillStyle = c;
        ctx.fillRect(f.x - (f.maxHp * 14 - 4) / 2 + i * 14, f.y - 61, 10, 4);
      }
    };
    const doorsDraw = draw;
    draw = () => {
      doorsDraw();
      if (selectedArena.key !== "doors") return;
      ctx.save();
      for (const d of doors) {
        const col = d.type === "heavy" ? "#bd9cff" : d.type === "drain" ? "#ff6b7d" : d.type === "triple" ? "#ffe56e" : "#79f4eb";
        ctx.fillStyle = col + "33";
        ctx.strokeStyle = col;
        ctx.shadowColor = col;
        ctx.shadowBlur = 12;
        ctx.lineWidth = 3;
        ctx.fillRect(d.x, d.y, d.w, d.h);
        ctx.strokeRect(d.x, d.y, d.w, d.h);
        ctx.shadowBlur = 0;
        ctx.fillStyle = col;
        ctx.font = "bold 15px DM Mono";
        ctx.textAlign = "center";
        ctx.fillText(d.type === "boost" ? "\u2191" : d.type === "heavy" ? "\u2193" : d.type === "fast" ? "\xBB" : d.type === "triple" ? "\xD73" : "\xD7", d.x + d.w / 2, d.y + d.h / 2 + 5);
      }
      ctx.restore();
    };
    (() => {
      const splitUnlockCost = 700;
      let equippedAbility = "none", splitPurchased = false;
      const sourceFor = (id) => ({ freeze: { text: "#freezeAbilityText", button: "#freezeUpgradeButton", eyebrow: "SECRET ABILITY", name: "FREEZE ARROW" }, ricochet: { text: "#ricochetAbilityText", button: "#ricochetAbilityButton", eyebrow: "SECOND ABILITY", name: "RICOCHET" }, split: { text: "#splitAbilityText", button: "#splitAbilityButton", eyebrow: "THIRD ABILITY", name: "SPLIT" } })[id];
      const owns = (id) => id === "freeze" ? freezeUnlocked : id === "ricochet" ? ricochetOwned : id === "split" ? splitOwned : false;
      const valid = (id) => ["freeze", "ricochet", "split"].includes(id) && owns(id);
      function normalizeEquipped() {
        if (!valid(equippedAbility)) equippedAbility = freezeUnlocked ? "freeze" : "none";
      }
      function setAbilityFlags(f, choice, store) {
        if (!f) return;
        const freeze = store ? !!store.freezeUnlocked : freezeUnlocked;
        const rico = store ? !!store.ricochetOwned : ricochetOwned;
        const split = store ? !!store.splitOwned : splitOwned;
        const selected = (store == null ? void 0 : store.equippedAbility) || choice;
        f.hasFreezeAbility = selected === "freeze" && freeze;
        f.freezeLevel = f.hasFreezeAbility ? (store == null ? void 0 : store.freezeLevel) || freezeLevel || 1 : 0;
        f.hasRicochetAbility = selected === "ricochet" && rico;
        f.ricochetLevel = f.hasRicochetAbility ? (store == null ? void 0 : store.ricochetLevel) || ricochetLevel || 1 : 0;
        f.hasSplitAbility = selected === "split" && split;
        f.splitLevel = f.hasSplitAbility ? (store == null ? void 0 : store.splitLevel) || splitLevel || 1 : 0;
        f.freezeCharge = f.freezeCharge == null ? 1 : f.freezeCharge;
        f.ricochetCharge = f.ricochetCharge == null ? 1 : f.ricochetCharge;
        f.splitCharge = f.splitCharge == null ? 1 : f.splitCharge;
      }
      function renderSplitShop() {
        if (!splitText || !splitBuy) return;
        if (!freezeUnlocked) {
          splitText.textContent = "Unlock Freeze Arrow first to reveal Split.";
          splitBuy.textContent = "LOCKED";
          splitBuy.disabled = true;
          return;
        }
        if (!splitOwned) {
          splitText.textContent = "Your charged next shot splits into 2 smaller shots.";
          splitBuy.textContent = "BUY - 700 COINS";
          splitBuy.disabled = playerCoins < splitUnlockCost;
          return;
        }
        const stat = splitStats(splitLevel), maxed = splitLevel >= 5, cost = splitCosts[splitLevel] || 0;
        splitText.textContent = "Your charged next shot splits into " + stat.count + " smaller shots. Reload: " + stat.cooldown + " seconds.";
        splitBuy.textContent = maxed ? "MAXIMUM SPLIT" : "UPGRADE - " + cost + " COINS";
        splitBuy.disabled = maxed || playerCoins < cost;
      }
      renderSplitAbility = renderSplitShop;
      if (splitBuy) splitBuy.onclick = () => {
        if (!freezeUnlocked) return;
        if (!splitOwned) {
          if (playerCoins < splitUnlockCost) return;
          playerCoins -= splitUnlockCost;
          splitOwned = true;
          splitPurchased = true;
          splitLevel = 1;
        } else if (splitLevel < 5) {
          const cost = splitCosts[splitLevel] || 0;
          if (playerCoins < cost) return;
          playerCoins -= cost;
          splitLevel++;
        }
        selectedAbility = "split";
        equippedAbility = "split";
        saveUpgrades();
        sendLoadout();
        updateUpgradeUI();
      };
      const abilitySaveUpgrades = saveUpgrades;
      saveUpgrades = () => {
        abilitySaveUpgrades();
        try {
          const data = JSON.parse(localStorage.getItem("loosePointUpgrades") || "{}");
          data.equippedAbility = equippedAbility;
          data.splitPurchased = splitPurchased;
          localStorage.setItem("loosePointUpgrades", JSON.stringify(data));
        } catch (_) {
        }
      };
      const abilityLoadUpgrades = loadUpgrades;
      loadUpgrades = () => {
        abilityLoadUpgrades();
        try {
          const data = JSON.parse(localStorage.getItem("loosePointUpgrades") || "{}");
          splitPurchased = !!data.splitPurchased;
          if (!splitPurchased) {
            splitOwned = false;
            splitLevel = 0;
          }
          equippedAbility = typeof data.equippedAbility === "string" ? data.equippedAbility : "freeze";
        } catch (_) {
          equippedAbility = "freeze";
        }
        normalizeEquipped();
        selectedAbility = equippedAbility === "none" ? "freeze" : equippedAbility;
        renderAbilityPicker();
      };
      function chooseAbility(id) {
        selectedAbility = id;
        if (valid(id)) {
          equippedAbility = id;
          saveUpgrades();
          sendLoadout();
        }
        renderAbilityPicker();
      }
      function useAbilityCard(id) {
        selectedAbility = id;
        const source = sourceFor(id), button = document.querySelector(source.button);
        if (!button || button.disabled || button.hidden) return;
        button.click();
        if (valid(id)) {
          equippedAbility = id;
          saveUpgrades();
          sendLoadout();
        }
        renderAbilityPicker();
      }
      renderAbilityPicker = () => {
        renderFreezeAbility();
        renderRicochetAbility();
        renderSplitShop();
        normalizeEquipped();
        for (const id of ["freeze", "ricochet", "split"]) {
          const source = sourceFor(id), pick = document.querySelector('.abilityPick[data-ability="' + id + '"]'), action = document.querySelector('.abilityCardAction[data-ability-action="' + id + '"]'), text = document.querySelector(source.text), button = document.querySelector(source.button);
          if (!pick || !action || !text || !button) continue;
          const owned = owns(id);
          pick.disabled = false;
          pick.classList.toggle("locked", !owned);
          pick.classList.toggle("selected", equippedAbility === id);
          const lock = pick.querySelector("em");
          if (lock) lock.hidden = owned;
          action.textContent = button.textContent;
          action.disabled = button.disabled || button.hidden;
          action.onclick = () => useAbilityCard(id);
        }
        const current = sourceFor(selectedAbility) || sourceFor(equippedAbility) || sourceFor("freeze");
        document.querySelector("#abilityEyebrow").textContent = current.eyebrow;
        document.querySelector("#abilityName").textContent = current.name;
        document.querySelector("#abilityDescription").textContent = document.querySelector(current.text).textContent;
      };
      document.querySelectorAll(".abilityPick").forEach((pick) => pick.onclick = () => chooseAbility(pick.dataset.ability));
      const abilityUpdateUI = updateUpgradeUI;
      updateUpgradeUI = () => {
        abilityUpdateUI();
        renderAbilityPicker();
      };
      const abilitySendLoadout = sendLoadout;
      sendLoadout = () => {
        normalizeEquipped();
        abilitySendLoadout();
        setAbilityFlags(localFighter(), equippedAbility);
        if (netMode === "guest" && (conn == null ? void 0 : conn.open)) conn.send({ type: "prefs", freezeUnlocked, freezeLevel, ricochetOwned, ricochetLevel, splitOwned, splitLevel, equippedAbility });
      };
      const abilityResetRound = resetRound;
      resetRound = () => {
        abilityResetRound();
        normalizeEquipped();
        setAbilityFlags(localFighter(), equippedAbility);
        if (netMode === "host") for (const client of clients) {
          const fighter2 = allFighters()[client == null ? void 0 : client.fighterIndex];
          if (fighter2) setAbilityFlags(fighter2, (client == null ? void 0 : client.equippedAbility) || "freeze", client);
        }
        updateFreezeButton();
        updateRicochetButton();
        updateSplitButton();
      };
      const abilityNetData = handleNetData;
      handleNetData = (data, client) => {
        abilityNetData(data, client);
        if ((data == null ? void 0 : data.type) === "prefs" && netMode === "host" && client) {
          const wanted = typeof data.equippedAbility === "string" ? data.equippedAbility : "freeze";
          client.equippedAbility = wanted === "freeze" && client.freezeUnlocked || wanted === "ricochet" && client.ricochetOwned || wanted === "split" && client.splitOwned ? wanted : client.freezeUnlocked ? "freeze" : "none";
          setAbilityFlags(allFighters()[client.fighterIndex], client.equippedAbility, client);
        }
      };
      renderAbilityPicker();
    })();
    const tunnelWorldDraw = drawWorld;
    drawWorld = () => {
      tunnelWorldDraw();
      if (selectedArena.key !== "road") return;
      ctx.save();
      ctx.strokeStyle = "rgba(241,215,118,.82)";
      ctx.shadowColor = "#f7df85";
      ctx.shadowBlur = 7;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 86);
      ctx.lineTo(W, 86);
      ctx.stroke();
      ctx.restore();
    };
    const tunnelPlatformDraw = drawPlatform;
    drawPlatform = (p) => {
      var _a2, _b2, _c2;
      if (selectedArena.key !== "road" || p.type !== "car") return tunnelPlatformDraw(p);
      const body = ((_a2 = p.move) == null ? void 0 : _a2.dir) > 0 ? "#d65742" : "#3674bd", roof = "#e7c966", wireY = 86, cx = p.x + p.w * 0.5;
      ctx.save();
      ctx.fillStyle = "#10141d";
      ctx.fillRect(p.x - 5, p.y - 7, p.w + 10, p.h + 15);
      ctx.fillStyle = body;
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = roof;
      ctx.fillRect(p.x + 7, p.y - 8, p.w - 14, 7);
      ctx.fillStyle = "#bfeaff";
      for (let x = p.x + 13; x < p.x + p.w - 18; x += 31) ctx.fillRect(x, p.y + 7, 19, 12);
      ctx.strokeStyle = "#e7c96c";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, p.y - 8);
      ctx.lineTo(cx + (((_b2 = p.move) == null ? void 0 : _b2.dir) || 1) * 13, wireY);
      ctx.stroke();
      ctx.fillStyle = "#1b202b";
      for (const x of [p.x + 25, p.x + p.w - 25]) {
        ctx.beginPath();
        ctx.arc(x, p.y + p.h + 7, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#d8dfe5";
        ctx.beginPath();
        ctx.arc(x, p.y + p.h + 7, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#1b202b";
      }
      ctx.fillStyle = "#fff1a2";
      ctx.fillRect(((_c2 = p.move) == null ? void 0 : _c2.dir) > 0 ? p.x + p.w - 7 : p.x, p.y + 12, 7, 9);
      ctx.restore();
    };
    const tunnelFighterUpdate = updateFighter;
    updateFighter = (f, dt) => {
      tunnelFighterUpdate(f, dt);
      if (selectedArena.key === "road" && f.skin === "spaceman" && !f.dead && !f.wallStuck) {
        f.vy += 725 * dt;
      }
    };
    function roadShock(f) {
      if (f.dead || f.away || (f.roadShock || 0) > 0) return;
      f.roadShock = 0.52;
      f.hp--;
      noteLifeLost(f);
      f.blink = 0.7;
      f.stun = 0.24;
      f.y = ground - 50;
      f.vy = -760;
      f.vx += (Math.random() - 0.5) * 180;
      f.av += (Math.random() - 0.5) * 9;
      f.onGround = false;
      shake = Math.max(shake, 16);
      for (let i = 0; i < 28; i++) particles.push({ x: f.x, y: ground - 3, vx: (Math.random() - 0.5) * 340, vy: -90 - Math.random() * 340, life: 0.32 + Math.random() * 0.42, c: i % 2 ? "#ffc950" : "#ff6a36", r: 2 + Math.random() * 4 });
      beep(74, 0.22, "square", 0.07);
      if (f.hp <= 0) {
        markDefeated(f);
        setTimeout(checkVictory, 350);
      }
    }
    const tunnelUpdate = update;
    update = (dt) => {
      tunnelUpdate(dt);
      for (const f of allFighters()) {
        f.roadShock = Math.max(0, (f.roadShock || 0) - dt);
        if (selectedArena.key === "road" && netMode !== "guest" && !roundWait && f.y >= ground - 44) roadShock(f);
      }
    };
    const orbitalBrakeUpdate = updateFighter;
    updateFighter = (f, dt) => {
      const oldX = f.x, oldY = f.y;
      orbitalBrakeUpdate(f, dt);
      if (selectedArena.key !== "orbital3" || f.dead) return;
      const warped = Math.abs(f.x - oldX) > W * 0.42 || Math.abs(f.y - oldY) > H * 0.42;
      if (warped) {
        f.vx *= 0.24;
        f.vy *= 0.24;
        f.av *= 0.35;
      }
      const topSpeed = f.side === "player" ? 370 : 250;
      const speed = Math.hypot(f.vx, f.vy);
      if (speed > topSpeed) {
        f.vx = f.vx / speed * topSpeed;
        f.vy = f.vy / speed * topSpeed;
      }
      const dx = W / 2 - f.x, dy = H / 2 - (f.y - 20), distance = Math.hypot(dx, dy) || 1, pull = Math.min(210, 22e3 / (distance + 58));
      f.vx += dx / distance * pull * dt;
      f.vy += dy / distance * pull * dt;
    };
    let quickHalvesClock = 0;
    const quickHalvesReset = resetRound;
    resetRound = () => {
      quickHalvesReset();
      quickHalvesClock = 0;
    };
    const quickHalvesUpdate = update;
    function quickHalvesState() {
      const phase = Math.floor(quickHalvesClock / 3) % 3;
      return { vertical: phase === 0 || phase === 2, horizontal: phase === 1 || phase === 2 };
    }
    function zapHalvesFighter(f, vertical, horizontal) {
      if (f.dead || f.away) return;
      const hitV = vertical && Math.abs(f.x - W / 2) < 38, hitH = horizontal && Math.abs(f.y - 15 - H / 2) < 48;
      if (!hitV && !hitH) {
        f.quickLaserHit = false;
        return;
      }
      if (hitV) {
        const side = f.x < W / 2 ? -1 : 1;
        f.x = W / 2 + side * 42;
        f.vx = side * Math.max(235, Math.abs(f.vx) * 0.42);
        f.av += side * 2;
      }
      if (hitH) {
        const side = f.y - 15 < H / 2 ? -1 : 1;
        f.y = H / 2 + 15 + side * 52;
        f.vy = side * Math.max(275, Math.abs(f.vy) * 0.38);
        f.av += side * 2;
      }
      if (f.quickLaserHit) return;
      f.quickLaserHit = true;
      f.hp--;
      noteLifeLost(f);
      f.blink = 0.7;
      f.stun = 0.25;
      f.av += (Math.random() - 0.5) * 7;
      shake = Math.max(shake, 13);
      for (let i = 0; i < 18; i++) particles.push({ x: f.x, y: f.y - 14, vx: (Math.random() - 0.5) * 300, vy: (Math.random() - 0.5) * 300, life: 0.35 + Math.random() * 0.35, c: "#ff6580", r: 2 + Math.random() * 3 });
      beep(170, 0.14, "sawtooth", 0.05);
      if (f.hp <= 0) {
        markDefeated(f);
        setTimeout(checkVictory, 300);
      }
    }
    update = (dt) => {
      if (selectedArena.key !== "halves") {
        quickHalvesUpdate(dt);
        return;
      }
      const activeArena = selectedArena;
      selectedArena = __spreadProps(__spreadValues({}, activeArena), { key: "halves-passive" });
      quickHalvesUpdate(dt);
      selectedArena = activeArena;
      quickHalvesClock += dt;
      if (roundWait || netMode === "guest") return;
      const state = quickHalvesState();
      for (const f of allFighters()) zapHalvesFighter(f, state.vertical, state.horizontal);
      for (const s of spears) {
        if (s.stuck || s.stuckTo) continue;
        const hit2 = state.vertical && Math.abs(s.x - W / 2) < 15 || state.horizontal && Math.abs(s.y - H / 2) < 15;
        if (hit2) {
          s.stuck = true;
          s.life = 12;
          beep(105, 0.05, "square", 0.02);
        }
      }
    };
    const quickHalvesDraw = draw;
    draw = () => {
      if (selectedArena.key !== "halves") {
        quickHalvesDraw();
        return;
      }
      const activeArena = selectedArena;
      selectedArena = __spreadProps(__spreadValues({}, activeArena), { key: "halves-passive" });
      quickHalvesDraw();
      selectedArena = activeArena;
      const state = quickHalvesState();
      ctx.save();
      ctx.strokeStyle = "#ff4769";
      ctx.shadowColor = "#ff174f";
      ctx.shadowBlur = 20;
      ctx.lineWidth = 14;
      if (state.vertical) {
        ctx.beginPath();
        ctx.moveTo(W / 2, 0);
        ctx.lineTo(W / 2, H);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "#fff5fa";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.shadowBlur = 20;
        ctx.strokeStyle = "#ff4769";
        ctx.lineWidth = 14;
      }
      if (state.horizontal) {
        ctx.beginPath();
        ctx.moveTo(0, H / 2);
        ctx.lineTo(W, H / 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "#fff5fa";
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      ctx.restore();
    };
    drawWorld = () => {
      tunnelWorldDraw();
    };
    const cleanRoadPlatformDraw = drawPlatform;
    drawPlatform = (p) => {
      var _a2, _b2;
      if (selectedArena.key !== "road" || p.type !== "car") return cleanRoadPlatformDraw(p);
      const topCar = p.y < ground - H * 0.11, body = ((_a2 = p.move) == null ? void 0 : _a2.dir) > 0 ? "#d65742" : "#3674bd";
      ctx.save();
      ctx.fillStyle = "#10141d";
      ctx.fillRect(p.x - 4, p.y - 5, p.w + 8, p.h + 11);
      ctx.fillStyle = body;
      ctx.fillRect(p.x, p.y, p.w, p.h);
      if (topCar) {
        ctx.fillStyle = "#e7c966";
        ctx.fillRect(p.x + 7, p.y - 8, p.w - 14, 7);
        ctx.fillStyle = "#bfeaff";
        for (let x = p.x + 13; x < p.x + p.w - 18; x += 31) ctx.fillRect(x, p.y + 7, 19, 12);
        ctx.fillStyle = "#fff1a2";
        ctx.fillRect(((_b2 = p.move) == null ? void 0 : _b2.dir) > 0 ? p.x + p.w - 7 : p.x, p.y + 12, 7, 9);
      } else {
        ctx.fillStyle = "#d7e6ef";
        ctx.fillRect(p.x + 13, p.y + 8, p.w - 26, 11);
      }
      ctx.fillStyle = "#1b202b";
      for (const x of [p.x + 25, p.x + p.w - 25]) {
        ctx.beginPath();
        ctx.arc(x, p.y + p.h + 6, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#d8dfe5";
        ctx.beginPath();
        ctx.arc(x, p.y + p.h + 6, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#1b202b";
      }
      ctx.restore();
    };
    const roadStartOnCars = resetRound;
    resetRound = () => {
      var _a2;
      roadStartOnCars();
      if (selectedArena.key !== "road") return;
      const cars = platforms.filter((p) => p.type === "car").sort((a, b) => a.y - b.y);
      for (const [i, f] of allFighters().entries()) {
        if (!cars.length || f.dead) continue;
        const car = cars[i % cars.length];
        f.x = car.x + car.w * (i % 2 ? 0.68 : 0.32);
        f.y = car.y - 43;
        f.vx = (((_a2 = car.move) == null ? void 0 : _a2.dir) || 1) * 85;
        f.vy = 0;
        f.onGround = true;
      }
    };
    const roadRescueUpdate = updateFighter;
    updateFighter = (f, dt) => {
      roadRescueUpdate(f, dt);
      if (selectedArena.key !== "road" || f !== bot || f.dead || f.away) return;
      f.roadRescue = Math.max(0, (f.roadRescue || 0) - dt);
      if (f.roadRescue > 0 || f.y < ground - 165 || f.vy < 0) return;
      const cars = platforms.filter((p) => p.type === "car");
      let target = null, best = Infinity;
      for (const p of cars) {
        const d = Math.abs(p.x + p.w / 2 - f.x);
        if (d < best) {
          best = d;
          target = p;
        }
      }
      if (target) {
        f.roadRescue = 0.3;
        f.vx += Math.sign(target.x + target.w / 2 - f.x) * 270;
        f.vy = -365;
        f.onGround = false;
      }
    };
    skinShop.sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));
    skinStats.sheep = ["#f5f1e3", "\u25D6", "PULLING BITE", "1 DAMAGE"];
    const sheepApplySkin = applySkin;
    applySkin = (f, id) => {
      sheepApplySkin(f, id);
      if (f.skin === "sheep") {
        f.maxThrows = 0;
        f.throwsLeft = 0;
        f.hasSpear = false;
        f.sheepBite = 0;
        f.sheepHit = false;
      }
    };
    const sheepThrow = throwSpear;
    throwSpear = (f) => {
      if ((f == null ? void 0 : f.skin) !== "sheep") return sheepThrow(f);
      if (!running || roundWait || f.dead || f.invisibleTime > 0 || f.cooldown > 0) return;
      f.sheepBite = 0.72;
      f.sheepHit = false;
      f.cooldown = 1.55;
      f.hasSpear = false;
      f.vx -= Math.cos(faceAngle(f)) * 38;
      f.vy -= Math.sin(faceAngle(f)) * 20;
      beep(145, 0.16, "sine", 0.07);
      if (f === localFighter()) {
        throwBtn.classList.add("cooldown");
        document.querySelector("#ammoLabel").textContent = "CHOMPING";
      }
    };
    const sheepFighterUpdate = updateFighter;
    updateFighter = (f, dt) => {
      sheepFighterUpdate(f, dt);
      if (f.skin !== "sheep") return;
      f.hasSpear = false;
      f.throwsLeft = 0;
      if (f.sheepBite > 0) {
        f.sheepBite = Math.max(0, f.sheepBite - dt);
        const a = faceAngle(f), mx = f.x + Math.cos(a) * 42, my = f.y - 12 + Math.sin(a) * 42;
        for (const o of allFighters()) {
          if (o === f || o.dead || o.away) continue;
          const dx = mx - o.x, dy = my - (o.y - 16), d = Math.hypot(dx, dy) || 1;
          if (d < 175) {
            const pull = Math.max(0, 1 - d / 175) * 510;
            o.vx += dx / d * pull * dt;
            o.vy += dy / d * pull * dt;
          }
          if (d < 35 && !f.sheepHit) {
            f.sheepHit = true;
            directDamage(f, o, (o.x - f.x) / (Math.hypot(o.x - f.x, o.y - f.y) || 1), (o.y - f.y) / (Math.hypot(o.x - f.x, o.y - f.y) || 1), 520, Math.sign(o.x - f.x || 1) * 8, "#f5f1e3");
          }
        }
      }
      if (f === localFighter() && f.cooldown <= 0) {
        throwBtn.classList.remove("cooldown");
        document.querySelector("#ammoLabel").textContent = "BITE READY";
      }
    };
    const sheepDrawFighter = drawFighter;
    drawFighter = (f) => {
      if (f.skin !== "sheep") return sheepDrawFighter(f);
      const a = faceAngle(f), open = (f.sheepBite || 0) > 0 ? 10 : 2;
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.angle - (f.side === "player" ? 0 : Math.PI));
      ctx.fillStyle = "rgba(20,20,20,.13)";
      ctx.beginPath();
      ctx.ellipse(0, 35, 31, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#f5f1e3";
      ctx.beginPath();
      ctx.ellipse(-4, 4, 29, 23, 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#5b5044";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      for (const x of [-17, 12]) {
        ctx.beginPath();
        ctx.moveTo(x, 20);
        ctx.lineTo(x - 2, 40);
        ctx.stroke();
      }
      ctx.save();
      ctx.translate(Math.cos(a) * 30, -10 + Math.sin(a) * 30);
      ctx.rotate(a);
      ctx.fillStyle = "#eee9dc";
      ctx.beginPath();
      ctx.ellipse(0, 0, 23, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#413a35";
      ctx.beginPath();
      ctx.arc(10, -4, 3, 0, Math.PI * 2);
      ctx.arc(10, 4, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#eb9aa3";
      ctx.beginPath();
      ctx.arc(18, 0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#362e2a";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(5, -open / 2);
      ctx.lineTo(18, 0);
      ctx.lineTo(5, open / 2);
      ctx.stroke();
      ctx.restore();
      ctx.fillStyle = "#bdb7aa";
      for (const x of [-15, -4, 8, 19]) {
        ctx.beginPath();
        ctx.arc(x, -8 + x % 2 * 5, 8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };
    const sheepDrawSpecial = drawSpecial;
    drawSpecial = (f) => {
      sheepDrawSpecial(f);
      if (f.skin !== "sheep" || !(f.sheepBite > 0) || f.dead) return;
      const a = faceAngle(f), p = 1 - f.sheepBite / 0.72, x = f.x + Math.cos(a) * 43, y = f.y - 12 + Math.sin(a) * 43;
      ctx.save();
      ctx.globalAlpha = 0.7 * (1 - p);
      ctx.strokeStyle = "#f5f1e3";
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 7]);
      ctx.beginPath();
      ctx.arc(x, y, 35 + p * 125, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    };
    const multiplayerScoreRefresh = refreshScores;
    refreshScores = () => {
      if (netMode === "local") {
        document.body.classList.remove("multiplayerMode");
        document.querySelector(".player-score span").textContent = "YOU";
        document.querySelector(".bot-score").hidden = false;
        multiplayerScoreRefresh();
        return;
      }
      document.body.classList.add("multiplayerMode");
      document.querySelector(".player-score span").textContent = "WINS";
      document.querySelector(".bot-score").hidden = true;
      PScore.textContent = Math.min(50, wins[localFighter().side] || 0);
    };
    const multiplayerRoundResult = showRoundResult;
    showRoundResult = (winner) => {
      if (netMode === "local") return multiplayerRoundResult(winner);
      refreshScores();
      const localWon = winner === localFighter().side;
      document.querySelector("#resultEyebrow").textContent = "FREE-FOR-ALL ROUND";
      document.querySelector("#resultTitle").textContent = localWon ? "YOU WIN!" : "ROUND OVER";
      document.querySelector("#resultText").textContent = localWon ? "YOUR WIN TOTAL WENT UP." : "THE NEXT ROUND STARTS IN 10 SECONDS.";
      const btn = document.querySelector("#againButton");
      btn.innerHTML = "RETURN HOME <span>\u2192</span>";
      btn.disabled = false;
      resultCard.hidden = false;
    };
    const multiplayerEndRound = endRound;
    endRound = (winner) => {
      if (netMode === "local" || winner === "tie") return multiplayerEndRound(winner);
      if (roundWait || multiplayerPaused) return;
      roundWait = true;
      captureEconomy();
      wins[winner] = Math.min(50, (wins[winner] || 0) + 1);
      if (winner === localFighter().side) addRankXP(10);
      showRoundResult(winner);
      if (netMode === "host") {
        for (const c of clients) if (c == null ? void 0 : c.open) c.send({ type: "round", winner, wins, match: false });
        broadcastRanks();
        startPvpCountdown(false);
      }
    };
    const multiplayerHostRoom = hostRoom;
    hostRoom = () => {
      multiplayerHostRoom();
      bot.dead = true;
      bot.away = true;
      refreshScores();
    };
    let multiplayerRule = "normal", knockoutRoster = null, knockoutSwitching = false, knockoutModeSent = 0;
    const knockoutHud = document.createElement("div");
    knockoutHud.id = "knockoutHud";
    knockoutHud.hidden = true;
    arena.appendChild(knockoutHud);
    const normalModeButton = document.querySelector("#normalModeButton"), knockoutModeButton = document.querySelector("#knockoutModeButton");
    function isKnockout() {
      return netMode !== "local" && multiplayerRule === "knockout";
    }
    function paintModeChoice() {
      normalModeButton == null ? void 0 : normalModeButton.classList.toggle("active", multiplayerRule === "normal");
      knockoutModeButton == null ? void 0 : knockoutModeButton.classList.toggle("active", multiplayerRule === "knockout");
    }
    function renderKnockoutHud() {
      const active = isKnockout();
      knockoutHud.hidden = !active;
      if (!active) return;
      const me = localFighter();
      PScore.textContent = Math.max(0, me.hp || 0);
      document.querySelector(".player-score span").textContent = "LIVES";
      knockoutHud.innerHTML = allFighters().filter((f) => f !== me && !f.away).map((f) => `<div class="knockoutRival"><i style="--fighter-color:${f.color || colors.red}"></i><b>${Math.max(0, f.hp || 0)}</b></div>`).join("");
    }
    if (normalModeButton) normalModeButton.onclick = () => {
      if (netMode === "host" || netMode === "local") {
        multiplayerRule = "normal";
        knockoutRoster = null;
        paintModeChoice();
      }
    };
    if (knockoutModeButton) knockoutModeButton.onclick = () => {
      if (netMode === "host" || netMode === "local") {
        multiplayerRule = "knockout";
        knockoutRoster = null;
        paintModeChoice();
      }
    };
    const knockoutRefreshScores = refreshScores;
    refreshScores = () => {
      knockoutRefreshScores();
      if (isKnockout()) {
        document.body.classList.add("multiplayerMode");
        document.querySelector(".bot-score").hidden = true;
        renderKnockoutHud();
      } else knockoutHud.hidden = true;
    };
    const knockoutHandleData = handleNetData;
    handleNetData = (data, client) => {
      if ((data == null ? void 0 : data.type) === "mode") {
        multiplayerRule = data.rule === "knockout" ? "knockout" : "normal";
        paintModeChoice();
        refreshScores();
        return;
      }
      knockoutHandleData(data, client);
    };
    const roomWelcomeHandleData = handleNetData;
    handleNetData = (data, client) => {
      if ((data == null ? void 0 : data.type) === "welcome" && netMode === "guest" && data.roomId) hostedRoomId = String(data.roomId).slice(0, 32);
      if ((data == null ? void 0 : data.type) === "room-info" && netMode === "guest" && data.roomId) hostedRoomId = String(data.roomId).slice(0, 32);
      roomWelcomeHandleData(data, client);
    };
    const knockoutResetRound = resetRound;
    resetRound = () => {
      knockoutResetRound();
      if (!isKnockout() || !knockoutRoster) return;
      for (const saved of knockoutRoster) {
        const f = allFighters().find((item) => item.side === saved.side);
        if (f) Object.assign(f, { hp: saved.hp, maxHp: saved.maxHp, dead: saved.dead, away: saved.away, hideCorpse: saved.hideCorpse });
      }
      renderKnockoutHud();
    };
    const knockoutCheckVictory = checkVictory;
    checkVictory = () => {
      if (!isKnockout() || netMode !== "host") return knockoutCheckVictory();
      if (knockoutSwitching) return;
      const alive = allFighters().filter((f) => !f.dead && !f.away);
      if (alive.length <= 1) {
        knockoutSwitching = true;
        const winner = alive[0];
        roundWait = true;
        showRoundResult((winner == null ? void 0 : winner.side) || "tie");
        if (winner) wins[winner.side] = Math.min(50, (wins[winner.side] || 0) + 1);
        for (const c of clients) if (c == null ? void 0 : c.open) c.send({ type: "round", winner: (winner == null ? void 0 : winner.side) || "tie", wins, match: true });
        setTimeout(() => connectedHome(true), 2100);
        return;
      }
      if (allFighters().some((f) => f.dead && !f.away)) {
        knockoutSwitching = true;
        knockoutRoster = allFighters().map((f) => ({ side: f.side, hp: f.hp, maxHp: f.maxHp, dead: f.dead, away: f.away, hideCorpse: f.hideCorpse }));
        roundWait = true;
        running = false;
        setTimeout(() => {
          knockoutSwitching = false;
          spinArena();
        }, 700);
      }
    };
    const knockoutSpinArena = spinArena;
    spinArena = (forced = null, remote = false) => {
      knockoutSpinArena(forced, remote);
      if (netMode === "host" && !remote) {
        for (const c of clients) if (c == null ? void 0 : c.open) c.send({ type: "mode", rule: multiplayerRule });
      }
    };
    const knockoutUpdate = update;
    update = (dt) => {
      knockoutUpdate(dt);
      if (netMode === "host" && performance.now() - knockoutModeSent > 1200) {
        knockoutModeSent = performance.now();
        for (const c of clients) if (c == null ? void 0 : c.open) c.send({ type: "mode", rule: multiplayerRule });
      }
      renderKnockoutHud();
    };
    let lastTapBlock = 0;
    document.addEventListener("touchend", (e) => {
      const now = performance.now();
      if (now - lastTapBlock < 330) e.preventDefault();
      lastTapBlock = now;
    }, { passive: false });
    document.addEventListener("dblclick", (e) => e.preventDefault(), { passive: false });
    function heldShield(f) {
      if (f.skin === "trojan") {
        const a = shieldAngleOf(f);
        return { x: f.x + Math.cos(a) * 46, y: f.y - 4 + Math.sin(a) * 46, a, r: 47 };
      }
      if (f.skin === "captain" && f.hasSpear && !f.shieldOut) {
        const a = faceAngle(f);
        return { x: f.x + Math.cos(a) * 33, y: f.y - 12 + Math.sin(a) * 33, a, r: 32 };
      }
      return null;
    }
    const shieldBodyHit = bodyHit;
    bodyHit = (f, x1, y1, x2, y2) => {
      const shield = heldShield(f);
      if (shield && pointSegment(shield.x, shield.y, [x1, y1], [x2, y2]) <= shield.r) return true;
      return shieldBodyHit(f, x1, y1, x2, y2);
    };
    const fullShieldHit = hit;
    hit = (f, s) => {
      const shield = heldShield(f);
      if (shield && s.owner !== f && !s.stuck) {
        if ((s.shieldGrace || 0) > 0) return;
        const speed = Math.hypot(s.vx, s.vy) || 360, nx = Math.cos(shield.a), ny = Math.sin(shield.a), dot = s.vx * nx + s.vy * ny;
        s.x = shield.x + nx * (shield.r + 5);
        s.y = shield.y + ny * (shield.r + 5);
        s.vx = (s.vx - 2 * dot * nx) * 1.08;
        s.vy = (s.vy - 2 * dot * ny) * 1.08;
        s.a = Math.atan2(s.vy, s.vx);
        s.stuck = false;
        s.stuckTo = null;
        s.life = Math.max(s.life, 3);
        s.shieldGrace = 0.09;
        shieldBurst(f);
        beep(205, 0.09, "triangle", 0.055);
        return;
      }
      fullShieldHit(f, s);
    };
    const shieldUpdate = update;
    update = (dt) => {
      shieldUpdate(dt);
      for (const s of spears) s.shieldGrace = Math.max(0, (s.shieldGrace || 0) - dt);
    };
    const hostModeChoices = document.querySelector("#hostModeChoices"), hostRoomButton = document.querySelector("#hostButton");
    const startHostedMode = (rule) => {
      multiplayerRule = rule;
      knockoutRoster = null;
      paintModeChoice();
      hostModeChoices.hidden = true;
      hostRoom();
    };
    hostRoomButton.onclick = () => {
      if (netMode !== "local" || peer || joinBusy) return;
      hostModeChoices.hidden = !hostModeChoices.hidden;
      document.querySelector("#lobbyStatus").textContent = hostModeChoices.hidden ? "Host a room, type a friend\u2019s code, or choose the closest open room." : "CHOOSE NORMAL OR KNOCKOUT TO HOST YOUR ROOM.";
    };
    normalModeButton.onclick = () => startHostedMode("normal");
    knockoutModeButton.onclick = () => startHostedMode("knockout");
    const finalNameField = document.querySelector("#playerNameInput"), finalNameSave = document.querySelector("#saveNameButton");
    let finalNameDraft = (_c = finalNameField == null ? void 0 : finalNameField.value) != null ? _c : playerName;
    if (finalNameField) finalNameField.addEventListener("input", () => {
      nameEditDirty = true;
      finalNameDraft = finalNameField.value;
    }, true);
    const keepTypedNameRender = renderFriends;
    renderFriends = () => {
      var _a2;
      const editing = !!finalNameField && (document.activeElement === finalNameField || nameEditDirty), typed = (_a2 = finalNameField == null ? void 0 : finalNameField.value) != null ? _a2 : finalNameDraft;
      keepTypedNameRender();
      if (editing && finalNameField) finalNameField.value = typed;
    };
    const saveTypedName = () => {
      var _a2;
      const status = document.querySelector("#lobbyStatus"), raw = String((_a2 = finalNameField == null ? void 0 : finalNameField.value) != null ? _a2 : finalNameDraft).replace(/[^a-zA-Z0-9 _-]/g, "").trim().slice(0, 16), code = cleanFriendCode(raw);
      if (code.length < 3) {
        if (status) status.textContent = "CHOOSE A NAME WITH AT LEAST 3 LETTERS.";
        return;
      }
      if (netMode !== "local") {
        if (status) status.textContent = "RETURN HOME BEFORE CHANGING YOUR NAME.";
        return;
      }
      playerName = raw;
      friendCode = code;
      finalNameDraft = raw;
      nameEditDirty = false;
      friendProfiles = friendProfiles.filter((f) => f.code !== code);
      saveSocial();
      if (finalNameField) finalNameField.value = raw;
      try {
        presencePeer == null ? void 0 : presencePeer.destroy();
      } catch (_) {
      }
      presencePeer = null;
      setTimeout(() => {
        initPresence();
        refreshFriends();
      }, 250);
      renderFriends();
      if (status) status.textContent = "NAME SAVED.";
    };
    if (finalNameSave) finalNameSave.onclick = saveTypedName;
    document.querySelectorAll("input,textarea,select").forEach((field) => {
      field.addEventListener("pointerdown", (event) => event.stopPropagation());
      field.addEventListener("touchend", (event) => event.stopPropagation());
    });
    let hostChoiceTouchAt = 0;
    const showHostChoices = (event) => {
      event == null ? void 0 : event.preventDefault();
      event == null ? void 0 : event.stopPropagation();
      if (netMode !== "local" || peer || joinBusy) return;
      hostModeChoices.hidden = !hostModeChoices.hidden;
      document.querySelector("#lobbyStatus").textContent = hostModeChoices.hidden ? "Host a room, type a friend\u2019s code, or choose the closest open room." : "CHOOSE NORMAL OR KNOCKOUT TO HOST YOUR ROOM.";
    };
    hostRoomButton.onclick = showHostChoices;
    hostRoomButton.addEventListener("touchend", (event) => {
      hostChoiceTouchAt = Date.now();
      showHostChoices(event);
    }, { passive: false });
    const pickHostMode = (rule) => {
      if (Date.now() - hostChoiceTouchAt < 80) return;
      startHostedMode(rule);
    };
    normalModeButton.onclick = () => pickHostMode("normal");
    knockoutModeButton.onclick = () => pickHostMode("knockout");
    const lobbyHost = hostRoom;
    hostRoom = () => {
      document.body.classList.add("hostingLobby");
      lobbyHost();
    };
    const lobbySpin = spinArena;
    spinArena = (forced, remote) => {
      document.body.classList.remove("hostingLobby");
      lobbySpin(forced, remote);
    };
    const lobbyLeave = leaveRoom;
    leaveRoom = () => {
      document.body.classList.remove("hostingLobby");
      lobbyLeave();
    };
    let reloadedForAppUpdate = false;
    const checkAppUpdate = () => __async(null, null, function* () {
      if (!("serviceWorker" in navigator)) return;
      try {
        const registration = yield navigator.serviceWorker.getRegistration();
        yield registration == null ? void 0 : registration.update();
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (!reloadedForAppUpdate) {
            reloadedForAppUpdate = true;
            location.reload();
          }
        }, { once: true });
      } catch (_) {
      }
    });
    checkAppUpdate();
    window.addEventListener("pageshow", checkAppUpdate);
    const permanentNameField = document.querySelector("#playerNameInput"), permanentNameSave = document.querySelector("#saveNameButton"), PERMANENT_NAME_KEY = "loosePointPermanentPlayerName";
    const cleanPermanentName = (value) => String(value != null ? value : "").replace(/[^a-zA-Z0-9 _-]/g, "").trim().slice(0, 16);
    const storedPermanentName = cleanPermanentName(localStorage.getItem(PERMANENT_NAME_KEY));
    if (storedPermanentName.length >= 3) {
      playerName = storedPermanentName;
      friendCode = cleanFriendCode(storedPermanentName);
      if (permanentNameField) permanentNameField.value = storedPermanentName;
      saveSocial();
    }
    const commitPermanentName = () => {
      const status = document.querySelector("#lobbyStatus"), name = cleanPermanentName(permanentNameField == null ? void 0 : permanentNameField.value);
      if (name.length < 3) {
        if (status) status.textContent = "CHOOSE A NAME WITH AT LEAST 3 LETTERS.";
        return;
      }
      playerName = name;
      friendCode = cleanFriendCode(name);
      finalNameDraft = name;
      liveNameTyped = name;
      nameEditDirty = false;
      localStorage.setItem(PERMANENT_NAME_KEY, name);
      saveSocial();
      if (permanentNameField) permanentNameField.value = name;
      try {
        presencePeer == null ? void 0 : presencePeer.destroy();
      } catch (_) {
      }
      presencePeer = null;
      setTimeout(() => {
        initPresence();
        refreshFriends();
      }, 200);
      renderFriends();
      if (status) status.textContent = "NAME SAVED.";
    };
    if (permanentNameField) {
      permanentNameField.oninput = () => {
        nameEditDirty = true;
        finalNameDraft = permanentNameField.value;
        liveNameTyped = permanentNameField.value;
      };
      permanentNameField.addEventListener("keydown", (event) => {
        event.stopPropagation();
        if (event.key === "Enter") {
          event.preventDefault();
          commitPermanentName();
        }
      }, true);
    }
    if (permanentNameSave) permanentNameSave.onclick = commitPermanentName;
    const alwaysAddFriend = () => {
      const input = document.querySelector("#friendCodeInput"), status = document.querySelector("#lobbyStatus"), raw = String((input == null ? void 0 : input.value) || "").trim(), code = cleanFriendCode(raw);
      if (code.length < 3) {
        if (status) status.textContent = "ENTER YOUR FRIEND\u2019S NAME.";
        return;
      }
      if (code === friendCode) {
        if (status) status.textContent = "THAT IS YOUR OWN NAME.";
        return;
      }
      const added = rememberFriend(code, raw);
      if (input) input.value = "";
      if (status) status.textContent = added ? "FRIEND ADDED \u2014 THEY WILL TURN GREEN WHEN ONLINE." : "FRIEND IS ALREADY ON YOUR LIST.";
      if (!(presencePeer == null ? void 0 : presencePeer.open)) {
        initPresence();
        return;
      }
      try {
        const request = presencePeer.connect("lp-user-" + code.toLowerCase(), { reliable: true, serialization: "json", metadata: { type: "friend-request", from: friendCode } });
        request.on("open", () => request.send({ type: "friend-request", code: friendCode, name: playerName }));
        request.on("data", (data) => {
          if ((data == null ? void 0 : data.type) === "friend-deny") {
            friendProfiles = friendProfiles.filter((friend) => friend.code !== code);
            saveSocial();
            renderFriends();
            if (status) status.textContent = "FRIEND REQUEST DENIED.";
          }
          try {
            request.close();
          } catch (_) {
          }
        });
        request.on("error", () => {
        });
      } catch (_) {
      }
    };
    const permanentFriendButton = document.querySelector("#addFriendButton"), permanentFriendField = document.querySelector("#friendCodeInput");
    if (permanentFriendButton) permanentFriendButton.onclick = alwaysAddFriend;
    if (permanentFriendField) permanentFriendField.onkeydown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        alwaysAddFriend();
      }
    };
    const INCOMING_FRIEND_KEY = "loosePointIncomingFriendRequestsV1", INCOMING_FRIEND_LIFE = 24 * 60 * 60 * 1e3;
    let incomingFriendRequests = [];
    const saveIncomingFriends = () => {
      try {
        localStorage.setItem(INCOMING_FRIEND_KEY, JSON.stringify(incomingFriendRequests));
      } catch (_) {
      }
    };
    const pruneIncomingFriends = () => {
      const now = Date.now(), before = incomingFriendRequests.length;
      incomingFriendRequests = incomingFriendRequests.filter((request) => request.expiresAt > now && request.code);
      if (before !== incomingFriendRequests.length) saveIncomingFriends();
      return before !== incomingFriendRequests.length;
    };
    try {
      const saved = JSON.parse(localStorage.getItem(INCOMING_FRIEND_KEY) || "[]");
      incomingFriendRequests = Array.isArray(saved) ? saved.map((request) => ({ code: cleanFriendCode(request.code), name: cleanPlayerName(request.name || request.code), expiresAt: Number(request.expiresAt) || 0 })).filter((request) => request.code && request.expiresAt) : [];
    } catch (_) {
      incomingFriendRequests = [];
    }
    pruneIncomingFriends();
    const removeIncomingFriend = (code) => {
      code = cleanFriendCode(code);
      incomingFriendRequests = incomingFriendRequests.filter((request) => request.code !== code);
      saveIncomingFriends();
      renderIncomingFriendRequests();
    };
    function renderIncomingFriendRequests() {
      const box = document.querySelector("#incomingFriendRequests");
      if (!box) return;
      pruneIncomingFriends();
      box.innerHTML = "";
      if (!incomingFriendRequests.length) {
        box.hidden = true;
        return;
      }
      box.hidden = false;
      box.className = "incomingFriendRequests";
      const heading = document.createElement("small");
      heading.className = "incomingHeading";
      heading.textContent = "FRIEND REQUESTS";
      box.appendChild(heading);
      for (const request of incomingFriendRequests) {
        const row = document.createElement("div");
        row.className = "incomingFriendRequest";
        const name = document.createElement("b");
        name.textContent = request.name;
        const accept = document.createElement("button");
        accept.className = "incomingAccept";
        accept.textContent = "ACCEPT";
        const deny = document.createElement("button");
        deny.className = "incomingDeny";
        deny.textContent = "X";
        accept.onclick = () => respondToIncomingFriend(request, true);
        deny.onclick = () => respondToIncomingFriend(request, false);
        row.append(name, accept, deny);
        box.appendChild(row);
      }
    }
    function respondToIncomingFriend(request, accepted) {
      const code = cleanFriendCode(request == null ? void 0 : request.code), name = cleanPlayerName((request == null ? void 0 : request.name) || code);
      if (!code) return;
      removeIncomingFriend(code);
      if (accepted) {
        rememberFriend(code, name);
        pendingStatus == null ? void 0 : pendingStatus("FRIEND ADDED.");
      } else {
        pendingStatus == null ? void 0 : pendingStatus("FRIEND REQUEST DENIED.");
      }
      let link, timer, done = false;
      const finish = () => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        try {
          link == null ? void 0 : link.close();
        } catch (_) {
        }
      };
      try {
        link = presencePeer == null ? void 0 : presencePeer.connect("lp-user-" + code.toLowerCase(), { reliable: true, serialization: "json", metadata: { type: "friend-response", from: friendCode } });
        link == null ? void 0 : link.on("open", () => link.send({ type: accepted ? "friend-accept" : "friend-deny", code: friendCode, name: playerName }));
        link == null ? void 0 : link.on("error", finish);
        link == null ? void 0 : link.on("close", finish);
        timer = setTimeout(finish, 5e3);
      } catch (_) {
        finish();
      }
    }
    function storeIncomingFriendRequest(fromCode, fromName) {
      const code = cleanFriendCode(fromCode), name = cleanPlayerName(fromName || code);
      if (!code || code === friendCode || friendProfiles.some((f) => f.code === code)) return;
      const existing = incomingFriendRequests.find((request) => request.code === code);
      if (existing) {
        existing.name = name || existing.name;
        existing.expiresAt = Date.now() + INCOMING_FRIEND_LIFE;
      } else incomingFriendRequests.push({ code, name, expiresAt: Date.now() + INCOMING_FRIEND_LIFE });
      saveIncomingFriends();
      renderIncomingFriendRequests();
    }
    friendRequestPopup = (fromCode, fromName, replyConn) => storeIncomingFriendRequest(fromCode, fromName);
    const PENDING_FRIEND_KEY = "loosePointPendingFriendRequestsV1", PENDING_FRIEND_LIFE = 24 * 60 * 60 * 1e3;
    let pendingFriendRequests = [];
    const pendingStatus = (message) => {
      const status = document.querySelector("#lobbyStatus");
      if (status) status.textContent = message;
    };
    const savePendingFriends = () => {
      try {
        localStorage.setItem(PENDING_FRIEND_KEY, JSON.stringify(pendingFriendRequests));
      } catch (_) {
      }
    };
    const prunePendingFriends = () => {
      const now = Date.now(), expired = pendingFriendRequests.filter((request) => request.expiresAt <= now);
      pendingFriendRequests = pendingFriendRequests.filter((request) => request.expiresAt > now);
      if (expired.length) {
        savePendingFriends();
        pendingStatus("PERSON DOES NOT EXIST.");
      }
      return expired.length > 0;
    };
    try {
      const saved = JSON.parse(localStorage.getItem(PENDING_FRIEND_KEY) || "[]");
      pendingFriendRequests = Array.isArray(saved) ? saved.map((request) => ({ code: cleanFriendCode(request.code), name: cleanPlayerName(request.name || request.code), expiresAt: Number(request.expiresAt) || 0, lastTry: Number(request.lastTry) || 0, trying: false })).filter((request) => request.code && request.expiresAt) : [];
    } catch (_) {
      pendingFriendRequests = [];
    }
    prunePendingFriends();
    const removePendingFriend = (code) => {
      code = cleanFriendCode(code);
      pendingFriendRequests = pendingFriendRequests.filter((request) => request.code !== code);
      savePendingFriends();
      renderFriends();
    };
    const basePendingRenderFriends = renderFriends;
    renderFriends = () => {
      basePendingRenderFriends();
      prunePendingFriends();
      const list = document.querySelector("#friendsList");
      if (list) for (const request of pendingFriendRequests) {
        const row = document.createElement("div");
        row.className = "friendRow pendingFriend";
        const light = document.createElement("i");
        light.className = "friendLight";
        const identity = document.createElement("div");
        identity.className = "friendIdentity";
        const name = document.createElement("b");
        name.textContent = request.name;
        const detail = document.createElement("small");
        detail.textContent = request.trying ? "SENDING REQUEST..." : "REQUEST SENT \u2014 WAITING";
        identity.append(name, detail);
        const wait = document.createElement("button");
        wait.className = "friendJoin";
        wait.textContent = "WAITING";
        wait.disabled = true;
        const remove = document.createElement("button");
        remove.className = "friendRemove";
        remove.textContent = "\xD7";
        remove.title = "Cancel friend request";
        remove.onclick = () => {
          removePendingFriend(request.code);
          pendingStatus("FRIEND REQUEST CANCELLED.");
        };
        row.append(light, identity, wait, remove);
        list.appendChild(row);
      }
      renderIncomingFriendRequests();
    };
    const sendPendingFriendRequest = (request) => {
      if (!(presencePeer == null ? void 0 : presencePeer.open) || request.trying || request.expiresAt <= Date.now()) return;
      request.trying = true;
      request.lastTry = Date.now();
      savePendingFriends();
      renderFriends();
      let finished = false, link, timer;
      const finish = (message) => {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        request.trying = false;
        savePendingFriends();
        try {
          link == null ? void 0 : link.close();
        } catch (_) {
        }
        if (message) pendingStatus(message);
        renderFriends();
      };
      try {
        link = presencePeer.connect("lp-user-" + request.code.toLowerCase(), { reliable: true, serialization: "json", metadata: { type: "friend-request", from: friendCode } });
        link.on("open", () => link.send({ type: "friend-request", code: friendCode, name: playerName }));
        link.on("data", (data) => {
          if ((data == null ? void 0 : data.type) === "friend-accept") {
            rememberFriend(data.code || request.code, data.name || request.name);
            removePendingFriend(request.code);
            finish("FRIEND ADDED.");
          } else if ((data == null ? void 0 : data.type) === "friend-deny") {
            removePendingFriend(request.code);
            finish("FRIEND REQUEST DENIED.");
          }
        });
        link.on("error", () => finish(""));
        link.on("close", () => {
          if (!finished) setTimeout(() => finish(""), 120);
        });
        timer = setTimeout(() => finish(""), 2e4);
      } catch (_) {
        finish("");
      }
    };
    const retryPendingFriendRequests = () => {
      if (prunePendingFriends()) renderFriends();
      if (!(presencePeer == null ? void 0 : presencePeer.open)) return;
      const now = Date.now();
      for (const request of pendingFriendRequests) if (!request.trying && now - request.lastTry > 25e3) sendPendingFriendRequest(request);
    };
    setInterval(retryPendingFriendRequests, 3e4);
    const requestFriendForOneDay = () => {
      const input = document.querySelector("#friendCodeInput"), raw = String((input == null ? void 0 : input.value) || "").trim(), code = cleanFriendCode(raw), name = cleanPlayerName(raw);
      if (code.length < 3) {
        pendingStatus("ENTER YOUR FRIEND\u2019S NAME.");
        return;
      }
      if (code === friendCode) {
        pendingStatus("THAT IS YOUR OWN NAME.");
        return;
      }
      if (friendProfiles.some((friend) => friend.code === code)) {
        pendingStatus("YOU ARE ALREADY FRIENDS.");
        return;
      }
      if (pendingFriendRequests.some((request) => request.code === code)) {
        pendingStatus("FRIEND REQUEST IS ALREADY WAITING.");
        return;
      }
      pendingFriendRequests.push({ code, name, expiresAt: Date.now() + PENDING_FRIEND_LIFE, lastTry: 0, trying: false });
      savePendingFriends();
      if (input) input.value = "";
      renderFriends();
      pendingStatus("FRIEND REQUEST SENT \u2014 WAITING FOR ACCEPTANCE.");
      if (!(presencePeer == null ? void 0 : presencePeer.open)) {
        initPresence();
        setTimeout(retryPendingFriendRequests, 600);
        return;
      }
      retryPendingFriendRequests();
    };
    if (permanentFriendButton) permanentFriendButton.onclick = requestFriendForOneDay;
    if (permanentFriendField) permanentFriendField.onkeydown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        requestFriendForOneDay();
      }
    };
    const pendingPresenceInit = initPresence;
    initPresence = () => {
      pendingPresenceInit();
      setTimeout(retryPendingFriendRequests, 700);
    };
    const compactDoorsMake = makePlatforms;
    makePlatforms = () => {
      compactDoorsMake();
      if (selectedArena.key === "doors") doors = doors.filter((_, i) => i % 2 === 0).slice(0, 4);
    };
    if (selectedArena.key === "doors") makePlatforms();
    const sheepLimbUpdate = updateFighter;
    updateFighter = (f, dt) => {
      sheepLimbUpdate(f, dt);
      if (f.skin !== "sheep" || !f.sheepBite) return;
      const a = faceAngle(f), mx = f.x + Math.cos(a) * 42, my = f.y - 12 + Math.sin(a) * 42;
      for (const target of allFighters()) {
        if (target === f || target.dead || target.away) continue;
        const dx = mx - target.x, dy = my - (target.y - 16), distance = Math.hypot(dx, dy) || 1;
        if (distance < 38) {
          const hitAngle = Math.atan2(target.y - f.y, target.x - f.x) - f.angle;
          const side = Math.sin(hitAngle);
          if (Math.abs(side) > 0.32) target.sheepLostArm = side < 0 ? "left" : "right";
          else target.sheepLostLeg = side < 0 ? "left" : "right";
        }
      }
    };
    const sheepLimbDraw = drawFighter;
    drawFighter = (f) => {
      sheepLimbDraw(f);
      if (f.skin === "sheep" || f.dead) return;
      const rot = f.angle - (f.side === "player" ? 0 : Math.PI);
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(rot);
      ctx.strokeStyle = f.color || "#4d6fff";
      ctx.lineCap = "round";
      ctx.lineWidth = 9;
      if (f.sheepLostArm) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.moveTo(f.sheepLostArm === "left" ? -12 : 12, -22);
        ctx.lineTo(f.sheepLostArm === "left" ? -35 : 35, -3);
        ctx.stroke();
      }
      if (f.sheepLostLeg) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.moveTo(f.sheepLostLeg === "left" ? -8 : 8, 10);
        ctx.lineTo(f.sheepLostLeg === "left" ? -20 : 20, 37);
        ctx.stroke();
      }
      ctx.restore();
    };
    const doorsBigResize = resize;
    resize = () => {
      doorsBigResize();
      if (selectedArena.key !== "doors") return;
      W = Math.round(LOGICAL_W * 1.32);
      H = Math.round(LOGICAL_H * 1.18);
      ground = H * 0.82;
      const bw = Math.round(W * dpr), bh = Math.round(H * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makePlatforms();
      if (!running) resetPositions();
    };
    const doorsShapeMake = makePlatforms;
    makePlatforms = () => {
      doorsShapeMake();
      if (selectedArena.key !== "doors") return;
      const y = (v) => ground - H * v;
      doors = [{ x: W * 0.48, y: y(0.47), w: 34, h: 116, type: "triple" }, { x: W * 0.31, y: y(0.28), w: 34, h: 116, type: "directional" }, { x: W * 0.69, y: y(0.28), w: 34, h: 116, type: "danger" }, { x: W * 0.09, y: y(0.45), w: 34, h: 116, type: "gravityDown" }, { x: W * 0.87, y: y(0.45), w: 34, h: 116, type: "gravityUp" }];
    };
    const doorsPowerUpdate = updateFighter;
    updateFighter = (f, dt) => {
      doorsPowerUpdate(f, dt);
      if (f.skin === "sheep" || selectedArena.key !== "doors" || f.dead || f.away) return;
      f.doorGravity = Math.max(0, (f.doorGravity || 0) - dt);
      if (f.doorGravity > 0) f.vy += (f.doorGravityDir || 1) * 900 * dt;
    };
    const doorsPowerApply = applyDoorToFighter;
    applyDoorToFighter = (f, d) => {
      if (d.type === "directional") {
        const dir = Math.sign(f.vx) || Math.sign(Math.cos(faceAngle(f))) || 1;
        if (dir > 0) {
          f.doorBoost = 1.2;
          f.vx += 620;
        } else {
          f.doorHeavy = 1.2;
          f.vx *= 0.28;
          f.vy *= 0.7;
        }
        f.doorCooldown = 0.55;
        portalBurst(d.x + d.w / 2, d.y + 58, "#8efff5");
        return;
      }
      if (d.type === "danger") {
        if (!f.doorHit) {
          f.doorHit = true;
          f.hp--;
          noteLifeLost(f);
          f.blink = 0.7;
          f.vy = -330;
          f.av += (Math.random() - 0.5) * 5;
          if (f.hp <= 0) markDefeated(f);
        }
        f.doorCooldown = 0.8;
        portalBurst(d.x + d.w / 2, d.y + 58, "#ff5578");
        return;
      }
      if (d.type === "gravityDown" || d.type === "gravityUp") {
        f.doorGravity = 1.25;
        f.doorGravityDir = d.type === "gravityUp" ? -1 : 1;
        f.doorCooldown = 0.55;
        portalBurst(d.x + d.w / 2, d.y + 58, d.type === "gravityUp" ? "#c18cff" : "#75b8ff");
        return;
      }
      doorsPowerApply(f, d);
    };
    const doorsPowerUpdateState = update;
    update = (dt) => {
      doorsPowerUpdateState(dt);
      if (selectedArena.key === "doors") {
        for (const f of allFighters()) if (f.doorCooldown <= 0) f.doorHit = false;
        for (const s of spears) if (!s.stuck && !s.stuckTo) {
          const d = doors.find((q) => s.x > q.x - 7 && s.x < q.x + q.w + 7 && s.y > q.y && s.y < q.y + q.h);
          if ((d == null ? void 0 : d.type) === "danger") s.life = 0;
        }
      }
    };
    const doorsPowerDraw = draw;
    draw = () => {
      doorsPowerDraw();
      if (selectedArena.key !== "doors") return;
      ctx.save();
      for (const d of doors) {
        const col = d.type === "danger" ? "#ff5578" : d.type === "triple" ? "#ffe45c" : d.type === "gravityUp" ? "#c18cff" : d.type === "gravityDown" ? "#75b8ff" : "#8efff5";
        ctx.fillStyle = col + "33";
        ctx.strokeStyle = col;
        ctx.shadowColor = col;
        ctx.shadowBlur = 16;
        ctx.lineWidth = 4;
        ctx.fillRect(d.x, d.y, d.w, d.h);
        ctx.strokeRect(d.x, d.y, d.w, d.h);
        ctx.shadowBlur = 0;
        ctx.fillStyle = col;
        ctx.font = "bold 17px DM Mono";
        ctx.textAlign = "center";
        ctx.fillText(d.type === "danger" ? "\xD7" : d.type === "triple" ? "\xD73" : d.type === "gravityUp" ? "\u2191" : d.type === "gravityDown" ? "\u2193" : "\u21C4", d.x + d.w / 2, d.y + d.h / 2 + 6);
      }
      ctx.restore();
    };
    makePlatforms();
    resize();
    const zoneDoorsMake = makePlatforms;
    makePlatforms = () => {
      zoneDoorsMake();
      if (selectedArena.key === "doors") doors = doors.filter((d) => d.type !== "gravityDown" && d.type !== "gravityUp");
    };
    const zoneFighterUpdate = updateFighter;
    updateFighter = (f, dt) => {
      zoneFighterUpdate(f, dt);
      if (selectedArena.key === "doors" && !f.dead && !f.away) f.vy += (f.x < W / 2 ? 1 : -1) * 520 * dt;
    };
    const zoneProjectileUpdate = update;
    update = (dt) => {
      zoneProjectileUpdate(dt);
      if (selectedArena.key === "doors") {
        for (const s of spears) if (!s.stuck && !s.stuckTo) s.vy += (s.x < W / 2 ? 1 : -1) * 520 * dt;
      }
    };
    const zoneDraw = draw;
    draw = () => {
      zoneDraw();
      if (selectedArena.key !== "doors") return;
      ctx.save();
      ctx.fillStyle = "rgba(80,150,255,.07)";
      ctx.fillRect(0, 0, W / 2, H);
      ctx.fillStyle = "rgba(190,120,255,.07)";
      ctx.fillRect(W / 2, 0, W / 2, H);
      ctx.strokeStyle = "rgba(220,220,255,.55)";
      ctx.setLineDash([10, 10]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(W / 2, 0);
      ctx.lineTo(W / 2, H);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#9ac9ff";
      ctx.font = "bold 15px DM Mono";
      ctx.textAlign = "center";
      ctx.fillText("GRAVITY DOWN", W * 0.25, 32);
      ctx.fillStyle = "#d4b4ff";
      ctx.fillText("GRAVITY UP", W * 0.75, 32);
      ctx.restore();
    };
    makePlatforms();
    resize();
    const flubberLaunchFinal = throwSpear;
    throwSpear = (f) => {
      const before = spears.length;
      flubberLaunchFinal(f);
      if ((f == null ? void 0 : f.skin) === "flubber") {
        const launched = spears.slice(before).filter((s) => s.weapon === "flubberArm");
        launched.forEach((s, i) => {
          s.armIndex = (f.throwsLeft % 2 === 0 ? 1 : 0) + i;
          s.flubberSteer = 0.42;
        });
      }
    };
    const lifeTripleThrow = throwSpear;
    throwSpear = (f) => {
      const before = spears.length;
      lifeTripleThrow(f);
      if (!f || f.skin !== "classic" || !f.tripleShot) return;
      const made = spears.slice(before).filter((s) => s.owner === f && s.weapon === "spear");
      for (const original of made) {
        const speed = Math.hypot(original.vx, original.vy), a = original.a;
        for (const offset of [-0.13, 0.13]) {
          const aa = a + offset;
          spears.push(__spreadProps(__spreadValues({}, original), { x: f.x + Math.cos(aa) * 36, y: f.y - 12 + Math.sin(aa) * 36, a: aa, spinA: aa, vx: Math.cos(aa) * speed + f.vx * 0.35, vy: Math.sin(aa) * speed + f.vy * 0.2, stuck: false, stuckTo: null, life: 6 }));
        }
      }
    };
    const lifeShieldBase = heldShield;
    heldShield = (f) => {
      const shield = lifeShieldBase(f);
      if (shield || !(f == null ? void 0 : f.lifeShield) || f.dead) return shield;
      const a = faceAngle(f);
      return { x: f.x + Math.cos(a) * 30, y: f.y - 12 + Math.sin(a) * 30, a, r: 23 };
    };
    const lifeShieldDraw = drawFighter;
    drawFighter = (f) => {
      lifeShieldDraw(f);
      if (!(f == null ? void 0 : f.lifeShield) || f.dead) return;
      const a = faceAngle(f);
      ctx.save();
      ctx.translate(f.x + Math.cos(a) * 25, f.y - 12 + Math.sin(a) * 25);
      ctx.rotate(a);
      ctx.fillStyle = "rgba(120,190,255,.72)";
      ctx.strokeStyle = "#e8fbff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 0, 11, 21, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };
    const stackedLifeDraw = drawFighter;
    drawFighter = (f) => {
      if (!f || f.dead || f.maxHp <= 5) return stackedLifeDraw(f);
      const hp = f.hp, max = f.maxHp;
      f.hp = Math.min(5, hp);
      f.maxHp = 5;
      stackedLifeDraw(f);
      f.hp = hp;
      f.maxHp = max;
      const shown = Math.min(5, Math.max(0, Math.ceil(hp - 5))), color = f.color || (f.side === "bot" ? colors.red : colors.blue);
      for (let i = 0; i < shown; i++) {
        ctx.fillStyle = color;
        ctx.fillRect(f.x - (5 * 14 - 4) / 2 + i * 14, f.y - 86, 10, 4);
      }
    };
    const flubberFinalUpdate = update;
    update = (dt) => {
      flubberFinalUpdate(dt);
      for (const s of spears) if (s.weapon === "flubberArm" && !s.stuck && !s.stuckTo) {
        const owner = s.owner;
        if (!owner || owner.dead) continue;
        const speed = Math.hypot(s.vx, s.vy) || 720;
        const current = Math.atan2(s.vy, s.vx);
        let best = null;
        for (const target of allFighters()) {
          if (target === owner || target.dead || target.away) continue;
          const dx = target.x - s.x, dy = target.y - 16 - s.y, d = Math.hypot(dx, dy) || 1, delta = Math.atan2(Math.sin(Math.atan2(dy, dx) - current), Math.cos(Math.atan2(dy, dx) - current));
          if (d < 270 && Math.abs(delta) < 0.42 && (!best || d < best.d)) best = { d, delta };
        }
        if (best) {
          const turn = Math.max(-0.18 * dt, Math.min(0.18 * dt, best.delta * 0.22));
          s.a = current + turn;
          s.vx = Math.cos(s.a) * speed;
          s.vy = Math.sin(s.a) * speed;
          s.straightVy = s.vy;
        }
      }
    };
    const flubberBouncyUpdate = updateFighter;
    updateFighter = (f, dt) => {
      const oldX = f.x, oldVx = f.vx;
      flubberBouncyUpdate(f, dt);
      if (f.skin !== "flubber" || f.dead) return;
      f.flubberBounceLock = Math.max(0, (f.flubberBounceLock || 0) - dt);
      if (f.flubberBounceLock > 0) return;
      if (f.onGround) {
        f.vy = -700;
        f.onGround = false;
        f.flubberBounceLock = 0.16;
        f.av += (Math.random() - 0.5) * 5;
        return;
      }
      const wall = borderSize + 20;
      if (f.x <= wall && oldVx < 0 || f.x >= W - wall && oldVx > 0) {
        f.vx = -oldVx * 0.92;
        f.vy -= 130;
        f.flubberBounceLock = 0.16;
        f.av += (Math.random() - 0.5) * 5;
      }
    };
    const flubberAttachedDraw = drawSpear;
    drawSpear = (s) => {
      if (s.weapon !== "flubberArm") {
        flubberAttachedDraw(s);
        return;
      }
      const owner = s.owner;
      if (!owner) {
        flubberAttachedDraw(s);
        return;
      }
      const c = owner.color || "#65df58", sx = owner.x + (s.armIndex === 1 ? 13 : -13), sy = owner.y - 10;
      ctx.save();
      ctx.strokeStyle = c;
      ctx.shadowColor = c;
      ctx.shadowBlur = 8;
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    const ACCOUNT_KEY = "loosePointAccountsV1", ACTIVE_ACCOUNT_KEY = "loosePointActiveAccountV1", accountVaultKeys = /* @__PURE__ */ new Set([ACCOUNT_KEY, ACTIVE_ACCOUNT_KEY]);
    let accountVault = {}, currentAccountName = "";
    const accountHash = (value) => {
      let h = 2166136261;
      for (const ch of String(value)) {
        h ^= ch.charCodeAt(0);
        h = Math.imul(h, 16777619);
      }
      return (h >>> 0).toString(16);
    };
    const readAccounts = () => {
      try {
        const v = JSON.parse(localStorage.getItem(ACCOUNT_KEY) || "{}");
        return v && typeof v === "object" ? v : {};
      } catch (_) {
        return {};
      }
    };
    const writeAccounts = () => {
      try {
        localStorage.setItem(ACCOUNT_KEY, JSON.stringify(accountVault));
      } catch (_) {
      }
    };
    const captureAccountState = () => {
      const state = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !accountVaultKeys.has(key)) state[key] = localStorage.getItem(key);
      }
      return state;
    };
    const saveCurrentAccount = () => {
      if (!currentAccountName) return;
      accountVault[currentAccountName] = __spreadProps(__spreadValues({}, accountVault[currentAccountName] || {}), { state: captureAccountState() });
      writeAccounts();
    };
    const clearLoadedState = () => {
      const remove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !accountVaultKeys.has(key)) remove.push(key);
      }
      remove.forEach((key) => localStorage.removeItem(key));
    };
    const loadAccountState = (account) => {
      clearLoadedState();
      for (const [key, value] of Object.entries((account == null ? void 0 : account.state) || {})) localStorage.setItem(key, value);
    };
    const accountStatus = (message) => {
      const el = document.querySelector("#accountStatus");
      if (el) el.textContent = message;
    };
    const accountRefreshUi = () => {
      const label = document.querySelector("#accountLabel");
      if (label) label.textContent = currentAccountName ? "ACCOUNT: " + currentAccountName : "ACCOUNT";
      const nameInput = document.querySelector("#playerNameInput");
      if (nameInput && !nameEditDirty) nameInput.value = playerName;
    };
    const accountApplyLoaded = () => {
      loadUpgrades();
      loadSocial();
      renderFriends();
      updateUpgradeUI();
      updateRankUI();
      accountRefreshUi();
      try {
        presencePeer == null ? void 0 : presencePeer.destroy();
      } catch (_) {
      }
      presencePeer = null;
      setTimeout(() => {
        initPresence();
        refreshFriends();
      }, 200);
    };
    const accountSnapshotTimer = setInterval(saveCurrentAccount, 2e3);
    window.addEventListener("pagehide", saveCurrentAccount);
    window.addEventListener("beforeunload", saveCurrentAccount);
    const accountOverlay = document.createElement("div");
    accountOverlay.id = "accountGate";
    accountOverlay.innerHTML = '<div class="accountCard"><div class="accountKicker">LOOSE POINT ACCOUNT</div><h2 id="accountHeading">CREATE YOUR ACCOUNT</h2><p id="accountDescription">Your progress is saved to this account on this device.</p><input id="accountNameInput" maxlength="16" autocomplete="username" placeholder="NAME"><input id="accountPasswordInput" type="password" autocomplete="new-password" placeholder="PASSWORD"><button id="accountSubmit">CREATE ACCOUNT</button><div id="accountKeyboard" aria-label="On-screen keyboard"></div><button id="accountSwitch" class="accountSecondary" hidden>USE ANOTHER ACCOUNT</button><button id="accountLogout" class="accountSecondary" hidden>LOG OUT</button><small id="accountStatus"></small></div>';
    document.body.appendChild(accountOverlay);
    const accountNameInput = accountOverlay.querySelector("#accountNameInput"), accountPasswordInput = accountOverlay.querySelector("#accountPasswordInput"), accountSubmit = accountOverlay.querySelector("#accountSubmit"), accountSwitch = accountOverlay.querySelector("#accountSwitch"), accountLogout = accountOverlay.querySelector("#accountLogout");
    const accountButton = document.createElement("button");
    accountButton.id = "accountLabel";
    accountButton.textContent = "ACCOUNT";
    document.body.appendChild(accountButton);
    const accountKeyboard = accountOverlay.querySelector("#accountKeyboard");
    let keyboardTarget = accountNameInput;
    const keyboardChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    accountKeyboard.innerHTML = keyboardChars.split("").map((ch) => '<button type="button" data-key="' + ch + '">' + ch + "</button>").join("") + '<button type="button" class="wide" data-key=" ">SPACE</button><button type="button" data-action="backspace">\u232B</button><button type="button" data-action="clear">CLEAR</button>';
    [accountNameInput, accountPasswordInput].forEach((field) => field.addEventListener("focus", () => {
      keyboardTarget = field;
    }));
    accountKeyboard.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const button = event.target.closest("button");
      if (!button) return;
      const max = keyboardTarget.maxLength > 0 ? keyboardTarget.maxLength : 64;
      if (button.dataset.action === "backspace") keyboardTarget.value = keyboardTarget.value.slice(0, -1);
      else if (button.dataset.action === "clear") keyboardTarget.value = "";
      else if (keyboardTarget.value.length < max) keyboardTarget.value += button.dataset.key || "";
      keyboardTarget.dispatchEvent(new Event("input", { bubbles: true }));
      keyboardTarget.focus();
    }, { passive: false });
    const showAccountGate = (mode = "login") => {
      accountOverlay.dataset.mode = mode;
      accountOverlay.hidden = false;
      accountSwitch.hidden = Object.keys(accountVault).length < 2;
      accountLogout.hidden = !currentAccountName;
      accountSubmit.textContent = mode === "create" ? "CREATE ACCOUNT" : "LOG IN";
      accountOverlay.querySelector("#accountHeading").textContent = mode === "create" ? "CREATE YOUR ACCOUNT" : "LOG IN";
      accountOverlay.querySelector("#accountDescription").textContent = mode === "create" ? "Your progress is saved to this account on this device." : "Choose an account and enter its password.";
      accountNameInput.value = mode === "login" && currentAccountName ? currentAccountName : "";
      accountPasswordInput.value = "";
      accountStatus("");
    };
    const enterAccount = (name) => {
      currentAccountName = name;
      localStorage.setItem(ACTIVE_ACCOUNT_KEY, name);
      loadAccountState(accountVault[name]);
      accountApplyLoaded();
      accountOverlay.hidden = true;
      accountRefreshUi();
    };
    accountSubmit.onclick = () => {
      const name = String(accountNameInput.value || "").replace(/[^a-zA-Z0-9 _-]/g, "").trim().slice(0, 16), password = String(accountPasswordInput.value || "");
      if (name.length < 3) {
        accountStatus("USE AT LEAST 3 CHARACTERS FOR YOUR NAME.");
        return;
      }
      if (password.length < 4) {
        accountStatus("USE AT LEAST 4 CHARACTERS FOR YOUR PASSWORD.");
        return;
      }
      if (accountOverlay.dataset.mode === "create") {
        if (Object.keys(accountVault).some((existing) => existing.toLowerCase() === name.toLowerCase())) {
          accountStatus("THAT ACCOUNT NAME IS ALREADY USED.");
          return;
        }
        saveCurrentAccount();
        accountVault[name] = { password: accountHash(password), state: captureAccountState() };
        writeAccounts();
        enterAccount(name);
        return;
      }
      const account = accountVault[name];
      if (!account || account.password !== accountHash(password)) {
        accountStatus("ACCOUNT NAME OR PASSWORD IS INCORRECT.");
        return;
      }
      enterAccount(name);
    };
    accountSwitch.onclick = () => showAccountGate("login");
    accountLogout.onclick = () => {
      saveCurrentAccount();
      currentAccountName = "";
      localStorage.removeItem(ACTIVE_ACCOUNT_KEY);
      showAccountGate("login");
      accountRefreshUi();
    };
    accountButton.onclick = () => {
      if (currentAccountName) showAccountGate("login");
      else showAccountGate("login");
    };
    accountVault = readAccounts();
    const activeAccount = localStorage.getItem(ACTIVE_ACCOUNT_KEY);
    if (activeAccount && accountVault[activeAccount]) {
      currentAccountName = activeAccount;
      accountApplyLoaded();
      accountOverlay.hidden = true;
    } else if (Object.keys(accountVault).length) {
      showAccountGate("login");
    } else {
      showAccountGate("create");
    }
    accountRefreshUi();
    const accountStyle = document.createElement("style");
    accountStyle.textContent = "#accountGate{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;background:rgba(8,10,18,.82);font-family:DM Mono,monospace}#accountGate[hidden]{display:none}#accountGate .accountCard{width:min(420px,calc(100vw - 32px));max-height:96vh;overflow-y:auto;padding:30px;background:#151617;color:#f5f5f5;border:3px solid #d8ff28;box-shadow:10px 10px #8da600;display:flex;flex-direction:column;gap:12px}.accountCard h2{margin:0;font:700 30px Georgia,serif}.accountCard p{color:#a8a8a8;margin:0 0 8px}.accountKicker{color:#d8ff28;font-weight:700;letter-spacing:2px}.accountCard input{background:#0d0e0e;color:#fff;border:1px solid #555;padding:13px;font:inherit}.accountCard button{border:0;padding:13px;font:700 14px inherit;cursor:pointer;background:#d8ff28;color:#141414}.accountCard .accountSecondary{background:#292a27;color:#eee}.accountCard small{min-height:18px;color:#ffc56b}#accountKeyboard{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:2px}#accountKeyboard button{padding:9px 2px;font-size:11px;text-align:center}#accountKeyboard button.wide{grid-column:span 3}#accountLabel{position:fixed;right:126px;top:18px;z-index:9000;background:#161817;color:#d8ff28;border:1px solid #d8ff28;padding:8px 10px;font:12px DM Mono,monospace;cursor:pointer}";
    document.head.appendChild(accountStyle);
    const settingsPanel = document.querySelector("#settingsPanel"), settingsButton = document.querySelector("#settingsButton"), closeSettings = document.querySelector("#closeSettings"), settingsAccountButton = document.querySelector("#settingsAccountButton");
    if (accountButton) accountButton.hidden = true;
    if (settingsButton) settingsButton.onclick = () => {
      if (settingsPanel) settingsPanel.hidden = false;
    };
    if (closeSettings) closeSettings.onclick = () => {
      if (settingsPanel) settingsPanel.hidden = true;
    };
    if (settingsPanel) settingsPanel.addEventListener("click", (event) => {
      if (event.target === settingsPanel) settingsPanel.hidden = true;
    });
    if (settingsAccountButton) settingsAccountButton.onclick = () => {
      if (settingsPanel) settingsPanel.hidden = true;
      showAccountGate(currentAccountName ? "login" : "login");
    };
    const touchSurface = document.querySelector("#game") || arena;
    const stopPageSwipe = (event) => {
      var _a2, _b2;
      if ((_b2 = (_a2 = event.target).closest) == null ? void 0 : _b2.call(_a2, "input,textarea,select")) return;
      event.preventDefault();
    };
    touchSurface == null ? void 0 : touchSurface.addEventListener("touchmove", stopPageSwipe, { passive: false });
    touchSurface == null ? void 0 : touchSurface.addEventListener("touchstart", (event) => {
      var _a2, _b2;
      if (!((_b2 = (_a2 = event.target).closest) == null ? void 0 : _b2.call(_a2, "input,textarea,select"))) event.stopPropagation();
    }, { passive: true });
    document.addEventListener("gesturestart", (event) => event.preventDefault(), { passive: false });
    const phoneFitResize = resize;
    resize = () => {
      phoneFitResize();
      const box = arena.getBoundingClientRect(), stage = document.querySelector("#gameViewport");
      if (stage && box.width <= 650) {
        const fit = Math.min(box.width / 1200, box.height / 570), fill = Math.max(box.width / 1200, box.height / 570);
        stage.style.transform = `translate(-50%,-50%) scale(${Math.min(fill, fit * 1.025)})`;
      }
    };
    const doorsGravityFlightUpdate = updateFighter;
    updateFighter = (f, dt) => {
      const inDoors = selectedArena.key === "doors";
      const oldX = f.x, oldVx = f.vx, oldSide = f.doorsGravitySide;
      doorsGravityFlightUpdate(f, dt);
      if (!inDoors || f.dead || f.away) return;
      const side = f.x < W / 2 ? -1 : 1;
      f.doorsGravitySide = side;
      if (oldSide && oldSide !== side) {
        f.wallStuck = false;
        f.onGround = false;
        if (Math.abs(f.vx) < 55) f.vx = side * 85;
      }
      if (side > 0) {
        f.vy -= 1250 * dt;
        const ceiling = borderSize + 46;
        if (f.y < ceiling) {
          f.y = ceiling;
          f.vy = Math.max(0, f.vy);
          f.wallStuck = false;
        }
      }
      if (Math.abs(f.x - oldX) < 0.02 && Math.abs(oldVx) > 75) {
        f.vx = -oldVx * 0.72;
        f.wallStuck = false;
      }
    };
    const doorsGravityFlightProjectiles = update;
    update = (dt) => {
      doorsGravityFlightProjectiles(dt);
      if (selectedArena.key !== "doors") return;
      const top = borderSize;
      for (const s of spears) if (!s.stuck && !s.stuckTo && s.x >= W / 2) {
        s.vy -= 1100 * dt;
        if (s.y < top) {
          s.y = top;
          s.vy = Math.max(0, s.vy);
        }
      }
    };
    let templeVines = [];
    const templeResetRound = resetRound;
    resetRound = () => {
      templeResetRound();
      if (selectedArena.key === "jungle") {
        templeVines = [{ x: W * 0.43, phase: 0, t: 0 }, { x: W * 0.57, phase: Math.PI, t: 0 }].map((v) => __spreadProps(__spreadValues({}, v), { max: H * 0.68, len: 0 }));
      } else templeVines = [];
    };
    const templeVineUpdate = updateFighter;
    updateFighter = (f, dt) => {
      templeVineUpdate(f, dt);
      if (selectedArena.key !== "jungle" || f.dead || f.away) return;
      if (f === localFighter()) for (const vine of templeVines) {
        vine.t += dt;
        vine.len = vine.max * (0.22 + 0.78 * ((Math.sin(vine.t * 0.62 + vine.phase) + 1) / 2));
      }
      for (const vine of templeVines) {
        const top = borderSize + 42, reach = top + vine.len;
        if (f.y < reach + 30 && f.y > top - 35 && Math.abs(f.x - vine.x) < 34) {
          const side = f.x < vine.x ? -1 : 1;
          f.x = vine.x + side * 38;
          f.vx = side * Math.max(90, Math.abs(f.vx) * 0.42);
          f.av += side * 0.8;
        }
      }
    };
    const templeVineProjectileUpdate = update;
    update = (dt) => {
      templeVineProjectileUpdate(dt);
      if (selectedArena.key !== "jungle") return;
      for (const vine of templeVines) {
        const top = borderSize + 42, reach = top + vine.len;
        for (const s of spears) {
          if (s.stuck || s.stuckTo) continue;
          if (s.x > vine.x - 28 && s.x < vine.x + 28 && s.y > top && s.y < reach) {
            s.x = vine.x + (s.x < vine.x ? -30 : 30);
            s.stuck = true;
            s.life = 12;
          }
        }
      }
    };
    const templeVineDraw = draw;
    draw = () => {
      templeVineDraw();
      if (selectedArena.key !== "jungle") return;
      ctx.save();
      for (const vine of templeVines) {
        const top = borderSize + 42, reach = top + vine.len, wiggle = Math.sin(vine.t * 0.9 + vine.phase) * 14;
        ctx.strokeStyle = "#214b2a";
        ctx.lineWidth = 27;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(vine.x, top - 20);
        ctx.bezierCurveTo(vine.x + wiggle, top + vine.len * 0.3, vine.x - wiggle, top + vine.len * 0.7, vine.x + wiggle * 0.4, reach);
        ctx.stroke();
        ctx.strokeStyle = "#4f8b43";
        ctx.lineWidth = 13;
        ctx.beginPath();
        ctx.moveTo(vine.x, top - 20);
        ctx.bezierCurveTo(vine.x + wiggle, top + vine.len * 0.3, vine.x - wiggle, top + vine.len * 0.7, vine.x + wiggle * 0.4, reach);
        ctx.stroke();
        for (let i = 0; i < Math.max(2, Math.floor(vine.len / 42)); i++) {
          const y = top + 18 + i * 42;
          const x = vine.x + Math.sin(vine.t * 0.9 + vine.phase + i) * 10;
          ctx.fillStyle = i % 2 ? "#75a94a" : "#9bc95b";
          ctx.beginPath();
          ctx.ellipse(x - 12, y, 14, 6, -0.55, 0, Math.PI * 2);
          ctx.ellipse(x + 12, y + 8, 14, 6, 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    };
    const baseLifeTierUpdate = updateFighter;
    updateFighter = (f, dt) => {
      applyLifeTier(f);
      baseLifeTierUpdate(f, dt);
      applyLifeTier(f);
    };
    const baseLifeTierUI = updateUpgradeUI;
    updateUpgradeUI = () => {
      baseLifeTierUI();
      const lives = playerLives(), el = document.querySelector("#lifeCount");
      if (el) el.innerHTML = renderLifeIcons(lives);
      const b = document.querySelector("#buyLifeButton");
      if (b) {
        const cost = LIFE_COSTS[lifeLevel];
        const mustBeatSpider = playerLives() === 8 && !ownedSkins.has("spider");
        b.textContent = mustBeatSpider ? "DEFEAT SPIDER AT 8 LIVES" : lifeLevel >= LIFE_MAX_LEVEL ? "MAXIMUM \u2014 10 LIVES" : "ADD ONE LIFE \u2014 \u25C9 " + cost;
        b.disabled = lifeLevel >= LIFE_MAX_LEVEL || playerCoins < cost || mustBeatSpider;
      }
    };
    document.querySelector("#buyLifeButton").onclick = () => {
      const cost = LIFE_COSTS[lifeLevel];
      if (lifeLevel >= LIFE_MAX_LEVEL || playerCoins < cost || playerLives() === 8 && !ownedSkins.has("spider")) return;
      playerCoins -= cost;
      lifeLevel++;
      saveUpgrades();
      sendLoadout();
      updateUpgradeUI();
    };
    const finalLifeSend = sendLoadout;
    sendLoadout = () => {
      finalLifeSend();
      if (netMode === "guest" && (conn == null ? void 0 : conn.open)) conn.send({ type: "prefs", color: selectedColor, maxHp: playerLives(), coins: playerCoins, skin: netSafeSkin(), rankXP });
    };
    const arenaPoolForRank = () => {
      const tier = rankTier();
      const beginner = /* @__PURE__ */ new Set(["snow", "jungle", "cave", "grass", "factory", "glass", "ruins", "neon", "halves", "doors"]);
      const iron = /* @__PURE__ */ new Set(["road", "space"]);
      return ARENAS.filter((a) => tier >= 3 || beginner.has(a.key) || tier >= 2 && iron.has(a.key));
    };
    const baseSpinArena = spinArena;
    spinArena = (forced = null, remote = false) => {
      const pool = arenaPoolForRank();
      if (!pool.length) return baseSpinArena(forced, remote);
      const chosen = forced == null ? ARENAS.indexOf(pool[Math.floor(Math.random() * pool.length)]) : forced;
      baseSpinArena(chosen, remote);
    };
    (_d = document.querySelector("#accountKeyboard")) == null ? void 0 : _d.remove();
    const sheepSuckUpdate = updateFighter;
    updateFighter = (f, dt) => {
      sheepSuckUpdate(f, dt);
      if (!f || f.skin !== "sheep" || f.dead || !f.sheepBite) return;
      const a = faceAngle(f), mx = f.x + Math.cos(a) * 43, my = f.y - 12 + Math.sin(a) * 43;
      for (const o of allFighters()) {
        if (o === f || o.dead || o.away) continue;
        const dx = mx - o.x, dy = my - (o.y - 16), d = Math.hypot(dx, dy) || 1, front = (dx * Math.cos(a) + dy * Math.sin(a)) / d;
        if (d < 205 && front > 0.15) {
          const pull = Math.max(0, 1 - d / 205) * 900;
          o.vx += dx / d * pull * dt;
          o.vy += dy / d * pull * dt;
        }
      }
    };
    const flubberReadyUpdate = update;
    update = (dt) => {
      flubberReadyUpdate(dt);
      for (const f of allFighters()) {
        if (f.skin !== "flubber" || f.dead || f.cooldown <= 0) continue;
        const active = spears.some((s) => s.owner === f && s.weapon === "flubberArm" && s.life > 0);
        if (!active) {
          f.throwsLeft = f.maxThrows || 2;
          f.hasSpear = true;
          f.cooldown = 0;
        }
      }
    };
    const tierResetRound = resetRound;
    resetRound = () => {
      tierResetRound();
      if (netMode === "local") {
        const lives = playerLives();
        bot.maxHp = bot.hp = Math.max(bot.hp, lives >= 7 ? Math.min(7, lives) : bot.hp);
        bot.hasLifeSplit = lives >= 7;
        bot.tripleShot = lives >= 9;
        bot.lifeShield = lives >= 10;
        bot.splitTimer = bot.hasLifeSplit ? 8 : 0;
      }
      for (const f of allFighters()) if (f !== bot) {
        f.lifeShield = false;
        f.tripleShot = false;
      }
    };
    const tierFighterUpdate = updateFighter;
    updateFighter = (f, dt) => {
      tierFighterUpdate(f, dt);
      if (netMode === "local") {
        const lives = playerLives(), boss = f === bot && !f.isClone;
        if (boss) {
          f.hasLifeSplit = lives >= 7;
          f.tripleShot = lives >= 9;
          f.lifeShield = lives >= 10;
          const target = faceAngle(f), current = Number.isFinite(f.lifeShieldAim) ? f.lifeShieldAim : target, turn = Math.atan2(Math.sin(target - current), Math.cos(target - current));
          f.lifeShieldAim = current + turn * Math.min(1, dt * 2.15);
        } else {
          f.tripleShot = false;
          f.lifeShield = false;
        }
      }
    };
    function smallBotShieldContact(f, x1, y1, x2, y2) {
      if (!(f == null ? void 0 : f.lifeShield) || f !== bot || f.isClone) return false;
      const a = Number.isFinite(f.lifeShieldAim) ? f.lifeShieldAim : faceAngle(f), cx = f.x + Math.cos(a) * 29, cy = f.y - 12 + Math.sin(a) * 29, cs = Math.cos(a), sn = Math.sin(a), mx = (x1 + x2) / 2 - cx, my = (y1 + y2) / 2 - cy, along = mx * cs + my * sn, side = -mx * sn + my * cs;
      return Math.abs(along) < 10 && Math.abs(side) < 19 && pointSegment(cx, cy, [x1, y1], [x2, y2]) < 24;
    }
    const preciseShieldBodyHit = bodyHit;
    bodyHit = (f, x1, y1, x2, y2) => {
      if (f == null ? void 0 : f.lifeShield) {
        const was = f.lifeShield;
        f.lifeShield = false;
        const body = preciseShieldBodyHit(f, x1, y1, x2, y2);
        f.lifeShield = was;
        return body || smallBotShieldContact(f, x1, y1, x2, y2);
      }
      return preciseShieldBodyHit(f, x1, y1, x2, y2);
    };
    const preciseShieldHit = hit;
    hit = (f, s) => {
      if (f == null ? void 0 : f.lifeShield) {
        if (smallBotShieldContact(f, s.x - (s.vx || 0) * 0.02, s.y - (s.vy || 0) * 0.02, s.x, s.y)) {
          const a = f.lifeShieldAim || faceAngle(f), nx = Math.cos(a), ny = Math.sin(a), speed = Math.hypot(s.vx, s.vy) || 360, dot = s.vx * nx + s.vy * ny;
          s.vx = (s.vx - 2 * dot * nx) * 0.9;
          s.vy = (s.vy - 2 * dot * ny) * 0.9;
          s.x += nx * 12;
          s.y += ny * 12;
          s.a = Math.atan2(s.vy, s.vx);
          s.stuck = false;
          s.stuckTo = null;
          s.life = Math.max(s.life, 2.5);
          shieldBurst(f);
          return;
        }
        const was = f.lifeShield;
        f.lifeShield = false;
        preciseShieldHit(f, s);
        f.lifeShield = was;
        return;
      }
      preciseShieldHit(f, s);
    };
    const preciseShieldDraw = drawFighter;
    drawFighter = (f) => {
      preciseShieldDraw(f);
      if (f !== bot || !f.lifeShield || f.dead) return;
      const a = f.lifeShieldAim || faceAngle(f);
      ctx.save();
      ctx.translate(f.x + Math.cos(a) * 29, f.y - 12 + Math.sin(a) * 29);
      ctx.rotate(a);
      ctx.fillStyle = "#6eb1ff";
      ctx.strokeStyle = "#e7f8ff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-7, -19, 14, 38, 6);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };
    const captainCleanDraw = drawFighter;
    drawFighter = (f) => {
      if (f.skin !== "captain") return captainCleanDraw(f);
      const a = faceAngle(f), rot = f.angle - (f.side === "player" ? 0 : Math.PI), base = "#c83238";
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(rot);
      ctx.strokeStyle = base;
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-3, 8);
      ctx.lineTo(-19, 39);
      ctx.moveTo(4, 8);
      ctx.lineTo(21, 39);
      ctx.moveTo(-3, -12);
      ctx.lineTo(-24, 5);
      ctx.moveTo(3, -12);
      ctx.lineTo(22, 3);
      ctx.stroke();
      ctx.fillStyle = base;
      ctx.fillRect(-9, -16, 18, 28);
      ctx.beginPath();
      ctx.arc(0, -35, 15, 0, Math.PI * 2);
      ctx.fill();
      if (!f.shieldOut) {
        const x = Math.cos(a - rot) * 33, y = -12 + Math.sin(a - rot) * 33;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(a - rot);
        ctx.fillStyle = "#c92f37";
        ctx.strokeStyle = "#f5f7ff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#2b64cb";
        ctx.beginPath();
        ctx.arc(0, 0, 17, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "bold 22px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("\u2605", 0, 1);
        ctx.restore();
      }
      ctx.restore();
    };
    const armyMagazineThrow = throwSpear;
    throwSpear = (f) => {
      if ((f == null ? void 0 : f.skin) !== "army") return armyMagazineThrow(f);
      if (!running || roundWait || f.dead || f.invisibleTime > 0 || (f.armyReload || 0) > 0 || (f.armyShotDelay || 0) > 0) return;
      if (!f.armyClipType || f.armyClipLeft <= 0) {
        const roll = Math.random();
        f.armyClipType = roll < 0.45 ? "bullet" : roll < 0.75 ? "knife" : "mine";
        f.armyClipLeft = f.armyClipType === "bullet" ? 4 : f.armyClipType === "knife" ? 2 : 1;
      }
      const weapon = f.armyClipType, a = faceAngle(f), speed = weapon === "bullet" ? 1250 : weapon === "knife" ? 850 : 620, damage = weapon === "bullet" ? 0.5 : 1;
      spears.push({ owner: f, weapon, x: f.x + Math.cos(a) * 34, y: f.y - 12 + Math.sin(a) * 34, vx: Math.cos(a) * speed + f.vx * 0.24, vy: Math.sin(a) * speed + f.vy * 0.12, a, spinA: a, damage, bouncesLeft: 0, stuck: false, life: weapon === "mine" ? 18 : 5, mineAge: 0, mineHidden: false });
      f.armyClipLeft--;
      f.armyShotIndex = weapon === "bullet" ? 1 : weapon === "knife" ? 2 : 3;
      f.armyShotDelay = weapon === "mine" ? 0.55 : 0.18;
      if (f.armyClipLeft <= 0) {
        f.armyReload = weapon === "bullet" ? 1.15 : weapon === "knife" ? 1.3 : 1.7;
        f.hasSpear = false;
      }
      beep(weapon === "bullet" ? 720 : weapon === "knife" ? 310 : 95, 0.08, weapon === "mine" ? "square" : "triangle", 0.045);
    };
    const armyMagazineUpdate = update;
    update = (dt) => {
      armyMagazineUpdate(dt);
      for (const f of allFighters()) if (f.skin === "army") {
        f.armyReload = Math.max(0, (f.armyReload || 0) - dt);
        f.armyShotDelay = Math.max(0, (f.armyShotDelay || 0) - dt);
        f.hasSpear = (f.armyReload || 0) <= 0;
      }
      for (const s of spears) if (s.weapon === "mine" && s.stuck && !s.stuckTo) {
        for (const target of allFighters()) {
          if (target === s.owner || target.dead || target.away) continue;
          const d = Math.hypot(target.x - s.x, target.y - 15 - s.y);
          if (d < 130) {
            const dx = target.x - s.x, dy = target.y - s.y, mag = Math.hypot(dx, dy) || 1;
            directDamage(s.owner, target, dx / mag, dy / mag, 620, Math.sign(dx || 1) * 9, "#ffd34d");
            s.life = 0;
            break;
          }
        }
      }
    };
    const armyKnifeDraw = drawSpear;
    drawSpear = (s) => {
      if (s.weapon !== "knife") return armyKnifeDraw(s);
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.a);
      ctx.fillStyle = "#533d2c";
      ctx.fillRect(-22, -4, 12, 8);
      ctx.fillStyle = "#cbd5dc";
      ctx.strokeStyle = "#27313a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-10, -6);
      ctx.lineTo(19, -3);
      ctx.lineTo(28, 0);
      ctx.lineTo(19, 3);
      ctx.lineTo(-10, 6);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };
    const automaticFreezeThrow = throwSpear;
    throwSpear = (f) => {
      var _a2;
      const auto = !!((f == null ? void 0 : f.hasFreezeAbility) && ((_a2 = f.freezeCharge) != null ? _a2 : 1) >= 0.999 && f.skin !== "acid" && !f.freezeArmed);
      if (auto) f.freezeArmed = true;
      const before = spears.length;
      automaticFreezeThrow(f);
      if (auto) {
        const made = spears.slice(before).filter((s) => s.owner === f);
        for (const s of made) {
          s.baseWeapon = s.weapon === "freeze" ? f.skin === "army" ? f.armyClipType || "bullet" : "spear" : s.weapon;
          s.weapon = "freeze";
          s.freeze = true;
        }
        f.freezeArmed = false;
        f.freezeCharge = 0;
      }
      updateFreezeButton();
    };
    const automaticFreezeSpecial = updateSpecial;
    updateSpecial = (f, dt) => {
      var _a2;
      if ((f == null ? void 0 : f.skin) === "acid" && f.hasFreezeAbility && ((_a2 = f.freezeCharge) != null ? _a2 : 1) >= 0.999) f.freezeArmed = true;
      automaticFreezeSpecial(f, dt);
    };
    const automaticFreezeButton = updateFreezeButton;
    updateFreezeButton = () => {
      var _a2;
      automaticFreezeButton();
      const me = localFighter(), ready = !!((me == null ? void 0 : me.hasFreezeAbility) && ((_a2 = me.freezeCharge) != null ? _a2 : 1) >= 0.999);
      const button = document.querySelector("#freezeButton");
      if (button) button.hidden = true;
      throwBtn.classList.toggle("freezeCharged", ready);
    };
    const automaticFreezeDraw = drawSpear;
    drawSpear = (s) => {
      if (s.weapon !== "freeze" || !s.baseWeapon) return automaticFreezeDraw(s);
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.a);
      ctx.strokeStyle = "#5be9ff";
      ctx.shadowColor = "#2caeff";
      ctx.shadowBlur = 12;
      ctx.lineWidth = 4;
      if (s.baseWeapon === "bullet") {
        ctx.fillStyle = "#ffe07a";
        ctx.fillRect(-12, -4, 24, 8);
        ctx.strokeRect(-12, -4, 24, 8);
      } else if (s.baseWeapon === "knife") {
        ctx.fillStyle = "#cbd5dc";
        ctx.fillRect(-12, -4, 26, 8);
        ctx.strokeRect(-12, -4, 26, 8);
      } else if (s.baseWeapon === "mine") {
        ctx.fillStyle = "#343b43";
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(-26, 0);
        ctx.lineTo(24, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(30, 0);
        ctx.lineTo(20, -7);
        ctx.lineTo(20, 7);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();
    };
    const flubberSlamHit = hit;
    hit = (f, s) => {
      if (s.weapon !== "flubberArm") return flubberSlamHit(f, s);
      if (f.dead || f.invisibleTime > 0 || s.owner === f || s.returning || s.stuck) return;
      s.stuck = true;
      s.stuckTo = f;
      s.embedX = 0;
      s.embedY = -12;
      s.grabTime = 0.38;
      s.slamPending = true;
      s.life = 1.2;
      f.stun = Math.max(f.stun, 0.38);
    };
    const flubberReturnUpdate = update;
    update = (dt) => {
      flubberReturnUpdate(dt);
      for (const s of spears) {
        if (s.weapon !== "flubberArm") continue;
        const owner = s.owner;
        if (!owner || owner.dead) {
          s.life = 0;
          continue;
        }
        if (s.slamPending && s.stuckTo) {
          s.grabTime -= dt;
          if (s.grabTime <= 0) {
            const target = s.stuckTo, other = spears.find((q) => q !== s && q.weapon === "flubberArm" && q.owner === owner && q.stuckTo === target && q.slamPending);
            if (!target.flubberSlammed) {
              target.flubberSlammed = true;
              target.y = ground - 43;
              target.vy = -280;
              directDamage(owner, target, Math.sign(target.x - owner.x) || 1, 1, 760, 9, owner.color || "#65df58");
              if (other) directDamage(owner, target, Math.sign(target.x - owner.x) || 1, 1, 980, 14, owner.color || "#65df58");
              setTimeout(() => {
                target.flubberSlammed = false;
              }, 80);
            }
            s.stuck = false;
            s.stuckTo = null;
            s.returning = true;
          }
        }
        if (s.stuck && !s.stuckTo) {
          s.stuck = false;
          s.returning = true;
        }
        if (s.returning) {
          const sx = owner.x + (s.armIndex === 1 ? 13 : -13), sy = owner.y - 10, dx = sx - s.x, dy = sy - s.y, d = Math.hypot(dx, dy) || 1;
          s.vx = dx / d * 1e3;
          s.vy = dy / d * 1e3;
          s.a = Math.atan2(s.vy, s.vx);
          if (d < 28) s.life = 0;
        }
      }
    };
    const doorResultFix = applyDoorToFighter;
    applyDoorToFighter = (f, d) => {
      doorResultFix(f, d);
      if ((d == null ? void 0 : d.type) === "danger" && f.dead) setTimeout(checkVictory, 40);
    };
    const finalHighLifeUpdate = updateFighter;
    updateFighter = (f, dt) => {
      finalHighLifeUpdate(f, dt);
      const boss = netMode === "local" && f === bot && !f.isClone, lives = playerLives();
      if (boss && lives !== 8) {
        f.hasLifeSplit = lives >= 7;
        f.tripleShot = lives >= 9;
        f.lifeShield = lives >= 10;
      } else {
        f.hasLifeSplit = false;
        f.tripleShot = false;
        f.lifeShield = false;
      }
    };
    const finalShieldDraw = drawFighter;
    drawFighter = (f) => {
      if (f !== bot || !f.lifeShield || f.dead) {
        finalShieldDraw(f);
        return;
      }
      const active = f.lifeShield;
      f.lifeShield = false;
      finalShieldDraw(f);
      f.lifeShield = active;
      const a = f.lifeShieldAim || faceAngle(f);
      ctx.save();
      ctx.translate(f.x + Math.cos(a) * 29, f.y - 12 + Math.sin(a) * 29);
      ctx.rotate(a);
      ctx.fillStyle = "#6eb1ff";
      ctx.strokeStyle = "#e7f8ff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-7, -19, 14, 38, 6);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };
    const captainThrownShieldDraw = drawSpear;
    drawSpear = (s) => {
      if (s.weapon !== "shield") return captainThrownShieldDraw(s);
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.a);
      ctx.shadowColor = "#78baff";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#c92f37";
      ctx.strokeStyle = "#f5f7ff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#2b64cb";
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 22px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("\u2605", 0, 1);
      ctx.restore();
    };
    const freezeWeaponFor = (f) => (f == null ? void 0 : f.skin) === "ninja" ? "star" : (f == null ? void 0 : f.skin) === "samurai" ? "katana" : (f == null ? void 0 : f.skin) === "snowman" ? "snowball" : (f == null ? void 0 : f.skin) === "web" ? "web" : (f == null ? void 0 : f.skin) === "phantom" ? "phantom" : (f == null ? void 0 : f.skin) === "spaceman" ? "asteroid" : (f == null ? void 0 : f.skin) === "flubber" ? "flubberArm" : (f == null ? void 0 : f.skin) === "army" ? f.armyClipType || "bullet" : "spear";
    const freezeAppearanceFix = throwSpear;
    throwSpear = (f) => {
      const before = spears.length;
      freezeAppearanceFix(f);
      for (const s of spears.slice(before)) if (s.owner === f && s.weapon === "freeze") s.baseWeapon = freezeWeaponFor(f);
    };
    const frozenWeaponRim = drawSpear;
    drawSpear = (s) => {
      if (s.weapon !== "freeze" || !s.baseWeapon) return frozenWeaponRim(s);
      const frozen = s.weapon;
      s.weapon = s.baseWeapon;
      frozenWeaponRim(s);
      s.weapon = frozen;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.strokeStyle = "#5be9ff";
      ctx.shadowColor = "#2caeff";
      ctx.shadowBlur = 11;
      ctx.lineWidth = 3;
      ctx.rotate(s.a || 0);
      const bw = s.baseWeapon || "spear";
      ctx.beginPath();
      if (bw === "bullet") {
        ctx.rect(-14, -5, 28, 10);
      } else if (bw === "knife") {
        ctx.moveTo(-15, -5);
        ctx.lineTo(15, 0);
        ctx.lineTo(-15, 5);
        ctx.closePath();
      } else if (bw === "mine") {
        ctx.roundRect(-13, -13, 26, 26, 5);
      } else if (bw === "star") {
        for (let i = 0; i < 8; i++) {
          const a = i * Math.PI / 4, r = i % 2 ? 7 : 18;
          const x = Math.cos(a) * r, y = Math.sin(a) * r;
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.closePath();
      } else {
        ctx.moveTo(-34, -5);
        ctx.lineTo(25, -5);
        ctx.lineTo(34, 0);
        ctx.lineTo(25, 5);
        ctx.lineTo(-34, 5);
        ctx.closePath();
      }
      ctx.stroke();
      ctx.restore();
    };
    if (!localStorage.getItem("loosePointUpgrades") && currentAccountName && accountVault[currentAccountName]) loadAccountState(accountVault[currentAccountName]);
    else if (!localStorage.getItem("loosePointUpgrades") && Object.keys(accountVault).length) loadAccountState(accountVault[Object.keys(accountVault)[0]]);
    currentAccountName = "";
    clearInterval(accountSnapshotTimer);
    accountOverlay == null ? void 0 : accountOverlay.remove();
    accountButton == null ? void 0 : accountButton.remove();
    settingsAccountButton == null ? void 0 : settingsAccountButton.remove();
    loadUpgrades();
    skinStats.spider = ["#e8e8ee", "\u25C9", "2 WEB ARMS", "PULL + 1 DAMAGE"];
    skinStats.tank = ["#53656b", "\u25B0", "1 SHELL", "3 DAMAGE + SPLASH"];
    skinStats.web[2] = "TRACKING WEB";
    skinStats.spider = ["#d9e8ef", "*", "6 ARMS", "PULL + 1 DAMAGE"];
    const characterApplySkin = applySkin;
    applySkin = (f, id) => {
      characterApplySkin(f, id);
      if (f.skin === "spider") {
        f.maxThrows = 1;
        f.throwsLeft = 1;
        f.hasSpear = true;
        f.spiderArmIndex = 0;
      }
      if (f.skin === "tank") {
        f.maxThrows = 1;
        f.throwsLeft = 1;
        f.hasSpear = true;
        f.tankReload = 0;
      }
    };
    const characterCards = updateUpgradeUI;
    updateUpgradeUI = () => {
      characterCards();
      document.querySelectorAll("#skinChoices .skinChoice").forEach((card, i) => {
        const item = skinShop[i];
        if ((item == null ? void 0 : item.id) === "spider") card.hidden = !ownedSkins.has("spider");
      });
      if (selectedSkin === "spider" && !ownedSkins.has("spider")) {
        selectedSkin = "classic";
        saveUpgrades();
      }
    };
    const characterResetRound = resetRound;
    resetRound = () => {
      characterResetRound();
      if (netMode === "local") {
        const lives = playerLives();
        if (lives === 8 && !ownedSkins.has("spider")) {
          applySkin(bot, "spider");
          bot.color = colors.red;
          bot.maxHp = bot.hp = 11;
          bot.difficulty = Math.max(4.2, bot.difficulty || 0);
          bot.hasLifeSplit = false;
          bot.tripleShot = false;
          bot.lifeShield = false;
          bot.splitTimer = 0;
        } else {
          applySkin(bot, "classic");
          bot.color = colors.red;
          bot.hasLifeSplit = lives >= 7;
          bot.tripleShot = lives >= 9;
          bot.lifeShield = lives >= 10;
          bot.splitTimer = bot.hasLifeSplit ? 8 : 0;
        }
      }
    };
    const characterSplitBoss = splitBoss;
    splitBoss = (boss) => {
      characterSplitBoss(boss);
      if ((boss == null ? void 0 : boss.skin) === "spider") for (const clone of extraFighters.filter((f) => f.isClone && f.splitParent === boss)) applySkin(clone, "spider");
    };
    const characterDefeat = markDefeated;
    markDefeated = (f) => {
      characterDefeat(f);
      if (netMode === "local" && f && (f === bot || f.isClone && f.splitParent === bot) && f.skin === "spider" && !ownedSkins.has("spider")) {
        ownedSkins.add("spider");
        saveUpgrades();
        updateUpgradeUI();
        const status = document.querySelector("#lobbyStatus");
        if (status) status.textContent = "SECRET UNLOCKED: SPIDER IS NOW FREE.";
        beep(820, 0.25, "sine", 0.07);
      }
    };
    const spiderBaseThrow = throwSpear;
    const spiderManThrow = (f) => {
      var _a2;
      if ((f == null ? void 0 : f.skin) !== "web") return spiderBaseThrow(f);
      if (!running || roundWait || f.dead || f.invisibleTime > 0 || !f.hasSpear || f.cooldown > 0) return;
      const a = faceAngle(f), armed = !!(f.freezeArmed && f.hasFreezeAbility && ((_a2 = f.freezeCharge) != null ? _a2 : 1) >= 0.999), tether = !armed && Math.random() < 0.15, weapon = armed ? "freeze" : tether ? "spiderTether" : "web";
      f.throwsLeft = 0;
      f.hasSpear = false;
      f.cooldown = 2.25;
      const s = { owner: f, weapon, baseWeapon: armed ? "spiderWeb" : weapon, x: f.x + Math.cos(a) * 36, y: f.y - 12 + Math.sin(a) * 36, vx: Math.cos(a) * 1080 + f.vx * 0.35, vy: Math.sin(a) * 1080 + f.vy * 0.2, a, spinA: a, stuck: false, life: armed ? 6 : tether ? 7 : 8, grabTime: 0, tetherTarget: null, wallTether: false };
      spears.push(s);
      if (armed) {
        f.freezeArmed = false;
        f.freezeCharge = 0;
        s.freeze = true;
      }
      beep(armed ? 540 : tether ? 780 : 620, 0.1, "sine", 0.05);
    };
    const spiderThrow = (f) => {
      var _a2;
      if ((f == null ? void 0 : f.skin) === "web") return spiderManThrow(f);
      if ((f == null ? void 0 : f.skin) !== "spider") return spiderBaseThrow(f);
      if (!running || roundWait || f.dead || f.invisibleTime > 0 || !f.hasSpear || f.cooldown > 0) return;
      const a = faceAngle(f), armed = !!(f.freezeArmed && f.hasFreezeAbility && ((_a2 = f.freezeCharge) != null ? _a2 : 1) >= 0.999);
      f.throwsLeft = 0;
      f.hasSpear = false;
      f.cooldown = 1.05;
      const armIndex = f.spiderArmIndex = (f.spiderArmIndex || 0) % 6;
      f.spiderArmIndex = (armIndex + 1) % 6;
      const s = { owner: f, weapon: armed ? "freeze" : "spiderArm", baseWeapon: "spiderArm", armIndex, x: f.x + Math.cos(a) * 27, y: f.y - 22 + Math.sin(a) * 27, vx: Math.cos(a) * 920 + f.vx * 0.3, vy: Math.sin(a) * 920 + f.vy * 0.18, a, spinA: a, stuck: false, life: armed ? 6 : 6, grabTime: 0, returnTimer: 0, armWall: false };
      spears.push(s);
      if (armed) {
        f.freezeArmed = false;
        f.freezeCharge = 0;
        s.weapon = "freeze";
        s.baseWeapon = "spiderArm";
        s.freeze = true;
      }
      beep(armed ? 540 : 260, 0.1, "sine", 0.05);
    };
    throwSpear = spiderThrow;
    const spiderHit = hit;
    hit = (target, s) => {
      if (s.weapon !== "spiderWeb" && s.weapon !== "spiderTether" && s.weapon !== "spiderArm" && !(s.weapon === "freeze" && (s.baseWeapon === "spiderWeb" || s.baseWeapon === "spiderArm"))) return spiderHit(target, s);
      if (target.dead || target.invisibleTime > 0 || s.owner === target || s.stuck) return;
      if (target.shieldTime > 0 || trojanShieldHit(target, s)) {
        spiderHit(target, s);
        return;
      }
      const owner = s.owner, dx = owner.x - target.x, dy = owner.y - 15 - (target.y - 15), d = Math.hypot(dx, dy) || 1;
      if (s.weapon === "freeze") {
        freezeFighter(target, owner, s);
        return;
      }
      s.stuck = true;
      s.stuckTo = target;
      s.tetherTarget = target;
      s.grabTime = s.weapon === "spiderArm" ? 0.72 : s.weapon === "spiderTether" ? 1.05 : 0.58;
      s.life = s.weapon === "spiderArm" ? 1.8 : s.weapon === "spiderTether" ? 1.8 : 1.4;
      directDamage(owner, target, -dx / d, -dy / d, s.weapon === "spiderTether" ? 210 : 120, Math.sign(-dx || 1) * (s.weapon === "spiderTether" ? 6 : 4), owner.color || "#dce6ff");
      if (s.weapon === "spiderTether" && !target.dead) {
        target.hp -= 1;
        target.stun = 0.7;
        target.blink = 0.35;
        if (target.hp <= 0) {
          owner.coins = (owner.coins || 0) + 3;
          markDefeated(target);
          setTimeout(checkVictory, 500);
        }
      }
    };
    const spiderUpdate = update;
    update = (dt) => {
      spiderUpdate(dt);
      for (const s of spears) {
        if (s.weapon !== "spiderWeb" && !(s.weapon === "freeze" && s.baseWeapon === "spiderWeb")) continue;
        if (s.stuckTo) {
          const owner = s.owner, target = s.stuckTo;
          if (!owner || !target || owner.dead || target.dead) {
            s.life = 0;
            continue;
          }
          const dx = owner.x - target.x, dy = owner.y - 15 - (target.y - 15), d = Math.hypot(dx, dy) || 1;
          target.vx += dx / d * 620 * dt;
          target.vy += dy / d * 420 * dt;
          s.grabTime -= dt;
          if (s.grabTime <= 0) {
            s.stuckTo = null;
            s.stuck = false;
            s.life = 0;
          }
        } else if (s.stuck && !s.spiderWall) {
          s.spiderWall = true;
          s.life = Math.min(s.life, 2.8);
        }
      }
    };
    const spiderDrawSpear = drawSpear;
    drawSpear = (s) => {
      if (s.weapon !== "spiderWeb" && s.weapon !== "spiderTether" && !(s.weapon === "freeze" && s.baseWeapon === "spiderWeb")) return spiderDrawSpear(s);
      const owner = s.owner, a = Math.atan2(s.y - ((owner == null ? void 0 : owner.y) - 12 || s.y), s.x - ((owner == null ? void 0 : owner.x) || s.x)), tether = s.weapon === "spiderTether";
      ctx.save();
      ctx.strokeStyle = s.weapon === "freeze" ? "#63e8ff" : tether ? "#f2f5ff" : "#f5f7ff";
      ctx.shadowColor = s.weapon === "freeze" ? "#37cfff" : tether ? "#ffffff" : "#dce6ff";
      ctx.shadowBlur = 10;
      ctx.lineWidth = tether ? 5 : 4;
      ctx.lineCap = "round";
      ctx.translate(s.x, s.y);
      ctx.rotate(s.a || a);
      if (tether) {
        ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.lineTo(24, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(4, 0, 8, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(-23, 0);
        for (let x = -23; x <= 26; x += 5) ctx.lineTo(x, Math.sin(x * 0.48) * 6);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(4, 0, 10, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
      if ((s.stuckTo || s.wallTether) && owner) {
        ctx.save();
        ctx.strokeStyle = s.weapon === "freeze" ? "#63e8ff" : tether ? "rgba(245,247,255,.9)" : "rgba(245,247,255,.8)";
        ctx.lineWidth = tether ? 4 : 5;
        ctx.setLineDash(tether ? [10, 6] : [7, 5]);
        ctx.beginPath();
        ctx.moveTo(owner.x + (s.armIndex === 1 ? 13 : -13), owner.y - 10);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        ctx.restore();
      }
    };
    const spiderDrawFighter = drawFighter;
    drawFighter = (f) => {
      if (f.skin !== "spider") return spiderDrawFighter(f);
      const held = f.hasSpear;
      f.hasSpear = false;
      spiderDrawFighter(f);
      f.hasSpear = held;
      const rot = f.angle - (f.side === "player" ? 0 : Math.PI), c = f.color || "#e8e8ee";
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(rot);
      ctx.strokeStyle = c;
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      for (const [sx, sy, ex, ey] of [[-8, -6, -38, -28], [8, -6, 38, -28], [-10, 3, -42, 12], [10, 3, 42, 12]]) {
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo((sx + ex) / 2, sy - 8, ex, ey);
        ctx.stroke();
      }
      ctx.fillStyle = "#18202d";
      ctx.beginPath();
      ctx.arc(0, -34, 17, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#f5f7ff";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.ellipse(-7, -36, 4, 7, -0.35, 0, Math.PI * 2);
      ctx.ellipse(7, -36, 4, 7, 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    const spiderTetherUpdate = update;
    update = (dt) => {
      spiderTetherUpdate(dt);
      for (const s of spears) {
        if (s.weapon !== "spiderTether") continue;
        const owner = s.owner;
        if (!owner || owner.dead) {
          s.life = 0;
          continue;
        }
        if (s.stuckTo) {
          const target = s.stuckTo;
          if (target.dead) {
            s.life = 0;
            continue;
          }
          const dx = target.x - owner.x, dy = target.y - 15 - (owner.y - 15), d = Math.hypot(dx, dy) || 1;
          owner.vx = dx / d * Math.max(520, Math.min(1120, d * 4.2));
          owner.vy = dy / d * Math.max(420, Math.min(980, d * 3.4));
          owner.av += (Math.sign(dx) || 1) * dt * 2.8;
          if (d < 48) {
            s.life = 0;
            owner.vx *= 0.22;
            owner.vy *= 0.22;
          }
        } else if (s.wallTether) {
          const dx = s.wallX - owner.x, dy = s.wallY - (owner.y - 15), d = Math.hypot(dx, dy) || 1;
          owner.vx = dx / d * Math.max(500, Math.min(1080, d * 4.1));
          owner.vy = dy / d * Math.max(400, Math.min(920, d * 3.2));
          if (d < 42) {
            s.life = 0;
            owner.vx *= 0.2;
            owner.vy *= 0.2;
          }
        } else if (!s.stuck) {
          const rivals = allFighters().filter((f) => f !== owner && !f.dead && !f.away);
          let best = null;
          for (const target of rivals) {
            const dx = target.x - s.x, dy = target.y - 15 - s.y, d = Math.hypot(dx, dy) || 1, delta = Math.atan2(Math.sin(Math.atan2(dy, dx) - s.a), Math.cos(Math.atan2(dy, dx) - s.a));
            if (d < 520 && Math.abs(delta) < 0.6 && (!best || d < best.d)) best = { d, delta };
          }
          if (best) {
            const turn = Math.max(-0.16 * dt, Math.min(0.16 * dt, best.delta * 0.22));
            s.a += turn;
            const speed = Math.hypot(s.vx, s.vy) || 940;
            s.vx = Math.cos(s.a) * speed;
            s.vy = Math.sin(s.a) * speed;
          }
        } else if (s.stuck && !s.wallTether) {
          s.wallTether = true;
          s.wallX = s.x;
          s.wallY = s.y;
          s.stuck = false;
          s.life = 1.8;
          beep(175, 0.08, "triangle", 0.04);
        }
      }
    };
    function tankBlast(owner, x, y, primary) {
      if (!owner) return;
      const affected = /* @__PURE__ */ new Set();
      if (primary && !primary.dead) {
        const dx = primary.x - owner.x, dy = primary.y - owner.y, d = Math.hypot(dx, dy) || 1;
        if (!(primary.shieldTime > 0 || trojanShieldHit(primary, { x, y, vx: dx, vy: dy }))) {
          directDamage(owner, primary, dx / d, dy / d, 330, Math.sign(dx || 1) * 7, owner.color || "#ffbd5a");
          if (!primary.dead) {
            primary.hp -= 2;
            if (primary.hp <= 0) {
              markDefeated(primary);
              setTimeout(checkVictory, 350);
            }
          }
        }
        affected.add(primary);
      }
      for (const target of allFighters()) {
        if (target === owner || target.dead || target.away || affected.has(target)) continue;
        const dx = target.x - x, dy = target.y - 15 - y, d = Math.hypot(dx, dy) || 1;
        if (d < 105) directDamage(owner, target, dx / d, dy / d, 260, Math.sign(dx || 1) * 5, "#ffbd5a");
      }
      if (Math.hypot(owner.x - x, owner.y - 15 - y) < 88 && !owner.dead) {
        owner.hp--;
        owner.blink = 0.5;
        owner.vy = -260;
        if (owner.hp <= 0) {
          markDefeated(owner);
          setTimeout(checkVictory, 350);
        }
      }
      for (let i = 0; i < 34; i++) particles.push({ x, y, vx: (Math.random() - 0.5) * 470, vy: -80 - Math.random() * 360, life: 0.35 + Math.random() * 0.55, c: i % 2 ? "#ffb34f" : "#fff0a8", r: 2 + Math.random() * 5 });
      shake = Math.max(shake, 18);
      beep(80, 0.24, "square", 0.08);
    }
    const tankThrow = throwSpear;
    throwSpear = (f) => {
      var _a2;
      if ((f == null ? void 0 : f.skin) !== "tank") return tankThrow(f);
      if (!running || roundWait || f.dead || f.invisibleTime > 0 || !f.hasSpear || f.cooldown > 0) return;
      const a = faceAngle(f), armed = !!(f.freezeArmed && f.hasFreezeAbility && ((_a2 = f.freezeCharge) != null ? _a2 : 1) >= 0.999);
      f.hasSpear = false;
      f.throwsLeft = 0;
      f.cooldown = 2.9;
      f.tankReload = 2.9;
      const s = { owner: f, weapon: armed ? "freeze" : "tankShell", baseWeapon: "tankShell", x: f.x + Math.cos(a) * 35, y: f.y - 12 + Math.sin(a) * 35, vx: Math.cos(a) * 560 + f.vx * 0.2, vy: Math.sin(a) * 560 + f.vy * 0.1, a, stuck: false, life: 10, exploded: false };
      spears.push(s);
      if (armed) {
        f.freezeArmed = false;
        f.freezeCharge = 0;
        s.freeze = true;
      }
      beep(armed ? 540 : 125, 0.18, "square", 0.06);
    };
    const tankHit = hit;
    hit = (target, s) => {
      if (s.weapon !== "tankShell" && !(s.weapon === "freeze" && s.baseWeapon === "tankShell")) return tankHit(target, s);
      if (target.shieldTime > 0 || trojanShieldHit(target, s)) {
        tankHit(target, s);
        return;
      }
      if (!s.exploded) {
        s.exploded = true;
        tankBlast(s.owner, s.x, s.y, target);
        s.life = 0;
        s.stuck = true;
      }
    };
    const tankUpdate = update;
    update = (dt) => {
      tankUpdate(dt);
      for (const f of allFighters()) if (f.skin === "tank") {
        f.tankReload = Math.max(0, (f.tankReload || 0) - dt);
        if (f.tankReload <= 0 && !f.dead) {
          f.hasSpear = true;
          f.throwsLeft = 1;
        }
      }
      for (const s of spears) if ((s.weapon === "tankShell" || s.weapon === "freeze" && s.baseWeapon === "tankShell") && s.stuck && !s.exploded) {
        s.exploded = true;
        tankBlast(s.owner, s.x, s.y, null);
        s.life = 0;
      }
    };
    const tankDrawSpear = drawSpear;
    drawSpear = (s) => {
      if (s.weapon !== "tankShell" && !(s.weapon === "freeze" && s.baseWeapon === "tankShell")) return tankDrawSpear(s);
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.a);
      ctx.fillStyle = s.weapon === "freeze" ? "#ffd66d" : "#40535b";
      ctx.strokeStyle = s.weapon === "freeze" ? "#5be9ff" : "#dce7ea";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#20292d";
      ctx.beginPath();
      ctx.arc(-4, -3, 3, 0, Math.PI * 2);
      ctx.arc(5, 4, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    const tankDrawFighter = drawFighter;
    drawFighter = (f) => {
      if (f.skin !== "tank") return tankDrawFighter(f);
      const held = f.hasSpear;
      f.hasSpear = false;
      tankDrawFighter(f);
      f.hasSpear = held;
      const rot = f.angle - (f.side === "player" ? 0 : Math.PI), c = f.color || "#53656b", a = faceAngle(f) - rot;
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(rot);
      ctx.fillStyle = "#20282d";
      ctx.fillRect(-27, 12, 54, 24);
      ctx.fillStyle = c;
      ctx.fillRect(-24, -8, 48, 27);
      ctx.fillStyle = "#1b2328";
      ctx.fillRect(-13, -24, 26, 18);
      ctx.save();
      ctx.translate(Math.cos(a) * 16, -15 + Math.sin(a) * 16);
      ctx.rotate(a);
      ctx.fillStyle = "#26343b";
      ctx.fillRect(0, -5, 39, 10);
      ctx.fillStyle = "#d1dee2";
      ctx.fillRect(34, -3, 8, 6);
      ctx.restore();
      ctx.fillStyle = "#111";
      ctx.fillRect(-22, 32, 14, 5);
      ctx.fillRect(8, 32, 14, 5);
      ctx.restore();
    };
    const spiderArmUpdate = update;
    update = (dt) => {
      spiderArmUpdate(dt);
      for (const s of spears) {
        if (s.weapon !== "spiderArm") continue;
        const owner = s.owner;
        if (!owner || owner.dead) {
          s.life = 0;
          continue;
        }
        if (s.stuckTo) {
          const target = s.stuckTo;
          if (target.dead) {
            s.life = 0;
            continue;
          }
          const dx = owner.x - target.x, dy = owner.y - 15 - (target.y - 15), d = Math.hypot(dx, dy) || 1;
          target.vx += dx / d * 720 * dt;
          target.vy += dy / d * 500 * dt;
          s.grabTime -= dt;
          if (s.grabTime <= 0) {
            s.stuckTo = null;
            s.stuck = false;
            s.life = 1.8;
            s.vx = dx / d * 760;
            s.vy = dy / d * 760;
            s.a = Math.atan2(s.vy, s.vx);
          }
        } else if (s.stuck && !s.armWall) {
          s.armWall = true;
          s.returnTimer = 0.9;
          s.armX = s.x;
          s.armY = s.y;
        } else if (s.armWall) {
          s.returnTimer -= dt;
          if (s.returnTimer <= 0) {
            const dx = owner.x - s.x, dy = owner.y - 20 - s.y, d = Math.hypot(dx, dy) || 1;
            s.stuck = false;
            s.armWall = false;
            s.life = 2.2;
            s.vx = dx / d * 840;
            s.vy = dy / d * 840;
            s.a = Math.atan2(s.vy, s.vx);
          }
        }
      }
    };
    const spiderArmDrawSpear = drawSpear;
    drawSpear = (s) => {
      if (s.weapon !== "spiderArm" && !(s.weapon === "freeze" && s.baseWeapon === "spiderArm")) return spiderArmDrawSpear(s);
      const owner = s.owner, freeze = s.weapon === "freeze";
      ctx.save();
      ctx.strokeStyle = freeze ? "#63e8ff" : (owner == null ? void 0 : owner.color) || "#d9e8ef";
      ctx.shadowColor = freeze ? "#37cfff" : "#d9e8ef";
      ctx.shadowBlur = 9;
      ctx.lineWidth = freeze ? 5 : 7;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(s.x - 22, s.y);
      ctx.lineTo(s.x + 18, s.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(s.x + 20, s.y, 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      if (owner && (s.stuckTo || s.armWall)) {
        ctx.save();
        ctx.strokeStyle = freeze ? "#63e8ff" : owner.color || "#d9e8ef";
        ctx.lineWidth = 5;
        ctx.setLineDash([6, 5]);
        ctx.beginPath();
        ctx.moveTo(owner.x, owner.y - 20);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        ctx.restore();
      }
    };
    const spiderArmDrawFighter = drawFighter;
    drawFighter = (f) => {
      if (f.skin !== "spider") return spiderArmDrawFighter(f);
      const rot = f.angle - (f.side === "player" ? 0 : Math.PI), c = f.color || "#d9e8ef", shot = spears.find((q) => q.owner === f && q.weapon === "spiderArm" && !q.stuckTo && !q.armWall);
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(rot);
      ctx.strokeStyle = c;
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.fillStyle = "#17232a";
      ctx.beginPath();
      ctx.arc(0, -34, 17, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = c;
      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + i * Math.PI / 3, sx = Math.cos(a) * 8, sy = -22 + Math.sin(a) * 8, ex = Math.cos(a) * 40, ey = -22 + Math.sin(a) * 40;
        if (shot && i === shot.armIndex) {
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(shot.x - f.x, shot.y - f.y);
          ctx.stroke();
          continue;
        }
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(Math.cos(a) * 25, sy - 4, ex, ey);
        ctx.stroke();
      }
      ctx.restore();
    };
    const tankRealDrawFighter = drawFighter;
    drawFighter = (f) => {
      if (f.skin !== "tank") return tankRealDrawFighter(f);
      const rot = f.angle - (f.side === "player" ? 0 : Math.PI), c = f.color || "#53656b", a = faceAngle(f);
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(rot);
      ctx.fillStyle = "#1d2529";
      ctx.fillRect(-31, 12, 62, 14);
      for (const x of [-22, -8, 8, 22]) {
        ctx.fillStyle = "#070b0d";
        ctx.beginPath();
        ctx.arc(x, 20, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#788b91";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.fillStyle = c;
      ctx.strokeStyle = "#d3e0e3";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-27, -7, 54, 27, 5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#374b52";
      ctx.beginPath();
      ctx.arc(0, -10, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      const ba = a - rot;
      ctx.save();
      ctx.rotate(ba);
      ctx.fillStyle = "#293a41";
      ctx.fillRect(3, -4, 44, 8);
      ctx.fillStyle = "#c9d8db";
      ctx.fillRect(42, -3, 8, 6);
      ctx.restore();
      ctx.restore();
    };
    skinStats.porcupine = ["#6e7f8a", "\u2739", "FIVE SPIKES", "CURL SHIELD"];
    const lpThorPorcApplySkin = applySkin;
    applySkin = (f, id) => {
      lpThorPorcApplySkin(f, id);
      if (f.skin === "gladiator") {
        f.maxThrows = 2;
        f.throwsLeft = 2;
        f.hasSpear = false;
        f.thorCharges = 2;
        f.thorReload = 0;
        f.thorZap = 0;
      }
      if (f.skin === "porcupine") {
        f.maxThrows = 1;
        f.throwsLeft = 1;
        f.hasSpear = true;
        f.porcupineSpikesLoaded = true;
        f.porcupineReload = 0;
        f.porcupineCurl = 0;
      }
    };
    const lpThorPorcThrow = throwSpear;
    throwSpear = (f) => {
      if ((f == null ? void 0 : f.skin) === "gladiator") {
        if (!running || roundWait || f.dead || f.invisibleTime > 0 || f.thorCharges <= 0 || f.thorReload > 0) return;
        const a = faceAngle(f), m = macePosition(f), speed = Math.min(W, H) * 1.05 + 260;
        f.thorCharges = Math.max(0, f.thorCharges - 1);
        f.throwsLeft = f.thorCharges;
        f.hasSpear = f.thorCharges > 0;
        if (f.thorCharges <= 0) f.thorReload = 2.2;
        spears.push({ owner: f, weapon: "thorLightning", x: m.x, y: m.y, vx: Math.cos(a) * speed + f.vx * 0.2, vy: Math.sin(a) * speed + f.vy * 0.1, a, spinA: a, stuck: false, life: 3.2, curve: 0.58 });
        beep(520, 0.13, "sine", 0.06);
        return;
      }
      if ((f == null ? void 0 : f.skin) === "porcupine") {
        if (!running || roundWait || f.dead || f.invisibleTime > 0 || f.porcupineReload > 0) return;
        if (!f.porcupineSpikesLoaded) {
          f.porcupineCurl = 4.5;
          return;
        }
        const a = faceAngle(f) + Math.PI, angles = [-0.78, -0.39, 0, 0.39, 0.78];
        f.porcupineSpikesLoaded = false;
        f.hasSpear = false;
        f.throwsLeft = 0;
        f.porcupineReload = 2.15;
        f.cooldown = 2.15;
        angles.forEach((off, i) => {
          const q = a + off, speed = Math.min(W, H) * 1.15 + 300;
          spears.push({ owner: f, weapon: "porcupineSpike", x: f.x + Math.cos(q) * 25, y: f.y - 20 + Math.sin(q) * 25, vx: Math.cos(q) * speed + f.vx * 0.15, vy: Math.sin(q) * speed + f.vy * 0.1, a: q, spinA: q, stuck: false, life: 4.2, spikeIndex: i });
        });
        beep(330, 0.16, "triangle", 0.06);
        return;
      }
      lpThorPorcThrow(f);
    };
    const lpThorPorcUpdateFighter = updateFighter;
    updateFighter = (f, dt) => {
      lpThorPorcUpdateFighter(f, dt);
      if (f.skin === "gladiator") {
        f.thorReload = Math.max(0, (f.thorReload || 0) - dt);
        f.thorZap = Math.max(0, (f.thorZap || 0) - dt);
        if (f.thorReload <= 0 && f.thorCharges <= 0 && !f.dead) {
          f.thorCharges = 2;
          f.throwsLeft = 2;
          f.hasSpear = false;
        }
        f.hasSpear = f.thorCharges > 0 && f.thorReload <= 0;
        f.throwsLeft = Math.max(0, f.thorCharges || 0);
        if (f === player && running) {
          document.querySelector("#ammoLabel").textContent = f.thorReload > 0 ? "HAMMER LOADING" : String(f.thorCharges || 0) + " LIGHTNING READY";
          throwBtn.classList.toggle("cooldown", f.thorReload > 0);
        }
      }
      if (f.skin === "porcupine") {
        f.porcupineReload = Math.max(0, (f.porcupineReload || 0) - dt);
        f.porcupineCurl = Math.max(0, (f.porcupineCurl || 0) - dt);
        if (f.porcupineReload <= 0) {
          f.porcupineSpikesLoaded = true;
          f.hasSpear = true;
          f.throwsLeft = 1;
        } else {
          f.hasSpear = false;
          f.throwsLeft = 0;
        }
        if (f === player && running) {
          document.querySelector("#ammoLabel").textContent = f.porcupineCurl > 0 ? "CURLED SHIELD" : f.porcupineSpikesLoaded ? "SPIKES READY" : "SPIKES LOADING";
          throwBtn.classList.toggle("cooldown", f.porcupineReload > 0);
        }
      }
    };
    const lpThorPorcHit = hit;
    hit = (target, s) => {
      if (s.weapon === "thorLightning") {
        if (target.dead || target.invisibleTime > 0 || s.owner === target) return;
        if (target.shieldTime > 0 || trojanShieldHit(target, s)) {
          lpThorPorcHit(target, s);
          return;
        }
        const dx = s.vx, dy = s.vy, d = Math.hypot(dx, dy) || 1, old = s.owner.damageOverride;
        s.owner.damageOverride = 1;
        directDamage(s.owner, target, dx / d, dy / d, 560, Math.sign(dx || 1) * 7, "#63ddff");
        s.owner.damageOverride = old;
        if (!target.dead) {
          s.stuck = true;
          s.stuckTo = target;
          s.embedX = 0;
          s.embedY = -12;
          s.embedAngle = s.a - target.angle;
          s.life = 1.1;
          target.thorZap = 1;
        }
        return;
      }
      if (s.weapon === "porcupineSpike" && target.skin === "porcupine" && target.porcupineSpikesLoaded && target.porcupineCurl <= 0 && s.owner !== target) {
        const dx = s.vx, dy = s.vy, d = Math.hypot(dx, dy) || 1;
        deflectProjectile(target, s);
        directDamage(target, s.owner, dx / d, dy / d, 360, Math.sign(dx || 1) * 6, "#e9d78b");
        return;
      }
      if (s.weapon === "freeze" && s.baseWeapon === "flubberArm" && !target.dead && s.owner !== target) {
        freezeFighter(target, s.owner, s);
        return;
      }
      lpThorPorcHit(target, s);
    };
    const lpThorPorcUpdate = update;
    update = (dt) => {
      var _a2, _b2, _c2, _d2;
      for (const s of spears) if (s.weapon === "thorLightning" && !s.stuck && s.owner && !s.owner.dead) {
        const foes = allFighters().filter((o) => o !== s.owner && !o.dead && !o.away).map((o) => ({ o, d: Math.hypot(o.x - s.x, o.y - s.y) })).filter((v) => v.d < 430).sort((a, b) => a.d - b.d);
        if (foes.length) {
          const desired = Math.atan2(foes[0].o.y - s.y, foes[0].o.x - s.x), cur = Math.atan2(s.vy, s.vx), delta = Math.atan2(Math.sin(desired - cur), Math.cos(desired - cur)), next = cur + Math.max(-s.curve * dt, Math.min(s.curve * dt, delta)), speed = Math.hypot(s.vx, s.vy) || 560;
          s.vx = Math.cos(next) * speed;
          s.vy = Math.sin(next) * speed;
          s.a = next;
        }
      }
      lpThorPorcUpdate(dt);
      for (const s of spears) if ((s.weapon === "freeze" || s.weapon === "spear") && (s.baseWeapon === "flubberArm" || s.baseWeapon === "spiderArm") && !s.freezeTarget && !s.stuckTo) {
        if (s.stuck) {
          s.weapon = "freeze";
          s.freeze = true;
          s.returnTimer = (s.returnTimer || 0.25) - dt;
          if (s.returnTimer <= 0) {
            s.stuck = false;
            s.armWall = false;
            s.life = 2.2;
            const dx = (((_a2 = s.owner) == null ? void 0 : _a2.x) || s.x) - s.x, dy = (((_b2 = s.owner) == null ? void 0 : _b2.y) || s.y - 20) - s.y, d = Math.hypot(dx, dy) || 1;
            s.vx = dx / d * 820;
            s.vy = dy / d * 820;
            s.a = Math.atan2(s.vy, s.vx);
          }
        } else if (s.returnTimer != null) {
          s.returnTimer -= dt;
          const dx = (((_c2 = s.owner) == null ? void 0 : _c2.x) || s.x) - s.x, dy = (((_d2 = s.owner) == null ? void 0 : _d2.y) || s.y - 20) - s.y;
          if (Math.hypot(dx, dy) < 32) s.life = 0;
        }
      }
    };
    const lpThorPorcDrawSpear = drawSpear;
    drawSpear = (s) => {
      var _a2;
      if (s.weapon === "thorLightning") {
        const m = s.owner ? macePosition(s.owner) : { x: s.x, y: s.y }, a = Math.atan2(s.y - m.y, s.x - m.x), dist = Math.hypot(s.x - m.x, s.y - m.y);
        ctx.save();
        ctx.strokeStyle = "#bff7ff";
        ctx.shadowColor = "#36dfff";
        ctx.shadowBlur = 15;
        ctx.lineWidth = 5;
        ctx.beginPath();
        for (let i = 0; i <= 8; i++) {
          const t = i / 8, px = m.x + Math.cos(a) * dist * t, py = m.y + Math.sin(a) * dist * t + (i % 2 ? Math.sin(i * 5 + last * 0.03) * 8 : 0);
          i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        return;
      }
      if (s.weapon === "porcupineSpike") {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.a);
        ctx.strokeStyle = ((_a2 = s.owner) == null ? void 0 : _a2.color) || "#d9e2e8";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-18, 0);
        ctx.lineTo(16, 0);
        ctx.stroke();
        ctx.fillStyle = "#f2df9b";
        ctx.beginPath();
        ctx.moveTo(25, 0);
        ctx.lineTo(10, -6);
        ctx.lineTo(14, 6);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        return;
      }
      lpThorPorcDrawSpear(s);
    };
    const lpThorPorcDrawFighter = drawFighter;
    drawFighter = (f) => {
      if (f.skin !== "porcupine") return lpThorPorcDrawFighter(f);
      if (f.dead && f.hideCorpse) return;
      const c = f.color || "#6e7f8a", rot = f.angle - (f.side === "player" ? 0 : Math.PI), bob = Math.sin(f.wobble) * 2, curled = f.porcupineCurl > 0;
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(rot);
      ctx.fillStyle = "rgba(20,25,30,.16)";
      ctx.beginPath();
      ctx.ellipse(0, 37, 30, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = c;
      ctx.strokeStyle = "#d8e6e8";
      ctx.lineWidth = 2;
      if (curled) {
        ctx.beginPath();
        ctx.arc(0, -8, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.ellipse(0, -8, 29, 33, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = "#c8d4da";
        ctx.lineWidth = 6;
        for (const side of [-1, 1]) {
          ctx.beginPath();
          ctx.moveTo(side * 12, 10);
          ctx.lineTo(side * 22, 39 + bob);
          ctx.stroke();
        }
        for (let i = 0; i < 10; i++) {
          const a = -Math.PI * 0.95 + i * (Math.PI * 1.9 / 9), x = Math.cos(a) * 28, y = -14 + Math.sin(a) * 27;
          ctx.strokeStyle = "#e8d995";
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(x * 0.72, y * 0.72);
          ctx.lineTo(x * 1.18, y * 1.18);
          ctx.stroke();
        }
      }
      ctx.restore();
      for (let i = 0; i < Math.max(0, Math.ceil(f.hp)); i++) {
        ctx.fillStyle = c;
        ctx.fillRect(f.x - (f.maxHp * 14 - 4) / 2 + i * 14, f.y - 78, 10, 4);
      }
    };
    const lpThorPorcDrawSpecial = drawSpecial;
    drawSpecial = (f) => {
      lpThorPorcDrawSpecial(f);
      if (f.skin === "porcupine" && !f.dead && f.porcupineCurl > 0) {
        ctx.save();
        ctx.strokeStyle = "#f5e29c";
        ctx.shadowColor = "#f5e29c";
        ctx.shadowBlur = 14;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(f.x, f.y - 8, 36, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      if (f.skin === "gladiator" && f.thorZap > 0 && !f.dead) {
        ctx.save();
        ctx.strokeStyle = "#d7f8ff";
        ctx.shadowColor = "#58dcff";
        ctx.shadowBlur = 12;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(f.x - 18, f.y - 30);
        ctx.lineTo(f.x - 5, f.y - 16);
        ctx.lineTo(f.x - 16, f.y - 2);
        ctx.lineTo(f.x + 3, f.y + 13);
        ctx.lineTo(f.x + 16, f.y - 3);
        ctx.stroke();
        ctx.restore();
      }
    };
    const lpThorPorcSplitThrow = throwSpear;
    throwSpear = (f) => {
      var _a2, _b2;
      const special = (f == null ? void 0 : f.skin) === "spider" || (f == null ? void 0 : f.skin) === "flubber", unsupported = special, before = spears.length, split = special && f.splitArmed && f.hasSplitAbility && ((_a2 = f.splitCharge) != null ? _a2 : 1) >= 0.999, freeze = (f == null ? void 0 : f.skin) === "flubber" && f.freezeArmed && f.hasFreezeAbility && ((_b2 = f.freezeCharge) != null ? _b2 : 1) >= 0.999;
      if (freeze) f.freezeArmed = false;
      lpThorPorcSplitThrow(f);
      const made = spears.slice(before).filter((s) => s.owner === f && (s.weapon === "flubberArm" || s.weapon === "spiderArm" || s.weapon === "freeze" && s.baseWeapon));
      if (freeze && made.length && f.skin === "flubber") {
        const s = made[0];
        s.weapon = "freeze";
        s.baseWeapon = "flubberArm";
        s.freeze = true;
        f.freezeCharge = 0;
      }
      if (split && made.length) {
        const source = made[0];
        source.splitShot = true;
        const base = Math.atan2(source.vy, source.vx), speed = Math.hypot(source.vx, source.vy) || 760;
        for (let i = 1; i < 3; i++) {
          const q = base + (i === 1 ? -0.2 : 0.2), copy = __spreadProps(__spreadValues({}, source), { x: source.x, y: source.y, vx: Math.cos(q) * speed, vy: Math.sin(q) * speed, a: q, spinA: q, stuck: false, stuckTo: null, life: source.life, armWall: false, returnTimer: 0, splitShot: true });
          spears.push(copy);
        }
        f.splitArmed = false;
        f.splitCharge = 0;
      }
      if (unsupported) {
        for (const s of spears.slice(before)) if (s.owner === f) s.ricochet = false;
      }
    };
    const lpThorPorcRicoButton = updateRicochetButton;
    updateRicochetButton = () => {
      const me = localFighter();
      if ((me == null ? void 0 : me.skin) === "spider" || (me == null ? void 0 : me.skin) === "flubber") {
        if (ricochetBtn) {
          ricochetBtn.hidden = true;
          ricochetBtn.disabled = true;
        }
        return;
      }
      lpThorPorcRicoButton();
    };
    const lpThorPorcSmoothGuest = smoothGuest;
    smoothGuest = (dt) => {
      lpThorPorcSmoothGuest(dt);
      if (netTarget == null ? void 0 : netTarget.fighters) {
        const fs = allFighters();
        netTarget.fighters.forEach((t, i) => {
          const f = fs[i];
          if (f) {
            for (const k of ["thorCharges", "thorReload", "thorZap", "porcupineSpikesLoaded", "porcupineReload", "porcupineCurl"]) if (k in t) f[k] = t[k];
          }
        });
      }
    };
    const lpPorcTouchSpecial = updateSpecial;
    updateSpecial = (f, dt) => {
      var _a2;
      lpPorcTouchSpecial(f, dt);
      if (f.skin === "porcupine" && !f.dead && (f.porcupineSpikesLoaded || f.porcupineCurl > 0)) {
        const t = ((_a2 = allFighters().filter((o) => o !== f && !o.dead && !o.away).map((o) => ({ o, d: Math.hypot(o.x - f.x, o.y - f.y) })).filter((v) => v.d < 54).sort((a, b) => a.d - b.d)[0]) == null ? void 0 : _a2.o) || null;
        if (t !== f.porcupineContact) {
          f.porcupineContact = t;
          if (t) {
            const dx = t.x - f.x, dy = t.y - f.y, d = Math.hypot(dx, dy) || 1;
            directDamage(f, t, dx / d, dy / d, 420, Math.sign(dx || 1) * 8, "#e8d995");
          }
        }
      }
    };
    renderIncomingFriendRequests();
    document.querySelectorAll("input,textarea,select").forEach((field) => {
      field.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
        if (field.disabled) return;
        try {
          field.focus({ preventScroll: true });
        } catch (_) {
          field.focus();
        }
      }, { passive: true });
      field.addEventListener("touchstart", (event) => {
        event.stopPropagation();
        if (!field.disabled) try {
          field.focus({ preventScroll: true });
        } catch (_) {
          field.focus();
        }
      }, { passive: true });
      field.addEventListener("click", () => {
        var _a2;
        if (!field.disabled && !((_a2 = document.activeElement) == null ? void 0 : _a2.isSameNode(field))) field.focus();
      });
    });
    window.addEventListener("resize", resize);
    if (window.visualViewport) window.visualViewport.addEventListener("resize", resize);
    if (window.ResizeObserver) new ResizeObserver(resize).observe(arena);
    else setInterval(resize, 750);
    loadUpgrades();
    resize();
    requestAnimationFrame(loop);
  })();
})();
