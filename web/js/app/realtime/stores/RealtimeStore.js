Ext.define('MyDesktop.realtime.stores.RealtimeStore', {
    extend    : 'Ext.data.Store',
    requires  : ['MyDesktop.realtime.models.RealtimeModel'],
    model     : 'MyDesktop.realtime.models.RealtimeModel',
    singleton : true,
    constructor : function() {
    	this.id   = 'realtimeStore';
    	this.proxy    = {
	    	type: 'ajax',
	    	//url: 'realtimeLoadAvgJson/RealtimeLoadAvg.action',
	    	//url: 'realtimeLoadAvgJson/RandomLoadAvg.action',
	    	  url: 'realtimeLoadAvgJson/RealtimeLoadAvgFile.action',
	        reader: {
	            type: 'json'
	        }
	    };
	
    	this.callParent(arguments);
    }
});