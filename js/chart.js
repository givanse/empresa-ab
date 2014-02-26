
var eab = {

chart: 
{
    drawGrid: function(raphaelPaper, width, height, scale) {

        function drawHorizontalLines(size, color) {
            var pathStr = "";
            for (var y = size; y < height; y += size) {                             
                pathStr += "M0," + y + "L" + width + "," + y;
            } 
            raphaelPaper.path(pathStr)
                        .attr({stroke: color});
        }

        function drawVerticalLines(size, color) {
            var pathStr = "";
            for (var x = size; x < width; x += size) {                             
                pathStr += "M" + x + ",0L" + x + "," + height;
            } 
            raphaelPaper.path(pathStr)
                       .attr({stroke: color});
        }

        var baseSquareSize = 10;
        var sqrSize = baseSquareSize * (scale > 0 ? scale : 1);
        var smallGridColor = "#eee";
        var mediumGridColor = "#ddd";
        var bigGridColor = "#bbb";

        drawHorizontalLines(sqrSize, smallGridColor);
        drawHorizontalLines(sqrSize * 5, mediumGridColor);
        drawHorizontalLines(sqrSize * 10, bigGridColor);

        drawVerticalLines(sqrSize, smallGridColor);
        drawVerticalLines(sqrSize * 5, mediumGridColor);
        drawVerticalLines(sqrSize * 10, bigGridColor);

    }, /* drawGrid */

    drawStockData: function(raphaelPaper, width, height, scale, stockdata) {
    
        var padding = 10;
        var firstDay = stockdata[0];
        raphaelPaper.text(20 + padding, height - padding, stockdata[0].date)
                    .attr({"font-size": 11});

        /* Find the highest value that will be charted. */
        var highestEver = 0;
        for(var i = 0; i < stockdata.length; i++) {                            
            var day = stockdata[i];         
            day.high = parseFloat(day.high); /* TODO: performance, don't convert JSON to object */
            highestEver = day.high > highestEver ? day.high : highestEver;
        }


        var x = 50;                                                                  
        var y = height;                                                        
        var pathString = null;
        /* TODO: Processing */
        for(var i = 0; i < stockdata.length; i++) {                            
            var day = stockdata[i];         

            if ( ! day || ! day.open ) {
                continue;
            }

            var open = day.open.match(/\d/g);
            var close = day.close.match(/\d/g);

            /* Change representation from decimal numbers to pixel/$cent$ */
            var open1 = height - (10 * open[0]);
            var open2 = height - (10 * open[1]);
            var close1 = height - parseInt(close[0]);
            var close2 = height - parseInt(close[2]);

            open1  = (open1  * height) / highestEver;
            open2  = (open2  * height) / highestEver;
            close1 = (close1 * height) / highestEver;
            close2 = (close2 * height) / highestEver;

            var high = height - day.high;
            var low = height - day.low;

            pathString += "M"+x+","+open1 +"M"+x+","+open2+
                          "L"+x+","+close1+"L"+x+","+close2;
            x+=50;
        } 

        raphaelPaper.path(pathString)
                    .attr({stroke: "#ff0000",
                           "stroke-width": 10});
    } /* drawStockData */
}

}

Object.freeze(eab);
