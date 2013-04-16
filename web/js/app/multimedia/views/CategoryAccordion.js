/**
 * @author CMCC
 */

Ext.define('MyDesktop.multimedia.views.CategoryAccordion', {
    extend: 'Ext.panel.Panel',
    
    requires: ['MyDesktop.multimedia.views.WebTree',
               'MyDesktop.multimedia.views.ImgTree',
               'MyDesktop.multimedia.views.VideoTree',
               'MyDesktop.multimedia.views.TwitterTree'],
    
    initComponent : function() {
    	
    	var webtree = new MyDesktop.multimedia.views.WebTree();
    	var imgtree = new MyDesktop.multimedia.views.ImgTree();
    	var videotree = new MyDesktop.multimedia.views.VideoTree();
    	var twittree = new MyDesktop.multimedia.views.TwitterTree();
    	
    	Ext.apply(this, {
    		id      : 'categoryAccordionPanel',
    		title   : 'Multimedia Categories',
            region  : 'west',
            width   : 210,
            margins : '5 5 5 5',
            layout  : 'accordion',
            items   : [webtree,
                       imgtree,
                       videotree,
                       twittree]
    	});
        this.callParent();
    }
});
