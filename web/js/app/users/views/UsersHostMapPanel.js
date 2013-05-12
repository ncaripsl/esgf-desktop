/**
 * @author CMCC
 */

Ext.define('MyDesktop.users.views.UsersHostMapPanel', {
    extend   : 'Ext.ux.GMapPanel',
    
    requires : ['MyDesktop.users.stores.UsersStore'],
 
    initComponent : function() {
    	
    	Ext.apply(this, {
    		id          : 'usersHostMap',
    		gmapType    : 'terrain',
    		mapConfOpts : ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
    		mapControls : ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
    		listeners   : {
    	        'mapready': function() {
    	        	
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
    	        }
    	    }
    	});
    	this.setCenter = {
            geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA'
        };
        this.callParent();
    }
});