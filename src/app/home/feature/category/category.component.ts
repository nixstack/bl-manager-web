import { Component, OnInit, ChangeDetectorRef, Injectable, NgZone, ViewChild } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import {  CategoryItemNode, CategoryItemFlatNode} from './category.model';
import { FeatureService } from '../feature.service';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';


@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<CategoryItemNode[]>([]);

  get data(): CategoryItemNode[] { return this.dataChange.value; }

  constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {
    this.initialize();
  }

  initialize() {
    //
  }

  buildFileTree(arr: CategoryItemNode[], level: number): CategoryItemNode[] {
    return arr.reduce<CategoryItemNode[]>((accumulator, key) => {
      const node = key;
      node.item = key.name;

      if (key.children) {
        node.children = this.buildFileTree(key.children, level + 1);
      }

      return accumulator.concat(node);
    }, []);
  }

  /** 记录插入 */
  insertItem(parent: CategoryItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as CategoryItemNode);
      this.dataChange.next(this.data);
    } else {
      parent.children = [{item: name} as CategoryItemNode];
      // this.ngZone.run(() => {
      //   //
      // });
      // this.changeDetectorRef.markForCheck();
      // this.changeDetectorRef.detectChanges();
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: CategoryItemNode, name: string, label: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [ChecklistDatabase]
})
export class CategoryComponent implements OnInit {
  @ViewChild('tree', {static: true}) tree;
  flatNodeMap = new Map<CategoryItemFlatNode, CategoryItemNode>();
  nestedNodeMap = new Map<CategoryItemNode, CategoryItemFlatNode>();
  selectedParent: CategoryItemFlatNode | null = null;
  newItemName = '';

  treeControl: FlatTreeControl<CategoryItemFlatNode>;

  treeFlattener: MatTreeFlattener<CategoryItemNode, CategoryItemFlatNode>;

  dataSource: MatTreeFlatDataSource<CategoryItemNode, CategoryItemFlatNode>;

  /** checklist */
  checklistSelection = new SelectionModel<CategoryItemFlatNode>(true /* multiple */);

  isShowInput = false;
  viewModel = {
    name: '',
    label: ''
  };

  constructor(private featureService: FeatureService,
              private database: ChecklistDatabase) {

    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
    this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<CategoryItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngOnInit() {
    this.loadData();
  }
  loadData(): any {
    this.featureService.findCategory();

    this.featureService.dataStore.subscribe((res => {
      if (res && res.length) {
        // this.dataSource.data = res.categoryNode.children;
        const data = this.database.buildFileTree(res, 0);
        this.database.dataChange.next(data);
      }
    }));
  }

  onSave() {
    this.featureService.addCategory({...this.viewModel, id: '1'});
    this.featureService.dataStore.subscribe(res => {
      console.log(res);
    });
  }

  // hasChild = (_: number, node: CategoryNode) => !!node.children && node.children.length > 0;

  getLevel = (node: CategoryItemFlatNode) => node.level;

  isExpandable = (node: CategoryItemFlatNode) => node.expandable;

  getChildren = (node: CategoryItemNode): CategoryItemNode[] => node.children;

  hasChild = (_: number, nodeData: CategoryItemFlatNode) => nodeData.expandable;

  hasNoContent = (_: number, nodeData: CategoryItemFlatNode) => nodeData.item === '';

  /* Get the parent node of a node */
  getParentNode(node: CategoryItemFlatNode): CategoryItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /**
   * 数据转换
   */
  transformer = (node: CategoryItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
        ? existingNode
        : new CategoryItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** 新增分类 */
  addNewItem(node: CategoryItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);

    console.log(this.tree);

    // tslint:disable-next-line:no-non-null-assertion
    this.database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** 保存分类 */
  saveNode(node: CategoryItemFlatNode, itemName: string, itemLabel: string) {
    const nestedNode = this.flatNodeMap.get(node);

    // 父节点
    const parentNode = this.getParentNode(node);
    // 父节点中的原数据
    const nestedParentNode = this.flatNodeMap.get(parentNode);

    this.featureService.addCategory({id: nestedParentNode.id, name: itemName, label: itemLabel});
    // tslint:disable-next-line:no-non-null-assertion
    this.database.updateItem(nestedNode!, itemName, itemLabel);
  }


}
