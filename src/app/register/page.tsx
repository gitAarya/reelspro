"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        // Validation
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }
        if (password.length < 6) {
            return setError("Password must be at least 6 characters");
        }
        if (!email.includes("@")) {
            return setError("Please enter a valid email");
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to register user");
            }

            router.push("/login");
        } catch (error) {
            console.error("Registration error:", error);
            setError(error instanceof Error ? error.message : "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
            
            {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1 font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block mb-1 font-medium">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password (min 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                        minLength={6}
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                        minLength={6}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                        isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>

            <div className="mt-4 text-center">
                <p>
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;