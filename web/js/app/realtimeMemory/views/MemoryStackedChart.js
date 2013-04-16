Ext.define('MyDesktop.realtimeMemory.views.MemoryStackedChart', {
    extend   : 'Ext.chart.Chart',
    alias    : 'widget.StackedChart',
    requires : ['MyDesktop.realtimeMemory.stores.RealtimeMemoryStore'],
    
    constructor: function() {
        this.callParent([{theme: 'Category3'}]);
    },

    initComponent : function() {
    	this.id      = 'realtimeMemoryStackedChart';
    	this.animate = false;
    	this.width   = '100%';
    	this.height  = '100%';
    	this.style   = 'background:#fff',
    	this.text    = 'Memory Usage',
        this.store   = MyDesktop.realtimeMemory.stores.RealtimeMemoryStore;
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
            fields: ['busyMem', 'freeMem'],
            title: 'Memory',
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
            yField: ['busyMem', 'freeMem'],
            title:['Used Ram', 'Free Ram'],
            stacked: true
        }];
       
        this.callParent();
    }
});