window.addEventListener("polymer-ready", function() {
    require(["Source", "Orders", "SpartaTaxes", "AthensTaxes"], function(Source, Orders, SpartaTaxes, AthensTaxes) {
        // Initialize dependencies
        var source = new Source("http://n41b336e3cd0b675181700eebc4f0.herokuapp.com/"),
            orders = new Orders(source),
            spartaTaxes = new SpartaTaxes("Sparta", "taxes/sparta", source),
            athensTaxes = new AthensTaxes("Athens", "taxes/athens", source);

        var app = new App();
        app.init(orders, [spartaTaxes, athensTaxes]);

        // Render the app
        document.body.appendChild(app);
    });
});