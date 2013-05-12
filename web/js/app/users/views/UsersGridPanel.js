/**
 * @author CMCC
 */

Ext.define('MyDesktop.users.views.UsersGridPanel', {
    extend   : 'Ext.grid.Panel',
    
    requires : ['MyDesktop.users.stores.UsersStore'],
    
    initComponent : function() {
    	this.id          = 'usersgrid';
        this.store       = MyDesktop.users.stores.UsersStore;
        this.border      = true;
        this.region      = 'south';
        this.collapsible = true;
        this.split       = false;
        this.flex        = 3;
        this.title       = 'Hosts List';
        this.columns     = [
//	        {header: 'Visible', dataIndex: 'dimension', flex: 3, id: 'secondColumn', sortable: false},
	        {header: 'Host Name',        dataIndex: 'hostname',  flex: 2, id: 'nameUsersColumn',  sortable: true},
	        {header: 'Alias',            dataIndex: 'hostalias', flex: 2, id: 'ipUsersColumn',    sortable: true},
	        {header: 'City',             dataIndex: 'city',      flex: 1, id: 'cityUsersColumn',  sortable: true},
	        {header: 'Registered Users', dataIndex: 'regusers',  flex: 1, id: 'regUsersColumn',   sortable: true, renderer : this.pctChange}
	    ];
        this.tbar        = [
            '->',
            {
            	id            : 'usersCSVButton',
            	tooltip       : 'Export to CSV',
            	icon          : '/esgf-desktop/img/federation_info/csv.jpg',
            	cls           : 'x-btn-icon',
            	handler       : this.exporttoCSV
            }];
        this.listeners   = {
                collapse : this.resizeMap,
                expand   : this.resizeMap
        };
        this.callParent();
    },
    
    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    pctChange: function(val, metaData) {
        var colour;
        if(val == 0)
        	colour = '255, 255, 255';
        else if(val == 1) 
        	colour = '8, 184, 206';
        else if(val <= 10 && val>1)
        	colour = '0, 175, 255';
        else if(val <= 100 && val>10)
        	colour = '0, 125, 255';
        else if(val <= 1000 && val>100)
        	colour = '0, 75, 255';
        else if(val>1000)
        	colour = '0, 0, 255';
        metaData.style+='background-color: rgb(' + colour + ');';
    	return '<span>' + val + '</span>';
    },
    
    exporttoCSV: function() {
    	var selectedNode = Ext.getCmp('usersProjectTree').getSelectionModel().getSelection();
    	idProject = selectedNode[0].data.myObject;
    	projectName = selectedNode[0].data.text;
    	
        url = 'hostInfoActionsStream/RegUsersCSVAction.action';
        var params = '?idProject=' + idProject + '&projectName=' + projectName;
        window.open(url + params);
    },
    
    resizeMap: function() {
    	if(Ext.getCmp('usersHostMap').getMap()) {
    		google.maps.event.trigger(Ext.getCmp('usersHostMap').getMap(), "resize");
    	}
    }	
});
