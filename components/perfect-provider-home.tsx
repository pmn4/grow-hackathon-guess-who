"use client";

import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { Input } from "@/components/ui/input";
import { SelectProvider } from "@/db/schema";
import { ProviderCard } from "./ProviderCard";
import { filterProviders } from "@/actions/provider-actions";
import { motion, AnimatePresence } from "framer-motion";
import { useGridScale } from "@/hooks/use-grid-scale";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { X } from "lucide-react"; // Import the X icon from lucide-react

// Add this interface at the top of the file
interface CriteriaHistoryItem {
  criteria: string;
  eliminatedProviderIds: string[];
}

export default function PerfectProviderHome({
  providers,
}: {
  providers: SelectProvider[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [criteria, setCriteria] = useState("");
  const [activeProviderIds, setActiveProviderIds] = useState<string[]>(
    providers.map((p) => p.id)
  );
  const [perfectProvider, setPerfectProvider] = useState<SelectProvider | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expandedProvider, setExpandedProvider] =
    useState<SelectProvider | null>(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [criteriaHistory, setCriteriaHistory] = useState<CriteriaHistoryItem[]>(
    []
  );

  const gridStyle = useGridScale(containerRef, providers.length);

  const updateActiveProviders = useCallback(
    (group: string[], newIds: string[]) => {
      setActiveProviderIds((prev) => {
        const updated = Array.from(
          new Set(prev.filter((id) => !group.includes(id)).concat(newIds))
        );
        if (updated.length === 1) {
          const provider = providers.find((p) => p.id === updated[0]);
          setPerfectProvider(provider || null);
        }
        return updated;
      });
    },
    [providers]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    setIsCancelled(false);
    const groupSize = 5;
    const groups: string[][] = [];

    for (let i = 0; i < activeProviderIds.length; i += groupSize) {
      groups.push(activeProviderIds.slice(i, i + groupSize));
    }
    // Ensure the last group has at least groupSize items
    if (groups.length > 1 && groups[groups.length - 1].length < groupSize) {
      const lastGroup = groups.pop()!;
      const secondLastGroup = groups.pop()!;
      groups.push([...secondLastGroup, ...lastGroup]);
    }

    let resolvedCount = 0;
    const totalGroups = groups.length;
    const eliminatedProviderIds: string[] = [];

    const promises = groups.map((group) =>
      filterProviders(criteria, group).then((filteredIds) => {
        if (!isCancelled) {
          const newlyEliminatedIds = group.filter(
            (id) => !filteredIds.includes(id)
          );
          eliminatedProviderIds.push(...newlyEliminatedIds);
          updateActiveProviders(group, filteredIds);
          resolvedCount++;
          setProgress((resolvedCount / totalGroups) * 100);
        }
      })
    );

    try {
      await Promise.all(promises);
      // Add the criteria to history after all promises have resolved
      setCriteriaHistory((prev) => [
        { criteria, eliminatedProviderIds },
        ...prev,
      ]);
      setCriteria("");
    } catch (error) {
      console.error("Error filtering providers:", error);
    }

    if (!isCancelled) {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleUndoCriteria = (index: number) => {
    const itemToUndo = criteriaHistory[index];
    setActiveProviderIds((prev) => [
      ...prev,
      ...itemToUndo.eliminatedProviderIds,
    ]);
    setCriteriaHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setIsCancelled(true);
    setIsLoading(false);
    setProgress(0);
  };

  const handlePlayAgain = () => {
    setPerfectProvider(null);
    setActiveProviderIds(providers.map((p) => p.id));
    setCriteriaHistory([]);
  };

  const activeProviders = providers.filter((p) =>
    activeProviderIds.includes(p.id)
  );
  const inactiveProviders = providers.filter(
    (p) => !activeProviderIds.includes(p.id)
  );

  const sortedProviders = useMemo(
    () => [
      ...inactiveProviders.slice(0, Math.floor(inactiveProviders.length / 2)),
      ...activeProviders,
      ...inactiveProviders.slice(Math.floor(inactiveProviders.length / 2)),
    ],
    [activeProviders, inactiveProviders]
  );

  const handleProviderClick = (provider: SelectProvider) => {
    setExpandedProvider(provider);
  };

  const handleCloseExpanded = () => {
    setExpandedProvider(null);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!expandedProvider) return;

      if (e.key === "Escape") {
        setExpandedProvider(null);
      } else if (e.key === "ArrowLeft") {
        const currentIndex = sortedProviders.findIndex(
          (p) => p.id === expandedProvider.id
        );
        if (currentIndex > 0) {
          setExpandedProvider(sortedProviders[currentIndex - 1]);
        }
      } else if (e.key === "ArrowRight") {
        const currentIndex = sortedProviders.findIndex(
          (p) => p.id === expandedProvider.id
        );
        if (currentIndex < sortedProviders.length - 1) {
          setExpandedProvider(sortedProviders[currentIndex + 1]);
        }
      }
    },
    [expandedProvider, sortedProviders]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const activeCount = activeProviderIds.length;
  const totalProviders = providers.length;
  const inactiveScale =
    1 - (0.1 * (totalProviders - activeCount)) / totalProviders;
  const activeScale =
    1 + (0.1 * (totalProviders - activeCount)) / totalProviders;

  const { width, height } = useWindowSize();

  const ellipsisVariants = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const dotVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0],
      transition: {
        repeat: Infinity,
        duration: 1,
      },
    },
  };

  return (
    <div className="flex flex-col h-screen">
      {perfectProvider && (
        <>
          <Confetti width={width} height={height} style={{ zIndex: 20 }} />
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10">
            <motion.div
              className="p-4 rounded-lg shadow-lg w-full h-full flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Congratulations, you found your Perfect Provider!
              </h2>
              <ProviderCard
                provider={perfectProvider}
                isActive={true}
                showDetails={true}
              />
              <div className="mt-4 flex space-x-4">
                <a
                  href="https://www.growtherapy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Book an Appointment Now
                </a>
                <button
                  onClick={handlePlayAgain}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
                >
                  Play Again
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
      {expandedProvider && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10">
          <motion.div
            className="p-4 rounded-lg shadow-lg w-full max-w-md bg-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
          >
            <button
              onClick={handleCloseExpanded}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            <ProviderCard
              provider={expandedProvider}
              isActive={true}
              showDetails={false}
            />
          </motion.div>
        </div>
      )}
      <div className="flex-none p-4 sm:p-6 relative">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Perfect Provider
        </h1>
        <p className="mb-4">Find the right provider for you!</p>
        <form onSubmit={handleSubmit} className="relative mb-4">
          <Input
            placeholder="My Perfect Provider..."
            className="w-full max-w-md"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            disabled={isLoading}
          />
        </form>
        {/* Add criteria history */}
        <div className="flex flex-col gap-2 mb-4 absolute top-4 right-4">
          {criteriaHistory.map((item, index) => (
            <div
              key={index}
              className="flex items-center rounded-full px-3 py-1"
            >
              <button
                onClick={() => handleUndoCriteria(index)}
                className="mr-2 hover:text-gray-700"
              >
                <X size={14} />
              </button>
              <span className="text-sm">{item.criteria}</span>
            </div>
          ))}
        </div>
        {isLoading && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Subtle background animation */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundImage: [
                  "radial-gradient(circle at 20% 20%, rgba(62, 62, 62, 0.4) 0%, rgba(0, 0, 0, 0) 50%)",
                  "radial-gradient(circle at 80% 80%, rgba(62, 62, 62, 0.4) 0%, rgba(0, 0, 0, 0) 50%)",
                  "radial-gradient(circle at 20% 80%, rgba(62, 62, 62, 0.4) 0%, rgba(0, 0, 0, 0) 50%)",
                  "radial-gradient(circle at 80% 20%, rgba(62, 62, 62, 0.4) 0%, rgba(0, 0, 0, 0) 50%)",
                  "radial-gradient(circle at 20% 20%, rgba(62, 62, 62, 0.4) 0%, rgba(0, 0, 0, 0) 50%)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            />
            <div className="text-center z-10">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <motion.circle
                    className="text-blue-500"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="46"
                    cx="50"
                    cy="50"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: Math.max(1, progress) / 100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </svg>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-lg font-bold text-blue-500"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {Math.round(progress)}%
                </motion.div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <motion.p
                  className="text-lg font-semibold text-gray-300"
                  variants={ellipsisVariants}
                  animate="animate"
                >
                  Honing in on your Perfect Provider
                  <motion.span variants={dotVariants}>.</motion.span>
                  <motion.span variants={dotVariants}>.</motion.span>
                  <motion.span variants={dotVariants}>.</motion.span>
                </motion.p>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-200 transition-colors duration-200 text-sm focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <div className="flex-grow overflow-auto relative">
        <motion.div
          ref={containerRef}
          className="h-full w-full"
          style={gridStyle}
          layout
        >
          <AnimatePresence>
            {sortedProviders.map((provider) => (
              <motion.div
                key={provider.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  filter: activeProviderIds.includes(provider.id)
                    ? "grayscale(0%)"
                    : "grayscale(100%)",
                  scale: activeProviderIds.includes(provider.id)
                    ? activeScale
                    : inactiveScale,
                }}
                transition={{ type: "spring", damping: 15, stiffness: 100 }}
                onClick={() => handleProviderClick(provider)}
              >
                <ProviderCard provider={provider} isActive={true} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
