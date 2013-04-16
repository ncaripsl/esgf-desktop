/**
 * @author CMCC
 */

Ext.define('MyDesktop.multimedia.views.CategoryTreePanel', {
    extend   : 'Ext.tree.Panel',
    
    requires : ['MyDesktop.multimedia.stores.CategoryTreeStore'],

    initComponent : function() {
    	Ext.apply(this, {
            id          : 'categoryTree',
            title       : 'Multimedia Categories',
            collapsible : false,
            collapsed   : false, 
            region      : 'west',
            floatable   : false,
            split       : false,
            width       : 210,
            margins     : '5 5 5 5',
            rootVisible : false,  // impostato a 'false' espande automaticamente i nodi figli effettuando la chiamata ajax
            lines       : false,
            autoScroll  : true,
            store       : MyDesktop.multimedia.stores.CategoryTreeStore,
            root        : {
               expanded : true,
               text     : 'Multimedia Categories',
               iconCls  : 'peergroup'
            },
            listeners: {
                select: {
                	fn: function(view, record, item, index, event) {
                		if (record.get('leaf') == true) {
                			var title = record.get('text');
	                		var idtab    = record.get('idtab');
	                		
	                		var html= '';
	                		
	                		var category = record.parentNode.get('text');
	                		if (category == 'IMAGE') {
	                			html = '<div align="center"><img src="' + record.get('myObject') + '" width="100%" height="100%"/></div>';
	                		}
	                		else {
	                			html = '<iframe src="' + record.get('myObject') + '" height="100%" frameborder=0 width="100%"></iframe>';
	                		}
	                		if (!Ext.getCmp('tab' + idtab)) {
	                			Ext.getCmp('outputPanel').add({
	                    			id       : 'tab' + idtab,
	                    			title    : title,
	                    			html     : html,
	                    			closable : true
	                    		});
	                		}
	                		Ext.getCmp('tab' + idtab).show();
                		}
                    }
                }
            }

        });
        this.callParent(arguments);
    }
});