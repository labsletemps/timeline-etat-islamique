 d3.xml("map.svg", "image/svg+xml", function(xml) {
     document.getElementById('map').appendChild(xml.documentElement);
 });
 
 Tabletop.init({
     key: '1YhyLgAv6ZLTSLeziXbBIQWDh4O6RnCkHUGgCiKcWdgY', // ID the Google Docs (e.g. https://docs.google.com/spreadsheets/d/1OmZsftlrwsMSIYptbM0jqRNqG0bBFTtcjPM9KRJXfvg/pubhtml)
     callback: function(data, tabletop) {
         var svg = d3.select('#map svg');
         for (i in data) {
             var canton = data[i];
		

             var path = svg.select('#' + canton.canton),
                 yes = parseFloat(canton.oui),
                 $legend = jQuery('.container .legend');

             if (!isNaN(yes)) {
                 var fill = '#F8CC88';
                 switch(true) {
                     case yes <= 100 && yes >= 50:
                         fill = '#355C01';
                     break;
                    
                     case yes >= 0:
                         fill = '#950728';
                     break;
                 }

                 path
                     .style('fill', fill)
                     .attr('data-yes', yes)
                     .attr('data-no', (100-yes))
                     .on('mouseover', function() {
                         var $this = jQuery(this);
                         $legend.append('<center><p style="text-align:middle;font-family:georgia;padding-left:10px;padding-right:10px;padding-top:5px;padding-bottom:5px;"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + $(this).attr('id') + '</strong> | <span style="color:#355C01"><b>OUI: </b>' + $this.data('yes') + '% </span> |  <span style="color:#950728"><b>NON</b> : ' + $this.data('no') + '%</span> </p></big></center>');
                     })
                     .on('mouseout', function() {
                         $legend.empty();
                     })
                 ;
             }
         }
     },
     simpleSheet: true
 });
