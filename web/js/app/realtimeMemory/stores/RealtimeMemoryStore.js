Ext.define('MyDesktop.realtimeMemory.stores.RealtimeMemoryStore', {
    extend    : 'Ext.data.Store',
    requires  : 'MyDesktop.realtimeMemory.models.RealtimeMemoryModel',
    model     : 'MyDesktop.realtimeMemory.models.RealtimeMemoryModel',
    singleton : true,
    constructor : function() {
    	this.id   = 'realtimeMemoryStore';
    	this.proxy    = {
	    	type: 'ajax',
	    	  url: 'realtimeMemoryJson/RealtimeMemory.action',
	        reader: {
	            type: 'json'
	        }
	    };
    	this.callParent(arguments);
    }
});