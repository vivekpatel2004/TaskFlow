import { useEffect, useState } from "react";

import {
    Navigate,
    useLocation,
    useNavigate,
} from "react-router-dom";

import HomeNavbar from "../components/home/HomeNavbar";
import HeroSection from "../components/home/HeroSection";
import ProductPreview from "../components/home/ProductPreview";
import FeaturesSection from "../components/home/FeaturesSection";
import WorkflowSection from "../components/home/WorkflowSection";
import WhyTaskFlowSection from "../components/home/WhyTaskFlowSection";
import UseCasesSection from "../components/home/UseCasesSection";
import SecuritySection from "../components/home/SecuritySection";
import AboutSection from "../components/home/AboutSection";
import RoadmapSection from "../components/home/RoadmapSection";
import FinalCTA from "../components/home/FinalCTA";
import HomeFooter from "../components/home/HomeFooter";

import { useAuth } from "../context/AuthContext";

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        user,
        loading: authLoading,
    } = useAuth();

    const [mobileMenuOpen, setMobileMenuOpen] =
        useState(false);

    const isAuthPage =
        location.pathname === "/login" ||
        location.pathname === "/register";

    const isRegister =
        location.pathname === "/register";

    const isAuthenticated =
        Boolean(user);

    // --------------------------------------------------
    // OPEN LOGIN / REGISTER
    // --------------------------------------------------

    const openAuth = (mode) => {
        setMobileMenuOpen(false);

        // User already logged in
        // Never show login/register again.
        if (isAuthenticated) {
            navigate("/dashboard");
            return;
        }

        if (mode === "register") {
            navigate("/register");
        } else {
            navigate("/login");
        }
    };

    // --------------------------------------------------
    // CLOSE AUTH
    // --------------------------------------------------

    const closeAuth = () => {
        navigate("/");
        setMobileMenuOpen(false);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // --------------------------------------------------
    // SCROLL TO SECTION
    // --------------------------------------------------

    const scrollToSection = (id) => {
        setMobileMenuOpen(false);

        if (isAuthPage) {
            navigate("/");

            setTimeout(() => {
                document
                    .getElementById(id)
                    ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
            }, 150);

            return;
        }

        document
            .getElementById(id)
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    };

    // --------------------------------------------------
    // AUTH PAGE SCROLL
    // --------------------------------------------------

    useEffect(() => {
        if (authLoading) {
            return;
        }

        if (!isAuthPage) {
            return;
        }

        // Only scroll when logged-out user is actually
        // allowed to see the auth form.
        if (isAuthenticated) {
            return;
        }

        const timer = setTimeout(() => {
            document
                .getElementById("auth")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
        }, 100);

        return () => clearTimeout(timer);
    }, [
        authLoading,
        isAuthenticated,
        isAuthPage,
    ]);

    // --------------------------------------------------
    // IMPORTANT:
    // WAIT FOR AUTH SESSION RESTORATION
    // --------------------------------------------------

    if (authLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#070b16]">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-500" />
            </div>
        );
    }

    // --------------------------------------------------
    // IMPORTANT:
    // LOGGED-IN USER CAN NEVER SEE LOGIN/REGISTER
    // --------------------------------------------------

    if (isAuthenticated && isAuthPage) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    // --------------------------------------------------
    // NORMAL HOME PAGE
    // --------------------------------------------------

    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-[#070b16] dark:text-white">

            <HomeNavbar
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={
                    setMobileMenuOpen
                }
                openAuth={openAuth}
                closeAuth={closeAuth}
                scrollToSection={
                    scrollToSection
                }
            />

            <main>
                <HeroSection
                    isAuthPage={isAuthPage}
                    isRegister={isRegister}
                    isAuthenticated={
                        isAuthenticated
                    }
                    authLoading={authLoading}
                    openAuth={openAuth}
                    closeAuth={closeAuth}
                    scrollToSection={
                        scrollToSection
                    }
                />

                {!isAuthPage && (
                    <>
                        <ProductPreview />

                        <FeaturesSection />

                        <WorkflowSection />

                        <WhyTaskFlowSection
                            openAuth={openAuth}
                            isAuthenticated={
                                isAuthenticated
                            }
                        />

                        <UseCasesSection />

                        <SecuritySection />

                        <AboutSection />

                        <RoadmapSection />

                        <FinalCTA
                            openAuth={openAuth}
                            isAuthenticated={
                                isAuthenticated
                            }
                        />
                    </>
                )}
            </main>

            <HomeFooter
                openAuth={openAuth}
                scrollToSection={
                    scrollToSection
                }
            />
        </div>
    );
};

export default Home;