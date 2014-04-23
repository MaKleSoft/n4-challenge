define(function(require) {
    var Product = function(data, source) {
        this.id = data.id;
        this.name = data.name;
        // Parse the price into a float if it is a string
        this.price = typeof data.price === "string" ? parseFloat(data.price, 10) : data.price;
        this.source = source;
    };

    Product.prototype = {
        raw: function() {
            return {
                id: this.id,
                name: this.name,
                price: this.price
            };
        },
        // Fetches the product details like name and price for this product
        // For the Sparta endpoint this is fairly straightforward as we pretty
        // much use the information returned by the api
        fetchDetails: function(callback) {
            this.source.fetchOne("products", this.id, function(res) {
                this.name = res.name;
                // Parse the price into a float if it is a string
                this.price = typeof res.price === "string" ? parseFloat(res.price) : res.price;
                if (callback) {
                    callback(this);
                }
            }.bind(this));
        }
    };

    return Product;
});