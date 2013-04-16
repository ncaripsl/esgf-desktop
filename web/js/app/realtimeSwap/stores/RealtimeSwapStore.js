Ext.define('MyDesktop.realtimeSwap.stores.RealtimeSwapStore', {
    extend    : 'Ext.data.Store',
    requires  : ['MyDesktop.realtimeSwap.models.RealtimeSwapModel'],
    model     : 'MyDesktop.realtimeSwap.models.RealtimeSwapModel',
    singleton : true,
    constructor : function() {
    	this.id   = 'realtimeSwapStore';
    	this.proxy    = {
	    	type: 'ajax',
	    	  url: 'realtimeSwapJson/RealtimeSwap.action',
	        reader: {
	            type: 'json'
	        }
	    };
	
    	this.callParent(arguments);
    }
});