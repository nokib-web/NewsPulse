"use client"

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Folder, Plus, Trash2, FolderOpen, Tag } from "lucide-react";
import { toast } from "sonner";

export function CollectionsManager({ isOpen, onClose, article, onSaveToCollection }) {
    const [collections, setCollections] = useState([]);
    const [newCollectionName, setNewCollectionName] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        // Load collections from localStorage
        const saved = localStorage.getItem("newsCollections");
        if (saved) {
            setCollections(JSON.parse(saved));
        } else {
            // Create default collections
            const defaultCollections = [
                { id: "tech", name: "Technology", count: 0, color: "blue" },
                { id: "business", name: "Business", count: 0, color: "green" },
                { id: "politics", name: "Politics", count: 0, color: "red" },
            ];
            setCollections(defaultCollections);
            localStorage.setItem("newsCollections", JSON.stringify(defaultCollections));
        }
    }, []);

    const createCollection = () => {
        if (!newCollectionName.trim()) {
            toast.error("Please enter a collection name");
            return;
        }

        const colors = ["blue", "green", "red", "purple", "orange", "pink"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newCollection = {
            id: Date.now().toString(),
            name: newCollectionName.trim(),
            count: 0,
            color: randomColor
        };

        const updated = [...collections, newCollection];
        setCollections(updated);
        localStorage.setItem("newsCollections", JSON.stringify(updated));

        setNewCollectionName("");
        setIsCreating(false);
        toast.success(`Collection "${newCollection.name}" created!`);
    };

    const deleteCollection = (collectionId) => {
        const updated = collections.filter(c => c.id !== collectionId);
        setCollections(updated);
        localStorage.setItem("newsCollections", JSON.stringify(updated));

        // Also remove articles from this collection
        const articlesKey = `collection_${collectionId}`;
        localStorage.removeItem(articlesKey);

        toast.success("Collection deleted");
    };

    const saveToCollection = (collectionId) => {
        const articlesKey = `collection_${collectionId}`;
        const existing = JSON.parse(localStorage.getItem(articlesKey) || "[]");

        // Check if article already exists
        if (existing.some(a => a.url === article.url)) {
            toast.info("Article already in this collection");
            return;
        }

        existing.push(article);
        localStorage.setItem(articlesKey, JSON.stringify(existing));

        // Update collection count
        const updated = collections.map(c =>
            c.id === collectionId ? { ...c, count: existing.length } : c
        );
        setCollections(updated);
        localStorage.setItem("newsCollections", JSON.stringify(updated));

        if (onSaveToCollection) {
            onSaveToCollection(collectionId);
        }

        toast.success("Article saved to collection!");
        onClose();
    };

    const getColorClasses = (color) => {
        const colors = {
            blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
            green: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
            red: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
            purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800",
            orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800",
            pink: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-800",
        };
        return colors[color] || colors.blue;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <FolderOpen className="w-6 h-6 text-blue-600" />
                        Save to Collection
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    {/* Collections Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                        {collections.map((collection) => (
                            <div
                                key={collection.id}
                                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 hover:shadow-lg group ${getColorClasses(collection.color)}`}
                                onClick={() => saveToCollection(collection.id)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <Folder className="w-5 h-5" />
                                        <div>
                                            <h3 className="font-bold text-base">{collection.name}</h3>
                                            <p className="text-xs opacity-75 mt-0.5">{collection.count} articles</p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteCollection(collection.id);
                                        }}
                                        variant="ghost"
                                        size="icon"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Create New Collection */}
                    {isCreating ? (
                        <div className="flex gap-2">
                            <Input
                                placeholder="Collection name..."
                                value={newCollectionName}
                                onChange={(e) => setNewCollectionName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && createCollection()}
                                className="flex-1"
                                autoFocus
                            />
                            <Button onClick={createCollection} className="bg-blue-600 hover:bg-blue-700">
                                Create
                            </Button>
                            <Button onClick={() => setIsCreating(false)} variant="outline">
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={() => setIsCreating(true)}
                            variant="outline"
                            className="w-full border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create New Collection
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
