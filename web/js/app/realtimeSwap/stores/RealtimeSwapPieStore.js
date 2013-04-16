Ext.define('MyDesktop.realtimeSwap.stores.RealtimeSwapPieStore', {
    extend    : 'Ext.data.Store',
    requires  : 'MyDesktop.realtimeSwap.models.RealtimeSwapPieModel',
    model     : 'MyDesktop.realtimeSwap.models.RealtimeSwapPieModel',
    singleton : true,
    constructor : function() {
    	this.id   = 'realtimeSwapPieStore';
    	this.proxy    = {
	    	type: 'ajax',
	    	  url: 'realtimeSwapJson/RealtimeSwapPieChart.action',
	        reader: {
	            type: 'json'
	        }
	    };
    	this.callParent(arguments);
    }
});