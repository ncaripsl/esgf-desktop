/**
 * @author CMCC
 */

Ext.define('MyDesktop.sensorstats.views.SensorstatsGridPanel', {
    extend   : 'Ext.grid.Panel',
    
    requires : ['MyDesktop.sensorstats.models.SensorstatsModel'],
    
    initComponent : function() {
    	this.store       = {
			xtype : 'store',
			model : 'MyDesktop.sensorstats.models.SensorstatsModel',
			proxy : {
				type: 'ajax',
		    	url: 'sensorstatsJson/getSensorStats',
		        reader: {
		            type: 'json'
		        }
	    	}
    	};
        this.border      = false;
        this.columns     = [
			{header: 'Host',           dataIndex: 'host_name',   flex: 3, sortable: true},
	        {header: 'Sensor',         dataIndex: 'sensor_name', flex: 2, sortable: true},
	        {header: '5 min o',    dataIndex: 'last5m_o',    flex: 2, sortable: true, renderer: this.optimRenderer},
	        {header: '1 hour o',   dataIndex: 'last1h_o',    flex: 2, sortable: true, renderer: this.optimRenderer},
	        {header: '1 day o',    dataIndex: 'last1d_o',    flex: 2, sortable: true, renderer: this.optimRenderer},
	        {header: '1 week o',   dataIndex: 'last1w_o',    flex: 2, sortable: true, renderer: this.optimRenderer},
	        {header: '1 month o',  dataIndex: 'last1m_o',    flex: 2, sortable: true, renderer: this.optimRenderer},
	        {header: '1 year o',   dataIndex: 'last1y_o',    flex: 2, sortable: true, renderer: this.optimRenderer},
	        {header: '5 min p',   dataIndex: 'last5m_p',    flex: 2, sortable: true, renderer: this.pessimRenderer},
	        {header: '1 hour p',  dataIndex: 'last1h_p',    flex: 2, sortable: true, renderer: this.pessimRenderer},
	        {header: '1 day p',   dataIndex: 'last1d_p',    flex: 2, sortable: true, renderer: this.pessimRenderer},
	        {header: '1 week p',  dataIndex: 'last1w_p',    flex: 2, sortable: true, renderer: this.pessimRenderer},
	        {header: '1 month p', dataIndex: 'last1m_p',    flex: 2, sortable: true, renderer: this.pessimRenderer},
	        {header: '1 year p',  dataIndex: 'last1y_p',    flex: 2, sortable: true, renderer: this.pessimRenderer},
	        {header: 'Time',      dataIndex: 'time_stamp',  flex: 4, sortable: true},
	    ];
        this.callParent();
    },
    
    optimRenderer : function(val, metaData) {
    	metaData.style+='background-color: rgb(216, 255, 191);';
        return '<span>' + val + '</span>';
    },
    
    pessimRenderer : function(val, metaData) {
    	metaData.style+='background-color: rgb(255, 255, 179);';
        return '<span>' + val + '</span>';
    }
});
