/**
 * @author CMCC
 */

Ext.define('MyDesktop.rssfeeds.views.FeedViewer', {
    extend   : 'Ext.panel.Panel',
    requires : ['MyDesktop.rssfeeds.views.FeedInfo',
                'MyDesktop.rssfeeds.views.FeedTreePanel'],
    
    initComponent: function() {
        Ext.apply(this, {
            layout  : 'border',
            border  : false,
            padding : 5,
            items   : [this.createFeedTreePanel(), this.createFeedInfo()]
        });
        this.callParent(arguments);
    },
    
    createFeedTreePanel: function(){
        this.feedTreePanel = Ext.create('widget.feedtreepanel', {
            region    : 'west',
            listeners : {
                scope     : this,
                itemclick : this.onFeedSelect
            }
        });
        return this.feedTreePanel;
    },
    
    createFeedInfo: function() {
        this.feedInfo = Ext.create('widget.feedinfo', {
            region: 'center',
            minWidth: 300
        });
        return this.feedInfo;
    },
    
    onFeedSelect: function(view, record, item, index, event) {
    	if(record.get('leaf') == true) {
    		event.stopEvent();
    		var title = record.get('text');
    		var url   = record.get('href'); 
    		this.feedInfo.addFeed(title, url);
//    		Ext.getCmp('feedInfoTab').addFeed
//    		Ext.getStore('feedStore').load({
//    		    params:{
//    		    	feed: record.get('href')
//    		    }
//    		});
//    		Ext.getCmp('feedInfoTab').items.first().setTitle(record.get('text'));
    	}
    }
});