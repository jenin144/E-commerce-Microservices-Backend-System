export class Order {
  id: number;
  userId: number;
  items: { productId: number; quantity: number }[];
  totalPrice: number;
  status: 'pending' | 'completed' | 'canceled';
}
