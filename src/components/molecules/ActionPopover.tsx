import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ShoppingCart, TrendingUp } from "lucide-react";

export const ActionPopover = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2 bg-card border-border">
                <div className="grid gap-2">
                    <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                        <ShoppingCart className="h-4 w-4" /> Buy
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                        <TrendingUp className="h-4 w-4" /> Sell
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};
