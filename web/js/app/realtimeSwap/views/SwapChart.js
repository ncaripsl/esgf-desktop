Ext.define('MyDesktop.realtimeSwap.views.SwapChart', {
    extend   : 'Ext.chart.Chart',
    alias    : 'widget.SwapChart',
    requires : ['MyDesktop.realtimeSwap.stores.RealtimeSwapStore'],
    
    constructor: function() {
        this.callParent([{theme: 'Category6'}]);
    },

    initComponent : function() {
    	this.id      = 'realtimeSwapChart';
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
            fields: ['totSwap', 'freeSwap'],
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
            highlight: false,
            xField: 'timestamp',
            yField: ['totSwap', 'freeSwap'],
            title:['Total Swap', 'Free Swap']
        }];
       
        this.callParent();
    }
});