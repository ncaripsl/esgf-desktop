/**
 * @author CMCC
 */

Ext.define('MyDesktop.deploy.stores.ProjectTreeStore', {
    extend      : 'Ext.data.TreeStore',
    
    singleton   : true,
    
    constructor : function() {
    	this.id        = 'deployTreeStore';
    	this.autoLoad  = false;
    	this.fields    = ['text', 'myObject'];
        this.proxy     = {
            type   : 'ajax',
            url    : 'hostInfoJson/getProjectTree.action'
        };
    	this.callParent(arguments);
    }
});