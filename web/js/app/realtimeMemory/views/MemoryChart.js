Ext.define('MyDesktop.realtimeMemory.views.MemoryChart', {
    extend   : 'Ext.chart.Chart',
    alias    : 'widget.RealChart',
    requires : ['MyDesktop.realtimeMemory.stores.RealtimeMemoryStore'],
    
    constructor: function() {
        this.callParent([{theme: 'Category3'}]);
    },

    initComponent : function() {
    	this.id      = 'realtimeMemoryChart';
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
  	      //width : 100,
  	      //height: 30,
  	      x : 50, //the sprite x position
  	      y : 10  //the sprite y position
  	    }],
        this.axes    = [
        {
            type: 'Numeric',
            position: 'left',
            minimum: 0,
            fields: ['totMem', 'freeMem'],
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
            highlight: false,
            xField: 'timestamp',
            yField: ['totMem', 'freeMem'],
            title:['Total Ram', 'Free Ram']
        }];
       
        this.callParent();
    }
});