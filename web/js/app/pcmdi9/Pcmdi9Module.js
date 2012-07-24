/**
 * @author CMCC
 */

Ext.define('MyDesktop.pcmdi9.Pcmdi9Module', {
    extend: 'Ext.ux.desktop.Module',
    id:'pcmdi9-win',
    init : function(){
        this.launcher = {
            text: 'Pcmdi9',
            iconCls:'dash',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('pcmdi9-win');
        if(!win){
            win = desktop.createWindow({
                id: 'pcmdi9-win',
                title: 'Pcmdi9',
                width: 1024,
                height: 735,
                resizable: false,   // blocca le dimensioni
                maximizable: false, // blocca la massimizzazione
                html : '<iframe src="http://pcmdi9.llnl.gov/esgf-web-fe/" height="700" frameborder=0 width="100%"></iframe>',
                iconCls: 'dash',
                animCollapse:false,
                constrainHeader:true
            });
        }     
        win.show();
        return win;
    }
});
