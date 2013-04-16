/**
 * @author CMCC
 */

Ext.define('MyDesktop.multimedia.views.OutputPanel', {
    extend: 'Ext.tab.Panel',
    
    initComponent : function() {
    	
    	Ext.apply(this, {
    		id      : 'outputPanel',
            region  : 'center',
            margins : '5 5 5 0',
            layout  : 'fit'/*,
            items   : [{
                title    : 'Foo',
                html    : '<iframe src="http://www.cmcc.it/website/" height="100%" frameborder=0 width="100%"></iframe>'
            }]*/ 
    	});
        this.callParent();
    }
});