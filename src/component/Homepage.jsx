import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header";
import Carousel from "./Carousel";
import MidSection from "./Midsection";
import HeroCategories from "./HeroCategories";
import ShopByActivity from "./ShopByActivity";
import FreshArrivals from "./FreshArrivals";
import ShopForDailySupport from "./ShopForDailySupport";
import BlogPromo from "./BlogPromo";
import AssuranceStrip from "./AssuranceStrip";
import Cart from "./Cart";
import { CartProvider } from "./cartContext";
import ProductPage from "../pages/ProductPage";
import Checkout from "./Checkout";
import { secureStorage } from "../component/secureStorage";
import TrackOrderPage from "../pages/TrackOrderPage";

// Auth Pages
import Login from "../component/Login";
import Signup from "../component/Singup";
import ForgetPassword from "../component/ForgetPassword";
import ResetPassword from "../component/ResetPassword"; // ✅ Added Reset Password Import

import Wishlist from "../component/Wishlist";
import SearchPage from "../component/SearchPage";

// Category Page
import CategoryPage from "../pages/CategoryPage"; // ✅ Added CategoryPage Import

// Activity Pages
import Aerobics from "../pages/Aerobics";
import Athletics from "../pages/Athletics";
import Badminton from "../pages/Badmintion";
import Basketball from "../pages/BasketBall";
import Cricket from "../pages/Cricket";
import Cycling from "../pages/Cycling";
import Football from "../pages/Football";
import Golf from "../pages/Golf";
import GYM from "../pages/GYM";
import Running from "../pages/Running";
import Tennis from "../pages/Tennis";
import Volleyball from "../pages/Volleyball";
import Walking from "../pages/Walking";
import Yoga from "../pages/Yoga";

// Hero Category Pages
import Abdominal_support from "../pages/Abdominal_support";
import Ankle from "../pages/Ankle";
import Backsupport from "../pages/Backsupport";
import Elbow from "../pages/Elbow";
import Knee from "../pages/Knee";
import Neck from "../pages/Neck";
import Shoulder from "../pages/Shoulder";
import Office from "../DailyRoutine/Office";
import Posture from "../DailyRoutine/Posture";
import Pregnancy from "../DailyRoutine/Pregnancy";
import Sleep from "../DailyRoutine/Sleep";
import Travel from "../DailyRoutine/Travel";
import Kids from "../DailyRoutine/Kids";
import MyOrdersPage from "../pages/MyOrdersPage";

// ✅ Protected Route Logic
const ProtectedRoute = ({ element }) => {
  const user = secureStorage.get("user");
  return user ? element : <Navigate to="/login" replace />;
};

function Homepage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      try {
        const storedUser = secureStorage.get("user");
        const token = localStorage.getItem("access");

        if (token && storedUser) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const isExpired = payload.exp * 1000 < Date.now();

          if (isExpired) {
            secureStorage.remove("user");
            localStorage.removeItem("access");
            setUser(null);
          } else {
            setUser(storedUser);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        secureStorage.remove("user");
        localStorage.removeItem("access");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  if (loading) return <p className="text-center mt-5">Checking session...</p>;

  return (
    <CartProvider>
      <Header user={user} setUser={setUser} />

      <Routes>
        {/* 🏠 Home Page */}
        <Route
          path="/"
          element={
            <>
              <Carousel />
              <MidSection />
              <HeroCategories />
              <ShopByActivity />
              <FreshArrivals />
              <ShopForDailySupport />
              <BlogPromo />
              <AssuranceStrip />
            </>
          }
        />

        {/* 🔐 Auth Routes */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login setUser={setUser} />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <Signup setUser={setUser} />}
        />
        <Route
          path="/forgot-password"
          element={user ? <Navigate to="/" replace /> : <ForgetPassword />}
        />
        <Route
          path="/reset-password"
          element={user ? <Navigate to="/" replace /> : <ResetPassword />} // ✅ Added
        />

        {/* 🛍 Products & Categories */}
        <Route path="/product/:name" element={<ProductPage />} />
        <Route path="/category/:categorySlug" element={<CategoryPage />} /> {/* ✅ Added */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
        <Route path="/track-order/:orderId" element={<TrackOrderPage />} />
        <Route path="/my-orders" element={<ProtectedRoute element={<MyOrdersPage />} />} />

        {/* Sports Activity */}
        <Route path="/activity/aerobatics" element={<Aerobics />} />
        <Route path="/activity/athletics" element={<Athletics />} />
        <Route path="/activity/badminton" element={<Badminton />} />
        <Route path="/activity/basketball" element={<Basketball />} />
        <Route path="/activity/cricket" element={<Cricket />} />
        <Route path="/activity/cycling" element={<Cycling />} />
        <Route path="/activity/football" element={<Football />} />
        <Route path="/activity/golf" element={<Golf />} />
        <Route path="/activity/gym" element={<GYM />} />
        <Route path="/activity/running" element={<Running />} />
        <Route path="/activity/tennis" element={<Tennis />} />
        <Route path="/activity/volleyball" element={<Volleyball />} />
        <Route path="/activity/walking" element={<Walking />} />
        <Route path="/activity/yoga" element={<Yoga />} />

        {/* Hero Categories */}
        <Route path="/abdominal" element={<Abdominal_support />} />
        <Route path="/ankle" element={<Ankle />} />
        <Route path="/back" element={<Backsupport />} />
        <Route path="/elbow" element={<Elbow />} />
        <Route path="/knee" element={<Knee />} />
        <Route path="/neck" element={<Neck />} />
        <Route path="/shoulder" element={<Shoulder />} />
        <Route path="/office" element={<Office />} />
        <Route path="/posture" element={<Posture />} />
        <Route path="/pregnancy" element={<Pregnancy />} />
        <Route path="/sleep" element={<Sleep />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/kids" element={<Kids />} />

        {/* ❤️ Wishlist & 🔍 Search */}
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<SearchPage />} />

        {/* ❌ 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CartProvider>
  );
}

export default Homepage;
