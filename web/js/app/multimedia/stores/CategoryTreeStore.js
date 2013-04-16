/**
 * @author CMCC
 */

Ext.define('MyDesktop.multimedia.stores.CategoryTreeStore', {
    extend      : 'Ext.data.TreeStore',
    
    singleton   : true,
    
    constructor : function() {
    	this.id        = 'categoryTreeStore';
    	this.autoLoad  = false;
    	this.fields    = ['text','myObject', 'idtab'];
        this.proxy     = {
            type   : 'ajax',
            url    : 'multimediaJson/getCategoryTree.action'
        };
        this.listeners = {
			load : function(records) {
				Ext.getCmp('categoryTree').getSelectionModel().select(1);
			}
    	};
    	this.callParent(arguments);
    }
});