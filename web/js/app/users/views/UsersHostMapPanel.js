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
    		mapControls : ['GSmallMapControl','GMapTypeControl','NonExistantControl']
    	});
    	this.setCenter = {
            geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA'
        };
        this.callParent();
    }
});