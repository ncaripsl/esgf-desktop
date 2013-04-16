/**
 * @author CMCC
 */

Ext.define('MyDesktop.multimedia.views.TwitterTree', {
    extend   : 'Ext.tree.Panel',
    
    initComponent : function() {
    	Ext.apply(this, {
            id          : 'twitterTree',
            title       : 'Twitter',
            rootVisible : false,  // impostato a 'false' espande automaticamente i nodi figli effettuando la chiamata ajax
            lines       : false,
            autoScroll  : true,
            store       : Ext.create('Ext.data.TreeStore', {
            	fields      : ['text','myObject', 'idtab'],
                root: {
//                    text:'Online',
                    expanded: true,
                    children:[{ text:'ESGF', iconCls:'twitter-multimedia', leaf:true, myObject:'twitter.html', idtab:'31'}]
                }
            }),
            listeners: {
                select: {
                	fn: function(view, record, item, index, event) {
                		var title = record.get('text');
                		var idtab    = record.get('idtab');
                		var html = '<iframe src="' + record.get('myObject') + '" height="100%" frameborder=0 width="100%"></iframe>';
                		if (!Ext.getCmp('tab' + idtab)) {
                			Ext.getCmp('outputPanel').add({
                    			id       : 'tab' + idtab,
                    			title    : title,
                    			html     : html,
                    			closable : true
                    		});
                		}
                		Ext.getCmp('webTree').getSelectionModel().deselectAll();
                		Ext.getCmp('videoTree').getSelectionModel().deselectAll();
                		Ext.getCmp('imgTree').getSelectionModel().deselectAll();
                		Ext.getCmp('tab' + idtab).show();
                    }
                }
            }

        });
        this.callParent(arguments);
    }
});