export interface IIngredients {
  id: string;
  name: string | null;
  description: string;
  pricePerUnit: number | null;
  unit: string;
  category: string;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
