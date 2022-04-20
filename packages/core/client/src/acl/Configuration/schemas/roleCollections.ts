import { ISchema } from '@formily/react';
import { useRoleResourceValues } from './useRoleResourceValues';
import { useSaveRoleResourceAction } from './useSaveRoleResourceAction';

const collection = {
  name: 'collections',
  targetKey: 'name',
  filterTargetKey: 'name',
  fields: [
    {
      type: 'integer',
      name: 'title',
      interface: 'input',
      uiSchema: {
        title: '数据表名称',
        type: 'number',
        'x-component': 'Input',
        required: true,
      } as ISchema,
    },
    {
      type: 'string',
      name: 'name',
      interface: 'input',
      uiSchema: {
        title: '数据表标识',
        type: 'string',
        'x-component': 'Input',
        description: '使用英文',
      } as ISchema,
    },
    {
      type: 'string',
      name: 'usingConfig',
      interface: 'input',
      uiSchema: {
        title: '权限策略',
        type: 'string',
        'x-component': 'Select',
        enum: [
          { label: '单独配置', value: 'resourceAction', color: 'orange' },
          { label: '通用配置', value: 'strategy', color: 'default' },
        ],
      } as ISchema,
    },
    {
      type: 'hasMany',
      name: 'fields',
      target: 'fields',
      collectionName: 'collections',
      sourceKey: 'name',
      targetKey: 'name',
      uiSchema: {},
    },
  ],
};

export const roleCollectionsSchema: ISchema = {
  type: 'void',
  'x-decorator': 'ResourceActionProvider',
  'x-decorator-props': {
    collection,
    association: {
      sourceKey: 'name',
      targetKey: 'name',
    },
    resourceName: 'roles.collections',
    request: {
      resource: 'roles.collections',
      action: 'list',
      params: {
        pageSize: 20,
        filter: { inherit: false },
        sort: ['sort'],
        appends: [],
      },
    },
  },
  properties: {
    table1: {
      type: 'void',
      'x-uid': 'input',
      'x-component': 'Table.Void',
      'x-component-props': {
        rowKey: 'name',
        // rowSelection: {
        //   type: 'checkbox',
        // },
        useDataSource: '{{ cm.useDataSourceFromRAC }}',
      },
      properties: {
        column1: {
          type: 'void',
          'x-decorator': 'Table.Column.Decorator',
          'x-component': 'Table.Column',
          properties: {
            title: {
              type: 'number',
              'x-component': 'CollectionField',
              'x-read-pretty': true,
            },
          },
        },
        column2: {
          type: 'void',
          'x-decorator': 'Table.Column.Decorator',
          'x-component': 'Table.Column',
          properties: {
            name: {
              type: 'string',
              'x-component': 'CollectionField',
              'x-read-pretty': true,
            },
          },
        },
        column3: {
          type: 'void',
          'x-decorator': 'Table.Column.Decorator',
          'x-component': 'Table.Column',
          properties: {
            usingConfig: {
              type: 'string',
              'x-component': 'CollectionField',
              'x-read-pretty': true,
            },
          },
        },
        column4: {
          type: 'void',
          title: 'Actions',
          'x-component': 'Table.Column',
          properties: {
            actions: {
              type: 'void',
              'x-component': 'Space',
              'x-component-props': {
                split: '|',
              },
              properties: {
                configure: {
                  type: 'void',
                  title: '单独配置权限',
                  'x-component': 'Action.Link',
                  'x-component-props': {
                    type: 'primary',
                  },
                  properties: {
                    drawer: {
                      type: 'void',
                      'x-component': 'Action.Drawer',
                      'x-decorator': 'Form',
                      'x-decorator-props': {
                        useValues: useRoleResourceValues,
                      },
                      title: '配置权限',
                      properties: {
                        usingActionsConfig: {
                          'x-component': 'Radio.Group',
                          'x-decorator': 'FormItem',
                          default: false,
                          enum: [
                            { value: false, label: '使用通用权限' },
                            { value: true, label: '单独配置权限' },
                          ],
                          'x-reactions': {
                            target: 'actions',
                            fulfill: {
                              state: {
                                hidden: '{{!$self.value}}',
                              },
                            },
                          },
                        },
                        actions: {
                          'x-component': 'RolesResourcesActions',
                          'x-decorator': 'FormItem',
                        },
                        footer: {
                          type: 'void',
                          'x-component': 'Action.Drawer.Footer',
                          properties: {
                            action1: {
                              title: 'Cancel',
                              'x-component': 'Action',
                              'x-component-props': {
                                useAction: '{{ cm.useCancelAction }}',
                              },
                            },
                            action2: {
                              title: 'Submit',
                              'x-component': 'Action',
                              'x-component-props': {
                                type: 'primary',
                                useAction: useSaveRoleResourceAction,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};