

Ext.define('MyDesktop.twitter.TwitterModule', {
    extend: 'Ext.ux.desktop.Module',
    id:'twit-win',
    init : function(){
    	//this.createTwitterWindow();
        this.launcher = {
            text: 'Twitter',
            iconCls:'twitter',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('twit-win');
        if(!win){
        		win = desktop.createWindow({
                    id: 'twit-win',
                    title: 'Twitter',
                    minWidth: 450,
                    minHeight: 357,
                    width: 450,
                    height: 357,
                    html : '<iframe src="twitter.html" height="700" frameborder=0 width="100%"></iframe>',
                    iconCls: 'twitter',
                    animCollapse:false,
                    constrainHeader:true
                });
        }
        win.show();
        return win;
    }
    
});