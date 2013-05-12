/**
 * @author CMCC
 */

Ext.define('MyDesktop.users.stores.ProjectTreeStore', {
    extend      : 'Ext.data.TreeStore',
    
    singleton   : true,
    
    constructor : function() {
    	this.id        = 'usersTreeStore';
    	this.autoLoad  = false;
    	this.fields    = ['text', 'myObject'];
        this.proxy     = {
            type   : 'ajax',
            url    : 'hostInfoJson/getProjectTree.action'
        };
    	this.callParent(arguments);
    }
});