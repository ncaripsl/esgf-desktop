Ext.define('MyDesktop.realtimeSwap.RealtimeSwapModule', {
    extend: 'Ext.ux.desktop.Module',
    requires: ['Ext.chart.*', 'MyDesktop.realtimeSwap.views.SwapChart',
               'Ext.chart.*', 'MyDesktop.realtimeSwap.views.SwapPieChart',
               'Ext.chart.*', 'MyDesktop.realtimeSwap.views.SwapStackedChart'],
    id: 'realtimeSwap-win',
    
    init : function() {
        // No launcher means we don't appear on the Start Menu...
        this.launcher = {
            text: 'Realtime Swap',
            iconCls:'realtimeMemory',
            handler : this.createWindow,
            scope: this
        };
    },
    
    createWindow : function(){
        var desktop   = this.app.getDesktop();
        var win       = desktop.getWindow('realtimeSwap-win');
        var swapChart = new MyDesktop.realtimeSwap.views.SwapChart();
        if(!win){
            win = desktop.createWindow({
                id             : 'realtimeSwap-win',
                title          : 'Swap Realtime Monitoring',
                width          : 600,
                height         : 300,
                iconCls        : 'realtimeMemory',
                animCollapse   : false,
                constrainHeader: true,
                layout         : 'fit',
                tbar   : [
          				{ // add/remove background grid from chart
          					id            : 'realtimeChartGrid',
          					text          : 'Add/Remove Grid',
          					disabled      : false,
          					enableToggle  : true,
          					pressed       : true,
          					toggleHandler : this.addRemoveGridFromChart
          				}/*,
                          '->',

                          '-',   

        	            {
        	            	id            : 'realtimeSwapColumnChartButton',
        	            	disabled      : false,
        	                icon          : '/esgf-desktop/img/realtimeSwap/icon-graf1.gif',
        	                cls           : 'x-btn-icon',
        	                enableToggle  : true,
        	                toggleHandler : this.chartColumn,
        	                pressed       : true,
        	                toggleGroup   : 'realtimeSwap_chartORgrid',
        	                tooltip       : 'Column'
        	            }/*,
          	            {
          	            	id            : 'realtimeSwapLineChartButton',
          	            	disabled      : false,
          	                icon          : '/esgf-desktop/img/realtimeSwap/icon-graf2.gif',
          	                cls           : 'x-btn-icon',
          	                enableToggle  : true,
          	                toggleHandler : this.chartLine,
          	                toggleGroup   : 'realtimeSwap_chartORgrid',
          	                tooltip       : 'Line'
          	            },
          	            {
          	            	id            : 'realtimeSwapAreaChartButton',
          	            	disabled      : false,
          	                icon          : '/esgf-desktop/img/realtimeSwap/icon-graf3.gif',
          	                cls           : 'x-btn-icon',
          	                enableToggle  : true,
          	                toggleHandler : this.chartArea,
          	                toggleGroup   : 'realtimeSwap_chartORgrid',
          	                tooltip       : 'Area'
          	            }/*,                        
          	            {
          	            	id            : 'realtimeSwapPieChartButton',
          	            	disabled      : false,
          	                icon          : '/esgf-desktop/img/realtimeSwap/icon-graf4.gif',
          	                cls           : 'x-btn-icon',
          	                enableToggle  : true,
          	                toggleHandler : this.chartPie,
          	                toggleGroup   : 'realtimeSwap_chartORgrid',
          	                tooltip       : 'Pie'
          	            },
          	            {
          	            	id            : 'realtimeSwapStackedChartButton',
          	            	disabled      : false,
          	                icon          : '/esgf-desktop/img/realtimeSwap/icon-graf5.gif',
          	                cls           : 'x-btn-icon',
          	                enableToggle  : true,
          	                toggleHandler : this.chartStacked,
          	                toggleGroup   : 'realtimeSwap_chartORgrid',
          	                tooltip       : 'Stacked'
          	            }*/],
                items          : [swapChart]
            });
        }
        win.show();
        win.on('beforerender', this.loadContent());
        win.on('beforeclose', function() {
        	Ext.TaskManager.stopAll();
        });
        return win;
    },
    
    addRemoveGridFromChart: function(button, state) {
    	
    	var realChart = Ext.getCmp('realtimeSwapChart');
		if (state) {
			realChart.axes.get('left').grid = true;
			realChart.axes.get('bottom').grid = true;
			realChart.surface.removeAll();
			realChart.redraw(false);
		}
		else {
			realChart.axes.get('left').grid = false;
			realChart.axes.get('bottom').grid = false;
			realChart.surface.removeAll();
			realChart.redraw(false);
		}
    },
    
    chartColumn: function(button, state) {
    	if(state) {
    		Ext.TaskManager.stopAll();
    		var newChart = new MyDesktop.realtimeSwap.views.SwapChart();

    		// remove previous element from panel and add the new chart
    		Ext.getCmp('realtimeSwap-win').remove(Ext.getCmp('realtimeSwap-win').items.getAt(0).id);    		
    		Ext.getCmp('realtimeSwap-win').add(newChart);  
    		
    		Ext.TaskManager.start(taskSwap);
		
        	Ext.getCmp('realtimeSwapChart').show();
    	}
    },
    
    chartLine: function(button, state) {
    	Ext.TaskManager.stopAll();
    	if(state) {    		
    		var newChart = new MyDesktop.realtimeSwap.views.SwapChart();
    		
    		newChart.series.remove(newChart.series.getAt(0));
    		
    		// remove old series and add line series
    		newChart.series.add({
    	           type: 'line',
    	           highlight: {
    	               size: 7,
    	               radius: 7
    	           },
    	           xField: 'timestamp',
    	           yField: 'totSwap',
    	           title:['Total Swap'],
    	           smooth: true,
    	           markerConfig: {
    	               type: 'cross',
    	               size: 4,
    	               radius: 4,
    	               'stroke-width': 0
    	           }
    	       }
            );   
    		
    		 newChart.series.add({
	 	           type: 'line',
	 	           highlight: {
	 	               size: 7,
	 	               radius: 7
	 	           },
	 	           xField: 'timestamp',
	 	           yField: 'freeSwap',
	   	           title:['Free Swap'],
	 	           smooth: true,
	 	           markerConfig: {
	 	               type: 'cross',
	 	               size: 4,
	 	               radius: 4,
	 	               'stroke-width': 0
	 	           }
 	         }); 
    		
    		// remove previous element from panel and add the new chart
    		Ext.getCmp('realtimeSwap-win').remove(Ext.getCmp('realtimeSwap-win').items.getAt(0).id);
   		
    		Ext.getCmp('realtimeSwap-win').add(newChart);
    		Ext.TaskManager.start(taskSwap);
        	Ext.getCmp('realtimeSwapChart').show();
    	}
    },
    
    chartArea: function(button, state) {
    	if(state) {
    		Ext.TaskManager.stopAll();
    		var newChart = new MyDesktop.realtimeSwap.views.SwapChart();    		
    		newChart.series.remove(newChart.series.getAt(0));
   		
        	// remove old series and add area series
    		newChart.series.add({
	            type: 'line',
	            id: 'realtimeSwap_area_series',
	            //highlight: true,
	            axis: 'left',
	            xField: 'timestamp',
	            yField: 'totSwap',
	   	        title:['Total Swap'],
                smooth: true,
                fill: true,
                fillOpacity: 0.5,
	            style: {
                    opacity: 0.70
                },	            
	        });
    		newChart.series.add({
	            type: 'line',
	            id: 'realtimeSwap_area_series',
	            //highlight: true,
	            axis: 'left',
	            xField: 'timestamp',
	            yField: 'freeSwap',
	   	        title:['Free Swap'],
                smooth: true,
                fill: true,
                fillOpacity: 0.5,
	            style: {
                    opacity: 0.70
                },	            
	        });
    		    		
    		// remove previous element from panel and add the new chart
    		Ext.getCmp('realtimeSwap-win').remove(Ext.getCmp('realtimeSwap-win').items.getAt(0).id);
    		
    		Ext.getCmp('realtimeSwap-win').add(newChart);
    		Ext.TaskManager.start(taskSwap);
        	Ext.getCmp('realtimeSwapChart').show();
    	}
    },
    
    chartPie: function(button, state) {
    	if(state) {
    		Ext.TaskManager.stopAll();
    		var newChart = new MyDesktop.realtimeSwap.views.SwapPieChart();

    		// remove previous element from panel and add the new chart
    		Ext.getCmp('realtimeSwap-win').remove(Ext.getCmp('realtimeSwap-win').items.getAt(0).id);    		
    		Ext.getCmp('realtimeSwap-win').add(newChart);  
    		
    		Ext.getCmp('realtimeChartGrid').disable();    		
  
    		Ext.TaskManager.start(taskPieSwap);
		
        	Ext.getCmp('realtimeSwapPieChart').show();
    	}
    },    
    
    chartStacked: function(button, state) {
    	if(state) {
    		Ext.TaskManager.stopAll();
    		var newChart = new MyDesktop.realtimeSwap.views.SwapStackedChart();

    		// remove previous element from panel and add the new chart
    		Ext.getCmp('realtimeSwap-win').remove(Ext.getCmp('realtimeSwap-win').items.getAt(0).id);    		
    		Ext.getCmp('realtimeSwap-win').add(newChart);  
    		
    		Ext.getCmp('realtimeChartGrid').disable();
    		Ext.TaskManager.start(taskSwap);
		
        	Ext.getCmp('realtimeSwapStackedChart').show();
    	}
    },   
    
    loadContent : function(){
    	
    	taskSwap = {
    			run: function() {
    				var swapStore  = Ext.getStore('realtimeSwapStore');
    	    		swapStore.load();
    			},
    			interval: 2000  		
    	};
    	
    	taskPieSwap = {
    			run: function() {
    				var swapPieStore  = Ext.getStore('realtimeSwapPieStore');
    	    		swapPieStore.load();
    			},
    			interval: 2000  		
    	};
    	
    	Ext.TaskManager.start(taskSwap);
    	
    }    
    
});
