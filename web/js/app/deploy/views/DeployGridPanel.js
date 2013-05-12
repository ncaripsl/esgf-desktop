/**
 * @author CMCC
 */

Ext.define('MyDesktop.deploy.views.DeployGridPanel', {
    extend   : 'Ext.grid.Panel',
    
    requires : ['MyDesktop.deploy.stores.DeployStore'],
    
    initComponent : function() {
    	this.id          = 'deploygrid';
        this.store       = MyDesktop.deploy.stores.DeployStore;
        this.border      = true;
        this.region      = 'south';
        this.collapsible = true;
        this.split       = false;
        this.flex        = 3;
        this.title       = 'Hosts List';
        this.columns     = [
//	        {header: 'Visible', dataIndex: 'dimension', flex: 3, id: 'secondColumn', sortable: false},
	        {header: 'Host Name', dataIndex: 'hostname',  flex: 2, id: 'nameDeployColumn', sortable: false},
	        {header: 'Alias',     dataIndex: 'hostalias', flex: 2, id: 'ipDeployColumn',   sortable: true},
	        {header: 'City',      dataIndex: 'city',      flex: 1, id: 'cityDeployColumn', sortable: false},
	        {header: 'Node Type', dataIndex: 'nodetype',  flex: 1, id: 'nodetypeColumn',   sortable: true, renderer : this.nodeType}
	    ];
        this.tbar        = [
            '->',
            {
            	id            : 'deployCSVButton',
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
    nodeType: function(val, metaData) {
    	var nodetype_str = "";
        if(val == null || val.length == 0) {
    		metaData.style+='';
    		return '-';
    	}
        else {
        	if ((val & 32) > 0)
    			nodetype_str= nodetype_str + "Compute ";
    		if ((val & 16) > 0)
    			nodetype_str= nodetype_str + "Idp ";
    		if ((val & 8) > 0)
    			nodetype_str= nodetype_str + "Index ";
    		if ((val & 4) > 0)
    			nodetype_str= nodetype_str + "Data ";
    		nodetype_str = nodetype_str + "";
        }
    	return '<span>' + nodetype_str + '</span>';
    },
    
    exporttoCSV: function() {
    	var selectedNode = Ext.getCmp('deployProjectTree').getSelectionModel().getSelection();
    	idProject = selectedNode[0].data.myObject;
    	projectName = selectedNode[0].data.text;
    	
        url = 'hostInfoActionsStream/NodeTypeCSVAction.action';
        var params = '?idProject=' + idProject + '&projectName=' + projectName;
        window.open(url + params);
    },
    
    resizeMap: function() {
    	if(Ext.getCmp('deployHostMap').getMap()) {
    		google.maps.event.trigger(Ext.getCmp('deployHostMap').getMap(), "resize");
    	}
    }	
});
