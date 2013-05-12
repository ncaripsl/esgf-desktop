/**
 * @author CMCC
 */

Ext.define('MyDesktop.usersmap.models.ClientsModel', {
    extend: 'Ext.data.Model',
    fields: [
      'latitude',
      'longitude',
      'country',
      'host',
      'numclient'
    ]
});