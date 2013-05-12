/**
 * @author CMCC
 */

Ext.define('MyDesktop.usersmap.stores.ProjectTreeStore', {
    extend      : 'Ext.data.TreeStore',
    
    singleton   : true,
    
    constructor : function() {
    	this.id        = 'usersmapTreeStore';
    	this.autoLoad  = false;
    	this.fields    = ['text', 'myObject'];
        this.proxy     = {
            type   : 'ajax',
            url    : 'usersmapJson/getProjectTree.action'
        };
    	this.callParent(arguments);
    }
});