Ext.define('MyDesktop.realtimeSwap.views.SwapPieChart', {
    extend   : 'Ext.chart.Chart',
    alias    : 'widget.SwapChart',
    requires : ['MyDesktop.realtimeSwap.stores.RealtimeSwapPieStore'],
    
    constructor: function() {
        this.callParent([{theme: 'Category6'}]);
    },
    
    initComponent : function() {
    	this.id      = 'realtimeSwapPieChart';
    	this.animate = false;
    	this.width   = '100%';
    	this.height  = '100%';
    	this.style   = 'background:#fff',
    	this.text    = 'Swap Usage',
        this.store   = MyDesktop.realtimeSwap.stores.RealtimeSwapPieStore;
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