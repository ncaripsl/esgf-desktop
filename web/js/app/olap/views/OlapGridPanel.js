/**
 * @author CMCC
 */

Ext.define('MyDesktop.olap.views.OlapGridPanel', {
    extend   : 'Ext.grid.Panel',
    
    alias    : 'widget.olapGridPanel',
    
    requires : ['MyDesktop.olap.stores.ChartGridStore'],
    
    initComponent : function() {
    	this.id      = 'olapgrid';
        this.store   = MyDesktop.olap.stores.ChartGridStore;
        this.border  = false;
        this.columns = [
	        {header: yAxisTitle, dataIndex: 'elapsedTime', flex: 2, id: 'firstColumn' , sortable: false},
	        {header: xAxisTitle, dataIndex: 'timestamp', flex: 3, id: 'secondColumn', sortable: false}
	    ];
        this.callParent();
    }
});
