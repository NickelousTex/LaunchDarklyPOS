import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAvailableRoles, quickLogin } from "../../https/index";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const QuickLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedRole, setSelectedRole] = useState("");

    // Fetch available roles
    const { data: rolesData, isLoading: rolesLoading } = useQuery({
        queryKey: ['availableRoles'],
        queryFn: getAvailableRoles,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const handleRoleSelection = (role) => {
        setSelectedRole(role);
    };

    const handleQuickLogin = (e) => {
        e.preventDefault();
        if (!selectedRole) {
            enqueueSnackbar("Please select a role", { variant: "error" });
            return;
        }
        quickLoginMutation.mutate({ role: selectedRole });
    };

    const quickLoginMutation = useMutation({
        mutationFn: (data) => quickLogin(data),
        onSuccess: (res) => {
            const { data } = res;
            const { id, name, email, phone, role } = data.data;
            dispatch(setUser({ _id: id, name, email, phone, role }));
            enqueueSnackbar(`Welcome ${name}!`, { variant: "success" });
            navigate("/");
        },
        onError: (error) => {
            const { response } = error;
            enqueueSnackbar(response?.data?.message || "Login failed", { variant: "error" });
        }
    });

    if (rolesLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="text-white">Loading roles...</div>
            </div>
        );
    }

    const roles = rolesData?.data?.data || [];

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Quick Login</h2>
                <p className="text-[#ababab]">Select your role to continue</p>
            </div>

            <form onSubmit={handleQuickLogin} className="space-y-6">
                <div className="grid gap-4">
                    {roles.map((role, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                selectedRole === role.role
                                    ? 'border-yellow-400 bg-yellow-400/10'
                                    : 'border-[#1f1f1f] bg-[#1f1f1f] hover:border-gray-600'
                            }`}
                            onClick={() => handleRoleSelection(role.role)}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="text-2xl">{role.avatar}</div>
                                <div>
                                    <h3 className="text-white font-semibold">{role.name}</h3>
                                    <p className="text-[#ababab] text-sm">{role.role}</p>
                                </div>
                                {selectedRole === role.role && (
                                    <div className="ml-auto">
                                        <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                            <span className="text-gray-900 text-sm">✓</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={!selectedRole || quickLoginMutation.isPending}
                    className="w-full rounded-lg py-3 text-lg bg-yellow-400 text-gray-900 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-500 transition-colors"
                >
                    {quickLoginMutation.isPending ? "Signing in..." : "Sign In"}
                </button>
            </form>

            <div className="text-center">
                <p className="text-[#ababab] text-sm">
                    This is a demo system with predefined roles for quick access
                </p>
            </div>
        </div>
    );
};

export default QuickLogin;
