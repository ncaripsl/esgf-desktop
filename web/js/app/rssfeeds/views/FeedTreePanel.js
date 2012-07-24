/**
 * @author CMCC
 */

Ext.define('MyDesktop.rssfeeds.views.FeedTreePanel', {
    extend   : 'Ext.tree.Panel',
    
    alias    : 'widget.feedtreepanel',
    
    requires : ['MyDesktop.rssfeeds.stores.FeedTreeStore'],

    initComponent : function() {
    	Ext.apply(this, {
            id          : 'feedTree',
            title       : 'Feeds',
            collapsible : true,
            floatable   : false,
            split       : true,
            width       : 225,
            minWidth    : 175,
            rootVisible : true, // impostato a 'false' espande automaticamente i nodi figli effettuando la chiamata ajax
            lines       : false,
            autoScroll  : true,
            store       : MyDesktop.rssfeeds.stores.FeedTreeStore,
            root        : {
               expanded : false,
               text     : 'Peer Groups'
            }/*,
            listeners: {
            	itemclick: {
                    fn: function(view, record, item, index, event) {
                    	if(record.get('leaf') == true) {
                    		event.stopEvent();
                    		Ext.getCmp('feedInfoTab').addFeed
                    		Ext.getStore('feedStore').load({
                    		    params:{
                    		    	feed: record.get('href')
                    		    }
                    		});
                    		Ext.getCmp('feedInfoTab').items.first().setTitle(record.get('text'));
                    	}
                    		
                    }
                }
            }*/

        });
        this.callParent(arguments);
    }
});