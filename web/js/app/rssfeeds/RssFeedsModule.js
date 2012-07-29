/**
 * @author CMCC
 */

Ext.define('MyDesktop.rssfeeds.RssFeedsModule', {
    extend: 'Ext.ux.desktop.Module',
    requires : ['MyDesktop.rssfeeds.views.FeedViewer'],
    id:'rssfeeds-win',
    
    init : function(){
        this.launcher = {
            text: 'Rss Feed Viewer',
            iconCls:'rssfeeds',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop   = this.app.getDesktop();
        var win       = desktop.getWindow('rssfeeds-win');
        if(!win){
        	var feedsViewer = new MyDesktop.rssfeeds.views.FeedViewer();
            win = desktop.createWindow({
                id             : 'rssfeeds-win',
                title          : 'Rss Feed Viewer',
                width          : 1024,
                height         : 768,
                iconCls        : 'rssfeeds',
                animCollapse   : false,
                constrainHeader: true,
                layout         : 'fit',
                items          : [feedsViewer]
            });
        }
        win.show();
        win.on('beforerender', this.loadContent());
        return win;
    },
    
    loadContent : function(){

    	// clear grid stores from previous content
    	var feedProxyStore = Ext.getStore('feedStore');
    	feedProxyStore.loadData([],false);
    	
    	// recupero il feed tree e espando la root caricando il contenuto
    	var feedTreePanel = Ext.getCmp('feedTree');
    	feedTreePanel.getRootNode().expand();
    }
    
});