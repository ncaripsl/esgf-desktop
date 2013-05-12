
Ext.define('MyDesktop.deploy.views.DeployHostMapPanel', {
    extend   : 'Ext.ux.GMapPanel',
    
    requires : ['MyDesktop.deploy.stores.DeployStore'],
 
    initComponent : function() {
    	
    	Ext.apply(this, {
    		id          : 'deployHostMap',
    		gmapType    : 'terrain',
    		mapConfOpts : ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
    		mapControls : ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
    		listeners: {
    	        'mapready': function() {
    	        	
    	        	nodetypeMarkers = [];
    	    		deploymentcontrollength = 0;
    	        	
    	        	if(Ext.getCmp('deployProjectTree')) {
    	        		// get project tree panel and expand it
    	        		var projectTree = Ext.getCmp('deployProjectTree');
    	        		// expand root to load its content
    	            	projectTree.getRootNode().expand();
    	            	projectTree.getSelectionModel().select(projectTree.getRootNode());
    	        	}
    	        	
    	        	if(Ext.getCmp('deploygrid')) {
    	        		// get availability grid panel and expand it
    	        		Ext.getCmp('deploygrid').expand(false);
    	        		var endDate = new Date();
    	        		Ext.getCmp('deploygrid').setTitle(Ext.String.format('Hosts List [Reference date \{0\} \{1\}]', Ext.Date.format(endDate, "m-d-Y"), Ext.Date.format(endDate, "H:i")));

    	        	}
    	        	
    	    		var gMap = Ext.getCmp('deployHostMap').getMap();
    	    		
    	    		var listenerflag = 0;
    	    		
    	    		google.maps.event.addListener(gMap, 'zoom_changed', function() {
    	    			
    	    			if (!listenerflag) {
    	    				listenerflag = 1;
    	    				return;
    	    			}
    	    			
    	    			var zoom = gMap.zoom;
//    		    		alert('zoom_changed: '+ zoom);
//    		    		alert('nodetypeMarkers.length: ' + nodetypeMarkers.length);
    		    		if (deploymentcontrollength != 0) {
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
//            				alert('iconSize: ' + iconSize);
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
    	    }
    	});
    	this.setCenter = {
            geoCodeAddr : '4 Yawkey Way, Boston, MA, 02215-3409, USA'
        };
        this.callParent();
    }
});