/**
 * @author CMCC
 */

Ext.define('MyDesktop.availability.AvailabilityModule', {
    extend: 'Ext.ux.desktop.Module',
    requires: ['MyDesktop.availability.views.ProjectTreePanel',
               'MyDesktop.availability.views.HostMapPanel',
               'MyDesktop.availability.views.AvailabilityGridPanel'],
    id: 'availability-win',
    
    init : function() {
        // No launcher means we don't appear on the Start Menu...
        this.launcher = {
            text: 'Availability',
            iconCls:'availability',
            handler : this.createWindow,
            scope: this
        };

    },
    
    createWindow : function() {
    	var desktop   = this.app.getDesktop();
    	var win       = desktop.getWindow(this.id);
        if (!win) {
        	
        	var projectTreePanel = new MyDesktop.availability.views.ProjectTreePanel();
        	var hostMapPanel = new MyDesktop.availability.views.HostMapPanel();
        	var availabilityGridPanel = new MyDesktop.availability.views.AvailabilityGridPanel();
        	
            win = desktop.createWindow({
            	id              : 'availability-win',
                title           : 'Availability',
                width           : 1280,
                height          : 768,
                iconCls         : 'availability',
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
                        	items       : [hostMapPanel],
                        	listeners   : {
                        		expand   : this.resizeMap
                        	}
                        },
                        availabilityGridPanel]
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
//        win.on('beforeclose', this.destroyMap());
        return win;
    },

    loadContent : function(){
    	
    	availabilityMarkers = [];
		availabilitycontrollength = 0;
    	
    	if(Ext.getCmp('availabilityProjectTree')) {
    		// get project tree panel and expand it
    		var projectTree = Ext.getCmp('availabilityProjectTree');
    		projectTree.expand(false);
    		// expand root to load its content
        	projectTree.getRootNode().expand();
        	projectTree.getSelectionModel().select(projectTree.getRootNode());
//        	projectTree.getSelectionModel().deselectAll(true);
//        	projectTree.getSelectionModel().select(projectTree.getRootNode());
    	}
    	
    	if(Ext.getCmp('availabilitygrid')) {
    		// get availability grid panel and expand it
    		Ext.getCmp('availabilitygrid').expand(false);
    		var endDate = new Date();
    		Ext.getCmp('availabilitygrid').setTitle(Ext.String.format('Hosts List [Reference date \{0\} \{1\}]', Ext.Date.format(endDate, "m-d-Y"), Ext.Date.format(endDate, "H:i")));
    	}
    },
    
    setMap : function() {
    	var task = new Ext.util.DelayedTask(function() {
    		if (!Ext.getCmp('hostMap').getMap())
				task.delay(500);
			else {
//				alert('setMap');
	    		var gMap = Ext.getCmp('hostMap').getMap();
	    		
	    		var listenerflag2 = 0;
	    		
	    		google.maps.event.addListener(gMap, 'zoom_changed', function() {
	    			
	    			if (!listenerflag2) {
	    				listenerflag2 = 1;
	    				return;
	    			}
	    			
//	    			alert('zoom changed: '+ gMap.zoom);
//	    			alert('availabilityMarkers.length: ' + availabilityMarkers.length);
	    			if (availabilitycontrollength != 0) {
//	    				if (availabilityMarkers.length != 0) {
	    				var iconSize = 10;
	            		if (gMap.zoom) {
	            			if (gMap.zoom>=8)
	            				iconSize = 32;
	            			if (gMap.zoom==7)
	            				iconSize = 29;
	            			if (gMap.zoom==6)
	            				iconSize = 26;
	            			if (gMap.zoom==5)
	            				iconSize = 24;
	            			if (gMap.zoom==4)
	            				iconSize = 20;
	            			if (gMap.zoom==3)
	            				iconSize = 17;
	            			if (gMap.zoom==2)
	            				iconSize = 14;
	            		}
//	            		alert('iconSize: ' + iconSize);
	        			for(var i = 0; i < availabilityMarkers.length; i++){
//	        				alert('Width: ' + availabilityMarkers[i].getIcon().size.width);
	        				availabilityMarkers[i].getIcon().size.width = iconSize;
	        				availabilityMarkers[i].getIcon().size.height = iconSize;
	        				availabilityMarkers[i].getIcon().anchor.x=  (availabilityMarkers[i].getIcon().size.width)/2;
	        				availabilityMarkers[i].getIcon().anchor.y= (availabilityMarkers[i].getIcon().size.height)/2;
	        				availabilityMarkers[i].setMap(gMap);
	        			}
	    			}
	    		});
			}
    	});
    	task.delay(10);
    },
    
    resizeMap : function() {
    	if(Ext.getCmp('hostMap').getMap()) {
    		google.maps.event.trigger(Ext.getCmp('hostMap').getMap(), "resize");
    	}
    }

});

