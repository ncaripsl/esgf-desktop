Ext.define('MyDesktop.realtimeMemory.RealtimeMemoryModule', {
    extend: 'Ext.ux.desktop.Module',
    requires: ['Ext.chart.*', 'MyDesktop.realtimeMemory.views.MemoryChart',
               'Ext.chart.*', 'MyDesktop.realtimeMemory.views.MemoryPieChart',
               'Ext.chart.*', 'MyDesktop.realtimeMemory.views.MemoryStackedChart'],
    id: 'realtimeMemory-win',
    
    init : function() {
        // No launcher means we don't appear on the Start Menu...
        this.launcher = {
            text: 'Realtime Memory',
            iconCls:'realtimeMemory',
            handler : this.createWindow,
            scope: this
        };
    },
    
    createWindow : function(){
        var desktop   = this.app.getDesktop();
        var win       = desktop.getWindow('realtimeMemory-win');
        var memoryChart = new MyDesktop.realtimeMemory.views.MemoryChart();
        if(!win){
            win = desktop.createWindow({
                id             : 'realtimeMemory-win',
                title          : 'Memory Realtime Monitoring',
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
        	            	id            : 'realtimeMemoryColumnChartButton',
        	            	disabled      : false,
        	                icon          : '/esgf-desktop/img/realtimeMemory/icon-graf1.gif',
        	                cls           : 'x-btn-icon',
        	                enableToggle  : true,
        	                toggleHandler : this.chartColumn,
        	                pressed       : true,
        	                toggleGroup   : 'realtimeMemory_chartORgrid',
        	                tooltip       : 'Column'
        	            }/*,
          	            {
          	            	id            : 'realtimeMemoryLineChartButton',
          	            	disabled      : false,
          	                icon          : '/esgf-desktop/img/realtimeMemory/icon-graf2.gif',
          	                cls           : 'x-btn-icon',
          	                enableToggle  : true,
          	                toggleHandler : this.chartLine,
          	                toggleGroup   : 'realtimeMemory_chartORgrid',
          	                tooltip       : 'Line'
          	            },
          	            {
          	            	id            : 'realtimeMemoryAreaChartButton',
          	            	disabled      : false,
          	                icon          : '/esgf-desktop/img/realtimeMemory/icon-graf3.gif',
          	                cls           : 'x-btn-icon',
          	                enableToggle  : true,
          	                toggleHandler : this.chartArea,
          	                toggleGroup   : 'realtimeMemory_chartORgrid',
          	                tooltip       : 'Area'
          	            }/*,                        
          	            {
          	            	id            : 'realtimeMemoryPieChartButton',
          	            	disabled      : false,
          	                icon          : '/esgf-desktop/img/realtimeMemory/icon-graf4.gif',
          	                cls           : 'x-btn-icon',
          	                enableToggle  : true,
          	                toggleHandler : this.chartPie,
          	                toggleGroup   : 'realtimeMemory_chartORgrid',
          	                tooltip       : 'Pie'
          	            },
          	            {
          	            	id            : 'realtimeMemoryStackedChartButton',
          	            	disabled      : false,
          	                icon          : '/esgf-desktop/img/realtimeMemory/icon-graf5.gif',
          	                cls           : 'x-btn-icon',
          	                enableToggle  : true,
          	                toggleHandler : this.chartStacked,
          	                toggleGroup   : 'realtimeMemory_chartORgrid',
          	                tooltip       : 'Stacked'
          	            }*/],
                items          : [memoryChart]
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
    	
    	var realChart = Ext.getCmp('realtimeMemoryChart');
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
    		var newChart = new MyDesktop.realtimeMemory.views.MemoryChart();

    		// remove previous element from panel and add the new chart
    		Ext.getCmp('realtimeMemory-win').remove(Ext.getCmp('realtimeMemory-win').items.getAt(0).id);    		
    		Ext.getCmp('realtimeMemory-win').add(newChart);  
    		
    		Ext.TaskManager.start(taskMemory);
		
        	Ext.getCmp('realtimeMemoryChart').show();
    	}
    },
    
    chartLine: function(button, state) {
    	Ext.TaskManager.stopAll();
    	if(state) {    		
    		var newChart = new MyDesktop.realtimeMemory.views.MemoryChart();
    		
    		newChart.series.remove(newChart.series.getAt(0));
    		
    		// remove old series and add line series
    		newChart.series.add({
    	           type: 'line',
    	           highlight: {
    	               size: 7,
    	               radius: 7
    	           },
    	           xField: 'timestamp',
    	           yField: 'totMem',
    	           title:['Total Ram'],
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
	 	           yField: 'freeMem',
	   	           title:['Free Ram'],
	 	           smooth: true,
	 	           markerConfig: {
	 	               type: 'cross',
	 	               size: 4,
	 	               radius: 4,
	 	               'stroke-width': 0
	 	           }
 	         }); 
    		
    		// remove previous element from panel and add the new chart
    		Ext.getCmp('realtimeMemory-win').remove(Ext.getCmp('realtimeMemory-win').items.getAt(0).id);
   		
    		Ext.getCmp('realtimeMemory-win').add(newChart);
    		Ext.TaskManager.start(taskMemory);
        	Ext.getCmp('realtimeMemoryChart').show();
    	}
    },
    
    chartArea: function(button, state) {
    	if(state) {
    		Ext.TaskManager.stopAll();
    		var newChart = new MyDesktop.realtimeMemory.views.MemoryChart();    		
    		newChart.series.remove(newChart.series.getAt(0));
   		
        	// remove old series and add area series
    		newChart.series.add({
	            type: 'line',
	            id: 'realtimeMemory_area_series',
	            //highlight: true,
	            axis: 'left',
	            xField: 'timestamp',
	            yField: 'totMem',
	   	        title:['Total Ram'],
                smooth: true,
                fill: true,
                fillOpacity: 0.5,
	            style: {
                    opacity: 0.70
                },	            
	        });
    		newChart.series.add({
	            type: 'line',
	            id: 'realtimeMemory_area_series',
	            //highlight: true,
	            axis: 'left',
	            xField: 'timestamp',
	            yField: 'freeMem',
	   	        title:['Free Ram'],
                smooth: true,
                fill: true,
                fillOpacity: 0.5,
	            style: {
                    opacity: 0.70
                },	            
	        });
    		    		
    		// remove previous element from panel and add the new chart
    		Ext.getCmp('realtimeMemory-win').remove(Ext.getCmp('realtimeMemory-win').items.getAt(0).id);
    		
    		Ext.getCmp('realtimeMemory-win').add(newChart);
    		Ext.TaskManager.start(taskMemory);
        	Ext.getCmp('realtimeMemoryChart').show();
    	}
    },
    
    chartPie: function(button, state) {
    	if(state) {
    		Ext.TaskManager.stopAll();
    		var newChart = new MyDesktop.realtimeMemory.views.MemoryPieChart();

    		// remove previous element from panel and add the new chart
    		Ext.getCmp('realtimeMemory-win').remove(Ext.getCmp('realtimeMemory-win').items.getAt(0).id);    		
    		Ext.getCmp('realtimeMemory-win').add(newChart);  
    		
    		Ext.getCmp('realtimeChartGrid').disable();    		
  
    		Ext.TaskManager.start(taskPieMemory);
		
        	Ext.getCmp('realtimeMemoryPieChart').show();
    	}
    },    
    
    chartStacked: function(button, state) {
    	if(state) {
    		Ext.TaskManager.stopAll();
    		var newChart = new MyDesktop.realtimeMemory.views.MemoryStackedChart();

    		// remove previous element from panel and add the new chart
    		Ext.getCmp('realtimeMemory-win').remove(Ext.getCmp('realtimeMemory-win').items.getAt(0).id);    		
    		Ext.getCmp('realtimeMemory-win').add(newChart);  
    		
    		Ext.getCmp('realtimeChartGrid').disable();
    		Ext.TaskManager.start(taskMemory);
		
        	Ext.getCmp('realtimeMemoryStackedChart').show();
    	}
    },   
    
    loadContent : function(){ 	
    	
    	taskMemory = {
    			run: function() {
    				var memoryStore  = Ext.getStore('realtimeMemoryStore');
    	    		memoryStore.load();
    			},
    			interval: 2000  		
    	};
    	
    	taskPieMemory = {
    			run: function() {
    				var memoryPieStore  = Ext.getStore('realtimeMemoryPieStore');
    	    		memoryPieStore.load();
    			},
    			interval: 2000  		
    	};
    	
    	Ext.TaskManager.start(taskMemory);
    	
    }    
    
});
