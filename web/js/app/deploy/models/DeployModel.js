/**
 * @author CMCC
 */

Ext.define('MyDesktop.deploy.models.DeployModel', {
    extend: 'Ext.data.Model',
    fields: [
      'hostid', 
      'hostalias',
      'hostname',
      'latitude',
      'longitude',
      'city',
      'nodetype'
    ]
});