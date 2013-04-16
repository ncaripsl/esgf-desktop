Ext.define('MyDesktop.realtimeSwap.views.SwapStackedChart', {
    extend   : 'Ext.chart.Chart',
    alias    : 'widget.StackedChart',
    requires : ['MyDesktop.realtimeSwap.stores.RealtimeSwapStore'],
    
    constructor: function() {
        this.callParent([{theme: 'Category6'}]);
    },

    initComponent : function() {
    	this.id      = 'realtimeSwapStackedChart';
    	this.animate = false;
    	this.width   = '100%';
    	this.height  = '100%';
    	this.style   = 'background:#fff',
    	this.text    = 'Swap Usage',
        this.store   = MyDesktop.realtimeSwap.stores.RealtimeSwapStore;
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
            fields: ['busySwap', 'freeSwap'],
            title: 'Swap',
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
            //highlight: true,
            xField: 'timestamp',
            yField: ['busySwap', 'freeSwap'],
            title:['Used Swap', 'Free Swap'],
            stacked: true
        }];
       
        this.callParent();
    }
});