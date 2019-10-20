export class CategoryModel {
  id: string;
  name: string;
  label: string;
  parentid: string;
  isshow: string;
  orderby: string;
  isleaf: string;
  item: string;
}

export class CategoryItemNode extends CategoryModel {
  children: CategoryItemNode[] = [];
}

export class CategoryItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}
