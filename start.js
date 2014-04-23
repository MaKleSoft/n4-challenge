window.addEventListener("polymer-ready", function() {
    require(["Source", "Orders"], function(Source, Orders) {
        var source = new Source("http://n41b336e3cd0b675181700eebc4f0.herokuapp.com/"),
            orders = new Orders(source);

        var app = new App();
        app.init(orders);

        document.body.appendChild(app);

        window.orders = orders;
    });
});