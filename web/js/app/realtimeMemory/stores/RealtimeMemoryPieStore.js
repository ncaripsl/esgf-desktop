Ext.define('MyDesktop.realtimeMemory.stores.RealtimeMemoryPieStore', {
    extend    : 'Ext.data.Store',
    requires  : 'MyDesktop.realtimeMemory.models.RealtimeMemoryPieModel',
    model     : 'MyDesktop.realtimeMemory.models.RealtimeMemoryPieModel',
    singleton : true,
    constructor : function() {
    	this.id   = 'realtimeMemoryPieStore';
    	this.proxy    = {
	    	type: 'ajax',
	    	  url: 'realtimeMemoryJson/RealtimeMemoryPieChart.action',
	        reader: {
	            type: 'json'
	        }
	    };
    	this.callParent(arguments);
    }
});