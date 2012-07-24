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
            url: 'rssfeedsInputStream/feedProxy.action',
            reader: {
                type: 'xml',
                record: 'item'
            }
        };
    	this.callParent(arguments);
    },
    
    /**
     * Listens for the store loading
     * @private
     */
    onLoad: function(){
        Ext.getCmp('feedsGridPanel').getSelectionModel().select(0);
    }
});