Ext.define('MyDesktop.realtimeMemory.views.MemoryPieChart', {
    extend   : 'Ext.chart.Chart',
    alias    : 'widget.MemoryChart',
    requires : ['MyDesktop.realtimeMemory.stores.RealtimeMemoryPieStore'],
    
    constructor: function() {
        this.callParent([{theme: 'Category3'}]);
    },
    
    initComponent : function() {
    	this.id      = 'realtimeMemoryPieChart';
    	this.animate = false;
    	this.width   = '100%';
    	this.height  = '100%';
    	this.style   = 'background:#fff',
    	this.text    = 'Memory Usage',
        this.store   = MyDesktop.realtimeMemory.stores.RealtimeMemoryPieStore;
    	this.legend =  {
            position: 'right'
        };
        this.insetPadding = 40;
        
        this.series = [
                       {
        		type: 'pie',
        		field: 'value',
        		showInLegend: true,
        		highlight: {
        	        segment: {
        	            margin: 20
        	        }
        	    },
        	    label: {
        	        field: 'label',
        	        display: 'rotate',
        	        contrast: true,
        	        font: '14px Arial'
        	    },
        	    tips: {
				  trackMouse : true,
				  width      : 100,
			      renderer   : function(storeItem, item) {
			        this.setTitle(storeItem.get('label') + ': ' + storeItem.get('value'));
			      }
			    }
    	    }];
     
        this.callParent();
    }
});