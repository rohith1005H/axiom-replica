'use client';

import { Search, Star, Bell, User, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { useState } from 'react';
import { DepositModal } from '@/components/molecules/DepositModal';
import { FavoritesModal } from '@/components/molecules/FavoritesModal';
import { ProfileModal } from '@/components/molecules/ProfileModal';
import { setSearchQuery } from '@/lib/redux/slices/tableSlice';

export const Navigation = () => {
    const favoriteCount = useAppSelector((state) => state.favorites.favoriteIds.length);
    const balance = useAppSelector((state) => state.wallet.balance);
    const dispatch = useAppDispatch();
    const [depositOpen, setDepositOpen] = useState(false);
    const [favoritesOpen, setFavoritesOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchValue.trim()) {
            dispatch(setSearchQuery(searchValue));
        }
    };

    return (
        <>
            <nav className="bg-black border-b border-axiom-border px-4 py-3">
                <div className="flex items-center justify-between max-w-[1600px] mx-auto">
                    {/* Left: Logo & Nav */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="text-white font-bold text-lg">▲ AXIOM</div>
                            <span className="text-xs text-axiom-text-muted">Pro</span>
                        </div>

                        <div className="hidden md:flex items-center gap-4 text-sm">
                            <a href="#" className="text-axiom-text-muted hover:text-white transition">Discover</a>
                            <a href="#" className="text-white font-medium">Pulse</a>
                            <a href="#" className="text-axiom-text-muted hover:text-white transition">Trackers</a>
                            <a href="#" className="text-axiom-text-muted hover:text-white transition">Perpetuals</a>
                            <a href="#" className="text-axiom-text-muted hover:text-white transition">Yield</a>
                            <a href="#" className="text-axiom-text-muted hover:text-white transition">Vision</a>
                            <a href="#" className="text-axiom-text-muted hover:text-white transition">Portfolio</a>
                        </div>
                    </div>

                    {/* Right: Search, Actions, Profile */}
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="hidden lg:flex items-center relative">
                            <Search className="absolute left-3 w-4 h-4 text-axiom-text-muted" />
                            <Input
                                placeholder="Search by token or CA..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="pl-9 w-64 bg-axiom-card border-axiom-border text-sm h-8"
                            />
                        </form>

                        {/* SOL Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="bg-axiom-card border-axiom-border h-8">
                                    SOL
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-axiom-card border-axiom-border">
                                <DropdownMenuItem className="text-white">Solana (SOL)</DropdownMenuItem>
                                <DropdownMenuItem className="text-axiom-text-muted">Ethereum (ETH)</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Deposit Button */}
                        <Button
                            size="sm"
                            className="bg-axiom-primary hover:bg-axiom-primary/80 h-8"
                            onClick={() => setDepositOpen(true)}
                        >
                            Deposit
                        </Button>

                        {/* Favorites */}
                        <button
                            className="relative p-2 hover:bg-axiom-card rounded transition"
                            onClick={() => setFavoritesOpen(true)}
                        >
                            <Star className="w-5 h-5 text-axiom-text-muted" />
                            {favoriteCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-axiom-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {favoriteCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications */}
                        <button className="p-2 hover:bg-axiom-card rounded transition">
                            <Bell className="w-5 h-5 text-axiom-text-muted" />
                        </button>

                        {/* Wallet */}
                        <div className="flex items-center gap-1 px-2 py-1 bg-axiom-card rounded">
                            <Wallet className="w-4 h-4 text-axiom-text-muted" />
                            <span className="text-white text-sm">{balance.toFixed(1)}</span>
                        </div>

                        {/* Profile */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="p-2 hover:bg-axiom-card rounded transition">
                                    <User className="w-5 h-5 text-axiom-text-muted" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-axiom-card border-axiom-border">
                                <DropdownMenuItem className="text-white" onClick={() => setProfileOpen(true)}>
                                    Profile & Orders
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white" onClick={() => setFavoritesOpen(true)}>
                                    Favorites ({favoriteCount})
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white">Settings</DropdownMenuItem>
                                <DropdownMenuItem className="text-axiom-danger">Disconnect</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>

            <DepositModal open={depositOpen} onOpenChange={setDepositOpen} />
            <FavoritesModal open={favoritesOpen} onOpenChange={setFavoritesOpen} />
            <ProfileModal open={profileOpen} onOpenChange={setProfileOpen} />
        </>
    );
};
