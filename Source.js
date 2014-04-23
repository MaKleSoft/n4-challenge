define(function(require) {
    var request = function(method, url, data, callback) {
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

        req.open(method, url, true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json");
        req.send(data && JSON.stringify(data));
    };

    var Source = function(baseUrl) {
        this.baseUrl = baseUrl;
    };

    Source.prototype = {
        fetchAll: function(url, callback) {
            request("GET", this.baseUrl + url, "", callback);
        },
        fetchOne: function(url, id, callback) {
            request("GET", this.baseUrl + url + "/" + id, "", callback);
        },
        post: function(url, data, callback) {
            request("POST", this.baseUrl + url, data, callback);
        }
    };

    return Source;
});