/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',
        
        'MyDesktop.dash.DashModule',
        'MyDesktop.twitter.TwitterModule',        
//        'MyDesktop.grid.GridModule',
//        'MyDesktop.chart.ChartModule',
        'MyDesktop.rssfeeds.RssFeedsModule',
//        'MyDesktop.system_status.SystemStatusModule',
//        'MyDesktop.pcmdi9.Pcmdi9Module',
//        'MyDesktop.gmap.GMapModule',
//        'MyDesktop.monitoring.MonitoringModule',
//        'MyDesktop.socialMenu.SocialMenuModule',
//        'MyDesktop.tree_tabs_grid.TreeTabsGridModule',
//        
//        'MyDesktop.tree_combo_tabs.TreeComboTabsModule',
//        'MyDesktop.olap.OlapModule',
        'MyDesktop.datastats.DatastatsModule',
        'MyDesktop.realtimeCpu.RealtimeCpuModule',
        'MyDesktop.realtimeMemory.RealtimeMemoryModule',
        'MyDesktop.realtimeSwap.RealtimeSwapModule',
        'MyDesktop.multimedia.MultimediaModule',
        'MyDesktop.availability.AvailabilityModule',
        'MyDesktop.users.UsersModule',
        'MyDesktop.deploy.DeployModule',
        'MyDesktop.usersmap.UsersmapModule',
        
//        'MyDesktop.realtime.RealtimeModule',
//        'MyDesktop.terminal.TerminalModule',
//        'MyDesktop.video.VideoWindow',
//        'MyDesktop.portal.PortalModule',
//        'MyDesktop.spotcheck.SpotcheckModule',
        'MyDesktop.managementConsole.ManagementConsoleModule',
//        'MyDesktop.geodatausage.GeodataUsageModule',
        
//        'MyDesktop.ophidiaAccessView.OphidiaAccessViewModule',
//        'MyDesktop.ophidiaAccessFragmentInfo.OphidiaAccessFragmentInfoModule',
        
//        'MyDesktop.ophidiaSummary.OphidiaSummaryModule',
        
        'MyDesktop.Settings'
    ],

    init: function() {
        this.callParent();
    },

    getModules : function(){
        return [
//            new MyDesktop.terminal.TerminalModule(),
            new MyDesktop.dash.DashModule(),
            new MyDesktop.twitter.TwitterModule(),
//            new MyDesktop.grid.GridModule(),
//            new MyDesktop.chart.ChartModule(),
            new MyDesktop.rssfeeds.RssFeedsModule(),
//            new MyDesktop.system_status.SystemStatusModule(),
//            new MyDesktop.pcmdi9.Pcmdi9Module(),
//            new MyDesktop.gmap.GMapModule(),
//            new MyDesktop.monitoring.MonitoringModule(),
//            new MyDesktop.socialMenu.SocialMenuModule(),
//            new MyDesktop.tree_tabs_grid.TreeTabsGridModule(),
//
//            new MyDesktop.tree_combo_tabs.TreeComboTabsModule(),
//            new MyDesktop.olap.OlapModule(),
            new MyDesktop.datastats.DatastatsModule(),
            new MyDesktop.realtimeCpu.RealtimeCpuModule(),
            new MyDesktop.realtimeMemory.RealtimeMemoryModule(),
            new MyDesktop.realtimeSwap.RealtimeSwapModule(),
            new MyDesktop.multimedia.MultimediaModule(),
            new MyDesktop.availability.AvailabilityModule(),
            new MyDesktop.users.UsersModule(),
            new MyDesktop.deploy.DeployModule(),
            new MyDesktop.usersmap.UsersmapModule(),

//            new MyDesktop.realtime.RealtimeModule(),
//            new MyDesktop.video.VideoWindow(),
//            new MyDesktop.portal.PortalModule(),
//            new MyDesktop.spotcheck.SpotcheckModule(),
            new MyDesktop.managementConsole.ManagementConsoleModule()//,
//            new MyDesktop.geodatausage.GeodataUsageModule(),
            
//            new MyDesktop.ophidiaAccessView.OphidiaAccessViewModule(),
//            new MyDesktop.ophidiaAccessFragmentInfo.OphidiaAccessFragmentInfoModule(),
            
//            new MyDesktop.ophidiaSummary.OphidiaSummaryModule()
            
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
//            cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    { name: 'Dashboard', iconCls: 'dash-win-shortcut', module: 'dash-win' },
                    { name: 'CMIP5 Data Stats', iconCls: 'datastats-shortcut', module: 'datastats-win'},
                    { name: 'Availability', iconCls: 'availability-shortcut', module: 'availability-win' },
                    { name: 'Users', iconCls: 'users-shortcut', module: 'users-win' },
                    { name: 'Deployment', iconCls: 'deployment-shortcut', module: 'deploy-win' },
                    { name: 'Clients map', iconCls: 'usersMap-shortcut', module: 'usersmap-win'},
                    //{ name: 'Realtime Cpu', iconCls: 'realtimeCpu-shortcut', module: 'realtimeCpu-win' },
                    //{ name: 'Realtime Memory', iconCls: 'realtimeMemory-shortcut', module: 'realtimeMemory-win' },
                    //{ name: 'Realtime Swap', iconCls: 'realtimeSwap-shortcut', module: 'realtimeSwap-win' }, 
                    { name: 'Multimedia', iconCls: 'multimedia-shortcut', module: 'multimedia-win'}
//                    { name: 'Realtime', iconCls: 'realtime-shortcut', module: 'realtime-win' },
                    //                    { name: 'Grid', iconCls: 'grid-shortcut', module: 'grid-win' },
//                    { name: 'Chart', iconCls: 'chart-shortcut', module: 'chart-win'},
//                    { name: 'Download Statistics', iconCls: 'olap-shortcut', module: 'olap-win'},
                    //{ name: 'Management Console', iconCls: 'terminal-shortcut', module: 'managementConsole-win'},
                    //{ name: 'Rss Feed Viewer', iconCls: 'rssfeeds-shortcut', module: 'rssfeeds-win'},
                    //{ name: 'Twitter', iconCls: 'twitter-win-shortcut', module: 'twit-win' }
//                    { name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'},
//                    { name: 'Google Map', iconCls: 'gmap-shortcut', module: 'gmap-win' }
                ]
            }),

            wallpaper: 'img/desktop/wallpapers/wall8.jpg',
            wallpaperStretch: true
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Root Admin',
            iconCls: 'user',
//            autoScroll: true,
//            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'Settings',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    }/*,
                    '-',
                    {
                        text:'Logout',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }*/
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
//            quickStart: [
//                { name: 'Management Console', iconCls: 'terminal', module: 'managementConsole-win' }
                
                quickStart: [
                             { name: 'Realtime Cpu', iconCls: 'realtimeCpu', module: 'realtimeCpu-win' },
                             { name: 'Realtime Memory', iconCls: 'realtimeMemory', module: 'realtimeMemory-win' },
                             { name: 'Realtime Swap', iconCls: 'realtimeSwap', module: 'realtimeSwap-win' }, 
                             { name: 'Availability', iconCls: 'availability', module: 'availability-win' },
                             { name: 'Users', iconCls: 'users', module: 'users-win' },
                             { name: 'Deployment', iconCls: 'deployment', module: 'deploy-win' },
                             { name: 'Clients map', iconCls: 'usersMap', module: 'usersmap-win'}
                             /*,
                             { name: 'Management Console', iconCls: 'terminal', module: 'managementConsole-win' }*/
                         ],                
//            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('Logout', 'Are you sure you want to logout?');
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});

