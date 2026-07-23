"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { products, ProductCategory } from "@/data/products";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const ALL = "All";
const categories = [ALL, ...Array.from(new Set(products.map((p) => p.category)))];

export function ProductGrid() {
  const [active, setActive] = useState<string>(ALL);
  const filtered = active === ALL ? products : products.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              active === cat
                ? "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)] text-[color:var(--color-ink)] shadow-[0_0_16px_rgba(var(--accent-rgb),0.35)]"
                : "bg-[rgba(var(--hairline-rgb),0.04)] border border-[color:rgba(var(--accent-rgb),0.15)] text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] hover:border-[color:rgba(var(--accent-rgb),0.35)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filtered.map((product) => (
            <motion.div key={product.slug} variants={fadeInUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
