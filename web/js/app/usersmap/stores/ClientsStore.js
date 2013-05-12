/**
 * @author CMCC
 */

Ext.define('MyDesktop.usersmap.stores.ClientsStore', {
    
	extend    : 'Ext.data.Store',
	requires  : ['MyDesktop.usersmap.models.ClientsModel'],
    model     : 'MyDesktop.usersmap.models.ClientsModel',
    singleton : true,
    
    constructor : function() {
    	this.id        = 'clientsStore';
    	this.proxy     = {
			type: 'ajax',
	    	url: 'usersmapJson/getClients',
	        reader: {
	            type: 'json'
	        }
    	};
    	this.listeners = {
    			load : function(records) {
//    				alert('records: ' + records.getTotalCount());
    				var usersMap = Ext.getCmp('usersMap');
    				
    				gMap = usersMap.getMap();
    				
            		// clear previous markers
        			for (var i = 0; i < usersMarkers.length; i++) {
        				usersMarkers[i].setMap(null);
        			} 
        			usersMarkers = [];
        			hosts = records.getTotalCount();

        			// set map bounds
            		var latMax = -90; lngMax = -180; latMin = 90; lngMin = 180;
            		var margin_map = 0.5;
            		
            		for (var i = 0; i < hosts; i++) {
            			latitude = records.getAt(i).get('latitude');
            			longitude = records.getAt(i).get('longitude');
            			
            			if(latitude < latMin)
            				latMin = latitude;
            			if(longitude < lngMin)
            				lngMin = longitude;
            			if(latitude > latMax)
            				latMax = latitude;
            			if(longitude > lngMax)
            				lngMax = longitude;
            		}
            		
            		var southWest = new google.maps.LatLng(latMax-margin_map,lngMin-margin_map);
            		var northEast = new google.maps.LatLng(latMin+margin_map, lngMax+margin_map);
            		var bounds = new google.maps.LatLngBounds(southWest,northEast);
            		
            		gMap.fitBounds(bounds);
            		zoom = gMap.zoom;
            		
            		var iconSize = 10;
            		if (zoom) {
            			if (zoom>=8)
            				iconSize = 32;
            			if (zoom==7)
            				iconSize = 29;
            			if (zoom==6)
            				iconSize = 26;
            			if (zoom==5)
            				iconSize = 24;
            			if (zoom==4)
            				iconSize = 20;
            			if (zoom==3)
            				iconSize = 17;
            			if (zoom==2)
            				iconSize = 14;
            			if (zoom<2)
            				iconSize = 10;
            		}
            		
            		for (var i = 0; i < hosts; i++) {
            			
            			latitude = records.getAt(i).get('latitude');
            			longitude = records.getAt(i).get('longitude');
            			country = records.getAt(i).get('country');
            			numclient = records.getAt(i).get('numclient');
            			
            			var myLatlng = new google.maps.LatLng(latitude,longitude);
            			
            			var urlIcon = "img/usersmap/0.svg";
            			
            			marker = new google.maps.Marker({
        			        position : myLatlng,
        			        title    : 'lat: ' + latitude + ', lon: ' + longitude + ', country: ' + country,
        			        map      : gMap,
        			        icon: {
        		                  url        : urlIcon,
        		                  anchor     : new google.maps.Point((iconSize != 0) ? iconSize/2 : 10, (iconSize != 0) ? iconSize/2 : 10),
        		                  scaledSize : new google.maps.Size((iconSize != 0) ? iconSize : 20, (iconSize != 0) ? iconSize : 20)
        		             }
        			    });
            			usersMarkers.push(marker);
            		}
    			}
    	};
    	this.callParent(arguments);
    }
});