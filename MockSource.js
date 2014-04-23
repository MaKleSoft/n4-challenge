define(function(require) {
    function getById(arr, id) {
        for (var i=0; i<arr.length; i++) {
            if (id === arr[i].id) {
                return arr[i];
            }
        }
    }

    var MockSource = function(fixtureDir) {
        this.fixtureDir = fixtureDir || "fixtures";
    };

    MockSource.prototype = {
        fetchAll: function(url, callback) {
            var req = new XMLHttpRequest(),
                reqUrl = this.fixtureDir + "/" + url + ".json";

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

            req.open("GET", reqUrl, true);
            req.send();
        },
        fetchOne: function(url, id, callback) {
            this.fetchAll(url, function(records) {
                var res = getById(records, id);
                if (callback) {
                    callback(res);
                }
            });
        }
    };

    return MockSource;
});