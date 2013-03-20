/**
 * @author CMCC
 */

Ext.define('MyDesktop.datastats.stores.ChartGridStore', {
	
	extend    : 'Ext.data.Store',
	requires  : ['MyDesktop.datastats.models.ChartGridModel'],
	model     : 'MyDesktop.datastats.models.ChartGridModel',
	singleton : true,
    
    constructor : function() {
    	this.id   = 'datastatsChartGridStore';
    	this.callParent(arguments);
    }
});