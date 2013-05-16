/**
 * @author CMCC
 */

Ext.define('MyDesktop.sensorstats.stores.CategorySensorstatsTreeStore', {
    extend      : 'Ext.data.TreeStore',
    
    singleton   : true,
    
    constructor : function() {
    	this.id        = 'categorySensorstatsTreeStore';
    	this.autoLoad  = false;
    	this.fields    = ['text','myObject', 'idtab'];
        this.proxy     = {
            type   : 'ajax',
            url    : 'sensorstatsJson/getCategoryTree'
        };
        this.listeners = {
			load : function(records) {
				Ext.getCmp('categorySensorstatsTree').getSelectionModel().select(1);
			}
    	};
    	this.callParent(arguments);
    }
});