Ext.define('MyDesktop.realtime.views.RealChart', {
    extend   : 'Ext.chart.Chart',
    alias    : 'widget.RealChart',
    requires : ['MyDesktop.realtime.stores.RealtimeStore'],
    
    constructor: function() {
        this.callParent([{theme: 'Category1'}]);
    },

    initComponent : function() {
    	this.id      = 'realtimeChart';
    	this.animate = false;
    	this.width   = '100%';
    	this.height  = '100%';
    	this.style   = 'background:#fff',
    	this.text    = 'CPU load average (last 1min, 5min, 15min)',
        this.store   = MyDesktop.realtime.stores.RealtimeStore;
    	this.legend =  {
            position: 'right'
        },
        this.axes    = [
        {
            type: 'Numeric',
            position: 'left',
            minimum: 0,
            //maximum: 1.0,
            fields: ['loadavg1', 'loadavg5', 'loadavg15'],
            minorTickSteps: 1,
            title: 'CPU Load Avg',
            grid: true,
            labelTitle: {
                font: 'bold 14px Arial'
            },
        },{
            type: 'Category',
            position: 'bottom',
            fields: ['timestamp'],
            title: 'Time',
            grid: true,
            labelTitle: {
                font: 'bold 14px Arial'
            }
        }];
       this.series = [{
           type: 'line',
           highlight: {
               size: 7,
               radius: 7
           },
           xField: 'timestamp',
           yField: 'loadavg1',
           markerConfig: {
               type: 'cross',
               size: 4,
               radius: 4,
               'stroke-width': 0
           }
       },
       {
           type: 'line',
           highlight: {
               size: 7,
               radius: 7
           },
           xField: 'timestamp',
           yField: 'loadavg5',
           markerConfig: {
               type: 'cross',
               size: 4,
               radius: 4,
               'stroke-width': 0
           }
       },
       {
           type: 'line',
           highlight: {
               size: 7,
               radius: 7
           },
           xField: 'timestamp',
           yField: 'loadavg15',
           markerConfig: {
               type: 'cross',
               size: 4,
               radius: 4,
               'stroke-width': 0
           }
       }];
        this.callParent();
    }
});