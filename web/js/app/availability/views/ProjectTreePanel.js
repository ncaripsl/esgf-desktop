/**
 * @author CMCC
 */

Ext.define('MyDesktop.availability.views.ProjectTreePanel', {
    extend   : 'Ext.tree.Panel',
    
    requires : ['MyDesktop.availability.stores.ProjectTreeStore'],

    initComponent : function() {
    	Ext.apply(this, {
            id          : 'availabilityProjectTree',
            title       : 'Peer Groups',
            collapsible : false,
            collapsed   : false, 
            region      : 'west',
            floatable   : false,
            split       : true,
            width       : 225,
            minWidth    : 225,
            maxWidth    : 225,
            rootVisible : true,  // impostato a 'false' espande automaticamente i nodi figli effettuando la chiamata ajax
            singleExpand : true, // impostato a 'true' permette l'apertura di un solo nodo dell'albero per volta
            lines       : false,
            autoScroll  : true,
            store       : MyDesktop.availability.stores.ProjectTreeStore,
            root        : {
               expanded : false,
               text     : 'All Peer Groups',
               iconCls  : 'peergroup'
            },
            listeners: {
                select: {
                	fn: function(view, record, item, index, event) {
                		var endDate = new Date();
                		if(record.get('leaf') == true) {
                    		
                    		var idProject = record.get('myObject');
                    		Ext.getStore('availabilityStore').load({
                     		    params:{
                     		    	idProject : idProject
                    		    }
                    		});
                    		Ext.getCmp('availabilitygrid').setTitle(Ext.String.format('Hosts List [Reference date \{0\} \{1\}]', Ext.Date.format(endDate, "m-d-Y"), Ext.Date.format(endDate, "H:i")));
                    	}
                    	else if(record.get('text') == 'All Peer Groups') {
                    		Ext.getStore('availabilityStore').load();
                    	}
                    }
                }
            }

        });
        this.callParent(arguments);
    }
});