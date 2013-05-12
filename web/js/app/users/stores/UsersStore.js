/**
 * @author CMCC
 */

Ext.define('MyDesktop.users.stores.UsersStore', {
    
	extend    : 'Ext.data.Store',
	requires  : ['MyDesktop.users.models.UsersModel'],
    model     : 'MyDesktop.users.models.UsersModel',
    singleton : true,
    
    constructor : function() {
    	this.id        = 'usersStore';
    	this.proxy     = {
    			type: 'ajax',
		    	url: 'hostUsersJson/getHostsUsers',
		        reader: {
		            type: 'json'
		        }
    	};
    	this.listeners = {
    			load : function(records) {
    				
    				var usersHostMap = Ext.getCmp('usersHostMap');
    				
    				gMap = usersHostMap.getMap();
    				
            		// clear previous markers
        			for (var i = 0; i < usersMarkers.length; i++) {
        				usersMarkers[i].setMap(null);
        			} 
        			usersMarkers = [];
        			hosts = records.getTotalCount();

        			// set map bounds
            		var latMax = -90; lngMax = -180; latMin = 90; lngMin = 180;
            		var margin_map = 0.5;
            		var scale_type = 1; // 0 linear; 1 logarithmic
            		
            		for (var i = 0; i < hosts; i++) {
//                    			alert(i + ': ' + records.getAt(i).get('ip'));
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
            		
            		if(!Ext.get('usershome')) {
//                    			this.createHomeButton(gMap, bounds);
            			var controlDiv = document.createElement('DIV');
            			controlDiv.setAttribute('id','usershome');
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
            		
            		if(!Ext.get('userslegend')) {
            			var scaleControlDiv = document.createElement('DIV');
            			scaleControlDiv.setAttribute('id','userslegend');
            			scaleControlDiv.setAttribute('align','right');
            			var immagine = document.createElement("IMG");
            			immagine.setAttribute("src","img/federation_info/map_icons/regusers/pentagon/bluegradient/legenda_users.svg");
            			immagine.setAttribute("width","65%");
            			immagine.setAttribute("height","65%");
            			scaleControlDiv.appendChild(immagine);
            			gMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(scaleControlDiv);
            		}
            		
            		for (var i = 0; i < hosts; i++) {
            			
            			regusers = records.getAt(i).get('regusers');
            			
            			if (regusers > 0) {
            				hostName = records.getAt(i).get('hostname');
            				ipHost = records.getAt(i).get('hostalias');
                			latitude = records.getAt(i).get('latitude');
                			longitude = records.getAt(i).get('longitude');
                			
                			var myLatlng = new google.maps.LatLng(latitude,longitude);
                			
                			var latoimg = 20; // base value
                			var gradient_level = 0; // 0 <= value <= 100
                			
                			if (scale_type == 0) {
                				gradient_level = regusers/100;
                				latoimg = Math.round(10 + (regusers*40)/10000);
                			}
                			else {
                				var temp = Math.log(regusers)/Math.log(10);
                				gradient_level = temp * 25;
                				latoimg = Math.round(10 + temp * 10);
                			}
                			
                			/** chooseIcon for marker **/
            				var urlIcon = '';
                			if(gradient_level < 10)
                				urlIcon = "img/federation_info/map_icons/regusers/pentagon/bluegradient/0.svg";
                			else if(gradient_level < 20)
                				urlIcon = "img/federation_info/map_icons/regusers/pentagon/bluegradient/1.svg";
                			else if(gradient_level < 30)
                				urlIcon = "img/federation_info/map_icons/regusers/pentagon/bluegradient/2.svg";
                			else if(gradient_level < 40)
                				urlIcon = "img/federation_info/map_icons/regusers/pentagon/bluegradient/3.svg";
                			else if(gradient_level < 50)
                				urlIcon = "img/federation_info/map_icons/regusers/pentagon/bluegradient/4.svg";
                			else if(gradient_level < 60)
                				urlIcon = "img/federation_info/map_icons/regusers/pentagon/bluegradient/5.svg";
                			else if(gradient_level < 70)
                				urlIcon = "img/federation_info/map_icons/regusers/pentagon/bluegradient/6.svg";
                			else if(gradient_level < 80)
                				urlIcon = "img/federation_info/map_icons/regusers/pentagon/bluegradient/7.svg";
                			else if(gradient_level < 90)
                				urlIcon = "img/federation_info/map_icons/regusers/pentagon/bluegradient/8.svg";
                			else
                				urlIcon = "img/federation_info/map_icons/regusers/pentagon/bluegradient/9.svg";
                			
                			marker = new google.maps.Marker({
            			        position : myLatlng,
            			        title    : hostName==null?(ipHost + ': ' + regusers + ' registered users'):(hostName + ': ' + regusers + ' registered users'),
            			        map      : gMap,
            			        zIndex   : i+1,
            			        icon     : {
            		                  url        : urlIcon,
            		                  anchor     : new google.maps.Point(latoimg/2, latoimg/2),
            		                  scaledSize : new google.maps.Size(latoimg, latoimg)
            		             }
            			    });
                			usersMarkers.push(marker);
            			}
            		}
    			}
    	};
    	this.callParent(arguments);
    }
});