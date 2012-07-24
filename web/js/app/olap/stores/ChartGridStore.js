/**
 * @author CMCC
 */

Ext.define('MyDesktop.olap.stores.ChartGridStore', {
    
	extend    : 'Ext.data.Store',
    
	requires  : ['MyDesktop.olap.models.ChartGridModel'],
    
	model     : 'MyDesktop.olap.models.ChartGridModel',
    
	singleton : true,
    
    constructor : function() {
    	this.id   = 'olapChartGridStore';
    	this.callParent(arguments);
    }
});