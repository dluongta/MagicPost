import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Header from './component/Header';
import Homepage from './Homepage';
import Login from './Login';
import Search from './Search';
import Register from './Register';
import LatestPosts from './component/LatestPost';
import Post from './component/Post';
import PostManage from './PostManage';
import PostEdit from './PostEdit';
import { AuthProvider } from './contexts/AuthContext';
import ChatLayout from './component/ChatLayout';
import WithPrivateRoute from './utils/WithPrivateRoute';
import ProfileScreen from './ProfileScreen';
import UserEditScreen from './UserEditScreen';
import UserListScreen from './UserListScreen';
import ReceiptPrint from './ReceiptPrint';
import ForgotPassword from './layouts/ForgotPassword';
import ResetPassword from './component/ResetPassword';
import InvoicePrint from './component/InvoicePrint';
import VerifyPage from './VerifyPage';
import AccountVerified from './AccountVerified';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/posts/:id' element={<Post />} />
          <Route path='/search/:keyword' element={<LatestPosts />} />
          <Route path='/search' element={<Search />} />
          <Route path='/admin/postlist' element={<PostManage />} />
          <Route path='/admin/post/:id/edit' element={<PostEdit />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/admin/userlist' element={<UserListScreen />} />
          <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
          <Route path='/receipt' element={<ReceiptPrint />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
          <Route path="/account-verified" element={<AccountVerified />} />
          <Route path="/verify-page" element={<VerifyPage />} />
          <Route
            path="/chat"
            element={
              <WithPrivateRoute>
                <ChatLayout />
              </WithPrivateRoute>
            }
          />
          <Route path='/print/:id' element={<InvoicePrint />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
