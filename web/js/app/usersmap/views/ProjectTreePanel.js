/**
 * @author CMCC
 */

Ext.define('MyDesktop.usersmap.views.ProjectTreePanel', {
    extend   : 'Ext.tree.Panel',
    
    requires : ['MyDesktop.usersmap.stores.ProjectTreeStore'],

    initComponent : function() {
    	Ext.apply(this, {
            id          : 'usersmapProjectTree',
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
            store       : MyDesktop.usersmap.stores.ProjectTreeStore,
            root        : {
               expanded : false,
               text     : 'All Peer Groups',
               iconCls  : 'peergroup_usersmap'
            },
            listeners: {
                select: {
                	fn: function(view, record, item, index, event) {
                		Ext.getStore('hostStore').load();
                    }
                }
            }
        });
        this.callParent(arguments);
    }
});