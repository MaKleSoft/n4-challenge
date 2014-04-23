define(function(require) {
    var Q = require("q");
    var AthensTaxes = function(name, url, source) {
        this.name = name || "Athens";
        this.url = url || "taxes/athens";
        this.source = source;
    };

    AthensTaxes.prototype = {
        getTaxes: function(order, callback) {
            var getOrderTax = function(item) {
                var deferred = Q.defer(),
                    data = {
                        product: item.product.raw()
                    };

                this.source.post(this.url, data, function(res) {
                    var tax = parseFloat(res.tax.rate, 10),
                        price = item.quantity * item.product.price * (1+tax),
                        taxString = (Math.floor(tax * 100 * 100)/100) + "%";

                    deferred.resolve({
                        product: item.product,
                        quantity: item.quantity,
                        tax: taxString,
                        price: price
                    });
                });

                return deferred.promise;
            }.bind(this);

            Q.all(order.items.map(function(item) {
                return getOrderTax(item);
            })).then(callback);
        }
    };

    return AthensTaxes;
});