import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TokenData } from "@/types";
import { CalendarDays } from "lucide-react";

interface TokenHoverCardProps {
    token: TokenData;
    children: React.ReactNode;
}

export const TokenHoverCard = ({ token, children }: TokenHoverCardProps) => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="cursor-help">{children}</div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-card border-border">
                <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{token.name}</h4>
                        <p className="text-sm text-muted-foreground">
                            {token.symbol} - {token.status}
                        </p>
                        <div className="flex items-center pt-2">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                                Created {new Date(token.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                            <p>Volume: ${token.volume.toLocaleString()}</p>
                            <p>Market Cap: ${token.marketCap.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};
