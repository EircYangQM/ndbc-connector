"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionManager = void 0;
class ConnectionManager {
    static load(driverName, driver) {
        if (ConnectionManager.drivers.has(driverName)) {
            return;
        }
        ConnectionManager.drivers.set(driverName, driver);
    }
    static connect(driverName, properties) {
        return new Promise((resolve, reject) => {
            let driver = ConnectionManager.drivers.get(driverName);
            if (driver === undefined) {
                return reject(`The ${driverName} does not found.`);
            }
            return driver.connect(properties);
        });
    }
}
exports.ConnectionManager = ConnectionManager;
ConnectionManager.drivers = new Map();
