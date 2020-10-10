"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllByLinkId = exports.findById = exports.remove = exports.create = void 0;
var firebase_1 = require("../firebase");
var Media = firebase_1.firestore().collection('media');
var Events = firebase_1.firestore().collection('events');
function create(mediaAttributes) {
    return __awaiter(this, void 0, void 0, function () {
        var id, newMedia, media, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = Media.doc().id;
                    newMedia = __assign(__assign({}, mediaAttributes), { id: id, created_at: firebase_1.timestamp.now(), linkIds: mediaAttributes.linkId
                            ? [mediaAttributes.linkId]
                            : [Events.doc().id] // Case when creating event avatar
                     });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Media.doc(id).set(newMedia)];
                case 2:
                    media = _a.sent();
                    if (media) {
                        return [2 /*return*/, newMedia];
                    }
                    return [2 /*return*/, null];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
function remove(_a) {
    var id = _a.id, linkId = _a.linkId, bucket = _a.bucket;
    return __awaiter(this, void 0, void 0, function () {
        var Link, e_2, e_3;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    Link = firebase_1.firestore().collection(bucket).doc(linkId);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    // Firestore transaction
                    return [4 /*yield*/, firebase_1.firestore().runTransaction(function (t) { return __awaiter(_this, void 0, void 0, function () {
                            var doc, link;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, t.get(Link)];
                                    case 1:
                                        doc = _a.sent();
                                        link = doc.data();
                                        if (link && link.avatarId !== id) {
                                            t.delete(Media.doc(id));
                                            return [2 /*return*/, ''];
                                        }
                                        else {
                                            throw 'Cannot delete avatarId';
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    // Firestore transaction
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    console.log(e_2);
                    return [2 /*return*/, {
                            completed: false,
                            error: e_2
                        }];
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, firebase_1.storage().file(bucket + "/" + id).delete()];
                case 5:
                    _b.sent();
                    return [2 /*return*/, {
                            completed: true,
                            error: ''
                        }];
                case 6:
                    e_3 = _b.sent();
                    console.log(e_3);
                    return [2 /*return*/, {
                            completed: false,
                            error: 'Problem deleting from storage.'
                        }];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.remove = remove;
function findById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var doc, media, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Media.doc(id).get()];
                case 1:
                    doc = _a.sent();
                    if (doc.exists) {
                        media = doc.data();
                        if (media)
                            return [2 /*return*/, media];
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, null];
                case 2:
                    e_4 = _a.sent();
                    console.log(e_4);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findById = findById;
function findAllByLinkId(id, avatarId) {
    return __awaiter(this, void 0, void 0, function () {
        var media, snapshot, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    media = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Media.where('linkIds', 'array-contains', id).get()];
                case 2:
                    snapshot = _a.sent();
                    if (snapshot) {
                        snapshot.forEach(function (doc) {
                            var item = doc.data();
                            item.id = doc.id;
                            media.push(item);
                        });
                        return [2 /*return*/, media];
                    }
                    return [2 /*return*/, null];
                case 3:
                    e_5 = _a.sent();
                    console.log(e_5);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.findAllByLinkId = findAllByLinkId;
