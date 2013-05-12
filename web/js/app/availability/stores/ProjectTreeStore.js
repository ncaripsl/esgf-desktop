/**
 * @author CMCC
 */

Ext.define('MyDesktop.availability.stores.ProjectTreeStore', {
    extend      : 'Ext.data.TreeStore',
    
    singleton   : true,
    
    constructor : function() {
    	this.id        = 'availabilityTreeStore';
    	this.autoLoad  = false;
    	this.fields    = ['text', 'myObject'];
        this.proxy     = {
            type   : 'ajax',
            url    : 'hostInfoJson/getProjectTree.action'
        };
    	this.callParent(arguments);
    }
});