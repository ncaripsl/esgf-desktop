/**
 * @author CMCC
 */

Ext.define('MyDesktop.managementConsole.stores.HostStore', {
    extend      : 'Ext.data.Store',
    requires    : ['MyDesktop.managementConsole.models.HostModel'],
    model       : 'MyDesktop.managementConsole.models.HostModel',
    singleton   : true,
    
    constructor : function() {
    	this.id        = 'managementHostStore';
    	this.autoLoad  = false;
    	this.proxy    = {
	    	type: 'ajax',
	    	url: 'managementConsoleJson/getSpotcheckHosts.action',
	        reader: {
	            type: 'json'
	        }
	    };
        
    	this.callParent(arguments);
    }
});