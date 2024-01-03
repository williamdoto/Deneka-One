import CrudModule from '../../components/CrudModule';
import DynamicForm from '../../components/DynamicForm';

export default function ServiceList() {
  const entity = 'product';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name, price, description, categories',
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: 'Product',
    DATATABLE_TITLE: 'Product_list',
    ADD_NEW_ENTITY: 'add_new_Product',
    ENTITY_NAME: 'Product',
  };

  const fields = {
    id: {
      type: 'string',
      required: true,
      label: 'ID'
    },
    name: {
      type: 'string',
      required: true,
      label: 'Name'
    },
    price: {
      type: 'currency',
      required: true,
      label: 'Price'
    },
    description: {
      type: 'textarea',
      label: 'Description'
    },
    categories: {
      type: 'tags', // Assuming 'tags' type handles multiple categories as tags
      label: 'Categories'
    },
  };

  const config = {
    entity,
    fields,
    searchConfig,
    deleteModalLabels,
    ...Labels,
  };

  return (
    <CrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
