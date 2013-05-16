/**
 * @author CMCC
 */

Ext.define('MyDesktop.sensorstats.SensorstatsModule', {
    extend: 'Ext.ux.desktop.Module',
    
    requires: ['MyDesktop.sensorstats.views.CategorySensorstatsTreePanel',
               'MyDesktop.sensorstats.views.OutputPanel'],
    
    id: 'sensorstats-win',
    
    init : function() {
        // No launcher means we don't appear on the Start Menu...
        this.launcher = {
            text: 'Sensor Stats',
            iconCls:'sensorstats',
            handler : this.createWindow,
            scope: this
        };
    },
    
    createWindow : function() {
    	var desktop   = this.app.getDesktop();
    	var win       = desktop.getWindow(this.id);
        if (!win) {
        	
        	var categoryTree = new MyDesktop.sensorstats.views.CategorySensorstatsTreePanel();
        	var outputPanel = new MyDesktop.sensorstats.views.OutputPanel();
        	
            win = desktop.createWindow({
            	id              : 'sensorstats-win',
                title           : 'Sensor Stats',
                width           : 1400,
                //height          : 768,
                height          : 300,
                iconCls         : 'sensorstats',
                animCollapse    : false,
                constrainHeader : true,
                layout          : 'fit',
                items: [{
                    xtype   : 'panel',
                    layout  : 'border',
                    border  : false,
                    items: [categoryTree,
                            outputPanel]
                }]
            });
        }
        win.show();
        win.on('beforerender', this.loadContent());        
        return win;
    },
    
    loadContent : function() {
    	Ext.getCmp('categorySensorstatsTree').expand();
    }

});

