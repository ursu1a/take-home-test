"use client";
import { siteConfig as strings } from "@/config/site";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface ReadMoreProps {
  content: string;
  maxHeight: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ content, maxHeight }) => {
  const [height, setHeight] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const { clientHeight } = ref.current;
      setHeight(clientHeight);
    }
  }, []);

  useEffect(() => {
    if (height >= maxHeight) {
      setIsExpanded(false);
    }
  }, [height]);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <div className="relative text-default-700 text-small">
        <div
          ref={ref}
          className="overflow-hidden"
          style={{
            maxHeight: isExpanded ? "none" : maxHeight,
            transition: "max-height 0.3s ease",
          }}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        {!isExpanded && (
          <span className="absolute -right-4 bottom-0 px-8 h-6 bg-gradient-to-r from-transparent to-background pointer-events-none" />
        )}
      </div>
      {height >= maxHeight && (
        <Link
          color="primary"
          className="cursor-pointer mt-1 text-sm hover:underline focus:outline-none"
          onPress={toggleReadMore}
        >
          {isExpanded ? strings.global.read_less : strings.global.read_more}
        </Link>
      )}
    </>
  );
};

export default ReadMore;
