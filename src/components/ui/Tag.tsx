import type { ProductCategory } from "@/data/products";

interface TagProps {
  category: ProductCategory;
  className?: string;
}

const categoryStyles: Record<ProductCategory, { bg: string; text: string; border: string }> = {
  Presence:      { bg: "rgba(30,143,255,0.10)",  text: "#5AAEFF",  border: "rgba(30,143,255,0.22)"  },
  Messaging:     { bg: "rgba(0,212,200,0.10)",   text: "#00D4C8",  border: "rgba(0,212,200,0.22)"   },
  Communication: { bg: "rgba(0,212,200,0.08)",   text: "#33DDD3",  border: "rgba(0,212,200,0.20)"   },
  Pipeline:      { bg: "rgba(30,143,255,0.08)",  text: "#1E8FFF",  border: "rgba(30,143,255,0.20)"  },
  Booking:       { bg: "rgba(201,168,76,0.10)",  text: "#C9A84C",  border: "rgba(201,168,76,0.22)"  },
  Intelligence:  { bg: "rgba(90,174,255,0.10)",  text: "#5AAEFF",  border: "rgba(90,174,255,0.22)"  },
  Reputation:    { bg: "rgba(0,212,200,0.08)",   text: "#00D4C8",  border: "rgba(0,212,200,0.18)"   },
  "Follow-Up":   { bg: "rgba(30,143,255,0.08)",  text: "#5AAEFF",  border: "rgba(30,143,255,0.18)"  },
  Conversion:    { bg: "rgba(0,212,200,0.12)",   text: "#00D4C8",  border: "rgba(0,212,200,0.25)"   },
};

export function Tag({ category, className = "" }: TagProps) {
  const style = categoryStyles[category] ?? categoryStyles.Presence;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-wider uppercase ${className}`}
      style={{
        background: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`,
      }}
    >
      {category}
    </span>
  );
}
