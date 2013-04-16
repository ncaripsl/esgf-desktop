Ext.define('MyDesktop.realtimeCpu.models.RealtimeCpuModel', {
    extend: 'Ext.data.Model',
    fields: [        
       'loadavg1',
       'loadavg5',
       'loadavg15',
       'timestamp'
    ]
});