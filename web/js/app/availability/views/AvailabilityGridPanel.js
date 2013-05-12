/**
 * @author CMCC
 */

Ext.define('MyDesktop.availability.views.AvailabilityGridPanel', {
    extend   : 'Ext.grid.Panel',
    
    requires : ['MyDesktop.availability.stores.AvailabilityStore'],
    
    initComponent : function() {
    	this.id          = 'availabilitygrid';
        this.store       = MyDesktop.availability.stores.AvailabilityStore;
        this.border      = true;
        this.region      = 'south';
        this.collapsible = true;
        this.split       = false;
        this.flex        = 3;
        this.title       = 'Hosts List';
        this.columns     = [
//	        {header: 'Visible', dataIndex: 'dimension', flex: 3, id: 'secondColumn', sortable: false},
			{header: 'Host Name',    dataIndex: 'hostname',    flex: 2, id: 'nameColumn',    sortable: true},
	        {header: 'Alias',        dataIndex: 'hostalias',   flex: 2, id: 'ipColumn',      sortable: true},
	        {header: 'City',         dataIndex: 'city',        flex: 1, id: 'fiveminColumn', sortable: true},
	        {header: 'Elapsed Time', dataIndex: 'elapsedtime', flex: 1, id: 'dayColumn',     sortable: true, renderer : this.timeChange},
	        {header: 'Status (last 5 min)',       dataIndex: 'status',      flex: 1, id: 'hourColumn',    sortable: true, renderer : this.statusChange}
	    ];
        this.tbar        = [
            '->',
            {
            	id            : 'availabilityCSVButton',
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
     * Custom function used for status renderer
     * @param {Object} val
     */
    statusChange: function(val, metaData) {
    	var colour = '';
    	var value  = '';
        if(val == 1) {
        	colour = '0, 255, 0';
        	value  = 'OK';
        }
        else {
        	colour = '255, 0, 0';
        	value  = 'NOT OK';
        }
        metaData.style+='background-color: rgb(' + colour + ');';
        return '<span>' + value + '</span>';
    },
    
    /**
     * Custom function used for elapsedtime renderer
     * @param {Object} val
     */
    timeChange: function(val, metaData) {
    	if(val == 1000000)
    		return 'TIMEOUT';
    	else
    		return val;
    },
    
    exporttoCSV: function() {
    	var selectedNode = Ext.getCmp('availabilityProjectTree').getSelectionModel().getSelection();
    	idProject = selectedNode[0].data.myObject;
    	projectName = selectedNode[0].data.text;
    	
        url = 'hostInfoActionsStream/AvailabilityCSVAction.action';
        var params = '?idProject=' + idProject + '&projectName=' + projectName;
        window.open(url + params);
    },
    
    resizeMap: function() {
    	if(Ext.getCmp('hostMap').getMap()) {
    		google.maps.event.trigger(Ext.getCmp('hostMap').getMap(), "resize");
    	}
    }	
});
