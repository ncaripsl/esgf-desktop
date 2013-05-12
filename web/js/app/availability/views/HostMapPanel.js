/**
 * @author CMCC
 */

Ext.define('MyDesktop.availability.views.HostMapPanel', {
    extend   : 'Ext.ux.GMapPanel',
    
    requires : ['MyDesktop.availability.stores.AvailabilityStore'],
 
    initComponent : function() {
    	
    	Ext.apply(this, {
    		id          : 'hostMap',
    		gmapType    : 'terrain',
    		mapConfOpts : ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
    		mapControls : ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
    		listeners   : {
    	        'mapready': function() {
    	        	
    	        	availabilityMarkers = [];
    	    		availabilitycontrollength = 0;
    	        	
    	        	if(Ext.getCmp('availabilityProjectTree')) {
    	        		// get project tree panel and expand it
    	        		var projectTree = Ext.getCmp('availabilityProjectTree');
//    	        		projectTree.expand(false);
    	        		// expand root to load its content
    	            	projectTree.getRootNode().expand();
    	            	projectTree.getSelectionModel().select(projectTree.getRootNode());
//    	            	projectTree.getSelectionModel().deselectAll(true);
//    	            	projectTree.getSelectionModel().select(projectTree.getRootNode());
    	        	}
    	        	
    	        	if(Ext.getCmp('availabilitygrid')) {
    	        		// get availability grid panel and expand it
    	        		Ext.getCmp('availabilitygrid').expand(false);
    	        		var endDate = new Date();
    	        		Ext.getCmp('availabilitygrid').setTitle(Ext.String.format('Hosts List [Reference date \{0\} \{1\}]', Ext.Date.format(endDate, "m-d-Y"), Ext.Date.format(endDate, "H:i")));
    	        	}
    	        	
    	        	
    	        	
    	        	var gMap = Ext.getCmp('hostMap').getMap();
    	    		
    	    		var listenerflag2 = 0;
    	    		
    	    		google.maps.event.addListener(gMap, 'zoom_changed', function() {
    	    			
    	    			if (!listenerflag2) {
    	    				listenerflag2 = 1;
    	    				return;
    	    			}
    	    			
//    	    			alert('zoom changed: '+ gMap.zoom);
//    	    			alert('availabilityMarkers.length: ' + availabilityMarkers.length);
    	    			if (availabilitycontrollength != 0) {
//    	    				if (availabilityMarkers.length != 0) {
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
//    	            		alert('iconSize: ' + iconSize);
    	        			for(var i = 0; i < availabilityMarkers.length; i++){
//    	        				alert('Width: ' + availabilityMarkers[i].getIcon().size.width);
    	        				availabilityMarkers[i].getIcon().size.width = iconSize;
    	        				availabilityMarkers[i].getIcon().size.height = iconSize;
    	        				availabilityMarkers[i].getIcon().anchor.x=  (availabilityMarkers[i].getIcon().size.width)/2;
    	        				availabilityMarkers[i].getIcon().anchor.y= (availabilityMarkers[i].getIcon().size.height)/2;
    	        				availabilityMarkers[i].setMap(gMap);
    	        			}
    	    			}
    	    		});
    	        	
    	        }
    	    }
    	});
    	this.setCenter = {
            geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA'
        };
        this.callParent();
    }
});