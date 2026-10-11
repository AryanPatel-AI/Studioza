"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UploadCloud, Check, Copy, FileImage, Trash2 } from "lucide-react";

const INITIAL_MEDIA = [
  { name: "01C9D4AC-86FE-4799-AF1F-8EFCCE5936C8_1_105_c.jpeg", path: "/images/01C9D4AC-86FE-4799-AF1F-8EFCCE5936C8_1_105_c.jpeg", size: "313 KB", dim: "1086 × 724", type: "JPEG / Landscape 3:2" },
  { name: "0A0D9BAF-B62A-44B0-8277-A8CA18D75211_1_105_c.jpeg", path: "/images/0A0D9BAF-B62A-44B0-8277-A8CA18D75211_1_105_c.jpeg", size: "188 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "100A270B-7684-4BD1-9E9A-C9E93FDB1FB8_1_105_c.jpeg", path: "/images/100A270B-7684-4BD1-9E9A-C9E93FDB1FB8_1_105_c.jpeg", size: "283 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "135920DC-BB0A-45FD-BAC4-1E38814EB8C4_1_105_c.jpeg", path: "/images/135920DC-BB0A-45FD-BAC4-1E38814EB8C4_1_105_c.jpeg", size: "364 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "192036BF-B1BB-483F-AFD7-B9F96EBB69BA.jpg", path: "/images/192036BF-B1BB-483F-AFD7-B9F96EBB69BA.jpg", size: "752 KB", dim: "1536 × 2304", type: "JPEG / Portrait 2:3" },
  { name: "20861AD5-5C29-4B06-A9F0-453F1907B408_1_105_c.jpeg", path: "/images/20861AD5-5C29-4B06-A9F0-453F1907B408_1_105_c.jpeg", size: "241 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "21C0D227-0A17-44AD-9E71-7F2FF7C732D5.jpg", path: "/images/21C0D227-0A17-44AD-9E71-7F2FF7C732D5.jpg", size: "1917 KB", dim: "2304 × 1536", type: "JPEG / Landscape 3:2" },
  { name: "27EF41EC-8FF5-4DAF-872B-8E8CDBF55246.jpg", path: "/images/27EF41EC-8FF5-4DAF-872B-8E8CDBF55246.jpg", size: "872 KB", dim: "1536 × 2304", type: "JPEG / Portrait 2:3" },
  { name: "29BF8584-B26F-4208-8B45-C9DB235E8477_1_105_c.jpeg", path: "/images/29BF8584-B26F-4208-8B45-C9DB235E8477_1_105_c.jpeg", size: "285 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "400A501C-4442-4203-A37A-C6ECC2EBF54B_1_105_c.jpeg", path: "/images/400A501C-4442-4203-A37A-C6ECC2EBF54B_1_105_c.jpeg", size: "449 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "4F0FBF52-AF40-4ED4-A67F-43E3D73BD6E3_1_105_c.jpeg", path: "/images/4F0FBF52-AF40-4ED4-A67F-43E3D73BD6E3_1_105_c.jpeg", size: "303 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "53310D26-A505-4554-B220-C1E51F5A52A9_1_105_c.jpeg", path: "/images/53310D26-A505-4554-B220-C1E51F5A52A9_1_105_c.jpeg", size: "238 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "542AE6BC-0D96-47EC-8A28-2C32E5CCB977_1_105_c.jpeg", path: "/images/542AE6BC-0D96-47EC-8A28-2C32E5CCB977_1_105_c.jpeg", size: "285 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "5A9200AE-C6BF-4275-8C64-49875EC857D0.jpg", path: "/images/5A9200AE-C6BF-4275-8C64-49875EC857D0.jpg", size: "1310 KB", dim: "1536 × 2304", type: "JPEG / Portrait 2:3" },
  { name: "6589B8A1-5E8F-4EDF-8B9B-21C217B637E8_1_105_c.jpeg", path: "/images/6589B8A1-5E8F-4EDF-8B9B-21C217B637E8_1_105_c.jpeg", size: "235 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "6AD1F81C-A785-44E1-BCC5-5DEBDF06A7D4_1_105_c.jpeg", path: "/images/6AD1F81C-A785-44E1-BCC5-5DEBDF06A7D4_1_105_c.jpeg", size: "393 KB", dim: "1086 × 724", type: "JPEG / Landscape 3:2" },
  { name: "6C06B73F-8404-46A2-92AC-B04231913A92.jpg", path: "/images/6C06B73F-8404-46A2-92AC-B04231913A92.jpg", size: "490 KB", dim: "1638 × 2048", type: "JPEG / Portrait 2:3" },
  { name: "735BACB1-E54D-4358-B3C2-21DB91A3491C_1_105_c.jpeg", path: "/images/735BACB1-E54D-4358-B3C2-21DB91A3491C_1_105_c.jpeg", size: "404 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "787A387A-B05A-4BE2-A8BF-CC8B98A693C3_1_105_c.jpeg", path: "/images/787A387A-B05A-4BE2-A8BF-CC8B98A693C3_1_105_c.jpeg", size: "287 KB", dim: "1086 × 724", type: "JPEG / Landscape 3:2" },
  { name: "8CFD41AD-AEC1-4735-B82E-106BD02F4123_1_105_c.jpeg", path: "/images/8CFD41AD-AEC1-4735-B82E-106BD02F4123_1_105_c.jpeg", size: "242 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "93846B6A-81AF-4186-85C2-BD5F2415B13B_1_105_c.jpeg", path: "/images/93846B6A-81AF-4186-85C2-BD5F2415B13B_1_105_c.jpeg", size: "126 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "985F1A4F-D8D8-498A-BA88-72348841513D_1_105_c.jpeg", path: "/images/985F1A4F-D8D8-498A-BA88-72348841513D_1_105_c.jpeg", size: "272 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "9871E176-CA16-4AC1-8D5D-8D5F86A0BDA7_1_105_c.jpeg", path: "/images/9871E176-CA16-4AC1-8D5D-8D5F86A0BDA7_1_105_c.jpeg", size: "79 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "A18746B3-EA16-40EC-8D96-EC7F43C89F89.jpg", path: "/images/A18746B3-EA16-40EC-8D96-EC7F43C89F89.jpg", size: "275 KB", dim: "2304 × 1536", type: "JPEG / Landscape 3:2" },
  { name: "ADD56FA1-6A5E-4CD0-BC56-3297E9FFAC5A_1_105_c.jpeg", path: "/images/ADD56FA1-6A5E-4CD0-BC56-3297E9FFAC5A_1_105_c.jpeg", size: "418 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "B4690372-CCC6-4D10-897A-00B9BBB75713_1_105_c.jpeg", path: "/images/B4690372-CCC6-4D10-897A-00B9BBB75713_1_105_c.jpeg", size: "403 KB", dim: "1086 × 724", type: "JPEG / Landscape 3:2" },
  { name: "C59CEBEA-EDC0-4FD0-9356-771216EB08F7.jpg", path: "/images/C59CEBEA-EDC0-4FD0-9356-771216EB08F7.jpg", size: "632 KB", dim: "1638 × 2048", type: "JPEG / Portrait 2:3" },
  { name: "CB5E956F-0E75-4786-A519-6B6357808202_1_105_c.jpeg", path: "/images/CB5E956F-0E75-4786-A519-6B6357808202_1_105_c.jpeg", size: "636 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "CE29B58A-859C-4F52-B314-6BE9996C7ED9_1_105_c.jpeg", path: "/images/CE29B58A-859C-4F52-B314-6BE9996C7ED9_1_105_c.jpeg", size: "399 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "D89A57A9-7ABD-41F5-8F6A-F9B1F3BB9F31_1_105_c.jpeg", path: "/images/D89A57A9-7ABD-41F5-8F6A-F9B1F3BB9F31_1_105_c.jpeg", size: "214 KB", dim: "1086 × 724", type: "JPEG / Landscape 3:2" },
  { name: "Dal_Lake.jpeg", path: "/images/Dal_Lake.jpeg", size: "222 KB", dim: "1086 × 724", type: "JPEG / Landscape 3:2" },
  { name: "F2485F99-4E34-4249-ABBD-856E41F2F65B_1_105_c.jpeg", path: "/images/F2485F99-4E34-4249-ABBD-856E41F2F65B_1_105_c.jpeg", size: "107 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "FBC766B9-FE17-4A48-B8DD-60E95DB12B51_1_105_c.jpeg", path: "/images/FBC766B9-FE17-4A48-B8DD-60E95DB12B51_1_105_c.jpeg", size: "324 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "FD8B9285-1B95-4137-A48A-97909D9E61B7_1_105_c.jpeg", path: "/images/FD8B9285-1B95-4137-A48A-97909D9E61B7_1_105_c.jpeg", size: "270 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "IMG-20240414-WA0261.jpg", path: "/images/IMG-20240414-WA0261.jpg", size: "1838 KB", dim: "1200 × 1600", type: "JPEG / Portrait 2:3" },
  { name: "IMG20250324140438.jpg", path: "/images/IMG20250324140438.jpg", size: "775 KB", dim: "1536 × 2048", type: "JPEG / Portrait 2:3" },
  { name: "IMG20250710071454.jpg", path: "/images/IMG20250710071454.jpg", size: "859 KB", dim: "1536 × 2046", type: "JPEG / Portrait 2:3" },
  { name: "IMG20250714134245.jpg", path: "/images/IMG20250714134245.jpg", size: "936 KB", dim: "1536 × 2048", type: "JPEG / Portrait 2:3" },
  { name: "IMG20250714135723.jpg", path: "/images/IMG20250714135723.jpg", size: "1007 KB", dim: "2048 × 1536", type: "JPEG / Landscape 3:2" },
  { name: "IMG20260906183457.jpg", path: "/images/IMG20260906183457.jpg", size: "829 KB", dim: "1536 × 2046", type: "JPEG / Portrait 2:3" },
  { name: "IMG_0017.jpg", path: "/images/IMG_0017.jpg", size: "603 KB", dim: "1448 × 2172", type: "JPEG / Portrait 2:3" },
  { name: "IMG_0039-2.jpg", path: "/images/IMG_0039-2.jpg", size: "533 KB", dim: "1448 × 2172", type: "JPEG / Portrait 2:3" },
  { name: "IMG_0039-4.jpg", path: "/images/IMG_0039-4.jpg", size: "434 KB", dim: "1586 × 1982", type: "JPEG / Portrait 2:3" },
  { name: "IMG_0081.jpg", path: "/images/IMG_0081.jpg", size: "517 KB", dim: "1448 × 2172", type: "JPEG / Portrait 2:3" },
  { name: "IMG_0090.jpg", path: "/images/IMG_0090.jpg", size: "125 KB", dim: "1446 × 2172", type: "JPEG / Portrait 2:3" },
  { name: "IMG_0108.jpg", path: "/images/IMG_0108.jpg", size: "725 KB", dim: "1586 × 1982", type: "JPEG / Portrait 2:3" },
  { name: "IMG_0219.jpg", path: "/images/IMG_0219.jpg", size: "475 KB", dim: "1448 × 2172", type: "JPEG / Portrait 2:3" },
  { name: "IMG_0294.jpg", path: "/images/IMG_0294.jpg", size: "668 KB", dim: "2172 × 1448", type: "JPEG / Landscape 3:2" },
  { name: "IMG_0386.jpg", path: "/images/IMG_0386.jpg", size: "592 KB", dim: "1448 × 2172", type: "JPEG / Portrait 2:3" },
  { name: "IMG_0396-1.jpg", path: "/images/IMG_0396-1.jpg", size: "401 KB", dim: "1448 × 2172", type: "JPEG / Portrait 2:3" },
  { name: "aryan-patel-pillared-court.jpg", path: "/images/aryan-patel-pillared-court.jpg", size: "93 KB", dim: "338 × 508", type: "JPEG / Portrait 2:3" },
  { name: "aryan-patel-sheesh-mahal.jpg", path: "/images/aryan-patel-sheesh-mahal.jpg", size: "2522 KB", dim: "1024 × 1536", type: "JPEG / Portrait 2:3" },
  { name: "aryan-patel-temple-monochrome.jpg", path: "/images/aryan-patel-temple-monochrome.jpg", size: "5959 KB", dim: "3921 × 5881", type: "JPEG / Portrait 2:3" },
  { name: "city-aerial-overview.jpg", path: "/images/city-aerial-overview.jpg", size: "318 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "fort-ramparts-overlook.jpg", path: "/images/fort-ramparts-overlook.jpg", size: "355 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "hilltop-fortress-crest.jpg", path: "/images/hilltop-fortress-crest.jpg", size: "6197 KB", dim: "6000 × 4000", type: "JPEG / Landscape 3:2" },
  { name: "ochre-palace-courtyard-scale.jpg", path: "/images/ochre-palace-courtyard-scale.jpg", size: "259 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "palace-arch-courtyard.jpg", path: "/images/palace-arch-courtyard.jpg", size: "2145 KB", dim: "3469 × 4625", type: "JPEG / Portrait 2:3" },
  { name: "pelicans-lake.jpg", path: "/images/pelicans-lake.jpg", size: "232 KB", dim: "724 × 1086", type: "JPEG / Portrait 2:3" },
  { name: "sandstone-palace-domes.jpg", path: "/images/sandstone-palace-domes.jpg", size: "188 KB", dim: "1086 × 724", type: "JPEG / Landscape 3:2" },
  { name: "temple-shikhara-oleander.jpg", path: "/images/temple-shikhara-oleander.jpg", size: "12.0 MB", dim: "4000 × 6000", type: "JPEG / Portrait 2:3" },
];

export default function AdminMediaLibraryPage() {
  const [mediaList, setMediaList] = useState(INITIAL_MEDIA);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9D5CE] pb-6">
        <div>
          <span className="type-meta text-[#77736D] block mb-1">ARCHIVAL MEDIA REPOSITORY</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
            Media Library
          </h1>
          <p className="type-body text-[#77736D] mt-1">
            Store and manage medium-format raw scans, digital negatives, and publication-ready assets.
          </p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-white p-8 border-2 border-dashed border-[#D9D5CE] hover:border-[#151515] transition-colors text-center space-y-3 cursor-pointer">
        <UploadCloud className="w-8 h-8 text-[#77736D] mx-auto" />
        <h3 className="font-serif text-2xl text-[#151515]">Drag and Drop Plates to Upload</h3>
        <p className="type-small text-[#77736D]">Supports JPEG, TIFF, RAW, WebP, AVIF up to 50MB per sheet.</p>
        <span className="inline-block bg-[#151515] text-[#F4F1EB] px-4 py-2 type-meta text-xs">
          Select Files from Local Disk
        </span>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaList.map((item) => (
          <div
            key={item.name}
            className="bg-white border border-[#D9D5CE] overflow-hidden group flex flex-col justify-between"
          >
            <div className="aspect-[4/3] bg-[#EAE6DE] relative overflow-hidden flex items-center justify-center p-2">
              <Image
                src={item.path}
                alt={item.name}
                fill
                quality={100}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain p-2"
              />
            </div>

            <div className="p-4 space-y-2">
              <p className="type-small font-medium text-[#151515] truncate" title={item.name}>
                {item.name}
              </p>
              <div className="type-micro text-[#77736D] text-[10px] space-y-0.5">
                <p>{item.dim} • {item.size}</p>
                <p>{item.type}</p>
              </div>

              <div className="pt-2 border-t border-[#D9D5CE] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleCopy(item.path)}
                  className="type-meta text-[10px] text-[#151515] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedPath === item.path ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPath === item.path ? "Copied" : "Copy Path"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMediaList(mediaList.filter((m) => m.name !== item.name))}
                  className="text-rose-700 hover:text-rose-900 p-1"
                  title="Remove from Library"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
