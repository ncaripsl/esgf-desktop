/**
 * @author CMCC
 */

Ext.define('MyDesktop.datastats.views.OutputPanel', {
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.datastatsOutputPanel',
    
    requires: ['MyDesktop.datastats.views.OlapChartPanel',
               'MyDesktop.datastats.views.OlapGridPanel'],
    
    initComponent : function() {
    	
    	Ext.apply(this, {
    		id     : 'datastatsOutputPanel',
    		title  : 'Data Usage Statistics',
            region : 'center',
            layout : 'fit',
            tbar   : [
				{ // add/remove background grid from chart
					id            : 'datastatsChartGrid',
					text          : 'Add/Remove Grid',
					disabled      : true,
					enableToggle  : true,
					pressed       : true,
					toggleHandler : this.addRemoveGridFromChart
				},
                '->',
                {
	            	id            : 'datastatsCSVButton',
	            	tooltip       : 'Export to CSV',
	            	icon          : '/esgf-desktop/img/datastats/csv.jpg',
	            	cls           : 'x-btn-icon',
                	disabled      : true,
                	handler       : this.exporttoCSV
                },
                {
                	id            : 'datastatsGridButton',
                	disabled      : true,
	                icon          : '/esgf-desktop/img/datastats/grid.png',
	                cls           : 'x-btn-icon',
	                enableToggle  : true,
	                toggleHandler : this.gridOutput,
	                toggleGroup   : 'datastats_chartORgrid',
	                tooltip       : 'Grid'
	            },
	            '-',
	            {
	            	id            : 'datastatsColumnChartButton',
	            	disabled      : true,
	                icon          : '/esgf-desktop/img/datastats/icon-graf1.gif',
	                cls           : 'x-btn-icon',
	                enableToggle  : true,
	                toggleHandler : this.chartColumnOutput,
	                toggleGroup   : 'datastats_chartORgrid',
	                pressed       : true,
	                tooltip       : 'Column'
	            },
	            {
	            	id            : 'datastatsLineChartButton',
	            	disabled      : true,
	                icon          : '/esgf-desktop/img/datastats/icon-graf2.gif',
	                cls           : 'x-btn-icon',
	                enableToggle  : true,
	                toggleHandler : this.chartLineOutput,
	                toggleGroup   : 'datastats_chartORgrid',
	                tooltip       : 'Line'
	            },
	            {
	            	id            : 'datastatsAreaChartButton',
	            	disabled      : true,
	                icon          : '/esgf-desktop/img/datastats/icon-graf3.gif',
	                cls           : 'x-btn-icon',
	                enableToggle  : true,
	                toggleHandler : this.chartAreaOutput,
	                toggleGroup   : 'datastats_chartORgrid',
	                tooltip       : 'Area'
	            }],
            items : [new MyDesktop.datastats.views.OlapChartPanel()]
    	});
        this.callParent();
    },
    
    addRemoveGridFromChart: function(button, state) {
    	var chart = Ext.getCmp('datastatschart');
		if (state) {
			chart.axes.get('left').grid = true;
			chart.surface.removeAll();
        	chart.redraw(false);
		}
		else {
			chart.axes.get('left').grid = false;
			chart.surface.removeAll();
        	chart.redraw(false);
		}
    },
    
    exporttoCSV: function() {
    	 // var comboValue = Ext.getCmp('datastatsmetric').getValue();
		
          url = 'datastatsActionsStream/DatastatsCSVAction.action';
          params={
		    	datastatsmetric : datastatsmetric,
		    	datastatsdim    : datastatsdim,
		    	datastatsorder  : datastatsorder,
		    	datastatssource : datastatssource
		    };
          var params = '?datastatsmetric=' + datastatsmetric + '&datastatsdim=' + datastatsdim + '&datastatsorder=' + datastatsorder + '&datastatssource=' + datastatssource;
          window.open(url + params);
    },
    
    gridOutput: function(button, state) {
    	if(state) {
    		Ext.getCmp('datastatsOutputPanel').add(new MyDesktop.datastats.views.OlapGridPanel());
    		Ext.getCmp('datastatsOutputPanel').remove('datastatschart');
    		
    		// disable "add/remove background grid from chart" button
    		Ext.getCmp('datastatsChartGrid').disable();
    	}
    },
    
    chartColumnOutput: function(button, state) {
    	if(state) {
    		var newChart = new MyDesktop.datastats.views.OlapChartPanel();
    		
    		// remove previous element from output panel and add the new chart
    		Ext.getCmp('datastatsOutputPanel').remove(Ext.getCmp('datastatsOutputPanel').items.getAt(0).id);
    		Ext.getCmp('datastatsOutputPanel').add(newChart);
    		
    		// enable "add/remove background grid from chart" button
    		Ext.getCmp('datastatsChartGrid').enable();
    		if(!Ext.getCmp('datastatsChartGrid').pressed)
    			Ext.getCmp('datastatschart').axes.get('left').grid = false;
    		
        	Ext.getCmp('datastatschart').show();
        	
    		// set y axes label
        	Ext.getCmp('datastatschart').axes.get('left').setTitle(datastatsmetric);
    	}
    },
    
    chartLineOutput: function(button, state) {
    	if(state) {
    		var newChart = new MyDesktop.datastats.views.OlapChartPanel();
    		
    		// remove column series and add line series
    		newChart.series.add({
	            type      : 'line',
	            id        : 'datastast_line_series',
	            highlight : {
	                size   : 7,
	                radius : 7
	            },
	            axis      : 'left',
	            xField    : 'time',
			    yField    : 'measure',
	            markerConfig: {
	                type: 'cross',
	                size: 4,
	                radius: 4,
	                'stroke-width': 0,
	                fillColor : 0xCCCCCC,
			    	fillAlpha : 0
	            },
	            tips      : {
			      trackMouse : true,
			      width      : 200,
			      renderer   : function(storeItem, item) {
  			        this.setTitle(storeItem.get('time') + ': ' + storeItem.get('measure'));
  			      }
			    },
	        });
    		
    		newChart.series.remove(newChart.series.getAt(0));
    		
    		// remove previous element from output panel and add the new chart
    		Ext.getCmp('datastatsOutputPanel').remove(Ext.getCmp('datastatsOutputPanel').items.getAt(0).id);
    		Ext.getCmp('datastatsOutputPanel').add(newChart);
    		
    		// enable "add/remove background grid from chart" button
    		Ext.getCmp('datastatsChartGrid').enable();
    		if(!Ext.getCmp('datastatsChartGrid').pressed)
    			Ext.getCmp('datastatschart').axes.get('left').grid = false;
    		
        	Ext.getCmp('datastatschart').show();
    		
    		// set y axes label
        	Ext.getCmp('datastatschart').axes.get('left').setTitle(datastatsmetric);
    	}
    },
    
    chartAreaOutput: function(button, state) {
    	if(state) {
    		var newChart = new MyDesktop.datastats.views.OlapChartPanel();
    		
        	// remove column series and add area series
    		newChart.series.add({
	            type: 'area',
	            id: 'datastast_area_series',
	            highlight: false,
	            axis: 'left',
	            xField: 'time',
	            yField: ['measure'],
	            style: {
	                opacity: 0.93
	            },
	            tips: {
			      trackMouse: true,
			      width: 200,
			      renderer  : function(storeItem, item) {
  			        this.setTitle(storeItem.get('time') + ': ' + storeItem.get('measure'));
  			      }
			    },
	        });

    		newChart.series.remove(newChart.series.getAt(0));

    		// remove previous element from output panel and add the new chart
    		Ext.getCmp('datastatsOutputPanel').remove(Ext.getCmp('datastatsOutputPanel').items.getAt(0).id);
    		Ext.getCmp('datastatsOutputPanel').add(newChart);
    		
    		// enable "add/remove background grid from chart" button
    		Ext.getCmp('datastatsChartGrid').enable();
    		if(!Ext.getCmp('datastatsChartGrid').pressed)
    			Ext.getCmp('datastatschart').axes.get('left').grid = false;
    		
        	Ext.getCmp('datastatschart').show();
        	
    		// set y axes label
        	Ext.getCmp('datastatschart').axes.get('left').setTitle(datastatsmetric);
    	}
    }
});
