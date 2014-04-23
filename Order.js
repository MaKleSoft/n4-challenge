define(function(require) {
    var Product = require("Product"),
        Q = require("q");

    var Order = function(data, source) {
        this.number = data.number;
        this.items = data.items.map(function(item) {
            // Parse the quantity into a float in case it's a string
            // Usually you'd expect this to be an integer but it seems the api
            // return floats, too.
            var quantity = typeof item.quantity === "string" ? parseFloat(item.quantity, 10) : item.quantity;
            return {
                quantity: quantity,
                product: new Product(item.product, source)
            };
        }.bind(this));
        this.source = source;
    };

    Order.prototype = {
        // Returns a plain representation of the Order
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
        // Fetch the details for all the products in this order
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