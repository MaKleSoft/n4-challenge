define(function(require) {
    var Product = require("Product"),
        Q = require("q");

    var Order = function(data, source) {
        this.number = data.number;
        this.items = data.items.map(function(item) {
            return {
                quantity: item.quantity,
                product: new Product(item.product, source)
            };
        }.bind(this));
        this.source = source;
    };

    Order.prototype = {
        raw: function() {
            return {
                number: this.number,
                items: this.items.map(function(item) {
                    return {
                        product: item.product.raw(),
                        quantity: item.quantity
                    };
                })
            };
        },
        fetchProductDetails: function(callback) {
            var fetchDetails = function(product) {
                var deferred = Q.defer();

                product.fetchDetails(deferred.resolve);

                return deferred.promise;
            };

            Q.all(this.items.map(function(item) {
                return fetchDetails(item.product);
            })).then(callback);
        }
    };

    return Order;
});