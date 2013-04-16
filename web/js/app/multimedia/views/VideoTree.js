/**
 * @author CMCC
 */

Ext.define('MyDesktop.multimedia.views.VideoTree', {
    extend   : 'Ext.tree.Panel',
    
    initComponent : function() {
    	Ext.apply(this, {
            id          : 'videoTree',
            title       : 'Videos',
            rootVisible : false,  // impostato a 'false' espande automaticamente i nodi figli effettuando la chiamata ajax
            lines       : false,
            autoScroll  : true,
            store       : Ext.create('Ext.data.TreeStore', {
            	fields      : ['text','myObject', 'idtab'],
                root: {
//                    text:'Online',
                    expanded: true,
                    children:[{ text:'EGI', iconCls:'video-multimedia', leaf:true, myObject:'http://www.youtube.com/embed/5XO2CCnHIzU', idtab:'21'},
                              { text:'Earth HD from ISS', iconCls:'video-multimedia', leaf:true, myObject:'http://www.youtube.com/embed/Ip2ZGND1I9Q', idtab:'22'}]
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
                		Ext.getCmp('imgTree').getSelectionModel().deselectAll();
                		Ext.getCmp('twitterTree').getSelectionModel().deselectAll();
                		Ext.getCmp('tab' + idtab).show();
                    }
                }
            }

        });
        this.callParent(arguments);
    }
});