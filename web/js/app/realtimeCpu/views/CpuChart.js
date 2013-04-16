Ext.define('MyDesktop.realtimeCpu.views.CpuChart', {
    extend   : 'Ext.chart.Chart',
    alias    : 'widget.RealChart',
    requires : ['MyDesktop.realtimeCpu.stores.RealtimeCpuStore'],
    
    constructor: function() {
        this.callParent([{theme: 'Category5'}]);
    },

    initComponent : function() {
    	this.id      = 'realtimeCpuChart';
    	this.animate = false;
    	this.width   = '100%';
    	this.height  = '100%';
    	this.style   = 'background:#fff',
    	this.text    = 'CPU load average (last 1min, 5min, 15min)',
        this.store   = MyDesktop.realtimeCpu.stores.RealtimeCpuStore;
    	this.legend =  {
            position: 'right'
        };
        items: [{
  	      type  : 'text',
  	      text  : 'Simple Title',
  	      font  : '14px Arial',
  	      width : 100,
  	      height: 30,
  	      x : 50, //the sprite x position
  	      y : 10  //the sprite y position
  	    }],
        this.axes    = [
        {
            type: 'Numeric',
            position: 'left',
            minimum: 0,
            //maximum: 1.0,
            fields: ['loadavg1', 'loadavg5', 'loadavg15'],
            minorTickSteps: 1,
            title: 'CPU Load Avg',
            grid: true,
            labelTitle: {
                font: 'bold 14px Arial'
            },
        },{
            type: 'Category',
            position: 'bottom',
            fields: ['timestamp'],
            title: 'Time',
            grid: true,
            labelTitle: {
                font: 'bold 14px Arial'
            }
        }];
    	
    	this.series  = [{
            type: 'column',
            axis: 'left',
            highlight: false,
            xField: 'timestamp',
            yField: ['loadavg1', 'loadavg5', 'loadavg15'],
            //tips: {
            //    trackMouse: true,
            //    width: 180,
            //    height: 28,
            //    renderer: function(storeItem, item) {
            //      this.setTitle(storeItem.get('timestamp') + ': ' + storeItem.get('loadavg1'));
            //    }
            //},
        }];
       
        this.callParent();
    }
});