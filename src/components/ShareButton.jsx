"use client"

import { Share2, Twitter, Facebook, Linkedin, Mail, Link2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateShareUrls, copyToClipboard } from "@/lib/utils";
import { toast } from "sonner";

export function ShareButton({ article, variant = "outline", size = "icon" }) {
    const shareUrls = generateShareUrls(article);

    const handleShare = async (platform) => {
        if (platform === 'copy') {
            const success = await copyToClipboard(article.url);
            if (success) {
                toast.success("Link copied to clipboard!");
            } else {
                toast.error("Failed to copy link");
            }
        } else {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={variant}
                    size={size}
                    className="gap-2"
                >
                    <Share2 className="w-4 h-4" />
                    {size !== "icon" && <span>Share</span>}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-slate-200 dark:border-slate-800 rounded-xl shadow-xl">
                <DropdownMenuItem
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-3 py-2.5 px-4 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-900/30 rounded-lg group"
                >
                    <Twitter className="w-4 h-4 text-sky-500 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Twitter</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-3 py-2.5 px-4 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-900/30 rounded-lg group"
                >
                    <Facebook className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Facebook</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-3 py-2.5 px-4 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-900/30 rounded-lg group"
                >
                    <Linkedin className="w-4 h-4 text-blue-700 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">LinkedIn</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleShare('whatsapp')}
                    className="flex items-center gap-3 py-2.5 px-4 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-900/30 rounded-lg group"
                >
                    <MessageCircle className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">WhatsApp</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleShare('email')}
                    className="flex items-center gap-3 py-2.5 px-4 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-900/30 rounded-lg group"
                >
                    <Mail className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleShare('copy')}
                    className="flex items-center gap-3 py-2.5 px-4 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-900/30 rounded-lg group"
                >
                    <Link2 className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Copy Link</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
