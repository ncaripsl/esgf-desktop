/**
 * @author CMCC
 */

Ext.define('MyDesktop.sensorstats.views.OutputPanel', {
    extend: 'Ext.tab.Panel',
    
    initComponent : function() {
    	
    	Ext.apply(this, {
    		id      : 'outputSensorstatsPanel',
            region  : 'center',
            margins : '5 5 5 0',
            layout  : 'fit'
    	});
        this.callParent();
    }
});