/**
 * @author CMCC
 */

Ext.define('MyDesktop.datastats.views.OlapGridPanel', {
    extend   : 'Ext.grid.Panel',
    
    alias    : 'widget.datastatsGridPanel',
    
    requires : ['MyDesktop.datastats.stores.ChartGridStore'],
    
    initComponent : function() {
    	this.id      = 'datastatsgrid';
        this.store   = MyDesktop.datastats.stores.ChartGridStore;
        this.border  = false;
        this.columns = [
            {header: datastatsdim, dataIndex: 'dimension', flex: 3, id: 'secondColumn', sortable: false},
	        {header: datastatsmetric, dataIndex: 'measure', flex: 2, id: 'firstColumn' , sortable: false}
	    ];
        this.callParent();
    }
});
