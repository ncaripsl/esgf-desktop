/**
 * @author CMCC
 */

Ext.define('MyDesktop.multimedia.views.ImgTree', {
    extend   : 'Ext.tree.Panel',
    
    initComponent : function() {
    	Ext.apply(this, {
            id          : 'imgTree',
            title       : 'Images',
            rootVisible : false,  // impostato a 'false' espande automaticamente i nodi figli effettuando la chiamata ajax
            lines       : false,
            autoScroll  : true,
            store       : Ext.create('Ext.data.TreeStore', {
            	fields      : ['text','myObject', 'idtab'],
                root: {
//                    text:'Online',
                    expanded: true,
                    children:[{ text:'Image01', iconCls:'img-multimedia', leaf:true, myObject:'http://www.focus.it/Allegati/2013/2/mdis_global_enhancedcolor_map_rot_140globebright_809416.jpg', idtab:'11'},
                              { text:'Image02', iconCls:'img-multimedia', leaf:true, myObject:'http://www.focus.it/Allegati/2013/4/giove_1139461.jpg', idtab:'12'},
                              { text:'Image03', iconCls:'img-multimedia', leaf:true, myObject:'http://www.focus.it/Allegati/2013/4/nasa_734501main_v838_hubble_cropped_1600-1200_1138019.jpg', idtab:'13'},
                              { text:'Image04', iconCls:'img-multimedia', leaf:true, myObject:'http://blog.focus.it/una-finestra-sull-universo/files/2013/04/Pan-STARRS_M31.jpg', idtab:'14'}]
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
                		Ext.getCmp('twitterTree').getSelectionModel().deselectAll();
                		Ext.getCmp('tab' + idtab).show();
                    }
                }
            }

        });
        this.callParent(arguments);
    }
});