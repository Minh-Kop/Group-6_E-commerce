import React, { useEffect, useRef, useState } from 'react'
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

function Cart() {
  const iref = useRef(null);
  const [cartBooks, setCart] = useState(cartProduct); //array of book product (can be changed)
  const [bookQuantityChange, setQuantityChange] = useState(false); //check if user press change quantity button
  const [selectedBook, setSelected] = useState(-1); //book id in cart that need to change the quantity
  const [bookQuantity, setQuantity] = useState(-1); //quantity number

  const handleQuantityChange = ()=>{ //handle imput for quantity number and call changing process
    var val = iref.current.value;
    if(val <= 0){
      resetSelected();
      return;
    }

    setQuantity(val);
    setQuantityChange(false);
  }

  const resetSelected = ()=>{
    setQuantityChange(false);
    setSelected(-1);
  }

  const setBookQuantity = ()=> { //handle changing process
    const newState = cartBooks.map((cartBook)=>{
      if(cartBook.id === selectedBook){
        return{
          ...cartBook, quantity: parseInt(bookQuantity),
        }
      }
      else{
        return cartBook;
      }
    })
    setCart(newState);
  }

  const deleteBook = (id) => {
    setCart(cartBooks.filter(book=>book.id !== id));
  }

  useEffect(setBookQuantity, [bookQuantity]);

  const handleSelectedBook = (index)=>{ //open change popup if change button press
    setSelected(index);
    setQuantityChange(true);
  }

  return (
    <div className='cart-container'>
        <h1>GIỎ HÀNG</h1>
        <div className='cart-list'>
          {cartBooks.map((p)=>(
            <div className='cart-detail'>
              <a href='/'><img src={p.img} alt='book'></img></a>
              <div className='cart-item-description'>
                <a href='/'>{p.book}</a>
                <p>Giá: {p.price + ' vnd'}</p>
                <p>Số lượng: {p.quantity}</p>
              </div>

              {bookQuantityChange && selectedBook === p.id && (
                <div className='quantity-change-popup'>
                  <div className='quantity-change-inner'>
                    <p>Nhập số lượng sách "{p.book}" bạn muốn mua:</p>
                    <form className='quantity-change-form'>
                      <input ref={iref} id='input_id' type='number' name='qinput'></input>
                      <button type='button' onClick={handleQuantityChange}>Xác nhận</button>
                      <button className='close-quantity-change-popup' type='button' onClick={resetSelected}>X</button>
                    </form>
                  </div>
                </div>
              )}

              <div className='cart-item-quantity'>
                <button type='button' onClick={()=>handleSelectedBook(p.id)}>Số lượng</button>
                <button className='delete-button' type='button' onClick={()=>deleteBook(p.id)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
        <button className='checkout-button' type='button'>Thanh toán</button>
    </div>
  )
}

export default Cart