define(function(require) {
    var Order = require("Order");

    var Orders = function(source) {
        this.source = source;
        this.records = [];
    };

    Orders.prototype = {
        fetch: function(callback) {
            this.source.fetchAll("orders", function(records) {
                this.records = records.map(function(record) {
                    return new Order(record, this.source);
                }.bind(this));
                if (callback) {
                    callback(this.records);
                }
            }.bind(this));
        }
    };

    return Orders;
});