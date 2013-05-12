/**
 * @author CMCC
 */

Ext.define('MyDesktop.availability.models.AvailabilityModel', {
    extend: 'Ext.data.Model',
    fields: [
      'hostid', 
      'hostalias',
      'hostname',
      'latitude',
      'longitude',
      'city', 
      'status',
      'elapsedtime'
    ]
});