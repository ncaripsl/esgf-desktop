/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/*!
* Ext JS Library 4.0
* Copyright(c) 2006-2011 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/

Ext.define('MyDesktop.realtimeCpu.RealtimeCpuModule', {
    extend: 'Ext.ux.desktop.Module',
    requires: ['Ext.chart.*', 'MyDesktop.realtimeCpu.views.CpuChart'],
    id: 'realtimeCpu-win',

    init : function() {
        // No launcher means we don't appear on the Start Menu...
        this.launcher = {
            text: 'Realtime Cpu',
            iconCls:'realtimeCpu',
            handler : this.createWindow,
            scope: this
        };
    },

    createWindow : function(){
        var desktop   = this.app.getDesktop();
        var win       = desktop.getWindow('realtimeCpu-win');
        var cpuChart = new MyDesktop.realtimeCpu.views.CpuChart();
        if(!win){
            win = desktop.createWindow({
                id             : 'realtimeCpu-win',
                title          : 'CPU Realtime Monitoring',
                width          : 600,
                height         : 300,
                iconCls        : 'realtimeCpu',
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
        	            	id            : 'realtimeColumnChartButton',
        	            	disabled      : false,
        	                icon          : '/esgf-desktop/img/realtimeCpu/icon-graf1.gif',
        	                cls           : 'x-btn-icon',
        	                enableToggle  : true,
        	                toggleHandler : this.chartColumn,
        	                pressed       : true,
        	                toggleGroup   : 'realtime_chartORgrid',
        	                tooltip       : 'Column'
        	            }/*,
          	            {
          	            	id            : 'realtimeLineChartButton',
          	            	disabled      : false,
          	                icon          : '/esgf-desktop/img/realtimeCpu/icon-graf2.gif',
          	                cls           : 'x-btn-icon',
          	                enableToggle  : true,
          	                toggleHandler : this.chartLine,
          	                toggleGroup   : 'realtime_chartORgrid',
          	                tooltip       : 'Line'
          	            },
          	            {
          	            	id            : 'realtimeAreaChartButton',
          	            	disabled      : false,
          	                icon          : '/esgf-desktop/img/realtimeCpu/icon-graf3.gif',
          	                cls           : 'x-btn-icon',
          	                enableToggle  : true,
          	                toggleHandler : this.chartArea,
          	                toggleGroup   : 'realtime_chartORgrid',
          	                tooltip       : 'Area'
          	            }*/],
                items          : [cpuChart]
            });
        }
        win.show();
        win.on('beforerender', this.loadContent());
        win.on('beforeclose', function() {
        	cpuStopCondition = false;
        });
        return win;
    },
    
    addRemoveGridFromChart: function(button, state) {
    	
    	var cpuChart = Ext.getCmp('realtimeCpuChart');
		if (state) {
			cpuChart.axes.get('left').grid = true;
			cpuChart.axes.get('bottom').grid = true;
			cpuChart.surface.removeAll();
			cpuChart.redraw(false);
		}
		else {
			cpuChart.axes.get('left').grid = false;
			cpuChart.axes.get('bottom').grid = false;
			cpuChart.surface.removeAll();
			cpuChart.redraw(false);
		}
    },
    
    chartColumn: function(button, state) {
    	if(state) {
    		var newChart = new MyDesktop.realtimeCpu.views.CpuChart();

    		// remove previous element from panel and add the new chart
    		Ext.getCmp('realtimeCpu-win').remove(Ext.getCmp('realtimeCpu-win').items.getAt(0).id);    		
    		Ext.getCmp('realtimeCpu-win').add(newChart);    		
		
        	Ext.getCmp('realtimeCpuChart').show();
    	}
    },
    
    chartLine: function(button, state) {
    	if(state) {    		
    		var newChart = new MyDesktop.realtimeCpu.views.CpuChart();
    		
    		newChart.series.remove(newChart.series.getAt(0));
    		
    		// remove column series and add line series
    		newChart.series.add({
    	           type: 'line',
    	           highlight: {
    	               size: 7,
    	               radius: 7
    	           },
    	           xField: 'timestamp',
    	           yField: 'loadavg1',
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
 	           yField: 'loadavg5',
 	           smooth: true,
 	           markerConfig: {
 	               type: 'cross',
 	               size: 4,
 	               radius: 4,
 	               'stroke-width': 0
 	           }
 	         }); 
    		
    		 newChart.series.add({
  	           type: 'line',
  	           highlight: {
  	               size: 7,
  	               radius: 7
  	           },
  	           xField: 'timestamp',
  	           yField: 'loadavg15',
  	           smooth: true,
  	           markerConfig: {
  	               type: 'cross',
  	               size: 4,
  	               radius: 4,
  	               'stroke-width': 0
  	           }
  	          }); 
    		
    		// remove previous element from panel and add the new chart
    		Ext.getCmp('realtimeCpu-win').remove(Ext.getCmp('realtimeCpu-win').items.getAt(0).id);
   		
    		Ext.getCmp('realtimeCpu-win').add(newChart);
        	Ext.getCmp('realtimeCpuChart').show();
    	}
    },
    
    chartArea: function(button, state) {
    	if(state) {
    		var newChart = new MyDesktop.realtimeCpu.views.CpuChart();    		
    		newChart.series.remove(newChart.series.getAt(0));
   		
        	// remove column series and add area series
    		newChart.series.add({
	            type: 'line',
	            id: 'realtime_area_series',
	            //highlight: false,
	            axis: 'left',
	            xField: 'timestamp',
	            yField: 'loadavg1' ,
                smooth: true,
                fill: true,
                fillOpacity: 0.5,
	            style: {
                    opacity: 0.70
                },
	        });
    		
    		newChart.series.add({
	            type: 'line',
	            id: 'realtime_area_series',
	            //highlight: false,
	            axis: 'left',
	            xField: 'timestamp',
	            yField: 'loadavg5',
                smooth: true,
                fill: true,
                fillOpacity: 0.5,
	            style: {
                    opacity: 0.70
                },
	        });
    		    
    		newChart.series.add({
	            type: 'line',
	            id: 'realtime_area_series',
	            //highlight: false,
	            axis: 'left',
	            xField: 'timestamp',
	            yField: 'loadavg15',
                smooth: true,
                fill: true,
                fillOpacity: 0.5,
	            style: {
                    opacity: 0.70
                },
	        });
    		    
    		    		
    		// remove previous element from panel and add the new chart
    		Ext.getCmp('realtimeCpu-win').remove(Ext.getCmp('realtimeCpu-win').items.getAt(0).id);
    		
    		Ext.getCmp('realtimeCpu-win').add(newChart);
        	Ext.getCmp('realtimeCpuChart').show();
    	}
    },
    
    loadContent : function(){
		    	
    	cpuStopCondition = true;
    	var realStore  = Ext.getStore('realtimeCpuStore');
    	
    	var task = {
    			run: function() {
    	    		realStore.load();
    	    		
    	    		return cpuStopCondition;
    			},
    			interval: 2000  		
    	};
    	Ext.TaskManager.start(task);
    	
    },

});

