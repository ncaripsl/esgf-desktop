/**
 * @author CMCC
 */

Ext.define('MyDesktop.olap.OlapModule', {
    extend: 'Ext.ux.desktop.Module',
    requires: ['MyDesktop.olap.views.ProjectHostTreePanel',
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
        	
        	var projectHostTreePanel = new MyDesktop.olap.views.ProjectHostTreePanel();
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
                items: [{
                    xtype   : 'panel',
                    layout  : 'border',
                    border  : false,
                    padding : 5,
                    items: [projectHostTreePanel,
                    /*{
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
                    },*/
                    {
                        xtype  : 'panel',
                        region : 'center',
                        border : false,
                        flex   : 3,
                        layout : 'border',
                        items  : [comboPanel, outputPanel]
                    }]
                }]
            });
        }
        win.show();
        win.on('beforerender', this.loadContent());
        return win;
    },

    loadContent : function(){
    	
    	// recupero i treePanels e ne espando la root caricando il contenuto
    	var projectHostTree = Ext.getCmp('olapProjectHostTreePanel');
    	projectHostTree.getRootNode().expand();
    	
//    	var dimensionsTree = Ext.getCmp('olapdimensionstreepanel');
//    	dimensionsTree.getRootNode().expand();
    	
//    	Ext.getStore('olapChartStore').load();
    	
//    	oldChart = 'column';
    }
});

