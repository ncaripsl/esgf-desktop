/**
 * @author CMCC
 */

Ext.define('MyDesktop.olap.views.OutputPanel', {
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.outputPanel',
    
    requires: ['MyDesktop.olap.views.OlapChartPanel',
               'MyDesktop.olap.views.OlapGridPanel'],
    
    initComponent : function() {
    	
    	Ext.apply(this, {
    		id     : 'outputPanel',
    		title  : 'Data Usage Statistics',
            region : 'center',
            layout : 'fit',
            tbar   : [
				{
					id            : 'olapChartGrid',
					text          : 'Add/Remove Grid',
					disabled      : true,
					enableToggle  : true,
					pressed       : true,
					toggleHandler : this.addRemoveGridFromChart
				},
                '->',
                {
	            	id            : 'olapCSVButton',
	            	tooltip       : 'Export to CSV',
	            	icon          : '/esgf-desktop/img/olap/csv.jpg',
	            	cls           : 'x-btn-icon',
                	disabled      : true,
                	handler       : this.exporttoCSV
                },
                {
                	id            : 'olapGridButton',
                	disabled      : true,
	                icon          : '/esgf-desktop/img/olap/grid.png',
	                cls           : 'x-btn-icon',
	                enableToggle  : true,
	                toggleHandler : this.gridOutput,
	                toggleGroup   : 'chartORgrid',
	                tooltip       : 'Grid'
	            },
	            '-',
	            {
	            	id            : 'olapColumnChartButton',
	            	disabled      : true,
	                icon          : '/esgf-desktop/img/olap/icon-graf1.gif',
	                cls           : 'x-btn-icon',
	                enableToggle  : true,
	                toggleHandler : this.chartColumnOutput,
	                toggleGroup   : 'chartORgrid',
	                pressed       : true,
	                tooltip       : 'Column'
	            },
	            {
	            	id            : 'olapLineChartButton',
	            	disabled      : true,
	                icon          : '/esgf-desktop/img/olap/icon-graf2.gif',
	                cls           : 'x-btn-icon',
	                enableToggle  : true,
	                toggleHandler : this.chartLineOutput,
	                toggleGroup   : 'chartORgrid',
	                tooltip       : 'Line'
	            },
	            {
	            	id            : 'olapAreaChartButton',
	            	disabled      : true,
	                icon          : '/esgf-desktop/img/olap/icon-graf3.gif',
	                cls           : 'x-btn-icon',
	                enableToggle  : true,
	                toggleHandler : this.chartAreaOutput,
	                toggleGroup   : 'chartORgrid',
	                tooltip       : 'Area'
	            }],
            items : [new MyDesktop.olap.views.OlapChartPanel()]
    	});
        this.callParent();
    },
    
    addRemoveGridFromChart: function(button, state) {
    	var chart = Ext.getCmp('olapchart');
		if (state) {
			chart.axes.get('left').grid = true;
//			chart.axes.get('left').label = {
//                font: 'bold 14px Arial'
//            };
//			chart.axes.get('bottom').label = {
//                font: 'bold 14px Arial'
//            };
			chart.surface.removeAll();
        	chart.redraw(false);
		}
		else {
			chart.axes.get('left').grid = false;
//			chart.axes.get('left').label = {
//                font: 'bold 14px Arial'
//            };
//			chart.axes.get('bottom').label = {
//                font: 'bold 14px Arial'
//            };
			chart.surface.removeAll();
        	chart.redraw(false);
		}
    },
    
    exporttoCSV: function() {
    	  var combo1Value = Ext.getCmp('olapcombo1').getValue();
          var combo2Value = Ext.getCmp('olapcombo2').getValue();
          var combo3Value = Ext.getCmp('olapcombo3').getValue();
          var combo4Value = Ext.getCmp('olapcombo4').getValue();
          var combo5Value = Ext.getCmp('olapcombo5').getValue();
		
          url = 'olapActionsStream/ElapsedTimeCSVAction.action';
		
          var params = '?combo1Value=' + combo1Value + '&combo2Value=' + combo2Value + '&combo3Value=' + combo3Value + '&combo4Value=' + combo4Value + '&combo5Value=' + combo5Value;
          window.open(url + params);
    },
    
    gridOutput: function(button, state) {
    	if(state) {
    		Ext.getCmp('outputPanel').add(new MyDesktop.olap.views.OlapGridPanel());
    		Ext.getCmp('outputPanel').remove('olapchart');
    		
    		// disabilito il pulsante di aggiunta e rimozione
    		// griglia di sfondo del grafico
    		Ext.getCmp('olapChartGrid').disable();
    	}
    },
    
    chartColumnOutput: function(button, state) {
    	if(state) {
    		var newChart = new MyDesktop.olap.views.OlapChartPanel();
    		
    		// rimuovo l'elemento precedente del pannello di output e aggiungo il nuovo grafico
    		Ext.getCmp('outputPanel').remove(Ext.getCmp('outputPanel').items.getAt(0).id);
    		Ext.getCmp('outputPanel').add(newChart);
    		
    		// abilito il pulsante di aggiunta e rimozione
    		// griglia di sfondo del grafico
    		Ext.getCmp('olapChartGrid').enable();
    		if(!Ext.getCmp('olapChartGrid').pressed)
    			Ext.getCmp('olapchart').axes.get('left').grid = false;
    		
        	Ext.getCmp('olapchart').show();
        	
    		// imposto i titoli degli assi
        	Ext.getCmp('olapchart').axes.get('bottom').setTitle(xAxisTitle);
        	Ext.getCmp('olapchart').axes.get('left').setTitle(yAxisTitle);
    	}
    },
    
    chartLineOutput: function(button, state) {
    	if(state) {
    		var newChart = new MyDesktop.olap.views.OlapChartPanel();
    		
    		// rimuovo la serie a colonna e aggiungo quella a linea
    		newChart.series.add({
	            type      : 'line',
	            id        : 'line_series',
	            highlight : {
	                size   : 7,
	                radius : 7
	            },
	            axis      : 'left',
	            xField    : 'timestamp',
			    yField    : 'elapsedTime',
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
  			        this.setTitle(storeItem.get('timestamp') + ': ' + storeItem.get('elapsedTime'));
  			      }
			    },
	        });
    		
    		newChart.series.remove(newChart.series.getAt(0));
    		
    		// rimuovo l'elemento precedente del pannello di output e aggiungo il nuovo grafico
    		Ext.getCmp('outputPanel').remove(Ext.getCmp('outputPanel').items.getAt(0).id);
    		Ext.getCmp('outputPanel').add(newChart);
    		
    		// abilito il pulsante di aggiunta e rimozione
    		// griglia di sfondo del grafico
    		Ext.getCmp('olapChartGrid').enable();
    		if(!Ext.getCmp('olapChartGrid').pressed)
    			Ext.getCmp('olapchart').axes.get('left').grid = false;
    		
        	Ext.getCmp('olapchart').show();
    		
    		// imposto i titoli degli assi
    		Ext.getCmp('olapchart').axes.get('bottom').setTitle(xAxisTitle);
        	Ext.getCmp('olapchart').axes.get('left').setTitle(yAxisTitle);
    	}
    },
    
    chartAreaOutput: function(button, state) {
    	if(state) {
    		var newChart = new MyDesktop.olap.views.OlapChartPanel();
    		
        	// rimuovo la serie a colonna e aggiungo quella a linea
    		newChart.series.add({
	            type: 'area',
	            highlight: false,
	            axis: 'left',
	            xField: 'timestamp',
	            yField: ['elapsedTime'],
	            style: {
	                opacity: 0.93
	            },
	            tips: {
			      trackMouse: true,
			      width: 200,
			      renderer  : function(storeItem, item) {
  			        this.setTitle(storeItem.get('timestamp') + ': ' + storeItem.get('elapsedTime'));
  			      }
			    },
	        });
    		
    		newChart.series.remove(newChart.series.getAt(0));
    		
    		// rimuovo l'elemento precedente del pannello di output e aggiungo il nuovo grafico
    		Ext.getCmp('outputPanel').remove(Ext.getCmp('outputPanel').items.getAt(0).id);
    		Ext.getCmp('outputPanel').add(newChart);
    		
    		// abilito il pulsante di aggiunta e rimozione
    		// griglia di sfondo del grafico
    		Ext.getCmp('olapChartGrid').enable();
    		if(!Ext.getCmp('olapChartGrid').pressed)
    			Ext.getCmp('olapchart').axes.get('left').grid = false;
    		
        	Ext.getCmp('olapchart').show();
        	
    		// imposto i titoli degli assi
    		Ext.getCmp('olapchart').axes.get('bottom').setTitle(xAxisTitle);
        	Ext.getCmp('olapchart').axes.get('left').setTitle(yAxisTitle);
    	}
    }
});
