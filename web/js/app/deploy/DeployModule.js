
Ext.define('MyDesktop.deploy.DeployModule', {
    extend: 'Ext.ux.desktop.Module',
    requires: ['MyDesktop.deploy.views.ProjectTreePanel',
               'MyDesktop.deploy.views.DeployHostMapPanel',
               'MyDesktop.deploy.views.DeployGridPanel'],
    id: 'deploy-win',
    
    init : function() {
        // No launcher means we don't appear on the Start Menu...
        this.launcher = {
            text: 'Deployment',
            iconCls:'deployment',
            handler : this.createWindow,
            scope: this
        };

    },
    
    createWindow : function() {
    	var desktop   = this.app.getDesktop();
    	var win       = desktop.getWindow(this.id);
        if (!win) {
        	
        	var projectTreePanel = new MyDesktop.deploy.views.ProjectTreePanel();
        	var deployHostMapPanel = new MyDesktop.deploy.views.DeployHostMapPanel();
        	var deployGridPanel = new MyDesktop.deploy.views.DeployGridPanel();
        	
            win = desktop.createWindow({
            	id              : 'deploy-win',
                title           : 'Deployment',
                width           : 1280,
                height          : 768,
                iconCls         : 'deployment',
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
                        	items       : [deployHostMapPanel],
                        	listeners   : {
                        		expand   : this.resizeMap
                        	}
                        },
                        deployGridPanel]
                    }]
                }],
                listeners : {
                	scope  : this,
                	resize : this.resizeMap
                }
            });
        }
        win.show();
//        win.on('beforerender', this.loadContent());
//        win.on('afterrender', this.setMap());
        return win;
    },

    loadContent : function(){
    	
    	nodetypeMarkers = [];
		deploymentcontrollength = 0;
    	
    	if(Ext.getCmp('deployProjectTree')) {
    		// get project tree panel and expand it
    		var projectTree = Ext.getCmp('deployProjectTree');
    		projectTree.expand(false);
    		// expand root to load its content
        	projectTree.getRootNode().expand();
        	projectTree.getSelectionModel().select(projectTree.getRootNode());
        	projectTree.getSelectionModel().deselectAll(true);
        	projectTree.getSelectionModel().select(projectTree.getRootNode());
    	}
    	
    	if(Ext.getCmp('deploygrid')) {
    		// get availability grid panel and expand it
    		Ext.getCmp('deploygrid').expand(false);
    		var endDate = new Date();
    		Ext.getCmp('deploygrid').setTitle(Ext.String.format('Hosts List [Reference date \{0\} \{1\}]', Ext.Date.format(endDate, "m-d-Y"), Ext.Date.format(endDate, "H:i")));

    	}
    },
    
    setMap : function() {
    	var task = new Ext.util.DelayedTask(function() {
    		if (!Ext.getCmp('deployHostMap').getMap())
				task.delay(500);
			else {
//				alert('setMap');
	    		var gMap = Ext.getCmp('deployHostMap').getMap();
	    		
	    		var listenerflag = 0;
	    		
	    		google.maps.event.addListener(gMap, 'zoom_changed', function() {
	    			
	    			if (!listenerflag) {
	    				listenerflag = 1;
	    				return;
	    			}
	    			
	    			var zoom = gMap.zoom;
//		    		alert('zoom_changed: '+ zoom);
//		    		alert('nodetypeMarkers.length: ' + nodetypeMarkers.length);
		    		if (deploymentcontrollength != 0) {
//		    			alert('nodetypeMarkers.length: ' + nodetypeMarkers.length);
//                		var size_x = 33;
//        				var size_y = 55;
//        				
//                		if(zoom) {
//                			if (zoom>=8) {
//                				size_x = size_x*0.90;
//                				size_y = size_y*0.90;
//                			}
//                			else if (zoom==7) {
//                				size_x = size_x*0.90;
//                				size_y = size_y*0.90;
//                			}
//                			else if (zoom==6) {
//                				size_x = size_x*0.80;
//                				size_y = size_y*0.80;
//                			}
//                			else if (zoom==5) {
//                				size_x = size_x*0.70;
//                				size_y = size_y*0.70;
//                			}
//                			else if (zoom==4) {
//                				size_x = size_x*0.55;
//                				size_y = size_y*0.55;
//                			}
//                			else if (zoom==3) {
//                				size_x = size_x*0.50;
//                				size_y = size_y*0.50;
//                			}
//                			else if (zoom<=2) {
//                				size_x = size_x*0.45;
//                				size_y = size_y*0.45;
//                			}
//                		}
//                		var anchor_x = size_x/2;
//        				var anchor_y = size_y;
        				
//        				alert('marker: sizew ' + size_x + ', sizeh ' + size_y + ', ax ' + anchor_x + ', ay ' + anchor_y);
		    			
		    			var iconSize = 30;
                		if (zoom) {
                			if (zoom>=8)
                				iconSize = 52;
                			if (zoom==7)
                				iconSize = 49;
                			if (zoom==6)
                				iconSize = 46;
                			if (zoom==5)
                				iconSize = 44;
                			if (zoom==4)
                				iconSize = 40;
                			if (zoom==3)
                				iconSize = 37;
                			if (zoom==2)
                				iconSize = 28;
                			if (zoom<2)
                				iconSize = 25;
                		}
//        				alert('iconSize: ' + iconSize);
        				for(var i = 0; i < nodetypeMarkers.length; i++){
    		    			nodetypeMarkers[i].getIcon().size.width = iconSize;
    		    			nodetypeMarkers[i].getIcon().size.height = iconSize;
    		    			nodetypeMarkers[i].getIcon().anchor.x = (nodetypeMarkers[i].getIcon().size.width)/2;
    		    			nodetypeMarkers[i].getIcon().anchor.y = (nodetypeMarkers[i].getIcon().size.height)/2;
    		    			nodetypeMarkers[i].setMap(gMap);
    		    		}
		    		}
		    	});
			}
    	});
    	task.delay(10);
    },
    
    resizeMap : function() {
    	if(Ext.getCmp('deployHostMap').getMap()) {
    		google.maps.event.trigger(Ext.getCmp('deployHostMap').getMap(), "resize");
    	}
    }

});