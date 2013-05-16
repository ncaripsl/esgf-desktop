/**
 * @author CMCC
 */

Ext.define('MyDesktop.sensorstats.stores.SensorstatsStore', {
    
	extend    : 'Ext.data.Store',
	requires  : ['MyDesktop.sensorstats.models.SensorstatsModel'],
    model     : 'MyDesktop.sensorstats.models.SensorstatsModel',
    singleton : false,
    
    constructor : function() {
//    	this.id        = 'sensorstatsStore';
    	this.proxy     = {
			type: 'ajax',
	    	url: 'sensorstatsJson/getSensorStats',
	        reader: {
	            type: 'json'
	        }
    	};
    	this.callParent(arguments);
    }
});