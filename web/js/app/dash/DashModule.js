/**
 * @author CMCC
 */


Ext.define('MyDesktop.dash.DashModule', {
    extend: 'Ext.ux.desktop.Module',
    id:'dash-win',
    init : function(){
        this.launcher = {
            text: 'Dashboard',
            iconCls:'dash',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('dash-win');
        if(!win){
            win = desktop.createWindow({
                id              : 'dash-win',
                title           : 'Dashboard',
                width           : 1024,
                height          : 735,
                resizable       : true,   // blocca le dimensioni se impostato a false
                maxWidth        : 1024,
                minWidth        : 1024,
                maximizable     : false, // blocca la massimizzazione se impostato a false
                html            : '<iframe src="/esgf-dashboard/monitoring/AllProjectsMini?request_locale=en&guest=1&iframe=monitoring/AllProjectsMini%3Frequest_locale%3Den%26guest%3D1" height="700" frameborder=0 width="100%"></iframe>',
                iconCls         : 'dash',
                animCollapse    :false,
                constrainHeader :true
            });
        }     
        win.show();
        return win;
    }
});
