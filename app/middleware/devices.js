function readDevice(req, res, next) {
	req.deviceType = req.headers["Device-Type"];
	req.deviceID = req.headers["Device-ID"];
}

module.exports = {
	readDevice: readDevice
}