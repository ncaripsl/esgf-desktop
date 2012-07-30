/**
 * @author CMCC
 */

Ext.define('MyDesktop.olap.OlapModule', {
    extend: 'Ext.ux.desktop.Module',
    requires: [//'MyDesktop.olap.views.ProjectHostTreePanel',
//               'MyDesktop.olap.views.DimensionsTreePanel',
               'MyDesktop.olap.views.ComboPanel',
               'MyDesktop.olap.views.OutputPanel'],
               
    id: 'olap-win',
    
    init : function() {
        // No launcher means we don't appear on the Start Menu...
        this.launcher = {
            text: 'Download Statistics',
            iconCls:'olap',
            handler : this.createWindow,
            scope: this
        };

    },
    
    createWindow : function() {
    	var desktop   = this.app.getDesktop();
    	var win       = desktop.getWindow(this.id);
        if (!win) {
        	
        	//var projectHostTreePanel = new MyDesktop.olap.views.ProjectHostTreePanel();
//        	var dimensionsTreePanel = new MyDesktop.olap.views.DimensionsTreePanel();
        	var comboPanel = new MyDesktop.olap.views.ComboPanel();
        	var outputPanel = new MyDesktop.olap.views.OutputPanel();

        	win = desktop.createWindow({
            	id              : 'olap-win',
                title           : 'Data Usage Statistics',
                width           : 1024,
                height          : 768,
                iconCls         : 'olap',
                animCollapse    : false,
                constrainHeader : true,
                layout          : 'fit',
                items: [/*{
                    xtype   : 'panel',
                    layout  : 'border',
                    border  : false,
                    padding : 5,
                    items: [projectHostTreePanel,
                    {
                        title       : 'Accordion Layout',
                        width       : 250,
                        region      : 'west',
                        collapsible : true,
                        split       : true,
                        layout      :'accordion',
                        defaults    : {
                            // applied to each contained panel
                            bodyStyle: 'padding:5px'
                        },
                        layoutConfig: {
                            // layout-specific configs go here
                            titleCollapse: false,
                            animate: true,
                            activeOnTop: true
                        },
                        items: [projectHostTreePanel,
                                dimensionsTreePanel]
                    },
                    {
                        xtype  : 'panel',
                        region : 'center',
                        border : false,
                        flex   : 3,
                        layout : 'border',
                        items  : [comboPanel, outputPanel]
                    }]
                }*/{
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

    loadContent : function(){
    	
    	// recupero i treePanels e ne espando la root caricando il contenuto
    	//var projectHostTree = Ext.getCmp('olapProjectHostTreePanel');
    	//projectHostTree.getRootNode().expand();
    	
		var combo1Value = Ext.getCmp('olapcombo1').getValue();
        var combo2Value = Ext.getCmp('olapcombo2').getValue();
        var combo3Value = Ext.getCmp('olapcombo3').getValue();
        var combo4Value = Ext.getCmp('olapcombo4').getValue();
        var combo5Value = Ext.getCmp('olapcombo5').getValue();
        
        Ext.getStore('olapChartGridStore').setProxy({
		    	type: 'ajax',
		    	//url: 'http://' + hostName + ':8080/Desktop/olapJson/getElapsedTime',
		    	//url: 'http://' + hostName + '/esgf-desktop/olapJson/getElapsedTime',
		    	url: 'olapJson/getElapsedTime',
		    	//url: 'http://192.168.250.138:8080/Desktop/olapJson/getElapsedTime',
		        reader: {
		            type: 'json'
		        }
		    });
        Ext.getStore('olapChartGridStore').load({
 		    params:{
 		    	combo1Value : combo1Value,
 		    	combo2Value : combo2Value,
 		    	combo3Value : combo3Value,
 		    	combo4Value : combo4Value,
 		    	combo5Value : combo5Value
		    }
		});
        Ext.getStore('olapChartGridStore').on('load', function(records) {
        	if (records.getTotalCount() > 1) {
                Ext.getCmp('olapCSVButton').enable();
                Ext.getCmp('olapGridButton').enable();
                Ext.getCmp('olapColumnChartButton').enable();
                Ext.getCmp('olapLineChartButton').enable();
                Ext.getCmp('olapAreaChartButton').enable();
   			}
        	// line e area chart non funzionano per un solo elemento
        	// quindi li disabilito
        	else if (records.getTotalCount() == 1) { 
                Ext.getCmp('olapCSVButton').enable();
                Ext.getCmp('olapGridButton').enable();
                Ext.getCmp('olapColumnChartButton').enable();
                Ext.getCmp('olapLineChartButton').disable();
                Ext.getCmp('olapAreaChartButton').disable();
        	}
        	
        	// se la modalit� di rappresentazione selezionata � quella del grafico
        	// elimino la modalit� hidden
        	if(Ext.getCmp('olapchart')) {
        		Ext.getCmp('olapchart').show();
        		Ext.getCmp('olapChartGrid').enable();
            	
            	// modifico i titoli degli assi con il contenuto delle combo
        		xAxisTitle = combo2Value;
        		yAxisTitle = combo1Value;
            	Ext.getCmp('olapchart').axes.get('bottom').setTitle(xAxisTitle);
            	Ext.getCmp('olapchart').axes.get('left').setTitle(yAxisTitle);
        	}
        	else if (Ext.getCmp('olapgrid')) {
        		 Ext.ComponentManager.get('firstColumn').setText(combo1Value);
        		 Ext.ComponentManager.get('secondColumn').setText(combo2Value);
        		}
        });
//    	var dimensionsTree = Ext.getCmp('olapdimensionstreepanel');
//    	dimensionsTree.getRootNode().expand();
    	
//    	Ext.getStore('olapChartStore').load();
    	
//    	oldChart = 'column';
    }
});

