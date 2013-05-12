/**
 * @author CMCC
 */

Ext.define('MyDesktop.availability.stores.AvailabilityStore', {
    
	extend    : 'Ext.data.Store',
	requires  : ['MyDesktop.availability.models.AvailabilityModel'],
    model     : 'MyDesktop.availability.models.AvailabilityModel',
    singleton : true,
    
    constructor : function() {
    	this.id        = 'availabilityStore';
    	this.proxy     = {
			type: 'ajax',
	    	url: 'hostAvailabilityJson/getHostsAvailability',
	        reader: {
	            type: 'json'
	        }
    	};
    	this.listeners = {
    			load : function(records) {
    				
    				var hostMap = Ext.getCmp('hostMap');
    				
    				gMap = hostMap.getMap();
    				
            		// clear previous markers
        			for (var i = 0; i < availabilityMarkers.length; i++) {
        				availabilityMarkers[i].setMap(null);
        			} 
        			availabilityMarkers = [];
        			availabilitycontrollength = 0;
        			hosts = records.getTotalCount();
//                			alert('hosts: ' + hosts);
//                			alert('availabilityMarkers: ' + availabilityMarkers.length);

        			// set map bounds
            		var latMax = -90; lngMax = -180; latMin = 90; lngMin = 180;
            		var margin_map = 0.5;
            		
            		for (var i = 0; i < hosts; i++) {
            			var latitude = records.getAt(i).get('latitude');
            			var longitude = records.getAt(i).get('longitude');
            			
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
//            		alert('bounds: ' + bounds);
            		
            		gMap.fitBounds(bounds);
            		zoom = gMap.zoom;
            		
            		if(!Ext.get('availabilityhome')) {
            			var controlDiv = document.createElement('DIV');
            			controlDiv.setAttribute('id','availabilityhome');
            			controlDiv.style.padding = '5px';
            			
            			var controlUI = document.createElement('DIV');
            			controlUI.style.backgroundColor = 'white';
            			controlUI.style.borderStyle = 'solid';
            			controlUI.style.borderWidth = '2px';
            			controlUI.style.cursor = 'pointer';
            			controlUI.style.textAlign = 'center';
            			controlUI.title = 'Home';
            			controlDiv.appendChild(controlUI);
            			
            			// Set CSS for the control interior
            			var controlText = document.createElement('DIV');
            			controlText.style.fontFamily = 'Arial,sans-serif';
            			controlText.style.fontSize = '12px';
            			controlText.style.paddingLeft = '4px';
            			controlText.style.paddingRight = '4px';
            			controlText.innerHTML = 'Home';
            			controlUI.appendChild(controlText);
            			
            			gMap.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
            			
            			google.maps.event.addDomListener(controlUI, 'click', function() {
            				gMap.fitBounds(bounds);
            			});
            		}
            		
            		/*if(!Ext.get('availabilitylegend')) {
            			var scaleControlDiv = document.createElement('DIV');
            			scaleControlDiv.setAttribute('id','availabilitylegend');
            			scaleControlDiv.setAttribute('align','right');
            			var immagine = document.createElement("IMG");
            			immagine.setAttribute("src","img/federation_info/map_icons/availability/legenda_availability.svg");
            			immagine.setAttribute("width","65%");
            			immagine.setAttribute("height","65%");
            			scaleControlDiv.appendChild(immagine);
            			gMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(scaleControlDiv);
            		}*/
            		
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
            			
            			var latitude = records.getAt(i).get('latitude');
            			var longitude = records.getAt(i).get('longitude');
            			var hostname = records.getAt(i).get('hostname');
            			var ipHost = records.getAt(i).get('ip');
            			var status = records.getAt(i).get('status');
            			
            			var myLatlng = new google.maps.LatLng(latitude,longitude);
            			
            			/** chooseIcon for marker **/
            			var urlIcon = '';
            			if(status == 1) {
            				urlIcon = "img/federation_info/map_icons/availability/9.svg";
            				label = 'OK';
            			}
            			else {
            				urlIcon = "img/federation_info/map_icons/availability/0.svg";
            				label = 'NOT OK';
            			}
            			
            			marker = new google.maps.Marker({
        			        position : myLatlng,
        			        title    : hostname == null ? (ipHost + ': ' + label) : (hostname + ': ' + label),
        			        map      : gMap,
        			        zIndex   : hosts-i,
        			        icon: {
        		                  url        : urlIcon,
        		                  anchor     : new google.maps.Point((iconSize != 0) ? iconSize/2 : 10, (iconSize != 0) ? iconSize/2 : 10),
        		                  scaledSize : new google.maps.Size((iconSize != 0) ? iconSize : 20, (iconSize != 0) ? iconSize : 20)
        		             }
        			    });
            			availabilityMarkers.push(marker);
            		}
            		availabilitycontrollength = records.getTotalCount();
//                    		alert('availabilityMarkers: ' + availabilityMarkers.length);
            		
            		for (var i = 0; i < availabilityMarkers.length; i++) {
        				availabilityMarkers[i].setMap(null);
        			} 
            		
            		for(var i = 0; i < availabilityMarkers.length; i++){
        				availabilityMarkers[i].setMap(gMap);
        			}
    			}
    	};
    	this.callParent(arguments);
    }
});