Ext.define('MyDesktop.realtimeMemory.models.RealtimeMemoryModel', {
    extend: 'Ext.data.Model',
    fields: [        
       'freeMem',
       'busyMem',
       'totMem',
       'timestamp'
    ]
});