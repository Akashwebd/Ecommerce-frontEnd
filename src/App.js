import {Switch,Route} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Header from './Components/Header';
import 'antd/dist/antd.min.css';
import RegisterComplete from './Components/Auth/RegisterComplete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './Components/Auth/Firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loggedIn } from './Components/Store/Slices/UserSlice';
import ForgotPassword from './Components/Auth/ForgotPassword';
import {currentUser} from './Components/Functions/auth';
import UserRoute from './Components/Route/UserRoute';
import History from './Components/User/History';
import UpdatePassword from './Components/User/UpdatePassword';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminRoute from './Components/Route/AdminRoute';
import Category from './Components/Admin/Category';
import UpdateCategory from './Components/Admin/UpdateCategory';
import Sub from './Components/Admin/Sub';
import UpdateSubCategory from './Components/Admin/UpdateSubCategory';
import CreateProduct from './Components/Admin/Product/CreateProduct';
import Product from './Components/Admin/Product/Product';
import UpdateProduct from './Components/Admin/Product/UpdateProduct';
import ViewProduct from './Components/Admin/Product/ViewProduct';
import ViewCategoryProduct from './Components/Admin/Product/Categories/ViewCategoryProduct';
import ViewSubsProduct from './Components/Admin/Product/SubCategories/ViewSubsProduct';
import Shop from './Components/Admin/Product/SubCategories/Shop';
import Cart from './Components/Cart/Cart';
import CartDrawer from './Components/Cart/CartDrawer';
import CheckOut from './Components/Cart/Checkout';
import CreateCoupon from './Components/Admin/CreateCoupon';
import Payment from './Components/Payment';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{

    const unsubscribe  = auth.onAuthStateChanged(async(user)=>{
      console.log(user);
     if(user){
      console.log(user,'user');
      const idTokenResult = (await user.getIdTokenResult()).token;
      const res = (await currentUser(idTokenResult));
      // console.log(res.data,'updateduser');
      dispatch(loggedIn({
          id:res.data._id,
          email:res.data.email,
          name:res.data.name,
          role:res.data.role,
          token:idTokenResult
      }));
     }
    });
    console.log(unsubscribe,'check');
    console.log('re-rendered1');

    return () => {
      console.log('unmount');
      unsubscribe();
    }

  },[])

  return (
    <>
    <Header/>
    <CartDrawer/>
    <ToastContainer/>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/register/complete' component={RegisterComplete}/>
      <Route exact path='/forgot/password' component={ForgotPassword}/>
      <UserRoute exact path='/user/history' component={History}/>
      <UserRoute exact path='/user/password' component={UpdatePassword}/>
      <AdminRoute exact path='/admin/dashboard' component={AdminDashboard}/>
      <AdminRoute exact path = '/admin/category' component={Category}/>
      <AdminRoute exact path='/admin/category/:slugs' component={UpdateCategory} />
      <AdminRoute exact path='/admin/sub' component={Sub} />
      <AdminRoute exact path='/admin/sub/:slugs' component={UpdateSubCategory} />
      <AdminRoute exact path='/admin/product' component={CreateProduct} />
      <AdminRoute exact path='/admin/products' component={Product} />
      <AdminRoute exact path='/admin/coupon' component={CreateCoupon} />
      <AdminRoute exact path='/admin/product/:slugs' component={UpdateProduct} />
      <Route exact path='/product/:slugs' component={ViewProduct}/>
      <Route exact path='/category/:slugs' component={ViewCategoryProduct}/>
      <Route exact path='/subs/:slugs' component={ViewSubsProduct}/>
      <Route exact path='/shop' component={Shop}/>
      <Route exact path='/shop/:searchword' component={Shop}/>
      <Route exact path='/cart' component={Cart} />
      <Route exact path='/checkout' component={CheckOut}/>
      <UserRoute exact path='/payment' component={Payment}/>
    </Switch>
    </>
  );
}

export default App;
