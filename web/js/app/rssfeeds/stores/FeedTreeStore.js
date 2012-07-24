/**
 * @author CMCC
 */

Ext.define('MyDesktop.rssfeeds.stores.FeedTreeStore', {
    extend      : 'Ext.data.TreeStore',
    
    singleton   : true,
    
    constructor : function() {
    	this.id        = 'feedTreeStore';
    	this.autoLoad  = false;
        this.proxy     = {
            type: 'ajax',
            url: 'rssfeedsJson/getProjectsHostsRssFeeds.action'
            //url: 'getProjectsHostsRssFeeds.action'
        };
    	this.callParent(arguments);
    }
});