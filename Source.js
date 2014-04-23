define(function(require) {
    var request = function(url, callback) {
        var req = new XMLHttpRequest();

        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    var result = JSON.parse(req.responseText);
                    if (callback) {
                        callback(result);
                    }
                }
            }
        }.bind(this);

        req.open("GET", url, true);
        req.send();
    };

    var Source = function(baseUrl) {
        this.baseUrl = baseUrl;
    };

    Source.prototype = {
        fetchAll: function(url, callback) {
            request(this.baseUrl + url, callback);
        },
        fetchOne: function(url, id, callback) {
            request(this.baseUrl + url + "/" + id, callback);
        }
    };

    return Source;
});