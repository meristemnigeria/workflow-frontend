import { createContext, useContext } from "react";
import { apiPost, apiGet, apiPostWithoutBearer } from "./axios";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const dataContext = createContext<undefined | any>(undefined);

const DataProvider = ({ children }: any) => {
  const login = async (user: any) => {
    try {
      const response = await apiPost("/users/login", user);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "An error occurred";
      console.error("Error logging in:", errorMessage);
      toast.error(errorMessage);
    }
  };

  const changePassword = async (user: any) => {
    try {
      const changePasswordData = {
        currentPassword: user.currentPassword,
        newPassword: user.newPassword,
        confirmPassword: user.confirmPassword,
      };

      await apiPostWithoutBearer(
        `/password/change/${user.id}`,
        changePasswordData
      ).then((response) => {
        console.log(response.data);
        localStorage.setItem("success", response.data);
        swal("ALERT", response.data.message, "success");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      console.error("Error logging in:", errorMessage);
      toast.error(errorMessage);
    }
  };

  const forgotPassword = async (user: any) => {
    try {
      const forgotPasswordData = {
        email: user.email,
      };
      await apiPost(`/password/forgot`, forgotPasswordData).then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);

        swal(
          "OTP sent successfully. Check your mail for instructions to reset your password"
        );

        setTimeout(() => {
          window.location.href = "/verify-otp";
        }, 2000);
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.Error || "An error occurred";
      console.error("Error getting email:", errorMessage);
      toast.error(errorMessage);
    }
  };

  const resetPassword = async (user: any) => {
    try {
      const resetPasswordData = {
        newPassword: user.newPassword,
        confirmPassword: user.confirmPassword,
      };
      await apiPost(`/password/reset`, resetPasswordData).then((response) => {
        console.log(response);
        localStorage.setItem("success", response.data);
        swal("Password reset sucessfully");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.Error || "An error occurred";
      console.error("Error resetting password:", errorMessage);
      toast.error(errorMessage);
    }
  };

  const createAdmin = async (admin: any) => {
    try {
      const response = await apiPost("/users/create-admin", admin);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "An error occurred";
      console.error("Error creating admin:", errorMessage);
      toast.error(errorMessage);
    }
  };

  const createUser = async (user: any) => {
    try {
      const response = await apiPost("/users/create-user", user);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "An error occurred";
      console.error("Error creating user:", errorMessage);
      toast.error(errorMessage);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await apiGet("/users/fetch-all");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const fetchSingleUser = async (userId: string) => {
    try {
      const response = await apiGet(`/fetchSingleUser/${userId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const createDepartment = async (department: any) => {
    try {
      const response = await apiPost("/department/create-dept", department);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.Error || "An error occurred";
      console.error("Error creating:", errorMessage);
      toast.error(errorMessage);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await apiGet("/department/all-departments");
      return response.data;
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw error;
    }
  };

  const toggleActive = async (userId: number) => {
    try {
      const response = await apiPost(`/users/activate/${userId}`, userId);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.Error || "An error occurred";
      console.error("Error toggling user:", errorMessage);
      toast.error(errorMessage);
    }
  };

  const exportData = async (fromDate: string, toDate: string) => {
    try {
      const response = await apiGet("/requests/export-requests", {
        params: {
          fromDate: fromDate,
          toDate: toDate,
        },
        responseType: "blob",
      });
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.Error || "An error occurred";
      console.error("Error exporting data:", errorMessage);
      toast.error(errorMessage);
    }
  };

  const searchRequests = async (searchQuery: string) => {
    try {
      const response = await apiGet("/requests/search", {
        params: {
          name: searchQuery,
        },
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.Error || "An error occurred";
      console.error("Error searching request:", errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <dataContext.Provider
      value={{
        forgotPassword,
        resetPassword,
        changePassword,
        login,
        fetchSingleUser,
        createAdmin,
        createUser,
        fetchUsers,
        createDepartment,
        fetchDepartments,
        toggleActive,
        exportData,
        searchRequests,
      }}
    >
      {children}
      <ToastContainer />
    </dataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(dataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export default DataProvider;
