Ext.define('MyDesktop.realtimeCpu.stores.RealtimeCpuStore', {
    extend    : 'Ext.data.Store',
    requires  : ['MyDesktop.realtimeCpu.models.RealtimeCpuModel'],
    model     : 'MyDesktop.realtimeCpu.models.RealtimeCpuModel',
    singleton : true,
    constructor : function() {
    	this.id   = 'realtimeCpuStore';
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