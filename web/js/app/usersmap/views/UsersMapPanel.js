/**
 * @author CMCC
 */

Ext.define('MyDesktop.usersmap.views.UsersMapPanel', {
    extend   : 'Ext.ux.GMapPanel',
    
    requires : ['MyDesktop.usersmap.stores.ClientsStore'],
 
    initComponent : function() {
    	
    	Ext.apply(this, {
    		id          : 'usersMap',
    		gmapType    : 'terrain',
    		mapConfOpts : ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
    		mapControls : ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
    		listeners   : {
    	        'mapready': function() {
    	        	Ext.getStore('clientsStore').load(/*{
    	        		params: {
    	    		    	host : 'adm07.cmcc.it'
    	    		    }
    	        	}*/);
    	        	
    	        	Ext.getStore('countriesStore').load(/*{
    	        		params: {
    	    		    	host : 'adm07.cmcc.it'
    	    		    }
    	        	}*/);
    	        	
    	        	var gMap = Ext.getCmp('usersMap').getMap();
    	        	
    	        	google.maps.event.addListener(gMap, 'zoom_changed', function() {
//    	    			alert('zoom changed: '+ gMap.zoom);
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
	        			for(var i = 0; i < usersMarkers.length; i++){
//    	        				alert('Width: ' + usersMarkers[i].getIcon().size.width);
	        				usersMarkers[i].getIcon().size.width = iconSize;
	        				usersMarkers[i].getIcon().size.height = iconSize;
	        				usersMarkers[i].getIcon().anchor.x=  (usersMarkers[i].getIcon().size.width)/2;
	        				usersMarkers[i].getIcon().anchor.y= (usersMarkers[i].getIcon().size.height)/2;
	        				usersMarkers[i].setMap(gMap);
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