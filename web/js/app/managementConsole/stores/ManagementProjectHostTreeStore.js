/**
 * @author CMCC
 */

Ext.define('MyDesktop.managementConsole.stores.ManagementProjectHostTreeStore', {
    extend      : 'Ext.data.TreeStore',
    
    singleton   : true,
    
    constructor : function() {
    	this.id        = 'managementProjectHostTreeStore';
    	this.autoLoad  = false;
        this.proxy     = {
            type: 'ajax',
            url: 'managementConsoleJson/getProjectHostTree.action'
        };
    	this.callParent(arguments);
    }
});