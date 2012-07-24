/**
 * @author CMCC
 */

Ext.define('MyDesktop.olap.stores.ProjectHostTreeStore', {
    extend      : 'Ext.data.TreeStore',
    
    singleton   : true,
    
    constructor : function() {
    	this.id        = 'olapProjectHostTreeStore';
    	this.autoLoad  = false;
        this.proxy     = {
            type: 'ajax',
            url: 'olapJson/getProjectHostTree.action'
        };
    	this.callParent(arguments);
    }
});