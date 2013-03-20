/**
 * @author CMCC
 */

Ext.define('MyDesktop.rssfeeds.stores.FeedStore', {
    extend      : 'Ext.data.Store',
    requires    : ['MyDesktop.rssfeeds.models.FeedItemModel'],
    
    model       : 'MyDesktop.rssfeeds.models.FeedItemModel',
    singleton   : true,
    
    constructor : function() {
    	this.id       = 'feedStore';
    	this.sortInfo = {
            property: 'pubDate',
            direction: 'DESC'
        };
    	this.listeners = {
    		load  : this.onLoad,
    		scope : this
        };
        this.proxy    = {
            type: 'ajax',
            //timeout: 100,
            url: 'rssfeedsInputStream/feedProxy.action',
            reader: {
                type: 'xml',
                record: 'item'
            },
            listeners: {
            exception: function(proxy, response) {
            Ext.MessageBox.alert('Error message', 'Unable to process your request. Server unreachable.');
            Ext.getCmp('feedsGridPanel').setLoading(false);
            Ext.getStore('feedStore').loadData([], false);
            if(Ext.getCmp('southfeed').items.getAt(0))                        // <--- new
               Ext.getCmp('southfeed').items.getAt(0).update('');        // <--- new
            else if(Ext.getCmp('eastfeed').items.getAt(0))                    // <--- new
               Ext.getCmp('eastfeed').items.getAt(0).update('');         // <--- new
            }
            }
        };
    	this.callParent(arguments);
    },
    
    /**
     * Listens for the store loading
     * @private
     */
    onLoad: function(){
    	Ext.getCmp('feedsGridPanel').setLoading(false);
        Ext.getCmp('feedsGridPanel').getSelectionModel().select(0);
    }
});