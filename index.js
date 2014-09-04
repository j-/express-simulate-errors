/**
 * Randomly generate a boolean based on an input probability.
 * @private
 * @param {Number} chance Value between 0 and 1 representing 0% and 100%
 *   probabilities of a true value, respectively
 * @return {Boolean} Random value
 */
var pass = function (chance) {
	return Math.random() < chance;
};

/**
 * Generate an error to return to the client.
 * @private
 * @return {Error} Error object
 */
var getRandomError = function () {
	return new Error('Server error');
};

/**
 * Returns middleware which will simulate server errors being generated and sent
 *   back to the client.
 * @function express-simulate-errors
 * @param {Object=} options
 * @param {Number} [options.chance=1] Chance of a random error occurring
 * @return {Function} Middleware function
 */
module.exports = function (options) {
	if (!options) {
		options = {};
	}
	var chance = options.chance || 1;
	return function (req, res, next) {
		var passed = pass(chance);
		if (passed) {
			var err = getRandomError();
			next(err);
		}
		else {
			next();
		}
	};
};