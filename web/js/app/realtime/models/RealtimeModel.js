Ext.define('MyDesktop.realtime.models.RealtimeModel', {
    extend: 'Ext.data.Model',
    fields: [        
       'loadavg1',
       'loadavg5',
       'loadavg15',
       'timestamp'
    ]
});