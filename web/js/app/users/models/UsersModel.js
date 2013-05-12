/**
 * @author CMCC
 */

Ext.define('MyDesktop.users.models.UsersModel', {
    extend: 'Ext.data.Model',
    fields: [
      'hostid', 
      'hostalias',
      'hostname',
      'latitude',
      'longitude',
      'city',
      'regusers'
    ]
});