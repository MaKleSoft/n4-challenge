define(function(require) {
    var Product = function(data, source) {
        this.id = data.id;
        this.name = data.name;
        this.price = data.price;
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
                this.price = res.price;
                if (callback) {
                    callback(this);
                }
            }.bind(this));
        }
    };

    return Product;
});