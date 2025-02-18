"use client";

import { Billboard as BillboardType } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

interface BillboardProps {
    data?: BillboardType; // Make data optional to handle loading
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data) {
            setTimeout(() => setIsLoading(false), 1000); // Simulate loading for 1s
        }
    }, [data]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
            {isLoading ? (
                // ✅ Skeleton UI when data is loading
                <Skeleton className="w-full h-48 sm:h-64 lg:h-80 rounded-xl bg-gray-300" />
            ) : (
                <div
                    className="rounded-xl relative aspect-[5/3] sm:aspect-[2.4/1] overflow-hidden bg-cover"
                    style={{ backgroundImage: `url(${data?.imageUrl})` }}
                >
                    <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                        <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
                            {data?.label}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Billboard;
