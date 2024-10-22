import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

import real_estate from "../assets/real_estate.jpg";

const LandingPage: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const navigate = useNavigate();

  const handleAction = (actionType: string) => {
    setAction(actionType);
    setShowModal(true);
  };

  const handleUserTypeSelection = (userType: string) => {
    setShowModal(false);
    navigate(`/${userType}-${action}`);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${real_estate})`,
        backgroundSize: "cover", // optional
        backgroundPosition: "center", // optional
      }}
      className="min-h-screen flex flex-col tracking-wider bg-gradient-to-b from-background to-background/80"
    >
      <header className="bg-transparent backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-primary"
          >
            HOUSING HUB
          </motion.div>
          <nav>
            <ul className="flex space-x-4">
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button variant="ghost" onClick={() => handleAction("login")}>
                  Login
                </Button>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button onClick={() => handleAction("signup")}>Sign Up</Button>
              </motion.li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <div
          className="h-[calc(100vh-4rem)] bg-cover bg-center flex items-center relative overflow-hidden"
          style={{
            backgroundImage: "url('../assets/Real_estate.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Discover Your Perfect Home Today
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl md:text-2xl tracking-wider text-white mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              At Create Real Estate Management, we connect buyers and sellers to
              make your dream home a reality. Explore our listings and find the
              ideal property that fits your lifestyle.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button
                size="lg"
                onClick={() => handleAction("signup")}
                className="text-lg px-8 py-6 bg-primary tracking-wider hover:bg-primary/90 text-primary-foreground transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Select User Type
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4 mt-6">
            {["buyer", "seller", "admin"].map((userType) => (
              <Button
                key={userType}
                onClick={() => handleUserTypeSelection(userType)}
                className="w-full text-lg py-6 capitalize transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {userType}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingPage;
