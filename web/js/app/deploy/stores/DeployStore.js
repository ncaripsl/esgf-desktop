Ext.define('MyDesktop.deploy.stores.DeployStore', {
    
	extend      : 'Ext.data.Store',
	requires    : ['MyDesktop.deploy.models.DeployModel'],
    model       : 'MyDesktop.deploy.models.DeployModel',
    singleton   : true,
    
    constructor : function() {
    	this.id        = 'deployStore';
    	this.proxy     = {
    			type: 'ajax',
		    	url: 'hostDeploymentJson/getHostsDeployment',
		        reader: {
		            type: 'json'
		        }
    	};
    	this.listeners = {
    			load : function(records) {
    				
    				var deployHostMap = Ext.getCmp('deployHostMap');
    				
    				gMap = deployHostMap.getMap();
    				
            		// clear previous markers
        			for (var i = 0; i < nodetypeMarkers.length; i++) {
        				nodetypeMarkers[i].setMap(null);
        			}
        			nodetypeMarkers = [];
        			deploymentcontrollength = 0;
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
            		
            		if(!Ext.get('deployhome')) {
            			var controlDiv = document.createElement('DIV');
            			controlDiv.setAttribute('id','deployhome');
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
            		
            		if(!Ext.get('deploylegend')) {
            			var scaleControlDiv = document.createElement('DIV');
            			scaleControlDiv.setAttribute('id','deploylegend');
            			scaleControlDiv.setAttribute('align','right');
            			var immagine = document.createElement("IMG");
            			immagine.setAttribute("src","img/federation_info/map_icons/nodetype/stack/legenda2.svg");
            			immagine.setAttribute("width","75%");
            			immagine.setAttribute("height","75%");
            			scaleControlDiv.appendChild(immagine);
            			gMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(scaleControlDiv);
            		}
            		
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
            		
            		for (var i = 0; i < hosts; i++) {
        				hostName = records.getAt(i).get('hostname');
        				ipHost = records.getAt(i).get('hostalias');
            			latitude = records.getAt(i).get('latitude');
            			longitude = records.getAt(i).get('longitude');
            			nodetype = records.getAt(i).get('nodetype');
            			
            			var myLatlng = new google.maps.LatLng(latitude,longitude);
            			
            			/** chooseIcon for marker **/
            			var urlIcon = "img/federation_info/map_icons/nodetype/stack/node" + nodetype + ".png";
            			
        				var nodetype_str = "(Node type = ";
        				if ((nodetype & 32) > 0)
        					nodetype_str = nodetype_str + "Compute ";
        				if ((nodetype & 16) > 0)
        					nodetype_str = nodetype_str + "Idp ";
        				if ((nodetype & 8) > 0)
        					nodetype_str = nodetype_str + "Index ";
        				if ((nodetype & 4) > 0)
        					nodetype_str = nodetype_str + "Data ";
        				nodetype_str = nodetype_str + ")";
        				
            			marker = new google.maps.Marker({
        			        position : myLatlng,
        			        // da sistemare con il tipo di host
        			        title    : hostName==null?(ipHost + '' + nodetype_str):(hostName + '' + nodetype_str),
        			        map      : gMap,
        			        zIndex   : i+1,
        			        icon     : {
        		                  url        : urlIcon,
        		                  anchor     : new google.maps.Point((iconSize != 0) ? iconSize/2 : 15, (iconSize != 0) ? iconSize/2 : 15),
        		                  scaledSize : new google.maps.Size((iconSize != 0) ? iconSize : 30, (iconSize != 0) ? iconSize : 30)
//                		                  anchor     : new google.maps.Point(anchor_x, anchor_y),
//                		                  scaledSize : new google.maps.Size(size_x, size_y)
        		             }
        			    });
            			nodetypeMarkers.push(marker);
            			
            			// add an info window on marker
            		}
//                    		alert('nodetypeMarkers: ' + nodetypeMarkers.length);
            		deploymentcontrollength = records.getTotalCount();
    			}
    	};
    	this.callParent(arguments);
    }
});