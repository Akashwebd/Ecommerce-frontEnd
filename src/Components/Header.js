import React,{useState} from "react";
import { Link } from "react-router-dom";
// import { UseSelector } from "react-redux";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu,Badge } from 'antd';
import { auth } from "./Auth/Firebase";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {loggedOut} from './Store/Slices/UserSlice';
import ProductFilter from "./SearchFilter/ProductFilter";
import { setText } from "./Store/Slices/TextSlice";
const { SubMenu, Item } = Menu;


// function item(user){
//   // console.log(user.email.substring(0,user.email.indexOf('@')),user.email,'check123',user);
//   // const user = useSelector(state => state.user);
//   const items = [
//     {
//       label: <Link to='/'>Home</Link>,
//       key: 'home',
//       icon: <HomeOutlined />,
//     },
//     {
//       label: <Link to='/shop'>Shop</Link>,
//       key: 'shop',
//       icon: <ShopOutlined />,
//     },
//     user.email?
//     {
//       label: user.email.substring(0,user.email.indexOf('@')),
//       key: 'user',
//       className:'float-right',
//       icon: <SettingOutlined />,
//       children: [
//         {
//           type: 'group',
//           // label: 'Item 1',
//           children: [
//             {
//               label: <Link to={user.role==='admin'?'/admin/dashboard':'/user/history'}>Dashboard</Link>,
//               key: 'setting:2',
//             },
//             {
//               label: 'LogOut',
//               key: 'logout',
//               icon:<LogoutOutlined />
//               // onClick:
//             }
//           ],
//         }
//       ],
//     }:null,
//     // !user.email? (
//       user.email?null:(
//         {
//           label: <Link to='/register'>Register</Link>,
//           key: 'register',
//           icon: <UsergroupAddOutlined />,
//           className:'float-right'
//         //   disabled: true,
//         }),
//         user.email ? null:(
//       {
//         label: <Link to='/login'>Login</Link>,
//         key: 'login',
//         icon: <UserOutlined />,
//         className:'float-right'
//       //   disabled: true,
//       }
//       ),
//     // ):null,
//   ];
//   console.log(items,'item');
//   return items;
// }


function Header(){
    const [current, setCurrent] = useState('home');
    const {user,cart:{cart}} = useSelector(state => state);

    const history=useHistory();
    const dispatch = useDispatch();

    const onClick = (e) => {
      // console.log('click ', e);
      // if(e.key === 'logout'){
      //   auth.signOut();
      //   dispatch(loggedOut({}));
      //   history.push('/login');

      // }
      if(e.key !== 'shop'){
     dispatch(setText({text:''}));
      }
      setCurrent(e.key);
    };

    const logout = () => {
      auth.signOut();
      dispatch(loggedOut({}));
      history.push("/login");
    };
  

console.log('cartlength',user,cart);
    return (
        // <h1>hello</h1>
    < Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" style={{display:'block'}}>
       <Item key="home" icon={<AppstoreOutlined />}>
       <Link to="/">Home</Link>
      </Item>
      <Item key="shop" icon={<ShopOutlined/>}>
       <Link to="/shop">Shop</Link>
      </Item>
      <Item key="cart" icon={<ShoppingCartOutlined />}>
       <Link to="/cart">
       <Badge count={cart?.length} offset={[9,0]}>
        Cart
        </Badge>
        </Link>
      </Item>


  {!user.token && (
    <Item key="register" icon={<UserAddOutlined />} className="float-right">
      <Link to="/register">Register</Link>
    </Item>
  )}

  {!user.token && (
    <Item key="login" icon={<UserOutlined />} className="float-right">
      <Link to="/login">Login</Link>
    </Item>
  )}

  {user.token && (
    <SubMenu
      icon={<SettingOutlined />}
      title={user.email && user.email.split("@")[0]}
      className="float-right"
    >
      {user.token && user.role === "subscriber" && (
        <Item key='history'>
          <Link to="/user/history">Dashboard</Link>
        </Item>
      )}

      {user.token && user.role === "admin" && (
        <Item key='dashboard'>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Item>
      )}

      <Item key='logout' icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Item>
    </SubMenu>
  )}

  <span className="float-right p-1">
    <ProductFilter setCurrent={setCurrent}/>
  </span>
</Menu>
    );
}

export default Header;