define(function(require) {
    var Product = function(data, source) {
        this.id = data.id;
        this.name = data.name;
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
        fetchDetails: function(callback) {
            this.source.fetchOne("products", this.id, function(res) {
                this.name = res.name;
                this.price = typeof res.price === "string" ? parseFloat(res.price) : res.price;
                if (callback) {
                    callback(this);
                }
            }.bind(this));
        }
    };

    return Product;
});