/**
 * @author CMCC
 */

Ext.define('MyDesktop.multimedia.views.WebTree', {
    extend   : 'Ext.tree.Panel',
    
//    requires : ['MyDesktop.multimedia.stores.WebTreeStore'],

    initComponent : function() {
    	Ext.apply(this, {
            id          : 'webTree',
            title       : 'Web',
            rootVisible : false,  // impostato a 'false' espande automaticamente i nodi figli effettuando la chiamata ajax
            lines       : false,
            autoScroll  : true,
            store       : Ext.create('Ext.data.TreeStore', {
            	fields      : ['text','myObject', 'idtab'],
                root: {
//                    text:'Online',
                    expanded: true,
                    children:[{ text:'CMCC', iconCls:'web-multimedia', leaf:true, myObject:'http://www.cmcc.it/website/', idtab:'01'},
                              { text:'Focus', iconCls:'web-multimedia', leaf:true, myObject:'http://www.focus.it', idtab:'02'},
                              { text:'Sencha Learn', iconCls:'web-multimedia', leaf:true, myObject:'http://www.sencha.com/learn/extjs/?4x', idtab:'03'}]
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
                		Ext.getCmp('imgTree').getSelectionModel().deselectAll();
                		Ext.getCmp('videoTree').getSelectionModel().deselectAll();
                		Ext.getCmp('twitterTree').getSelectionModel().deselectAll();
                		Ext.getCmp('tab' + idtab).show();
                    }
                }
            }

        });
        this.callParent(arguments);
    }
});