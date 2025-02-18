"use client";

import Image from "next/image";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { Image as ImageType } from "@/types";
import GalleryTab from "./gallery-tab";

interface Galleryprops {
    images: ImageType[];
};


const Gallery: React.FC<Galleryprops> = ({
    images
}) => {
    return ( 
        <TabGroup as="div" className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <TabList className="grid grid-cols-4 gap-6">
                    {images.map((image) => (
                        <GalleryTab key={image.id} image={image} />
                    ))}
                </TabList>
            </div>
            <TabPanels className="aspect-square w-full">
    {images.map((image) => (
        <TabPanel 
            key={image.id} // ✅ Add a unique key here
            className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden"
        >
            <Image
                fill
                src={image.url}
                alt="Image"
                className="object-cover object-center"                        
            />
        </TabPanel>
    ))}
</TabPanels>

        </TabGroup>
     );
}
 
export default Gallery;