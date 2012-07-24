/**
 * @author CMCC
 */

Ext.define('MyDesktop.olap.stores.DimensionsTreeStore', {
    extend      : 'Ext.data.TreeStore',
    
    singleton   : true,
    
    constructor : function() {
    	this.id        = 'olapDimensionsTreeStore';
    	this.autoLoad  = false;
        this.proxy     = {
            type: 'ajax',
            url: 'treeComboTabsJson/getDimensionsTree.action'
        };
    	this.callParent(arguments);
    }
});