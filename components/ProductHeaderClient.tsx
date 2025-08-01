"use client";

import Image from "next/image";
import { useLikedStore } from "@/stores/likedStore";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { ShareButtons } from "./ShareButtons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Product } from "@/utils/menuTypes";
import toast from "react-hot-toast";

export default function ProductHeaderClient({ product }: { product: Product }) {
  const { isLiked, toggleLike } = useLikedStore();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detect if it's a mobile device
    if (typeof window !== "undefined") {
      const isSmallScreen = window.innerWidth < 500;
      setIsMobile(isSmallScreen);
    }
  }, []);

  const liked = mounted ? isLiked(product.id) : false;

const handleShare = async () => {
  if (isMobile) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.desc || "",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
        toast.error(err);
      }
    } else {
      toast("المشاركة غير مدعومة على هذا المتصفح.");
    }
  } else {
    setOpen(true);
  }
};

  return (
    <div className="flex items-center justify-end gap-4 px-2">
      {/* Share button */}
      <button className="cursor-pointer" onClick={handleShare}>
        <Image
          src="/assets/icons/share.svg"
          alt="Share"
          width={32}
          height={32}
          className="rounded-full bg-[#F6F6FD] p-1"
        />
      </button>

      {/* Drawer (only opens if !isMobile) */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent
          className="bg-bg mx-auto h-[200px] max-w-[480px] min-w-[400px] !rounded-3xl !rounded-b-none"
          data-aos="fade-up"
        >
          <DrawerHeader>
            <DrawerTitle>Share This Item</DrawerTitle>
            <DrawerDescription />
          </DrawerHeader>
          <div className="px-4">
            <ShareButtons />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="mt-2 w-full rounded bg-gray-200 py-2 font-semibold">
                Close
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Like Button */}
      {mounted && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(product);
          }}
          className="cursor-pointer"
        >
          {liked ? (
            <AiFillHeart className="text-primary size-8" />
          ) : (
            <AiOutlineHeart className="size-8 text-gray-400 transition-colors hover:text-blue-400" />
          )}
        </button>
      )}
    </div>
  );
}
