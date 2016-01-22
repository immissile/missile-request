var request = require('request');
var _ = require('lodash-node');

module.exports = function (url, options, callback) {
    // utils
    var utils = {
        parseParams: function (params) {
            var str = '';
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    str += '&' + key + '=' + params[key];
                }
            }
            return str;
        }
    };

    // query
    var query = '';
    if (options && typeof options !== 'function') {
        if (options.query) {
            var _query = utils.parseParams(options.query);
            if (!_.isEmpty(_query)) {
                query = '?' + _query;
            }
        }
        request(url + query, function(err, res, body){
            if (callback && _.isFunction(callback)) {
                callback(err, res, body);
            }
        });
    }

    return this;
}
