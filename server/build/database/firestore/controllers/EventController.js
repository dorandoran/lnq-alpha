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
exports.findAllByOwnerId = exports.findById = exports.remove = exports.update = exports.create = void 0;
var firebase_1 = require("../firebase");
var controllers_1 = require("../../firestore/controllers");
var Events = firebase_1.firestore().collection('events');
var Users = firebase_1.firestore().collection('users');
function create(eventAttributes) {
    return __awaiter(this, void 0, void 0, function () {
        var batch, eventTimestamp, newEvent, id, recipientIds, ownerId, followIds, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    batch = firebase_1.firestore().batch();
                    eventTimestamp = firebase_1.timestamp.now();
                    newEvent = __assign(__assign({}, eventAttributes), { numLikes: 0, likes: [], updated_at: eventTimestamp, created_at: eventTimestamp });
                    // Create Event
                    batch.set(Events.doc(newEvent.id), newEvent);
                    // Update User numEvents
                    batch.update(Users.doc(eventAttributes.ownerId), {
                        numEvents: firebase_1.firestore.FieldValue.increment(1)
                    });
                    id = eventAttributes.id, recipientIds = eventAttributes.recipientIds, ownerId = eventAttributes.ownerId, followIds = eventAttributes.followIds;
                    if (recipientIds.length) {
                        controllers_1.InviteController.saveAll({ senderId: ownerId, recipientIds: recipientIds, eventId: id });
                    }
                    if (followIds.length) {
                        controllers_1.FollowController.saveAll({ senderId: ownerId, recipientIds: followIds });
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, batch.commit()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, newEvent];
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
function update(eventUpdate) {
    return __awaiter(this, void 0, void 0, function () {
        var id, updates, update_1, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = eventUpdate.id, updates = eventUpdate.updates;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Events.doc(id).update(updates)];
                case 2:
                    update_1 = _a.sent();
                    if (update_1)
                        return [2 /*return*/, findById(id)];
                    return [2 /*return*/, null];
                case 3:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.update = update;
function remove(id) {
    return __awaiter(this, void 0, void 0, function () {
        var e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Events.doc(id).delete()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    e_3 = _a.sent();
                    console.log(e_3);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.remove = remove;
function findById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var doc, event_1, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!id)
                        return [2 /*return*/, null];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Events.doc(id).get()];
                case 2:
                    doc = _a.sent();
                    if (doc.exists) {
                        event_1 = doc.data();
                        if (event_1)
                            return [2 /*return*/, event_1];
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, null];
                case 3:
                    e_4 = _a.sent();
                    console.log(e_4);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.findById = findById;
function findAllByOwnerId(id) {
    return __awaiter(this, void 0, void 0, function () {
        var events, snapshot, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    events = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Events.where('ownerId', '==', id).get()];
                case 2:
                    snapshot = _a.sent();
                    if (snapshot) {
                        snapshot.forEach(function (doc) {
                            var event = doc.data();
                            event.id = doc.id;
                            events.push(event);
                        });
                        return [2 /*return*/, events];
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
exports.findAllByOwnerId = findAllByOwnerId;
