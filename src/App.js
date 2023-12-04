import {Switch,Route} from 'react-router-dom';
import 'antd/dist/antd.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React,{ useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './Components/Auth/Firebase';
import { loggedIn } from './Components/Store/Slices/UserSlice';
import {currentUser} from './Components/Functions/auth';
import {LoadingOutlined } from '@ant-design/icons';

const Home = lazy(()=>import('./Components/Home'));
const Login = lazy(()=>import('./Components/Auth/Login'));
const Register = lazy(()=>import('./Components/Auth/Register'));
const Header = lazy(()=>import('./Components/Header'));
const RegisterComplete = lazy(()=>import('./Components/Auth/RegisterComplete'));
const ForgotPassword = lazy(()=>import('./Components/Auth/ForgotPassword'));
const UserRoute = lazy(()=>import('./Components/Route/UserRoute'));
const History = lazy(()=>import('./Components/User/History'));
const UpdatePassword = lazy(()=>import('./Components/User/UpdatePassword'));
const AdminDashboard = lazy(()=>import('./Components/Admin/AdminDashboard'));
const AdminRoute = lazy(()=>import('./Components/Route/AdminRoute'));
const Category = lazy(()=>import('./Components/Admin/Category'));
const UpdateCategory = lazy(()=>import('./Components/Admin/UpdateCategory'));
const Sub = lazy(()=>import('./Components/Admin/Sub'));
const UpdateSubCategory = lazy(()=>import('./Components/Admin/UpdateSubCategory'));
const CreateProduct = lazy(()=>import('./Components/Admin/Product/CreateProduct'));
const Product = lazy(()=>import('./Components/Admin/Product/Product'));
const UpdateProduct = lazy(()=>import('./Components/Admin/Product/UpdateProduct'));
const ViewProduct = lazy(()=>import('./Components/Admin/Product/ViewProduct'));
const ViewCategoryProduct = lazy(()=>import('./Components/Admin/Product/Categories/ViewCategoryProduct'));
const ViewSubsProduct = lazy(()=>import('./Components/Admin/Product/SubCategories/ViewSubsProduct'));
const Shop = lazy(()=>import('./Components/Admin/Product/SubCategories/Shop'));
const Cart = lazy(()=>import('./Components/Cart/Cart'));
const CartDrawer = lazy(()=>import('./Components/Cart/CartDrawer'));
const CheckOut = lazy(()=>import('./Components/Cart/Checkout'));
const CreateCoupon = lazy(()=>import('./Components/Admin/CreateCoupon'));
const Payment = lazy(()=>import('./Components/Payment'));
const Wishlist = lazy(()=>import('./Components/User/Wishlist'));

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

    return () => {
      unsubscribe();
    }

  },[])

  return (
    <Suspense fallback={
      <div className='col text-center p-5'>
        __EC<LoadingOutlined/>MMERCE__
      </div>
    }>
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
      <UserRoute exact path='/user/wishlist' component={Wishlist}/>
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
      <UserRoute exact path='/checkout' component={CheckOut}/>
      <UserRoute exact path='/payment' component={Payment}/>
    </Switch>
    </Suspense>
  );
}

export default App;
