import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import UserManagement from "./pages/admin/UserManagement";
import DashboardUser from "./pages/user/DashboardUser";
import NewReport from "./pages/user/NewReport";
import ComplaintList from "./pages/admin/ComplaintList";
import HistoryPage from "./pages/user/History";
import ViewReport from "./pages/user/ViewReport";
import ProfileUser from "./pages/user/ProfileUser";
import { AuthProvider } from "./middlewares/AuthContext";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import DetailComplaintPage from "./pages/admin/DetailComplaint";
import CreateReport from "./pages/admin/CreateReport";
import CategoryAdd from "./pages/admin/categories/CategoryAdd";
import CategoryList from "./pages/admin/categories/CategoryList";
import CategoryEdit from "./pages/admin/categories/CategoryEdit";
import Layout from "./components/Layout";
import ViewFeedback from "./pages/user/ViewFeedback";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="font-Poppins">
          <Toaster /> {/* Toast Untuk Notifikasi */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<DashboardAdmin />} />
              <Route
                path="/admin/user-management"
                element={<UserManagement />}
              />

              <Route path="/admin/complaints" element={<ComplaintList />} />
              <Route
                path="/admin/complaints/:complaintId"
                element={<DetailComplaintPage />}
              />
              <Route
                path="/admin/complaints/:complaintId/feedback"
                element={<CreateReport />}
              />
              <Route path="/admin/categories" element={<CategoryList />} />
              <Route path="/admin/categories/add" element={<CategoryAdd />} />
              <Route
                path="admin/categories/:id/edit"
                element={<CategoryEdit />}
              />

              {/* User Routes */}
              <Route path="/dashboard" element={<DashboardUser />} />
              <Route path="/dashboard/new-report" element={<NewReport />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route
                path="/feedback/view/:feedback_id"
                element={<ViewFeedback />}
              />
              <Route path="/dashboard/view/:id" element={<ViewReport />} />
              <Route path="/profile" element={<ProfileUser />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
