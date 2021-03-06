define(function(require) {
    var SpartaTaxes = function(name, url, source) {
        this.name = name || "Sparta";
        this.url = url || "taxes/sparta";
        this.source = source;
    };

    SpartaTaxes.prototype = {
        // Fetches the tax information for all the products in a given order
        getTaxes: function(order, callback) {
            var data = {
                order: order.raw()
            };
            this.source.post(this.url, data, function(res) {
                if (callback) {
                    callback(res.order.items);
                }
            });
        }
    };

    return SpartaTaxes;
});