
export class Cart {
  cartId: number;
  cartName: string;
  totalPrice: number;
  couponCode: string;


  constructor(
    cartId: number,
    cartName: string,
    totalPrice: number,
    couponCode: string,

  ) {
    this.cartId = cartId;
    this.cartName = cartName;
    this.totalPrice = totalPrice;
    this.couponCode = couponCode;

  }


}
