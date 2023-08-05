import book from "../assets/SGK.jpg";
import '../scss/cart.scss'

const cartProduct = [
  {
    id: 1,
    img: book,
    book: "Sách giáo khoa",
    price: "30.000",
    vote: "5.0",
    quantity: 1,
  },
  {
    id: 2,
    img: book,
    book: "Sách giáo khoa toán",
    price: "30.000",
    vote: "5.0",
    quantity: 1,
  },
  {
    id: 3,
    img: book,
    book: "Sách",
    price: "30.000",
    vote: "5.0",
    quantity: 3,
  },
  {
    id: 4,
    img: book,
    book: "Sách giáo khoa toán",
    price: "30.000",
    vote: "5.0",
    quantity: 4,
  },
];

function Payment() {
  const sum = ()=> {
    var sum = 0;
    for (var i = 0; i < cartProduct.length; i++ ){
      sum += cartProduct[i].price * cartProduct[i].quantity;
    }
    return sum;
  }

  return (
    <div className='payment-container'>
        <h1>THANH TOÁN</h1>
        <div className='payment-list'>
          {cartProduct.map((p)=>(
            <div className='payment-detail'>
              <a href='/'><img src={p.img} alt='book'></img></a>
              <div className='payment-item-description'>
                <a href='/'>{p.book}</a>
                <p>Giá: {p.price + " vnd"}</p>
                <p>Số lượng: {p.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <h2>Thành tiền: {sum() + ".000 vnd"}</h2>
        <div className='payment-buttons'>
          <button className='accept-button' type='button'>Xác nhận</button>
          <button className='deny-button' type='button'>Hủy bỏ</button>
        </div>
    </div>
  )
}

export default Payment