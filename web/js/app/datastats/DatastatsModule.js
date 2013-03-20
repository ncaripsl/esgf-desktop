/**
 * @author CMCC
 */

Ext.define('MyDesktop.datastats.DatastatsModule', {
    extend: 'Ext.ux.desktop.Module',
    requires: ['MyDesktop.datastats.views.ComboPanel',
               'MyDesktop.datastats.views.OutputPanel'],
               
    id: 'datastats-win',
    
    init : function() {
        // No launcher means we don't appear on the Start Menu...
        this.launcher = {
            text: 'Data Statistics',
            iconCls:'datastats',
            handler : this.createWindow,
            scope: this
        };

    },
    
    createWindow : function() {
    	var desktop   = this.app.getDesktop();
    	var win       = desktop.getWindow(this.id);
        if (!win) {
        	
        	var comboPanel = new MyDesktop.datastats.views.ComboPanel();
        	var outputPanel = new MyDesktop.datastats.views.OutputPanel();

        	win = desktop.createWindow({
            	id              : 'datastats-win',
                title           : 'Data Statistics',
                width           : 1024,
                height          : 768,
                iconCls         : 'datastats',
                animCollapse    : false,
                constrainHeader : true,
                layout          : 'fit',
                items: [
                 {
                	xtype:'panel',
                	border : false,
                	layout : 'border',
                	items : [comboPanel, outputPanel]
                }]
            });
        }
        win.show();
        win.on('beforerender', this.loadContent());
        return win;
    },
    
    loadContent: function() {
    	// get content of combo boxes
    	datastatsmetric = Ext.getCmp('datastatsmetric').getValue();
	    datastatsdim = Ext.getCmp('datastatsdim').getValue();
	    datastatsorder = Ext.getCmp('datastatsorder').getValue();
	    datastatssource = Ext.getCmp('datastatssource').getValue();
        
        // set proxy and load store
        Ext.getStore('datastatsChartGridStore').setProxy({
		    	type: 'ajax',
		    	url: 'datastatsJson/loadDatastats',
		        reader: {
		            type: 'json'
		        }
		    });
        Ext.getStore('datastatsChartGridStore').load({
 		    params:{
 		    	datastatsmetric : datastatsmetric,
 		    	datastatsdim    : datastatsdim,
 		    	datastatsorder  : datastatsorder,
 		    	datastatssource : datastatssource
		    }
		});
        
        // when the store is loaded, enable buttons and show chart
        Ext.getStore('datastatsChartGridStore').on('load', function(records) {
        	if (records.getTotalCount() > 1) {
                Ext.getCmp('datastatsCSVButton').enable();
                Ext.getCmp('datastatsGridButton').enable();
                Ext.getCmp('datastatsColumnChartButton').enable();
                Ext.getCmp('datastatsLineChartButton').enable();
                Ext.getCmp('datastatsAreaChartButton').enable();
   			}
        	// if the number of results is only one, disable line and area chart
        	else if (records.getTotalCount() == 1) { 
                Ext.getCmp('datastatsCSVButton').enable();
                Ext.getCmp('datastatsGridButton').enable();
                Ext.getCmp('datastatsColumnChartButton').enable();
                Ext.getCmp('datastatsLineChartButton').disable();
                Ext.getCmp('datastatsAreaChartButton').disable();
        	}
        	
        	// if type of data visualization is chart, remove chart hidden mode
        	if(Ext.getCmp('datastatschart')) {
        		Ext.getCmp('datastatschart').show();
        		Ext.getCmp('datastatschart').setLoading(false);
        		Ext.getCmp('datastatsChartGrid').enable();
            	
            	// change y axes label with the content of selected combo
            	Ext.getCmp('datastatschart').axes.get('left').setTitle(datastatsmetric);
            	Ext.getCmp('datastatschart').axes.get('bottom').setTitle(datastatsdim);
        	}
        	else if (Ext.getCmp('datastatsgrid')) {
        		 Ext.ComponentManager.get('firstColumn').setText(datastatsmetric);
        		 Ext.ComponentManager.get('secondColumn').setText(datastatsdim);
        	}
        });
    }
});

