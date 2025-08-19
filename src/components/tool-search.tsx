
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { tools, type Tool } from "@/lib/tools";
import Link from "next/link";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { AnimatePresence, motion } from "framer-motion";

export default function ToolSearch() {
  const [query, setQuery] = useState("");
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const lowerCaseQuery = query.toLowerCase();
      const results = tools.filter(
        (tool) =>
          !tool.comingSoon &&
          (tool.title.toLowerCase().includes(lowerCaseQuery) ||
            tool.description.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredTools(results);
      setIsOpen(true);
    } else {
      setFilteredTools([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = useCallback(() => {
    setQuery("");
    setFilteredTools([]);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-lg" ref={searchContainerRef}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search for a tool... (e.g. hashtag)"
          value={query}
          onValueChange={setQuery}
          onFocus={() => query.length > 0 && setIsOpen(true)}
        />
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-full z-10"
            >
              <CommandList className="rounded-lg border bg-background shadow-md">
                {filteredTools.length > 0 ? (
                  <CommandGroup heading="Tools">
                    {filteredTools.map((tool) => (
                      <Link href={tool.href} key={tool.href} passHref>
                        <CommandItem
                          onSelect={handleSelect}
                          className="cursor-pointer"
                        >
                          <tool.icon className="mr-2 h-4 w-4" />
                          <span>{tool.title}</span>
                        </CommandItem>
                      </Link>
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
              </CommandList>
            </motion.div>
          )}
        </AnimatePresence>
      </Command>
    </div>
  );
}
