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
import HistoryOrder from "./screens/HistoryOrder";

import UserOrder from "./screens/UserOrder";

import UserInfo from "./screens/UserInfo";
import UserPointInfo from "./screens/UserPointInfo";
import UserVoucher from "./screens/UserVoucher";
import ChangePassword from "./screens/ChangePassword";

import ProductDetail from "./screens/ProductDetail";
import ProductsByCategories from "./screens/ProductsByCategories";

// Admin
import AdminCustomerManagement from "./screens/AdminCustomerManagement";
import AdminOrderManagement from "./screens/AdminOrderManagement";
import AdminPointManagement from "./screens/AdminPointManagement";
import AdminProductManagement from "./screens/AdminProductManagement";
import AdminStatistic from "./screens/AdminStatistic";
import AdminVoucherManagement from "./screens/AdminVoucherManagement";

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
        <Route path="/order" element={<UserOrder />} />
        <Route path="/history" element={<HistoryOrder />} />
        <Route path="/user" element={<UserInfo />} />
        <Route path="/point" element={<UserPointInfo />} />
        <Route path="/voucher" element={<UserVoucher />} />
        <Route path="/change_password" element={<ChangePassword />} />

        <Route path="/cart/payment" element={<Payment />} />
        <Route path="/category">
          <Route path=":categoryId" element={<ProductsByCategories />} />
        </Route>

        <Route
          path="/admin-customer-management"
          element={<AdminCustomerManagement />}
        />

        <Route
          path="/admin-order-management"
          element={<AdminOrderManagement />}
        />

        <Route
          management
          path="/admin-point-management"
          element={<AdminPointManagement />}
        />

        <Route
          path="/admin-product-management"
          element={<AdminProductManagement />}
        />

        <Route path="/admin-statistic " element={<AdminStatistic />} />

        <Route
          path="/admin-voucher-management "
          element={<AdminVoucherManagement />}
        />

        <Route path="/home_page">
          <Route index element={<HomePage />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
