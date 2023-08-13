import { Route, Routes } from "react-router-dom";

import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import TermOfUse from "./screens/TermOfUse";
import CustomerSecurity from "./screens/CustomerSecurity";
import RefundPolicy from "./screens/RefundPolicy";
import PaymentSecurity from "./screens/PaymentSecurity";
import HomePage from "./screens/HomePage";
import Cart from "./screens/Cart";
import Payment from "./screens/Payment";
import Order from "./screens/Order";
import HistoryOrder from "./screens/HistoryOrder";

import ProductDetail from "./screens/ProductDetail";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/term_of_use" element={<TermOfUse />} />
        <Route path="/customer_security" element={<CustomerSecurity />} />
        <Route path="/refund_policy" element={<RefundPolicy />} />
        <Route path="/payment_security" element={<PaymentSecurity />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/history" element={<HistoryOrder />} />
        <Route path="/cart/payment" element={<Payment />} />

        <Route path="/home_page">
          <Route index element={<HomePage />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
