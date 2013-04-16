/**
 * @author CMCC
 */

Ext.define('MyDesktop.multimedia.MultimediaModule', {
    extend: 'Ext.ux.desktop.Module',
    
    requires: [//'MyDesktop.multimedia.views.CategoryAccordion',
               'MyDesktop.multimedia.views.CategoryTreePanel',
               'MyDesktop.multimedia.views.OutputPanel'],
    
    id: 'multimedia-win',
    
    init : function() {
        // No launcher means we don't appear on the Start Menu...
        this.launcher = {
            text: 'Multimedia',
            iconCls:'multimedia',
            handler : this.createWindow,
            scope: this
        };
    },
    
    createWindow : function() {
    	var desktop   = this.app.getDesktop();
    	var win       = desktop.getWindow(this.id);
        if (!win) {
        	
//        	var categoryAcc = new MyDesktop.multimedia.views.CategoryAccordion();
        	var categoryTree = new MyDesktop.multimedia.views.CategoryTreePanel();
        	var outputPanel = new MyDesktop.multimedia.views.OutputPanel();
        	
            win = desktop.createWindow({
            	id              : 'multimedia-win',
                title           : 'Multimedia',
                width           : 1236,
                height          : 768,
                iconCls         : 'multimedia',
                animCollapse    : false,
                constrainHeader : true,
                layout          : 'fit',
                items: [{
                    xtype   : 'panel',
                    layout  : 'border',
                    border  : false,
//                    padding : 5,
                    items: [categoryTree,
                            outputPanel]
                }]
            });
        }
        win.show();
//        win.on('afterrender', this.loadContent());
        return win;
    },

    loadContent : function(){
    	var task = new Ext.util.DelayedTask(function() {
    		if (Ext.getStore('categoryTreeStore').isLoading())
    			task.delay(500);
    		else {
    			Ext.getCmp('categoryTree').getSelectionModel().select(1);
    		}
    	});
    	task.delay(10);
    }

});

