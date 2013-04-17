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
            title: 'Memory (MB)',
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
            tips: {
                trackMouse: true,
                width: 90,
                height: 28,
                renderer: function(storeItem, item) {
                 for( var i = 0; i < item.series.items.length; i++ ) {
                          if( item == item.series.items[i] ) {
                                  itemsPerRec = item.series.items.length /
 item.storeItem.store.getCount();
                             J=item.series.yField[ i % itemsPerRec ];
                          }
                 }
                this.update( String(item.value[0])+': ' +
 String(item.value[1]));

                }
            },
            title:['Total Ram', 'Free Ram']
        }];
       
        this.callParent();
    }
});