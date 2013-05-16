/**
 * @author CMCC
 */

Ext.define('MyDesktop.sensorstats.views.CategorySensorstatsTreePanel', {
    extend   : 'Ext.tree.Panel',
    
    requires : ['MyDesktop.sensorstats.stores.CategorySensorstatsTreeStore',
                'MyDesktop.sensorstats.views.SensorstatsGridPanel'],

    initComponent : function() {
    	Ext.apply(this, {
            id          : 'categorySensorstatsTree',
            title       : 'Sensors',
            collapsible : true,
            collapsed   : false, 
            region      : 'west',
            floatable   : false,
            split       : true,
            width       : 210,
            margins     : '5 0 5 5',
            rootVisible : true,  // impostato a 'false' espande automaticamente i nodi figli effettuando la chiamata ajax
            lines       : false,
            autoScroll  : true,
            store       : MyDesktop.sensorstats.stores.CategorySensorstatsTreeStore,
            root        : {
               expanded : true,
               text     : 'Sensors',
               iconCls  : 'sensors'
            },
            listeners   : {
                select  : {
                	fn  : function(view, record, item, index, event) {
                		if (record.get('leaf') == true) {
                			var sensor_name = record.get('text');
                			var sensor_table = record.get('myObject');
                			var idtab = record.get('idtab');
                			
                			var sensorgrid = new MyDesktop.sensorstats.views.SensorstatsGridPanel();
                			
//                			Ext.getCmp('outputSensorstatsPanel').add(sensorgrid);
                			
                			if (!Ext.getCmp('tab' + idtab)) {
	                			Ext.getCmp('outputSensorstatsPanel').add({
	                    			id       : 'tab' + idtab,
	                    			title    : sensor_name,
	                    			closable : true,
	                    			layout   : 'fit',
	                    			items    : [sensorgrid]
	                    		});
	                		}
	                		Ext.getCmp('tab' + idtab).show();
                			
                			sensorgrid.getStore().load({
                				params : {
                					sensor_table : sensor_table,
                					sensor_name  : sensor_name
                				}
                			});
                			
                		}
                    }
                }
            }

        });
        this.callParent(arguments);
    }
});