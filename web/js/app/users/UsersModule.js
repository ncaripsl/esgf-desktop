/**
 * @author CMCC
 */

Ext.define('MyDesktop.users.UsersModule', {
    extend: 'Ext.ux.desktop.Module',
    requires: ['MyDesktop.users.views.ProjectTreePanel',
               'MyDesktop.users.views.UsersHostMapPanel',
               'MyDesktop.users.views.UsersGridPanel'],
    id: 'users-win',
    
    init : function() {
        // No launcher means we don't appear on the Start Menu...
        this.launcher = {
            text: 'Users',
            iconCls:'users',
            handler : this.createWindow,
            scope: this
        };

    },
    
    createWindow : function() {
    	var desktop   = this.app.getDesktop();
    	var win       = desktop.getWindow(this.id);
        if (!win) {
        	
        	var projectTreePanel = new MyDesktop.users.views.ProjectTreePanel();
        	var usersHostMapPanel = new MyDesktop.users.views.UsersHostMapPanel();
        	var usersGridPanel = new MyDesktop.users.views.UsersGridPanel();
        	
            win = desktop.createWindow({
            	id              : 'users-win',
                title           : 'Users',
                width           : 1280,
                height          : 768,
                iconCls         : 'users',
                animCollapse    : false,
                constrainHeader : true,
                layout          : 'fit',
                items: [{
                    xtype   : 'panel',
                    layout  : 'border',
                    border  : false,
                    padding : 5,
                    items: [projectTreePanel,
                    {
                        xtype  : 'panel',
                        region : 'center',
                        border : false,
                        flex   : 3,
                        layout : 'border',
                        items  : [{
                        	xtype       : 'panel',
                        	region      : 'center',
                        	title       : 'Peer Group Map',
                        	flex        : 7,
                        	collapsible : true,
                        	layout      : 'fit',
                        	items       : [usersHostMapPanel],
                        	listeners   : {
                        		expand   : this.resizeMap
                        	}
                        },
                        usersGridPanel]
                    }]
                }],
                listeners : {
                	scope  : this,
                	resize : this.resizeMap
                }
            });
        }
        win.show();
        win.on('beforerender', this.loadContent());
        return win;
    },

    loadContent : function(){
    	
    	if(Ext.getCmp('usersProjectTree')) {
    		// get project tree panel and expand it
    		var projectTree = Ext.getCmp('usersProjectTree');
    		projectTree.expand(false);
    		// expand root to load its content
        	projectTree.getRootNode().expand();
        	projectTree.getSelectionModel().select(projectTree.getRootNode());
    	}
    	
    	if(Ext.getCmp('usersgrid')) {
    		// get availability grid panel and expand it
    		Ext.getCmp('usersgrid').expand(false);
    		var endDate = new Date();
    		Ext.getCmp('usersgrid').setTitle(Ext.String.format('Hosts List [Reference date \{0\} \{1\}]', Ext.Date.format(endDate, "m-d-Y"), Ext.Date.format(endDate, "H:i")));

    	}
    },
    
    resizeMap : function() {
    	if(Ext.getCmp('usersHostMap').getMap()) {
    		google.maps.event.trigger(Ext.getCmp('usersHostMap').getMap(), "resize");
    	}
    }

});

