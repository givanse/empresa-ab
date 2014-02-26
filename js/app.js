
App = Ember.Application.create();

/**
 * A class that represents an wraps an instance of a Raphael paper.
 */
App.RaphaelPaper = Ember.Object.extend({

    width: 600,
    height: 300,
    stockdata: null,
    fill: "#000",
    stroke: "black",
    scale: 1,
    elementId: null,
    raphPaperObj: null,

    init: function() {
        this._super();
        // create and init the actual Raphael "paper" object
        this.set("raphPaperObj", 
                 Raphael(this.elementId, this.width, this.height));
        this.stockdataDidChange();
    },

    stockdataDidChange: function() {

        this.raphPaperObj.clear();
    
        eab.chart.drawGrid(this.raphPaperObj, this.width, this.height, 
                           this.scale); 

        eab.chart.drawStockData(this.raphPaperObj, this.width, this.height, 
                                this.scale, this.stockdata);

    }.observes("stockdata", "fill", "stroke", "scale"),

    sizeDidChange: function() {
        // adjust the size of the Raphael canvas
        this.raphPaperObj.setSize(this.width, this.height);
    }.observes("width", "height")
});

/** 
 * an object that will hold all the App.RaphaelPaper objects
 * of our application, index by the DOM element name
 */
App.papers = Ember.Object.create({});

/**
 * Custom RaphaelView
 */
App.RaphaelView = Ember.View.extend({
    // This is called when the view element was inserted into the DOM
    didInsertElement: function() {
        // we'll bind the view's "paper" property to App.papers.<name-of-dom-element>
        Ember.bind(this, "paper", "App.papers." + this.get("elementId"));
        // create an instance of App.RaphaelPaper, 
        // which in turn will create and init the Raphael object
        App.papers.set(this.get("elementId"), 
                       App.RaphaelPaper.create({
                               elementId: this.get("elementId"),
                               stockdata: this.get("stockdata")
                           })
            );
    }
});

App.Router.map(function() {
    this.resource('corporations', function() {
            this.resource('corporation', { path: '/:corporation_id' });
        });
});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return ['red', 'yellow', 'blue'];
    }
});

var corporations = [
{id: '1', 
 name: "Dessarroladora Homex SAB de CV", 
 ticker: "HOMEX", 
 stockdata: [                                                                                
    {"date":"2012-02-21", "open":"4.77", "high":"4.77", "low":"4.61", "close":"4.63", "vol":"1097700", "adjc":"4.63"},
    {"date":"2013-02-20", "open":"4.80", "high":"4.80", "low":"4.62", "close":"4.67", "vol":"1578500", "adjc":"4.67"},
    {"date":"2014-02-19", "open":"4.86", "high":"4.88", "low":"4.67", "close":"4.69", "vol":"2808300", "adjc":"4.69"},
    {}                                                                               
 ]
}, 
{id: '2', 
 name: "Bio Pappel SAB de CV", 
 ticker: "PAPPEL", 
 stockdata: [                                                                                
    {"date":"2012-02-21", "open":"4.77", "high":"600", "low":"0", "close":"4.63", "vol":"1097700", "adjc":"4.63"},
    {"date":"2013-02-20", "open":"4.80", "high":"500", "low":"100", "close":"4.67", "vol":"1578500", "adjc":"4.67"},
    {"date":"2014-02-19", "open":"4.86", "high":"400", "low":"200", "close":"4.69", "vol":"2808300", "adjc":"4.69"},
    {}                                                                               
 ]
}, 
{id: '3', 
 name: "Cemex SAB de CV", 
 ticker: "CEMEX", 
 stockdata: [                                                                                
    {"date":"2012-02-21", "open":"4.77", "high":"4.77", "low":"4.61", "close":"4.63", "vol":"1097700", "adjc":"4.63"},
    {"date":"2013-02-20", "open":"4.80", "high":"4.80", "low":"4.62", "close":"4.67", "vol":"1578500", "adjc":"4.67"},
    {"date":"2014-02-19", "open":"4.86", "high":"4.88", "low":"4.67", "close":"4.69", "vol":"2808300", "adjc":"4.69"},
    {}                                                                               
 ]
}
];

App.CorporationsRoute = Ember.Route.extend({
    model: function() { return corporations; } 
});

App.CorporationRoute = Ember.Route.extend({
    model: function(params) {
        /*
        return $.getJSON("data/test.csv.json")
                .then(function(data) {
                    return data; 
                })
        */
        return corporations.findBy('id', params.corporation_id);
    }
});

//EOF
