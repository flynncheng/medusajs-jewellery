export type CategoryChild = {
  id: string;
  name: string;
  description: string;
  handle: string;
  mpath?: string;
  is_active: boolean;
  is_internal: boolean;
  rank: number;
  parent_category_id: string | null;
  created_at: string;
  updated_at: string;
  metadata: any;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  handle: string;
  rank: number;
  parent_category_id: string | null;
  created_at: string;
  updated_at: string;
  metadata: any;
  parent_category: any | null;
  category_children: CategoryChild[];
};

export type CategoryData = {
  categories: Category[];
  category: Category[];
};
